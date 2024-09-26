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
  