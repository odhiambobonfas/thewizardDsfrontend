import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiUser, 
  FiGlobe,
  FiUpload,
  FiCheckCircle,
  FiAlertCircle,
  FiFileText
} from 'react-icons/fi';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    coverLetter: '',
    experience: '',
    currentCompany: '',
    currentPosition: '',
    availableFrom: '',
    expectedSalary: ''
  });

  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState('');

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Job not found');
        }
        const result = await response.json();
        if (result.success) {
          setJob(result.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvError('');

    if (!file) {
      setCvFile(null);
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      setCvError('Please upload a PDF or Word document');
      setCvFile(null);
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setCvError('File size must be less than 5MB');
      setCvFile(null);
      return;
    }

    setCvFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cvFile) {
      setCvError('Please upload your CV/Resume');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('cv', cvFile);
      formDataToSend.append('jobId', jobId);
      
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      setSuccess(true);
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate('/careers');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !job) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
          <div className="text-center p-8">
            <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">Job Not Found</h2>
            <p className="text-dark-600 dark:text-dark-300 mb-6">{error}</p>
            <button
              onClick={() => navigate('/careers')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Careers
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (success) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
          <div className="text-center p-8 max-w-lg">
            <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">Application Submitted!</h2>
            <p className="text-dark-600 dark:text-dark-300 mb-6">
              Thank you for applying for the {job?.title} position. We'll review your application and get back to you soon.
            </p>
            <p className="text-sm text-dark-500 dark:text-dark-400">
              Redirecting to careers page...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Job Info Header */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-4">
              <FiBriefcase className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-dark-900 dark:text-white">{job?.title}</h1>
                <p className="text-dark-600 dark:text-dark-300">
                  {job?.department} • {job?.location} • {job?.type}
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Apply for this Position</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center">
                <FiAlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                  <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                  <FiBriefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Current Company
                    </label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Current Position
                    </label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Available From
                    </label>
                    <input
                      type="date"
                      name="availableFrom"
                      value={formData.availableFrom}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Expected Salary
                    </label>
                    <input
                      type="text"
                      name="expectedSalary"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                      placeholder="e.g., $80,000 - $100,000"
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                  <FiGlobe className="w-5 h-5 mr-2 text-blue-600" />
                  Online Profiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-4 flex items-center">
                  <FiFileText className="w-5 h-5 mr-2 text-blue-600" />
                  Upload Your CV/Resume *
                </h3>
                <div className="border-2 border-dashed border-dark-300 dark:border-dark-600 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="cv-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FiUpload className="w-12 h-12 text-blue-600 mb-4" />
                    {cvFile ? (
                      <div className="text-green-600 dark:text-green-400">
                        <p className="font-semibold">{cvFile.name}</p>
                        <p className="text-sm">Click to change file</p>
                      </div>
                    ) : (
                      <>
                        <p className="text-dark-900 dark:text-white font-semibold mb-2">
                          Click to upload your CV/Resume
                        </p>
                        <p className="text-sm text-dark-600 dark:text-dark-400">
                          PDF or Word document (max 5MB)
                        </p>
                      </>
                    )}
                  </label>
                  {cvError && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-2">{cvError}</p>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Tell us why you're a great fit for this position..."
                  className="w-full px-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-700 text-dark-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/careers')}
                  className="flex-1 px-6 py-3 border-2 border-dark-300 dark:border-dark-600 text-dark-900 dark:text-white rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 text-center text-sm text-dark-600 dark:text-dark-400">
            <p>
              By submitting this application, you agree to our data processing practices. 
              Your information will be used solely for recruitment purposes.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobApplication;
