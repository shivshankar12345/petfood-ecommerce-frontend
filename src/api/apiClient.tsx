import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
 
// Create an instance of axios
const apiClient = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
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
  refreshSubscribers.forEach((cb) => cb(token));
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
  (error) => Promise.reject(error)
);
 
// Response interceptor to handle 403 errors and refresh token
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
 
    // Check for 403 Forbidden error and retry with refreshed token
    if (response && response.status === 403 && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        isRefreshing = true;
 
        try {
          const verifyResponse = await apiClient.post("/user/token", {
            refreshToken: localStorage.getItem("refreshToken"),
          });
 
          const { accessToken } = verifyResponse.data;
          localStorage.setItem("accessToken", accessToken);
          isRefreshing = false;
          onRefreshed(accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token expired", refreshError);
          isRefreshing = false;
          // Redirect to login page if refresh token is expired
          window.location.href = "/login"; // Change to your login page path
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }
    }
 
    return Promise.reject(error);
  }
);
 
export default apiClient;
 
