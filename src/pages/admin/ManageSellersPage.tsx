import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import SellerTable from "../../components/Tables/SellerTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  setSellers,
  setError,
  setLoading,
} from "../../Redux/Slice/seller.slice";
import {
  SearchBar,
  StatusDropdown,
} from "../../components/admin/SearhBarDropdown";
import { PaginationControls } from "../../components/admin/Pagination";

const ManageSellerPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // Redux state for sellers
  const { sellers, loading, error } = useSelector(
    (state: RootState) => state.seller
  );

  // Component states for search and filter
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("verified"); // Default to 'verified'

  // Fetch sellers with pagination
  const fetchSellers = async (
    status: string,
    search: string = "",
    limit = 10,
    page_num = 1
  ) => {
    dispatch(setLoading(true));

    let endpoint = "";
    if (status === "verified") {
      endpoint = `/admin-panel/getVerifiedSeller?status=verified&search=${search}&limit=${limit}&page_num=${page_num}`;
    } else if (status === "pending") {
      endpoint = `/admin-panel/getPendingSeller?search=${search}&limit=${limit}&page_num=${page_num}`;
    }

    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      endpoint
    );

    if (isError) {
      dispatch(setError(error.message || "Failed to fetch sellers"));
    } else {
      const sellersData =
        status === "verified"
          ? response?.data?.verified_sellers
          : response?.data?.pending_sellers;

      console.log(sellersData);
      dispatch(setSellers(sellersData || []));
      setTotalPages(response?.data?.total_pages || 1); // Set total pages
      setCurrentPage(response?.data?.current_page || 1); // Set current page
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchSellers(selectedStatus, searchTerm, limit, currentPage);
  }, [selectedStatus, searchTerm, currentPage, limit]); // Added limit to dependency array

  const handleSellerChange = () => {
    fetchSellers(selectedStatus, searchTerm, limit, currentPage);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Sellers</h1>
      {/* flex justify-end items-center mb-4 space-x-4 */}
      {/* Search bar and dropdown layout */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          placeholder={"Search seller..."}
          type={"text"}
        />
        <StatusDropdown
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      {/* Seller Table */}
      <SellerTable
        seller={sellers}
        loading={loading}
        error={error}
        onSellerChange={handleSellerChange}
        selected={selectedStatus}
      />

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => {
          if (page > 0 && page <= totalPages) {
            // Ensure the page number is valid
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default ManageSellerPage;
