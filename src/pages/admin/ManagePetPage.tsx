import React, { useEffect, useState } from "react";
import PetTable from "../../components/Tables/PetTable";
import AddPetModal from "../admin/PetModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import TableLayout from "../../layout/TableLayout";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import {
  fetchPets,
  addNewPet,
  deletePet,
  updatePet,
} from "../../Redux/Slice/Pet.slice";
import { Pet } from "../../types/Pet.types";
import useDebounce from "../../hooks/useDebounce";

const ManagePetPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pets, loading, error, selectedPet, totalPages } = useSelector(
    (state: RootState) => state.pets
  );

  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [petToDelete, setPetToDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 3000);

  useEffect(() => {
    dispatch(fetchPets({ currentPage, search: debouncedSearch }));
  }, [dispatch, currentPage, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddPet = async (name: string, description: string) => {
    try {
      await dispatch(addNewPet({ name, description })).unwrap();
      toast.success("Pet added successfully!");
      setShowModal(false);
      dispatch(fetchPets({ currentPage, search: "" }));
    } catch (error) {
      toast.error("Failed to add pet.");
    }
  };

  const handleEditPet = async (
    id: string,
    name: string,
    description: string
  ) => {
    if (selectedPet) {
      try {
        await dispatch(updatePet({ id, name, description })).unwrap();
        toast.success("Pet updated successfully!");
        setShowModal(false);
        dispatch(fetchPets({ currentPage, search: "" }));
      } catch (error) {
        toast.error("Failed to update pet.");
      }
    }
  };

  const confirmDeletePet = (id: string) => {
    setPetToDelete(id);
    setShowConfirmModal(true);
  };

  const handleDeletePet = async () => {
    if (petToDelete) {
      try {
        await dispatch(
          deletePet({ id: petToDelete, currentPage, search: "" })
        ).unwrap();
        toast.success("Pet deleted successfully!");
        dispatch(fetchPets({ currentPage, search: "" }));
      } catch (error) {
        toast.error("Failed to delete pet.");
      } finally {
        setShowConfirmModal(false);
        setPetToDelete(null);
      }
    }
  };

  const openEditModal = (pet: Pet) => {
    dispatch({ type: "pets/setSelectedPet", payload: pet });
    setShowModal(true);
  };

  return (
    <TableLayout
      title="Manage Pets"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={page => setCurrentPage(page)}
      error={error ?? undefined}
      searchPlaceholder="Search pets..."
      searchValue={search}
      onSearchChange={handleSearchChange}
    >
      <div className="w-full h-full border border-gray-300 overflow-auto p-4">
        <button
          onClick={() => {
            dispatch({ type: "pets/setSelectedPet", payload: null });
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
        onSubmit={(formData: { name: string; description: string }) =>
          selectedPet
            ? handleEditPet(selectedPet.id, formData.name, formData.description)
            : handleAddPet(formData.name, formData.description)
        }
        pet={selectedPet ?? undefined} 
      />

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDeletePet}
        message="Do you really want to delete this pet?"
      />

      <ToastContainer />
    </TableLayout>
  );
};

export default ManagePetPage;
