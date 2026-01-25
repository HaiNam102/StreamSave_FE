import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-slate-800/50 bg-[#0B0F19] py-12 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-slate-700 rounded flex items-center justify-center text-white text-xs">S</div>
                    <span className="font-bold text-slate-200">StreamSave</span>
                </div>

                <div className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} {t.footer_rights}
                </div>

                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 cursor-pointer">🌐</div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 cursor-pointer">@</div>
                </div>
            </div>
        </footer>
    );
};
