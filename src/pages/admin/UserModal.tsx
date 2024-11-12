// import React from "react";
// import { User } from "../../types/user.types";
// import { useForm } from "react-hook-form";
// import useApi from "../../hooks/useApi";

// interface EditUserModalProps {
//   user: User;
//   onClose: () => void;
//   onSave: () => void; // Function to call after saving changes
// }

// const EditUserModal: React.FC<EditUserModalProps> = ({
//   user,
//   onClose,
//   onSave,
// }) => {
//   const { register, handleSubmit, reset } = useForm<User>();
//   const { makeAPICallWithData } = useApi();

//   // Populate form with the user data when the modal opens
//   React.useEffect(() => {
//     reset({
//       ...user,
//       gender:
//         user.gender === "m"
//           ? "Male"
//           : user.gender === "f"
//           ? "Female"
//           : "Others",
//     });
//   }, [user, reset]);

//   const onSubmit = async (data: User) => {
//     try {
//       // Make API call to update user
//       const response = await makeAPICallWithData(
//         "patch",
//         "/admin-panel/modifyUser",
//         {
//           id: data.id,
//           name: data.name,
//           email: data.email,
//           phone: data.phone,
//           gender:
//             data.gender === "Male"
//               ? "m"
//               : data.gender === "Female"
//               ? "f"
//               : "o", // Map gender values back to the expected format
//         }
//       );

//       if (response.isError) {
//         throw new Error("Failed to update user");
//       }

//       const result = await response.response?.data;
//       console.log("User updated successfully", result);

//       // Call onSave to refresh the user list after saving
//       onSave();
//       onClose();
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
//       {" "}
//       {/* Overlay */}
//       <div className="bg-white rounded-lg shadow-lg p-6 w-96">
//         {" "}
//         {/* Modal content */}
//         <h2 className="text-xl font-semibold mb-4">Edit User</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Name:
//             </label>
//             <input
//               type="text"
//               {...register("name", { required: true })} // Register input with validation
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email:
//             </label>
//             <input
//               type="email"
//               {...register("email", { required: true })} // Register input with validation
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Phone:
//             </label>
//             <input
//               type="phone"
//               {...register("phone", { required: true })} // Register input with validation
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Gender:
//             </label>
//             <select
//               {...register("gender", { required: true })} // Register input with validation
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Others">Others</option>
//             </select>
//           </div>
//           {/* Add more fields as needed */}
//           <div className="flex justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               Save
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditUserModal;

import React from "react";
import { User } from "../../types/user.types";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { toast } from "react-toastify";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: () => void; // Function to call after saving changes
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();
  const { makeAPICallWithData } = useApi();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  // Populate form with the user data when the modal opens
  React.useEffect(() => {
    reset({
      ...user,
      gender:
        user.gender === "m"
          ? "Male"
          : user.gender === "f"
          ? "Female"
          : "Others",
    });
  }, [user, reset]);

  const onSubmit = async (data: User) => {
    // Make API call to update user
    const { isError, error, response } = await makeAPICallWithData(
      "patch",
      "/users/modifyUser",
      {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        gender:
          data.gender === "Male" ? "m" : data.gender === "Female" ? "f" : "o", // Map gender values back to the expected format
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (isError) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return;
    }

    const result = response?.data;
    console.log("User updated successfully", result);

    // Call onSave to refresh the user list after saving
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      {/* Overlay */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        {/* Modal content */}
        <h2 className="text-2xl font-semibold mb-4 text-center">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone:
            </label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender:
            </label>
            <select
              {...register("gender", { required: true })}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:ring-2 focus:ring-blue-500 ${
                errors.gender ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            {errors.gender && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-200 ease-in-out"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition duration-200 ease-in-out"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
