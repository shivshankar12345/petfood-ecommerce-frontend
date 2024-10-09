import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store"; // Assuming you have RootState defined in your Redux setup
import UserTable from "../../components/Tables/UserTable";
import useApi from "../../hooks/useApi";
import { setUsers, setLoading, setError } from "../../Redux/Slice/user.slice"; // Import your user slice actions
import { SearchBar, SellerStatusDropdown } from "../../components/admin/SearhBarDropdown";

const ManageUsersPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("active"); // Default to 'verified'

  const fetchUsers = async () => {
    dispatch(setLoading(true));

    // API call
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      "/admin-panel/getAllUsers"
    );

    if (isError) {
      dispatch(setError(error.message || "Failed to fetch users"));
    } else {
      dispatch(setUsers(response?.data?.users || []));
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Manage Users</h1>
      
      <div className="flex justify-end items-center mb-4 space-x-4">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} placeholder={"Search user..."} type={"text"} />
        <SellerStatusDropdown
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      </div>

      <UserTable users={users} loading={loading} error={error} />
    </div>
  );
};

export default ManageUsersPage;
