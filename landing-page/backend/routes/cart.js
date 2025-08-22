const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Add item to cart
router.post('/add', async (req, res) => {
  try {
    const { userId, userEmail, productId, name, price, quantity = 1, image } = req.body;
    
    if (!userId || !userEmail || !productId || !name || !price) {
      return res.status(400).json({ 
        success: false, 
        message: 'userId, userEmail, productId, name, and price are required' 
      });
    }

    // Find existing cart for user
    let cart = await Cart.findOne({ userId });
    
    if (cart) {
      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(item => item.productId === productId);
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({
          productId,
          name,
          price,
          quantity,
          image
        });
      }
    } else {
      // Create new cart
      cart = new Cart({
        userId,
        userEmail,
        items: [{
          productId,
          name,
          price,
          quantity,
          image
        }]
      });
    }

    await cart.save();

    // Log cart activity to backend console
    console.log('🛒 ITEM ADDED TO CART:');
    console.log('👤 User:', userEmail);
    console.log('🍽️ Item:', name);
    console.log('💰 Price:', `₹${price}`);
    console.log('📦 Quantity:', quantity);
    console.log('🛍️ Total Items in Cart:', cart.totalItems);
    console.log('💵 Cart Total:', `₹${cart.totalAmount}`);
    console.log('⏰ Time:', new Date().toLocaleString());
    console.log('─────────────────────────────────────');

    res.json({
      success: true,
      message: 'Item added to cart successfully',
      cart: {
        totalItems: cart.totalItems,
        totalAmount: cart.totalAmount,
        items: cart.items
      }
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
});

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({
        success: true,
        cart: {
          totalItems: 0,
          totalAmount: 0,
          items: []
        }
      });
    }

    res.json({
      success: true,
      cart: {
        totalItems: cart.totalItems,
        totalAmount: cart.totalAmount,
        items: cart.items
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get cart'
    });
  }
});

// Update item quantity in cart
router.put('/update', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'userId, productId, and quantity are required'
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    console.log('🔄 CART UPDATED:');
    console.log('👤 User:', cart.userEmail);
    console.log('🛍️ Total Items:', cart.totalItems);
    console.log('💵 Cart Total:', `₹${cart.totalAmount}`);
    console.log('─────────────────────────────────────');

    res.json({
      success: true,
      message: 'Cart updated successfully',
      cart: {
        totalItems: cart.totalItems,
        totalAmount: cart.totalAmount,
        items: cart.items
      }
    });

  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart'
    });
  }
});

// Remove item from cart
router.delete('/remove', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'userId and productId are required'
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    const removedItem = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);

    await cart.save();

    console.log('🗑️ ITEM REMOVED FROM CART:');
    console.log('👤 User:', cart.userEmail);
    console.log('🍽️ Removed Item:', removedItem.name);
    console.log('🛍️ Remaining Items:', cart.totalItems);
    console.log('💵 Cart Total:', `₹${cart.totalAmount}`);
    console.log('─────────────────────────────────────');

    res.json({
      success: true,
      message: 'Item removed from cart successfully',
      cart: {
        totalItems: cart.totalItems,
        totalAmount: cart.totalAmount,
        items: cart.items
      }
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
});

// Clear entire cart
router.delete('/clear/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    console.log('🧹 CART CLEARED:');
    console.log('👤 User:', cart.userEmail);
    console.log('⏰ Time:', new Date().toLocaleString());
    console.log('─────────────────────────────────────');

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      cart: {
        totalItems: 0,
        totalAmount: 0,
        items: []
      }
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
});

module.exports = router;
