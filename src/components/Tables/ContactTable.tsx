import DataTable, { TableColumn } from "react-data-table-component";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Contact } from "../../types/contact.types";

type ContactProps = {
  contacts: Contact[];
  deleteContact: (id: string) => Promise<void>;
  handleShow: (contact: Contact | null) => void;
};
const ContactTable: React.FC<ContactProps> = ({
  contacts,
  deleteContact,
  handleShow,
}) => {
  const columns: TableColumn<Contact>[] = [
    {
      name: "ID",
      sortable: true,
      selector: (row: Contact) => row.id,
      center: true,
    },
    {
      name: "Contact Type",
      sortable: true,
      selector: (row: Contact) => row.contact_type,
      center: true,
    },
    {
      name: "Contact",
      sortable: true,
      selector: (row: Contact) => row.contact,
      center: true,
    },
    {
      name: "Actions",
      cell: (row: Contact) => (
        <div className="flex items-center space-x-2">
          <FaPencilAlt
            className="text-blue-500 cursor-pointer"
            title="Edit"
            onClick={() => handleShow(row)}
          />
          <FaTrash
            className="text-red-500 cursor-pointer"
            title="Delete"
            onClick={() => deleteContact(row.id)}
          />
        </div>
      ),
      center: true,
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        data={contacts}
        highlightOnHover
        striped
        pointerOnHover
        persistTableHead
      />
    </>
  );
};
export default ContactTable;
