import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { User, UserTableProps } from "../../types/user.types";
import useApi from "../../hooks/useApi";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ActionButtons from "../admin/ActionButtons";
import EditUserModal from "../../pages/admin/UserModal";
import { userConfirm } from "../../utils/Confirmation";
import { useLoaderService } from "../../hooks/useLoader";
import { RootState } from "../../Redux/store";

const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserChange,
  selectedStatus,
}) => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();

  const { startLoader, stopLoader } = useLoaderService();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // State to hold the selected user
  const { accessToken } = useSelector((state: RootState) => state.auth);
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
    startLoader();

    const { isError, error } = await makeAPICallWithData(
      "patch",
      "/users/modifyUser",
      {
        id,
        is_active: true,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!isError) {
      toast.success(`User Activated`);
      onUserChange();
    } else {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    }
    stopLoader();
  };

  const handleDeactivate = async (id: string) => {
    startLoader();
    const { isError, error } = await makeAPICallWithData(
      "patch",
      "/users/modifyUser",
      {
        id,
        is_active: false,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!isError) {
      toast.success(`User Deactivated`);
      onUserChange();
    } else {
      toast.error(
        error?.response?.data?.message || "Failed to deactivate user"
      );
    }
    stopLoader();
  };

  const handleEdit = (id: string) => {
    const userToEdit = users.find(user => user.id === id); // Find the user to edit
    setSelectedUser(userToEdit || null); // Set the selected user
    setModalOpen(true); // Open the modal
  };

  const handleDelete = async (id: string) => {
    const confirm = await userConfirm(
      "Are you sure.?",
      "You want to Delete this User",
      "Yes, Delete it",
      "warning",
      true,
      "#3085d6",
      "#d33"
    );
    if (!confirm) {
      return;
    }

    startLoader();
    const { error, isError } = await makeAPICallWithOutData(
      "delete", // Change the method to 'delete'
      `/users/deleteUser/${id}`, // Use the appropriate endpoint
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (isError) {
      toast.success(`User Deleted Successfully`);
      onUserChange(); // Refresh the user list
    } else {
      throw new Error(
        error?.response?.data?.message || "Failed to delete user"
      );
    }
    stopLoader();
  };

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
      cell: (row: User) => (
        <>
          {row.gender === "m"
            ? "Male"
            : row.gender === "f"
            ? "Female"
            : "Other"}
        </>
      ),
      sortable: true,
    },
    {
      name: "Active",
      cell: (row: User) => <>{row.is_active ? "Yes" : "No"}</>,
      sortable: true,
      center: true,
    },
    selectedStatus !== "delete"
      ? {
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
        }
      : {},
  ];

  if (selectedStatus == "delete") {
    columns.pop();
  }

  return (
    <>
      <DataTable
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
