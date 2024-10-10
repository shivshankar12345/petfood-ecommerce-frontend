import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Tables/ProductTable";
import useApi from "../../hooks/useApi";
import AddProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setProducts, setError } from "../../Redux/Slice/Product.slice";
import { RootState } from "../../Redux/store";
import useDebounce from "../../hooks/useDebounce";
import TableLayout from "../../layout/TableLayout";
import { FaPlus } from "react-icons/fa"; // Importing icons

const ManageProductPage: React.FC = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const debouncedSearch = useDebounce(search, 300);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const { isError, response, error } = await makeAPICallWithOutData(
        "get",
        `/products/getAllproducts?page=${currentPage}&limit=5&search=${debouncedSearch}`
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

  useEffect(() => {
    fetchProducts();
  }, [currentPage, debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleAddProduct = async (formData: FormData) => {
    try {
      const { isError } = await makeAPICallWithData(
        "post",
        "/products/createproducts",
        formData
      );

      if (!isError) {
        fetchProducts();
        setShowModal(false);
      } else {
        dispatch(setError("Failed to add product"));
      }
    } catch (err) {
      dispatch(
        setError("An unexpected error occurred while adding the product")
      );
    }
  };

  return (
    <TableLayout
      title="Manage Product"
      searchPlaceholder="Search products..."
      searchValue={search}
      onSearchChange={handleSearch}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
      error={error ?? undefined} 
    >
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-4"
      >
        <FaPlus className="mr-2" />
        Add Product
      </button>

      <ProductTable products={products} loading={loading} error={error} search={debouncedSearch} />

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
      />
    </TableLayout>
  );
};

export default ManageProductPage;
