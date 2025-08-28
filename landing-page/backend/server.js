const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const Admin = require('./models/Admin');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myfood';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('❌ MongoDB disconnected');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', require('./routes/cart'));
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'WellFood API Server Running',
    timestamp: new Date().toISOString(),
    status: 'active'
  });
});

// Test endpoint for auth
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Auth API is working',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3017; // Allow override via env
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Seed admin from env if not exists
(async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@wellfood.local';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
    // Ensure Admin collection
    const existing = await Admin.findOne({ email: adminEmail });
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await Admin.create({ email: adminEmail, passwordHash, name: 'Admin' });
      console.log('🛡️ Admin (Admin model) seeded:', adminEmail);
    }
    // Ensure a User document with role=admin as well
    const existingUserAdmin = await User.findOne({ email: adminEmail });
    if (!existingUserAdmin) {
      await User.create({ name: 'Admin', email: adminEmail, password: adminPassword, phoneNumber: '9999999999', address: 'HQ', role: 'admin' });
      console.log('🛡️ Admin (User model) seeded with role=admin:', adminEmail);
    }
  } catch (err) {
    console.error('Failed to seed admin:', err);
  }
})();

// Seed sample orders/users if empty (dev convenience)
(async () => {
  try {
    if (process.env.SEED_SAMPLE !== 'true') return;
    const Order = require('./models/Order');
    const User = require('./models/User');
    const count = await Order.countDocuments({});
    if (count === 0) {
      const demoUser = await User.findOne({ email: 'demo@customer.local' }) || await User.create({
        name: 'Demo Customer',
        email: 'demo@customer.local',
        password: 'password123',
        phoneNumber: '9999999999',
        address: '123 Demo Street'
      });
      const sample = [
        { name: 'Margherita Pizza', price: 299, quantity: 2 },
        { name: 'Chicken Burger', price: 199, quantity: 1 },
        { name: 'Fried Chicken Bucket', price: 499, quantity: 1 }
      ];
      const total = sample.reduce((s, i) => s + i.price * i.quantity, 0);
      await Order.create({
        userId: String(demoUser._id),
        userEmail: demoUser.email,
        userName: demoUser.name,
        shippingAddress: demoUser.address,
        items: sample.map((i, idx) => ({ productId: `p${idx+1}`, name: i.name, price: i.price, quantity: i.quantity })),
        totalAmount: total,
        status: 'Pending'
      });
      console.log('🧪 Seeded one sample order');
    }
  } catch (err) {
    console.error('Sample seed failed:', err);
  }
})();
