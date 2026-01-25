import React from 'react';
import type { VideoInfoResponse } from '../types/video';
import { useLanguage } from '../context/LanguageContext';
import { videoService } from '../services/videoService';

interface VideoPreviewProps {
  url: string;
  info: VideoInfoResponse;
  onDownload: (formatId: number, task: string) => void;
  onReset: () => void;
  downloadingFormatId: number | null;
  isDownloading: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ url, info, onDownload, onReset, downloadingFormatId, isDownloading }) => {
  const { t } = useLanguage();

  if (!info) return null;

  const videoFormats = info.formats
    .filter(f => f.type === 'Video')
    .sort((a, b) => {
      const getRes = (q: string) => parseInt(q.match(/\d+/)?.[0] || '0');
      return getRes(b.mediaQuality) - getRes(a.mediaQuality);
    });
  const audioFormats = info.formats.filter(f => f.type === 'Audio');

  // Proxy the thumbnail using the original video URL
  const proxiedThumbnail = videoService.getProxyThumbnailUrl(url);

  return (
    <div className="bg-[#131720] rounded-3xl shadow-xl border border-slate-800 overflow-hidden mb-8 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-12">

        {/* Left Col: Info */}
        <div className="md:col-span-5 p-6 bg-[#0B0F19] border-r border-slate-800 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video mb-4 ring-1 ring-slate-700">
            <img
              src={proxiedThumbnail}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              alt="thumb"
            />
            <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold rounded uppercase">
              {info.platform}
            </div>
          </div>
          <h2 className="text-lg font-bold text-white line-clamp-3 leading-tight mb-4">
            {info.title}
          </h2>
          <div className="mt-auto flex items-center gap-3 text-xs font-medium text-slate-400">
            <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">{t.label_duration}: {videoFormats[0]?.mediaDuration || 'N/A'}</span>
          </div>
        </div>

        {/* Right Col: Download Options */}
        <div className="md:col-span-7 p-6 space-y-6">
          <div className="flex justify-between items-center bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">DOWNLOAD READY</span>
              <span className="text-sm font-medium text-slate-300">Nhập URL khác để tải video mới</span>
            </div>
            <button
              onClick={onReset}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Tải URL khác
            </button>
          </div>

          <section>
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">{t.quality_video}</h3>
            <div className="grid gap-3">
              {videoFormats.map((f) => (
                <button
                  key={f.mediaId}
                  onClick={() => onDownload(f.mediaId, f.mediaTask)}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl hover:border-blue-500 hover:bg-blue-600/10 transition-all disabled:opacity-50 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-slate-200 group-hover:text-white text-lg leading-none">{f.mediaQuality}</span>
                      <span className="text-[10px] text-slate-500 mt-1">{f.mediaRes}</span>
                    </div>
                    <div className="h-8 w-px bg-slate-700" />
                    <div className="text-xs text-slate-400 font-medium italic">
                      {f.mediaExtension} • {f.mediaFileSize}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {f.mediaTask === 'merge' && (
                      <span className="text-[9px] font-bold bg-amber-900/30 text-amber-500 border border-amber-500/20 px-2 py-1 rounded-md">{t.btn_high_process}</span>
                    )}

                    {downloadingFormatId === f.mediaId ? (
                      <div className="flex items-center gap-2 bg-blue-600/20 px-3 py-1.5 rounded-lg border border-blue-500/30">
                        <svg className="animate-spin h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span className="text-[10px] font-bold text-blue-400">Đang xử lý...</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-700 group-hover:bg-blue-600 flex items-center justify-center text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Audio Section */}
          {audioFormats.length > 0 && (
            <section className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">{t.quality_audio}</h3>
              {audioFormats.map((f) => (
                <button
                  key={f.mediaId}
                  onClick={() => onDownload(f.mediaId, f.mediaTask)}
                  disabled={isDownloading}
                  className="w-full flex items-center justify-between p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl hover:bg-indigo-900/20 transition-all group"
                >
                  <span className="font-bold text-indigo-300 flex items-center gap-2 italic">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
                    {f.mediaFileSize}
                  </span>

                  {downloadingFormatId === f.mediaId ? (
                    <div className="flex items-center gap-2 bg-indigo-600/20 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                      <svg className="animate-spin h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      <span className="text-[10px] font-bold text-indigo-400">Đang xử lý...</span>
                    </div>
                  ) : (
                    <span className="text-indigo-400 font-bold text-sm bg-indigo-900/50 px-3 py-1 rounded-lg">MP3</span>
                  )}
                </button>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};