import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Tables/ProductTable";
import useApi from "../../hooks/useApi";
import AddProductModal from "./ProductModal"; // Importing the modal
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/Slice/Product.slice";
import { RootState } from "../../Redux/store";
import { Product } from "../../types/Product.types";

const ManageProductPage: React.FC = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
  const products = useSelector((state:RootState)=> state.products.products);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false); 

  const fetchProducts = async () => {
    try {
      const { isError, response, error } = await makeAPICallWithOutData(
        "get",
        "/products/getAllproducts"
      );

      if (isError) {
        setError(error?.message || "Failed to fetch products");
      } else {
        dispatch(setProducts(response?.data.data || []));
        setError(null);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleAddProduct = async (productData: Product) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach(key => {
        const value = productData[key as keyof Product];
        
        // Check if this is the image field and convert it as needed
        if (key === "imageUrl" && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string' || typeof value === 'number') {
          formData.append(key, String(value));
        }
      });
  
      const { isError } = await makeAPICallWithData(
        "post",
        "/products/createproducts",
        formData
      );
  
      if (isError) {
        setError("Failed to add product");
      } else {
        fetchProducts();
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError("An unexpected error occurred while adding the product");
    }
  };
  

  return (
    <>
      <div>Manage Product</div>
      <button onClick={() => setShowModal(true)}>ADD Product</button>
      <ProductTable products={products} loading={loading} error={error} />

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
      />
    </>
  );
};

export default ManageProductPage;
