import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navLinks = ["Home", "Menu", "About", "Shop", "Contact Us"];

const Navbar = ({ onNavigate, showLoginModal, setShowLoginModal, currentPage, setCurrentPage, currentRoute, setRoute }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const menuRef = useRef(null);
  const categories = ["Seafood", "Fried Chicken", "Burger", "Grill", "Pizza"];
  const { user, isAuthenticated, logout } = useAuth();

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
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xl md:text-2xl font-extrabold tracking-widest text-orange-500 select-none cursor-pointer"
          onClick={() => {
            if (setRoute) setRoute("home");
            if (setCurrentPage) setCurrentPage(0);
          }}
        >
          WELLFOOD
        </motion.div>
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
                              className="w-full text-left block px-4 py-2 text-sm hover:bg-zinc-800 text-white"
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
                                 onClick={() => {
                   if (link === "Home") {
                     if (setRoute) setRoute("home");
                     if (setCurrentPage) setCurrentPage(0);
                   } else if (link === "About") {
                     if (setCurrentPage) setCurrentPage(1);
                   } else if (link === "Shop") {
                     if (setRoute) setRoute("shop");
                   } else if (link === "Contact Us") {
                     if (setRoute) setRoute("contact");
                   }
                 }}
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
            className="relative cursor-pointer text-white"
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
              onClick={() => {
                console.log('Dropdown clicked!', { isAuthenticated, user, showProfileDropdown });
                setShowProfileDropdown(!showProfileDropdown);
              }}
              className={`border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-4 py-2 rounded-full font-semibold text-xs md:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${showProfileDropdown ? 'bg-orange-500 text-white' : ''}`}
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
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
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
                  {/* User Info Header */}
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-bold">
                          {isAuthenticated && user ? (user?.name?.charAt(0)?.toUpperCase() || 'U') : 'G'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-lg">My Account</p>
                        <p className="text-sm opacity-90">
                          {isAuthenticated && user ? (user?.phone || user?.email || user?.name) : 'Guest User'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Account Options */}
                  <div className="p-2">
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                        }
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700 font-medium group-hover:text-orange-500 transition-colors">Profile</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                        }
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-gray-700 font-medium group-hover:text-orange-500 transition-colors">Reviews</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setShowProfileDropdown(false);
                        if (!isAuthenticated) {
                          setShowLoginModal(true);
                        }
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3 group"
                    >
                      <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700 font-medium group-hover:text-orange-500 transition-colors">Settings</span>
                    </button>
                    
                    <hr className="my-2" />
                    
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          logout();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 text-red-600 group"
                      >
                        <svg className="w-5 h-5 group-hover:text-red-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium group-hover:text-red-700 transition-colors">Log out</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowLoginModal(true);
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-3 text-orange-600 group"
                      >
                        <svg className="w-5 h-5 group-hover:text-orange-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h15m-1 4a8 8 0 11-16 0 8 8 0 0116 0z" />
                        </svg>
                        <span className="font-medium group-hover:text-orange-700 transition-colors">Login / Sign Up</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
