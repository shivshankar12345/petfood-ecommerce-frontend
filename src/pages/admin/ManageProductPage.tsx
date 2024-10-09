import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Tables/ProductTable";
import useApi from "../../hooks/useApi";
import AddProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProducts, setError } from "../../Redux/Slice/Product.slice";
import { RootState } from "../../Redux/store";
import { Product } from "../../types/Product.types";
import { PaginationControls } from "../../components/PaginationControls";
import useDebounce from "../../hooks/useDebounce"; // Import your debounce hook

const ManageProductPage: React.FC = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Use the debounced search term
  const debouncedSearch = useDebounce(search, 3000); // 300 ms delay

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const { isError, response, error } = await makeAPICallWithOutData(
        "get",
        `/products/getAllproducts?page=${currentPage}&limit=5&search=${(debouncedSearch)}`
      );

      if (isError) {
        dispatch(setError(error?.message || "Failed to fetch products"));
      } else {
        const { data, pagination } = response?.data || {};
        dispatch(setProducts(data || []));
        setTotalPages(pagination?.totalPages || 0);
        dispatch(setError(null));
      }
    } catch (err) {
      dispatch(setError("An unexpected error occurred"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Trigger fetchProducts only when currentPage or debouncedSearch changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, debouncedSearch]); // Updated to include debounced search

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Update search state
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleAddProduct = async (productData: Product) => {
    try {
      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        const value = productData[key as keyof Product];
        if (key === "imageUrl" && value instanceof File) {
          console.log("Appending image:", value); // Debugging line
          formData.append(key, value);
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value));
        }
      });
  
      // Log the FormData content for debugging
      formData.forEach((value, key) => {
        console.log(key, value);
      });
  
      const { isError } = await makeAPICallWithData("post", "/products/createproducts", formData);
  
      if (!isError) {
        fetchProducts(); // Refresh the product list
        setShowModal(false);
      } else {
        dispatch(setError("Failed to add product"));
      }
    } catch (err) {
      dispatch(setError("An unexpected error occurred while adding the product"));
    }
  };
  

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Manage Product</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          ADD Product
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch} // Call handleSearch on change
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <ProductTable products={products} loading={loading} error={error} search={debouncedSearch} /> {/* Pass debouncedSearch */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ManageProductPage;
