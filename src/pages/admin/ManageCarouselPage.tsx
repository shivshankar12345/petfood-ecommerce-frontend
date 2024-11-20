import React, { useEffect, useState } from "react";
import CarouselTable from "../../components/Tables/CarouselTable";
import useApi from "../../hooks/useApi";
import AddCarouselModal from "./CarouselModal";
import { useDispatch, useSelector } from "react-redux";
import {  
  setCarousels,
  setError,
} from "../../Redux/Slice/carousel.slice";
import { RootState } from "../../Redux/store";
import useDebounce from "../../hooks/useDebounce";
import TableLayout from "../../layout/TableLayout";
import { toast } from "react-toastify";
import { useLoaderService } from "../../hooks/useLoader";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../components/ConfirmationModal";
import { Carousel } from "../../types/Carousel.types";

const ManageCarouselPage: React.FC = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const { startLoader, stopLoader } = useLoaderService();
  const dispatch = useDispatch();
  const { carousels, loading, error } = useSelector(
    (state: RootState) => state.carousel
  );
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCarousel, setSelectedCarousel] = useState<any>(null);
  const debouncedSearch = useDebounce(search, 3000);

  const fetchCarousels = async () => {
    startLoader();
    try {
      const { isError, response, error } = await makeAPICallWithOutData(
        "get",
        `/crousel/getImages?page=${currentPage}&limit=5&search=${debouncedSearch}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (isError) {
        dispatch(setError(error?.message || "Failed to fetch carousels"));
      } else {
        const { crousel, total_pages } = response?.data || {};
        dispatch(setCarousels(crousel || []));
        setTotalPages(total_pages || 0);
        dispatch(setError(null));
      }
    } catch (err) {
      dispatch(setError("An unexpected error occurred"));
    } finally {
      stopLoader();
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, [currentPage, debouncedSearch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleAddCarousel = async (formData: FormData) => {
    if (isSubmitting) return;
    console.log(formData);
    setIsSubmitting(true);
    try {
      startLoader();
      const { isError } = await makeAPICallWithData(
        "post",
        "/crousel/addImage",
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!isError) {
        toast.success("Carousel added successfully!");
        fetchCarousels();
        setShowModal(false);
      } else {
        toast.error("Failed to add carousel");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while adding the carousel");
    } finally {
      setIsSubmitting(false);
      stopLoader();
    }
  };

  const handleEditCarousel = async (formData: FormData, id: string) => {
    startLoader();
    try {
      const { isError } = await makeAPICallWithData(
        "patch",
        `/crousel/updateImage/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!isError) {
        toast.success("Carousel updated successfully!");
        fetchCarousels();
      } else {
        toast.error("Failed to update carousel");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while updating the carousel");
    } finally {
      stopLoader();
    }
  };

  const handleDeleteCarousel = async (id: string) => {
    try {
      startLoader();
      const { isError } = await makeAPICallWithOutData(
        "delete",
        `/crousel/deleteImage/${id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!isError) {
        toast.success("Carousel deleted successfully!");
        fetchCarousels();
      } else {
        toast.error("Failed to delete carousel");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while deleting the carousel");
    } finally {
      stopLoader();
    }
  };

  const openEditModal = (carousel: Carousel) => {
    setSelectedCarousel(carousel);
    setShowModal(true);
  };

  const openDeleteModal = (id: string) => {
    setSelectedCarousel(id);
    setShowConfirmModal(true);
  };

  return (
    <TableLayout
      title="Manage Carousel"
      searchPlaceholder="Search carousels..."
      searchValue={search}
      onSearchChange={handleSearch}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page: React.SetStateAction<number>) =>
        setCurrentPage(page)
      }
      error={error ?? undefined}
    >
      <div className="w-full h-full border border-gray-300 overflow-auto p-4">
        <button
          onClick={() => {
            setSelectedCarousel(null);
            setShowModal(true);
          }}
          className="p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        >
          Add Carousel
        </button>

        <CarouselTable
          carousels={carousels}
          loading={loading}
          error={error}
          onDelete={openDeleteModal}
          onEdit={openEditModal}
        />
      </div>
      <AddCarouselModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={formData =>
          selectedCarousel
            ? handleEditCarousel(formData, selectedCarousel.id)
            : handleAddCarousel(formData)
        }
        carousel={selectedCarousel}
        carouselId={selectedCarousel?.id}
      />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => handleDeleteCarousel(selectedCarousel!)}
        message="Do you want to delete this carousel?"
      />
    </TableLayout>
  );
};

export default ManageCarouselPage;
