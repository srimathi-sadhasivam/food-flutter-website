import React, { useEffect, useState } from "react";
import "./sparkle.css"; // This imports the animation from Step 1

const SparkleBackground = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sparkle = {
        id: Date.now(),
        left: Math.random() * window.innerWidth,
        top: Math.random() * window.innerHeight,
        size: Math.random() * 8 + 4 // 4px to 12px
      };
      setSparkles((prev) => [...prev.slice(-30), sparkle]); // Limit to 30 sparkles
    }, 200); // every 200ms a new sparkle

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-black overflow-hidden pointer-events-none">


      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
          }}
        />
      ))}
    </div>
  );
};

export default SparkleBackground;
