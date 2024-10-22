import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../Redux/Slice/spinner.slice";

export const useLoaderService = () => {
  const dispatch = useDispatch();
  const startLoader = () => {
    dispatch(startLoading());
  };
  const stopLoader = () => {
    dispatch(stopLoading());
  };
  return { startLoader, stopLoader };
};
