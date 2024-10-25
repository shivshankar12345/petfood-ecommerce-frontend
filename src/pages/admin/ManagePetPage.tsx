import React, { useEffect, useState } from "react";
import PetTable from "../../components/Tables/PetTable";
import useApi from "../../hooks/useApi";
import AddPetModal from "./PetModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  setLoading,
  setPets,
  setError,
} from "../../Redux/Slice/Pet.slice";
import useDebounce from "../../hooks/useDebounce";
import TableLayout from "../../layout/TableLayout";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ManagePetPage: React.FC = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
  const { pets, loading, error } = useSelector(
    (state: RootState) => state.pets
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearch = useDebounce(search, 3000);

  const fetchPets = async () => {
    dispatch(setLoading(true));
    try {
      const { isError, response } = await makeAPICallWithOutData(
        "get",
        `/pets/getAllpets?page=${currentPage}&limit=5&search=${debouncedSearch}`
      );

      if (isError) {
        dispatch(setError("Failed to fetch pets"));
      } else {
        const { data, pagination } = response?.data || {};
        dispatch(setPets(data || []));
        setTotalPages(pagination?.totalPages || 0);
      }
    } catch (err) {
      dispatch(setError("An unexpected error occurred"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPets();
  }, [currentPage, debouncedSearch]);

  const handleAddPet = async (formData: FormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { isError } = await makeAPICallWithData(
        "post",
        "/pets/createPet",
        formData
      );

      if (!isError) {
        toast.success("Pet added successfully!");
        fetchPets();
        setShowModal(false);
      } else {
        toast.error("Failed to add pet");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while adding the pet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPet = async (formData: FormData, id: string) => {
    if (!id) {
      console.error("ID is required to update the pet");
      return;
    }
    try {
      const { isError } = await makeAPICallWithData(
        "put",
        `/pets/updatePet?id=${id}`,
        formData
      );

      if (!isError) {
        toast.success("Pet updated successfully!");
        fetchPets();
        setShowModal(false);
      } else {
        toast.error("Failed to update pet");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while updating the pet");
    }
  };

  const confirmDeletePet = (id: string) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePet(id);
      }
    });
  };

  const handleDeletePet = async (id: string) => {
    try {
      const { isError } = await makeAPICallWithOutData(
        "delete",
        `/pets/delete?id=${id}`
      );

      if (!isError) {
        toast.success("Pet deleted successfully!");
        fetchPets();
      } else {
        toast.error("Failed to delete pet");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while deleting the pet");
    }
  };

  const openEditModal = (pet: any) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  return (
    <TableLayout
      title="Manage Pets"
      searchPlaceholder="Search pets..."
      searchValue={search}
      onSearchChange={(e) => setSearch(e.target.value)}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => setCurrentPage(page)}
      error={error ?? undefined}
    >
      <div className="w-full h-full border border-gray-300 overflow-auto p-4">
        <button
          onClick={() => {
            setSelectedPet(null);
            setShowModal(true);
          }}
          className="p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Add Pet
        </button>

        <PetTable
          pets={pets}
          loading={loading}
          error={error}
          onEdit={openEditModal}
          onDelete={confirmDeletePet}
        />
      </div>

      <AddPetModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(formData) =>
          selectedPet ? handleEditPet(formData, selectedPet.id) : handleAddPet(formData)
        }
        pet={selectedPet}
      />

      <ToastContainer />
    </TableLayout>
  );
};

export default ManagePetPage;
