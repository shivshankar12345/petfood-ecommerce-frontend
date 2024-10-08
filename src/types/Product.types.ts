export interface Product {
  id?: string;
  name: string;
  categoryId: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string | File | null; // Allow for either a string URL or a File object
  brandId?: number;
  sellerId: number;
  petType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductTableProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}
export interface ProductInputFieldProps {
  label: string;
  type: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  rows?: number;
  cols?: number;
  accept?: string;
  name:string;
}
export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void; 
}