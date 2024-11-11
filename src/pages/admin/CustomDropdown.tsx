import { useState, useRef, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { deletePet,fetchPets } from "../../Redux/Slice/Pet.slice";
import { Pet } from "../../types/Pet.types";
import { toast } from "react-toastify";


interface CustomDropdownProps {
  selectedPet: Pet | null;
  setValue: any;
  register: any;
  onAddProduct: (pet: Pet) => void;
}

const CustomDropdown = ({ setValue, register }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const pets = useSelector((state: RootState) => state.pets.pets);

  const handleDelete = (pet: Pet) => {
    dispatch(deletePet({ id: pet.id }));
    toast.success("deleted pet successfully");
    dispatch(fetchPets({ currentPage: 1, search: "" })); 
  };

  const handleEdit = (pet: Pet) => {
    console.log("Edit pet:", pet);
  };

  const handleSelectPet = (pet: Pet) => {
    setValue("petType", pet.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative mt-4">
   <label htmlFor="petType" className="block text-lg font-bold text-gray-800 mb-2">
  Select Pet Type
</label>


      <div className="relative">
        <input
          id="petType"
          type="text"
          {...register("petType", { required: "Pet type is required" })}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
          placeholder="Select Pet"
        />
        <FaCaretDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onMouseEnter={() => {
            if (!isOpen) {
              dispatch(fetchPets({ currentPage: 1, search: "" })); 
            }
            setIsOpen(!isOpen);
          }}
        />

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-300 z-50 max-h-60 overflow-y-auto"
          >
            <div className="p-2 space-y-2">
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="flex justify-between items-center p-2 hover:bg-pink-50 cursor-pointer transition duration-200 ease-in-out"
                    onClick={() => handleSelectPet(pet)}
                  >
                    <span className="text-gray-800">{pet.name}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(pet);
                        }}
                        className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(pet);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 p-2">No pets available</div>
              )}
            </div>
            <div className="flex justify-end p-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-red-500 mt-1">
        {register?.petType?.error?.message}
      </div>
    </div>
  );
};

export default CustomDropdown;
