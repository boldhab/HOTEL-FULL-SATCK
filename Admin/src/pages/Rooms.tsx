import { useState } from 'react';
import { 
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Building2,
  Tag
} from 'lucide-react';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  status: 'available' | 'occupied' | 'maintenance' | 'booked';
  capacity: number;
  amenities: string[];
  image?: string;
}

const Rooms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'type'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Sample data - replace with API call
  const [rooms] = useState<Room[]>([
    {
      id: 1,
      name: 'Deluxe Ocean Suite',
      type: 'Luxury',
      price: 450,
      status: 'available',
      capacity: 4,
      amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'Jacuzzi']
    },
    {
      id: 2,
      name: 'Executive Business Room',
      type: 'Business',
      price: 320,
      status: 'occupied',
      capacity: 2,
      amenities: ['Work Desk', 'City View', 'Express Check-in']
    },
    {
      id: 3,
      name: 'Family Garden Suite',
      type: 'Family',
      price: 380,
      status: 'booked',
      capacity: 5,
      amenities: ['Garden View', 'Two Bedrooms', 'Kitchenette']
    },
    {
      id: 4,
      name: 'Standard Double Room',
      type: 'Standard',
      price: 180,
      status: 'available',
      capacity: 2,
      amenities: ['City View', 'Double Bed', 'TV']
    },
    {
      id: 5,
      name: 'Penthouse Suite',
      type: 'Luxury',
      price: 850,
      status: 'maintenance',
      capacity: 6,
      amenities: ['Panoramic View', 'Private Terrace', 'Butler Service']
    }
  ]);

  const getStatusColor = (status: Room['status']) => {
    const colors = {
      available: 'bg-emerald-100 text-emerald-700',
      occupied: 'bg-blue-100 text-blue-700',
      maintenance: 'bg-amber-100 text-amber-700',
      booked: 'bg-purple-100 text-purple-700'
    };
    return colors[status];
  };

  const getStatusLabel = (status: Room['status']) => {
    const labels = {
      available: 'Available',
      occupied: 'Occupied',
      maintenance: 'Maintenance',
      booked: 'Booked'
    };
    return labels[status];
  };

  const filteredAndSortedRooms = rooms
    .filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleSort = (column: 'name' | 'price' | 'type') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleEdit = (roomId: number) => {
    console.log('Edit room:', roomId);
    // Implement edit functionality
  };

  const handleDelete = (roomId: number) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      console.log('Delete room:', roomId);
      // Implement delete functionality
    }
  };

  const handleView = (roomId: number) => {
    console.log('View room:', roomId);
    // Implement view functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Room Management
            </h1>
            <p className="text-gray-500 mt-1">Manage your property's rooms and suites</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-2.5 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus className="h-5 w-5" />
            Add New Room
          </button>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
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

            {/* Status Filter */}
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

        {/* Rooms Table */}
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
                {filteredAndSortedRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-slate-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{room.name}</p>
                          <p className="text-xs text-gray-500">ID: RM-{String(room.id).padStart(3, '0')}</p>
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
                        {room.amenities.slice(0, 2).map((amenity, idx) => (
                          <span key={idx} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
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
                          onClick={() => handleView(room.id)}
                          className="p-2 text-gray-500 hover:text-slate-600 hover:bg-gray-100 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(room.id)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Room"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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

          {/* Empty State */}
          {filteredAndSortedRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No rooms found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Table Footer */}
          <div className="border-t border-gray-100 px-6 py-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredAndSortedRooms.length}</span> of{' '}
                <span className="font-semibold">{rooms.length}</span> rooms
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-white transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
