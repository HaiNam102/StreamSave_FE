import { useLanguage } from '../context/LanguageContext';

export const Header = () => {
    const { t, language, setLanguage } = useLanguage();

    return (
        <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">StreamSave</span>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                <a href="#" className="hover:text-white transition-colors">{t.nav_home}</a>
                <a href="#how-to-use" className="hover:text-white transition-colors">{t.nav_how_to}</a>
                <a href="#faq" className="hover:text-white transition-colors">{t.nav_faq}</a>
            </nav>

            <div className="flex items-center gap-4">
                {/* Language Switcher */}
                <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLanguage('vn')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${language === 'vn' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        VN
                    </button>
                </div>

                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-blue-600/20 md:block hidden">
                    {t.btn_get_started}
                </button>
            </div>
        </header>
    );
};
