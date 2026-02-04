import React, { useState, useEffect } from 'react';
import {
  FiStar,
  FiCheck,
  FiX,
  FiTrash2,
  FiSearch,
  FiAlertCircle,
  FiAward
} from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/testimonials/admin/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTestimonials(data.data.testimonials || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      if (data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}/toggle-featured`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchTestimonials();
      }
    } catch (err) {
      alert('Failed to toggle featured: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        setTestimonials(testimonials.filter(t => t._id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      alert('Failed to delete testimonial: ' + err.message);
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = 
      testimonial.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.projectName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || testimonial.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
          Client Testimonials
        </h1>
        <p className="text-dark-600 dark:text-dark-400">
          Manage client testimonials and reviews
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center space-x-2 text-red-600 dark:text-red-400">
          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Testimonials List */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-12 shadow-sm border border-gray-100 dark:border-dark-700 text-center">
          <FiAward className="w-16 h-16 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
            No Testimonials Found
          </h3>
          <p className="text-dark-600 dark:text-dark-400">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No testimonials have been submitted yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Left: Testimonial Content */}
                <div className="flex-1">
                  {/* Client Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                        {testimonial.clientName}
                      </h3>
                      {testimonial.role && (
                        <p className="text-sm text-dark-600 dark:text-dark-400">
                          {testimonial.role}{testimonial.company && ` at ${testimonial.company}`}
                        </p>
                      )}
                      {testimonial.projectName && (
                        <p className="text-xs text-blue-500 dark:text-blue-300 mt-1">
                          Project: {testimonial.projectName}
                        </p>
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-dark-600 dark:text-dark-300 italic mb-4">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 text-xs text-dark-500 dark:text-dark-400">
                    <span>Email: {testimonial.clientEmail}</span>
                    <span>•</span>
                    <span>Submitted: {new Date(testimonial.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-2 lg:min-w-[200px]">
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        testimonial.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : testimonial.status === 'rejected'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}
                    >
                      {testimonial.status}
                    </span>
                    {testimonial.featured && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-blue-300">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {testimonial.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(testimonial._id, 'approved')}
                          className="flex items-center justify-center space-x-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                          <FiCheck className="w-4 h-4" />
                          <span className="text-sm font-medium">Approve</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(testimonial._id, 'rejected')}
                          className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <FiX className="w-4 h-4" />
                          <span className="text-sm font-medium">Reject</span>
                        </button>
                      </>
                    )}

                    {testimonial.status === 'approved' && (
                      <button
                        onClick={() => handleToggleFeatured(testimonial._id)}
                        className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                          testimonial.featured
                            ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                            : 'bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 hover:bg-gray-200 dark:hover:bg-dark-600'
                        }`}
                      >
                        <FiStar className={`w-4 h-4 ${testimonial.featured ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">
                          {testimonial.featured ? 'Unfeatured' : 'Feature'}
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() => setDeleteConfirm(testimonial._id)}
                      className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white dark:bg-dark-800 rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-dark-600 dark:text-dark-400 mb-6">
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialList;
