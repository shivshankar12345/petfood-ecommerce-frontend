import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useFilePreview from "../../hooks/useFilePreview";
import {
  AddCarouselModalProps,
  CarouselFormValues,
} from "../../types/Carousel.types";

const AddCarouselModal: React.FC<AddCarouselModalProps> = ({ 
  isOpen,
  onClose,
  onSubmit,
  carousel,
  carouselId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<CarouselFormValues>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useFilePreview(selectedFile);
  const [imageName, setImageName] = useState<string | null>(null);
  console.log(watch());
  useEffect(() => {
    if (carousel) {
      Object.entries(carousel).forEach(([key, value]) => {
        setValue(key as keyof CarouselFormValues, value);
      });
      if (typeof carousel.imageUrl === "string") {
        setPreview(carousel.imageUrl);
        setSelectedFile(null);
        setImageName((carousel.imageUrl as string).split("/").pop() || null);
      }
    } else {
      reset();
      setSelectedFile(null);
      setPreview(null);
      setImageName(null);
    }
  }, [carousel, reset, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValue("imageUrl", event.target.files?.[0] as File);
    setSelectedFile(file);
    setImageName(file ? file.name : null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const submitHandler: SubmitHandler<CarouselFormValues> = async data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const typedKey = key as keyof CarouselFormValues;
      if (typedKey === "imageUrl") {
        if (selectedFile) {
          formData.append(key, selectedFile);
        } else if (typeof carousel?.imageUrl === "string")  {
          formData.append(key, carousel.imageUrl);
        }
      } else {
        formData.append(key, data[typedKey]?.toString() || "");
      }
    });
    onSubmit(formData, carouselId);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
    setSelectedFile(null);
    setImageName(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          {carousel ? "Edit Carousel" : "Add Carousel"}
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <label className="block text-gray-700 font-bold mb-2">
              Carousel Name
            </label>
            <input
              type="text"
              placeholder="Enter carousel name"
              className="border rounded w-full py-2 px-3 text-gray-700"
              {...register("name", { required: "Carousel name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 font-bold mb-2 mr-4">
              Image Upload
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("imageUrl", {
                // required: { value: true, message: "This field is required" },
                validate: data => {
                  if (!data) {
                    return "This field is Required !!";
                  }
                },
              })}
              className="hidden"
              onChange={handleFileChange}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="border rounded py-2 px-3 mb-4 flex items-center cursor-pointer"
            >
              {imageName ? imageName : "No file chosen"}
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded ml-4"
              />
            )}
          </div>
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
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

export default AddCarouselModal;
