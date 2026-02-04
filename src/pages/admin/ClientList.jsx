import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiEye,
  FiEyeOff,
  FiAward,
  FiAlertCircle
} from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/clients/admin/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setClients(data.data);
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
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setClients(clients.filter(c => c._id !== id));
        setDeleteConfirm(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to delete client: ' + err.message);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clients/${id}/toggle-featured`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setClients(clients.map(c => c._id === id ? data.data : c));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to toggle featured: ' + err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const client = clients.find(c => c._id === id);
      const newStatus = client.status === 'active' ? 'inactive' : 'active';
      
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (data.success) {
        setClients(clients.map(c => c._id === id ? data.data : c));
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
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
            Client Testimonials
          </h1>
          <p className="text-dark-600 dark:text-dark-300 mt-2">
            Manage client testimonials displayed on the home page
          </p>
        </div>
        <Link
          to="/admin/clients/new"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-gray-400 text-white font-semibold rounded-lg hover:shadow-lg duration-300"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Add Client
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Total Clients</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {clients.length}
              </p>
            </div>
            <FiAward className="w-12 h-12 text-blue-300" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Featured</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {clients.filter(c => c.featured).length}
              </p>
            </div>
            <FiStar className="w-12 h-12 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-600 dark:text-dark-300 text-sm">Active</p>
              <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <FiEye className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Clients List */}
      {clients.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-dark-700 rounded-lg">
          <FiAward className="w-16 h-16 text-dark-300 mx-auto mb-4" />
          <p className="text-xl text-dark-600 dark:text-dark-300 mb-4">
            No clients added yet
          </p>
          <Link
            to="/admin/clients/new"
            className="inline-flex items-center px-6 py-3 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add Your First Client
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <div
              key={client._id}
              className="bg-white dark:bg-dark-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {client.logo?.url ? (
                      <img
                        src={client.logo.url}
                        alt={client.company}
                        className="w-12 h-12 object-contain rounded-lg bg-dark-100 dark:bg-dark-600 p-2"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-dark-900 dark:text-white">
                        {client.name}
                      </h3>
                      <p className="text-sm text-dark-600 dark:text-dark-300">
                        {client.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex items-center space-x-2">
                    {client.featured && (
                      <span className="inline-flex items-center px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded text-xs font-medium">
                        <FiStar className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      client.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400'
                    }`}>
                      {client.status === 'active' ? <FiEye className="w-3 h-3 mr-1" /> : <FiEyeOff className="w-3 h-3 mr-1" />}
                      {client.status}
                    </span>
                  </div>
                </div>

                {/* Company */}
                <div className="mb-3">
                  <p className="text-sm font-semibold text-dark-900 dark:text-white">
                    {client.company}
                  </p>
                </div>

                {/* Testimonial */}
                <div className="mb-4">
                  <p className="text-sm text-dark-600 dark:text-dark-300 line-clamp-3">
                    "{client.testimonial}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < client.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-dark-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-dark-600 dark:text-dark-300">
                    ({client.rating}/5)
                  </span>
                </div>

                {/* Order */}
                <div className="mb-4 text-xs text-dark-500 dark:text-dark-400">
                  Display Order: {client.order}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-200 dark:border-dark-600">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleFeatured(client._id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        client.featured
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 hover:bg-yellow-200'
                          : 'bg-dark-100 dark:bg-dark-600 text-dark-600 dark:text-dark-300 hover:bg-dark-200'
                      }`}
                      title={client.featured ? 'Remove from featured' : 'Mark as featured'}
                    >
                      <FiStar className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleToggleStatus(client._id)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        client.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200'
                          : 'bg-dark-100 dark:bg-dark-600 text-dark-600 dark:text-dark-300 hover:bg-dark-200'
                      }`}
                      title={client.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {client.status === 'active' ? <FiEye className="w-4 h-4" /> : <FiEyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/clients/edit/${client._id}`}
                      className="p-2 bg-blue-50/30 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-200"
                    >
                      <FiEdit2 className="w-4 h-4" />
                    </Link>
                    
                    <button
                      onClick={() => setDeleteConfirm(client._id)}
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
                Delete Client?
              </h3>
              <p className="text-dark-600 dark:text-dark-300 text-center mb-6">
                Are you sure you want to delete this client? This action cannot be undone.
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

export default ClientList;
