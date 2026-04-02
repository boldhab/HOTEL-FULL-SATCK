import { useEffect, useRef, useState } from 'react';
import { 
  House,
  Wrench,
  MessageCircle,
  ImageIcon,
  RefreshCw,
  Calendar,
  KeyRound,
  DollarSign
} from 'lucide-react';
import axios from 'axios';
import api from '../services/api';

interface DashboardStats {
  rooms: number;
  services: number;
  messages: number;
  galleryItems: number;
  recentBookings: number;
  occupancyRate: number;
  revenue: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    rooms: 0,
    services: 0,
    messages: 0,
    galleryItems: 0,
    recentBookings: 0,
    occupancyRate: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchStats = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      const response = await api.get('/analytics/totals');
      setStatsError(null);
      setStats({
        rooms: response.data.rooms || 0,
        services: response.data.services || 0,
        messages: response.data.messages || 0,
        galleryItems: response.data.gallery || 0,
        recentBookings: response.data.recentBookings || 24,
        occupancyRate: response.data.occupancyRate || 78,
        revenue: response.data.revenue || 12450,
      });
    } catch (err) {
      setStats({
        rooms: 0,
        services: 0,
        messages: 0,
        galleryItems: 0,
        recentBookings: 0,
        occupancyRate: 0,
        revenue: 0,
      });

      if (axios.isAxiosError(err) && !err.response) {
        setStatsError('Dashboard stats are unavailable because the backend API is not reachable.');
        return;
      }

      setStatsError('Dashboard stats could not be loaded right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;
    fetchStats();
  }, []);

  const handleRefresh = () => {
    fetchStats(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Rooms', 
      value: stats.rooms, 
      icon: House,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+12%',
      trendUp: true
    },
    { 
      label: 'Active Services', 
      value: stats.services, 
      icon: Wrench,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+5%',
      trendUp: true
    },
    { 
      label: 'New Messages', 
      value: stats.messages, 
      icon: MessageCircle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      trend: '-3%',
      trendUp: false
    },
    { 
      label: 'Gallery Items', 
      value: stats.galleryItems, 
      icon: ImageIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+8%',
      trendUp: true
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Welcome back, Admin
            </h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your property today</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Error Alert */}
        {statsError && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 flex items-center gap-2">
            <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {statsError}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.label}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{stat.trend}</span>
                    {stat.trendUp ? '↑' : '↓'}
                  </div>
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
              <div className={`h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </div>
          ))}
        </div>

        {/* Secondary Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                This Week
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.recentBookings}</p>
            <p className="text-sm text-gray-500 mt-1">Recent Bookings</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <KeyRound className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Current
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.occupancyRate}%</p>
            <p className="text-sm text-gray-500 mt-1">Occupancy Rate</p>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${stats.occupancyRate}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-amber-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Monthly
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Recent Bookings
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500">Deluxe Room • 2 nights</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">$320</p>
                      <p className="text-xs text-gray-500">Check-in: Dec 15</p>
                    </div>
                  </div>
                ))}
                <p className="text-center text-gray-400 italic text-sm py-2">No more recent bookings to display</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <House className="h-5 w-5 text-green-600" />
                  Room Availability
                </h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Manage Rooms →
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Standard Rooms</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-green-600 font-medium">8 Available</span>
                    <span className="text-sm text-gray-400">/ 12 Total</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '66%' }} />
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-700">Deluxe Rooms</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-green-600 font-medium">5 Available</span>
                    <span className="text-sm text-gray-400">/ 8 Total</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '62.5%' }} />
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-gray-700">Suites</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-orange-600 font-medium">2 Available</span>
                    <span className="text-sm text-gray-400">/ 4 Total</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '50%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
