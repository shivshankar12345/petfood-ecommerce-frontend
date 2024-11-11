import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { CategoryForm } from "../../types/Category.types";
import { CategoryModalProps } from "../../types/Category.types";
import { toast } from "react-toastify";
const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onCategoryAdded,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>();
  const { makeAPICallWithData } = useApi();

  const submitHandler: SubmitHandler<CategoryForm> = async data => {
    try {
      const { isError } = await makeAPICallWithData(
        "post",
        "/product-category/createCategory",
        {
          name: data.categoryName,
          description: data.description,
        }
      );
      if (!isError) {
        toast.success("category added successfully");
      }
      onCategoryAdded({
        name: data.categoryName,
        description: data.description,
      });

      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  if (!isOpen) return null;
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Add Category</h3>
          <div className="w-5 h-5 cursor-pointer" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <input
            type="text"
            placeholder="Enter category name"
            className="border rounded w-full py-2 px-3"
            {...register("categoryName", {
              required: "Category name is required",
            })}
          />
          {errors.categoryName && (
            <p className="text-red-500">{errors.categoryName.message}</p>
          )}

          <textarea
            placeholder="Enter category description"
            className="border rounded w-full py-2 px-3"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
            <button
              type="button" // Use "button" to prevent form submission
              onClick={handleClose} // Call the function to close the modal
              className="mt-2 ml-2 px-4 py-2 bg-blue-500 text-white rounded" // Add ml-2 for space on the left
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
