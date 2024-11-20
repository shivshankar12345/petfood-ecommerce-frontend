import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Create an instance of axios
const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});
 
// Flag to indicate whether a token refresh is in progress
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
 
// Function to add subscribers to the queue
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}
 
// Function to notify all subscribers
function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = []; // Clear the subscribers after notifying
}
 
// Request interceptor to add the access token to headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
 
// Response interceptor to handle 403 errors and refresh token
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // If the response is successful, return it
  async error => {
    const { config, response } = error;
    const originalRequest = config;
 
    // Check for 403 Forbidden error and retry with refreshed token
    if (response && response.status === 403 && response.data.tokenExpired) {
      if (!isRefreshing) {
        originalRequest._retry = true; // Mark the request to avoid retrying multiple times
        isRefreshing = true;
        try {
          const data = JSON.parse(
            localStorage.getItem("persist:root") as string
          );
          const refreshToken = JSON.parse(data.refreshToken as string);
          const verifyResponse = await apiClient.post("/users/refreshToken", {
            refreshToken,
          });

          const { accessToken } = verifyResponse.data;
          data.accessToken = JSON.stringify(accessToken);
          localStorage.setItem("persist:root", accessToken);
          isRefreshing = false;
          onRefreshed(accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired", refreshError);
          isRefreshing = false;
          // Redirect to login page if refresh token is expired
          // window.location.href = "/signout"; // Change to your login page path
          console.log("Inside");
          return Promise.reject(refreshError);
        }
      } else {
        // If the token refresh is already in progress, queue the original request
        return new Promise(resolve => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiClient(originalRequest)); // Retry the request with the new token
          });
        });
      }
    }
 
    return Promise.reject(error);
  }
);
 
export default apiClient;