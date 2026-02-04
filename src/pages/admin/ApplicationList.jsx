import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiBriefcase, 
  FiDownload, 
  FiEye, 
  FiTrash2, 
  FiGlobe,
  FiLinkedin,
  FiUser
} from 'react-icons/fi';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const url = filterStatus === 'all' 
        ? 'http://localhost:5000/api/applications'
        : `http://localhost:5000/api/applications?status=${filterStatus}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setApplications(result.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();
      if (result.success) {
        fetchApplications();
        if (selectedApplication?._id === applicationId) {
          setSelectedApplication(result.data);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update application status');
    }
  };

  const handleDelete = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        fetchApplications();
        setShowDetails(false);
        setSelectedApplication(null);
      }
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application');
    }
  };

  const handleDownloadCV = (cvUrl, fileName) => {
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = fileName || 'cv.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewDetails = async (application) => {
    setSelectedApplication(application);
    setShowDetails(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      reviewing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      shortlisted: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      interviewed: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
      offered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      withdrawn: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark-900 dark:text-white mb-2">Job Applications</h1>
          <p className="text-dark-600 dark:text-dark-300 text-sm sm:text-base">
            Manage and review candidate applications
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-900 dark:text-white border border-dark-300 dark:border-dark-600'}`}
        >
          All ({applications.length})
        </button>
        {['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 sm:px-4 py-2 rounded-lg capitalize text-sm sm:text-base ${filterStatus === status ? 'bg-blue-600 text-white' : 'bg-white dark:bg-dark-800 text-dark-900 dark:text-white border border-dark-300 dark:border-dark-600'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider whitespace-nowrap">
                  Candidate
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider whitespace-nowrap">
                  Position
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider whitespace-nowrap">
                  Experience
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider whitespace-nowrap">
                  Applied Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-dark-700 dark:text-dark-300 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-200 dark:divide-dark-700">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-dark-600 dark:text-dark-400">
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-dark-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-semibold text-dark-900 dark:text-white">
                          {app.firstName} {app.lastName}
                        </div>
                        <div className="text-sm text-dark-600 dark:text-dark-400">{app.email}</div>
                        <div className="text-sm text-dark-600 dark:text-dark-400">{app.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-900 dark:text-white">
                      {app.jobTitle}
                    </td>
                    <td className="px-6 py-4 text-dark-900 dark:text-white">
                      {app.experience} years
                    </td>
                    <td className="px-6 py-4 text-dark-900 dark:text-white">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="offered">Offered</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewDetails(app)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                          title="View Details"
                        >
                          <FiEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDownloadCV(app.cv.url, app.cv.fileName)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                          title="Download CV"
                        >
                          <FiDownload className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(app._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          title="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-dark-200 dark:border-dark-700 flex justify-between items-center sticky top-0 bg-white dark:bg-dark-800">
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Application Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Candidate Info */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                  Candidate Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Name</p>
                    <p className="font-semibold text-dark-900 dark:text-white">
                      {selectedApplication.firstName} {selectedApplication.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Email</p>
                    <a href={`mailto:${selectedApplication.email}`} className="font-semibold text-blue-600 hover:underline">
                      {selectedApplication.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Phone</p>
                    <a href={`tel:${selectedApplication.phone}`} className="font-semibold text-blue-600 hover:underline">
                      {selectedApplication.phone}
                    </a>
                  </div>
                  {selectedApplication.location && (
                    <div>
                      <p className="text-sm text-dark-600 dark:text-dark-400">Location</p>
                      <p className="font-semibold text-dark-900 dark:text-white">{selectedApplication.location}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Info */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                  <FiBriefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Background
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Experience</p>
                    <p className="font-semibold text-dark-900 dark:text-white">
                      {selectedApplication.experience} years
                    </p>
                  </div>
                  {selectedApplication.currentCompany && (
                    <div>
                      <p className="text-sm text-dark-600 dark:text-dark-400">Current Company</p>
                      <p className="font-semibold text-dark-900 dark:text-white">{selectedApplication.currentCompany}</p>
                    </div>
                  )}
                  {selectedApplication.currentPosition && (
                    <div>
                      <p className="text-sm text-dark-600 dark:text-dark-400">Current Position</p>
                      <p className="font-semibold text-dark-900 dark:text-white">{selectedApplication.currentPosition}</p>
                    </div>
                  )}
                  {selectedApplication.expectedSalary && (
                    <div>
                      <p className="text-sm text-dark-600 dark:text-dark-400">Expected Salary</p>
                      <p className="font-semibold text-dark-900 dark:text-white">{selectedApplication.expectedSalary}</p>
                    </div>
                  )}
                  {selectedApplication.availableFrom && (
                    <div>
                      <p className="text-sm text-dark-600 dark:text-dark-400">Available From</p>
                      <p className="font-semibold text-dark-900 dark:text-white">
                        {new Date(selectedApplication.availableFrom).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Links */}
              {(selectedApplication.linkedIn || selectedApplication.portfolio) && (
                <div>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                    <FiGlobe className="w-5 h-5 mr-2 text-blue-600" />
                    Online Profiles
                  </h3>
                  <div className="space-y-2">
                    {selectedApplication.linkedIn && (
                      <a
                        href={selectedApplication.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <FiLinkedin className="w-4 h-4 mr-2" />
                        LinkedIn Profile
                      </a>
                    )}
                    {selectedApplication.portfolio && (
                      <a
                        href={selectedApplication.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <FiGlobe className="w-4 h-4 mr-2" />
                        Portfolio Website
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Cover Letter */}
              {selectedApplication.coverLetter && (
                <div>
                  <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">Cover Letter</h3>
                  <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                    <p className="text-dark-900 dark:text-white whitespace-pre-wrap">
                      {selectedApplication.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              {/* CV Download */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">CV/Resume</h3>
                <button
                  onClick={() => handleDownloadCV(selectedApplication.cv.url, selectedApplication.cv.fileName)}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <FiDownload className="w-5 h-5 mr-2" />
                  Download CV ({selectedApplication.cv.fileName})
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-dark-200 dark:border-dark-700">
                <button
                  onClick={() => setShowDetails(false)}
                  className="flex-1 px-6 py-3 border-2 border-dark-300 dark:border-dark-600 text-dark-900 dark:text-white rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedApplication._id)}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationList;
