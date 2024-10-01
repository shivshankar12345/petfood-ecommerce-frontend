// src/components/ManageUsersTable.tsx
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

// Define User type
export interface User {
  id: number;
  name: string;
  gender: string;
  email: string;
  phone: string;
  role: string;
}

const ManageUserPage: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/users'); // Replace with your API endpoint
        setData(response.data); // Assuming the response data is an array of users
      } catch (err) {
        setError(`Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: 'ID', selector: (row: User) => row.id, sortable: true, width: '80px' },
    { name: 'Name', selector: (row: User) => row.name, sortable: true },
    { name: 'Gender', selector: (row: User) => row.gender, sortable: true },
    { name: 'Email', selector: (row: User) => row.email, sortable: true },
    { name: 'Phone Number', selector: (row: User) => row.phone, sortable: true },
    { name: 'Role', selector: (row: User) => row.role, sortable: true },
  ];

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Manage Users</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        className="border border-gray-300 rounded-lg"
        subHeader
        subHeaderComponent={
          <div className="flex justify-between items-center">
            <div className="text-gray-600">Total Users: {data.length}</div>
            <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition duration-200">
              Add User
            </button>
          </div>
        }
        noDataComponent={<div className="text-center py-4">No users found.</div>}
        customStyles={{
          headCells: {
            style: {
              backgroundColor: '#f3f4f6',
              color: '#4b5563',
              fontWeight: 'bold',
              padding: '12px',
            },
          },
          cells: {
            style: {
              padding: '12px',
            },
          },
        }}
      />
    </div>
  );
};

export default ManageUserPage;
