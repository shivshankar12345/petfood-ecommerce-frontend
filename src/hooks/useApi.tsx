import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "../env";
 
const useApi = () => {
  const makeAPICallWithData = async (
    method: "post" | "put" | "patch",
    path: string,
    body: T,
    headers?: AxiosRequestConfig
  ): Promise<{ isError: boolean; response?: AxiosResponse; error?: any }> => {
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
    headers?: AxiosRequestConfig
  ): Promise<{ isError: boolean; response?: AxiosResponse; error?: any }> => {
    try {
      const response = await axios[method](`${baseURL}${path}`, headers);
      return { isError: false, response };
    } catch (error) {
      return { isError: true, error };
    }
  };
  return { makeAPICallWithData, makeAPICallWithOutData };
};
 
export default useApi;
 
