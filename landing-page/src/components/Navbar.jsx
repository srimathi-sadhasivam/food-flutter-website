import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left - Logo */}
        <div s
          className="text-2xl font-bold text-orange-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          WellFood
        </div>

        {/* Center - Links */}
        <ul className="flex space-x-8 font-semibold text-gray-700">
          <li><button onClick={() => navigate("/")} className="hover:text-orange-500">Home</button></li>
          <li><button onClick={() => navigate("/menu")} className="hover:text-orange-500">Menu</button></li>
          <li><button onClick={() => navigate("/contact")} className="hover:text-orange-500">Contact</button></li>
          <li><button onClick={() => navigate("/shop")} className="hover:text-orange-500">Shop</button></li>
        </ul>

        {/* Right - Cart, Login, Account */}
        <div className="flex items-center space-x-6 text-gray-700 font-medium relative">
          {/* Cart */}
          <button 
            onClick={() => navigate("/cart")} 
            className="hover:text-orange-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          
          {/* Login */}
          <button 
            onClick={() => navigate("/login")} 
            className="hover:text-orange-500"
          >
            Login
          </button>
          
          {/* Account Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpen(!open)} 
              className="flex items-center space-x-1 hover:text-orange-500"
            >
              <User size={20} />
              <span>Account</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <button 
                  onClick={() => { setOpen(false); navigate("/orders"); }} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Orders
                </button>
                <button 
                  onClick={() => { setOpen(false); navigate("/settings"); }} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </button>
                <button 
                  onClick={() => { setOpen(false); navigate("/logout"); }} 
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
