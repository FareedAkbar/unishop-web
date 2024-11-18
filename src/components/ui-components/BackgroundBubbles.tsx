// src/components/BackgroundBubbles.tsx

import React from "react";

const BackgroundBubbles: React.FC = () => {
  return (
    <ul className="absolute inset-0 -z-10 flex flex-wrap overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <li
          key={index}
          className={`absolute top-32 bg-red-300 opacity-20 animate-bubble ${
            index % 2 === 0 ? "w-20 h-20" : "w-32 h-32"
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${20 + Math.random() * 30}s`,
          }}
        ></li>
      ))}
    </ul>
  );
};

export default BackgroundBubbles;
