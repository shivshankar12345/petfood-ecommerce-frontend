import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct,addProduct,deleteProduct } from "../../Redux/Slice/Product.slice";
import { RootState } from '../../Redux/store';
import { Product } from "../../types/Product.types";
import ProductInputField from "../../components/admin/ProductInputField";
 
 
const ManageProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products); // Access products from Redux state
 
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    categoryId: 0,
    price: 0,
    description: "",
    stock: 0,
    imageurl: "",
    petType: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
 
  // Form for Adding/Updating the product List
  const [isModalOpen, setIsModalOpen] = useState(false);
  //To determine the form is edited or it is new
  const [isEditMode, setIsEditMode] = useState(false);
  //Store the id of the product Edited
  const [editProductId, setEditProductId] = useState<number | null>(null);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };
 
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
 
    if (isEditMode && editProductId !== null) {
      dispatch(
        updateProduct({
          ...newProduct,
          updatedAt: now,
        })
      );
    } else {
      dispatch(
        addProduct({
          ...newProduct,
          id: products.length + 1,
          createdAt: now,
          updatedAt: now,
        })
      );
    }
 
    setNewProduct({
      id: 0,
      name: "",
      categoryId: 0,
      price: 0,
      description: "",
      stock: 0,
      imageurl: "",
      petType: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditProductId(null);
  };
 
  const handleEditProduct = (product: Product) => {
    setNewProduct(product);
    setEditProductId(product.id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };
 
  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };
 
  const columns = [
    {
      name: "ID",
      selector: (row: Product) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: "Category ID",
      selector: (row: Product) => row.categoryId,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => `${row.price}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Product) => row.description,
      sortable: false,
    },
    {
      name: "Stock",
      selector: (row: Product) => row.stock,
      sortable: true,
    },
    {
      name: "Image URL",
      selector: (row: Product) => row.imageurl,
      sortable: false,
    },
    {
      name: "Pet Type",
      selector: (row: Product) => row.petType,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: Product) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row: Product) => new Date(row.updatedAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Product) => (
<div className="flex space-x-2">
<button
            onClick={() => handleEditProduct(row)}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
>
            Edit
</button>
<button
            onClick={() => handleDeleteProduct(row.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>
            Delete
</button>
</div>
      ),
    },
  ];
 
  return (
<div className="relative">
<div className={`container mx-auto p-4 ${isModalOpen ? "blur-sm" : ""}`}>
<h1 className="text-center text-2xl font-bold mb-4">Manage Products</h1>
 
        <div className="flex justify-end mb-4">
<button
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300"
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setNewProduct({
                id: 0,
                name: "",
                categoryId: 0,
                price: 0,
                description: "",
                stock: 0,
                imageurl: "",
                petType: "",
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }}
>
            Add Product
</button>
</div>
 
        <DataTable
          title="Product List"
          columns={columns}
          data={products}
          pagination
          highlightOnHover
          pointerOnHover
        />
</div>
 
{isModalOpen && (
<div className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto">
<div className="absolute inset-0 bg-black bg-opacity-50"></div>
<div
      className="relative bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto z-10 
      max-h-screen overflow-y-auto"
>
<h2 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Product" : "Add Product"}
</h2>
<form onSubmit={handleSubmitProduct}>
<ProductInputField
          label="Product Name"
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          required
        />
<ProductInputField
          label="Category ID"
          type="number"
          name="categoryId"
          value={newProduct.categoryId}
          onChange={handleInputChange}
          required
        />
<ProductInputField
          label="Price"
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
<ProductInputField
          label="Description"
          type="textarea"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
<ProductInputField
          label="Stock"
          type="number"
          name="stock"
          value={newProduct.stock}
          onChange={handleInputChange}
          required
        />
<ProductInputField
          label="Image URL"
          type="text"
          name="imageurl"
          value={newProduct.imageurl}
          onChange={handleInputChange}
          required
        />
<ProductInputField
          label="Pet Type"
          type="text"
          name="petType"
          value={newProduct.petType}
          onChange={handleInputChange}
          required
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
            onClick={() => setIsModalOpen(false)}
            className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
>
            Cancel
</button>
</div>
</form>
</div>
</div>
)}
 
    </div>
  );
};
 
export default ManageProductPage;