import React from "react";
import { useForm } from "react-hook-form";
import InputBox from "../../components/InputBox";
import { IEmailInput,IOTPInput } from "../../types/login.types";
import useSignUp from "../../hooks/useSignUp";
import LogInPage from "./LogInPage";

const SignUpPage: React.FC = () => {
  const { step, email, onSubmitEmail, onSubmitOTP } = useSignUp();
  // React Form Hook
  const { register: registerEmail, handleSubmit: handleEmailSubmit } =
    useForm<IEmailInput>();
  const { register: registerOTP, handleSubmit: handleOTPSubmit } =
    useForm<IOTPInput>();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 font-inter">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 space-y-8 animate-fade-in">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          {step === "email" ? "Sign Up" : step === "otp" ? "Verify OTP" : "Complete Sign Up"}
        </h1>
        
        {/* Step 1: Email Submission */}
        {step === "email" && (
          <InputBox
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            register={registerEmail("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            })}
            handleSubmit={handleEmailSubmit}
            onSubmit={onSubmitEmail}
            buttonText="Send OTP"
            value=""
          />
        )}

        {/* Step 2: OTP Submission */}
        {step === "otp" && (
          <InputBox
            id="otp"
            label="OTP"
            placeholder="Enter the OTP sent to your email"
            type="text"
            register={registerOTP("otp", { required: "OTP is required" })}
            handleSubmit={handleOTPSubmit}
            onSubmit={onSubmitOTP}
            buttonText="Verify OTP"
            value=""
          />
        )}

        {/* Step 3: Submitting the Personal Details */}
        {step === "details" && (
          <div className="text-center">
            <LogInPage email={email} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;