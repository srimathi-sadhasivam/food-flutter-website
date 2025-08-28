import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const About = ({ onNavigate, showLoginModal, setShowLoginModal, currentPage, setCurrentPage, currentRoute, setRoute }) => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen bg-white text-black z-10"
    >
      <Navbar
        onNavigate={onNavigate}
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentRoute={currentRoute}
        setRoute={setRoute}
      />

      {/* Hero with full-page background image and overlayed title */}
      <section className="relative w-full h-[85vh]">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=2000&auto=format&fit=crop"
          alt="About WellFood Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-black drop-shadow-sm"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* Content below the hero */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At WellFood, we celebrate bold flavors and fresh ingredients. From sizzling grills to hearty bowls,
              our chefs craft meals that are as nourishing as they are delicious.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you are dining in or ordering online, we promise quick service, great taste, and a memorable
              experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-orange-600 mb-4">Our Promise</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Fresh, locally sourced ingredients</li>
              <li>Hygienic kitchens and safe packaging</li>
              <li>On-time delivery and friendly support</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div className="text-center text-gray-600">
            <p>
              We are constantly innovating to bring you the best culinary experience. Thank you for choosing WellFood.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;


