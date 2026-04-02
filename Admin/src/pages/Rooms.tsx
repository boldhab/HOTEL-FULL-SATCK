import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Building2,
  Tag,
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import api from '../services/api';

type RoomStatus = 'available' | 'occupied' | 'maintenance' | 'booked';

type Room = {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  images: string[];
  status: RoomStatus;
  amenities: string[];
  createdAt?: string;
};

type RoomForm = {
  name: string;
  type: string;
  description: string;
  price: string;
  capacity: string;
  status: RoomStatus;
  amenitiesText: string;
};

const defaultAmenities = ['Free WiFi', 'Smart TV', 'Rain Shower'];
const roomStatusOptions: RoomStatus[] = ['available', 'occupied', 'maintenance', 'booked'];

const initialForm: RoomForm = {
  name: '',
  type: 'Standard',
  description: '',
  price: '',
  capacity: '2',
  status: 'available',
  amenitiesText: defaultAmenities.join(', '),
};

const parseAmenitiesInput = (value: string) => {
  const items = value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return Array.from(new Set(items));
};

const isRoomStatus = (value: unknown): value is RoomStatus =>
  typeof value === 'string' && roomStatusOptions.includes(value as RoomStatus);

const normalizeRoom = (room: Partial<Room>): Room => ({
  id: String(room.id || ''),
  name: String(room.name || 'Untitled Room'),
  type: String(room.type || 'Standard'),
  description: String(room.description || ''),
  price: typeof room.price === 'number' ? room.price : Number(room.price || 0),
  capacity: typeof room.capacity === 'number' ? room.capacity : Number(room.capacity || 0),
  images: Array.isArray(room.images) ? room.images : [],
  status: isRoomStatus(room.status) ? room.status : 'available',
  amenities: Array.isArray(room.amenities) && room.amenities.length > 0 ? room.amenities : defaultAmenities,
  createdAt: room.createdAt,
});

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'type'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [rooms, setRooms] = useState<Room[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const [form, setForm] = useState<RoomForm>(initialForm);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [editForm, setEditForm] = useState<RoomForm>(initialForm);
  const [editFiles, setEditFiles] = useState<File[]>([]);
  const [updating, setUpdating] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const response = await api.get('/rooms');
        const data = Array.isArray(response.data?.data) ? response.data.data : [];
        setRooms(data.map((room: Partial<Room>) => normalizeRoom(room)));
        setError(null);
      } catch {
        setError('Rooms could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const getStatusColor = (status: RoomStatus) => {
    const colors = {
      available: 'bg-emerald-100 text-emerald-700',
      occupied: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-amber-100 text-amber-700',
      booked: 'bg-purple-100 text-purple-700',
    };
    return colors[status];
  };

  const getStatusLabel = (status: RoomStatus) => {
    const labels = {
      available: 'Available',
      occupied: 'Occupied',
      maintenance: 'Maintenance',
      booked: 'Booked',
    };
    return labels[status];
  };

  const filteredAndSortedRooms = useMemo(() => {
    return [...rooms]
      .filter((room) => {
        const matchesSearch =
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
        if (sortBy === 'price') comparison = a.price - b.price;
        if (sortBy === 'type') comparison = a.type.localeCompare(b.type);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
  }, [rooms, searchTerm, statusFilter, sortBy, sortOrder]);

  const handleSort = (column: 'name' | 'price' | 'type') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      return;
    }
    setSortBy(column);
    setSortOrder('asc');
  };

  const handleDelete = async (roomId: string) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;

    try {
      setDeletingId(roomId);
      await api.delete(`/rooms/${roomId}`);
      setRooms((current) => current.filter((room) => room.id !== roomId));
      setSuccessMessage('Room deleted successfully.');
      setError(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (deleteError: unknown) {
      setSuccessMessage(null);
      setError(
        axios.isAxiosError(deleteError)
          ? deleteError.response?.data?.message || 'Room deletion failed. Please try again.'
          : 'Room deletion failed. Please try again.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    fileSetter: Dispatch<SetStateAction<File[]>>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 5) {
      setError('You can upload up to 5 images per room.');
      return;
    }

    const invalid = files.find((file) => !file.type.startsWith('image/'));
    if (invalid) {
      setError('Please select image files only.');
      return;
    }

    fileSetter(files);
    setError(null);
  };

  const moveFile = (
    index: number,
    direction: 'up' | 'down',
    fileSetter: Dispatch<SetStateAction<File[]>>
  ) => {
    fileSetter((current) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) {
        return current;
      }
      const next = [...current];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  const removeFile = (index: number, fileSetter: Dispatch<SetStateAction<File[]>>) => {
    fileSetter((current) => current.filter((_, idx) => idx !== index));
  };

  const resetAddForm = () => {
    setForm(initialForm);
    setSelectedFiles([]);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRoom(null);
    setEditForm(initialForm);
    setEditFiles([]);
  };

  const handleAddRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.description.trim() || !form.price.trim() || !form.capacity.trim()) {
      setError('Please fill all required fields.');
      return;
    }

    const payload = new FormData();
    payload.append('name', form.name.trim());
    payload.append('type', form.type.trim() || 'Standard');
    payload.append('description', form.description.trim());
    payload.append('price', form.price.trim());
    payload.append('capacity', form.capacity.trim());
    payload.append('status', form.status);
    payload.append('amenities', parseAmenitiesInput(form.amenitiesText).join(','));

    selectedFiles.forEach((file) => {
      payload.append('images', file);
    });

    try {
      setSubmitting(true);
      const response = await api.post('/rooms', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const created = response.data?.data;
      if (created) {
        setRooms((current) => [normalizeRoom(created), ...current]);
      }

      setError(null);
      setSuccessMessage('Room created successfully. It will appear on the client homepage.');
      setTimeout(() => setSuccessMessage(null), 3000);
      setIsAddModalOpen(false);
      resetAddForm();
    } catch (createError: unknown) {
      setSuccessMessage(null);
      setError(
        axios.isAxiosError(createError)
          ? createError.response?.data?.message || 'Room creation failed. Please try again.'
          : 'Room creation failed. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const openViewModal = (room: Room) => {
    setSelectedRoom(room);
    setIsViewModalOpen(true);
  };

  const openEditModal = (room: Room) => {
    setSelectedRoom(room);
    setEditForm({
      name: room.name,
      type: room.type,
      description: room.description,
      price: String(room.price),
      capacity: String(room.capacity),
      status: room.status,
      amenitiesText: room.amenities.join(', '),
    });
    setEditFiles([]);
    setIsEditModalOpen(true);
  };

  const handleEditRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRoom) return;

    if (!editForm.name.trim() || !editForm.description.trim() || !editForm.price.trim() || !editForm.capacity.trim()) {
      setError('Please fill all required fields.');
      return;
    }

    const payload = new FormData();
    payload.append('name', editForm.name.trim());
    payload.append('type', editForm.type.trim() || 'Standard');
    payload.append('description', editForm.description.trim());
    payload.append('price', editForm.price.trim());
    payload.append('capacity', editForm.capacity.trim());
    payload.append('status', editForm.status);
    payload.append('amenities', parseAmenitiesInput(editForm.amenitiesText).join(','));
    editFiles.forEach((file) => {
      payload.append('images', file);
    });

    try {
      setUpdating(true);
      const response = await api.put(`/rooms/${selectedRoom.id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updated = response.data?.data;
      if (updated) {
        const normalized = normalizeRoom(updated);
        setRooms((current) => current.map((room) => (room.id === normalized.id ? normalized : room)));
      }

      setError(null);
      setSuccessMessage('Room updated successfully.');
      setTimeout(() => setSuccessMessage(null), 3000);
      closeEditModal();
    } catch (updateError: unknown) {
      setSuccessMessage(null);
      setError(
        axios.isAxiosError(updateError)
          ? updateError.response?.data?.message || 'Room update failed. Please try again.'
          : 'Room update failed. Please try again.'
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Room Management
            </h1>
            <p className="text-gray-500 mt-1">Manage your property's rooms and suites</p>
          </div>
          <button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-2.5 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => {
              setIsAddModalOpen(true);
              setError(null);
            }}
          >
            <Plus className="h-5 w-5" />
            Add New Room
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rooms by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                    >
                      Room Name
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('type')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                    >
                      Type
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('price')}
                      className="flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                    >
                      Price
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amenities
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {!loading &&
                  filteredAndSortedRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {room.images?.[0] ? (
                              <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                            ) : (
                              <Building2 className="h-5 w-5 text-slate-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{room.name}</p>
                            <p className="text-xs text-gray-500">ID: {room.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                          <Tag className="h-3 w-3" />
                          {room.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">${room.price}</p>
                          <p className="text-xs text-gray-500">/ night</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-700">{room.capacity}</span>
                          <span className="text-xs text-gray-500">guests</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(room.status)}`}>
                          {getStatusLabel(room.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.slice(0, 2).map((amenity) => (
                            <span key={`${room.id}-${amenity}`} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                              {amenity}
                            </span>
                          ))}
                          {room.amenities.length > 2 && (
                            <span className="text-xs text-gray-400">+{room.amenities.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-gray-500 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-all"
                            title="View Details"
                            onClick={() => openViewModal(room)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit Room"
                            onClick={() => openEditModal(room)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(room.id)}
                            disabled={deletingId === room.id}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                            title="Delete Room"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {(loading || filteredAndSortedRooms.length === 0) && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {loading ? 'Loading rooms...' : 'No rooms found'}
              </h3>
              <p className="text-gray-500">
                {loading ? 'Please wait while we fetch data' : 'Try adjusting your search or filter criteria'}
              </p>
            </div>
          )}

          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredAndSortedRooms.length}</span> of{' '}
                <span className="font-semibold">{rooms.length}</span> rooms
              </p>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-3 sm:p-4">
          <div className="flex min-h-full items-start justify-center py-4 sm:items-center sm:py-6">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Room</h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  resetAddForm();
                }}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddRoom} className="space-y-4 px-6 py-5 overflow-y-auto max-h-[calc(92vh-84px)]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Room Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    value={form.type}
                    onChange={(e) => setForm((current) => ({ ...current, type: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Standard / Deluxe / Suite"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Capacity *</label>
                  <input
                    type="number"
                    min={1}
                    value={form.capacity}
                    onChange={(e) => setForm((current) => ({ ...current, capacity: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Price Per Night *</label>
                  <input
                    type="number"
                    min={1}
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm((current) => ({ ...current, price: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((current) => ({ ...current, status: e.target.value as RoomStatus }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                  >
                    {roomStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Images (up to 5)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleFileChange(event, setSelectedFiles)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">{selectedFiles.length} file(s) selected</p>
                  {selectedFiles.length > 1 && (
                    <div className="mt-2 space-y-2 rounded-xl border border-gray-100 bg-gray-50 p-2">
                      <p className="text-xs font-medium text-gray-600">Set image order (1 = first image shown)</p>
                      {selectedFiles.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 rounded-lg bg-white px-2 py-1.5">
                          <div className="truncate text-xs text-gray-700">
                            <span className="mr-2 font-semibold text-gray-500">{index + 1}.</span>
                            {file.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveFile(index, 'up', setSelectedFiles)}
                              disabled={index === 0}
                              className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                              title="Move up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveFile(index, 'down', setSelectedFiles)}
                              disabled={index === selectedFiles.length - 1}
                              className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                              title="Move down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setSelectedFiles)}
                              className="rounded p-1 text-red-500 hover:bg-red-50"
                              title="Remove image"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Description *</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Amenities</label>
                  <textarea
                    rows={3}
                    value={form.amenitiesText}
                    onChange={(e) => setForm((current) => ({ ...current, amenitiesText: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Free WiFi, Smart TV, Coffee Maker"
                  />
                  <p className="mt-1 text-xs text-gray-500">Separate amenities with commas or new lines.</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetAddForm();
                  }}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}

      {isViewModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">{selectedRoom.name}</h2>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedRoom(null);
                }}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Type</p>
                  <p className="mt-1 text-base font-medium text-gray-900">{selectedRoom.type}</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Price</p>
                  <p className="mt-1 text-base font-medium text-gray-900">${selectedRoom.price} / night</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Capacity</p>
                  <p className="mt-1 text-base font-medium text-gray-900">{selectedRoom.capacity} guests</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">Created</p>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {selectedRoom.createdAt ? new Date(selectedRoom.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium text-gray-700">Description</p>
                <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                  {selectedRoom.description || 'No description available.'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Images</p>
                {selectedRoom.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {selectedRoom.images.map((img) => (
                      <img key={img} src={img} alt={selectedRoom.name} className="h-28 w-full rounded-lg object-cover" />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-500">No images uploaded.</p>
                )}
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Amenities</p>
                <div className="flex flex-wrap gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  {selectedRoom.amenities.length > 0 ? (
                    selectedRoom.amenities.map((amenity) => (
                      <span key={`${selectedRoom.id}-${amenity}`} className="rounded-full bg-white px-3 py-1 text-xs text-gray-700 border border-gray-200">
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No amenities set.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">Edit Room</h2>
              <button onClick={closeEditModal} className="rounded-full p-2 hover:bg-gray-100">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleEditRoom} className="space-y-4 px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Room Name *</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm((current) => ({ ...current, name: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Type</label>
                  <input
                    type="text"
                    value={editForm.type}
                    onChange={(e) => setEditForm((current) => ({ ...current, type: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Capacity *</label>
                  <input
                    type="number"
                    min={1}
                    value={editForm.capacity}
                    onChange={(e) => setEditForm((current) => ({ ...current, capacity: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Price Per Night *</label>
                  <input
                    type="number"
                    min={1}
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) => setEditForm((current) => ({ ...current, price: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm((current) => ({ ...current, status: e.target.value as RoomStatus }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white"
                  >
                    {roomStatusOptions.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Replace Images (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => handleFileChange(event, setEditFiles)}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">{editFiles.length} file(s) selected</p>
                  {editFiles.length > 1 && (
                    <div className="mt-2 space-y-2 rounded-xl border border-gray-100 bg-gray-50 p-2">
                      <p className="text-xs font-medium text-gray-600">Set image order (1 = first image shown)</p>
                      {editFiles.map((file, index) => (
                        <div key={`${file.name}-${index}`} className="flex items-center justify-between gap-2 rounded-lg bg-white px-2 py-1.5">
                          <div className="truncate text-xs text-gray-700">
                            <span className="mr-2 font-semibold text-gray-500">{index + 1}.</span>
                            {file.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveFile(index, 'up', setEditFiles)}
                              disabled={index === 0}
                              className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                              title="Move up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveFile(index, 'down', setEditFiles)}
                              disabled={index === editFiles.length - 1}
                              className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
                              title="Move down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFile(index, setEditFiles)}
                              className="rounded p-1 text-red-500 hover:bg-red-50"
                              title="Remove image"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Description *</label>
                  <textarea
                    rows={4}
                    value={editForm.description}
                    onChange={(e) => setEditForm((current) => ({ ...current, description: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">Amenities</label>
                  <textarea
                    rows={3}
                    value={editForm.amenitiesText}
                    onChange={(e) => setEditForm((current) => ({ ...current, amenitiesText: e.target.value }))}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Free WiFi, Smart TV, Coffee Maker"
                  />
                  <p className="mt-1 text-xs text-gray-500">Separate amenities with commas or new lines.</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
