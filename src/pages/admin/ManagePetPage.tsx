import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPets,
  addNewPet,
  deletePet,
  updatePet,
} from "../../Redux/Slice/Pet.slice";
import AddPetModal from "./PetModal";
import TableLayout from "../../layout/TableLayout";
import { AppDispatch } from "../../Redux/store";
import { startLoading, stopLoading } from "../../Redux/Slice/spinner.slice";
import { toast } from "react-toastify";
import PetTable from "../../components/Tables/PetTable";
import { RootState } from "../../Redux/store";
import { Pet } from "../../types/Pet.types";

const ManagePetPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, totalPages } = useSelector((state: RootState) => state.pets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    dispatch(startLoading());
    try {
      await dispatch(fetchPets({ currentPage, search })).unwrap();
    } catch (error) {
      toast.error("Failed to fetch pets.");
    } finally {
      dispatch(stopLoading());
    }
  };
  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage, search]);

  const handleSubmit = async (formData: any, id: string) => {
    dispatch(startLoading());
  console.log(formData);
    try {
      if (id) {
        await dispatch(updatePet({ id, formData })).unwrap();
      } else {
        await dispatch(addNewPet(formData)).unwrap();
      }
      toast.success("Pet saved successfully!");
    } catch (error) {
      toast.error("Failed to save pet.");
    } finally {
      dispatch(stopLoading());
      fetchData();
    }
  };

  const handleDelete = async (petId: string) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      dispatch(startLoading());
      try {
        await dispatch(deletePet({ id: petId, currentPage, search })).unwrap();
        toast.success("Pet deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete pet.");
      } finally {
        dispatch(stopLoading());
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPetId("");
    setSelectedPet(null);
  };

  const handleAddPetClick = () => {
    setSelectedPetId(""); // Clear any selected pet
    setIsModalOpen(true); // Open the modal
  };

  return (
    <TableLayout
      title="Manage Pets"
      searchPlaceholder="Search pets..."
      searchValue={search}
      onSearchChange={handleSearch}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    >
      <div className="w-full h-full border border-gray-300 overflow-auto p-4">
        <button
          onClick={handleAddPetClick}
         className=" p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        >
          Add Pet
        </button>

        <PetTable
          pets={pets}
          onDelete={handleDelete}
          onEdit={pet => {
            setSelectedPetId(pet.id);
            setSelectedPet(pet);
            setIsModalOpen(true);
          }}
        />
      </div>

      <AddPetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        id={selectedPetId}
        pets={pets}
        selectedPet={selectedPet}
      />
    </TableLayout>
  );
};

export default ManagePetPage;
