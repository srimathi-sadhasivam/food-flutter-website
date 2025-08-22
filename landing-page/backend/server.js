const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple MongoDB connection
mongoose.connect('mongodb://localhost:27017/myfood')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cart', require('./routes/cart'));

app.get('/', (req, res) => {
  res.json({ message: 'WellFood API Server Running' });
});

// Use port 3001 instead of 5000
const PORT = 3014;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});