import { useState } from 'react';
import { 
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Sparkles,
  Clock3,
  DollarSign,
  BadgeCheck,
  X,
  Eye,
  Star
} from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  category: 'spa' | 'dining' | 'transport' | 'entertainment' | 'business' | 'other';
  price: number;
  duration: string;
  rating: number;
  availability: 'available' | 'limited' | 'unavailable';
  icon: string;
  popular: boolean;
}

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample data - replace with API call
  const [services] = useState<Service[]>([
    {
      id: 1,
      name: 'Luxury Spa Treatment',
      description: 'Full body massage with aromatherapy and hot stones. Includes access to sauna and steam room.',
      category: 'spa',
      price: 120,
      duration: '90 min',
      rating: 4.8,
      availability: 'available',
      icon: '💆',
      popular: true
    },
    {
      id: 2,
      name: 'Fine Dining Experience',
      description: '5-course gourmet dinner prepared by our Michelin-starred chef. Wine pairing available.',
      category: 'dining',
      price: 250,
      duration: '120 min',
      rating: 4.9,
      availability: 'available',
      icon: '🍽️',
      popular: true
    },
    {
      id: 3,
      name: 'Airport Transfer',
      description: 'Luxury car service to/from the airport. Professional driver and bottled water included.',
      category: 'transport',
      price: 85,
      duration: '45 min',
      rating: 4.7,
      availability: 'available',
      icon: '🚗',
      popular: false
    },
    {
      id: 4,
      name: 'Private Tour Guide',
      description: 'Personalized city tour with local expert. Flexible itinerary based on your interests.',
      category: 'entertainment',
      price: 180,
      duration: '4 hours',
      rating: 4.6,
      availability: 'limited',
      icon: '🏛️',
      popular: true
    },
    {
      id: 5,
      name: 'Conference Room Rental',
      description: 'Fully equipped meeting room with AV equipment, catering, and high-speed WiFi.',
      category: 'business',
      price: 300,
      duration: '8 hours',
      rating: 4.5,
      availability: 'available',
      icon: '💼',
      popular: false
    },
    {
      id: 6,
      name: 'Poolside Cabana',
      description: 'Private cabana with dedicated server, complimentary drinks, and towel service.',
      category: 'entertainment',
      price: 95,
      duration: 'Half day',
      rating: 4.8,
      availability: 'unavailable',
      icon: '🏖️',
      popular: true
    }
  ]);

  const getCategoryColor = (category: Service['category']) => {
    const colors = {
      spa: 'from-purple-500 to-purple-600',
      dining: 'from-orange-500 to-orange-600',
      transport: 'from-blue-500 to-blue-600',
      entertainment: 'from-pink-500 to-pink-600',
      business: 'from-emerald-500 to-emerald-600',
      other: 'from-gray-500 to-gray-600'
    };
    return colors[category];
  };

  const getCategoryLabel = (category: Service['category']) => {
    const labels = {
      spa: 'Spa & Wellness',
      dining: 'Dining',
      transport: 'Transportation',
      entertainment: 'Entertainment',
      business: 'Business',
      other: 'Other Services'
    };
    return labels[category];
  };

  const getAvailabilityColor = (availability: Service['availability']) => {
    const colors = {
      available: 'bg-emerald-100 text-emerald-700',
      limited: 'bg-amber-100 text-amber-700',
      unavailable: 'bg-red-100 text-red-700'
    };
    return colors[availability];
  };

  const getAvailabilityLabel = (availability: Service['availability']) => {
    const labels = {
      available: 'Available',
      limited: 'Limited Spots',
      unavailable: 'Currently Unavailable'
    };
    return labels[availability];
  };

  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
      const matchesAvailability = availabilityFilter === 'all' || service.availability === availabilityFilter;
      return matchesSearch && matchesCategory && matchesAvailability;
    });

  const handleEdit = (serviceId: number) => {
    console.log('Edit service:', serviceId);
    // Implement edit functionality
  };

  const handleDelete = (serviceId: number) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      console.log('Delete service:', serviceId);
      // Implement delete functionality
    }
  };

  const handleViewDetails = (service: Service) => {
    setSelectedService(service);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Service Management
            </h1>
            <p className="text-gray-500 mt-1">Manage amenities and guest services</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-2.5 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Plus className="h-5 w-5" />
            Add New Service
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            <p className="text-xs text-gray-500 mt-1">Active Services</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Popular
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{services.filter(s => s.popular).length}</p>
            <p className="text-xs text-gray-500 mt-1">Popular Services</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Revenue
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${services.reduce((sum, s) => sum + s.price, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Total Value</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock3 className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Available
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {services.filter(s => s.availability === 'available').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Ready to Book</p>
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
                placeholder="Search services by name or description..."
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
                <option value="all">All Categories</option>
                <option value="spa">Spa & Wellness</option>
                <option value="dining">Dining</option>
                <option value="transport">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Availability Filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer"
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="limited">Limited Spots</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Service Icon and Popular Badge */}
              <div className="relative p-6 pb-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-start justify-between">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(service.category)} rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  {service.popular && (
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-semibold">Popular</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className="p-6 pt-0">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                    {getCategoryLabel(service.category)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock3 className="h-4 w-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">{service.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                      <span className="text-xs text-gray-500">/ service</span>
                    </div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(service.availability)}`}>
                      {getAvailabilityLabel(service.availability)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleViewDetails(service)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(service.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Sparkles className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No services found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
              <Plus className="h-4 w-4" />
              Add Your First Service
            </button>
          </div>
        )}

        {/* Service Details Modal */}
        {showDetailsModal && selectedService && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailsModal(false)}>
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className={`bg-gradient-to-r ${getCategoryColor(selectedService.category)} p-6 text-white rounded-t-2xl`}>
                <div className="flex justify-between items-start">
                  <div className="text-5xl">{selectedService.icon}</div>
                  <button onClick={() => setShowDetailsModal(false)} className="text-white hover:text-gray-200">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold mt-4">{selectedService.name}</h2>
                <p className="text-white/90 text-sm mt-1">{getCategoryLabel(selectedService.category)}</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-1">Description</h4>
                    <p className="text-gray-700">{selectedService.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Duration</h4>
                      <p className="text-gray-900 font-medium">{selectedService.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Price</h4>
                      <p className="text-gray-900 font-medium">${selectedService.price}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Rating</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-gray-900 font-medium">{selectedService.rating}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-1">Availability</h4>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(selectedService.availability)}`}>
                        {getAvailabilityLabel(selectedService.availability)}
                      </span>
                    </div>
                  </div>
                  {selectedService.popular && (
                    <div className="bg-amber-50 rounded-lg p-3 flex items-center gap-2">
                      <BadgeCheck className="h-5 w-5 text-amber-600" />
                      <span className="text-sm text-amber-800 font-medium">Popular choice among guests</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
                    Edit Service
                  </button>
                  <button className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
