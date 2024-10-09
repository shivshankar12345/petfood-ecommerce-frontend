export interface Seller {
  id: string;
  email: string;
  phone: string;
  gender: "m" | "f" | "o";
  is_active: boolean;
  gst_num: string;
  pan_num: string;
}
export interface SellerTableProps {
  seller: Seller[];
  loading: boolean;
  error: string | null;
  onSellerChange: () => void;
  selected: string;
}
