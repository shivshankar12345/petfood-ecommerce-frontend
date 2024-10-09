import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store"; // Assuming you have RootState defined in your Redux setup
import UserTable from "../../components/Tables/UserTable";
import useApi from "../../hooks/useApi";
import { setUsers, setLoading, setError } from "../../Redux/Slice/user.slice"; // Import your user slice actions
import {
  SearchBar,
  StatusDropdown,
} from "../../components/admin/SearhBarDropdown";
import { PaginationControls } from "../../components/admin/Pagination";

const ManageUsersPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all"); // Default to 'verified'

  const fetchUsers = async (
    status: string,
    search: string = "",
    limit = 10,
    page_num = 1
  ) => {
    dispatch(setLoading(true));

    let endpoint = "";

    if (status === "all") {
      endpoint = `/admin-panel/getAllUsers?status=${status}&search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    if (status === "active") {
      endpoint = `/admin-panel/getActiveUsers?status=${status}&search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    if (status === "inactive") {
      endpoint = `/admin-panel/getInactiveUsers?status=${status}&search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      endpoint
    );

    if (isError) {
      dispatch(setError(error.message || "Failed to fetch users"));
    } else {
      dispatch(setUsers(response?.data?.users || []));
      setTotalPages(response?.data?.total_pages || 1);
      setCurrentPage(response?.data?.current_page || 1);
    }

    dispatch(setLoading(false));
    // dispatch(setLoading(true));

    // // API call
    // const { isError, response, error } = await makeAPICallWithOutData(
    //   "get",
    //   "/admin-panel/getAllUsers"
    // );

    // if (isError) {
    //   dispatch(setError(error.message || "Failed to fetch users"));
    // } else {
    //   dispatch(setUsers(response?.data?.users || []));
    // }

    // dispatch(setLoading(false));
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    fetchUsers(selectedStatus, searchTerm, limit, currentPage);
  }, [selectedStatus, searchTerm, currentPage, limit]);

  const handleUserChange = () => {
    fetchUsers(selectedStatus, searchTerm, limit, currentPage);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Users</h1>
      {/* flex justify-end items-center mb-4 space-x-4 */}
      {/* Search bar and dropdown layout */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <SearchBar
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          placeholder={"Search users..."}
          type={"text"}
        />
        <StatusDropdown
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      <UserTable
        users={users}
        loading={loading}
        error={error}
        selected={selectedStatus}
        onUserChange={handleUserChange}
      />

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

export default ManageUsersPage;
