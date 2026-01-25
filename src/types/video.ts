export type Status = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface VideoFormat {
    type: string;
    name: string;
    mediaId: number;
    mediaUrl: string;
    mediaPreviewUrl: string;
    mediaThumbnail: string;
    mediaRes: string;
    mediaQuality: string;
    mediaDuration: string;
    mediaExtension: string;
    mediaFileSize: string;
    mediaTask: string;
}

export interface VideoMetaData {
    id: string;
    title: string;
    thumbnailUrl: string;
    platform: string;
}

export interface VideoInfoResponse {
    title: string;
    thumbnail: string;
    platform: string;
    formats: VideoFormat[];
}

export interface DownloadVideoRequest {
    videoUrl: string;
    formatId: number;
    quality?: string;
}

export interface DownloadTasksRes {
    id: string;
    originalUrl: string;
    VideoMetaData: VideoMetaData;
    status: Status;
    format: string;
    quality: string;
    fileSizeBite: number;
    downLoadLink: string;
    errorMess: string;
    clientIp: string;
    createAt: string;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}