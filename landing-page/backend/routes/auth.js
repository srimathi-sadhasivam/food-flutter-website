const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    console.log('📝 Signup request received:', req.body);
    const { name, email, password, phone, address } = req.body;
    
    if (!name || !email || !password || !phone) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, password: !!password, phone: !!phone });
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, password, and phone are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phoneNumber: phone }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password, // In production, hash this password
      phoneNumber: phone,
      address: address || ''
    });

    await user.save();

    // Log user data to backend console
    console.log('🎉 NEW USER REGISTERED:');
    console.log('📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('📱 Phone:', phone);
    console.log('🏠 Address:', address || 'Not provided');
    console.log('⏰ Registration Time:', new Date().toLocaleString());
    console.log('─────────────────────────────────────');

    res.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        address: user.address
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create account'
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    console.log('🔐 Login request received:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Missing login credentials:', { email: !!email, password: !!password });
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check password (in production, use bcrypt to compare hashed passwords)
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: 'Invalid password'
      });
    }

    // Log login to backend console
    console.log('🔐 USER LOGIN:');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('📱 Phone:', user.phoneNumber);
    console.log('⏰ Login Time:', new Date().toLocaleString());
    console.log('─────────────────────────────────────');

    res.json({
      success: true,
      message: 'Login successful!',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        address: user.address
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to login'
    });
  }
});

module.exports = router;
