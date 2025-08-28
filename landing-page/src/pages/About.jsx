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
      className="relative min-h-screen bg-black text-white z-10"
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

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-16 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-orange-500 mb-6"
        >
          About WellFood
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-gray-300 leading-relaxed mb-4">
              At WellFood, we celebrate bold flavors and fresh ingredients. From
              sizzling grills to hearty bowls, our chefs craft meals that are as
              nourishing as they are delicious.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you are dining in or ordering online, we promise quick
              service, great taste, and a memorable experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full flex justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1600&auto=format&fit=crop"
              alt="Gourmet Burger with Fries"
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Our Promise</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Fresh, locally sourced ingredients</li>
            <li>Hygienic kitchens and safe packaging</li>
            <li>On-time delivery and friendly support</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;


