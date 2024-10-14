// import DataTable from "react-data-table-component";
// import { User, UserTableProps } from "../../types/user.types";
// import useApi from "../../hooks/useApi";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { setError, setLoading } from "../../Redux/Slice/user.slice";

// const UserTable: React.FC<UserTableProps> = ({
//   users,
//   loading,
//   error,
//   selected,
//   onUserChange,
// }) => {
//   const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
//   const dispatch = useDispatch();

//   const confirmActivation = (id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to activate this user!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, activate it!",
//     }).then(result => {
//       if (result.isConfirmed) {
//         handelActive(id);
//       }
//     });
//   };

//   const confirmDeactivation = (id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to deactivate this user!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, deactivate it!",
//     }).then(result => {
//       if (result.isConfirmed) {
//         handelInActive(id);
//       }
//     });
//   };

//   const handelActive = async (id: string) => {
//     dispatch(setLoading(true));
//     try {
//       const result = await makeAPICallWithData(
//         "patch",
//         "/admin-panel/modifyUser",
//         { id, is_active: true }
//       );
//       if (!result.isError) {
//         toast.success(`User Activated`);
//         onUserChange();
//       } else {
//         throw new Error(result.error?.message || "Failed to activate user");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to activate user");
//       dispatch(setError(err.message || "Failed to activate user"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const handelInActive = async (id: string) => {
//     dispatch(setLoading(true));
//     try {
//       const result = await makeAPICallWithData(
//         "patch",
//         "/admin-panel/modifyUser",
//         { id, is_active: false }
//       );

//       if (!result.isError) {
//         console.log(`Seller with ID approved`, result.response?.data);
//         toast.success(`User Deactivated`);
//         onUserChange();
//       } else {
//         throw new Error(result.error?.message || "Failed to deactivate user");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to deactivate user");
//       dispatch(setError(err.message || "Failed to deactivate user"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   const columns = [
//     {
//       name: "ID",
//       selector: (row: User) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row: User) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row: User) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Phone",
//       selector: (row: User) => row.phone,
//       sortable: true,
//     },
//     {
//       name: "Gender",
//       selector: (row: User) => row.gender,
//       sortable: true,
//     },
//     {
//       name: "Active",
//       cell: (row: User) => <>{row.is_active ? "Y" : "N"}</>,
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Actions",
//       cell: (row: User) =>
//         row.is_active ? (
//           <>
//             <button
//               onClick={() => confirmDeactivation(row.id)}
//               className="bg-red-500 text-white px-2 py-1 rounded"
//             >
//               In Active
//             </button>
//           </>
//         ) : (
//           <div className="flex space-x-2">
//             <button
//               onClick={() => confirmActivation(row.id)}
//               className="bg-green-500 text-white px-2 py-1 rounded"
//             >
//               Active
//             </button>
//           </div>
//         ),
//       center: true,
//     },
//   ];
//   return (
//     <DataTable
//       columns={columns}
//       data={Array.isArray(users) ? users : []}
//       highlightOnHover
//       striped
//       persistTableHead
//     />
//   );
// };

// export default UserTable;

// import React, { useState,useRef,useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { User, UserTableProps } from "../../types/user.types";
// import useApi from "../../hooks/useApi";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { setError, setLoading } from "../../Redux/Slice/user.slice";
// import { FaPencilAlt, FaTrash, FaEllipsisV } from "react-icons/fa"; // Import icons from react-icons

// // ActionButtons component for better modularity and dropdown handling
// const ActionButtons: React.FC<{
//   id: string;
//   isActive: boolean;
//   onActivate: (id: string) => void;
//   onDeactivate: (id: string) => void;
// }> = ({ id, isActive, onActivate, onDeactivate }) => {
//   const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

//   const toggleDropdown = () => {
//     setShowDropdown(prev => !prev); // Toggle the dropdown
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <FaPencilAlt className="text-blue-500 cursor-pointer" title="Edit" />
//       <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
//       <FaEllipsisV
//         className="text-gray-500 cursor-pointer"
//         title="More"
//         onClick={toggleDropdown} // Toggle the dropdown on click
//       />

//       {/* Conditional rendering for dropdown */}
//       {showDropdown && (
//         <div className="absolute bg-white shadow-lg p-2 rounded-lg">
//           {isActive ? (
//             <button
//               onClick={() => onDeactivate(id)}
//               className="bg-red-500 text-white px-2 py-1 rounded block w-full"
//             >
//               In Active
//             </button>
//           ) : (
//             <button
//               onClick={() => onActivate(id)}
//               className="bg-green-500 text-white px-2 py-1 rounded block w-full"
//             >
//               Active
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };


