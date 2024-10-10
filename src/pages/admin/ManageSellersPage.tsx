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
import TableLayout from "../../layout/TableLayout";
import {
  StatusDropdown,
} from "../../components/admin/SearhBarDropdown";
import useDebounce from "../../hooks/useDebounce";

const ManageSellerPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("verified"); // Default to 'verified'

  const debouncedSearch = useDebounce(searchTerm, 1000);

  const { sellers, loading, error } = useSelector(
    (state: RootState) => state.seller
  );

  const fetchSellers = async (
    status: string,
    search: string = "",
    limit = 10,
    page_num = 1
  ) => {
    dispatch(setLoading(true));
    let endpoint = status === "verified"
      ? `/admin-panel/getVerifiedSeller?status=verified&search=${search}&limit=${limit}&page_num=${page_num}`
      : `/admin-panel/getPendingSeller?search=${search}&limit=${limit}&page_num=${page_num}`;

    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      endpoint
    );

    if (isError) {
      dispatch(setError(error.message || "Failed to fetch sellers"));
    } else {
      const sellersData = status === "verified"
        ? response?.data?.verified_sellers
        : response?.data?.pending_sellers;

      dispatch(setSellers(sellersData || []));
      setTotalPages(response?.data?.total_pages || 1);
      setCurrentPage(response?.data?.current_page || 1);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchSellers(selectedStatus, debouncedSearch, limit, 1);
  }, [selectedStatus, debouncedSearch]);

  useEffect(() => {
    fetchSellers(selectedStatus, debouncedSearch, limit, currentPage);
  }, [currentPage]);

  return (
    <TableLayout
      title="Manage Sellers"
      searchPlaceholder="Search seller..."
      searchValue={debouncedSearch}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
      error={error || undefined}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <StatusDropdown
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      <SellerTable
        seller={sellers}
        loading={loading}
        error={error}
        onSellerChange={() => fetchSellers(selectedStatus, debouncedSearch, limit, currentPage)}
        selected={selectedStatus}
      />

    </TableLayout>
  );
};

export default ManageSellerPage;
