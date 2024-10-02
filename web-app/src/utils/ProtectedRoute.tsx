import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state);

  const isAuthenticated = () => {
    return user.loggedIn; // Check for token or user login status
  };

  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected page)
  return children;
};

export default ProtectedRoute;
