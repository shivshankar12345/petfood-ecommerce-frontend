import React, { useState, useRef, useEffect } from "react";
import { FaPencilAlt, FaTrash, FaEllipsisV } from "react-icons/fa";
import { ActionButtonsProps } from "../../types/user.types";

const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  isActive,
  onActivate,
  onDeactivate,
  onEdit,
  onDelete,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <div className="flex items-center space-x-2">
      <FaPencilAlt className="text-blue-500 cursor-pointer" title="Edit" onClick={()=>onEdit(id)} />
      <FaTrash className="text-red-500 cursor-pointer" title="Delete" onClick={() => onDelete(id)} />
      <FaEllipsisV className="text-gray-500 cursor-pointer" title="More" onClick={toggleDropdown} />

      {showDropdown && (
        <div className="absolute right-0 bottom-full bg-white shadow-lg p-2 rounded-lg z-10">
          {isActive ? (
            <button
              onClick={() => onDeactivate(id)}
              className="bg-red-500 text-white px-2 py-1 rounded block"
            >
              In Active
            </button>
          ) : (
            <button
              onClick={() => onActivate(id)}
              className="bg-green-500 text-white px-2 py-1 rounded block"
            >
              Active
            </button>
          )}
        </div>
      )}
    </div>
    
  );
};

export default ActionButtons;
