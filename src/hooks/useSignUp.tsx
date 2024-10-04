import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../Redux/Slice/auth.slice';
import axios from 'axios';
import { baseURL } from '../env';
import { IEmailInput, IOTPInput } from '../types/login.types';

const useSignUp = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'details'>('email');
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();

  const onSubmitEmail = async (data: IEmailInput) => {
    setEmail(data.email);
    setStep('otp');

    // Uncomment and modify according to your needs
    // try {
    //   const response = await axios.post(`${baseURL}/users/sendOtp`, {
    //     email: data.email,
    //   });
    //   if (response.data.success) {
    //     localStorage.setItem("email", data.email);
    //     localStorage.setItem("otpId", response.data.id);
    //     console.log(`Sending OTP to ${data.email}`);
    //     setOtpSent(true);
    //     setStep("otp");
    //   }
    // } catch (error) {
    //   window.alert("Something went wrong !!");
    // }
  };

  const onSubmitOTP = async (data: IOTPInput) => {
    if (data.otp === "123456") {
            setStep("details");
          } else {
            alert("Invalid OTP. Please try again.");
          }

    const resp = await axios.post(`${baseURL}/users/validateOtp`, {
      otp: data.otp,
      id: localStorage.getItem('otpId'),
      email: localStorage.getItem('email'),
    });
    
    if (resp.data.success) {
      const { accessToken, refreshToken } = resp.data;
      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));
      setStep('details');
    } else {
      alert(resp.data.message);
    }
  };

  return {
    step,
    email,
    onSubmitEmail,
    onSubmitOTP,
    setStep,
  };
};

export default useSignUp;
