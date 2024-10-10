import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import UserTable from "../../components/Tables/UserTable";
import useApi from "../../hooks/useApi";
import { setUsers, setLoading, setError } from "../../Redux/Slice/user.slice";
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
      endpoint = `/admin-panel/getAllUsers?search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    if (status === "active") {
      endpoint = `/admin-panel/getActiveUsers?search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    if (status === "inactive") {
      endpoint = `/admin-panel/getInactiveUsers?search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      endpoint
    );

    if (isError) {
      dispatch(setError(error.message || "Failed to fetch users"));
    } else {
      console.log(response?.data?.users);
      dispatch(setUsers(response?.data?.users || []));
      setTotalPages(response?.data?.total_pages || 1);
      setCurrentPage(response?.data?.current_page || 1);
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchUsers(selectedStatus, searchTerm, limit, 1);
  }, [selectedStatus, searchTerm]);

  useEffect(() => {
    fetchUsers(selectedStatus, searchTerm, limit, currentPage);
  }, [currentPage]);
  const handleUserChange = () => {
    fetchUsers(selectedStatus, searchTerm, limit, currentPage);
  };
  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Users</h1>
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
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
};

export default ManageUsersPage;
