// src/components/BackgroundBubbles.tsx

import React from "react";

const BackgroundBubbles: React.FC = () => {
  return (
    <ul className="fixed inset-0 z-[-1] flex flex-wrap overflow-hidden">
      {Array.from({ length: 10 }).map((_, index) => (
        <li
          key={index}
          className={`absolute top-32 rounded-full bg-red-300 opacity-20 animate-bubble ${
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
