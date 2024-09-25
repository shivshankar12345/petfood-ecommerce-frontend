// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useState } from "react";
// import LogIn from "./LogIn";
// import InputBox from "../components/InputBox";
// import axios from "axios";
// import { baseURL } from "../env";
 
// interface IEmailInput {
//   email: string;
// }
// interface IOTPInput {
//   otp: string;
// }
 
// const SignUp: React.FC = () => {
//   //States
//   const [step, setStep] = useState<"email" | "otp" | "details">("email");
//   const [email, setEmail] = useState<string>("");
//   const [otpSent, setOtpSent] = useState<boolean>(false);
 
//   //React Form Hook
//   const { register: registerEmail, handleSubmit: handleEmailSubmit } =
//     useForm<IEmailInput>();
//   const { register: registerOTP, handleSubmit: handleOTPSubmit } =
//     useForm<IOTPInput>();
 
//   const onSubmitEmail: SubmitHandler<IEmailInput> = async (data) => {
//     // Simulate sending OTP to the user's email here
//      setEmail(data.email);
//     console.log(`Sending OTP to ${data.email}`);
//     setStep('otp');
//     // try {
//     //   const response = await axios.post(`${baseURL}/users/sendOtp`, {
//     //     email: data.email,
//     //   });
//     //   if (response.data.success) {
//     //     localStorage.setItem("email", data.email);
//     //     localStorage.setItem("otpId", response.data.id);
//     //     console.log(`Sending OTP to ${data.email}`);
//     //     setOtpSent(true);
//     //     setStep("otp");
//     //   }
//     // } catch (error) {
//     //   window.alert("Something went wrong !!");
//     // }
//   };
 
//   const onSubmitOTP: SubmitHandler<IOTPInput> = async (data) => {
//     console.log(`Verifying OTP: ${data.otp}`);
//     if (data.otp === '123456') {
//       setStep('details');
//     } else {
//       alert('Invalid OTP. Please try again.');
//     }
//     // Simulate OTP verification here
//     // const resp = await axios.post(`${baseURL}/users/validateOtp`, {
//     //   otp: data.otp,
//     //   id: localStorage.getItem("otpId"),
//     //   email: localStorage.getItem("email"),
//     // });
//     // if (resp.data.success) {
//     //   localStorage.removeItem("otpId");
//     //   setStep("details");
//     // } else {
//     //   alert(resp.data.message);
//     // }
//   };
//   return (
//     <div className="signup-form">
//       {/* Step 1: Email Submission */}
//       {step === "email" && (
//         <InputBox
//           id="email"
//           label="Email"
//           placeholder="Enter your email"
//           type="email"
//           register={registerEmail("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//               message: "Enter a valid email address",
//             },
//           })}
//           handleSubmit={handleEmailSubmit}
//           onSubmit={onSubmitEmail}
//           buttonText="Send OTP"
//           value=""
//         />
//       )}
 
//       {/* Step 2: OTP Submission */}
//       {step === "otp" && (
//         <InputBox
//           id="otp"
//           label="OTP"
//           placeholder="Enter the OTP sent to your email"
//           type="text"
//           register={registerOTP("otp", { required: "OTP is required" })}
//           handleSubmit={handleOTPSubmit}
//           onSubmit={onSubmitOTP}
//           buttonText="Verify OTP"
//           value=""
//         />
//       )}
 
//       {/* Step:3 Submitting the Personal Details */}
//       {step === "details" && <LogIn email={email}></LogIn>}
//     </div>
//   );
// };
 
// export default SignUp;

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import LogIn from "./LogIn";
import InputBox from "../components/InputBox";

interface IEmailInput {
  email: string;
}
interface IOTPInput {
  otp: string;
}

const SignUp: React.FC = () => {
  // States
  const [step, setStep] = useState<"email" | "otp" | "details">("email");
  const [email, setEmail] = useState<string>("");

  // React Form Hook
  const { register: registerEmail, handleSubmit: handleEmailSubmit } =
    useForm<IEmailInput>();
  const { register: registerOTP, handleSubmit: handleOTPSubmit } =
    useForm<IOTPInput>();

  // Handlers
  const onSubmitEmail: SubmitHandler<IEmailInput> = async (data) => {
    setEmail(data.email);
    setStep("otp");
  };

  const onSubmitOTP: SubmitHandler<IOTPInput> = async (data) => {
    if (data.otp === "123456") {
      setStep("details");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

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
            <LogIn email={email} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;