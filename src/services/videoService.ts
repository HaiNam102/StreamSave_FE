import axios from "axios";
import type { VideoInfoResponse, DownloadTasksRes, ApiResponse } from "../types/video";

// Use environment variable or fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
const API_BASE = `${API_BASE_URL}/v1/video`;
const DOWNLOAD_API_BASE = `${API_BASE_URL}/v1/download`;

// Tạo một instance để cấu hình dùng chung
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});


export const videoService = {
  extractInfo: async (url: string): Promise<VideoInfoResponse> => {
    const response = await apiClient.post<ApiResponse<VideoInfoResponse>>(
      '/extract',
      { url },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.data;
  },

  initDownload: async (payload: { videoUrl: string, formatId: number }): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>('/download', payload);
    return response.data.data;
  },

  checkStatus: async (taskId: string): Promise<DownloadTasksRes> => {
    const response = await axios.get<ApiResponse<DownloadTasksRes>>(`${DOWNLOAD_API_BASE}/status/${taskId}`);
    return response.data.data;
  },

  getDownloadUrl: (taskId: string) => `${API_BASE}/files/${taskId}`,
  getProxyThumbnailUrl: (url: string) => `${API_BASE}/proxy-thumbnail?url=${encodeURIComponent(url)}`
};