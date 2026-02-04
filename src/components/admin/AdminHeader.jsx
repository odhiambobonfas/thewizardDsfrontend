import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiUser, FiSun, FiMoon, FiSettings, FiLogOut, FiChevronDown, FiMail, FiFileText } from 'react-icons/fi';
import api from '../../services/api';

const AdminHeader = () => {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const currentUser = api.admin.getCurrentUser();
    setUser(currentUser);
    
    // Check for dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
    
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch recent contacts
      const contactsResponse = await fetch('http://localhost:5000/api/contact?limit=3', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const contactsData = await contactsResponse.json();
      
      // Fetch recent applications
      const appsResponse = await fetch('http://localhost:5000/api/applications?limit=3', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const appsData = await appsResponse.json();
      
      const notifs = [];
      
      if (contactsData.success && contactsData.data) {
        contactsData.data.forEach(contact => {
          notifs.push({
            id: contact._id,
            type: 'contact',
            icon: FiMail,
            message: `New contact from ${contact.name}`,
            time: new Date(contact.createdAt).toLocaleTimeString(),
            link: '/admin/contacts'
          });
        });
      }
      
      if (appsData.success && appsData.data) {
        appsData.data.forEach(app => {
          notifs.push({
            id: app._id,
            type: 'application',
            icon: FiFileText,
            message: `New job application from ${app.firstName} ${app.lastName}`,
            time: new Date(app.createdAt).toLocaleTimeString(),
            link: '/admin/applications'
          });
        });
      }
      
      setNotifications(notifs.slice(0, 5));
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const handleLogout = () => {
    api.admin.logout();
    window.location.href = '/admin/login';
  };

  return (
    <header className="h-16 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TheWizarDs Admin
        </h1>
        <span className="hidden md:block text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-semibold">
          v1.0
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
          title="Toggle theme"
        >
          {isDark ? (
            <FiSun className="w-5 h-5 text-yellow-500" />
          ) : (
            <FiMoon className="w-5 h-5 text-dark-600" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
          >
            <FiBell className="w-5 h-5 text-dark-600 dark:text-dark-300" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-200 dark:border-dark-700 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-700">
                <h3 className="font-semibold text-dark-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-dark-500 dark:text-dark-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(notif => {
                    const Icon = notif.icon;
                    return (
                      <Link
                        key={notif.id}
                        to={notif.link}
                        onClick={() => setShowNotifications(false)}
                        className="flex items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.type === 'contact' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                          <Icon className={`w-4 h-4 ${notif.type === 'contact' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-dark-900 dark:text-white">{notif.message}</p>
                          <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{notif.time}</p>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-700">
                <Link
                  to="/admin/contacts"
                  onClick={() => setShowNotifications(false)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <span className="hidden md:block text-sm font-medium text-dark-900 dark:text-white">
              {user?.email?.split('@')[0] || 'Admin'}
            </span>
            <FiChevronDown className="w-4 h-4 text-dark-600 dark:text-dark-300" />
          </button>
          
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-200 dark:border-dark-700 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-700">
                <p className="text-sm font-semibold text-dark-900 dark:text-white">
                  {user?.email || 'admin@thewizards.com'}
                </p>
                <p className="text-xs text-dark-500 dark:text-dark-400">Administrator</p>
              </div>
              <Link
                to="/admin/settings"
                onClick={() => setShowProfile(false)}
                className="flex items-center px-4 py-2 text-sm text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                <FiSettings className="w-4 h-4 mr-3" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <FiLogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
