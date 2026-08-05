import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Code, CheckCircle2, Headphones, Globe2 } from 'lucide-react';

interface StatsSectionProps {
  lang: Language;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  const stats = [
    { label: t.statsProjects, val: "MSME", icon: ShieldCheck, detail: lang === 'ta' ? "இந்திய அரசு சான்றிதழ்" : "Govt of India MSME Unit" },
    { label: t.statsStudents, val: "100%", icon: Code, detail: lang === 'ta' ? "நவீன Next.js & React" : "Modern Next.js & React" },
    { label: t.statsTech, val: "₹4,999*", icon: CheckCircle2, detail: lang === 'ta' ? "வெளிப்படையான சலுகைகள்" : "Transparent Package Pricing" },
    { label: t.statsSupport, val: "Direct", icon: Headphones, detail: lang === 'ta' ? "தொழில்நுட்ப ஆலோசனைகள்" : "Post-Launch Assistance" },
    { label: t.statsCountries, val: "Pan-India", icon: Globe2, detail: lang === 'ta' ? "ஆன்லைன் சேவை" : "Online Across All States" },
  ];

  return (
    <section className="py-8 sm:py-16 bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white relative overflow-hidden border-y border-amber-500/30">
      
      {/* Background Gold Shimmer Effects */}
      <div className="absolute inset-0 bg-gold-dark opacity-80 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6 text-center">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-amber-500/20 hover:border-amber-500/50 transition-all">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-2 sm:mb-3">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="font-cinzel text-2xl sm:text-4xl font-extrabold text-gold-gradient tracking-tight">
                  {item.val}
                </p>
                <p className="text-[11px] sm:text-sm font-bold text-amber-100 mt-0.5 sm:mt-1">
                  {item.label}
                </p>
                <p className="text-[9px] sm:text-[10px] text-amber-300/70 mt-0.5">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
