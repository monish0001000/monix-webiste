import React from 'react';
import { Shield, Smartphone, Lock, Headphones, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface TrustBarProps {
  lang: Language;
}

export const TrustBar: React.FC<TrustBarProps> = ({ lang }) => {
  const t = translations[lang];

  const items = [
    { icon: Shield, text: t.trustMsme },
    { icon: Smartphone, text: t.trustResponsive },
    { icon: Lock, text: t.trustSecurity },
    { icon: Headphones, text: t.trustSupport },
    { icon: Globe, text: t.trustPanIndia },
  ];

  return (
    <div className="w-full bg-slate-950 text-amber-100 py-0.5 sm:py-2.5 border-y border-amber-500/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex flex-wrap items-center justify-center lg:justify-between gap-y-2 gap-x-6 text-xs lg:text-sm font-medium">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-2 text-amber-200/90 hover:text-amber-400 transition-colors">
                <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="tracking-wide">{item.text}</span>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Clean Centered Badges - 100% Responsive, No Scrollbars */}
        <div className="flex md:hidden flex-wrap items-center justify-center gap-1.5 py-1 px-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[9.5px] font-semibold text-amber-200/90"
              >
                <Icon className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                <span className="tracking-tight">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
