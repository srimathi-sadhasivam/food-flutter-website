import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminLogin from '../pages/admin/AdminLogin';

/**
 * Main routing component that handles role-based access control
 * Redirects users based on their role after authentication
 */
const AppRouter = () => {
  const { isAuthenticated, role, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected user routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute requiredRole="user">
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected admin routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        
        {/* Default redirects based on role */}
        <Route 
          path="*" 
          element={
            isAuthenticated ? (
              role === 'admin' ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

/**
 * Landing page component (your existing landing page)
 * This should be your current landing page with login/signup modal
 */
const LandingPage = () => {
  const { isAuthenticated, role } = useAuth();

  // If user is already authenticated, redirect based on role
  React.useEffect(() => {
    if (isAuthenticated) {
      if (role === 'admin') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/home';
      }
    }
  }, [isAuthenticated, role]);

  // Return your existing landing page component here
  // This should be your current App component content
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Your existing landing page content */}
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Welcome to WellFood
        </h1>
        <p className="text-xl text-gray-600">
          Please log in to continue
        </p>
      </div>
    </div>
  );
};

export default AppRouter;
