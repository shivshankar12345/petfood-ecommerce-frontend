import React from "react";
import { User } from "../../types/user.types";
import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: () => void; // Function to call after saving changes
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSave }) => {
  const { register, handleSubmit, reset } = useForm<User>();
  const {makeAPICallWithData}=useApi();

  // Populate form with the user data when the modal opens
  React.useEffect(() => {
    reset(user);
  }, [user, reset]);

const onSubmit = async (data: User) => {
    try {
      // Make API call to update user
      const response=await makeAPICallWithData("patch","/users/update",{
        name: data.name,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
      });

      if (!response.isError) {
        throw new Error("Failed to update user");
      }

      const result = await response.response?.data;
      console.log("User updated successfully", result);

      // Call onSave to refresh the user list after saving
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"> {/* Overlay */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-96"> {/* Modal content */}
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              {...register("name", { required: true })} // Register input with validation
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: true })} // Register input with validation
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="phone"
              {...register("phone", { required: true })} // Register input with validation
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender:
            </label>
            <input
              type="gender"
              {...register("gender", { required: true })} // Register input with validation
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Add more fields as needed */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
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
