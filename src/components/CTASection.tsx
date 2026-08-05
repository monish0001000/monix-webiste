import React from 'react';
import { Sparkles, ArrowRight, PhoneCall, Mail } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface CTASectionProps {
  lang: Language;
  onOpenInquiry: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ lang, onOpenInquiry }) => {
  const t = translations[lang];

  return (
    <section className="py-10 sm:py-20 bg-gradient-to-br from-amber-950 via-slate-950 to-amber-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gold-dark opacity-90 pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-8">
        
        <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] sm:text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          <span>Transform Your Digital Vision Today</span>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-5xl font-black text-gold-gradient tracking-tight leading-tight">
          {t.ctaTitle}
        </h2>

        <p className="text-amber-100/80 text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {t.ctaSubtitle}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-10 py-4 bg-gold-gradient text-slate-950 font-bold text-base rounded-2xl shadow-xl gold-glow hover:scale-105 transition-all cursor-pointer flex items-center justify-center space-x-3"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>{t.ctaButton}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-center gap-6 text-xs text-amber-200/80">
          <span className="flex items-center">
            <PhoneCall className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            Direct Consultation Desk
          </span>
          <span>•</span>
          <span className="flex items-center">
            <Mail className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
            Fast Quote within 2 Hours
          </span>
        </div>

      </div>
    </section>
  );
};
