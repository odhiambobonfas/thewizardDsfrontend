import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    experienceLevel: 'mid',
    description: '',
    responsibilities: [''],
    requirements: [''],
    benefits: [''],
    skills: [''],
    salary: {
      min: '',
      max: '',
      currency: 'USD',
      visible: true
    },
    applicationDeadline: '',
    status: 'active',
    featured: false,
    order: 0
  });

  useEffect(() => {
    if (isEdit) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        const job = data.data;
        setFormData({
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          experienceLevel: job.experienceLevel,
          description: job.description,
          responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [''],
          requirements: job.requirements.length > 0 ? job.requirements : [''],
          benefits: job.benefits.length > 0 ? job.benefits : [''],
          skills: job.skills.length > 0 ? job.skills : [''],
          salary: {
            min: job.salary?.min || '',
            max: job.salary?.max || '',
            currency: job.salary?.currency || 'USD',
            visible: job.salary?.visible !== undefined ? job.salary.visible : true
          },
          applicationDeadline: job.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split('T')[0] : '',
          status: job.status,
          featured: job.featured,
          order: job.order
        });
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('salary.')) {
      const salaryField = name.split('.')[1];
      setFormData({
        ...formData,
        salary: {
          ...formData.salary,
          [salaryField]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const handleAddArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const handleRemoveArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray.length > 0 ? newArray : ['']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(r => r.trim()),
        requirements: formData.requirements.filter(r => r.trim()),
        benefits: formData.benefits.filter(b => b.trim()),
        skills: formData.skills.filter(s => s.trim()),
        salary: {
          ...formData.salary,
          min: formData.salary.min ? Number(formData.salary.min) : undefined,
          max: formData.salary.max ? Number(formData.salary.max) : undefined
        }
      };

      const url = isEdit 
        ? `http://localhost:5000/api/jobs/${id}`
        : 'http://localhost:5000/api/jobs';
      
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(cleanedData)
      });

      const data = await response.json();

      if (data.success) {
        navigate('/admin/jobs');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white">
          {isEdit ? 'Edit Job' : 'Post New Job'}
        </h1>
        <p className="text-dark-600 dark:text-dark-300 mt-2">
          {isEdit ? 'Update job details' : 'Create a new job opening'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="bg-white dark:bg-dark-700 rounded-lg shadow-md p-6 space-y-6"
        >
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="e.g. Senior Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="e.g. Engineering"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="e.g. New York, NY or Remote"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Job Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Experience Level *
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
              placeholder="Provide a detailed description of the position..."
            />
          </div>

          {/* Responsibilities */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                Responsibilities
              </label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('responsibilities')}
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-50/30 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded hover:bg-blue-50/50"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="Enter a responsibility..."
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('responsibilities', index)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                Requirements
              </label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('requirements')}
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-50/30 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded hover:bg-blue-50/50"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="Enter a requirement..."
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('requirements', index)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                Benefits
              </label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('benefits')}
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-50/30 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded hover:bg-blue-50/50"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="Enter a benefit..."
                />
                {formData.benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('benefits', index)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300">
                Required Skills
              </label>
              <button
                type="button"
                onClick={() => handleAddArrayItem('skills')}
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-50/30 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded hover:bg-blue-50/50"
              >
                <FiPlus className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="Enter a skill..."
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('skills', index)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Salary */}
          <div>
            <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
              Salary Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Minimum Salary
                </label>
                <input
                  type="number"
                  name="salary.min"
                  value={formData.salary.min}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="50000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Maximum Salary
                </label>
                <input
                  type="number"
                  name="salary.max"
                  value={formData.salary.max}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                  placeholder="80000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Currency
                </label>
                <select
                  name="salary.currency"
                  value={formData.salary.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="salary.visible"
                  checked={formData.salary.visible}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-300 bg-white dark:bg-dark-600 border-dark-300 dark:border-dark-500 rounded focus:ring-blue-300"
                />
                <span className="ml-2 text-sm text-dark-700 dark:text-dark-300">
                  Display salary range to applicants
                </span>
              </label>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4">
              Job Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 text-dark-900 dark:text-white"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-300 bg-white dark:bg-dark-600 border-dark-300 dark:border-dark-500 rounded focus:ring-blue-300"
                  />
                  <span className="ml-2 text-sm text-dark-700 dark:text-dark-300">
                    Featured Job
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/jobs')}
            className="inline-flex items-center px-6 py-3 bg-dark-100 dark:bg-dark-700 text-dark-700 dark:text-dark-300 font-semibold rounded-lg hover:bg-dark-200 dark:hover:bg-dark-600 transition-colors duration-200"
          >
            <FiX className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-6 py-3 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300 disabled:opacity-50"
          >
            <FiSave className="w-5 h-5 mr-2" />
            {submitting ? 'Saving...' : isEdit ? 'Update Job' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
