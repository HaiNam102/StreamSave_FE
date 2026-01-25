import { useLanguage } from '../context/LanguageContext';

export const FAQSection = () => {
    const { t } = useLanguage();

    return (
        <div id="faq" className="mb-32 scroll-mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-3">{t.faq_title}</h2>
                <p className="text-slate-400">{t.faq_subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { q: t.faq_1_q, a: t.faq_1_a },
                    { q: t.faq_2_q, a: t.faq_2_a },
                    { q: t.faq_3_q, a: t.faq_3_a },
                    { q: t.faq_4_q, a: t.faq_4_a },
                    { q: t.faq_5_q, a: t.faq_5_a },
                    { q: t.faq_6_q, a: t.faq_6_a }
                ].map((item, idx) => (
                    <div key={idx} className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-colors">
                        <h4 className="text-lg font-bold text-blue-100 mb-2">{item.q}</h4>
                        <p className="text-slate-400 text-sm">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
