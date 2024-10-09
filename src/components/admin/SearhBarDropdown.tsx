// components/SearchBarDropdown.tsx

import React from "react";

// SearchBar Component
export const SearchBar: React.FC<{ searchTerm: string; onSearch: (value: string) => void; type:string;placeholder:string; }> = ({ searchTerm, onSearch,type,placeholder }) => {
  return (
    <input
      type={type}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
      className="border p-2 w-full md:w-64" // Medium size width for search bar
    />
  );
};

// Dropdown Component
export const SellerStatusDropdown: React.FC<{ selectedStatus: string; onStatusChange: (status: string) => void }> = ({
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <select
      value={selectedStatus}
      onChange={(e) => onStatusChange(e.target.value)}
      className="border p-2"
    >
      <option value="verified">Verified</option>
      <option value="pending">Pending</option>
    </select>
  );
};
