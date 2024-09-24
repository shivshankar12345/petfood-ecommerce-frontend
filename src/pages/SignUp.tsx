import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import LogIn from './LogIn';
import InputBox from '../components/InputBox';


interface IEmailInput {
  email: string;
}
interface IOTPInput {
    otp: string;
  }

const SignUp: React.FC = () => {
    //States
    const [step, setStep] = useState<'email' | 'otp' | 'details'>('email');
    const [email, setEmail] = useState<string>(''); 
    const [otpSent, setOtpSent] = useState<boolean>(false);

  //React Form Hook
  const { register:registerEmail, handleSubmit:handleEmailSubmit } = useForm<IEmailInput>();
  const { register: registerOTP, handleSubmit: handleOTPSubmit } = useForm<IOTPInput>();

  
  const onSubmitEmail: SubmitHandler<IEmailInput> = (data) => {
    setEmail(data.email);
    // Simulate sending OTP to the user's email here
    console.log(`Sending OTP to ${data.email}`);
    setOtpSent(true);
    setStep('otp');
  };

  const onSubmitOTP: SubmitHandler<IOTPInput> = (data) => {
    // Simulate OTP verification here
    console.log(`Verifying OTP: ${data.otp}`);
    if (data.otp === '123456') { // Simulate a correct OTP
      setStep('details');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };
  return (
    <div className="signup-form">
      {/* Step 1: Email Submission */}
      {step === 'email' && (    
        <InputBox
        id="email"
        label="Email"
        placeholder="Enter your email"
        type="email"
        register={registerEmail('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Enter a valid email address',
          },
        })}
        handleSubmit={handleEmailSubmit}
        onSubmit={onSubmitEmail}
        buttonText="Send OTP"
        value=""
      />
      )}

      {/* Step 2: OTP Submission */}
      {step === 'otp' && (
        <InputBox
        id='otp'
        label="OTP"
        placeholder="Enter the OTP sent to your email"
        type="text"
        register={registerOTP('otp', { required: 'OTP is required' })}
        handleSubmit={handleOTPSubmit}
        onSubmit={onSubmitOTP}
        buttonText="Verify OTP"
         value=""
      />
      )}
    
    {/* Step:3 Submitting the Personal Details */}
      { step ==="details" && (
           <LogIn email={email} ></LogIn>
        
      )}
    </div>
    
  );
};

export default SignUp;
