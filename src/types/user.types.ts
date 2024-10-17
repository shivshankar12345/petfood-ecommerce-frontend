export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  role: string;
  pan_num: string;
  rating: number;
  gst_num: string;
  is_verfied: boolean;
  is_Blocked: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null; // Making deleted_at optional
}

export interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
  onUserChange: () => void;
  selectedStatus:string;
}

export interface ActionButtonsProps {
  id: string;
  isActive: boolean;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onEdit: (id: string) => void; // Added Edit functionality
  onDelete: (id: string) => void; // Added Delete functionality
}
