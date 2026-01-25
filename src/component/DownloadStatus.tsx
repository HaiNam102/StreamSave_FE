import { videoService } from '../services/videoService';
import { useLanguage } from '../context/LanguageContext';

const LoadingSpinner = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const DownloadStatus = ({ status, taskId }: any) => {
  const { t } = useLanguage();

  if (!status) return null;

  const renderContent = () => {
    switch (status) {
      case 'PROCESSING':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-blue-900/10 border-2 border-dashed border-blue-500/20 backdrop-blur-sm">
            <div className="flex items-center text-lg font-semibold text-blue-200">
              <LoadingSpinner />
              <span>{t.status_processing}</span>
            </div>
            <p className="text-blue-400 mt-2 text-sm">{t.status_desc}</p>
          </div>
        );

      case 'COMPLETED':
        if (!taskId) return null;
        return (
          <div className="text-center p-8 rounded-2xl bg-green-900/10 border-2 border-dashed border-green-500/20 backdrop-blur-sm">
            <p className="text-2xl font-black text-green-300 mb-2">{t.status_ready}</p>
            <p className="text-green-400 mb-6 font-medium">{t.status_click}</p>
            <a
              href={videoService.getDownloadUrl(taskId)}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-500/20 transform hover:scale-105 hover:shadow-green-500/40 transition-all duration-300 animate-bounce"
              style={{ animationIterationCount: 3 }}
              download
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t.btn_download_now}
            </a>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-8">
      {renderContent()}
    </div>
  );
};