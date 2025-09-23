const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API configuration
const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

// Create authenticated headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    ...apiConfig.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${apiConfig.baseURL}${endpoint}`;
  
  const config = {
    method: 'GET',
    headers: getAuthHeaders(),
    ...options,
  };

  // Add body for non-GET requests
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
};

// Contact API functions
export const contactAPI = {
  // Submit contact form
  submit: async (contactData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: contactData,
    });
  },

  // Get all contacts (admin only)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/admin/contacts${queryString ? `?${queryString}` : ''}`);
  },

  // Update contact (admin only)
  update: async (id, updateData) => {
    return apiRequest(`/admin/contacts/${id}`, {
      method: 'PUT',
      body: updateData,
    });
  },

  // Delete contact (admin only)
  delete: async (id) => {
    return apiRequest(`/admin/contacts/${id}`, {
      method: 'DELETE',
    });
  },
};

// Portfolio API functions
export const portfolioAPI = {
  // Get all portfolio projects (public)
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/portfolio${queryString ? `?${queryString}` : ''}`);
  },

  // Get single portfolio project (public)
  getById: async (id) => {
    return apiRequest(`/portfolio/${id}`);
  },

  // Get featured projects (public)
  getFeatured: async () => {
    return apiRequest('/portfolio/featured');
  },

  // Create new project (admin only)
  create: async (projectData) => {
    return apiRequest('/portfolio', {
      method: 'POST',
      body: projectData,
    });
  },

  // Update project (admin only)
  update: async (id, updateData) => {
    return apiRequest(`/portfolio/${id}`, {
      method: 'PUT',
      body: updateData,
    });
  },

  // Delete project (admin only)
  delete: async (id) => {
    return apiRequest(`/portfolio/${id}`, {
      method: 'DELETE',
    });
  },

  // Upload project image (admin only)
  uploadImage: async (id, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return apiRequest(`/portfolio/${id}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: formData,
    });
  },

  // Admin portfolio management
  admin: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return apiRequest(`/admin/portfolio${queryString ? `?${queryString}` : ''}`);
    },
  },
};

// Services API functions
export const servicesAPI = {
  // Get all services
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/services${queryString ? `?${queryString}` : ''}`);
  },

  // Get single service
  getById: async (id) => {
    return apiRequest(`/services/${id}`);
  },

  // Get popular services
  getPopular: async () => {
    return apiRequest('/services/popular/list');
  },
};

// Admin API functions
export const adminAPI = {
  // Login
  login: async (credentials) => {
    const response = await apiRequest('/admin/login', {
      method: 'POST',
      body: credentials,
    });

    // Store token in localStorage
    if (response.success && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
    }

    return response;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!getAuthToken();
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get dashboard data
  getDashboard: async () => {
    return apiRequest('/admin/dashboard');
  },

  // Get admin statistics
  getStats: async () => {
    return apiRequest('/admin/stats');
  },
};

// Health check
export const healthAPI = {
  check: async () => {
    return apiRequest('/health');
  },
};

// Error handling utility
export const handleAPIError = (error) => {
  if (error.message.includes('401')) {
    // Unauthorized - redirect to login
    adminAPI.logout();
    window.location.href = '/admin/login';
    return 'Session expired. Please login again.';
  }

  if (error.message.includes('403')) {
    return 'Access denied. You do not have permission to perform this action.';
  }

  if (error.message.includes('404')) {
    return 'Resource not found.';
  }

  if (error.message.includes('429')) {
    return 'Too many requests. Please try again later.';
  }

  if (error.message.includes('500')) {
    return 'Server error. Please try again later.';
  }

  return error.message || 'An unexpected error occurred.';
};

// Request interceptor for common error handling
export const withErrorHandling = (apiFunction) => {
  return async (...args) => {
    try {
      return await apiFunction(...args);
    } catch (error) {
      const errorMessage = handleAPIError(error);
      throw new Error(errorMessage);
    }
  };
};

// Export default API object
const api = {
  contact: contactAPI,
  portfolio: portfolioAPI,
  services: servicesAPI,
  admin: adminAPI,
  health: healthAPI,
  handleError: handleAPIError,
  withErrorHandling,
};

export default api;
