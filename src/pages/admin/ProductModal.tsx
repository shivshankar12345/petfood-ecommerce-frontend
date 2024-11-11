import React, { useEffect, useState } from "react";
import ProductInputField from "../../components/admin/ProductInputField";
import { AddProductModalProps, Product } from "../../types/Product.types";
import { useForm, SubmitHandler } from "react-hook-form";
import useFilePreview from "../../hooks/useFilePreview";
import useApi from "../../hooks/useApi";
import { Category } from "../../types/Category.types";
import CategoryModal from "../admin/CategoryModal";
import CustomDropdown from "./CustomDropdown"; // Import CustomDropdown

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  productId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Product>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useFilePreview(selectedFile);
  const [imageName, setImageName] = useState<string | null>(null);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { makeAPICallWithOutData } = useApi();

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const { isError, response } = await makeAPICallWithOutData(
        "get",
        "/product-category/getAllCategories"
      );
      if (isError) {
        console.error("Unable to fetch categories");
        return;
      }
      setCategoriesList(response?.data);
    } catch (error) {
      console.error("Unexpected error while fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCategories();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (product) {
      Object.entries(product).forEach(([key, value]) => {
        if (key === "category" && value) {
          setValue("category", value.name);
        } else if (key === "petType" && value) {
          setValue("petType", value.name);
        } else {
          setValue(key as keyof Product, value as string | number | File);
        }
      });

      if (product.imageUrl) {
        if (typeof product.imageUrl === "string") {
          setPreview(product.imageUrl);
          setImageName(product.imageUrl.split("/").pop() || null);
        } else if (product.imageUrl instanceof File) {
          setPreview(null);
          setImageName(null);
        }
      } else {
        setPreview(null);
        setImageName(null);
      }

      setSelectedFile(null);
    } else {
      reset();
      setSelectedFile(null);
      setPreview(null);
      setImageName(null);
    }
  }, [product, reset, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setImageName(file ? file.name : null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const submitHandler: SubmitHandler<Product> = data => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const typedKey = key as keyof Product;
      if (typedKey === "imageUrl") {
        if (selectedFile) {
          formData.append(key, selectedFile);
        } else if (typeof product?.imageUrl === "string") {
          formData.append(key, product.imageUrl);
        }
      } else {
        formData.append(key, data[typedKey]?.toString() || "");
      }
    });
    onSubmit(formData, productId);
    handleClose();
  };

  const handleClose = () => {
    if(!product){
      reset({})
    }
    onClose();
    setSelectedFile(null);
    setImageName(null);
  };

  const handleCategoryAdded = (newCategory: Category) => {
    setCategoriesList(prev => [...prev, newCategory]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
     <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-auto pb-8">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProductInputField
              label="Product Name"
              type="text"
              placeholder="Enter product name"
              {...register("name", { required: "Product name is required" })}
            />
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Category
              </label>
              <div className="flex items-center">
                <select
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  defaultValue={product ? product.category?.name : ""}
                >
                  {isLoading ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      <option value="">Select a Category</option>
                      {categoriesList?.map(category => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <button
                  type="button"
                  className="ml-2 text-blue-600"
                  onClick={() => setIsCategoryModalOpen(true)} // Open the CategoryModal
                >
                  + {/* Plus icon */}
                </button>
              </div>
            </div>
          </div>

          {/* Seller ID */}
          <ProductInputField
            label="Seller ID"
            type="text"
            placeholder="Enter Seller ID"
            {...register("sellerId", { required: "Seller ID is required" })}
          />

          {/* Brand ID */}
          <ProductInputField
            label="Brand ID"
            type="text"
            placeholder="Enter Brand ID"
            {...register("brandId", { required: "Brand ID is required" })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-700">Rs.</span>
              <ProductInputField
                label="Price"
                type="number"
                placeholder="Enter product price"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <ProductInputField
              label="Stock"
              type="number"
              placeholder="Enter stock quantity"
              {...register("stock", {
                required: "Stock quantity is required",
                valueAsNumber: true,
              })}
            />
          </div>

          <ProductInputField
            label="Description"
            type="textarea"
            placeholder="Enter product description"
            {...register("description")}
          />

          <div className="flex items-center mb-4">
            <label className="block text-gray-700 font-bold mb-2 mr-4">
              Image Upload
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("imageUrl", {
                required: !product?.imageUrl ? "Image file is required" : false,
              })}
              className="hidden"
              onChange={handleFileChange}
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="border rounded py-2 px-3 mb-4 flex items-center cursor-pointer"
            >
              {imageName ? imageName : "No file chosen"}{" "}
              {/* Show the image name or default text */}
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

          {/* Use CustomDropdown for Pet Type selection */}
          <div className="flex items-center mb-4">
            <CustomDropdown
              setValue={setValue} // Set value for react-hook-form
              register={register}
              selectedPet={null}
              onAddProduct={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-600 px-4 py-2 rounded border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onCategoryAdded={handleCategoryAdded}
      />
    </div>
  );
};

export default AddProductModal;
