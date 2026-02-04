import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiBriefcase,
  FiExternalLink,
  FiGithub,
  FiEye,
  FiStar,
  FiAlertCircle,
  FiImage
} from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

const PortfolioList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.portfolio.admin.getAll();
      if (response.success) {
        setProjects(response.data.projects || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.portfolio.delete(id);
      if (response.success) {
        setProjects(projects.filter(project => project._id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${id}/toggle-featured`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setProjects(projects.map(p => 
          p._id === id ? { ...p, featured: data.data.featured } : p
        ));
      }
    } catch (err) {
      alert('Failed to toggle featured status: ' + err.message);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [
    'all',
    'web-development',
    'mobile-app',
    'desktop-app',
    'cybersecurity',
    'portfolio-website',
    'full-stack',
    'ui-ux-design',
    'other'
  ];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            Portfolio Projects
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Manage your portfolio projects and featured work
          </p>
        </div>
        <Link
          to="/admin/portfolio/new"
          className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search projects..."
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
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </option>
            ))}
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

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-12 shadow-sm border border-gray-100 dark:border-dark-700 text-center">
          <FiBriefcase className="w-16 h-16 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
            No Projects Found
          </h3>
          <p className="text-dark-600 dark:text-dark-400 mb-6">
            {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first portfolio project'}
          </p>
          <Link
            to="/admin/portfolio/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Project</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project._id}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400/60 to-gray-400/60">
                {project.images && project.images.length > 0 && project.images[0].url ? (
                  <img
                    src={project.images[0].url}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiImage className="w-16 h-16 text-white/50" />
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {project.featured && (
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full flex items-center">
                      <FiStar className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      project.status === 'published'
                        ? 'bg-green-500 text-white'
                        : project.status === 'draft'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 line-clamp-2">
                  {project.title}
                </h3>
                
                <p className="text-sm text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">
                  {project.shortDescription || project.description}
                </p>

                {/* Category */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded text-xs font-medium">
                    {project.category?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 rounded text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Stats & Links */}
                <div className="flex items-center justify-between text-sm text-dark-500 dark:text-dark-400 mb-4 pt-4 border-t border-gray-100 dark:border-dark-700">
                  <div className="flex space-x-3">
                    {project.analytics && (
                      <>
                        <span className="flex items-center">
                          <FiEye className="w-4 h-4 mr-1" />
                          {project.analytics.views || 0}
                        </span>
                        <span className="flex items-center">
                          <FiStar className="w-4 h-4 mr-1" />
                          {project.analytics.likes || 0}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 dark:text-blue-300 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 dark:text-blue-300 hover:text-primary-700 dark:hover:text-primary-300"
                      >
                        <FiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleFeatured(project._id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      project.featured
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                        : 'bg-gray-50 dark:bg-dark-700 text-dark-600 dark:text-dark-400 hover:bg-gray-100 dark:hover:bg-dark-600'
                    }`}
                  >
                    <FiStar className="w-4 h-4" />
                    <span>{project.featured ? 'Featured' : 'Feature'}</span>
                  </button>
                  <Link
                    to={`/admin/portfolio/edit/${project._id}`}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors text-sm font-medium"
                  >
                    <FiEdit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(project._id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium"
                  >
                    <FiTrash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
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
              Are you sure you want to delete this project? This action cannot be undone and all associated images will be removed.
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

export default PortfolioList;
