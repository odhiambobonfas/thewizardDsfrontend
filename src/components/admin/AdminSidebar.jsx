import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiMail,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart2,
  FiAward,
  FiFileText
} from 'react-icons/fi';
import api from '../../services/api';
import logo from '../../assets/images/logo.png';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/team', icon: FiUsers, label: 'Team Members' },
    { path: '/admin/portfolio', icon: FiBriefcase, label: 'Portfolio' },
    { path: '/admin/jobs', icon: FiBriefcase, label: 'Job Vacancies' },
    { path: '/admin/applications', icon: FiFileText, label: 'Applications' },
    { path: '/admin/contacts', icon: FiMail, label: 'Contacts' },
    { path: '/admin/clients', icon: FiAward, label: 'Clients' },
    { path: '/admin/testimonials', icon: FiAward, label: 'Testimonials' },
    { path: '/admin/stats', icon: FiBarChart2, label: 'Statistics' },
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
  ];

  const handleLogout = () => {
    api.admin.logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-600 text-white shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-dark-900 border-r border-gray-200 dark:border-dark-700 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-dark-700">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={logo} alt="TheWizarDs Logo" className="w-10 h-10 object-contain" />
              </div>
              <span className="text-xl font-bold text-dark-900 dark:text-white">
                Admin Panel
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary-500 text-white'
                          : 'text-dark-600 dark:text-dark-300 hover:bg-gray-100 dark:hover:bg-dark-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-700">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export default AdminSidebar;
