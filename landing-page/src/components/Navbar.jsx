import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartDropdown from "./CartDropdown";

const Navbar = ({ onNavigate, showLoginModal, setShowLoginModal, currentPage, setCurrentPage, currentRoute, setRoute }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const categories = ["Seafood", "Fried Chicken", "Burger", "Grill", "Pizza"];
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, cartPulse, showCartDropdown, toggleCartDropdown } = useCart();

  // Debug logging
  console.log('Navbar props:', { onNavigate, setRoute, currentRoute });

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

  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: "100%", 
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setShowMobileMenu(false);
      }
      // Close profile dropdown when clicking outside
      if (!e.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleNavigation = (route, page) => {
    console.log('handleNavigation called with:', { route, page, onNavigate });
    if (onNavigate) {
      console.log('Calling onNavigate with route:', route);
      onNavigate(route);
    } else {
      console.log('onNavigate is not available, trying setRoute');
      if (setRoute) setRoute(route);
    }
    if (setCurrentPage) setCurrentPage(page);
    setShowMobileMenu(false);
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category) => {
    setIsMenuOpen(false);
    setShowMobileMenu(false);
    
    if (category === "Seafood" && onNavigate) {
      onNavigate("seafood");
    }
    // Add navigation for other categories when pages are created
    // if (category === "Fried Chicken" && onNavigate) onNavigate("friedchicken");
    // if (category === "Burger" && onNavigate) onNavigate("burger");
    // if (category === "Grill" && onNavigate) onNavigate("grill");
    // if (category === "Pizza" && onNavigate) onNavigate("pizza");
  };

  return (
    <>
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
        className="flex justify-between items-center px-4 py-3 md:px-10 border-b border-zinc-800 bg-black"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl md:text-2xl font-extrabold tracking-widest text-orange-500 select-none cursor-pointer"
          onClick={() => handleNavigation("home", 0)}
        >
          WELLFOOD
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:flex gap-7 text-sm tracking-widest font-semibold text-white"
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
                              onClick={() => handleCategoryClick(cat)}
                              className="block w-full text-left px-4 py-2 text-gray-300 hover:text-orange-500 hover:bg-zinc-800 transition-colors"
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
                className="cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => {
                  if (link === "Home") {
                    handleNavigation("home", 0);
                  } else if (link === "About") {
                    handleNavigation("about", 0);
                  } else if (link === "Shop") {
                    handleNavigation("shop", 0);
                  } else if (link === "Contact Us") {
                    handleNavigation("contact", 0);
                  }
                }}
              >
                {link}
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Right Side - Cart, Login, Profile */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <motion.div
            whileHover={{ scale: 1.1, color: "#f97316" }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCartDropdown}
            className={`relative cursor-pointer text-white ${cartPulse ? 'animate-pulse' : ''}`}
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
              {cart.totalItems || 0}
            </span>

            {/* Cart Dropdown */}
            <CartDropdown 
              isVisible={showCartDropdown} 
              onClose={() => toggleCartDropdown()} 
            />
          </motion.div>

          {/* Admin Panel Link */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.assign('/admin')}
            className="hidden md:inline-flex border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wider uppercase transition-all duration-300"
          >
            Admin
          </motion.button>

          {/* Login Button - Always visible when not authenticated */}
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

          {/* My Account Section (always visible) */}
          <div className="relative profile-dropdown-container">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className={`border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${showProfileDropdown ? 'bg-orange-500 text-white' : ''}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Account
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="p-2">
                    {/* Profile */}
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                          return;
                        }
                        // handleNavigation("profile", 0); // enable when profile route exists
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </button>

                    {/* Settings */}
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                          return;
                        }
                        // handleNavigation("settings", 0); // enable when settings route exists
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </button>

                    {/* Logout or Login/Sign Up */}
                    {isAuthenticated ? (
                      <button 
                        onClick={() => {
                          setShowProfileDropdown(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setShowProfileDropdown(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white hover:text-orange-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            ref={mobileMenuRef}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-0 h-full w-80 bg-zinc-900 shadow-2xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-orange-500">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-white hover:text-orange-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-4">
                {navLinks.map((link) => {
                  if (link === "Menu") {
                    return (
                      <div key={link} className="space-y-2">
                        <h3 className="text-lg font-semibold text-white mb-3">{link}</h3>
                        <div className="pl-4 space-y-2">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => handleCategoryClick(cat)}
                              className="block w-full text-left text-gray-300 hover:text-orange-500 py-2 transition-colors"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <button
                      key={link}
                      onClick={() => {
                        if (link === "Home") {
                          handleNavigation("home", 0);
                        } else if (link === "About") {
                          handleNavigation("about", 0);
                        } else if (link === "Shop") {
                          handleNavigation("shop", 0);
                        } else if (link === "Contact Us") {
                          handleNavigation("contact", 0);
                        }
                      }}
                      className="block w-full text-left text-white hover:text-orange-500 text-lg font-semibold py-3 transition-colors"
                    >
                      {link}
                    </button>
                  );
                })}
                {/* Mobile: Admin link */}
                <button
                  onClick={() => window.location.assign('/admin')}
                  className="block w-full text-left text-white hover:text-orange-500 text-lg font-semibold py-3 transition-colors"
                >
                  Admin
                </button>
              </div>

              {/* Mobile Account Section */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                {!isAuthenticated ? (
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Login / Sign Up
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="text-white">
                      <p className="font-semibold">Welcome back!</p>
                      <p className="text-gray-300 text-sm">
                        {user?.phone || user?.email || user?.name}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const navLinks = ["Home", "About", "Menu", "Shop", "Contact Us"];

export default Navbar;
