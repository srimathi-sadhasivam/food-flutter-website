const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signToken } = require('../utils/auth');
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

    // Create new user (role defaults to 'user')
    const user = new User({
      name,
      email,
      password,
      phoneNumber: phone,
      address: address || '',
      role: 'user'
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

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    res.json({
      success: true,
      message: 'Account created successfully!',
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        address: user.address,
        role: user.role
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

    // Check password
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (_) {
      isMatch = false;
    }
    if (!isMatch) {
      // Fallback for legacy plaintext-stored passwords: allow once and upgrade to hash
      if (user.password === password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        isMatch = true;
      } else {
        return res.status(400).json({ success: false, message: 'Invalid password' });
      }
    }

    // Log login to backend console
    console.log('🔐 USER LOGIN:');
    console.log('📧 Email:', user.email);
    console.log('👤 Name:', user.name);
    console.log('📱 Phone:', user.phoneNumber);
    console.log('⏰ Login Time:', new Date().toLocaleString());
    console.log('─────────────────────────────────────');

    const token = signToken({ id: user._id, role: user.role, email: user.email });
    res.json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        address: user.address,
        role: user.role
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
