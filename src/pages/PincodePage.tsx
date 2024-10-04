import React, { useState } from 'react';
import { PincodeModalProps } from '../types/common.types';
 
const PincodeModal: React.FC<PincodeModalProps> = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState('');
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the pincode submission logic here
    console.log('Pincode submitted:', pincode);
    onClose(); // Close
  };
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold text-center mb-6">Enter Pincode</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Pincode"
            className="border border-gray-300 rounded-md w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md px-4 py-2 hover:bg-indigo-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default PincodeModal;
 
 
