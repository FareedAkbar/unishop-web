// components/Select.tsx
import React from "react";


interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  options: Option[];
  value?: string;
  placeholder?: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Added onChange handler
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder,

  error,
  value,
  onChange // Destructure onChange
}) => {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-400 focus:border-indigo-300 sm:text-sm"
        value={value}
        onChange={onChange} // Attach onChange handler
      >

        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Select;
