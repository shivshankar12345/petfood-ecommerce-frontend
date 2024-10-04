import axios from "axios";
import { baseURL } from "../env";

const useAPIs = () => {
  const makeAPICallWithData = async (
    method: "post" | "put" | "patch",
    path: string,
    body: any,
    headers?: any
  ) => {
    try {
      const response = await axios[method](`${baseURL}${path}`, body, headers);
      return { isError: false, response };
    } catch (error) {
      return { isError: true, error };
    }
  };
 
  const makeAPICallWithOutData = async (
    method: "get" | "delete",
    path: string,
    headers?: any
  ) => {
    try {
      const response = await axios[method](`${baseURL}${path}`, headers);
      return { isError: false, response };
    } catch (error) {
      return { isError: true, error };
    }
  };
 
  return { makeAPICallWithData, makeAPICallWithOutData };
};
 
export default useAPIs;