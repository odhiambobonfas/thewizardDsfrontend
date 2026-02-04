import React, { useState, useEffect } from 'react';
import {
  FiMail,
  FiBriefcase,
  FiTrendingUp,
  FiEye,
  FiStar,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiCalendar
} from 'react-icons/fi';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from '../../components/common/Loader';

const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('all');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Prepare data for charts
  const serviceData = stats?.contacts?.byService?.map((item, index) => ({
    name: item._id?.replace(/-/g, ' ') || 'Unknown',
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  const statusData = stats?.contacts?.byStatus?.map((item, index) => ({
    name: item._id,
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  const categoryData = stats?.portfolio?.byCategory?.map((item, index) => ({
    name: item._id?.replace(/-/g, ' ') || 'Unknown',
    value: item.count,
    color: COLORS[index % COLORS.length]
  })) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            Statistics & Analytics
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
        >
          <option value="all">All Time</option>
          <option value="year">This Year</option>
          <option value="month">This Month</option>
          <option value="week">This Week</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                Total Contacts
              </p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white">
                {stats?.contacts?.total || 0}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +{stats?.contacts?.thisMonth || 0} this month
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-300/80 to-blue-400/80 flex items-center justify-center">
              <FiMail className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                Total Projects
              </p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white">
                {stats?.portfolio?.total || 0}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {stats?.portfolio?.published || 0} published
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <FiBriefcase className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                Portfolio Views
              </p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white">
                {stats?.portfolio?.totalViews?.[0]?.total || 0}
              </p>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
                Across all projects
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
              <FiEye className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                Featured Projects
              </p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white">
                {stats?.portfolio?.featured || 0}
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                Highlighted work
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
              <FiStar className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Requests Breakdown */}
        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white">
              Service Requests
            </h2>
            <FiBarChart2 className="w-6 h-6 text-blue-300" />
          </div>
          {serviceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-dark-500 dark:text-dark-400">
              No data available
            </div>
          )}
        </div>

        {/* Contact Status Distribution */}
        <div
          className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white">
              Contact Status
            </h2>
            <FiPieChart className="w-6 h-6 text-blue-300" />
          </div>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-300 flex items-center justify-center text-dark-500 dark:text-dark-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Categories */}
      <div
        className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">
            Portfolio by Category
          </h2>
          <FiActivity className="w-6 h-6 text-blue-300" />
        </div>
        {categoryData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-300 flex items-center justify-center text-dark-500 dark:text-dark-400">
            No data available
          </div>
        )}
      </div>

      {/* Weekly Activity */}
      <div
        className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">
            Activity Summary
          </h2>
          <FiCalendar className="w-6 h-6 text-blue-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50/50 dark:bg-blue-900/5 rounded-lg">
            <FiMail className="w-8 h-8 text-blue-500 dark:text-blue-300 mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark-900 dark:text-white">
              {stats?.contacts?.thisWeek || 0}
            </p>
            <p className="text-sm text-dark-600 dark:text-dark-400 mt-1">
              New Contacts This Week
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <FiBriefcase className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark-900 dark:text-white">
              {stats?.portfolio?.published || 0}
            </p>
            <p className="text-sm text-dark-600 dark:text-dark-400 mt-1">
              Published Projects
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <FiTrendingUp className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-dark-900 dark:text-white">
              {Math.round(((stats?.contacts?.thisMonth || 0) / (stats?.contacts?.total || 1)) * 100)}%
            </p>
            <p className="text-sm text-dark-600 dark:text-dark-400 mt-1">
              Growth Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
