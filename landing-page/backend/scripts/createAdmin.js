const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// MongoDB connection string - update this with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wellfood';

/**
 * Script to create a default admin user
 * Run this script once to set up the initial admin account
 */
async function createDefaultAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@wellfood.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('Email: admin@wellfood.com');
      console.log('Name:', existingAdmin.name);
      return;
    }

    // Create admin password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    // Create new admin user
    const admin = new Admin({
      email: 'admin@wellfood.com',
      passwordHash: passwordHash,
      name: 'System Administrator'
    });

    await admin.save();
    console.log('✅ Default admin user created successfully!');
    console.log('📧 Email: admin@wellfood.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
createDefaultAdmin();
