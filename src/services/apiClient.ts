import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/video", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động extract data từ ApiResponse
apiClient.interceptors.response.use(
  (response) => {
    // Nếu response có cấu trúc ApiResponse, extract data
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    console.error(`API Error: ${message}`);
    return Promise.reject(new Error(message));
  }
);

// Client riêng cho download tasks endpoint
export const downloadTasksClient = axios.create({
  baseURL: "http://localhost:8080/api/v1/download",
  headers: {
    "Content-Type": "application/json",
  },
});

downloadTasksClient.interceptors.response.use(
  (response) => {
    // Nếu response có cấu trúc ApiResponse, extract data
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return { ...response, data: response.data.data };
    }
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    console.error(`API Error: ${message}`);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;