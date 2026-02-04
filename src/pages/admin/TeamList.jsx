import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiUser,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiGlobe,
  FiAlertCircle
} from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

const TeamList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.team.admin.getAll();
      if (response.success) {
        setMembers(response.data.members || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.team.delete(id);
      if (response.success) {
        setMembers(members.filter(member => member._id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      alert('Failed to delete team member: ' + err.message);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.expertise?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            Team Members
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Manage your team members and their information
          </p>
        </div>
        <Link
          to="/admin/team/new"
          className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Member</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search team members..."
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
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
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

      {/* Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-12 shadow-sm border border-gray-100 dark:border-dark-700 text-center">
          <FiUser className="w-16 h-16 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
            No Team Members Found
          </h3>
          <p className="text-dark-600 dark:text-dark-400 mb-6">
            {searchTerm || filterStatus !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first team member'}
          </p>
          <Link
            to="/admin/team/new"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add Member</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member, index) => (
            <div
              key={member._id}
              className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Avatar and Status */}
              <div className="flex items-start justify-between mb-4">
                {member.avatar?.url ? (
                  <img
                    src={member.avatar.url}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/60 to-gray-400/60 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {member.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}
                >
                  {member.status}
                </span>
              </div>

              {/* Name and Role */}
              <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-blue-500 dark:text-blue-300 font-medium mb-2">
                {member.role}
              </p>

              {/* Expertise */}
              {member.expertise && (
                <p className="text-sm text-dark-600 dark:text-dark-400 mb-4 line-clamp-2">
                  {member.expertise}
                </p>
              )}

              {/* Experience */}
              {member.experience && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded text-xs font-medium">
                    {member.experience}
                  </span>
                </div>
              )}

              {/* Skills */}
              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {member.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 rounded text-xs">
                      +{member.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Social Links */}
              {(member.social?.email || member.social?.linkedin || member.social?.github || member.social?.website) && (
                <div className="flex space-x-2 mb-4 pt-4 border-t border-gray-100 dark:border-dark-700">
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-dark-500 dark:text-dark-400 hover:text-blue-300 dark:hover:text-blue-200 transition-colors"
                    >
                      <FiMail className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-500 dark:text-dark-400 hover:text-blue-300 dark:hover:text-blue-200 transition-colors"
                    >
                      <FiLinkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-500 dark:text-dark-400 hover:text-blue-300 dark:hover:text-blue-200 transition-colors"
                    >
                      <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.website && (
                    <a
                      href={member.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-500 dark:text-dark-400 hover:text-blue-300 dark:hover:text-blue-200 transition-colors"
                    >
                      <FiGlobe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Link
                  to={`/admin/team/edit/${member._id}`}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <FiEdit className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
                </Link>
                <button
                  onClick={() => setDeleteConfirm(member._id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
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
              Are you sure you want to delete this team member? This action cannot be undone.
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

export default TeamList;
