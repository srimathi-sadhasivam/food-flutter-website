const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myfood')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('error', err => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', require('./routes/cart'));

app.get('/', (req, res) => {
  res.json({ message: 'WellFood API Server Running' });
});

// Start server
const PORT = 3017; // Change to 5000 if needed
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
