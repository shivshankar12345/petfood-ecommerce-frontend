// import React from "react";
// import { useSelector } from "react-redux";
// import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners
// import { RootState } from "../Redux/store"; // Adjust the path based on your project

// const Spinner = () => {
//   // Access the loading state from Redux
//   const isLoading = useSelector((state: RootState) => state.spinner.loading);

//   // Conditionally render the spinner based on isLoading
//   if (!isLoading) return null;

//   return (
//     // Full-screen overlay with Tailwind CSS
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       {/* Spinner Component */}
//       <ClipLoader color="#ff6600" size={60} />
//     </div>
//   );
// };

// export default Spinner;

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store"; // Adjust the path as necessary

const Spinner = () => {
  // Access the loading state from Redux
  const isLoading = useSelector((state: RootState) => state.spinner.loading);

  // Conditionally render the spinner based on isLoading
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      {/* Spinner Content */}
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    </div>
  );
};

export default Spinner;


