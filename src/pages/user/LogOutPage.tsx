import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAccessToken,
  clearRefreshToken,
  clearRole,
} from "../../Redux/Slice/auth.slice";

const LogOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(clearAccessToken());
    dispatch(clearRefreshToken());
    dispatch(clearRole());
    navigate("/");
  }, []);
  return <></>;
};

export default LogOutPage;
