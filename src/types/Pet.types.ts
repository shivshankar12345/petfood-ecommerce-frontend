export interface Pet{
    id:string;
    name?:string;
    description:string;
}

export interface PetTableProps{
    pets : Pet[];
    search?:string;
    onEdit: (pet: any) => void; 
    onDelete: (id: string) => void;
}