import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalAmount: 0
  });
  const [loading, setLoading] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load cart from database when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      // Clear cart when user logs out
      setCart({
        items: [],
        totalItems: 0,
        totalAmount: 0
      });
    }
  }, [isAuthenticated, user]);

  // Auto-hide cart dropdown after 5 seconds
  useEffect(() => {
    if (showCartDropdown) {
      const timer = setTimeout(() => {
        setShowCartDropdown(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showCartDropdown]);

  // Auto-hide toasts after 3 seconds
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts(prev => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3017/api/cart/${user._id || user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      showToast('Failed to load cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    if (!isAuthenticated || !user) {
      throw new Error('User must be logged in to add items to cart');
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3017/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id || user.id,
          userEmail: user.email,
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local cart state
        setCart(data.cart);
        
        // Trigger cart pulse animation
        setCartPulse(true);
        setTimeout(() => setCartPulse(false), 1000);
        
        // Show success toast
        showToast(`${item.name} added to cart!`, 'success');
        
        // Show cart dropdown briefly
        setShowCartDropdown(true);
        
        return { success: true, message: 'Item added to cart successfully' };
      } else {
        throw new Error(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast('Failed to add item to cart', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated || !user) return;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3017/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id || user.id,
          productId
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
        showToast('Item removed from cart', 'success');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToast('Failed to remove item from cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated || !user) return;

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3017/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id || user.id,
          productId,
          quantity
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
        showToast('Cart updated successfully', 'success');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      showToast('Failed to update cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3017/api/cart/clear/${user._id || user.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setCart({
          items: [],
          totalItems: 0,
          totalAmount: 0
        });
        showToast('Cart cleared successfully', 'success');
        setShowCartDropdown(false);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      showToast('Failed to clear cart', 'error');
    } finally {
      setLoading(false);
    }
  };

  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  const value = {
    cart,
    loading,
    cartPulse,
    showCartDropdown,
    toasts,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
    toggleCartDropdown,
    removeToast,
    showToast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
