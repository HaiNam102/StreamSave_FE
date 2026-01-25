import { useLanguage } from '../context/LanguageContext';

export const HeroSection = ({ children }: { children: React.ReactNode }) => {
    const { t } = useLanguage();

    return (
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 mb-6 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    {t.hero_badge}
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                {t.hero_title_1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{t.hero_title_2}</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                {t.hero_subtitle}
            </p>

            {/* Search Component container */}
            <div className="max-w-2xl mx-auto mb-12">
                {children}

                <div className="flex items-center justify-center gap-6 mt-6 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> YouTube</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black border border-slate-600 rounded-full" /> TikTok</span>
                    <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Facebook</span>
                </div>
            </div>
        </div>
    );
};
