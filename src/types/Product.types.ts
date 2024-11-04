export interface Product {
  id?: string;
  name: string;
  category:{
    id:string;
    name:string;
  }
  price: number;
  description: string;
  stock: number;
  imageUrl: string | File | null;
  brandId: number;
  sellerId: number;
  petType: {
    id:string;
    name:string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductTableProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  search?: string;
  onEdit: (product: any) => void; // Function to handle edit action, takes the product ID
  onDelete: (id: string) => void;
}
export interface ProductInputFieldProps {
  label: string;
  type: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  rows?: number;
  cols?: number;
  accept?: string;
  name: string;
}
export interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, id?: string) => Promise<void>; // Include an optional ID parameter
  product?: Product; 
  productId?: string;
}
