import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "../env";
import apiClient from "../api/apiClient";

const useApi = () => {
  const makeAPICallWithData = async (
    method: "post" | "put" | "patch",
    path: string,
    body: any,
    headers?: AxiosRequestConfig
  ): Promise<{ isError: boolean; response?: AxiosResponse; error?: any }> => {
    try {
      const response = await apiClient[method](
        `${baseURL}${path}`,
        body,
        headers
      );
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
      const response = await apiClient[method](`${baseURL}${path}`, headers);
      return { isError: false, response };
    } catch (error) {
      console.log(error);
      return { isError: true, error };
    }
  };
  return { makeAPICallWithData, makeAPICallWithOutData };
};

export default useApi;
