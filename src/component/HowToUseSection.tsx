import { useLanguage } from '../context/LanguageContext';

export const HowToUseSection = () => {
    const { t } = useLanguage();

    return (
        <div id="how-to-use" className="mb-32 scroll-mt-24">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-3">{t.how_title}</h2>
                <p className="text-slate-400">{t.how_subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 z-0"></div>

                {[
                    { step: t.step_1, title: t.step_1_title, desc: t.step_1_desc },
                    { step: t.step_2, title: t.step_2_title, desc: t.step_2_desc },
                    { step: t.step_3, title: t.step_3_title, desc: t.step_3_desc }
                ].map((item, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-3xl bg-[#0B0F19] border-4 border-slate-800 flex items-center justify-center mb-6 shadow-xl shadow-blue-900/10">
                            <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-600">{item.step}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
