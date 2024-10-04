import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

export interface InputProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    register: ReturnType<UseFormRegister<any>>;
    handleSubmit: UseFormHandleSubmit<any>;
    onSubmit: SubmitHandler<any>;
    buttonText: string;
    value: string;
    disabled?: boolean;
  }
  export interface NavbarProps {
    role: string; 
  }
  
  export interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    role: string; 
  }

  
  export interface ProductInputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    required?: boolean;
    buttonLabel?: string; 
    onButtonClick?: () => void; 
  }
  export interface PincodeModalProps {
    isOpen: boolean;
    onClose: () => void;
  }

