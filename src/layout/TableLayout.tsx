  import React from "react";
  import { FaSearch } from "react-icons/fa";

  interface TableLayoutProps {
    title: string;
    searchPlaceholder: string;
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
    currentPage: number;
    totalPages?: number; 
    onPageChange: (page: number) => void;
    error?: string;
  }

const TableLayout: React.FC<TableLayoutProps> = ({
  title,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  children,
  currentPage,
  totalPages = 1,
  onPageChange,
  error,
}) => {
  return (
    <div className="p-4 border border-gray-300 w-full h-full overflow-y-hidden ">
      <div className="flex items-center justify-between mb-full">
        <h2 className="text-3xl font-semibold text-gray-800 pb-1">{title}</h2>
      </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            className="w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            aria-label="Search"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <FaSearch className="text-gray-400" />
          </div>
        </div>

      {/* {error && <p className="text-red-600 mb-4">{error}</p>} */}

        <div className="bg-gray-50 rounded-lg shadow-inner flex-1 overflow-auto">
          <div className="min-w-full ">
          {children}</div>
        </div>

        <div className="mt-6 flex justify-center space-x-2 ">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white transition duration-200 ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-lg font-medium text-gray-600 bg-gray-200 rounded-lg">
            Page {totalPages > 0 ? currentPage : 1} of {totalPages > 0 ? totalPages : 1}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-white transition duration-200 ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  export default TableLayout;



