import React from 'react';

const ManageUsersPage: React.FC = () => {
  return (
    <div >
      <h1 className='text-center'>Manage Users</h1>
      {/* Manage Users page content */}
    </div>
  );
};

export default ManageUsersPage;

import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { User } from "../../types/user.types";
import { columns as userTableColumns } from "../../components/Tables/UserTable"; // Reuse columns from UserTable

const ManagerUserPage: React.FC = () => {
  // Mock data for users
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      gender: "Male",
      role: "Admin",
      pan_num: "ABCDE1234F",
      rating: 4.5,
      gst_num: "22ABCDE1234F1Z5",
      is_verfied: true,
      is_Blocked: false,
      created_at: "2023-10-01T08:00:00Z",
      updated_at: "2023-10-01T08:00:00Z",
      deleted_at: null, // Add deleted_at with null or actual date if deleted
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0987654321",
      gender: "Female",
      role: "Seller",
      pan_num: "XYZAB5678C",
      rating: 4.2,
      gst_num: "33XYZAB5678C1Z3",
      is_verfied: false,
      is_Blocked: true,
      created_at: "2023-09-15T08:00:00Z",
      updated_at: "2023-10-02T08:00:00Z",
      deleted_at: null, // Add deleted_at
    },
  ];
  

  const [users, setUsers] = useState<User[]>(mockUsers);

  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // Mock Block/Unblock handler
  const handleBlockUnblock = (userId: string, block: boolean) => {
    setActionLoading(true);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_Blocked: block } : user
      )
    );
    setActionLoading(false);
  };

  // Mock Verify/Unverify handler
  const handleVerifyUnverify = (userId: string, verify: boolean) => {
    setActionLoading(true);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, is_verfied: verify } : user
      )
    );
    setActionLoading(false);
  };

  // Add action buttons to the columns
  const columns = [
    ...userTableColumns, // Spread the columns from UserTable
    {
      name: "Actions",
      cell: (row: User) => (
        <div className="flex space-x-2">
          {/* Block/Unblock Button */}
          {row.is_Blocked ? (
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleBlockUnblock(row.id, false)}
              disabled={actionLoading}
            >
              Unblock
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white px-2 py-1 rounded"
              onClick={() => handleBlockUnblock(row.id, true)}
              disabled={actionLoading}
            >
              Block
            </button>
          )}

          {/* Verify/Unverify Button */}
          {row.is_verfied ? (
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded"
              onClick={() => handleVerifyUnverify(row.id, false)}
              disabled={actionLoading}
            >
              Unverify
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => handleVerifyUnverify(row.id, true)}
              disabled={actionLoading}
            >
              Verify
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      {/* DataTable Component */}
      <DataTable
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        striped
      />

      {/* Action Loading Indicator */}
      {actionLoading && <div>Performing action, please wait...</div>}
    </div>
  );
};

export default ManagerUserPage;
