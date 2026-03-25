import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    rooms: 0,
    services: 0,
    messages: 0,
    galleryItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/analytics/totals');
        setStatsError(null);
        setStats({
          rooms: response.data.rooms || 0,
          services: response.data.services || 0,
          messages: response.data.messages || 0,
          galleryItems: response.data.gallery || 0,
        });
      } catch (err) {
        setStats({
          rooms: 0,
          services: 0,
          messages: 0,
          galleryItems: 0,
        });

        if (axios.isAxiosError(err) && !err.response) {
          setStatsError('Dashboard stats are unavailable because the backend API is not reachable.');
          return;
        }

        setStatsError('Dashboard stats could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin!</h1>
      {statsError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {statsError}
        </div>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Rooms', value: stats.rooms, color: 'bg-blue-500' },
          { label: 'Active Services', value: stats.services, color: 'bg-green-500' },
          { label: 'New Messages', value: stats.messages, color: 'bg-orange-500' },
          { label: 'Gallery Items', value: stats.galleryItems, color: 'bg-purple-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</p>
            <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <p className="text-gray-400 italic">No recent activity to show.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4">Room Availability</h3>
          <p className="text-gray-400 italic">No room status data available.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
