import React, { useEffect } from "react";
import { FormValues } from "../../types/contact.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { Contact } from "../../types/contact.types";

type AddContactModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onSubmit: (formData: FormValues) => void;
  contact: Contact | null;
  id: string | null;
};

const AddContactModal: React.FC<AddContactModalProps> = ({
  isOpen,
  handleClose,
  onSubmit,
  contact,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  // Close modal and reset the form
  function onClose() {
    reset({});
    handleClose();
  }

  // Reset form with contact data if available
  useEffect(() => {
    reset(contact || {});
  }, [contact]);

  // Submit handler for the form
  const onFormSubmit: SubmitHandler<FormValues> = data => {
    reset({});
    onSubmit(data); // Use the onSubmit prop to pass the data
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          {contact ? "Edit Contact" : "Add Contact"}
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 md:grid-cols-1 gap-4">
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Contact Type
              </label>
              <select
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("contact_type", {
                  required: "Contact Type is required",
                })}
              >
                <option value="" disabled selected>
                  Select Contact Type
                </option>
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
              </select>
              {errors.contact_type && (
                <p className="text-red-500 text-xs italic">
                  {errors.contact_type.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Contact
              </label>
              <input
                type="text"
                placeholder="Enter Contact..."
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("contact", {
                  required: "Contact is required",
                })}
              />
              {errors.contact && (
                <p className="text-red-500 text-xs italic">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;
