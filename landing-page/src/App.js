import React, { useEffect, useState, useRef } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  
} from "framer-motion";
import "./App.css";

import Seafood from "./pages/Seafood";
const navLinks = ["Home", "Menu", "Blog", "Shop", "Contact Us"];

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

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [route, setRoute] = useState("home"); // "home" | "seafood"
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const glowY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  const [ripples, setRipples] = useState([]);

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
          <Seafood key="seafood" onBack={() => setRoute("home")} />
        ) : currentPage === 0 ? (
          <FirstPage key="page1" onNavigate={setRoute} />
        ) : (
          <SecondPage key="page2" />
        )}
      </AnimatePresence>
    </>
  );
}

const FirstPage = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const categories = ["Seafood", "Fried Chicken", "Burger", "Grill", "Pizza"];

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
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

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold shadow-lg text-xs md:text-sm tracking-wider uppercase transition-colors"
          >
            Book Now
          </motion.button>
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
    </motion.div>
  );
};

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