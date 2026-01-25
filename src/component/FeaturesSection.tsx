import { useLanguage } from '../context/LanguageContext';

export const FeaturesSection = () => {
    const { t } = useLanguage();

    return (
        <div className="mt-24 mb-32">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-3">{t.feat_title}</h2>
                <p className="text-slate-400">{t.feat_subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { title: t.feat_1_title, desc: t.feat_1_desc, icon: "HD", color: "blue" },
                    { title: t.feat_2_title, desc: t.feat_2_desc, icon: "🚫", color: "indigo" },
                    { title: t.feat_3_title, desc: t.feat_3_desc, icon: "⚡", color: "purple" }
                ].map((feature, idx) => (
                    <div key={idx} className="p-8 bg-slate-800/50 border border-slate-700/50 rounded-2xl hover:bg-slate-800 transition-all group">
                        <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center text-xl font-bold text-${feature.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
