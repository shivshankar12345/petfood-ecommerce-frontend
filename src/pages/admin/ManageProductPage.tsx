import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Tables/ProductTable";
import useApi from "../../hooks/useApi";
import AddProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setProducts,
  setError,
} from "../../Redux/Slice/Product.slice";
import { RootState } from "../../Redux/store";
import useDebounce from "../../hooks/useDebounce";
import TableLayout from "../../layout/TableLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const debouncedSearch = useDebounce(search, 3000);

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
        toast.success("Product added successfully!");
        fetchProducts();
        setShowModal(false);
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while adding the product");
    }
  };

  // const handleEditProduct = async (formData: FormData, id: string) => {
  //   try {
  //     const { isError } = await makeAPICallWithData(
  //       "put",
  //       `/products/updateproducts/id=${id}`,
  //       formData
  //     );

  //     if (!isError) {
  //       toast.success("Product updated successfully!");
  //       fetchProducts();
  //     } else {
  //       toast.error("Failed to update product");
  //     }
  //   } catch (err) {
  //     toast.error("An unexpected error occurred while updating the product");
  //   }
  // };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { isError } = await makeAPICallWithOutData(
        "delete",
        `/products/delete?id=${id}`
      );

      if (!isError) {
        toast.success("Product deleted successfully!");
        fetchProducts();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while deleting the product");
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
      onPageChange={(page: React.SetStateAction<number>) =>
        setCurrentPage(page)
      }
      error={error ?? undefined}
    >
      <div className="w-full h-full border border-gray-300 overflow-auto p-4">
        {/* Add Product Button */}
        <button
          onClick={() => setShowModal(true)}
          className=" p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        >
          Add Product
        </button>

        {/* Add Product Modal */}

        {/* Product Table */}
        <ProductTable
          products={products}
          loading={loading}
          error={error}
          onDelete={handleDeleteProduct}
        />
      </div>
      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddProduct}
      />
      <ToastContainer />
    </TableLayout>
  );
};

export default ManageProductPage;
