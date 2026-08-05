import React from 'react';
import { MessageSquareQuote, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TestimonialsSectionProps {
  lang: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-20 bg-white border-y border-amber-500/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Client Voices
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-slate-900">
            {t.testimonialsTitle}
          </h2>
          <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full mt-2"></div>
        </div>

        {/* Authentic Coming Soon Box */}
        <div className="max-w-3xl mx-auto glass-card p-10 rounded-3xl border border-amber-500/30 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 mx-auto gold-glow">
            <MessageSquareQuote className="w-8 h-8" />
          </div>

          <h3 className="font-cinzel text-2xl font-bold text-slate-900">
            {t.testimonialsComingSoon}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed max-w-lg mx-auto">
            {t.testimonialsSubtitle}
          </p>

          <div className="pt-2 flex items-center justify-center space-x-2 text-xs font-bold text-amber-800">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>100% Genuine Corporate & Student Feedback Policy</span>
          </div>
        </div>

      </div>
    </section>
  );
};