// const ActionButtons: React.FC<{
//   id: string;
//   isActive: boolean;
//   onActivate: (id: string) => void;
//   onDeactivate: (id: string) => void;
// }> = ({ id, isActive, onActivate, onDeactivate }) => {
//   const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
//   const dropdownRef = useRef<HTMLDivElement>(null); // To reference the dropdown

//   const toggleDropdown = () => {
//     setShowDropdown(prev => !prev); // Toggle the dropdown (open/close)
//   };

//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       // If click happens outside the dropdown
//       setShowDropdown(false); // Hide dropdown
//     }
//   };

//   useEffect(() => {
//     // Attach the event listener when the component mounts
//     document.addEventListener("mousedown", handleClickOutside);
    
//     // Clean up the event listener when the component unmounts
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className=" flex items-center space-x-2" ref={dropdownRef}>
//       <FaPencilAlt className="text-blue-500 cursor-pointer" title="Edit" />
//       <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
//       <FaEllipsisV
//         className="text-gray-500 cursor-pointer"
//         title="More"
//         onClick={toggleDropdown} // Toggle the dropdown on click
//       />

//       {/* Conditional rendering for dropdown */}
//       {showDropdown && (
//         <div className="absolute right-0 bottom-full  bg-white shadow-lg p-2 rounded-lg z-10">
//           {isActive ? (
//             <button
//               onClick={() => onDeactivate(id)}
//               className="bg-red-500 text-white px-2 py-1 rounded block"
//             >
//               In Active
//             </button>
//           ) : (
//             <button
//               onClick={() => onActivate(id)}
//               className="bg-green-500 text-white px-2 py-1 rounded block"
//             >
//               Active
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };




// const UserTable: React.FC<UserTableProps> = ({
//   users,
//   loading,
//   error,
//   selected,
//   onUserChange,
// }) => {
//   const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
//   const dispatch = useDispatch();

//   const confirmActivation = (id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to activate this user!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, activate it!",
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleActivate(id);
//       }
//     });
//   };

//   const confirmDeactivation = (id: string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You want to deactivate this user!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, deactivate it!",
//     }).then(result => {
//       if (result.isConfirmed) {
//         handleDeactivate(id);
//       }
//     });
//   };

//   const handleActivate = async (id: string) => {
//     dispatch(setLoading(true));
//     try {
//       const result = await makeAPICallWithData(
//         "patch",
//         "/admin-panel/modifyUser",
//         { id, is_active: true }
//       );
//       if (!result.isError) {
//         toast.success(`User Activated`);
//         onUserChange();
//       } else {
//         throw new Error(result.error?.message || "Failed to activate user");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to activate user");
//       dispatch(setError(err.message || "Failed to activate user"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const handleDeactivate = async (id: string) => {
//     dispatch(setLoading(true));
//     try {
//       const result = await makeAPICallWithData(
//         "patch",
//         "/admin-panel/modifyUser",
//         { id, is_active: false }
//       );

//       if (!result.isError) {
//         toast.success(`User Deactivated`);
//         onUserChange();
//       } else {
//         throw new Error(result.error?.message || "Failed to deactivate user");
//       }
//     } catch (err: any) {
//       toast.error(err.message || "Failed to deactivate user");
//       dispatch(setError(err.message || "Failed to deactivate user"));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const columns = [
//     {
//       name: "ID",
//       selector: (row: User) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row: User) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row: User) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Phone",
//       selector: (row: User) => row.phone,
//       sortable: true,
//     },
//     {
//       name: "Gender",
//       selector: (row: User) => row.gender,
//       sortable: true,
//     },
//     {
//       name: "Active",
//       cell: (row: User) => <>{row.is_active ? "Yes" : "No"}</>,
//       sortable: true,
//       center: true,
//     },
//     {
//       name: "Actions",
//       cell: (row: User) => (
//         <ActionButtons
//           id={row.id}
//           isActive={row.is_active}
//           onActivate={confirmActivation}
//           onDeactivate={confirmDeactivation}
//         />
//       ),
//       center: true,
//     },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={Array.isArray(users) ? users : []}
//       highlightOnHover
//       striped
//       persistTableHead
//     />
//   );
// };

// export default UserTable;
