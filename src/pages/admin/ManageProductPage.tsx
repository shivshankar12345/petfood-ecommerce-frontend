// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateProduct,
//   addProduct,
//   deleteProduct,
//   setProducts,
// } from "../../Redux/Slice/Product.slice";
// import { RootState } from "../../Redux/store";
// import { Product, ProductImage } from "../../types/Product.types";
// import ProductInputField from "../../components/admin/ProductInputField";
// import { SubmitHandler, useForm } from "react-hook-form";
// import useAPIs from "../../hooks/useApi";

// const ManageProductPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state: RootState) => state.products.products);
//   const { makeAPICallWithData, makeAPICallWithOutData } = useAPIs();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//     watch,
//   } = useForm<Product & ProductImage>({
//     defaultValues: {
//       id: 0,
//       name: "",
//       categoryId: 0,
//       price: 0,
//       description: "",
//       stock: 0,
//       petType: "",
//       sellerId: 0,
//       brandId: "",
//       createdAt: "",
//       updatedAt: "",
//     },
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editProductId, setEditProductId] = useState<number | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const fetchProducts = async () => {
//     const { isError, response } = await makeAPICallWithOutData(
//       "get",
//       "/products/getAllproducts"
//     );
//     if (!isError && response?.data) {
//       setProducts(response.data);
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, []);
 
//   const onSubmit: SubmitHandler<Product & ProductImage> = data => {
//     console.log(data);
//     const imageUrl = URL.createObjectURL(data.imageUrl);
//     if (isEditMode && editProductId !== null) {
//       dispatch(
//         updateProduct({
//           ...data,
//           updatedAt: new Date().toLocaleDateString(),
//           imageUrl: imageUrl,
//         })
//       );
//     } else {
//       dispatch(
//         addProduct({
//           ...data,
//           id: products.length + 1,
//           createdAt: new Date().toLocaleDateString(),
//           updatedAt: new Date().toLocaleDateString(),
//           imageUrl: imageUrl,
//         })
//       );
//     }
//     reset();
//     setImagePreview(null);
//     setIsModalOpen(false);
//     setIsEditMode(false);
//     setEditProductId(null);
//   };

//   const handleEditProduct = (product: Product) => {
//     // Object.keys(product).forEach((key) => {
//     //   setValue(key as keyof Product, product[key as keyof Product]);
//     // });
//     // setImagePreview(product.imageurl);
//     // setEditProductId(product.id);
//     // setIsEditMode(true);
//     // setIsModalOpen(true);
//   };

//   const handleDeleteProduct = (id: number) => {
//     dispatch(deleteProduct(id));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("imageUrl", file);
//       const url = URL.createObjectURL(file);
//       // const reader = new FileReader();
//       // reader.onload = () => {
//       //   setImagePreview(reader.result as string);
//       // };
//       // reader.readAsDataURL(file);
//       setImagePreview(url);
//     }
//   };
//   console.log(watch());
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
//       selector: (row: Product) => `${row.price}`,
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
//       name: "Image",
//       cell: (row: Product) => (
//         <img
//           src={""}
//           alt={row.name}
//           className="w-16 h-16 object-cover rounded"
//         />
//       ),
//       sortable: false,
//     },
//     {
//       name: "brandId",
//       selector: (row: Product) => row.brandId,
//       sortable: false,
//     },
//     {
//       name: "sellerId",
//       selector: (row: Product) => row.sellerId,
//       sortable: false,
//     },
//     {
//       name: "Pet Type",
//       selector: (row: Product) => row.petType,
//       sortable: true,
//     },
//     {
//       name: "Created At",
//       cell: (row: Product) => (
//         <div>{new Date(row.createdAt).toLocaleString()}</div>
//       ),
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
//         <div className="flex space-x-2">
//           <button
//             onClick={() => handleEditProduct(row)}
//             className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 min-w-[80px]"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDeleteProduct(row.id)}
//             className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 min-w-[80px]"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="relative">
//       <div className={`container mx-auto p-4 ${isModalOpen ? "blur-sm" : ""}`}>
//         <h1 className="text-center text-2xl font-bold mb-4">Manage Products</h1>

//         <div className="flex justify-end mb-4">
//           <button
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300"
//             onClick={() => {
//               setIsModalOpen(true);
//               setIsEditMode(false);
//               reset();
//               setImagePreview(null);
//             }}
//           >
//             Add Product
//           </button>
//         </div>

//         <DataTable
//           title="Product List"
//           columns={columns}
//           data={products}
//           pagination
//           highlightOnHover
//           pointerOnHover
//         />
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center z-50 overflow-y-auto">
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//           <div
//             className="relative bg-white p-6 rounded shadow-lg w-full max-w-lg mx-auto z-10 
//       max-h-screen overflow-y-auto"
//           >
//             <h2 className="text-xl font-bold mb-4">
//               {isEditMode ? "Edit Product" : "Add Product"}
//             </h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <ProductInputField
//                 label="Product Name"
//                 type="text"
//                 name="name"
//                 register={register}
//                 error={errors.name}
//                 required
//               />
//               <ProductInputField
//                 label="Category ID"
//                 type="number"
//                 name="categoryId"
//                 register={register}
//                 error={errors.categoryId}
//                 required
//               />
//               <ProductInputField
//                 label="Price"
//                 type="number"
//                 name="price"
//                 register={register}
//                 error={errors.price}
//                 required
//               />
//               <ProductInputField
//                 label="Description"
//                 type="textarea"
//                 name="description"
//                 register={register}
//                 error={errors.description}
//                 required
//               />
//               <ProductInputField
//                 label="Stock"
//                 type="number"
//                 name="stock"
//                 register={register}
//                 error={errors.stock}
//                 required
//               />
//               <ProductInputField
//                 label="Brand ID"
//                 type="text"
//                 name="brandId"
//                 register={register}
//                 error={errors.petType}
//                 required
//               />
//               <ProductInputField
//                 label="Seller ID"
//                 type="number"
//                 name="sellerId"
//                 register={register}
//                 error={errors.petType}
//                 required
//               />
//               <ProductInputField
//                 label="Pet Type"
//                 type="text"
//                 name="petType"
//                 register={register}
//                 error={errors.petType}
//                 required
//                   />
//               <ProductInputField
//                 label="Image Upload"
//                 type="file"
//                 name="imageUrl"
//                 register={register}
//                 error={errors.imageUrl}
//                 onChange={handleImageChange} // Pass the onChange handler
//                 accept="image/*" // Pass the accept prop
//                 imagePreview={imagePreview} // Pass the imagePreview state
//               />

