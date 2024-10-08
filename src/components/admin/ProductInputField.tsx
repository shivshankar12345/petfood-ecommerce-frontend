import React from "react";
import { ProductInputFieldProps } from "../../types/Product.types";

const ProductInputField: React.FC<ProductInputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  accept, // This is specifically for file types
  name, // Include name prop for identification
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name} // Adding an id for accessibility
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={value as string} // Ensure this is string type
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          name={name} // Include name prop
          {...rest}
        />
      ) : (
        <input
          id={name} // Adding an id for accessibility
          type={type}
          className="border rounded w-full py-2 px-3 text-gray-700"
          value={type !== "file" ? (value as string | number) : undefined} // file input doesn’t have a value
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          accept={type === "file" ? accept : undefined} // Only use accept if it's a file type
          name={name} // Include name prop
          {...rest}
        />
      )}
    </div>
  );
};

export default ProductInputField;
