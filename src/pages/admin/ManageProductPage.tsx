// import React from "react"

// const ManageProductPage: React.FC = () => {
//   return (
//     <>
//         <div className="text-center">Manage Product</div>
//     </>
//   )
// }

// export default ManageProductPage

// import React, { useState } from "react";
// import DataTable from "react-data-table-component";

// // Define the structure of a product with all the required fields
// interface Product {
//   id: number;
//   name: string;
//   categoryId: number;
//   price: number;
//   description: string;
//   stock: number;
//   imageurl: string;
//   petType: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ManageProductPage: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]); // State to store the list of products
//   const [newProduct, setNewProduct] = useState<Product>({
//     id: 0,
//     name: "",
//     categoryId: 0,
//     price: 0,
//     description: "",
//     stock: 0,
//     imageurl: "",
//     petType: "",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
//   const [isEditMode, setIsEditMode] = useState(false); // State to track if we are in edit mode
//   const [editProductId, setEditProductId] = useState<number | null>(null); // Product ID for editing

//   // Handle input changes for product form
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewProduct({
//       ...newProduct,
//       [name]: value,
//     });
//   };

//   // Add or update product in the product list
//   const handleSubmitProduct = (e: React.FormEvent) => {
//     e.preventDefault();
//     const now = new Date();

//     if (isEditMode && editProductId !== null) {
//       // Update the product in the list
//       setProducts(
//         products.map((product) =>
//           product.id === editProductId
//             ? { ...newProduct, updatedAt: now }
//             : product
//         )
//       );
//     } else {
//       // Add a new product
//       setProducts([
//         ...products,
//         {
//           ...newProduct,
//           id: products.length + 1,
//           createdAt: now,
//           updatedAt: now,
//         },
//       ]);
//     }

//     // Reset the form and close the modal
//     setNewProduct({
//       id: 0,
//       name: "",
//       categoryId: 0,
//       price: 0,
//       description: "",
//       stock: 0,
//       imageurl: "",
//       petType: "",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//     setIsModalOpen(false);
//     setIsEditMode(false); // Reset edit mode
//     setEditProductId(null);
//   };

//   // Open modal for editing a product
//   const handleEditProduct = (product: Product) => {
//     setNewProduct(product); // Pre-fill the form with selected product data
//     setEditProductId(product.id); // Track the product being edited
//     setIsEditMode(true); // Set edit mode to true
//     setIsModalOpen(true); // Open the modal
//   };

//   // Columns definition for react-data-table-component
//   const columns = [
//     {
//       name: "ID",
//       selector: (row: Product) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row: Product) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Category ID",
//       selector: (row: Product) => row.categoryId,
//       sortable: true,
//     },
//     {
//       name: "Price",
//       selector: (row: Product) => `$${row.price}`,
//       sortable: true,
//     },
//     {
//       name: "Description",
//       selector: (row: Product) => row.description,
//       sortable: false,
//     },
//     {
//       name: "Stock",
//       selector: (row: Product) => row.stock,
//       sortable: true,
//     },
//     {
//       name: "Image URL",
//       selector: (row: Product) => row.imageurl,
//       sortable: false,
//     },
//     {
//       name: "Pet Type",
//       selector: (row: Product) => row.petType,
//       sortable: true,
//     },
//     {
//       name: "Created At",
//       selector: (row: Product) => new Date(row.createdAt).toLocaleString(),
//       sortable: true,
//     },
//     {
//       name: "Updated At",
//       selector: (row: Product) => new Date(row.updatedAt).toLocaleString(),
//       sortable: true,
//     },
//     {
//       name: "Actions",
//       cell: (row: Product) => (
//         <button
//           onClick={() => handleEditProduct(row)}
//           className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//         >
//           Edit
//         </button>
//       ),
//     },
//   ];

//   return (
//     <div className="relative">
//       {/* Main content that gets blurred when the modal is open */}
//       <div className={`container mx-auto p-4 ${isModalOpen ? "blur-sm" : ""}`}>
//         <h1 className="text-center text-2xl font-bold mb-4">Manage Products</h1>

//         {/* Button to show the Add Product modal */}
//         <div className="flex justify-end mb-4">
//           <button
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300"
//             onClick={() => {
//               setIsModalOpen(true);
//               setIsEditMode(false); // Set to add mode
//               setNewProduct({
//                 id: 0,
//                 name: "",
//                 categoryId: 0,
//                 price: 0,
//                 description: "",
//                 stock: 0,
//                 imageurl: "",
//                 petType: "",
//                 createdAt: new Date(),
//                 updatedAt: new Date(),
//               }); // Clear the form
//             }}
//           >
//             Add Product
//           </button>
//         </div>

//         {/* DataTable to show the list of products */}
//         <DataTable
//           title="Product List"
//           columns={columns}
//           data={products}
//           pagination
//           highlightOnHover
//           pointerOnHover
//         />
//       </div>

//       {/* Modal for Add or Edit Product Form */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center z-50">
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//           <div className="relative bg-white p-6 rounded shadow-lg w-1/3 z-10">
//             <h2 className="text-xl font-bold mb-4">
//               {isEditMode ? "Edit Product" : "Add Product"}
//             </h2>
//             <form onSubmit={handleSubmitProduct}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Product Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={newProduct.name}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter product name"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Category ID</label>
//                 <input
//                   type="number"
//                   name="categoryId"
//                   value={newProduct.categoryId}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter category ID"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={newProduct.price}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter product price"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Description</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={newProduct.description}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter product description"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Stock</label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={newProduct.stock}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter product stock"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Image URL</label>
//                 <input
//                   type="text"
//                   name="imageurl"
//                   value={newProduct.imageurl}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter image URL"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2">Pet Type</label>
//                 <input
//                   type="text"
//                   name="petType"
//                   value={newProduct.petType}
//                   onChange={handleInputChange}
//                   className="p-2 border rounded w-full"
//                   placeholder="Enter pet type"
//                   required
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-indigo-500 text-white px-4 py-2 rounded"
//                 >
//                   {isEditMode ? "Update Product" : "Add Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageProductPage;

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
      // name: "Actions",
      // cell: (row: Product) => (
      //   <button
      //     onClick={() => handleEditProduct(row)}
      //     className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      //   >
      //     Edit
      //   </button>
      // ),
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
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white p-6 rounded shadow-lg w-1/3 z-10">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmitProduct}>
              {/* <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category ID</label>
                <input
                  type="number"
                  name="categoryId"
                  value={newProduct.categoryId}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  name="imageurl"
                  value={newProduct.imageurl}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Pet Type</label>
                <input
                  type="text"
                  name="petType"
                  value={newProduct.petType}
                  onChange={handleInputChange}
                  required
                  className="border border-gray-300 rounded w-full px-3 py-2"
                />
              </div> */}
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

              <div className="flex justify-end">
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

