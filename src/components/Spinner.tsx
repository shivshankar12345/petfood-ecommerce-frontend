import React from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
import { RootState } from "../Redux/store"; // Adjust the path based on your project

const Spinner = () => {
  // Access the loading state from Redux
  const isLoading = useSelector((state: RootState) => state.spinner.loading);

  // Conditionally render the spinner based on isLoading
  if (!isLoading) return null;

  return (
    
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      {/* Spinner Component */}
      <ClipLoader color="#00c6ff" size={60} />
    </div>
  );
};

export default Spinner;


