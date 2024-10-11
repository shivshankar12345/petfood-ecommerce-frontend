import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setRole,
} from "../Redux/Slice/auth.slice";
import axios from "axios";
import { baseURL } from "../env";
import { IEmailInput, IOTPInput } from "../types/login.types";
import useAPIs from "./useApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSignUp = () => {
  const { makeAPICallWithData } = useAPIs();
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp" | "details">("email");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  const onSubmitEmail = async (data: IEmailInput) => {
    setEmail(data.email);
    const result = await makeAPICallWithData("post", "/users/sendOtp", {
      email: data.email,
    });
    const { response = null, isError } = result;
    if (isError || !response) {
      toast.error("Something went wrong !!");
      return;
    }
    if (response.data.success) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("otpId", response.data?.data.id);
      toast("Otp sent successfully");
      setStep("otp");
    }
  };

  const onSubmitOTP = async (data: IOTPInput) => {
    const resp = await axios.post(`${baseURL}/users/validateOtp`, {
      otp: data.otp,
      id: localStorage.getItem("otpId"),
      email: localStorage.getItem("email"),
    });

    if (resp.data.success) {
      const { accessToken, refreshToken } = resp.data;
      dispatch(setAccessToken({ accessToken }));
      dispatch(setRefreshToken({ refreshToken }));
      dispatch(setRole({ role: resp.data.role }));
      if (!resp.data.newUser) {
        localStorage.removeItem("otpId");
        localStorage.removeItem("email");
        navigate("/");
        return;
      }
      setStep("details");
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
