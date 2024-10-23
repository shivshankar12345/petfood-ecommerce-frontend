export type Contact = {
  id: string;
  contact_type: "Email" | "Phone";
  contact: string;
};

export type FormValues = {
  contact_type: "Phone" | "Email";
  contact: string;
};

export type ContactOptional = {
  id: string;
  contact_type?: string;
  contact?: string;
};

export type OptionalId = {
  id?: string;
};
