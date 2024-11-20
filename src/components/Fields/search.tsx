import React from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  onIconClick?: () => void;
  width?: string;
}

const SearchInput: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
  icon,
  onIconClick,
  width = "full",
}) => {
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
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent p-1 text-base focus:outline-none"
      />
      {icon && (
        <button
          type="button"
          className="mr-2 p-1 text-red-400"
          onClick={onIconClick}
        >
          {icon}
        </button>
      )}
    </div>
  );
};

export default SearchInput;
