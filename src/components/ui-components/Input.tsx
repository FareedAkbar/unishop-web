import React, { useState, useRef, useEffect, FocusEvent } from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  width?: string;
  animateOnClick?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  onIconClick,
  width = "w-64",
  animateOnClick = false,
}) => {
  const [isVisible, setIsVisible] = useState(!animateOnClick);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLDivElement>(null); // Reference for the input container

  const handleIconClick = () => {
    if (animateOnClick) setIsVisible((prev) => !prev);
    if (onIconClick) onIconClick();
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onIconClick) onIconClick();
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  };

  const isActive = isVisible || isFocused; // Determines if the input is active

  // Detect click outside the input component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsVisible(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={inputRef} // Attach ref to the input container
      className="flex items-center justify-between rounded bg-gray-100 dark:bg-slate-700 dark:text-white"
    >
      {/* Animated Input Field */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isVisible ? `${width} opacity-100` : "w-0 opacity-0"
        }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleEnterPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full bg-transparent p-2 text-sm focus:outline-none"
        />
      </div>

      {icon && (
        <button
          type="button"
          className={`p-2 transition-transform duration-300 ${
            isActive ? "text-red-500" : "text-black dark:text-white"
          }`}
          onClick={handleIconClick}
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default Input;
