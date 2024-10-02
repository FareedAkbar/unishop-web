import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; // New prop for icon
  onIconClick?: () => void; // Optional function for icon click
  width?: string; // New prop for width
}

const SearchInput: React.FC<InputProps> = ({ 
  placeholder, 
  type = 'text', 
  value, 
  onChange, 
  icon, 
  onIconClick, 
  width = 'full' // Default to full width if no width prop is provided
}) => {
  return (
    <div className={`flex items-center rounded overflow-hidden bg-inputbg border ${width}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 p-1 focus:outline-none bg-transparent text-base font-poppins" // Set text size for value and placeholder
      />
      {icon && (
        <button 
          type="button" 
          className="p-1 mr-2 text-red-400" 
          onClick={onIconClick} // Handle icon click
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default SearchInput;