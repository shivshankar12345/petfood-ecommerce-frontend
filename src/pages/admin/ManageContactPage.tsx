import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import TableLayout from "../../layout/TableLayout";
import useDebounce from "../../hooks/useDebounce";
import ContactTable from "../../components/Tables/ContactTable";
import { userConfirm } from "../../utils/Confirmation";

type Contact = {
  id: string;
  contact_type: "Email" | "Phone";
  contact: string;
};
const ManageContactPage = () => {
  const { makeAPICallWithOutData } = useApi();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    undefined
  );
  useEffect(() => {
    fetchContact();
  }, []);

  async function fetchContact() {
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      `/admin-panel/contact/getAllContact`
    );
    if (isError || !response) {
      toast.error(error?.response?.data?.message || "Network Error");
      return;
    }
    const { contacts } = response.data;
    setContacts(contacts);
  }

  async function deleteContact(id: string): Promise<any> {
    const confirmByUser = await userConfirm(
      "Are you Sure.?",
      "You want to delete this Contact",
      "Yes, Delete it",
      "warning",
      true,
      "red",
      "blue"
    );
    if (confirmByUser) {
      console.log("Confirmed");
    }
  }

  async function updateContact(data: {
    id: string;
    contact_type?: string;
    contact?: string;
  }) {}

  const openEditModal = (contact: Contact | null = null) => {
    setSelectedContact(contact);
    setShowModal(true);
  };
  return (
    <TableLayout
      title="Manage Contacts"
      searchPlaceholder="Search Contact..."
      searchValue={debouncedSearch}
      currentPage={currentPage}
      onSearchChange={e => setSearchTerm(e.target.value)}
      error={undefined}
      totalPages={totalPages}
      onPageChange={page => setCurrentPage(page)}
    >
      <div className="w-full h-full border border-gray-300 overflow-auto p-4">
        {/* Add Product Button */}
        <button
          onClick={() => {
            setSelectedContact(null);
            setShowModal(true);
          }}
          className=" p-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
        >
          Add Product
        </button>
        <ContactTable
          contacts={contacts}
          updateContact={updateContact}
          deleteContact={deleteContact}
        />
      </div>
      {/* <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={formData =>
          selectedProducts
            ? handleEditProduct(formData, selectedProducts.id)
            : handleAddProduct(formData)
        } // Pass id when editing
        product={selectedProducts}
        productId={selectedProducts?.id} // Pass the product ID here
      /> */}
    </TableLayout>
  );
};

export default ManageContactPage;
