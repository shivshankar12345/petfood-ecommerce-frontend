// src/components/admin/ProductInputField.tsx
import React from "react";

interface ProductInputFieldProps {
  label: string;
  type: string;
  value?: string | number; // Define value as a prop
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  // Add any other props needed, such as `min`, `max`, etc.
}

const ProductInputField: React.FC<ProductInputFieldProps> = ({
  label,
  type,

  onChange,
  onBlur,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea
          className="border rounded w-full py-2 px-3 text-gray-700"
       
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <input
          type={type}
          className="border rounded w-full py-2 px-3 text-gray-700"
        
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    </div>
  );
};

export default ProductInputField;
