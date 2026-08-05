import React from 'react';
import { PROCESS_TIMELINE } from '../data/content';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ProcessTimelineProps {
  lang: Language;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-10 sm:py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-500/20">
            Methodology
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900">
            {t.processTitle}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            {t.processSubtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gold-gradient mx-auto rounded-full mt-2"></div>
        </div>

        {/* Process Steps Timeline - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-7 gap-3 sm:gap-4 relative">
          {PROCESS_TIMELINE.map((item, index) => (
            <div
              key={index}
              className="glass-card p-3.5 sm:p-5 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 transition-all flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold-gradient text-slate-950 font-cinzel font-black text-xs sm:text-base flex items-center justify-center shadow-md mb-2.5 sm:mb-4 gold-glow">
                  {item.step}
                </div>
                <h3 className="font-cinzel text-xs sm:text-base font-bold text-slate-900 mb-1 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>

              <div className="mt-3 sm:mt-4 pt-2 border-t border-amber-500/10 flex items-center justify-between text-[9px] sm:text-[10px] text-amber-700 font-bold uppercase tracking-wider">
                <span>Phase {index + 1}</span>
                {index < PROCESS_TIMELINE.length - 1 && (
                  <span className="hidden lg:inline text-amber-400">→</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
