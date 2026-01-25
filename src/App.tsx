import { useVideoDownloader } from './hooks/useVideoDownloader';
import { VideoSearch } from './component/VideoSearch';
import { VideoPreview } from './component/VideoPreview';
import { DownloadStatus } from './component/DownloadStatus';
import { Header } from './component/Header';
import { HeroSection } from './component/HeroSection';
import { FeaturesSection } from './component/FeaturesSection';
import { HowToUseSection } from './component/HowToUseSection';
import { FAQSection } from './component/FAQSection';
import { CTABanner } from './component/CTABanner';
import { Footer } from './component/Footer';
import { ErrorDisplay } from './component/ErrorDisplay';

export default function App() {
  const {
    url,
    setUrl,
    videoInfo,
    taskId,
    currentStatus,
    loading,
    error,
    handleExtract,
    handleDownload
  } = useVideoDownloader();

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <Header />

      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-6 pt-16 pb-24">

        <HeroSection>
          <VideoSearch
            url={url}
            setUrl={setUrl}
            onExtract={handleExtract}
            loading={loading}
          />
        </HeroSection>

        <ErrorDisplay error={error || ''} />

        {videoInfo && (
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <VideoPreview
              info={videoInfo}
              onDownload={handleDownload}
              isDownloading={currentStatus === 'PROCESSING'}
            />
          </div>
        )}

        {taskId && (
          <div className="max-w-2xl mx-auto mt-6">
            <DownloadStatus status={currentStatus} taskId={taskId} />
          </div>
        )}

        {!videoInfo && !loading && (
          <>
            <FeaturesSection />
            <HowToUseSection />
            <FAQSection />
            <CTABanner />
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}