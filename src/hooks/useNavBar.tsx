// src/hooks/useNavbar.ts
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Query:', searchQuery);
  };

  useEffect(() => {
    // Close sidebar when location changes
    setIsSidebarOpen(false);
  }, [location]);

  return {
    isSidebarOpen,
    toggleSidebar,
    searchQuery,
    handleSearchChange,
    handleSearchSubmit,
  };
};

export default useNavbar;
