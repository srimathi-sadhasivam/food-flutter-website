import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeJwt } from '../utils/jwt';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onLoginSuccess, setOnLoginSuccess] = useState(null);
  const [adminToken, setAdminToken] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('guest');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3017/api';

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('wellfood_user');
    const savedAdminToken = localStorage.getItem('wellfood_admin_token');
    const savedToken = localStorage.getItem('wellfood_token');
    const savedRole = localStorage.getItem('wellfood_role');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('wellfood_user');
      }
    }
    if (savedAdminToken) {
      setAdminToken(savedAdminToken);
    }
    if (savedToken) {
      setToken(savedToken);
      const decoded = decodeJwt(savedToken);
      if (decoded?.role) setRole(decoded.role);
    }
    if (savedRole) setRole(savedRole);
    setLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      // Try admin login first
      const adminRes = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const adminData = await adminRes.json();
      if (adminData?.success && adminData?.token) {
        localStorage.setItem('wellfood_admin_token', adminData.token);
        localStorage.setItem('wellfood_token', adminData.token); // Store as regular token too
        setAdminToken(adminData.token);
        setToken(adminData.token);
        localStorage.setItem('wellfood_role', 'admin');
        setRole('admin');
        setUser(adminData.user || { role: 'admin', email });
        setIsAuthenticated(true);
        localStorage.setItem('wellfood_user', JSON.stringify(adminData.user || { role: 'admin', email }));
        if (onLoginSuccess) onLoginSuccess(`Welcome back, Admin!`, 'success');
        return { success: true, role: 'admin', user: adminData.user };
      }

      // Fallback to normal user login
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem('wellfood_token', data.token);
        localStorage.setItem('wellfood_role', data.user.role || 'user');
        setToken(data.token);
        setRole(data.user.role || 'user');
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('wellfood_user', JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(`Welcome back, ${data.user.name}!`, 'success');
        return { success: true, role: data.user.role || 'user', user: data.user };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  // Admin login
  const adminLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem('wellfood_admin_token', data.token);
        setAdminToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || 'Invalid credentials' };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('wellfood_admin_token');
    setAdminToken(null);
  };

  // Send OTP to phone number
  const sendOTP = async (phoneNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Send OTP error:', error);
      return { success: false, error: error.message };
    }
  };

  // Verify OTP
  const verifyOTP = async (phoneNumber, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }

      return { success: true, data: data.data };
    } catch (error) {
      console.error('Verify OTP error:', error);
      return { success: false, error: error.message };
    }
  };

  // Complete user profile
  const completeProfile = async (phoneNumber, name, email, address) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/complete-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, name, email, address }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to complete profile');
      }

      // Save user data and set authentication state
      const userData = data.data.user;
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('wellfood_user', JSON.stringify(userData));

      return { success: true, data: userData };
    } catch (error) {
      console.error('Complete profile error:', error);
      return { success: false, error: error.message };
    }
  };

  // Login user (after OTP verification)
  const loginUser = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('wellfood_user', JSON.stringify(userData));
    
    // Trigger success toast (only if callback exists)
    if (onLoginSuccess) {
      onLoginSuccess(`Account created successfully! Welcome, ${userData.name}!`, 'success');
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('wellfood_user');
  };

  // Get user profile
  const getUserProfile = async (phoneNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile/${phoneNumber}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user profile');
      }

      return { success: true, data: data.data.user };
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    adminToken,
    token,
    role,
    sendOTP,
    verifyOTP,
    completeProfile,
    login,
    loginUser,
    logout,
    getUserProfile,
    setOnLoginSuccess,
    adminLogin,
    adminLogout,
    API_BASE_URL,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
