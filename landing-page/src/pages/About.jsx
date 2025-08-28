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

      {/* Hero: dark split with text left and image right */}
      <section className="w-full min-h-screen flex items-center bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight"
            >
              About Us
            </motion.h1>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="h-1 bg-orange-500 rounded-full mt-3"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-gray-300 text-lg md:text-xl"
            >
              Great food, delivered fast. Built for reliability, crafted for delight.
            </motion.p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
              transition={{ duration: 0.6, delay: 0.15, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1600&auto=format&fit=crop"
              alt="Gourmet Burger with Fries"
              className="w-full max-w-lg md:max-w-2xl rounded-3xl shadow-[0_20px_80px_rgba(249,115,22,0.15)] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content below the hero */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 py-12 md:py-16">
        {/* Professional subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-300 text-lg md:text-xl mb-8"
        >
          Great food, delivered with precision. Built for speed, taste, and trust.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              At WellFood, we celebrate bold flavors and fresh ingredients. From sizzling grills to hearty bowls,
              our chefs craft meals that are as nourishing as they are delicious.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Whether you are dining in or ordering online, we promise quick service, great taste, and a memorable
              experience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Our Promise</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Fresh, locally sourced ingredients</li>
              <li>Hygienic kitchens and safe, tamper-proof packaging</li>
              <li>Lightning-fast delivery with real-time order tracking</li>
              <li>Curated partner restaurants, rated by our community</li>
            </ul>
          </motion.div>
        </div>

        {/* Quotes / Thoughts section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {[
            {
              quote: "Crave. Click. Relish.",
              sub: "From your favorites to your firsts—delivered right."
            },
            {
              quote: "Good food, on your schedule.",
              sub: "Because hunger doesn’t wait—and neither should you."
            },
            {
              quote: "Taste the city in minutes.",
              sub: "Local kitchens, global flavors—at your doorstep."
            }
          ].map((q, idx) => (
            <motion.div
              key={q.quote}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: [0, 0.5, 0] }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
            >
              <p className="text-xl font-semibold text-white mb-1">“{q.quote}”</p>
              <p className="text-gray-300">{q.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats like Swiggy/Zomato/Blinkit */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Orders Delivered", value: "10M+" },
            { label: "Partner Restaurants", value: "50k+" },
            { label: "Cities Served", value: "1,200+" },
            { label: "Avg. Delivery Time", value: "< 25 min" }
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 text-center shadow-md"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-orange-500">{s.value}</div>
              <div className="text-sm uppercase tracking-wide text-gray-400 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          <div className="text-center text-gray-400">
            <p>
              We’re building the most loved food platform—designed for reliability, crafted for delight.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;


