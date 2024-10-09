import React from "react";

interface ProductInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  placeholder: string;
}

const ProductInputField = React.forwardRef<HTMLInputElement, ProductInputFieldProps>(
  ({ label, type, placeholder, ...rest }, ref) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          ref={ref}
          className="border rounded w-full py-2 px-3 text-gray-700"
          {...rest}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className="border rounded w-full py-2 px-3 text-gray-700"
          {...rest}
        />
      )}
    </div>
  )
);

ProductInputField.displayName = "ProductInputField";
export default ProductInputField;
