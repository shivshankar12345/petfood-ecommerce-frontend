import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import UserTable from "../../components/Tables/UserTable";
import useApi from "../../hooks/useApi";
import { setUsers, setError } from "../../Redux/Slice/user.slice";
import { StatusDropdown } from "../../components/admin/SearhBarDropdown";
import TableLayout from "../../layout/TableLayout";
import { useLoaderService } from "../../hooks/useLoader";
import { toast } from "react-toastify";

const ManageUsersPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { startLoader, stopLoader } = useLoaderService();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(10);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all"); // Default to 'all'

  const fetchUsers = async (
    status: string,
    search: string = "",
    limit = 10,
    page_num = 1
  ) => {
    startLoader();

    let endpoint = `/users/getAllUsers?status=${status}&search=${search}&limit=${limit}&page_num=${page_num}`;

    if (status === "all") {
      endpoint = `/users/getAllUsers?search=${search}&limit=${limit}&page_num=${page_num}`;
    }
    if (status === "active") {
      endpoint = `/users/getUsersByStatus?search=${search}&limit=${limit}&page_num=${page_num}&status=true`;
    }
    if (status === "inactive") {
      endpoint = `/users/getUsersByStatus?search=${search}&limit=${limit}&page_num=${page_num}&status=false`;
    }
    if (status === "delete") {
      endpoint = `/users/getDeletedUser?status=${status}&search=${search}&limit=${limit}&page_num=${page_num}`;
    }

    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      endpoint,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (isError) {
      dispatch(setError(error.message || "Failed to fetch users"));
      toast.error("Something went wrong");
    } else {
      dispatch(setUsers(response?.data?.users || []));
      setTotalPages(response?.data?.total_pages || 1);
      setCurrentPage(response?.data?.current_page || 1);
    }
    stopLoader();
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchUsers(selectedStatus, searchTerm, limit, 1);
  }, [selectedStatus, searchTerm]);

  useEffect(() => {
    fetchUsers(selectedStatus, searchTerm, limit, currentPage);
  }, [currentPage]);

  return (
    <>
      <TableLayout
        title="Manage Users"
        searchPlaceholder="Search users..."
        searchValue={searchTerm}
        onSearchChange={e => setSearchTerm(e.target.value)}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={page => setCurrentPage(page)}
        error={error || undefined}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <StatusDropdown
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />
        </div>

        <UserTable
          users={users}
          loading={loading}
          error={error}
          onUserChange={() =>
            fetchUsers(selectedStatus, searchTerm, limit, currentPage)
          }
          selectedStatus={selectedStatus}
        />
      </TableLayout>
    </>
  );
};

export default ManageUsersPage;
