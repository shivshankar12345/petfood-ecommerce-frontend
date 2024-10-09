import React from "react";

// SearchBar Component
export const SearchBar: React.FC<{ searchTerm: string; onSearch: (value: string) => void; type:string;placeholder:string; }> = ({ searchTerm, onSearch,type,placeholder }) => {
  return (
    <input
      type={type}
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      placeholder={placeholder}
      // className="border p-2 w-full md:w-64" // Medium size width for search bar
       className="border p-2 w-full md:w-100 lg:w-[80rem] rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
};

// Dropdown Component
export const StatusDropdown: React.FC<{ selectedStatus: string; onStatusChange: (status: string) => void }> = ({
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <>{(selectedStatus === "verified" || selectedStatus === "pending") ? (
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="verified">Verified</option>
        <option value="pending">Pending</option>
      </select>
    ) :(
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      > 
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    )}</>
  )
};
