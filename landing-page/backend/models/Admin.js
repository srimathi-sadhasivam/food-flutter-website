const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false,
    trim: true,
    default: 'Administrator'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

adminSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

adminSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Admin', adminSchema);


