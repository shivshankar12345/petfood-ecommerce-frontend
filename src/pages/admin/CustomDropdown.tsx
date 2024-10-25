import React, { useState } from "react";
import { FaCaretDown, FaEdit, FaTrash } from "react-icons/fa";
import useApi from "../../hooks/useApi"; 
import { Category } from "../../types/Category.types";
import { toast } from "react-toastify";

interface CustomDropdownProps {
  options: Category[]; 
  onSelect: (category: Category) => void; 
  selectedValue?: string; 
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, onSelect, selectedValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi(); 

  const handleEdit = async (category: Category) => {
    try {

      const { isError } = await makeAPICallWithData("put", `/product-category/update/id=${category.id}`, category);
      if (!isError) {
        toast.success("Category updated successfully");
      
        onSelect(category); 
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (category: Category) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      try {
        const { isError } = await makeAPICallWithOutData("delete", `/product-category/delete/id=${category.id}`);
        if (!isError) {
          toast.success("Category deleted successfully");
        } else {
          toast.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="relative">
      <div
        className="border rounded w-full py-2 px-3 text-gray-700 flex justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedValue || "Select a Category"}</span>
        <FaCaretDown />
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10">
          {options.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-2 hover:bg-gray-200">
              <span>{category.name}</span>
              <div className="flex">
                <FaEdit
                  onClick={() => handleEdit(category)} 
                  className="text-blue-500 cursor-pointer mx-1"
                />
                <FaTrash
                  onClick={() => handleDelete(category)} 
                  className="text-red-500 cursor-pointer mx-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
