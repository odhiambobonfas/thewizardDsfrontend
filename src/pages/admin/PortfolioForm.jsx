import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiSave,
  FiX,
  FiUpload,
  FiTrash2,
  FiPlus,
  FiAlertCircle,
  FiCheck
} from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

const PortfolioForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'web-development',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    status: 'draft',
    priority: 0,
    duration: '',
    teamSize: 1,
    client: {
      name: '',
      company: '',
      feedback: '',
      rating: 5
    },
    features: [],
    challenges: [],
    tags: [],
    seo: {
      metaTitle: '',
      metaDescription: '',
      slug: ''
    }
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [newChallenge, setNewChallenge] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !formData.seo.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        seo: { ...prev.seo, slug }
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.title]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/portfolio/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        const project = data.data;
        setFormData({
          title: project.title || '',
          description: project.description || '',
          shortDescription: project.shortDescription || '',
          category: project.category || 'web-development',
          technologies: project.technologies || [],
          liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '',
          featured: project.featured || false,
          status: project.status || 'draft',
          priority: project.priority || 0,
          duration: project.duration || '',
          teamSize: project.teamSize || 1,
          client: project.client || {
            name: '',
            company: '',
            feedback: '',
            rating: 5
          },
          features: project.features || [],
          challenges: project.challenges || [],
          tags: project.tags || [],
          seo: project.seo || {
            metaTitle: '',
            metaDescription: '',
            slug: ''
          }
        });
        setImages(project.images || []);
      }
    } catch (err) {
      setError('Failed to fetch project: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);

    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, {
          url: reader.result,
          alt: file.name,
          isPrimary: prev.length === 0,
          isNew: true
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimaryImage = (index) => {
    setImages(prev => prev.map((img, i) => ({
      ...img,
      isPrimary: i === index
    })));
  };

  const handleAddItem = (field, value, setValue) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setValue('');
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      const projectData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
          projectData.append(key, JSON.stringify(formData[key]));
        } else if (Array.isArray(formData[key])) {
          projectData.append(key, JSON.stringify(formData[key]));
        } else {
          projectData.append(key, formData[key]);
        }
      });

      // Add new image files
      imageFiles.forEach((file, index) => {
        projectData.append('images', file);
      });

      // Add existing images data
      const existingImages = images.filter(img => !img.isNew);
      if (existingImages.length > 0) {
        projectData.append('existingImages', JSON.stringify(existingImages));
      }

      let response;
      if (isEditMode) {
        response = await api.portfolio.update(id, projectData);
      } else {
        response = await api.portfolio.create(projectData);
      }

      if (response.success) {
        setSuccess(isEditMode ? 'Project updated successfully!' : 'Project created successfully!');
        setTimeout(() => {
          navigate('/admin/portfolio');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  const categories = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'desktop-app', label: 'Desktop App' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'portfolio-website', label: 'Portfolio Website' },
    { value: 'full-stack', label: 'Full Stack' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            {isEditMode ? 'Update project details and featured status' : 'Create a new portfolio project'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/portfolio')}
          className="flex items-center space-x-2 px-4 py-2 text-dark-600 dark:text-dark-400 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5" />
          <span>Cancel</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center space-x-2 text-green-600 dark:text-green-400"
        >
          <FiCheck className="w-5 h-5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div
          className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center space-x-2 text-red-600 dark:text-red-400"
        >
          <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Basic Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                maxLength={150}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Brief description (150 characters max)"
              />
              <p className="mt-1 text-xs text-dark-500 dark:text-dark-400">
                {formData.shortDescription.length}/150 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Full Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Detailed project description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="e.g., 3 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Team Size
                </label>
                <input
                  type="number"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  min={1}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Priority
                </label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  min={0}
                  max={100}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-300"
              />
              <label htmlFor="featured" className="text-sm font-medium text-dark-700 dark:text-dark-300">
                Mark as Featured Project
              </label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Project Images
          </h2>

          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                <div className="text-center">
                  <FiUpload className="w-12 h-12 mx-auto mb-4 text-dark-400" />
                  <span className="text-sm text-dark-600 dark:text-dark-400">
                    Click to upload images or drag and drop
                  </span>
                  <span className="text-xs text-dark-500 dark:text-dark-500 block mt-1">
                    PNG, JPG, GIF up to 10MB
                  </span>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group"
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center space-x-2">
                      {!image.isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimaryImage(index)}
                          className="px-2 py-1 bg-primary-500 text-white text-xs rounded hover:bg-primary-600"
                        >
                          Set Primary
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {image.isPrimary && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Technologies
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('technologies', newTech, setNewTech))}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Add technology (e.g., React, Node.js)"
              />
              <button
                type="button"
                onClick={() => handleAddItem('technologies', newTech, setNewTech)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded-full text-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('technologies', index)}
                      className="ml-2 text-primary-700 dark:text-primary-300 hover:text-primary-800 dark:hover:text-gray-200"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Key Features
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('features', newFeature, setNewFeature))}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Add a key feature"
              />
              <button
                type="button"
                onClick={() => handleAddItem('features', newFeature, setNewFeature)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.features.length > 0 && (
              <ul className="space-y-2">
                {formData.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <span className="text-dark-700 dark:text-dark-300">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('features', index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Challenges */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Challenges & Solutions
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newChallenge}
                onChange={(e) => setNewChallenge(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('challenges', newChallenge, setNewChallenge))}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Add a challenge faced and how it was solved"
              />
              <button
                type="button"
                onClick={() => handleAddItem('challenges', newChallenge, setNewChallenge)}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.challenges.length > 0 && (
              <ul className="space-y-2">
                {formData.challenges.map((challenge, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <span className="text-dark-700 dark:text-dark-300">{challenge}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('challenges', index)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Links & Tags */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Links & Tags
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Tags
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('tags', newTag, setNewTag))}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="Add tags (e.g., responsive, modern, secure)"
                />
                <button
                  type="button"
                  onClick={() => handleAddItem('tags', newTag, setNewTag)}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 rounded-full text-sm"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('tags', index)}
                        className="ml-2 text-dark-500 dark:text-dark-500 hover:text-dark-700 dark:hover:text-dark-300"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Client Information
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  name="client.name"
                  value={formData.client.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="client.company"
                  value={formData.client.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Client Feedback
              </label>
              <textarea
                name="client.feedback"
                value={formData.client.feedback}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Client testimonial or feedback"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                name="client.rating"
                value={formData.client.rating}
                onChange={handleInputChange}
                min={1}
                max={5}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            SEO Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="seo.metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="SEO title for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Meta Description
              </label>
              <textarea
                name="seo.metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="SEO description for search engines"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                name="seo.slug"
                value={formData.seo.slug}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="project-url-slug"
              />
              <p className="mt-1 text-xs text-dark-500 dark:text-dark-400">
                Auto-generated from title if left empty
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/portfolio')}
            className="px-6 py-3 border border-gray-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-3 border-2 border-blue-200/30 text-white font-semibold rounded-lg hover:bg-transparent hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader size="small" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiSave className="w-5 h-5" />
                <span>{isEditMode ? 'Update Project' : 'Create Project'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;
