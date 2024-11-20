import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface InputOption {
  value: string;
  label: string;
  amount: number;
  type: string;
}

interface DynamicInputProps<T extends FieldValues> {
  name: Path<T>; // Ensure name is a key of the form data type
  options: InputOption[];
  control?: Control<T>; // Use the generic type here
  error?: string; // Optional error message
}

const DynamicInput = <T extends FieldValues>({
  name,
  options,
  control,
  error,
}: DynamicInputProps<T>) => {
  return (
    <div className="mb-4">
      <div className="flex flex-col">
        <Controller
          name={name} // No need to cast to string
          control={control}
          render={({ field }) => (
            <div>
              {options.map((option) => (
                <div key={option.value}>
                  <div className="my-4 border-t border-gray-300" />
                  <label className="flex">
                    <input
                      type="radio"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)} // Handle change
                      className="form-radio"
                    />
                    <div className="flex flex-1">
                      <span className="flex-1 text-center">
                        {option.amount}
                      </span>
                      <span className="flex-1 text-center">{option.type}</span>
                      <span className="flex-1 text-center">{option.label}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          )}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default DynamicInput;
