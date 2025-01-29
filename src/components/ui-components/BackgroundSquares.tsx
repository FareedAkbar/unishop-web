import React, { useEffect, useState } from "react";

const generateSquares = (count: number) =>
  Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${20 + Math.random() * 30}s`,
  }));

const BackgroundSquares: React.FC = () => {
  const [squares, setSquares] = useState<{ top: string; left: string; animationDelay: string; animationDuration: string }[]>([]);

  useEffect(() => {
    setSquares(generateSquares(20)); // Generate squares only on the client
  }, []);

  return (
    <ul className="absolute inset-0 -z-10 flex flex-wrap overflow-hidden">
      {squares.map((square, index) => (
        <li
          key={index}
          className={`animate-square absolute bg-red-300 opacity-20 ${index % 2 === 0 ? "h-20 w-20" : "h-32 w-32"}`}
          style={{
            top: square.top,
            left: square.left,
            animationDelay: square.animationDelay,
            animationDuration: square.animationDuration,
          }}
        />
      ))}
    </ul>
  );
};

export default BackgroundSquares;
