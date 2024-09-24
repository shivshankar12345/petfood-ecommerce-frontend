import React from "react";
import { SubmitHandler,UseFormHandleSubmit, UseFormRegister} from "react-hook-form";

interface InputProps {
    id:string;
    label:string;
    type:string;
    placeholder:string;
    register: ReturnType<UseFormRegister<any>>;
    handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  buttonText: string;
  value:string;
  }

const InputBox: React.FC<InputProps>  = ({  id,type, label, placeholder,value, register,buttonText,handleSubmit,onSubmit }) => {
  return (
    <>
       <form onSubmit={handleSubmit(onSubmit)}>
        {(type === "option") ? ( <div className="Email-form">
          <label htmlFor={id}>{label} :</label>
          <select
            id={id}
            {... register}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>  ) :  ( <div className="Details-form">
        <label htmlFor={id}>{label} : </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value === '' ? undefined: value}
          {... register}
        />
      </div>) }
        {buttonText != "" && ( <button type="submit">{buttonText}</button>)}
    </form>
    </>
  );
};

export default InputBox;
