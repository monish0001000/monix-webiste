import React from 'react';
import { Sparkles, Check, ShieldCheck, Cpu, Clock, Headphones, Smile, Search, Smartphone, Layers, BadgeIndianRupee } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { WHY_CHOOSE_US } from '../data/content';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = translations[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'BadgeIndianRupee': return <BadgeIndianRupee className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-10 sm:py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-500/20">
            Uncompromising Standards
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900">
            {t.whyTitle}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            {t.whySubtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gold-gradient mx-auto rounded-full mt-2"></div>
        </div>

        {/* 10 Feature Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-5">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-3.5 sm:p-5 rounded-2xl border border-amber-500/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 group-hover:bg-gold-gradient group-hover:text-slate-950 transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/10 text-emerald-700 flex items-center justify-center text-[10px] sm:text-xs font-bold">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>

                <h3 className="font-cinzel text-xs sm:text-base font-bold text-slate-900 mb-1 sm:mb-2 group-hover:text-amber-800 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-amber-500/10 flex items-center text-[9px] sm:text-[10px] font-extrabold text-amber-700 uppercase tracking-widest">
                <span>Verified Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
