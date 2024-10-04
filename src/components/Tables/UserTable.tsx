import DataTable from "react-data-table-component";
import { User } from "../../types/user.types";

interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
}


export const columns = [
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
  {
    name: "Role",
    selector: (row: User) => row.role,
    sortable: true,
  },
  {
    name: "PAN Number",
    selector: (row: User) => row.pan_num,
    sortable: true,
  },
  {
    name: "Rating",
    selector: (row: User) => row.rating,
    sortable: true,
  },
  {
    name: "GST Number",
    selector: (row: User) => row.gst_num,
    sortable: true,
  },
  {
    name: "Verified",
    selector: (row: User) => (row.is_verfied ? "Yes" : "No"),
    sortable: true,
  },
  {
    name: "Blocked",
    selector: (row: User) => (row.is_Blocked ? "Yes" : "No"),
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row: User) => new Date(row.created_at).toLocaleDateString(),
    sortable: true,
  },
  {
    name: "Updated At",
    selector: (row: User) => new Date(row.updated_at).toLocaleDateString(),
    sortable: true,
  },
];

const UserTable: React.FC<UserTableProps> = ({ users, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DataTable
      columns={columns}
      data={users}
      pagination
      highlightOnHover
      striped
    />
  );
};

export default UserTable;
