import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiSave,
  FiX,
  FiUpload,
  FiTrash2,
  FiPlus,
  FiUser,
  FiAlertCircle,
  FiCheck,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiGlobe
} from 'react-icons/fi';
import api from '../../services/api';
import Loader from '../../components/common/Loader';

const TeamForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    expertise: '',
    bio: '',
    experience: 0,
    skills: [],
    certifications: [],
    email: '',
    linkedin: '',
    github: '',
    website: '',
    order: 0,
    status: 'active'
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    if (isEditMode) {
      fetchTeamMember();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchTeamMember = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/team/${id}`);
      const data = await response.json();
      
      if (data.success) {
        const member = data.data;
        setFormData({
          name: member.name || '',
          role: member.role || '',
          expertise: member.expertise || '',
          bio: member.bio || '',
          experience: member.experience || 0,
          skills: member.skills || [],
          certifications: member.certifications || [],
          email: member.socialLinks?.email || '',
          linkedin: member.socialLinks?.linkedin || '',
          github: member.socialLinks?.github || '',
          website: member.socialLinks?.website || '',
          order: member.order || 0,
          status: member.status || 'active'
        });
        if (member.avatar?.url) {
          setAvatarPreview(member.avatar.url);
        }
      }
    } catch (err) {
      setError('Failed to fetch team member: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      const memberData = new FormData();
      
      // Add all form fields
      memberData.append('name', formData.name);
      memberData.append('role', formData.role);
      memberData.append('expertise', formData.expertise);
      memberData.append('bio', formData.bio);
      memberData.append('experience', formData.experience);
      memberData.append('skills', JSON.stringify(formData.skills));
      memberData.append('certifications', JSON.stringify(formData.certifications));
      memberData.append('order', formData.order);
      memberData.append('status', formData.status);

      // Add social links
      const socialLinks = {
        email: formData.email,
        linkedin: formData.linkedin,
        github: formData.github,
        website: formData.website
      };
      memberData.append('socialLinks', JSON.stringify(socialLinks));

      // Add avatar file if present
      if (avatarFile) {
        memberData.append('avatar', avatarFile);
      }

      let response;
      if (isEditMode) {
        response = await api.team.admin.update(id, memberData);
      } else {
        response = await api.team.admin.create(memberData);
      }

      if (response.success) {
        setSuccess(isEditMode ? 'Team member updated successfully!' : 'Team member created successfully!');
        setTimeout(() => {
          navigate('/admin/team');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to save team member');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">
            {isEditMode ? 'Edit Team Member' : 'Add Team Member'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400">
            {isEditMode ? 'Update team member details' : 'Add a new member to your team'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/team')}
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
        {/* Avatar Upload */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Profile Picture
          </h2>

          <div className="flex items-center space-x-6">
            <div className="relative">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-200/50"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400/60 to-gray-400/60 rounded-full flex items-center justify-center">
                  <FiUser className="w-16 h-16 text-white" />
                </div>
              )}
              {avatarPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setAvatarPreview(null);
                    setAvatarFile(null);
                  }}
                  className="absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex-1">
              <label className="block px-6 py-4 border-2 border-dashed border-gray-300 dark:border-dark-600 rounded-lg cursor-pointer hover:border-blue-300 transition-colors">
                <div className="text-center">
                  <FiUpload className="w-8 h-8 mx-auto mb-2 text-dark-400" />
                  <span className="text-sm text-dark-600 dark:text-dark-400">
                    Click to upload profile picture
                  </span>
                  <span className="text-xs text-dark-500 dark:text-dark-500 block mt-1">
                    PNG, JPG up to 5MB
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Basic Information
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Role/Position *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                  placeholder="Senior Developer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Expertise/Specialization *
              </label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Full Stack Development, AI, Cybersecurity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Bio *
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Brief biography and background..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min={0}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Skills
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Add a skill (e.g., React, Python, AWS)"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-gray-50/50 dark:bg-blue-900/5 text-blue-500 dark:text-blue-300 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
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

        {/* Certifications */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Certifications
          </h2>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCertification())}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="Add a certification"
              />
              <button
                type="button"
                onClick={handleAddCertification}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            {formData.certifications.length > 0 && (
              <ul className="space-y-2">
                {formData.certifications.map((cert, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <span className="text-dark-700 dark:text-dark-300">{cert}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
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

        {/* Social Links */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
          <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-6">
            Social Links
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                <FiMail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                <FiLinkedin className="inline w-4 h-4 mr-2" />
                LinkedIn
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                <FiGithub className="inline w-4 h-4 mr-2" />
                GitHub
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="https://github.com/johndoe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                <FiGlobe className="inline w-4 h-4 mr-2" />
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                placeholder="https://johndoe.com"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/team')}
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
                <span>{isEditMode ? 'Update Member' : 'Add Member'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
