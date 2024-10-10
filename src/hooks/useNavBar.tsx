import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
