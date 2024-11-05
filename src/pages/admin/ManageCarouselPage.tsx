import React, { useEffect, useState } from "react";
import CarouselTable from "../../components/Tables/CarouselTable";
import useApi from "../../hooks/useApi";
import AddCarouselModal from "./CarouselModal";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setCarousels,
  setError,
} from "../../Redux/Slice/carousel.slice";
import { RootState } from "../../Redux/store";
import useDebounce from "../../hooks/useDebounce";
import TableLayout from "../../layout/TableLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../components/ConfirmationModal";
import { startLoading, stopLoading } from "../../Redux/Slice/spinner.slice";
import { CarouselFormValues } from "../../types/Carousel.types";

const ManageCarouselPage: React.FC = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
  const { carousels, loading, error } = useSelector(
    (state: RootState) => state.carousel
  );
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCarousel, setSelectedCarousel] = useState<any>(null);
  const debouncedSearch = useDebounce(search, 3000);

  const fetchCarousels = async () => {
    dispatch(startLoading());
    try {
      const { isError, response, error } = await makeAPICallWithOutData(
        "get",
        `/crousel/getImages?page=${currentPage}&limit=5&search=${debouncedSearch}`
      );
      if (isError) {
        dispatch(setError(error?.message || "Failed to fetch carousels"));
      } else {
        const { crouselData, pagination } = response?.data || {};
        dispatch(setCarousels(crouselData || []));
        setTotalPages(pagination?.totalPages || 0);
        dispatch(setError(null));
      }
    } catch (err) {
      dispatch(setError("An unexpected error occurred"));
    } finally {
      dispatch(stopLoading());
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
      dispatch(startLoading())
      const { isError } = await makeAPICallWithData(
        "post",
        "/crousel/addImage",
        formData
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
      dispatch(stopLoading());
    }
  };

  const handleEditCarousel = async (
    formData: FormData,
    id: string
  ) => {
    if (!id) {
      console.error("ID is required to update the carousel");
      return;
    }
    try {
      const { isError } = await makeAPICallWithData(
        "put",
        `/crousel/updateImage/${id}`,
        formData
      );
      if (!isError) {
        toast.success("Carousel updated successfully!");
        fetchCarousels();
      } else {
        toast.error("Failed to update carousel");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while updating the carousel");
    }
  };

  const handleDeleteCarousel = async (id: string) => {
    try {
      const { isError } = await makeAPICallWithOutData(
        "delete",
        `/crousel/deleteImage/${id}`
      );
      if (!isError) {
        toast.success("Carousel deleted successfully!");
        fetchCarousels();
      } else {
        toast.error("Failed to delete carousel");
      }
    } catch (err) {
      toast.error("An unexpected error occurred while deleting the carousel");
    }
  };

  const openEditModal = (carousel: any) => {
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
        onSubmit={async formData =>
          selectedCarousel
            ? handleEditCarousel(formData, selectedCarousel.id)
            : handleAddCarousel(formData)
        }
        carousel={selectedCarousel}
        carouselId={selectedCarousel?.id}
      />
      <ToastContainer />
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
