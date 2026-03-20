import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Bed, Settings, LogOut, Menu, X, Image as ImageIcon, MessageSquare, Briefcase } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { title: 'Rooms', icon: <Bed size={20} />, path: '/rooms' },
    { title: 'Services', icon: <Briefcase size={20} />, path: '/services' },
    { title: 'Gallery', icon: <ImageIcon size={20} />, path: '/gallery' },
    { title: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const handleLogout = () => {
    // Basic logout logic
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-wider">ETHIOBERNO</h1>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow mt-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="flex items-center p-3 rounded-lg hover:bg-slate-800 transition-colors group"
                >
                  <span className="text-slate-400 group-hover:text-white">{item.icon}</span>
                  {isSidebarOpen && <span className="ml-4 font-medium">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="text-right mr-2">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
