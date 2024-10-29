import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaTrash, FaEdit } from "react-icons/fa";
import {Carousel,CarouselTableProps} from "../../types/Carousel.types"

// interface Carousel {
//   id: string;
//   name: string;
//   imageUrl: string;
// }

// interface CarouselTableProps {
//   carousels: Carousel[];
//   loading: boolean;
//   error: string | null;
//   onEdit: (carousel: Carousel) => void;
//   onDelete: (id: string) => void;
// }

const CarouselTable: React.FC<CarouselTableProps> = ({
  carousels,
  loading,
  error,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumn<Carousel>[] = [
    {
      name: "ID",
      selector: (row: Carousel) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Carousel) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row: Carousel) => (
        <img
          src={row.image}
          alt={row.name}
          style={{ width: "50px", height: "50px", borderRadius: "8px" }}
        />
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row: Carousel) => (
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(row)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => onDelete(row.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
          >
            <FaTrash />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DataTable
      columns={columns}
      data={Array.isArray(carousels) ? carousels : []}
      highlightOnHover
      pointerOnHover
      persistTableHead
    />
  );
};

export default CarouselTable;
