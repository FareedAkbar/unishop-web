"use client";
import React from "react";

interface SpinnerProps {
  fullScreen?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 dark:bg-slate-900">
        <div className="relative flex items-center justify-center">
          <div className="h-28 w-28 animate-spin rounded-full border-t-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-transparent">
      <div className="relative flex items-center justify-center">
        <div className="h-28 w-28 animate-spin rounded-full border-t-2 border-red-500"></div>
      </div>
    </div>
  );
};

export default Spinner;
