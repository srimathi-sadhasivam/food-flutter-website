import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

const Seafood = ({ onBack, showLoginModal, setShowLoginModal, currentPage, setCurrentPage, currentRoute, setRoute }) => {
  const menuRef = useRef(null);
  const newsletterRef = useRef(null);
  const { user, isAuthenticated } = useAuth();
  const { addToCart, loading } = useCart();

  const handleAddToCart = async (item) => {
    if (!isAuthenticated || !user) {
      setShowLoginModal(true);
      return;
    }

    try {
      await addToCart(item);
      console.log(`${item.name} added to cart successfully!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-gray-50 min-h-screen overflow-hidden">
      <Navbar onNavigate={setRoute} showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} currentPage={currentPage} setCurrentPage={setCurrentPage} currentRoute={currentRoute} setRoute={setRoute} />
      <div className="pt-24">
      {/* Enhanced Background Design */}
      <div className="absolute inset-8 overflow-hidden">
        {/* Animated fish and bubbles */}
        <div className="absolute inset-8 overflow-hidden">
          {/* Animated fish */}
          <div className="absolute top-1/4 left-1/4 w-12 h-8 opacity-30 animate-swim">
            <svg viewBox="0 0 100 50" className="w-full h-full fill-blue-300">
              <path d="M80,25 C100,35 100,15 80,25 C70,5 30,5 20,25 C0,15 0,35 20,25 C30,45 70,45 80,25 Z" />
            </svg>
          </div>
          
          {/* Bubble animation */}
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white/20 animate-float"
              style={{
                left: `${5 + (i * 6)}%`,
                bottom: '-20px',
                width: `${5 + (i % 3)}px`,
                height: `${5 + (i % 3)}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + (i % 10)}s`
              }}
            ></div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Subtle wave pattern overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-repeat-x opacity-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23f97316'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: '1200px 24px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center p-10 relative z-10">
        {/* Left Side - Two Larger Images with Connected Design */}
        <div className="relative">
          <div className="flex flex-col gap-10">
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <img
                src="https://www.licious.in/blog/wp-content/uploads/2022/03/shutterstock_769889659-min.jpg"
                alt="Fresh Seafood Selection"
                className="relative rounded-2xl shadow-lg w-full h-96 object-cover transform group-hover:scale-105 transition duration-300"
              />
              {/* Image label */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                <span className="text-orange-600 font-semibold text-sm">Fresh Catch</span>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <img
                src="https://content.jdmagicbox.com/v2/comp/bangalore/l8/080pxx80.xx80.210928234942.d5l8/catalogue/lobster-restaurant-kammanahalli-bangalore-restaurants-1glvn40b6a.jpg"
                alt="Gourmet Seafood Dish"
                className="relative rounded-2xl shadow-lg w-full h-96 object-cover transform group-hover:scale-105 transition duration-300"
              />
              {/* Image label */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                <span className="text-orange-600 font-semibold text-sm">Gourmet Preparation</span>
              </div>
            </div>
          </div>
          
          {/* Rotating Circular Quality Food Badge */}
          <div className="absolute -right-14 top-1/2 transform -translate-y-1/2 hidden md:block">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-spin-slow"></div>
              <div className="absolute inset-0 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                <div className="text-black font-bold text-center">
                  <div className="text-xl leading-tight font-extrabold">QUALITY</div>
                  <div className="text-xl leading-tight font-extrabold">FOOD</div>
                </div>
              </div>
              
              {/* Circular text - "AUTHENTIC • FRESH • NATURAL" */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow-reverse">
                  <defs>
                    <path id="circlePath"
                      d="M 50, 50
                        m -37, 0
                        a 37,37 0 1,1 74,0
                        a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="text-[8px] font-bold fill-black">
                    <textPath href="#circlePath" startOffset="0%">
                      AUTHENTIC • FRESH • NATURAL • PREMIUM • 
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div>
          <h4 className="text-orange-500 uppercase font-semibold mb-2 tracking-wider">
            Discover Ocean's Finest
          </h4>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            PREMIUM & FLAVORFUL <br className="hidden md:block" /> SEAFOOD FOR <br className="hidden md:block" /> YOUR WELLNESS
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed text-lg">
            Indulge in the ocean's bounty with our carefully selected seafood offerings. 
            Each dish is prepared with expertise to deliver exceptional taste and nutritional value. 
            Our commitment is to provide you with the highest quality seafood for a healthier lifestyle.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-md font-semibold shadow transition duration-300 flex items-center justify-center">
              Learn More About Us 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={scrollToMenu}
              className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-md font-semibold shadow transition duration-300 flex items-center justify-center"
            >
              Explore Our Menu 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">20K+</h2>
              <p className="text-gray-500 text-sm">Satisfied Customers</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">150+</h2>
              <p className="text-gray-500 text-sm">Expert Chefs</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">5000+</h2>
              <p className="text-gray-500 text-sm">Dishes Served</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div ref={menuRef} className="max-w-7xl mx-auto p-10 relative z-10 mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Seafood Menu</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Menu Item 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1559737558-2f6a276dce3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Grilled Salmon" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Grilled Atlantic Salmon</h3>
              <p className="text-gray-600 mb-4">Fresh salmon fillet grilled to perfection with herbs and lemon butter sauce.</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-lg">$24.99</span>
                <button 
                  onClick={() => handleAddToCart({
                    id: 'salmon-001',
                    name: 'Grilled Atlantic Salmon',
                    price: 24.99,
                    image: 'https://images.unsplash.com/photo-1559737558-2f6a276dce3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                  })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu Item 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Lobster Platter" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lobster Thermidor</h3>
              <p className="text-gray-600 mb-4">Succulent lobster meat cooked in a rich cream sauce with mushrooms and cheese.</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-lg">$38.99</span>
                <button 
                  onClick={() => handleAddToCart({
                    id: 'lobster-001',
                    name: 'Lobster Thermidor',
                    price: 38.99,
                    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                  })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu Item 3 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1580745830016-5e7cb8f63b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Shrimp Scampi" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Shrimp Scampi</h3>
              <p className="text-gray-600 mb-4">Jumbo shrimp sautéed in garlic, white wine, and butter sauce over linguine.</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-lg">$22.99</span>
                <button 
                  onClick={() => handleAddToCart({
                    id: 'shrimp-001',
                    name: 'Shrimp Scampi',
                    price: 22.99,
                    image: 'https://images.unsplash.com/photo-1580745830016-5e7cb8f63b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                  })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu Item 4 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Seafood Paella" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Seafood Paella</h3>
              <p className="text-gray-600 mb-4">Traditional Spanish rice dish with shrimp, mussels, clams, and saffron.</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-lg">$28.99</span>
                <button 
                  onClick={() => handleAddToCart({
                    id: 'paella-001',
                    name: 'Seafood Paella',
                    price: 28.99,
                    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                  })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu Item 5 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Tuna Steak" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Seared Tuna Steak</h3>
              <p className="text-gray-600 mb-4">Premium tuna steak seared rare with sesame crust and ginger-soy glaze.</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-lg">$26.99</span>
                <button 
                  onClick={() => handleAddToCart({
                    id: 'tuna-001',
                    name: 'Seared Tuna Steak',
                    price: 26.99,
                    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                  })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu Item 6 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img 
              src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Fish and Chips" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fish & Chips</h3>
              <p className="text-gray-600 mb-4">Beer-battered cod served with crispy fries, coleslaw, and tartar sauce.</p>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-bold text-lg">$18.99</span>
                <button 
                  onClick={() => handleAddToCart({
                    id: 'fish-chips-001',
                    name: 'Fish & Chips',
                    price: 18.99,
                    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
                  })}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Button to scroll to newsletter */}
        <div className="text-center mt-16">
          <button 
            onClick={scrollToNewsletter}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-md font-semibold shadow transition duration-300 flex items-center justify-center mx-auto"
          >
            Subscribe to Our Newsletter 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div ref={newsletterRef} className="bg-orange-50 py-16 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">SUBSCRIBE FOLLOW OUR NEWSLETTER</h2>
            <p className="text-xl text-gray-600 mt-4">TO GET MORE UPDATES</p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">SPRING MESSAGE</label>
                <textarea 
                  id="message" 
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button type="submit" className="w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition duration-300 font-semibold">
                SUBSCRIBE NOW
              </button>
            </form>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">WELLFOOD</h3>
              <p className="text-gray-600">Temporibus autem quibusdam officis aut rerum necessitatibus eveniet voluta reputiandae molestiae recusandae</p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">POPULAR FOOD</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Hamburger</li>
                <li>French fries</li>
                <li>Chicken pizza</li>
                <li>Onion rings</li>
                <li>Vegetable roll</li>
                <li>Chicken nuggets</li>
                <li>See fish</li>
                <li>Tacos Pizza</li>
                <li>Fried chicken</li>
                <li>Hot Dogs</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">CONTACT US</h3>
              <address className="not-italic text-gray-600">
                <p>1403 Washington Ave, New Orleans,</p>
                <p>LA70130, United States</p>
                <p className="mt-2">wellfood@gmail.com</p>
                <p className="mt-2">+1 (098) 765 4321</p>
              </address>
              
              <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-2">HAVE ANY QUESTIONS?</h4>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
                LET'S TALK US
              </button>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">OPENING HOUR</h3>
              <p className="text-gray-600">Monday-Friday: 8am-4pm</p>
              <p className="text-gray-600">Saturday: 8am-12am</p>
              
              <div className="flex space-x-4 mt-6">
                <a href="#" className="bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 transition duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 text-white p-2 rounded-full hover:bg-orange-500 transition duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              
              <div className="mt-8">
                <p className="text-gray-600 text-sm">Buy on Envato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-slow-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes swim {
          0% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(20px) translateY(-10px) rotate(5deg); }
          50% { transform: translateX(40px) translateY(0) rotate(0deg); }
          75% { transform: translateX(20px) translateY(10px) rotate(-5deg); }
          100% { transform: translateX(0) translateY(0) rotate(0deg); }
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 20s linear infinite;
        }
        .animate-swim { 
          animation: swim 10s ease-in-out infinite; 
        }
        .animate-float { 
          animation: float 8s ease-in-out infinite; 
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Seafood;