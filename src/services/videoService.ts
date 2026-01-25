import axios from "axios";
import type { VideoInfoResponse, DownloadTasksRes, ApiResponse } from "../types/video";

const API_BASE = 'http://localhost:8080/api/v1/video';

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

  initDownload: async (payload: { videoUrl: string, formatId: String }): Promise<string> => {
    const response = await apiClient.post<ApiResponse<string>>('/download', payload);
    return response.data.data;
  },

  checkStatus: async (taskId: string): Promise<DownloadTasksRes> => {
    const response = await axios.get<ApiResponse<DownloadTasksRes>>(`http://localhost:8080/api/v1/download/status/${taskId}`);
    return response.data.data;
  },

  getDownloadUrl: (taskId: string) => `${API_BASE}/files/${taskId}`,
  getProxyThumbnailUrl: (url: string) => `${API_BASE}/proxy-thumbnail?url=${encodeURIComponent(url)}`
};