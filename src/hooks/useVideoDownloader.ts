import { useState, useEffect, useRef, useCallback } from "react";
import { videoService } from "../services/videoService";
import type { Status, VideoInfoResponse } from "../types/video";

export const useVideoDownloader = () => {
    const [url, setUrl] = useState('');
    const [videoInfo, setVideoInfo] = useState<VideoInfoResponse | null>(null);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [currentStatus, setCurrentStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState(false);
    const [downloadingFormatId, setDownloadingFormatId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null); // New state for error handling

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Function to stop polling
    const stopPolling = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const handleExtract = useCallback(async () => {
        if (!url) return;

        setLoading(true);
        setError(null);
        setVideoInfo(null);
        setTaskId(null);
        setCurrentStatus(null);
        stopPolling();

        try {
            const response = await videoService.extractInfo(url);
            setVideoInfo(response);
        } catch (err: any) {
            setError(err.message || "Không thể lấy thông tin video. Vui lòng kiểm tra lại đường link.");
        } finally {
            setLoading(false);
        }
    }, [url]);

    const handleDownload = useCallback(async (formatId: number) => {
        setError(null);
        setDownloadingFormatId(formatId);
        try {
            const responseTaskId = await videoService.initDownload({
                videoUrl: url,
                formatId
            });
            setTaskId(responseTaskId);
            setCurrentStatus('PENDING');
        } catch (err: any) {
            setError(err.message || 'Lỗi không xác định khi khởi tạo tải xuống.');
            setCurrentStatus('FAILED');
            setDownloadingFormatId(null);
        }
    }, [url]);

    useEffect(() => {
        if (!taskId) {
            stopPolling();
            if (currentStatus !== 'PROCESSING' && currentStatus !== 'PENDING') {
                setDownloadingFormatId(null);
            }
            return;
        }

        const pollStatus = async () => {
            try {
                const res = await videoService.checkStatus(taskId);
                const newStatus = res.status as Status;

                // Only update if status has changed
                setCurrentStatus(prevStatus => {
                    if (prevStatus !== newStatus) {
                        if (newStatus === 'COMPLETED' || newStatus === 'FAILED') {
                            stopPolling();
                            setDownloadingFormatId(null);
                        }
                        return newStatus;
                    }
                    return prevStatus;
                });

            } catch (err: any) {
                setError(err.message || "Lỗi khi kiểm tra trạng thái xử lý video.");
                setCurrentStatus('FAILED');
                setDownloadingFormatId(null);
                stopPolling();
            }
        };

        // Start polling immediately and then set interval
        pollStatus();
        intervalRef.current = setInterval(pollStatus, 3000);

        // Cleanup function
        return () => stopPolling();
    }, [taskId]);

    const handleReset = useCallback(() => {
        setUrl('');
        setVideoInfo(null);
        setTaskId(null);
        setCurrentStatus(null);
        setError(null);
        setLoading(false);
        setDownloadingFormatId(null);
        stopPolling();
    }, []);

    return {
        url,
        setUrl,
        videoInfo,
        taskId,
        currentStatus,
        loading,
        downloadingFormatId,
        error,
        handleExtract,
        handleDownload,
        handleReset
    };
};
