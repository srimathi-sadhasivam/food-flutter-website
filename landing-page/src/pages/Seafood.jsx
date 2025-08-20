import React from "react";

const Seafood = () => {
  return (
    <div className="relative bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden py-12">
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
            <button className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-md font-semibold shadow transition duration-300 flex items-center justify-center">
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