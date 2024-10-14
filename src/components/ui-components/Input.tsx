import React from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; // New prop for icon
  onIconClick?: () => void; // Optional function for icon click
  width?: string; // New prop for width
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  onIconClick,
  width = "full", // Default to full width if no width prop is provided
}) => {
  return (
    <div
      className={`flex items-center overflow-hidden rounded dark:bg-slate-700 dark:text-white bg-inputbg ${width}`}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent p-1 text-base focus:outline-none " // Set text size for value and placeholder
      />
      {icon && (
        <button
          type="button"
          className="mr-2 p-1 "
          onClick={onIconClick} // Handle icon click
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default Input;
