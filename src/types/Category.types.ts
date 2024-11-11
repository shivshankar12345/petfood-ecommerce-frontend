export interface Category {
  id?: string;
  name?: string;
  description: string;
}
export interface CategoryForm {
  categoryName: string;
  description: string;
}

export interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (newCategory: Category) => void;
}
