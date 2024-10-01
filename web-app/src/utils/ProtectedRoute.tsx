import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulate authentication check
const isAuthenticated = () => {
  return localStorage.getItem('authToken'); // Check for token or user login status
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected page)
  return children;
};

export default ProtectedRoute;
