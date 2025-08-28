const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_wellfood_secret_change_me';

/**
 * Middleware to authenticate user and attach user info to request
 * Supports both regular users and admin users
 */
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded.id || !decoded.role) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token format' 
      });
    }

    // Check if user exists based on role
    let user;
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      email: user.email,
      role: decoded.role,
      name: user.name
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

/**
 * Middleware to require admin role
 * Must be used after authenticateUser middleware
 */
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Admin access required' 
    });
  }

  next();
};

/**
 * Middleware to require user role (non-admin)
 * Must be used after authenticateUser middleware
 */
const requireUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  if (req.user.role !== 'user') {
    return res.status(403).json({ 
      success: false, 
      message: 'User access required' 
    });
  }

  next();
};

/**
 * Middleware to require any authenticated user (admin or regular user)
 * Must be used after authenticateUser middleware
 */
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Authentication required' 
    });
  }

  next();
};

module.exports = {
  authenticateUser,
  requireAdmin,
  requireUser,
  requireAuth
};
