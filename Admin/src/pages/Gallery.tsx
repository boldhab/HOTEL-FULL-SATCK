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
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const hasFetchedRef = useRef(false);

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
        setError(null);
      } catch {
        setError('Gallery items could not be loaded right now.');
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
      setError('Please select a valid image file.');
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB.');
      return;
    }
    setSelectedFile(file);
    setSuccessMessage(null);
    setError(null);
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setError('Please choose an image before uploading.');
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
      setError(null);
      setSuccessMessage('Image uploaded successfully.');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (uploadError: unknown) {
      setSuccessMessage(null);
      setError(
        axios.isAxiosError(uploadError)
          ? uploadError.response?.data?.message || 'Image upload failed. Please try again.'
          : 'Image upload failed. Please try again.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      try {
        setDeletingId(id);
        await api.delete(`/gallery/${id}`);
        setItems((current) => current.filter((item) => item.id !== id));
        setSuccessMessage('Image deleted successfully.');
        setError(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (deleteError: unknown) {
        setSuccessMessage(null);
        setError(
          axios.isAxiosError(deleteError)
            ? deleteError.response?.data?.message || 'Image deletion failed. Please try again.'
            : 'Image deletion failed. Please try again.'
        );
      } finally {
        setDeletingId(null);
      }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Gallery Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Upload and manage hotel gallery images to showcase your property
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={openPicker}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-2.5 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <CloudUpload className="h-5 w-5" />
              Upload Image
            </button>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <ImageIcon className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{items.length}</p>
            <p className="text-xs text-gray-500 mt-1">Images in Gallery</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{items.filter(i => i.isFeatured).length}</p>
            <p className="text-xs text-gray-500 mt-1">Featured Images</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Filter className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Categories
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{categories.length - 1}</p>
            <p className="text-xs text-gray-500 mt-1">Unique Categories</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <CloudUpload className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Recent
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {items.filter(i => {
                const daysOld = (Date.now() - new Date(i.createdAt || '').getTime()) / (1000 * 60 * 60 * 24);
                return daysOld <= 7;
              }).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Added in Last 7 Days</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by category or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 xl:grid-cols-[400px_1fr]">
          {/* Upload Form */}
          <form onSubmit={handleUpload} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5 sticky top-6 h-fit">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload New Image</h2>
              <p className="mt-1 text-sm text-gray-500">Select a file and add optional details</p>
            </div>

            <button
              type="button"
              onClick={openPicker}
              className="w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-sm font-medium text-gray-600 hover:border-slate-900 hover:text-slate-900 hover:bg-gray-100 transition-all duration-200 group"
            >
              <CloudUpload className="h-8 w-8 mx-auto mb-2 text-gray-400 group-hover:text-slate-900 transition-colors" />
              {selectedFile ? selectedFile.name : 'Click or drag to choose an image'}
            </button>

            {previewUrl ? (
              <div className="relative group">
                <img
                  src={previewUrl}
                  alt="Selected upload preview"
                  className="h-56 w-full rounded-xl object-cover border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex h-56 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-400">
                <div className="text-center">
                  <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  Image preview will appear here
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Category</label>
              <input
                type="text"
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                placeholder="e.g., Lobby, Rooms, Dining, Spa..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={3}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                placeholder="Write a short description for this image..."
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                <TriangleAlert className="h-4 w-4" />
                {error}
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2">
                <CircleCheck className="h-4 w-4" />
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="w-full rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3 font-semibold text-white transition-all duration-200 hover:from-slate-800 hover:to-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-slate-900 shadow-lg"
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
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading gallery...</p>
                </div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white text-center shadow-sm">
                <div>
                  <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="font-medium text-gray-700 text-lg">No gallery images found</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || categoryFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria' 
                      : 'Upload your first image to get started'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Results count */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> of{' '}
                    <span className="font-semibold text-gray-700">{items.length}</span> images
                  </p>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Image */}
                      <div 
                        className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100"
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
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <Expand className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100" />
                        </div>
                        {item.isFeatured && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg">
                            <Star className="h-3 w-3 fill-current" />
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {item.category || 'Uncategorized'}
                            </p>
                            {item.createdAt && (
                              <p className="text-xs text-gray-400">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
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
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {item.isFeatured ? 'Featured' : 'Make Featured'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="flex-1 px-3 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
