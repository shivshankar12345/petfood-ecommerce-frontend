import React from "react";
import DataTable from "react-data-table-component";
import { Pet, PetTableProps } from "../../types/Pet.types";
import { FaEdit, FaTrash } from "react-icons/fa";

const PetTable: React.FC<PetTableProps> = ({
  pets,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { name: "ID", selector: (row: Pet) => row.id, sortable: true },
    { name: "Name", selector: (row: Pet) => row.name, sortable: true },
    {
      name: "Description",
      selector: (row: Pet) => row.description,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Pet) => (
        <div className="flex space-x-2">
          <FaEdit
            className="text-blue-500 cursor-pointer"
            onClick={() => onEdit(row)}
          />
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => onDelete(row.id)}
          />
        </div>
      ),
      center: true,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DataTable
      columns={columns}
      data={Array.isArray(pets)?pets:[]}
      highlightOnHover
      striped
      persistTableHead
    />
  );
};

export default PetTable;
