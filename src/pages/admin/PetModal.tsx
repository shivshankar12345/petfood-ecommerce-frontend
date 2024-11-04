import  { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Pet } from "../../types/Pet.types";
import React from "react";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, petId?: string) => void; 
  petId?: string;
  pets: Pet;
}

const AddPetModal: React.FC<AddPetModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  petId,
  pets,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pet>();

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    reset({
      ...pets
    })
  }, [ pets, reset]);

  const onSubmitHandler: SubmitHandler<Pet> = (data:Pet) => {
    const formData = new FormData();
    
    onSubmit(, petId);
    handleClose();
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {petId ? "Edit Pet" : "Add Pet"}
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Pet Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Pet name is required" })}
              className={`border rounded w-full p-2 ${
                errors.name ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.name} 
              aria-describedby="nameError" 
            />
            {errors.name && (
              <p id="nameError" className="text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`border rounded w-full p-2 ${
                errors.description ? "border-red-500" : ""
              }`}
              aria-invalid={!!errors.description} 
              aria-describedby="descriptionError"
            />
            {errors.description && (
              <p id="descriptionError" className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              {petId ? "Update Pet" : "Add Pet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
