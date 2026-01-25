import { useState, useEffect, useRef, useCallback } from "react";
import { videoService } from "../services/videoService";
import type { Status, VideoInfoResponse } from "../types/video";

export const useVideoDownloader = () => {
    const [url, setUrl] = useState('');
    const [videoInfo, setVideoInfo] = useState<VideoInfoResponse | null>(null);
    const [taskId, setTaskId] = useState<string | null>(null);
    const [currentStatus, setCurrentStatus] = useState<Status | null>(null);
    const [loading, setLoading] = useState(false);
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
        }
    }, [url]);

    useEffect(() => {
        if (!taskId) {
            stopPolling();
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
                        }
                        return newStatus;
                    }
                    return prevStatus;
                });

            } catch (err: any) {
                setError(err.message || "Lỗi khi kiểm tra trạng thái xử lý video.");
                setCurrentStatus('FAILED');
                stopPolling();
            }
        };

        // Start polling immediately and then set interval
        pollStatus();
        intervalRef.current = setInterval(pollStatus, 3000);

        // Cleanup function
        return () => stopPolling();
    }, [taskId]);

    return {
        url,
        setUrl,
        videoInfo,
        taskId,
        currentStatus,
        loading,
        error,
        handleExtract,
        handleDownload
    };
};
