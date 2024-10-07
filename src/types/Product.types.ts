export interface Product {                                
    id: number;
    name: string;
    categoryId: number;
    price: number;
    description: string;
    stock: number;
    imageUrl: string;
    petType: string;
    createdAt: Date;
    updatedAt: Date;
  }