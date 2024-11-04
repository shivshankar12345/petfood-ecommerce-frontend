import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPets, addNewPet, deletePet, updatePet } from "../../Redux/Slice/Pet.slice";
import AddPetModal from "./PetModal";
import { Pet } from "../../types/Pet.types";
import TableLayout from "../../layout/TableLayout"; 
import { AppDispatch } from "../../Redux/store";
import { toast } from "react-toastify";

const ManagePetPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pets, loading, error, totalPages } = useSelector((state: any) => state.pets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchPets({ currentPage, search }));
  }, [dispatch, currentPage, search]);




  const handleSubmit = (formData: FormData, petId?: string) => {
    if (petId) {
      dispatch(updatePet({ id: petId, formData }));
    } else {
      dispatch(addNewPet(formData));
    }
  
  };

  const handleDelete = (petId: string) => {
    if (toast.success("Are you sure you want to delete this pet?")) {
      dispatch(deletePet({ id: petId, currentPage, search }));
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

  return (
    <div className="p-4">
      <TableLayout
        title="Manage Pets"
        searchPlaceholder="Search pets..."
        searchValue={search}
        onSearchChange={handleSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        error={error}
      >
      
   
      
      </TableLayout>

      <AddPetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        petId={selectedPetId}
        data={pets}
      />
    </div>
  );
};

export default ManagePetPage;
