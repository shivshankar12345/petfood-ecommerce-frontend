import React from "react";
import { ProductInputFieldProps } from "../../types/common.types";

const ProductInputField: React.FC<ProductInputFieldProps> = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className="mb-4">
        {type === "textarea" ? (
          <>
          <label className="block text-sm font-medium mb-2">{label}</label>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="border border-gray-300 rounded w-full px-3 py-2"
          />
          </>
        ) : ( <>
          <label className="block text-sm font-medium mb-2">{label}</label>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="border border-gray-300 rounded w-full px-3 py-2"
          />
          </>
        )}
      </div>
  );
};

export default ProductInputField;
