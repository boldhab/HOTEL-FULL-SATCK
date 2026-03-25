import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

type GalleryItem = {
  id: string;
  imageUrl: string;
  description?: string | null;
  category?: string | null;
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
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;

    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery');
        setItems(Array.isArray(response.data?.data) ? response.data.data : []);
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
        setItems((current) => [createdItem, ...current]);
      }

      setSelectedFile(null);
      setForm(emptyForm);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setError(null);
      setSuccessMessage('Image uploaded successfully.');
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
    try {
      setDeletingId(id);
      await api.delete(`/gallery/${id}`);
      setItems((current) => current.filter((item) => item.id !== id));
      setSuccessMessage('Image deleted successfully.');
      setError(null);
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
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="mt-1 text-sm text-gray-500">Upload and manage hotel gallery images from one place.</p>
        </div>
        <button
          type="button"
          onClick={openPicker}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          Choose Image
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Upload New Image</h2>
            <p className="mt-1 text-sm text-gray-500">Select a file, add optional details, then upload it to the gallery.</p>
          </div>

          <button
            type="button"
            onClick={openPicker}
            className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm font-medium text-gray-600 hover:border-slate-900 hover:text-slate-900 transition-colors"
          >
            {selectedFile ? selectedFile.name : 'Click to choose an image'}
          </button>

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected upload preview"
              className="h-48 w-full rounded-xl object-cover border border-gray-200"
            />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-400">
              Image preview will appear here
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Lobby, Rooms, Dining..."
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              className="min-h-28 w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Short description for this image"
            />
          </div>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          {successMessage ? (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={uploading}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        <div className="space-y-4">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-500 shadow-sm">
              Loading gallery...
            </div>
          ) : items.length === 0 ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-center text-gray-500 shadow-sm">
              <div>
                <p className="font-medium text-gray-700">No gallery images yet</p>
                <p className="mt-1 text-sm text-gray-500">Upload the first image to populate this section.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                  <img src={item.imageUrl} alt={item.description || 'Gallery image'} className="aspect-square w-full object-cover" />
                  <div className="space-y-3 p-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{item.category || 'Uncategorized'}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.description || 'No description added for this image.'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === item.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
