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
  loader?: boolean; // Add loader prop
  error?: string;
  onChange?: (option: Option) => void; // Update onChange type
  isDisabled?: boolean
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder,
  loader = false, // Default to false
  error,
  value,
  onChange,
  isDisabled = false
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    if (selectedOption && onChange) {
      onChange(selectedOption); // Send the entire option object
    }
  };

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        className="block w-full rounded-md border px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-400 dark:bg-slate-700 sm:text-sm"
        value={value}
        onChange={handleChange}
        disabled={loader || isDisabled} // Disable select when loader is true
      >
        {/* If loading, show a loading option */}
        {loader ? (
          <option value="" disabled>
            Loading...
          </option>
        ) : (
          <>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>

      {/* Display spinner when loading */}
      {loader && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 animate-spin text-gray-500"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
