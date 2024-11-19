import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
 
// Create an instance of axios
const apiClient = axios.create({
  baseURL: "http://localhost:4000", // Base URL for your API
  timeout: 10000, // Timeout limit for requests
  headers: {
    "Content-Type": "application/json", // Default Content-Type for JSON requests
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
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = []; // Clear the subscribers after notifying
}
 
// Request interceptor to add the access token to headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Set 'Content-Type' based on the type of data being sent
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']; // Let the browser set it automatically for `FormData`
    } else {
      config.headers['Content-Type'] = 'application/json'; // Set for JSON payloads
    }
 
    // Skip authorization header for specific URLs
    if (
      !config.url?.includes("/images") &&
      !config.url?.includes(".jpg") &&
      !config.url?.includes(".png")
    ) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
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
          // Fetch the persisted state to get the refreshToken
          const persistedState = localStorage.getItem("persist:root");
          if (!persistedState) {
            // If there's no persisted state, direct user to login (refresh token is missing)
            window.location.href = "/login";
            return Promise.reject(error);
          }
 
          const parsedState = JSON.parse(persistedState);
          const refreshToken = parsedState.refreshToken; // Assuming refreshToken is stored like this
 
          // Request to refresh the token
          const verifyResponse = await apiClient.post("/users/refreshToken", {
            refreshToken,
          });
 
          const { accessToken } = verifyResponse.data;
 
          // Update the accessToken in persisted state
          parsedState.accessToken = accessToken; // Update access token in persisted state
          localStorage.setItem("persist:root", JSON.stringify(parsedState));
 
          // Notify all waiting subscribers with the new token
          isRefreshing = false;
          onRefreshed(accessToken);
 
          // Update the request with the new token and retry
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiClient(originalRequest); // Retry the original request
        } catch (refreshError) {
          console.error("Refresh token expired. Error details:", (refreshError as AxiosError).response || (refreshError as AxiosError).message);
          isRefreshing = false;
 
          // Clear the session and redirect to login if refresh fails
          localStorage.removeItem("persist:root");
          window.location.href = "/login"; // Redirect to login page
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