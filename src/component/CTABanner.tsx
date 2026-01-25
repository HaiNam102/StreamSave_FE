import { useLanguage } from '../context/LanguageContext';

export const CTABanner = () => {
    const { t } = useLanguage();

    const handleTryNow = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative rounded-3xl overflow-hidden bg-blue-600 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-900/50">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="relative z-10 text-center md:text-left">
                <h2 className="text-3xl font-bold text-white mb-4">{t.cta_title}</h2>
                <p className="text-blue-100 max-w-md">{t.cta_desc}</p>
                <div className="flex gap-4 mt-8 justify-center md:justify-start">
                    <button onClick={handleTryNow} className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-lg">{t.cta_btn_try}</button>
                </div>
            </div>

            <div className="relative z-10 w-full md:w-auto bg-blue-500/30 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30 min-w-[300px]">
                <div className="space-y-4">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center gap-4 p-3 bg-blue-600/50 rounded-lg border border-blue-500/30">
                            <span className="w-8 h-8 flex items-center justify-center bg-white text-blue-600 font-bold rounded-full text-sm">{step}</span>
                            <span className="text-white font-medium text-sm">
                                {step === 1 ? t.cta_step_1 : step === 2 ? t.cta_step_2 : t.cta_step_3}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
