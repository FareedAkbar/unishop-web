"use client";
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 dark:bg-slate-900">
      <div className="relative flex items-center justify-center">
        <div className="h-28 w-28 animate-spin rounded-full border-t-2 border-red-500"></div>
        {/* SVG Circular Loader with Red Gradient */}
        {/* <svg
          className="h-16 w-16 animate-spin"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#f32f05", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#f58971", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="url(#grad1)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
        </svg> */}
      </div>
    </div>
  );
};

export default Spinner;
