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
import useDebounce from "../../hooks/useDebounce";

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

  const debouncedSearch = useDebounce(searchTerm, 1000)

  // Fetch sellers with pagination
  const fetchSellers = async (
    status: string,
    debouncedSearch: string = "",
    limit = 10,
    page_num = 1
  ) => {
    dispatch(setLoading(true));

    let endpoint = "";
    if (status === "verified") {
      endpoint = `/admin-panel/getVerifiedSeller?status=verified&search=${debouncedSearch}&limit=${limit}&page_num=${page_num}`;
    } else if (status === "pending") {
      endpoint = `/admin-panel/getPendingSeller?search=${debouncedSearch}&limit=${limit}&page_num=${page_num}`;
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

  // useEffect(() => {
  //   setCurrentPage(1);
  //   fetchSellers(selectedStatus, searchTerm, limit, 1);
  // }, [selectedStatus, searchTerm]);
 
  // useEffect(() => {
  //   fetchSellers(selectedStatus, searchTerm, limit, currentPage);
  // }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchSellers(selectedStatus, debouncedSearch, limit, 1);
  }, [selectedStatus, debouncedSearch]);
 
  useEffect(() => {
    fetchSellers(selectedStatus, debouncedSearch, limit, currentPage);
  }, [currentPage]);

  const handleSellerChange = () => {
    fetchSellers(selectedStatus, debouncedSearch, limit, currentPage);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Sellers</h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <SearchBar
          searchTerm={debouncedSearch}
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
