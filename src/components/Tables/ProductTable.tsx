import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Product, ProductTableProps } from "../../types/Product.types";
import { FaTrash, FaEdit } from "react-icons/fa";

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumn<Product>[] = [
    {
      name: "ID",
      selector: (row: Product) => row.id ?? "N/A",
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Product) => row.name || "",
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => row.price.toString(),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: Product) => row.category?.name || "",
      sortable: true,
    },
    {
      name:"Pet",
      selector:(row:Product) => row.petType?.name|| "",
      sortable:true
    },
    {
      name: "Stock",
      selector: (row: Product) => row.stock.toString(),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Product) => row.description || "",
      sortable: false,
    },
    {
      name: "Image",
      cell: (row: Product) => {
        const imageUrl =
          typeof row.imageUrl === "string"
            ? row.imageUrl
            : row.imageUrl
            ? URL.createObjectURL(row.imageUrl)
            : "";
        return (
          <img
            src={imageUrl}
            alt={row.name}
            style={{ width: "50px", height: "50px" }}
          />
        );
      },
      sortable: false,
    },

    {
      name: "Actions",
      cell: (row: Product) => (
        <div className="flex space-x-2">
          {/* Uncomment to enable edit functionality */}
          <button
            onClick={() => onEdit(row)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-200"
          >
            <FaEdit></FaEdit>
          </button>
          <button
            onClick={() => onDelete(row.id as string)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-200"
          >
            <FaTrash></FaTrash>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={Array.isArray(products) ? products : []}
      highlightOnHover
      pointerOnHover
      persistTableHead
    />
  );
};

export default ProductTable;
