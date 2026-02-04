import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiEye,
  FiEyeOff,
  FiBriefcase,
  FiAlertCircle,
  FiMapPin,
  FiClock,
  FiCalendar
} from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/jobs/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setJobs(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setJobs(jobs.filter(j => j._id !== id));
        setDeleteConfirm(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to delete job: ' + err.message);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}/toggle-featured`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setJobs(jobs.map(j => j._id === id ? data.data : j));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to toggle featured: ' + err.message);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'closed' : 'active';
      
      const response = await fetch(`http://localhost:5000/api/jobs/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (data.success) {
        setJobs(jobs.map(j => j._id === id ? data.data : j));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'closed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      case 'draft':
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      'full-time': 'Full Time',
      'part-time': 'Part Time',
      'contract': 'Contract',
      'remote': 'Remote',
      'hybrid': 'Hybrid'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-xl text-dark-600 dark:text-dark-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">
            Job Vacancies
          </h1>
          <p className="text-dark-600 dark:text-dark-300 mt-2">
            Manage job openings and career opportunities
          </p>
        </div>
        <Link
          to="/admin/jobs/new"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-gray-400 text-white font-semibold rounded-lg hover:shadow-lg duration-300"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Post New Job
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Total Jobs</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {jobs.length}
              </p>
            </div>
            <FiBriefcase className="w-12 h-12 text-blue-300" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Active</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {jobs.filter(j => j.status === 'active').length}
              </p>
            </div>
            <FiEye className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Featured</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {jobs.filter(j => j.featured).length}
              </p>
            </div>
            <FiStar className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Closed</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {jobs.filter(j => j.status === 'closed').length}
              </p>
            </div>
            <FiEyeOff className="w-12 h-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-700 rounded-lg">
          <FiBriefcase className="w-16 h-16 text-dark-300 mx-auto mb-4" />
          <p className="text-xl text-dark-600 dark:text-dark-300 mb-4">
            No jobs posted yet
          </p>
          <Link
            to="/admin/jobs/new"
            className="inline-flex items-center px-6 py-3 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              className="bg-white dark:bg-dark-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                        {job.title}
                      </h3>
                      {job.featured && (
                        <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded text-xs font-medium">
                          <FiStar className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-dark-600 dark:text-dark-300">
                      {job.department}
                    </p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-300">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-300">
                    <FiClock className="w-4 h-4 mr-1" />
                    {getTypeLabel(job.type)}
                  </div>
                  <div className="flex items-center text-sm text-dark-600 dark:text-dark-300">
                    <FiBriefcase className="w-4 h-4 mr-1" />
                    {job.experienceLevel}
                  </div>
                  {job.applicationDeadline && (
                    <div className="flex items-center text-sm text-dark-600 dark:text-dark-300">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-dark-600 dark:text-dark-300 line-clamp-2 mb-4">
                  {job.description}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-200 dark:border-dark-600">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleFeatured(job._id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        job.featured
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 hover:bg-yellow-200'
                          : 'bg-dark-100 dark:bg-dark-600 text-dark-600 dark:text-dark-300 hover:bg-dark-200'
                      }`}
                      title={job.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <FiStar className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleToggleStatus(job._id, job.status)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        job.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200'
                          : 'bg-dark-100 dark:bg-dark-600 text-dark-600 dark:text-dark-300 hover:bg-dark-200'
                      }`}
                      title={job.status === 'active' ? 'Close job' : 'Activate job'}
                    >
                      {job.status === 'active' ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/jobs/edit/${job._id}`}
                      className="p-2 bg-blue-50/30 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={() => setDeleteConfirm(job._id)}
                      className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                    >
                      <FiTrash2 className="w-4 h-4" />
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
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <div
              className="bg-white dark:bg-dark-800 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full mx-auto mb-4">
                <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 dark:text-white text-center mb-2">
                Delete Job?
              </h3>
              <p className="text-dark-600 dark:text-dark-300 text-center mb-6">
                Are you sure you want to delete this job posting? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
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

export default JobList;
