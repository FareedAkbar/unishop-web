import React from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
  loading?: boolean;
  color?: string;
  height?: string;
  width?: string;
  className?: string; // Add className prop here
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  loading = false,
  color = "bg-red-500",
  height = "h-full",
  width = "w-fit",
  className = "", // Default value for className
}) => {
  return (
    <button
      onClick={onClick}
      className={`${width} ${height} ${color} flex items-center justify-center rounded-md px-4 py-2 font-medium text-white transition-opacity duration-300 hover:opacity-90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:px-6 sm:py-3 ${className}`}
      disabled={loading}
    >
      {loading ? (
        <svg
          className="h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
