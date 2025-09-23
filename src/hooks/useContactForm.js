import { useState } from 'react';
import { contactAPI } from '../services/api';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Prepare data for API submission
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        company: formData.company || undefined,
        serviceType: formData.service,
        message: formData.message,
        source: 'website_contact_form'
      };

      // Submit to backend API
      const response = await contactAPI.submit(submissionData);
      
      if (response.success) {
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          service: '',
          message: ''
        });

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error(response.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle specific error types
      if (error.message.includes('rate limit')) {
        setErrors({ submit: 'Too many requests. Please wait a moment before trying again.' });
      } else if (error.message.includes('validation')) {
        setErrors({ submit: 'Please check your information and try again.' });
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        setErrors({ submit: 'Network error. Please check your connection and try again.' });
      } else {
        setErrors({ submit: error.message || 'Failed to send message. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
    setErrors({});
    setIsSuccess(false);
  };

  const resetSuccess = () => {
    setIsSuccess(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
    resetForm,
    resetSuccess
  };
};