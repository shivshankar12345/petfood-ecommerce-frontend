// src/components/ProductTable.tsx

import React from "react";
import DataTable from "react-data-table-component";
import { Product } from "../../types/Product.types";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  error,
}) => {
  const columns = [
    {
      name: "ID",
      selector: (row: Product) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: Product) => row.name,
      sortable: true,
    },
    {
      name: "Category ID",
      selector: (row: Product) => row.categoryId,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row: Product) => `${row.price}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: Product) => row.description,
      sortable: false,
    },
    {
      name: "Stock",
      selector: (row: Product) => row.stock,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row: Product) => (
        <img
          src={row.imageUrl} // Assuming imageurl contains the Cloudinary URL
          alt={row.name}
          style={{ width: "50px", height: "50px", objectFit: "cover" }} // Style for images
        />
      ),
      sortable: false,
    },
    {
      name: "Pet Type",
      selector: (row: Product) => row.petType,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row: Product) => new Date(row.createdAt).toLocaleString(),
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row: Product) => new Date(row.updatedAt).toLocaleString(),
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
    />
  );
};

export default ProductTable;
