import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseurl = 'http://localhost:8080';

const useApi = () =>{
  const makeAPICallWithOutData = async<T = any,>(
    method: "post" | "put"| "patch",
    path: string,
    body:T,
    headers?:AxiosRequestConfig
  ):Promise<{isError:boolean;response?:AxiosResponse;error?:any}> =>{
    try{
      const response = await axios[method](`${baseurl}${path}`,body, headers);
      return {isError:false, response};
    }
    catch(error){
      return {isError:true,error};
    }
  };

  const makeAPICallWithData = async(
    method: "get" |"delete",
    path:string,
    headers?: AxiosRequestConfig
  ):Promise<{isError:boolean;response?:AxiosResponse;error?:any}> =>{
    try{
      const response = await axios[method](`${baseurl}${path}`, headers);
      return {isError:false,response}
    }
    catch(error){
      return {isError:true, error}
    }
  };
   return {makeAPICallWithOutData, makeAPICallWithData};
};
export default useApi;