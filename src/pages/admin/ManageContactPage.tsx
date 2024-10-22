import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import TableLayout from "../../layout/TableLayout";
import useDebounce from "../../hooks/useDebounce";
import ContactTable from "../../components/Tables/ContactTable";
import { userConfirm } from "../../utils/Confirmation";
import AddContactModal from "./ContactModal";
import {
  Contact,
  ContactOptional,
  FormValues,
  OptionalId,
} from "../../types/contact.types";

const ManageContactPage = () => {
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
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
      const { isError, error } = await makeAPICallWithOutData(
        "delete",
        `/admin-panel/contact/deleteContact?id=${id}`
      );
      if (isError) {
        toast.error(
          error?.response?.data?.message || "Something went wrong !!"
        );
        return;
      }

      toast.success("Contact Deleted Successfully !!");
      fetchContact();
    }
  }

  const handleShow = (contact: Contact | null = null) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  function onSubmit(data: FormValues & OptionalId) {
    if (data.id) {
      updateContact(data as Contact);
    } else {
      addContact(data);
    }
  }

  async function addContact(data: FormValues): Promise<void> {
    const { contact, contact_type } = data;
    const { isError, error } = await makeAPICallWithData(
      "post",
      "/admin-panel/contact/addContact",
      { contact, contact_type }
    );
    if (isError) {
      toast.error(error?.response?.data?.message || "Something went wrong !!");
      return;
    }
    toast.success("Added Successfully !!");
    fetchContact();
  }
  async function updateContact(data: Contact) {
    const { isError, error } = await makeAPICallWithData(
      "patch",
      "/admin-panel/contact/updateContact",
      data
    );
    if (isError) {
      toast.error(error?.response?.data?.message);
      return;
    }

    toast.success("Contact updated !!");
    fetchContact();
  }
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
          Add Contact
        </button>
        <ContactTable
          contacts={contacts}
          deleteContact={deleteContact}
          handleShow={handleShow}
        />
      </div>
      <AddContactModal
        isOpen={showModal}
        contact={selectedContact}
        id={selectedContact?.id || null}
        handleClose={() => {
          setSelectedContact(null);
          setShowModal(false);
        }}
        onSubmit={onSubmit}
      />
    </TableLayout>
  );
};

export default ManageContactPage;
