import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { 
  CloudUpload,
  X,
  ImageIcon,
  Search,
  Filter,
  Expand,
  CircleCheck,
  TriangleAlert,
  Star
} from 'lucide-react';
import api from '../services/api';

type GalleryItem = {
  id: string;
  imageUrl: string;
  description?: string | null;
  category?: string | null;
  createdAt?: string;
  isFeatured?: boolean;
};

type ToastItem = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

const emptyForm = {
  category: '',
  description: '',
};

const Gallery = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [pendingDeleteItem, setPendingDeleteItem] = useState<GalleryItem | null>(null);
  const hasFetchedRef = useRef(false);
  const toastIdRef = useRef(0);

  const pushToast = (type: ToastItem['type'], message: string) => {
    const id = ++toastIdRef.current;
    setToasts((current) => [...current, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  // Get unique categories for filter
  const categories = ['all', ...new Set(items.map(item => item.category || 'Uncategorized'))];

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;

    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery');
        const galleryData = Array.isArray(response.data?.data) ? response.data.data : [];
        // Add featured status for demo
        const enrichedData = galleryData.map((item: GalleryItem, idx: number) => ({
          ...item,
          isFeatured: idx < 2,
          createdAt: item.createdAt || new Date().toISOString()
        }));
        setItems(enrichedData);
      } catch {
        pushToast('error', 'Gallery items could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const openPicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file && !file.type.startsWith('image/')) {
      pushToast('error', 'Please select a valid image file.');
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      pushToast('error', 'Image size should be less than 5MB.');
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      pushToast('error', 'Please choose an image before uploading.');
      return;
    }

    const payload = new FormData();
    payload.append('image', selectedFile);

    if (form.category.trim()) {
      payload.append('category', form.category.trim());
    }

    if (form.description.trim()) {
      payload.append('description', form.description.trim());
    }

    try {
      setUploading(true);
      const response = await api.post('/gallery', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const createdItem = response.data?.data;
      if (createdItem) {
        setItems((current) => [{ ...createdItem, createdAt: new Date().toISOString() }, ...current]);
      }

      setSelectedFile(null);
      setForm(emptyForm);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      pushToast('success', 'Image uploaded successfully.');
    } catch (uploadError: unknown) {
      pushToast(
        'error',
        axios.isAxiosError(uploadError)
          ? uploadError.response?.data?.message || 'Image upload failed. Please try again.'
          : 'Image upload failed. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDeleteItem) return;
    try {
      setDeletingId(pendingDeleteItem.id);
      await api.delete(`/gallery/${pendingDeleteItem.id}`);
      setItems((current) => current.filter((item) => item.id !== pendingDeleteItem.id));
      pushToast('success', 'Image deleted successfully.');
      setPendingDeleteItem(null);
    } catch (deleteError: unknown) {
      pushToast(
        'error',
        axios.isAxiosError(deleteError)
          ? deleteError.response?.data?.message || 'Image deletion failed. Please try again.'
          : 'Image deletion failed. Please try again.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    setItems(current => current.map(item =>
      item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
    ));
    // API call would go here
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.category || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                           (item.category || 'Uncategorized') === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  const featuredCount = items.filter((item) => item.isFeatured).length;
  const recentCount = items.filter((item) => {
    const daysOld = (Date.now() - new Date(item.createdAt || '').getTime()) / (1000 * 60 * 60 * 24);
    return daysOld <= 7;
  }).length;
  const hasActiveFilters = searchTerm.trim().length > 0 || categoryFilter !== 'all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                Admin Studio
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Gallery Management
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Upload, organize, and curate visual stories for your hotel.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={openPicker}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 font-medium text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                <CloudUpload className="h-5 w-5" />
                Upload Image
              </button>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{items.length}</p>
            <p className="mt-1 text-xs text-slate-500">Images in Gallery</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{featuredCount}</p>
            <p className="mt-1 text-xs text-slate-500">Featured Images</p>
          </div>
          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Filter className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Categories
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{categories.length - 1}</p>
            <p className="mt-1 text-xs text-slate-500">Unique Categories</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CloudUpload className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Recent
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{recentCount}</p>
            <p className="mt-1 text-xs text-slate-500">Added in Last 7 Days</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by category or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
              }}
              disabled={!hasActiveFilters}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 xl:grid-cols-[minmax(320px,380px)_1fr]">
          {/* Upload Form */}
          <form onSubmit={handleUpload} className="h-fit space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Upload New Image</h2>
              <p className="mt-1 text-sm text-slate-500">Select a file and add optional details</p>
            </div>

            <button
              type="button"
              onClick={openPicker}
              className="group w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/70 p-6 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-slate-900 hover:bg-slate-100 hover:text-slate-900"
            >
              <CloudUpload className="mx-auto mb-2 h-8 w-8 text-slate-400 transition-colors group-hover:text-slate-900" />
              {selectedFile ? selectedFile.name : 'Click or drag to choose an image'}
            </button>

            {previewUrl ? (
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Selected upload preview"
                  className="h-56 w-full rounded-2xl border border-slate-200 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute right-2 top-2 rounded-lg bg-red-500 p-1.5 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex h-56 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-400">
                <div className="text-center">
                  <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-50" />
                  Image preview will appear here
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="e.g., Lobby, Rooms, Dining, Spa..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Write a short description for this image..."
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  Uploading...
                </span>
              ) : (
                'Upload Image'
              )}
            </button>
          </form>

          {/* Gallery Grid */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900"></div>
                  <p className="text-slate-500">Loading gallery...</p>
                </div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white text-center shadow-sm">
                <div>
                  <ImageIcon className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                  <p className="text-lg font-medium text-slate-700">No gallery images found</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {searchTerm || categoryFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria' 
                      : 'Upload your first image to get started'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-700">{filteredItems.length}</span> of{' '}
                    <span className="font-semibold text-slate-700">{items.length}</span> images
                  </p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {categoryFilter === 'all' ? 'All categories' : categoryFilter}
                  </span>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      {/* Image */}
                      <div 
                        className="relative aspect-square cursor-pointer overflow-hidden bg-slate-100"
                        onClick={() => {
                          setSelectedImage(item);
                          setShowLightbox(true);
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.description || 'Gallery image'}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                          <Expand className="h-8 w-8 scale-50 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                        </div>
                        {item.isFeatured && (
                          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-1 text-xs font-semibold text-white shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-3 p-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-slate-900">
                              {item.category || 'Uncategorized'}
                            </p>
                            {item.createdAt && (
                              <p className="text-xs text-slate-400">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <p className="line-clamp-2 text-sm text-slate-600">
                            {item.description || 'No description added for this image.'}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => handleToggleFeatured(item.id)}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              item.isFeatured
                                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {item.isFeatured ? 'Featured' : 'Make Featured'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingDeleteItem(item)}
                            disabled={deletingId === item.id}
                            className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === item.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-full max-w-sm flex-col gap-2 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg ${
              toast.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-red-200 bg-red-50 text-red-800'
            }`}
          >
            {toast.type === 'success' ? (
              <CircleCheck className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <p>{toast.message}</p>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {pendingDeleteItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <TriangleAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete image?</h3>
                <p className="text-sm text-slate-500">This action cannot be undone.</p>
              </div>
            </div>
            <p className="mb-6 text-sm text-slate-600">
              Are you sure you want to remove this gallery image permanently?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPendingDeleteItem(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deletingId === pendingDeleteItem.id}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId === pendingDeleteItem.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {showLightbox && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4" onClick={() => setShowLightbox(false)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.description || 'Gallery image'}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-2xl">
              <p className="text-white text-lg font-semibold">{selectedImage.category || 'Uncategorized'}</p>
              <p className="text-gray-300 text-sm mt-1">{selectedImage.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
