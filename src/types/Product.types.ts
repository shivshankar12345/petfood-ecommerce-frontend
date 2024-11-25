export interface Product {
  discounted_price: number;
  discounted_percentage:number;
  IsFeatured: any;
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
  search?: string;
  onEdit: (product: any) => void; 
  onDelete: (id: string) => void;
  toggleFeatured:(id:string,IsFeatured:boolean) => void;
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
  onSubmit: (formData: FormData, id?: string) => Promise<void>; 
  product?: Product; 
  productId?: string;
}
