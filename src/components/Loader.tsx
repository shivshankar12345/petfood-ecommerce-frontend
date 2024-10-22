import React from "react";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { RootState } from "../Redux/store";

const Loader: React.FC = () => {
  const { loading } = useSelector((state: RootState) => state.spinner);
  if (!loading) {
    return;
  }
  return (
    <SyncLoader
      size={12}
      color="white"
      cssOverride={{
        position: "absolute",
        border: "1px solid black",
        height: "100%",
        width: "100%",
        margin: "0px",
        color: "white",
      }}
    />
  );
};

export default Loader;
