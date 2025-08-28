const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  userEmail: { type: String, required: true, index: true },
  userName: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  items: { type: [orderItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending', index: true },
  placedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

orderSchema.index({ placedAt: -1 });

module.exports = mongoose.model('Order', orderSchema);


