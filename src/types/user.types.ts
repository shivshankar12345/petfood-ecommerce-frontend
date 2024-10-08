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
 
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;  // Making deleted_at optional
}
 
export interface UserTableProps {
  users: User[];
  loading: boolean;
  error: string | null;
}