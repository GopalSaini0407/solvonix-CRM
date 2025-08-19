import React from "react";

const CustomInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  error,
  icon,
  required = false,
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="mb-1 font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-2 top-1/2 -translate-y-1/2">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full p-2 pl-${icon ? "8" : "2"} rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition`}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default CustomInput;
