import { useEffect, useState } from "react";
import UserTable from "../../components/Tables/UserTable";
import { User } from "../../types/user.types";
import useApi from "../../hooks/useApi";

const ManageUsersPage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const [users, setusers] = useState<User[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [error, seterror] = useState<string | null>(null);

  const fetchUsers = async () => {
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      "/admin-panel/getAllUsers"
    );
    if (isError) {
      seterror(error.message || "failed to fetch users");
    } else {
      setusers(response?.data.users || []);
    }
    setloading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>ManageUsers</h1>
      <UserTable users={users} loading={loading} error={error} />
    </div>
  );
};

export default ManageUsersPage;
