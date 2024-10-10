import React from "react";

interface ProductInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  type: string;
  placeholder: string;
}

const ProductInputField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ProductInputFieldProps
>(({ label, type, placeholder, ...rest }, ref) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">{label}</label>
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        className="border rounded w-full py-2 px-3 text-gray-700"
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        ref={ref as React.Ref<HTMLInputElement>}
        className="border rounded w-full py-2 px-3 text-gray-700"
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    )}
  </div>
));

ProductInputField.displayName = "ProductInputField";
export default ProductInputField;
