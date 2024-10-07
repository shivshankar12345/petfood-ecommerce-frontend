import React from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../types/Product.types";
import ProductInputField from "../../components/admin/ProductInputField";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  initialData?: Product | null; // Allow null here
  isEditMode: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
}) => {
  const { register, handleSubmit, reset } = useForm<Product>();

  React.useEffect(() => {
    if (isOpen && initialData) {
      reset(initialData); // Reset form with initial data when modal opens
    }
  }, [isOpen, initialData, reset]);

  const handleModalSubmit = async (data: Product) => {
    await onSubmit(data);
    onClose(); // Close modal after submit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto z-10 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit(handleModalSubmit)}>
          <ProductInputField
            label="Product Name"
            type="text"
            {...register("name", { required: true })} // Registration handles value
          />
          <ProductInputField
            label="Category ID"
            type="number"
            {...register("categoryId", { required: true })} // Registration handles value
          />
          <ProductInputField
            label="Price"
            type="number"
            {...register("price", { required: true })} // Registration handles value
          />
          <ProductInputField
            label="Description"
            type="textarea"
            {...register("description", { required: true })} // Registration handles value
          />
          <ProductInputField
            label="Stock"
            type="number"
            {...register("stock", { required: true })} // Registration handles value
          />
          <ProductInputField
            label="Image URL"
            type="text"
            {...register("imageurl", { required: true })} // Registration handles value
          />
          <ProductInputField
            label="Pet Type"
            type="text"
            {...register("petType", { required: true })} // Registration handles value
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300"
            >
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