//               {/* <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">Image Upload</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   {...register("imageurl")}
//                   onChange={handleImageChange}
//                   className="mt-1 block w-full"
//                 />
//                 {imagePreview && (
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="mt-2 w-32 h-32 object-cover rounded"
//                   />
//                 )}
//               </div> */}

//               <div className="flex justify-end mt-4">
//                 <button
//                   type="submit"
//                   className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300"
//                 >
//                   {isEditMode ? "Update Product" : "Add Product"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
//                 >
//                   Cancel
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
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  addProduct,
  deleteProduct,
  setProducts,
} from "../../Redux/Slice/Product.slice";
import { RootState } from "../../Redux/store";
import { Product } from "../../types/Product.types";
import ProductInputField from "../../components/admin/ProductInputField";
import { SubmitHandler, useForm } from "react-hook-form";
import useAPIs from "../../hooks/useApi";

const ManageProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  //const { makeAPICallWithData, makeAPICallWithOutData } = useAPIs();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<Product>({
    defaultValues: {
      id: 0,
      name: "",
      categoryId: 0,
      price: 0,
      description: "",
      stock: 0,
      petType: "",
      sellerId: 0,
      brandId: "",
      createdAt: "",
      updatedAt: "",
      imageUrl:"",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const onSubmit: SubmitHandler<Product> = data => {
    // console.log(data);
    // const imageUrl = URL.createObjectURL(data.imageUrl);
    if (isEditMode && editProductId !== null) {
      dispatch(
        updateProduct({
          ...data,
          updatedAt: new Date().toLocaleDateString(),
          imageUrl: imagePreview ||data.imageUrl,
        })
      );
    } else {
      dispatch(
        addProduct({
          ...data,
          id: products.length + 1,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: new Date().toLocaleDateString(),
          imageUrl: imagePreview ||data.imageUrl,
        })
      );
    }
    reset();
    setImagePreview(null);
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditProductId(null);
  };

  const handleEditProduct = (product: Product) => {
    // Object.keys(product).forEach((key) => {
    //   setValue(key as keyof Product, product[key as keyof Product]);
    // });
    // setImagePreview(product.imageurl);
    // setEditProductId(product.id);
    // setIsEditMode(true);
    // setIsModalOpen(true);
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
    //const file = (e.target as HTMLInputElement).files?.[0]; 
    if (file) {
      // setValue("imageUrl", file);
      // const url = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      //setImagePreview(url);
    }
  };
  console.log(watch());
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
      name: "Image",
      cell: (row: Product) => (
        // <img
        //   src={""}
        //   alt={row.name}
        //   className="w-16 h-16 object-cover rounded"
        // />
        <img src={row.imageUrl} alt={row.name} className="w-16 h-16 object-cover rounded" />
      ),
      sortable: false,
    },
    {
      name: "brandId",
      selector: (row: Product) => row.brandId,
      sortable: false,
    },
    {
      name: "sellerId",
      selector: (row: Product) => row.sellerId,
      sortable: false,
    },
    {
      name: "Pet Type",
      selector: (row: Product) => row.petType,
      sortable: true,
    },
    {
      name: "Created At",
      cell: (row: Product) => (
        <div>{new Date(row.createdAt).toLocaleString()}</div>
      ),
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
            className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 min-w-[80px]"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteProduct(row.id)}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 min-w-[80px]"
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
              reset();
              setImagePreview(null);
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <ProductInputField
                label="Product Name"
                type="text"
                name="name"
                register={register}
                error={errors.name}
                required
              />
              <ProductInputField
                label="Category ID"
                type="number"
                name="categoryId"
                register={register}
                error={errors.categoryId}
                required
              />
              <ProductInputField
                label="Price"
                type="number"
                name="price"
                register={register}
                error={errors.price}
                required
              />
              <ProductInputField
                label="Description"
                type="textarea"
                name="description"
                register={register}
                error={errors.description}
                required
              />
              <ProductInputField
                label="Stock"
                type="number"
                name="stock"
                register={register}
                error={errors.stock}
                required
              />
              <ProductInputField
                label="Brand ID"
                type="text"
                name="brandId"
                register={register}
                error={errors.petType}
                required
              />
              <ProductInputField
                label="Seller ID"
                type="number"
                name="sellerId"
                register={register}
                error={errors.petType}
                required
              />
              <ProductInputField
                label="Pet Type"
                type="text"
                name="petType"
                register={register}
                error={errors.petType}
                required
                  />
              <ProductInputField
                label="Image Upload"
                type="file"
                name="imageUrl"
                register={register}
                error={errors.imageUrl}
                onChange={handleImageChange} // Pass the onChange handler
                accept="image/*" // Pass the accept prop
                imagePreview={imagePreview} // Pass the imagePreview state
              />

              {/* <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("imageurl")}
                  onChange={handleImageChange}
                  className="mt-1 block w-full"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div> */}

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