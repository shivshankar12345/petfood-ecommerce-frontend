import DataTable from "react-data-table-component";
import { Seller, SellerTableProps } from "../../types/seller.types";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../Redux/Slice/seller.slice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SellerTable: React.FC<SellerTableProps> = ({
  seller,
  loading,
  error,
  onSellerChange,
  selected,
}) => {
  const { makeAPICallWithData } = useApi();
  const dispatch = useDispatch();

  // Function to confirm approval via SweetAlert2
  const confirmApproval = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this seller!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then(result => {
      if (result.isConfirmed) {
        handleApprove(id);
      }
    });
  };

  // Function to confirm rejection via SweetAlert2
  const confirmRejection = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this seller!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(result => {
      if (result.isConfirmed) {
        handleReject(id);
      }
    });
  };

  // Action handlers for Approve
  const handleApprove = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const result = await makeAPICallWithData(
        "patch",
        "/admin-panel/changeSellerStatus/approvedSeller",
        { id }
      );
      if (!result.isError) {
        console.log(`Seller with ID ${id} approved`, result.response?.data);
        toast.success(`Seller Approved`); // Success toast
        onSellerChange();
      } else {
        throw new Error(result.error?.message || "Failed to approve seller");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to approve seller"); // Error toast
      dispatch(setError(err.message || "Failed to approve seller"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Action handlers for Reject
  const handleReject = async (id: string) => {
    dispatch(setLoading(true));
    try {
      const result = await makeAPICallWithData(
        "patch",
        "/admin-panel/changeSellerStatus/rejectSeller",
        { id }
      );
      if (!result.isError) {
        console.log(`Seller with ID ${id} rejected`, result.response?.data);
        toast.success(`Seller Rejected`); // Success toast
        onSellerChange();
      } else {
        throw new Error(result.error?.message || "Failed to reject seller");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to reject seller"); // Error toast
      dispatch(setError(err.message || "Failed to reject seller"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Columns definition for DataTable
  const columns = [
    {
      name: "ID",
      selector: (row: Seller) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row: Seller) => row.email,
      sortable: true,
      center: true,
    },
    {
      name: "Phone",
      selector: (row: Seller) => row.phone,
      sortable: true,
      center: true,
    },
    {
      name: "Gender",
      cell: (row: Seller) =>
        row.gender == "m" ? (
          <>Male</>
        ) : row.gender == "f" ? (
          <>Female</>
        ) : (
          <>Other</>
        ),
      sortable: true,
      center: true,
    },
    {
      name: "Active",
      cell: (row: Seller) => <>{row.is_active ? "Yes" : "No"}</>,
      sortable: true,
      center: true,
    },
    {
      name: "GST Number",
      selector: (row: Seller) => row.gst_num,
      sortable: true,
      center: true,
    },
    {
      name: "Pan Number",
      selector: (row: Seller) => row.pan_num,
      sortable: true,
      center: true,
    },
    {
      name: "Actions",
      cell: (row: Seller) =>
        selected === "verified" ? (
          <>
            <button
              onClick={() => confirmRejection(row.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove Seller
            </button>
          </>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => confirmApproval(row.id)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => confirmRejection(row.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Reject
            </button>
          </div>
        ),
      center: true,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={Array.isArray(seller) ? seller : []}
      highlightOnHover
      striped
      persistTableHead
    />
  );
};

export default SellerTable;
