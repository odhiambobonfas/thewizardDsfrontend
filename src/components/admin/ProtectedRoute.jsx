import React from 'react';
import { Navigate } from 'react-router-dom';
import api from '../../services/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = api.admin.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
