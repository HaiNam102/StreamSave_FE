import { useLanguage } from '../context/LanguageContext';

export const VideoSearch = ({ url, setUrl, onExtract, loading }: any) => {
  const { t } = useLanguage();

  return (
    <div className="relative group w-full">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative flex p-1.5 bg-[#131720] border border-gray-700/50 rounded-xl items-center shadow-2xl">
        <div className="pl-4 text-slate-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        </div>
        <input
          className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-slate-600 w-full font-medium"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t.search_placeholder}
          disabled={loading}
        />
        <button
          onClick={onExtract}
          disabled={loading || !url}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap shadow-lg shadow-blue-900/20 active:scale-95"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {t.btn_processing}
            </>
          ) : (
            <>
              {t.btn_download}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};