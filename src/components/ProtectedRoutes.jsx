import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, guestOnly = false }) => {
  const token = useAuthStore((state) => state.token);
  if (guestOnly) {
    if (token) {
      return <Navigate to="/" replace />;
    } else {
      return children;
    }
  } else {
    if (!token) {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  }
};

export default ProtectedRoute;
