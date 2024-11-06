// src/types/Carousel.types.ts
export interface Carousel {
  id: string;
  name: string;
  imageUrl: string | File | null;
  priority: number;
}

export interface CarouselTableProps {
  carousels: Carousel[];
  loading: boolean;
  error: string | null;
  onEdit: (carousel: Carousel) => void;
  onDelete: (id: string) => void;
}

export interface AddCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData, carouselId?: string) => void;
  carousel?: CarouselFormValues;
  carouselId?: string;
}

export interface CarouselFormValues {
  priority: number;
  name: string;
  imageUrl: File | string | null;
}
