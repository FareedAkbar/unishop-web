import React from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; // Prop for icon
  onIconClick?: () => void; // Function for icon click and "Enter" key press
  width?: string; // Prop for width
}

const SearchInput: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  onIconClick,
  width = "full", // Default to full width if no width prop is provided
}) => {
  // Function to handle key press (specifically Enter key)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onIconClick) {
      onIconClick();
    }
  };

  return (
    <div
      className={`flex items-center overflow-hidden rounded border bg-inputbg ${width}`}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown} // Listening for key presses
        className="flex-1 bg-transparent p-1 text-base focus:outline-none"
      />
      {icon && (
        <button
          type="button"
          className="mr-2 p-1 text-red-400"
          onClick={onIconClick} // Handle icon click
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default SearchInput;
