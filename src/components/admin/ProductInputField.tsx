// import React from "react";
// import { ProductInputFieldProps } from "../../types/common.types";

// const ProductInputField: React.FC<ProductInputFieldProps> = ({ label, error,register,type, name, value, onChange, required,accept }) => {
//   return (
//     <div className="mb-4">
//         {type === "textarea" ? (
//           <>
//           <label className="block text-sm font-medium mb-2">{label}</label>
//           <textarea
//             name={name}
//             //value={value}
//             // onChange={onChange}
//             {...register(name, { required })}
//             //required={required}
//             className="border border-gray-300 rounded w-full px-3 py-2"
//           />
//            {error && <span className="text-red-500 text-sm">This field is required</span>}
//           </>
//         ) : ( <>
//           <label className="block text-sm font-medium mb-2">{label}</label>
//           <input
//             type={type}
//             name={name}
//             //value={value}
//             // onChange={onChange}
//             {...register(name, { required })}
//             //required={required}
//             className="border border-gray-300 rounded w-full px-3 py-2"
//             accept={accept}
//           />
//            {error && <span className="text-red-500 text-sm">This field is required</span>}
//           </>
//         )}
//       </div>
//   );
// };

// export default ProductInputField;

import React from "react";
import { ProductInputFieldProps } from "../../types/common.types";

// interface ProductInputFieldProps {
//   label: string;
//   type: string;
//   name: string;
//   value?: string | number;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   required?: boolean;
//   buttonLabel?: string;
//   onButtonClick?: () => void;
//   accept?: string;
//   register: any;
//   error?: FieldError;
//   imagePreview?: string; // Include imagePreview
// }

const ProductInputField: React.FC<ProductInputFieldProps> = ({
  label,
  type,
  name,
  onChange,
  required,
  accept,
  register,
  error,
  imagePreview,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "textarea" ? (
        <textarea
          {...register(name, { required })}
          onChange={onChange} // Add onChange here
          className={`mt-1 block w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded p-2`}
        />
      ) : (
        <input
          type={type}
          {...register(name, { required })}
          onChange={onChange} // Add onChange here
          accept={accept} // Use accept prop for file input
          className={`mt-1 block w-full border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded p-2`}
        />
      )}
      {type === "file" &&
        imagePreview && ( // Check for imagePreview to display
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default ProductInputField;
