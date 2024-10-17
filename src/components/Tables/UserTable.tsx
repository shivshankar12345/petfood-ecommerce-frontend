import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { User, UserTableProps } from "../../types/user.types";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { setError, setLoading } from "../../Redux/Slice/user.slice";
import ActionButtons from "../admin/ActionButtons";
import EditUserModal from "../../pages/admin/UserModal";

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  error,
  onUserChange,
}) => {
  const { makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
 
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to hold the selected user
 


  const confirmActivation = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to activate this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then(result => {
      if (result.isConfirmed) {
        handleActivate(id);
      }
    });
  };

  const confirmDeactivation = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to deactivate this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
    }).then(result => {
      if (result.isConfirmed) {
        handleDeactivate(id);
      }
    });
  };

  const handleActivate = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const result = await makeAPICallWithData(
        "patch",
        "/admin-panel/modifyUser",
        { id, is_active: true }
      );
      if (!result.isError) {
        toast.success(`User Activated`);
        onUserChange();
      } else {
        throw new Error(result.error?.message || "Failed to activate user");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to activate user");
      dispatch(setError(err.message || "Failed to activate user"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeactivate = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const result = await makeAPICallWithData(
        "patch",
        "/admin-panel/modifyUser",
        { id, is_active: false }
      );
      if (!result.isError) {
        toast.success(`User Deactivated`);
        onUserChange();
      } else {
        throw new Error(result.error?.message || "Failed to deactivate user");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to deactivate user");
      dispatch(setError(err.message || "Failed to deactivate user"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEdit = (id: string) => {
    const userToEdit = users.find(user => user.id === id); // Find the user to edit
    setSelectedUser(userToEdit || null); // Set the selected user
    setModalOpen(true); // Open the modal
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log(`Delete user with id: ${id}`);
  };

  

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
      cell: (row: User) =>
        row.gender == "m" ? (
          <>Male</>
        ) : row.gender == "f" ? (
          <>Female</>
        ) : (
          <>Other</>
        ),
      sortable: true,
    },
    {
      name: "Active",
      cell: (row: User) => <>{row.is_active ? "Yes" : "No"}</>,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: (row: User) => (
        <ActionButtons
          id={row.id}
          isActive={row.is_active}
          onActivate={confirmActivation}
          onDeactivate={confirmDeactivation}
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ),
      center: true,
    },
  ];

  return (
    <>   <DataTable
    columns={columns}
    data={Array.isArray(users) ? users : []}
    highlightOnHover
    striped
    persistTableHead
  />
   {isModalOpen && selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setModalOpen(false)} 
          onSave={onUserChange} // Call onUserChange to refresh the user list
        />
      )}
</>
  
  );
};

export default UserTable;
