import React, { useState } from "react";
import ProductInputField from "../../components/admin/ProductInputField";
import {
  AddProductModalProps,
  Product,
} from "../../types/Product.types";
const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    categoryId: "",
    price: 0,
    description: "",
    stock: 0,
    imageUrl: null,
    brandId: undefined,
    sellerId: 0,
    petType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "stock" ||
        name === "brandId" ||
        name === "sellerId"
          ? value
            ? Number(value)
            : 0
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      imageUrl: file,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Product Name is required";
    if (!formData.categoryId) newErrors.categoryId = "Category is required";
    if (formData.price <= 0)
      newErrors.price = "Price is required and must be a positive number";
    if (formData.stock < 0)
      newErrors.stock = "Stock is required and must be a non-negative number";
    if (!formData.imageUrl) newErrors.imageUrl = "Image is required";
    if (!formData.sellerId) newErrors.sellerId = "Seller ID is required";
    if (!formData.petType) newErrors.petType = "Pet Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] scrollbar-thin overflow-y-auto">
        <h2 className="text-2xl mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <ProductInputField
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-4"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="toys">Toys</option>
            <option value="clothing">Clothing</option>
            <option value="health & wellness">Health & Wellness</option>
          </select>
          {errors.categoryId && (
            <p className="text-red-500">{errors.categoryId}</p>
          )}

          <ProductInputField
            label="Price"
            type="number"
            placeholder="Enter product price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}

          <ProductInputField
            label="Description"
            type="textarea"
            placeholder="Enter product description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <ProductInputField
            label="Stock"
            type="number"
            placeholder="Enter stock quantity"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
          {errors.stock && <p className="text-red-500">{errors.stock}</p>}

          <label className="block text-gray-700 font-bold mb-2">
            Image Upload
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded w-full py-2 px-3 mb-4"
          />
          {errors.imageUrl && <p className="text-red-500">{errors.imageUrl}</p>}

          <ProductInputField
            label="Brand ID"
            type="number"
            placeholder="Enter brand ID"
            name="brandId"
            value={formData.brandId || ""}
            onChange={handleInputChange}
          />

          <ProductInputField
            label="Seller ID"
            type="number"
            placeholder="Enter seller ID"
            name="sellerId"
            value={formData.sellerId}
            onChange={handleInputChange}
          />
          {errors.sellerId && <p className="text-red-500">{errors.sellerId}</p>}

          <label className="block text-gray-700 font-bold mb-2">Pet Type</label>
          <select
            className="border rounded w-full py-2 px-3 text-gray-700 mb-4"
            name="petType"
            value={formData.petType}
            onChange={handleInputChange}
          >
            <option value="">Select Pet Type</option>
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
          </select>
          {errors.petType && <p className="text-red-500">{errors.petType}</p>}

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
