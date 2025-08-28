import React, { useEffect, useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  
} from "framer-motion";
import "./App.css";

import Seafood from "./pages/Seafood";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider, useCart } from "./context/CartContext";
import Toast from "./components/Toast";

// Login/Signup Modal Component
const LoginModal = ({ isOpen, onClose }) => {
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
  const { login } = useAuth();

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
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3017/api';
      if (isLogin) {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          if (res.role === 'admin') {
            window.location.assign('/admin-dashboard');
            return;
          }
          // user → home
          window.location.assign('/home');
          return;
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        // Signup for local user
        const response = await fetch(`${apiUrl}/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
          setSuccess(data.message || 'Account created');
          setTimeout(() => {
            onClose();
            setFormData({ name: '', email: '', password: '', phone: '', address: '' });
            setSuccess('');
          }, 1200);
        } else {
          setError(data.message || 'Signup failed');
        }
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

//

function AppContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [route, setRoute] = useState("home"); // "home" | "seafood"
  const [showLoginModal, setShowLoginModal] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  const [ripples, setRipples] = useState([]);

  // Debug logging for route changes
  useEffect(() => {
    console.log('Route changed to:', route);
  }, [route]);

  // Create a wrapper function for setRoute with logging
  const handleRouteChange = (newRoute) => {
    console.log('handleRouteChange called with:', newRoute);
    setRoute(newRoute);
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
          <Seafood key="seafood" onNavigate={handleRouteChange} onBack={() => handleRouteChange("home")} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={route} setRoute={setRoute} />
        ) : route === "contact" ? (
          <Contact key="contact" onNavigate={handleRouteChange} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={route} setRoute={setRoute} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
        ) : route === "about" ? (
          <About key="about" onNavigate={handleRouteChange} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={route} setRoute={setRoute} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
        ) : route === "home" || currentPage === 0 ? (
          <FirstPage key="page1" onNavigate={handleRouteChange} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={route} setRoute={setRoute} />
        ) : (
          <SecondPage key="page2" onNavigate={handleRouteChange} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={route} setRoute={setRoute} />
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
      />

      {/* Global Toasts */}
      <Toast toasts={useCart().toasts} removeToast={useCart().removeToast} />
    </>
  );
}

const FirstPage = ({ onNavigate, showLoginModal, setShowLoginModal, currentPage, setCurrentPage, currentRoute, setRoute }) => {
  const { isAuthenticated } = useAuth();
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen bg-black text-white font-bold z-10"
    >
      <Navbar onNavigate={onNavigate} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={currentRoute} setRoute={setRoute} />

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

      {/* Cart Display Section */}
      {isAuthenticated && cart.items.length > 0 && (
        <section className="px-4 md:px-10 py-8 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Your Cart</h2>
              <p className="text-gray-300">Items added from our menu</p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-orange-500 font-bold">${item.price}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total: ${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total Items:</span>
                  <span className="text-orange-500 font-bold text-xl">{cart.totalItems}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                  <span className="text-orange-500 font-bold text-2xl">${cart.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={clearCart}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
      />
    </motion.div>
  );
};

// Main App component with AuthProvider and CartProvider
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

const SecondPage = ({ onNavigate, showLoginModal, setShowLoginModal, currentPage, setCurrentPage, currentRoute, setRoute }) => (
  <motion.div
    initial={{ y: "100%" }}
    animate={{ y: 0 }}
    exit={{ y: "100%" }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="relative min-h-screen bg-black text-white z-10"
  >
          <Navbar onNavigate={onNavigate} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={currentRoute} setRoute={setRoute} />
    <div className="flex flex-col items-center justify-center px-4 py-20 pt-24">
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
    </div>
  </motion.div>
);
