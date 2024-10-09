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
      selector: (row: Product) => row.categoryId || "",
      sortable: true,
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
        const imageUrl = typeof row.imageUrl === 'string' 
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
      highlightOnHover
      pointerOnHover
      persistTableHead
    />
  );
};

export default ProductTable;
