import React, { useEffect, useState } from "react";
import { InputProps } from "../types/common.types";

const InputBox: React.FC<InputProps> = ({
  id,
  type,
  label,
  placeholder,
  value,
  register,
  buttonText,
  disabled = false,
  handleSubmit,
  onSubmit,
}) => {
  const [expireTime, setExpireTime] = useState<number>(120);
  useEffect(() => {
    if (expireTime != 0) {
      window.setTimeout(() => {
        setExpireTime(expireTime - 1);
      }, 1000);
    }
  }, [expireTime]);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Conditional rendering for select options or input fields */}
      {type === "option" ? (
        <div className="w-full">
          <label
            htmlFor={id}
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            {label}
          </label>
          <select
            id={id}
            {...register}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
          >
            <option value="">Select your gender</option>
            <option value="m">Male</option>
            <option value="f">Female</option>
            <option value="o">Other</option>
          </select>
        </div>
      ) : (
        <div className="w-full">
          <label
            htmlFor={id}
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            value={value === "" ? undefined : value}
            {...register}
            disabled={disabled}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* Conditional rendering for the submit button */}
      {buttonText == "Verify OTP" && expireTime != 0 ? (
        <div className="text-end">Expired in : {expireTime}</div>
      ) : buttonText == "Verify OTP" ? (
        <div
          className="text-end text-red-500 cursor-pointer"
          onClick={e => {
            handleSubmit(onSubmit)(e);
            setExpireTime(120);
          }}
        >
          Resend Otp
        </div>
      ) : (
        ""
      )}
      {buttonText !== "" && (
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-400 transition-all transform hover:scale-105"
        >
          {buttonText}
        </button>
      )}
    </form>
  );
};

export default InputBox;
