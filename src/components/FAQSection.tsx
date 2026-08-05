import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { FAQS } from '../data/content';

interface FAQSectionProps {
  lang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const t = translations[lang];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-10 sm:py-20 bg-[#FAF8F5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-500/20">
            Got Questions?
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900">
            {t.faqTitle}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            {t.faqSubtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gold-gradient mx-auto rounded-full mt-2"></div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-xl sm:rounded-2xl border border-amber-500/25 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between space-x-3 sm:space-x-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                    <span className="font-cinzel text-sm sm:text-lg font-bold text-slate-900">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-600 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-amber-500/10 animate-fade-in">
                    <p className="pt-2 sm:pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
