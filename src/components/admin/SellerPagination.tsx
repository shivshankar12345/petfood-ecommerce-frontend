export const PaginationControls = ({ currentPage, totalPages, onPageChange }: any) => {
    return (
      <div className="pagination-controls flex justify-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-l"
        >
          Previous
        </button>
        <span className="px-4 py-2 border-t border-b border-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-r"
        >
          Next
        </button>
      </div>
    );
  };
  