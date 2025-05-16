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
  loader?: boolean;
  error?: string;
  onChange?: (option: Option) => void;
  isDisabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  options,
  placeholder,
  loader = false,
  error,
  value,
  onChange,
  isDisabled = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue,
    );

    if (selectedOption && onChange) {
      onChange(selectedOption);
    }
  };

  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        className="block w-full rounded-md border p-2 capitalize shadow-sm selection:text-white focus:border-red-500 focus:outline-none focus:ring-red-400 dark:bg-slate-700 dark:text-white sm:text-sm"
        value={value}
        onChange={handleChange}
        disabled={loader || isDisabled}
      >
        {loader ? (
          <option value="" disabled>
            Loading...
          </option>
        ) : (
          <>
            {placeholder && (
              <option value="" disabled className="text-sm dark:text-white">
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-sm capitalize"
              >
                {option.label}
              </option>
            ))}
          </>
        )}
      </select>

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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
