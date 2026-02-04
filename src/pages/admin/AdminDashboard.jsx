import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers,
  FiBriefcase,
  FiMail,
  FiTrendingUp,
  FiEye,
  FiStar,
  FiAlertCircle,
  FiFileText,
  FiAward,
  FiUserCheck
} from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [applicationStats, setApplicationStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    fetchApplicationStats();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.admin.getDashboard();
      if (response.success) {
        setDashboardData(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/applications/stats/overview', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setApplicationStats(result.data);
      }
    } catch (err) {
      console.error('Error fetching application stats:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-dark-600 dark:text-dark-400 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Contacts',
      value: dashboardData?.overview?.totalContacts || 0,
      icon: FiMail,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/contacts',
      change: ''
    },
    {
      label: 'New Contacts',
      value: dashboardData?.overview?.newContacts || 0,
      icon: FiTrendingUp,
      color: 'from-green-500 to-green-600',
      link: '/admin/contacts',
      change: ''
    },
    {
      label: 'Portfolio Projects',
      value: dashboardData?.overview?.totalProjects || 0,
      icon: FiBriefcase,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/portfolio',
      change: ''
    },
    {
      label: 'Job Applications',
      value: applicationStats?.total || 0,
      icon: FiFileText,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/applications',
      change: ''
    },
    {
      label: 'Team Members',
      value: dashboardData?.overview?.teamMembers || 0,
      icon: FiUsers,
      color: 'from-pink-500 to-pink-600',
      link: '/admin/team',
      change: ''
    },
    {
      label: 'Testimonials',
      value: dashboardData?.overview?.testimonials || 0,
      icon: FiAward,
      color: 'from-yellow-500 to-yellow-600',
      link: '/admin/testimonials',
      change: ''
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={stat.label}
                  to={stat.link}
                  className="block bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-dark-700 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {stat.change && (
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-dark-900 dark:text-white">
                    {stat.value}
                  </p>
                </Link>
              );
            })}
          </div>

      {/* Quick Stats - Applications */}
      {applicationStats && applicationStats.total > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-dark-600 dark:text-dark-400 mb-1">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {applicationStats.pending || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <FiFileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-dark-600 dark:text-dark-400 mb-1">Shortlisted</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {applicationStats.shortlisted || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <FiUserCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-dark-600 dark:text-dark-400 mb-1">Interviewed</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {applicationStats.interviewed || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-dark-600 dark:text-dark-400 mb-1">Total Applications</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {applicationStats.total || 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Contacts */}
      {dashboardData?.recentContacts && dashboardData.recentContacts.length > 0 && (
        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white">
              Recent Contacts
            </h2>
            <Link
              to="/admin/contacts"
              className="text-blue-300 hover:text-blue-400 font-medium text-sm"
            >
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-dark-900 dark:text-white">
                      {contact.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600 dark:text-dark-400">
                      {contact.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600 dark:text-dark-400">
                      {contact.serviceType?.replace(/-/g, ' ')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          contact.status === 'new'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : contact.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-dark-600 dark:text-dark-400">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Service Statistics */}
      {dashboardData?.serviceStats && dashboardData.serviceStats.length > 0 && (
        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Service Requests Breakdown
          </h2>
          <div className="space-y-4">
            {dashboardData.serviceStats.slice(0, 5).map((service) => (
              <div key={service._id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-dark-700 dark:text-dark-300 capitalize">
                    {service._id?.replace(/-/g, ' ')}
                  </span>
                  <span className="text-sm font-bold text-dark-900 dark:text-white">
                    {service.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400/60 to-gray-400/60 h-2 rounded-full duration-500"
                    style={{
                      width: `${(service.count / dashboardData.overview.totalContacts) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Link
          to="/admin/team"
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white hover:shadow-xl duration-300"
        >
          <FiUsers className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">Manage Team</h3>
          <p className="text-gray-100 text-sm">
            Add, edit, or remove team members
          </p>
        </Link>

        <Link
          to="/admin/portfolio"
          className="bg-gradient-to-br from-cyber-500 to-cyber-600 rounded-xl p-6 text-white hover:shadow-xl duration-300"
        >
          <FiBriefcase className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">Manage Portfolio</h3>
          <p className="text-cyber-100 text-sm">
            Add new projects or update existing ones
          </p>
        </Link>

        <Link
          to="/admin/contacts"
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-xl duration-300"
        >
          <FiMail className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">View Contacts</h3>
          <p className="text-purple-100 text-sm">
            Review and respond to contact inquiries
          </p>
        </Link>
      </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
