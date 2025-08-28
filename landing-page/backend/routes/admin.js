const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Order = require('../models/Order');
const User = require('../models/User');
const { signToken, authMiddleware, requireAdmin } = require('../utils/auth');

const router = express.Router();

// POST /admin/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const token = signToken({ id: admin._id, role: 'admin', email: admin.email });
    return res.json({ success: true, token, admin: { email: admin.email, name: admin.name } });
  } catch (error) {
    console.error('Admin login error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /admin/orders
router.get('/orders', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { q, status, startDate, endDate, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) {
      filter.$or = [
        { userEmail: { $regex: q, $options: 'i' } },
        { userName: { $regex: q, $options: 'i' } }
      ];
    }
    if (startDate || endDate) {
      filter.placedAt = {};
      if (startDate) filter.placedAt.$gte = new Date(startDate);
      if (endDate) filter.placedAt.$lte = new Date(endDate);
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ placedAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter)
    ]);
    return res.json({ success: true, data: { orders, total, page: Number(page), limit: Number(limit) } });
  } catch (error) {
    console.error('Fetch orders error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /admin/orders/:id
router.get('/orders/:id', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, data: order });
  } catch (error) {
    console.error('Fetch order error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /admin/update-order
router.post('/update-order', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: 'orderId and status are required' });
    }
    if (!['Pending', 'Shipped', 'Delivered'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    return res.json({ success: true, data: order });
  } catch (error) {
    console.error('Update order error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /admin/logout (client should discard token; provided for symmetry)
router.post('/logout', authMiddleware, requireAdmin, (req, res) => {
  return res.json({ success: true, message: 'Logged out' });
});

module.exports = router;

// ---- Additional admin endpoints ----
// GET /admin/summary
router.get('/summary', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const [totalOrders, pendingOrders, shippedOrders, deliveredOrders, usersCount] = await Promise.all([
      Order.countDocuments({}),
      Order.countDocuments({ status: 'Pending' }),
      Order.countDocuments({ status: 'Shipped' }),
      Order.countDocuments({ status: 'Delivered' }),
      User.countDocuments({}),
    ]);

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const recentOrders = await Order.find({ placedAt: { $gte: last7Days } }).sort({ placedAt: -1 }).limit(10);
    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    return res.json({
      success: true,
      data: {
        totals: { totalOrders, pendingOrders, shippedOrders, deliveredOrders, usersCount },
        revenue: revenue[0]?.total || 0,
        recentOrders
      }
    });
  } catch (error) {
    console.error('Admin summary error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /admin/users
router.get('/users', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).limit(200);
    return res.json({ success: true, data: users });
  } catch (error) {
    console.error('Admin users error', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


