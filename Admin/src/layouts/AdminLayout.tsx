import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Image as ImageIcon, 
  MessageSquare, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  Search,
  Sun,
  Moon,
  Hotel
} from 'lucide-react';
import { useState, useEffect } from 'react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/', description: 'Overview & analytics' },
    { title: 'Rooms', icon: <Bed size={20} />, path: '/rooms', description: 'Manage accommodations' },
    { title: 'Services', icon: <Briefcase size={20} />, path: '/services', description: 'Guest amenities' },
    { title: 'Gallery', icon: <ImageIcon size={20} />, path: '/gallery', description: 'Media management' },
    { title: 'Messages', icon: <MessageSquare size={20} />, path: '/messages', description: 'Guest inquiries' },
    { title: 'Settings', icon: <Settings size={20} />, path: '/settings', description: 'System preferences' },
  ];

  // Check for saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.clear();
    navigate('/login');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.title : 'Dashboard';
  };

  const getPageDescription = () => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.description : 'Welcome to your admin panel';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white 
          transition-all duration-300 ease-in-out z-50 flex flex-col shadow-2xl
          ${isSidebarOpen ? 'w-72' : 'w-20'} 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Hotel className="h-5 w-5 text-white" />
              </div>
            </div>
            {isSidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  ETHIOBERNO
                </h1>
                <p className="text-xs text-slate-400">Luxury Hotel Management</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="hidden lg:flex p-2 hover:bg-slate-800 rounded-lg transition-all duration-200"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-8 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }
                    `}
                  >
                    <span className={`${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400'} transition-colors`}>
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                          {item.description}
                        </div>
                      </div>
                    )}
                    {isActive && isSidebarOpen && (
                      <div className="w-1 h-8 bg-amber-400 rounded-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-700/50">
          {isSidebarOpen && (
            <div className="mb-4 p-3 bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                  A
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-xs text-slate-400 truncate">Super Administrator</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200
              text-red-400 hover:text-red-300 hover:bg-red-900/20
              ${!isSidebarOpen && 'justify-center'}
            `}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              </button>
              
              {/* Page Title */}
              <div className="hidden sm:block">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  {getPageTitle()}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {getPageDescription()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Search size={20} className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full">
                      <span className="animate-ping absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full opacity-75" />
                    </span>
                  )}
                </button>
              </div>

              {/* User Dropdown */}
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
                </div>
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 flex items-center justify-center text-white font-bold shadow-md hover:shadow-lg transition-all">
                    A
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2">
                        <User size={16} />
                        Profile Settings
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8 min-h-[calc(100vh-73px)]">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 py-4 px-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 ETHIOBERNO Hotel Management System. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
