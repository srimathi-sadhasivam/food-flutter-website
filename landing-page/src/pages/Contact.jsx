import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Contact = ({ currentPage, setCurrentPage, currentRoute, setRoute, showLoginModal, setShowLoginModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar 
        onNavigate={setRoute} 
        showLoginModal={showLoginModal} 
        setShowLoginModal={setShowLoginModal} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        currentRoute={currentRoute} 
        setRoute={setRoute} 
      />
      
             <div className="pt-24 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto min-h-screen">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
                     className="text-center mb-12 sm:mb-16"
        >
                     <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4"
           >
             Get in Touch!
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4"
           >
             WE ARE LOOKING FORWARD TO START A PROJECT WITH YOU!
           </motion.p>
        </motion.div>

                 {/* Two Column Layout */}
         <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left Column - Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
                         className="space-y-6 sm:space-y-8"
          >
                         <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
               <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
                             {/* Address */}
               <div className="flex items-start space-x-3 sm:space-x-4 mb-6">
                 <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                   <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                   </svg>
                 </div>
                 <div className="flex-1 min-w-0">
                   <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Address</h3>
                   <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                     121 Rock Street, 21 Avenue,<br />
                     New York, NY 92103-9000
                   </p>
                 </div>
               </div>

                             {/* Phone Numbers */}
               <div className="flex items-start space-x-3 sm:space-x-4 mb-6">
                 <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                   <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                   </svg>
                 </div>
                 <div className="flex-1 min-w-0">
                   <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Phone Numbers</h3>
                   <div className="space-y-1">
                     <p className="text-gray-600 text-sm sm:text-base">1 (234) 567-891</p>
                     <p className="text-gray-600 text-sm sm:text-base">1 (234) 987-654</p>
                   </div>
                 </div>
               </div>

                             {/* Hours */}
               <div className="flex items-start space-x-3 sm:space-x-4">
                 <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                   <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <div className="flex-1 min-w-0">
                   <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Business Hours</h3>
                   <p className="text-gray-600 text-sm sm:text-base">
                     Mon-Fri: 10am-8pm<br />
                     Sat/Sun: Closed
                   </p>
                 </div>
               </div>
            </div>

                         {/* Additional Info Card */}
             <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
               <h3 className="text-lg sm:text-xl font-bold mb-4">Why Choose Us?</h3>
                             <ul className="space-y-2 sm:space-y-3">
                 <li className="flex items-center space-x-2 sm:space-x-3">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   <span className="text-sm sm:text-base">Professional Service</span>
                 </li>
                 <li className="flex items-center space-x-2 sm:space-x-3">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   <span className="text-sm sm:text-base">Quick Response Time</span>
                 </li>
                 <li className="flex items-center space-x-2 sm:space-x-3">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                   <span className="text-sm sm:text-base">Quality Guaranteed</span>
                 </li>
               </ul>
            </div>
          </motion.div>

                     {/* Right Column - Contact Form */}
           <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.8 }}
             className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
           >
             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg"
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}

                         <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
               {/* Name Field */}
               <div>
                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                   Full Name *
                 </label>
                 <input
                   type="text"
                   id="name"
                   name="name"
                   value={formData.name}
                   onChange={handleInputChange}
                   placeholder="Enter your Name"
                   required
                   className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm sm:text-base"
                 />
               </div>

                             {/* Email Field */}
               <div>
                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                   Email Address *
                 </label>
                 <input
                   type="email"
                   id="email"
                   name="email"
                   value={formData.email}
                   onChange={handleInputChange}
                   placeholder="Enter a valid email address"
                   required
                   className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm sm:text-base"
                 />
               </div>

                             {/* Message Field */}
               <div>
                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                   Message *
                 </label>
                 <textarea
                   id="message"
                   name="message"
                   value={formData.message}
                   onChange={handleInputChange}
                   placeholder="Enter your message"
                   required
                   rows="5"
                   className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none text-sm sm:text-base"
                 />
               </div>

                             {/* Submit Button */}
               <motion.button
                 type="submit"
                 disabled={isSubmitting}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
               >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'SUBMIT'
                )}
              </motion.button>
            </form>

                         {/* Additional Info */}
             <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-50 rounded-lg">
               <p className="text-xs sm:text-sm text-gray-600 text-center">
                 We typically respond within 24 hours during business days.
               </p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
