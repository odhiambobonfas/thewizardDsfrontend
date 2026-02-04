import React, { useState, useEffect, useCallback } from 'react';
import {
  FiMail,
  FiPhone,
  FiBriefcase,
  FiTrash2,
  FiEye,
  FiSearch,
  FiDownload,
  FiAlertCircle,
  FiClock
} from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, total: 1 });

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts?page=${pagination.current}&limit=20&status=${filterStatus !== 'all' ? filterStatus : ''}&serviceType=${filterService !== 'all' ? filterService : ''}&priority=${filterPriority !== 'all' ? filterPriority : ''}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data.contacts);
        setPagination(data.data.pagination);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterService, filterPriority, pagination.current]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (data.success) {
        setContacts(contacts.map(c => c._id === contactId ? data.data : c));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handlePriorityUpdate = async (id, newPriority) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ priority: newPriority })
      });
      const data = await response.json();
      
      if (data.success) {
        setContacts(contacts.map(c => c._id === id ? data.data : c));
      }
    } catch (err) {
      alert('Failed to update priority: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setContacts(contacts.filter(c => c._id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      alert('Failed to delete contact: ' + err.message);
    }
  };

  const handleExport = () => {
    const csv = [
      ['Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Status', 'Priority', 'Message'],
      ...filteredContacts.map(c => [
        new Date(c.createdAt).toLocaleDateString(),
        c.name,
        c.email,
        c.phone || '',
        c.company || '',
        c.serviceType,
        c.status,
        c.priority,
        c.message
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-50 dark:bg-blue-900/10 text-blue-500 dark:text-blue-300';
      case 'contacted': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'in-progress': return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400';
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  if (loading && contacts.length === 0) {
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
            Contact Inquiries
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            Manage customer contacts and inquiries
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300"
        >
          <FiDownload className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search contacts..."
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
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Service Filter */}
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
          >
            <option value="all">All Services</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-app">Mobile App</option>
            <option value="desktop-app">Desktop App</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="consultation">Consultation</option>
            <option value="other">Other</option>
          </select>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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

      {/* Contacts List */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-12 shadow-sm border border-gray-100 dark:border-dark-700 text-center">
          <FiMail className="w-16 h-16 text-dark-300 dark:text-dark-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
            No Contacts Found
          </h3>
          <p className="text-dark-600 dark:text-dark-400">
            {searchTerm || filterStatus !== 'all' || filterService !== 'all' || filterPriority !== 'all'
              ? 'Try adjusting your search or filters'
              : 'No contact inquiries yet'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Contact Info
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Service
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Priority
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-dark-700 dark:text-dark-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-700">
                {filteredContacts.map((contact, index) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-gray-50 dark:hover:bg-dark-700"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">
                            {contact.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-dark-900 dark:text-white truncate">
                            {contact.name}
                          </p>
                          <div className="flex items-center text-xs text-dark-600 dark:text-dark-400 space-x-2 mt-1">
                            <FiMail className="w-3 h-3" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center text-xs text-dark-600 dark:text-dark-400 space-x-2 mt-1">
                              <FiPhone className="w-3 h-3" />
                              <span>{contact.phone}</span>
                            </div>
                          )}
                          {contact.company && (
                            <div className="flex items-center text-xs text-dark-600 dark:text-dark-400 space-x-2 mt-1">
                              <FiBriefcase className="w-3 h-3" />
                              <span>{contact.company}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-1 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded text-xs font-medium">
                        {contact.serviceType?.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(contact.status)} border-0 cursor-pointer`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={contact.priority}
                        onChange={(e) => handlePriorityUpdate(contact._id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(contact.priority)} border-0 cursor-pointer`}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-xs text-dark-600 dark:text-dark-400">
                        <FiClock className="w-3 h-3 mr-1" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedContact(contact);
                            setShowDetailModal(true);
                          }}
                          className="p-2 text-blue-500 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/15 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(contact._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.total > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-dark-700">
              <p className="text-sm text-dark-600 dark:text-dark-400">
                Showing {(pagination.current - 1) * 20 + 1} to {Math.min(pagination.current * 20, pagination.totalContacts)} of {pagination.totalContacts} contacts
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPagination({ ...pagination, current: pagination.current - 1 })}
                  disabled={pagination.current === 1}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPagination({ ...pagination, current: pagination.current + 1 })}
                  disabled={pagination.current === pagination.total}
                  className="px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm font-medium text-dark-700 dark:text-dark-300 hover:bg-gray-50 dark:hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white dark:bg-dark-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-dark-900 dark:text-white">
                Contact Details
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                <FiAlertCircle className="w-5 h-5 text-dark-600 dark:text-dark-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Name
                  </label>
                  <p className="text-dark-900 dark:text-white font-medium">
                    {selectedContact.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Email
                  </label>
                  <a href={`mailto:${selectedContact.email}`} className="text-blue-500 dark:text-blue-300 hover:underline">
                    {selectedContact.email}
                  </a>
                </div>
                {selectedContact.phone && (
                  <div>
                    <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                      Phone
                    </label>
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-500 dark:text-blue-300 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </div>
                )}
                {selectedContact.company && (
                  <div>
                    <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                      Company
                    </label>
                    <p className="text-dark-900 dark:text-white font-medium">
                      {selectedContact.company}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Service Interest
                  </label>
                  <p className="text-dark-900 dark:text-white font-medium">
                    {selectedContact.serviceType?.replace(/-/g, ' ')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Date Submitted
                  </label>
                  <p className="text-dark-900 dark:text-white font-medium">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {selectedContact.budget && (
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Budget Range
                  </label>
                  <p className="text-dark-900 dark:text-white font-medium">
                    {selectedContact.budget.replace(/-/g, ' ')}
                  </p>
                </div>
              )}

              {selectedContact.timeline && (
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Timeline
                  </label>
                  <p className="text-dark-900 dark:text-white font-medium">
                    {selectedContact.timeline.replace(/-/g, ' ')}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                  Message
                </label>
                <p className="text-dark-900 dark:text-white whitespace-pre-wrap p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  {selectedContact.message}
                </p>
              </div>

              {selectedContact.notes && (
                <div>
                  <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">
                    Admin Notes
                  </label>
                  <p className="text-dark-900 dark:text-white whitespace-pre-wrap p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    {selectedContact.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                Close
              </button>
              <a
                href={`mailto:${selectedContact.email}`}
                className="px-4 py-2 border-2 border-blue-200/30 text-white rounded-lg hover:bg-transparent hover:border-blue-300"
              >
                <FiMail className="inline w-4 h-4 mr-2" />
                Send Email
              </a>
            </div>
          </div>
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
              Are you sure you want to delete this contact? This action cannot be undone.
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

export default ContactList;
