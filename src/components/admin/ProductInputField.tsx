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
