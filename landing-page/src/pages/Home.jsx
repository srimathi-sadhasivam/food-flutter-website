import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

/**
 * Home page component for authenticated users
 * Displays user-specific content and navigation options
 */
const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">WellFood</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to WellFood!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our delicious menu, place orders, and enjoy the best dining experience.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-orange-500 text-4xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Browse Menu</h3>
            <p className="text-gray-600">
              Explore our extensive menu featuring fresh, delicious dishes prepared with the finest ingredients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-orange-500 text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Online</h3>
            <p className="text-gray-600">
              Place your order online and enjoy fast, convenient delivery or pickup service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="text-orange-500 text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Orders</h3>
            <p className="text-gray-600">
              Track your order status in real-time and get updates on delivery progress.
            </p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              View Menu
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              My Orders
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
