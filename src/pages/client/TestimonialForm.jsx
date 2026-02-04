import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiStar,
  FiUser,
  FiFileText,
  FiAward,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

const TestimonialForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    company: '',
    role: '',
    projectName: '',
    testimonial: '',
    rating: 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          clientName: '',
          clientEmail: '',
          company: '',
          role: '',
          projectName: '',
          testimonial: '',
          rating: 5
        });
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/client/testimonial-success');
        }, 3000);
      } else {
        setError(data.message || 'Failed to submit testimonial');
      }
    } catch (err) {
      setError('Unable to submit testimonial. Please try again later.');
      console.error('Testimonial submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 particle-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 via-blue-50 to-gray-100 text-white section-padding hero-glow relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-gray-400/10 rounded-full blur-3xl "></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-blue-400/10 rounded-full blur-3xl  delay-1000"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <div
          >
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-6"
            >
              <FiAward className="w-4 h-4 mr-2 text-cyber-400" />
              <span className="text-sm font-medium text-gray-100">Share Your Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Client <span className="text-cyber-400">Testimonial</span>
            </h1>

            <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              We value your feedback! Share your experience working with us and help others understand the value we deliver.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {success && (
              <div
                className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 flex items-start space-x-4"
              >
                <FiCheck className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-2">
                    Testimonial Submitted Successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for sharing your experience! Your testimonial will be reviewed and published soon. 
                    Redirecting you to confirmation page...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div
                className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 flex items-start space-x-4"
              >
                <FiAlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">
                    Submission Error
                  </h3>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            )}

            <div
              className="p-8 lg:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white flex items-center">
                    <FiUser className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="clientEmail"
                        value={formData.clientEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                        placeholder="Acme Corporation"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                        Your Role / Position
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                        placeholder="CTO / Project Manager"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white"
                      placeholder="AI Platform Development"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-dark-700">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white flex items-center">
                    <FiStar className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                    Your Rating
                  </h2>

                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="duration-200 hover:scale-110"
                      >
                        <FiStar
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-dark-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-4 text-dark-600 dark:text-dark-400 font-medium">
                      {formData.rating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-dark-700">
                  <h2 className="text-2xl font-bold text-dark-900 dark:text-white flex items-center">
                    <FiFileText className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                    Your Testimonial
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                      Share your experience <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="testimonial"
                      value={formData.testimonial}
                      onChange={handleChange}
                      required
                      rows={6}
                      minLength={20}
                      maxLength={1000}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-dark-700 text-dark-900 dark:text-white resize-none"
                      placeholder="Tell us about your experience working with us. What did you like most? How did we help achieve your goals?"
                    />
                    <div className="mt-2 flex justify-between text-sm text-dark-500 dark:text-dark-400">
                      <span>Minimum 20 characters</span>
                      <span>{formData.testimonial.length} / 1000</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading || success}
                    className="w-full flex items-center justify-center px-8 py-4 border-2 border-blue-300/40 text-white font-bold rounded-xl hover:bg-transparent hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className=" rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                      </>
                    ) : success ? (
                      <>
                        <FiCheck className="w-5 h-5 mr-2" />
                        Submitted Successfully!
                      </>
                    ) : (
                      <>
                        <FiAward className="w-5 h-5 mr-2" />
                        Submit Testimonial
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-sm text-dark-500 dark:text-dark-400 mt-4">
                  Your testimonial will be reviewed by our team before being published on our website.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialForm;
