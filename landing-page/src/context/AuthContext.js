import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3017/api';

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('wellfood_user');
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
    setLoading(false);
  }, []);

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('wellfood_user', JSON.stringify(data.user));
        
        // Trigger success toast (only if callback exists)
        if (onLoginSuccess) {
          onLoginSuccess(`Welcome back, ${data.user.name}!`, 'success');
        }
        
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed. Please try again.' };
    }
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
    sendOTP,
    verifyOTP,
    completeProfile,
    login,
    loginUser,
    logout,
    getUserProfile,
    setOnLoginSuccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
