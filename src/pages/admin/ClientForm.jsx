import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiSave,
  FiX,
  FiUpload,
  FiStar,
  FiAlertCircle,
  FiCheck
} from 'react-icons/fi';
import Loader from '../../components/common/Loader';

const ClientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    testimonial: '',
    rating: 5,
    featured: false,
    order: 0,
    status: 'active'
  });

  useEffect(() => {
    if (isEditMode) {
      fetchClient();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchClient = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/clients/${id}`);
      const data = await response.json();
      
      if (data.success) {
        const client = data.data;
        setFormData({
          name: client.name || '',
          role: client.role || '',
          company: client.company || '',
          testimonial: client.testimonial || '',
          rating: client.rating || 5,
          featured: client.featured || false,
          order: client.order || 0,
          status: client.status || 'active'
        });
        if (client.logo?.url) {
          setLogoPreview(client.logo.url);
        }
      }
    } catch (err) {
      setError('Failed to fetch client: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('role', formData.role);
      submitData.append('company', formData.company);
      submitData.append('testimonial', formData.testimonial);
      submitData.append('rating', formData.rating);
      submitData.append('featured', formData.featured);
      submitData.append('order', formData.order);
      submitData.append('status', formData.status);

      if (logoFile) {
        submitData.append('logo', logoFile);
      }

      const url = isEditMode 
        ? `http://localhost:5000/api/clients/${id}`
        : 'http://localhost:5000/api/clients';
      
      const response = await fetch(url, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: submitData
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/clients');
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to save client: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode && !formData.name) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
          {isEditMode ? 'Edit Client' : 'Add New Client'}
        </h1>
        <p className="text-dark-600 dark:text-dark-300">
          {isEditMode ? 'Update client testimonial information' : 'Add a new client testimonial to display on the home page'}
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div
          className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg flex items-center"
        >
          <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
          <span className="text-green-800 dark:text-green-300">
            Client {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-lg flex items-center"
        >
          <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
          <span className="text-red-800 dark:text-red-300">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-700 rounded-lg shadow-md p-8 space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Company Logo (Optional)
          </label>
          <div className="flex items-center space-x-6">
            {logoPreview && (
              <div className="w-24 h-24 bg-dark-100 dark:bg-dark-600 rounded-lg p-2 flex items-center justify-center">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-dark-100 dark:bg-dark-600 text-dark-700 dark:text-dark-200 rounded-lg hover:bg-dark-200 dark:hover:bg-dark-500 transition-colors duration-200">
              <FiUpload className="w-5 h-5 mr-2" />
              <span>Upload Logo</span>
              <input
                type="file"
                onChange={handleLogoChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">
            Recommended: Square image, PNG or JPG, max 2MB
          </p>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Client Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-dark-900 dark:text-white"
            placeholder="John Doe"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Role/Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-dark-900 dark:text-white"
            placeholder="CTO, VP Engineering, etc."
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-dark-900 dark:text-white"
            placeholder="Company Name"
          />
        </div>

        {/* Testimonial */}
        <div>
          <label htmlFor="testimonial" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Testimonial <span className="text-red-500">*</span>
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            value={formData.testimonial}
            onChange={handleInputChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-dark-900 dark:text-white resize-none"
            placeholder="Share the client's experience and feedback..."
          />
          <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">
            {formData.testimonial.length} characters
          </p>
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleInputChange}
              className="flex-1"
            />
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-6 h-6 ${
                    i < formData.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-dark-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-dark-900 dark:text-white w-12">
              {formData.rating}/5
            </span>
          </div>
        </div>

        {/* Display Order */}
        <div>
          <label htmlFor="order" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-dark-900 dark:text-white"
            placeholder="0"
          />
          <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">
            Lower numbers appear first
          </p>
        </div>

        {/* Featured & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-300 bg-white dark:bg-dark-600 border-dark-300 dark:border-dark-500 rounded focus:ring-2 focus:ring-blue-300"
              />
              <span className="text-sm font-medium text-dark-700 dark:text-dark-200">
                Featured Client
              </span>
            </label>
            <p className="text-sm text-dark-500 dark:text-dark-400 mt-2 ml-8">
              Display prominently on home page
            </p>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-white dark:bg-dark-600 border border-dark-300 dark:border-dark-500 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-dark-900 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-dark-200 dark:border-dark-600">
          <button
            type="button"
            onClick={() => navigate('/admin/clients')}
            className="px-6 py-2 bg-dark-100 dark:bg-dark-600 text-dark-700 dark:text-dark-200 rounded-lg hover:bg-dark-200 dark:hover:bg-dark-500 transition-colors duration-200 flex items-center"
          >
            <FiX className="w-5 h-5 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full  mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5 mr-2" />
                {isEditMode ? 'Update Client' : 'Add Client'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
