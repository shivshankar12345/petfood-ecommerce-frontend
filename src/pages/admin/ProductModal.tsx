import React from "react";
import ProductInputField from "../../components/admin/ProductInputField";
import { AddProductModalProps } from "../../types/Product.types";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  categoryId: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: File | null; // Change to File or null for file input
  brandId: number;
  sellerId: number;
  petType: string;
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data); // Call parent onSubmit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] scrollbar-thin overflow-y-auto">
        <h2 className="text-2xl mb-4">Add Product</h2>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ProductInputField
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-4"
            {...register("categoryId", { required: "Category is required" })}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="toys">Toys</option>
            <option value="clothing">Clothing</option>
            <option value="health & wellness">Health & Wellness</option>
          </select>
          {errors.categoryId && (
            <p className="text-red-500">{errors.categoryId.message}</p>
          )}

          <ProductInputField
            label="Price"
            type="number"
            placeholder="Enter product price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

          <ProductInputField
            label="Description"
            type="textarea"
            placeholder="Enter product description"
            {...register("description")}
          />

          <ProductInputField
            label="Stock"
            type="number"
            placeholder="Enter stock quantity"
            {...register("stock", {
              required: "Stock quantity is required",
              valueAsNumber: true,
            })}
          />
          {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}

          <label className="block text-gray-700 font-bold mb-2">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            {...register("imageUrl", { required: "Image file is required" })}
            className="border rounded w-full py-2 px-3 mb-4"
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl.message}</p>}

          <ProductInputField
            label="Brand ID"
            type="number"
            placeholder="Enter brand ID"
            {...register("brandId", { required: "Brand ID is required", valueAsNumber: true })}
          />
          {errors.brandId && <p className="text-red-500">{errors.brandId.message}</p>}

          <ProductInputField
            label="Seller ID"
            type="number"
            placeholder="Enter seller ID"
            {...register("sellerId", { required: "Seller ID is required", valueAsNumber: true })}
          />
          {errors.sellerId && <p className="text-red-500">{errors.sellerId.message}</p>}

          <label className="block text-gray-700 font-bold mb-2">Pet Type</label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-4"
            {...register("petType", { required: "Pet type is required" })}
          >
            <option value="">Select Pet Type</option>
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
          </select>
          {errors.petType && <p className="text-red-500">{errors.petType.message}</p>}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 border rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
