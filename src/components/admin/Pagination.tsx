export const PaginationControls = ({ currentPage, totalPages, onPageChange }: any) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-100 rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

  