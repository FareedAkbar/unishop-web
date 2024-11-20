import React from "react";

const BackgroundSquares: React.FC = () => {
  return (
    <ul className="absolute inset-0 -z-10 flex flex-wrap overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <li
          key={index}
          className={`animate-square absolute top-32 bg-red-300 opacity-20 ${
            index % 2 === 0 ? "h-20 w-20" : "h-32 w-32"
          }`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${20 + Math.random() * 30}s`,
          }}
        />
      ))}
    </ul>
  );
};

export default BackgroundSquares;
