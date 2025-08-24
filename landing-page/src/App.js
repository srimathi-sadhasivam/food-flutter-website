import React, { useEffect, useState, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  
} from "framer-motion";
import "./App.css";

import Seafood from "./pages/Seafood";
import { AuthProvider, useAuth } from "./context/AuthContext";
const navLinks = ["Home", "Menu", "Blog", "Shop", "Contact Us"];

// Login/Signup Modal Component
const LoginModal = ({ isOpen, onClose, showToast }) => {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        
        // Store user data in localStorage for both login and signup
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
        
        setTimeout(() => {
          onClose();
          // Reset form
          setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            address: ''
          });
          setSuccess('');
          // Reload page to show logged-in state
          window.location.reload();
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }

    setLoading(false);
  };

  const resetModal = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    });
    setError('');
    setSuccess('');
    setIsLogin(true);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back!' : 'Join WellFood'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-orange-100 border border-orange-300 text-orange-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-black"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-black"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-black"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 rounded-r-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-black"
                        placeholder="Enter 10-digit phone number"
                        maxLength="10"
                        required={!isLogin}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 px-3 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-black"
                      placeholder="Enter your delivery address (optional)"
                      rows="3"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center mb-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [route, setRoute] = useState("home"); // "home" | "seafood"
  const [toasts, setToasts] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  const [ripples, setRipples] = useState([]);

  // Toast notification function
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };

    const createRipple = (e) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    const handleWheel = (e) => {
      if (e.deltaY > 0 && currentPage === 0) {
        setCurrentPage(1);
      } else if (e.deltaY < 0 && currentPage === 1) {
        setCurrentPage(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", createRipple);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", createRipple);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [mouseX, mouseY, currentPage]);

  return (
    <>
      {/* Mouse Glow */}
      <motion.div
        className="mouse-glow"
        style={{ x: glowX, y: glowY }}
      />

      {/* Click Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed rounded-full bg-orange-400 opacity-20 pointer-events-none"
          style={{
            top: ripple.y - 50,
            left: ripple.x - 50,
            width: 100,
            height: 100,
            zIndex: 30
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Page Indicator */}
      <div className="fixed right-6 top-1/2 z-50 flex flex-col gap-2 -translate-y-1/2">
        {[0, 1].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentPage === page 
                ? "bg-orange-500 scale-125" 
                : "bg-gray-600"
            }`}
            aria-label={`Go to page ${page + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {route === "seafood" ? (
          <Seafood key="seafood" onBack={() => setRoute("home")} showToast={showToast} />
        ) : currentPage === 0 ? (
          <FirstPage key="page1" onNavigate={setRoute} showToast={showToast} />
        ) : (
          <SecondPage key="page2" />
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
              className={`px-6 py-4 rounded-lg shadow-lg max-w-sm ${
                toast.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : toast.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <p className="font-medium text-sm">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

const FirstPage = ({ onNavigate, showToast }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const menuRef = useRef(null);
  const categories = ["Seafood", "Fried Chicken", "Burger", "Grill", "Pizza"];
  const { user, isAuthenticated, logout, setOnLoginSuccess } = useAuth();

  // Set up toast callback for login success
  useEffect(() => {
    setOnLoginSuccess(showToast);
  }, [showToast, setOnLoginSuccess]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      // Close profile dropdown when clicking outside
      if (!e.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen bg-black text-white font-bold z-10"
    >
      {/* Top Bar with Phone Number */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-black border-b border-zinc-800 py-2 text-center text-sm text-gray-400"
      >
        CALL-08012345688
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-4 py-3 md:px-10 border-b border-zinc-800"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl md:text-2xl font-extrabold tracking-widest text-orange-500 select-none"
        >
          WELLFOOD
        </motion.div>
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex gap-7 text-sm tracking-widest font-semibold"
        >
          {navLinks.map((link) => {
            if (link === "Menu") {
              return (
                <motion.li
                  key={link}
                  variants={itemVariants}
                  className="relative cursor-pointer"
                  ref={menuRef}
                >
                  <button
                    onClick={() => setIsMenuOpen((o) => !o)}
                    className="flex items-center hover:text-orange-500"
                  >
                    {link}
                  </button>
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-md shadow-xl z-50 py-2"
                      >
                        {categories.map((cat) => (
                          <li key={cat}>
                            <button
                              className="w-full text-left block px-4 py-2 text-sm hover:bg-zinc-800"
                              onClick={() => {
                                setIsMenuOpen(false);
                                if (cat === "Seafood" && onNavigate) onNavigate("seafood");
                              }}
                            >
                              {cat}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            }
            return (
              <motion.li
                key={link}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  color: "#f97316",
                  transition: { duration: 0.2 }
                }}
                className="cursor-pointer"
              >
                {link}
              </motion.li>
            );
          })}
        </motion.ul>
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, color: "#f97316" }}
            whileTap={{ scale: 0.9 }}
            className="relative cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </motion.div>

          {/* Login Button - Always visible */}
          {!isAuthenticated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLoginModal(true)}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wider uppercase transition-all duration-300"
            >
              Login
            </motion.button>
          )}

          {/* My Account Section */}
          <div className="relative profile-dropdown-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="flex flex-col items-start">
                <span>My Account</span>
                {isAuthenticated && user && (
                  <span className="text-xs opacity-75 normal-case font-normal">
                    {user.phone || user.email || user.name}
                  </span>
                )}
              </div>
            </motion.button>

            {/* My Account Dropdown */}
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  {isAuthenticated && user ? (
                    <>
                      {/* User Info Header */}
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-white">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">
                              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-lg">My Account</p>
                            <p className="text-sm opacity-90">{user?.phone || user?.email || user?.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Account Options */}
                      <div className="p-2">
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-gray-700 font-medium">My Orders</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-700 font-medium">Saved Addresses</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          <span className="text-gray-700 font-medium">E-Gift Cards</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700 font-medium">FAQ's</span>
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-gray-700 font-medium">Account Privacy</span>
                        </button>
                        
                        <hr className="my-2" />
                        
                        <button
                          onClick={() => {
                            logout();
                            setShowProfileDropdown(false);
                            showToast && showToast('Logged out successfully', 'success');
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 text-red-600"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span className="font-medium">Log Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setShowProfileDropdown(false);
                        }}
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                      >
                        Login / Sign Up
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-10 py-8 md:py-12 relative overflow-visible">
        {/* Left Text */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-5/12 text-center md:text-left md:pr-4"
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['dmserif'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg"
          >
            Delicious Food <br className="hidden md:block" /> Near Your Town
          </motion.h1>
          <p className="text-sm md:text-base text-[#ffb86b] mb-4 font-normal">
            Welcome to our culinary sanctuary, where every dish tells a story, every bite
            is an adventure. At our food website, we invite you to explore flavors beyond borders.
          </p>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 mb-5 font-semibold"
          >
            <span className="text-white font-bold">
              Start price only $25
            </span>
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.08,
              boxShadow: "0 15px 30px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.97 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            type="button"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-7 py-2.5 rounded-full font-bold text-base shadow-lg transition-colors"
          >
            CONTACT US
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <div className="w-full md:w-7/12 flex justify-center items-center relative mb-8 md:mb-0 min-h-[320px]">
          <motion.img
            src="https://demo.bravisthemes.com/wellfood/wp-content/uploads/2025/01/Image2-ss1-h1.webp"
            alt="Grilled Chicken Leg"
            className="w-[550px] h-[550px] md:w-[650px] md:h-[650px] object-contain rounded-3xl shadow-2xl z-10 bg-black"
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.3 }
            }}
            style={{ filter: "brightness(1.15) contrast(1.1)" }}
          />

          {/* Cartoon Chef */}
          <motion.img
  src="https://static.vecteezy.com/system/resources/previews/035/092/511/non_2x/red-chili-free-png.png"
  alt="Chilli"
  className="absolute -top-14 left-4 w-32 md:w-40 z-30 drop-shadow-xl"
  animate={{
    y: [0, -15, 0],              
    rotate: [0, 5, -5, 0]      
  }}
  transition={{
    duration: 2.5,               
    repeat: Infinity,            
    ease: "easeInOut"
  }}
/>


<motion.img
  src="https://static.vecteezy.com/system/resources/previews/035/092/511/non_2x/red-chili-free-png.png"
  alt="Chilli"
  className="absolute -bottom-14 right-4 w-32 md:w-40 z-30 drop-shadow-xl"
  initial={{ opacity: 0 }}
  animate={{
    y: [0, 15, 0],               
    rotate: [0, -5, 5, 0],       
    opacity: 1                   
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  whileHover={{
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: { duration: 0.5 }
  }}
/>


        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        showToast={showToast}
      />
    </motion.div>
  );
};

// Main App component with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const SecondPage = () => (
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20 z-10"
  >
    {/* Floating Food Illustrations */}
    <motion.img
      src="https://www.freepnglogos.com/uploads/salad-png/salad-png-transparent-svg-vector-supply-25.png"
      alt="Salad"
      className="absolute top-20 left-10 w-32 md:w-40 z-0 opacity-30"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.img
      src="https://www.freepnglogos.com/uploads/avocado-png/avocado-png-transparent-image-pngpix-0.png"
      alt="Avocado"
      className="absolute bottom-20 right-10 w-28 md:w-36 z-0 opacity-30"
      animate={{
        y: [0, 20, 0],
        rotate: [0, -5, 0]
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    <motion.img
      src="https://www.freepnglogos.com/uploads/olive-oil-png/olive-oil-png-transparent-images-png-only-1.png"
      alt="Olive Oil"
      className="absolute top-1/3 right-20 w-24 md:w-32 z-0 opacity-30"
      animate={{
        y: [0, 15, 0],
        rotate: [0, 3, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    {/* Content */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="text-center max-w-3xl z-20"
    >
      <motion.h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-orange-500"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        DELICIOUS FOODS
      </motion.h2>
      
      <motion.h3
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        VERY GOOD FOOD
      </motion.h3>
      
      <motion.p
        className="text-lg md:text-xl text-orange-400 mb-8 font-semibold"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        LEARN ABOUT WELLFOOD
      </motion.p>
      
      <motion.h2
        className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        THE AMAZING & QUALITY FOOD FOR YOUR GOOD HEALTH
      </motion.h2>
      
      <motion.p
        className="text-base md:text-lg text-gray-300 mb-10 max-w-2xl mx-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Welcome to our restaurant, where culinary excellence meets warm hospitality in every dish we serve. 
        Nestled in the heart of City Name our eatery invites you on a journey of exquisite flavors and 
        memorable dining experiences.
      </motion.p>
      
      <motion.a
        href="#"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-colors"
        whileHover={{
          scale: 1.08,
          boxShadow: "0 15px 30px rgba(249, 115, 22, 0.4)"
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        Buy on Envato
      </motion.a>
    </motion.div>
  </motion.div>
);
