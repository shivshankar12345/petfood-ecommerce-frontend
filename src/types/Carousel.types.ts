// src/types/Carousel.types.ts
export interface Carousel {
  id: string;
  name: string;
  imageUrl: string | File | null;
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
  name: string;
  imageUrl: File | string |null;

}
