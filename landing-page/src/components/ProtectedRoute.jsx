import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component for role-based access control
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} props.requiredRole - Required role to access the route ('admin' or 'user')
 * @param {string} props.redirectTo - Where to redirect if access is denied
 */
const ProtectedRoute = ({ children, requiredRole = 'user', redirectTo = '/' }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole === 'admin' && role !== 'admin') {
    // User is not admin, redirect to home
    return <Navigate to="/home" replace />;
  }

  if (requiredRole === 'user' && role === 'admin') {
    // Admin trying to access user route, redirect to admin dashboard
    return <Navigate to="/admin-dashboard" replace />;
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
