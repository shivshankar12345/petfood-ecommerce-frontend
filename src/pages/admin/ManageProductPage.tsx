import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Tables/ProductTable";
import useApi from "../../hooks/useApi";
import { Product } from "../../types/Product.types";

const ManageProductPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from API
  const fetchProducts = async () => {
    const { isError, response } = await makeAPICallWithOutData(
      "get",
      "/products/getAllproducts"
    );

    console.log("Is Error:", isError);
    console.log("Response:", response); // Log the entire response object

    // Check if the response is as expected
    if (!isError && response?.data) {
      // Log the structure of the response data
      console.log("Fetched Data:", response.data);

      // Attempt to access the products based on common structures
      if (Array.isArray(response.data)) {
        setProducts(response.data); // If products are directly in data
      } else if (response.data.products) {
        setProducts(response.data.products); // If products are nested inside data
      } else if (response.data.data) {
        setProducts(response.data.data); // Check for another common structure
      } else {
        console.error("Products not found in the response data");
      }
    } else {
      console.error("Failed to fetch products", response);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>Manage Product</div>
      
      <ProductTable products={products} loading={false} error={null} />
    </>
  );
};

export default ManageProductPage;
