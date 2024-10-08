import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Product, ProductTableProps } from "../../types/Product.types";

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  error,
}) => {
  const columns: TableColumn<Product>[] = [
    {
      name: "ID",
      selector: (row: Product) => row.id ?? "N/A", // Fallback to 'N/A' if undefined
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Product) => row.name || "", // Returns an empty string if undefined
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => row.price.toString(), // Convert number to string
      sortable: true,
    },
    {
      name: "Category",
      selector: (row: Product) => row.categoryId || "", // Returns an empty string if undefined
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row: Product) => row.stock.toString(), // Convert number to string
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Product) => row.description || "", // Returns an empty string if undefined
      sortable: false,
    },
    {
      name: "Image",
      cell: (row: Product) => {
        const imageUrl = typeof row.imageUrl === 'string' 
          ? row.imageUrl // If it's a string, use it directly
          : row.imageUrl 
          ? URL.createObjectURL(row.imageUrl) // If it's a File, create a URL
          : ""; // Fallback if no image

        return (
          <img
            src={imageUrl}
            alt={row.name}
            style={{ width: "50px", height: "50px" }}
          />
        );
      }, // Display image with specified dimensions
      sortable: false,
    },
    
    {
      name: "Created At",
      selector: (row: Product) => {
        return row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A";
      },
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row: Product) => {
        return row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "N/A";
      },
      sortable: true,
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DataTable
      columns={columns}
      data={Array.isArray(products) ? products : []}
      pagination
      highlightOnHover
      pointerOnHover
      persistTableHead
    />
  );
};

export default ProductTable;
