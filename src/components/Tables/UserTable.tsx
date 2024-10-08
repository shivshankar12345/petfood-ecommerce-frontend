import DataTable from "react-data-table-component";
import { User, UserTableProps } from "../../types/user.types";

const UserTable: React.FC<UserTableProps> = ({ users, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const columns = [
    {
      name: "ID",
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: User) => row.phone,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: User) => row.gender,
      sortable: true,
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={Array.isArray(users) ? users : []}
      pagination
      highlightOnHover
      striped
      persistTableHead
    />
  );
};

export default UserTable;
