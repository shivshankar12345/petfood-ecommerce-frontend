import DataTable from "react-data-table-component";
import { User, UserTableProps } from "../../types/user.types";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { setError, setLoading } from "../../Redux/Slice/user.slice";
 
const UserTable: React.FC<UserTableProps> = ({ users, loading, error,selected,onUserChange }) => {

  const { makeAPICallWithOutData } = useApi();
  const dispatch = useDispatch();

  const confirmActivation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to activate this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, activate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handelActive();
      }
    });
  };

  const confirmDeactivation = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to deactivate this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, deactivate it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handelInActive();
      }
    });
  };



const handelActive= async ()=>{
  dispatch(setLoading(true));
  try {
    const result = await makeAPICallWithOutData("get", "/admin-panel/getActiveUsers");
    if (!result.isError) {
      toast.success(`User Activated`);
      onUserChange();
    } else {
      throw new Error(result.error?.message || "Failed to activate user");
    }
  } catch (err: any) {
    toast.error(err.message || "Failed to activate user");
    dispatch(setError(err.message || "Failed to activate user"));
  } finally {
    dispatch(setLoading(false));
  }
}


const handelInActive= async ()=>{
   dispatch(setLoading(true));
   try{
    const result=await makeAPICallWithOutData("get","/admin-panel/getInactiveUsers");
    if (!result.isError) {
      toast.success(`User Deactivated`);
      onUserChange();
    } else {
      throw new Error(result.error?.message || "Failed to deactivate user");
    }
  } catch (err: any) {
    toast.error(err.message || "Failed to deactivate user");
    dispatch(setError(err.message || "Failed to deactivate user"));
  } finally {
    dispatch(setLoading(false));
  }
   };




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const columns = [
    {
      name: "ID",
      selector: (row: User) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: User) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: User) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: User) => row.phone,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row: User) => row.gender,
      sortable: true,
    },
    {
      name: "Actions", 
      cell: () =>
        selected === "all" ? (
          <>
            <button
              onClick={() =>  confirmActivation()}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Active
            </button>
          </>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => confirmActivation()}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
             Active
            </button>
            <button
              onClick={() =>  confirmDeactivation()}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
             In Active
            </button>
          </div>
        ),
      center: true,
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={Array.isArray(users) ? users : []}
      pagination
      highlightOnHover
      striped
      persistTableHead
    />
  );
};

export default UserTable;
