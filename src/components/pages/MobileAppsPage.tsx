import React from 'react';
import { Smartphone, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { MOBILE_CATEGORIES } from '../../data/content';

interface MobileAppsPageProps {
  lang: Language;
  onOpenInquiryWithCategory: (category: string) => void;
  onSelectCategoryDetail: (catTitle: string, serviceType: 'mobile') => void;
}

export const MobileAppsPage: React.FC<MobileAppsPageProps> = ({
  lang,
  onOpenInquiryWithCategory,
  onSelectCategoryDetail,
}) => {
  const t = translations[lang];

  const features = [
    "Android & iOS Dual Publishing", "Flutter & React Native Frameworks",
    "Real-time Push Notifications", "Integrated Payment Gateways",
    "Secure REST / GraphQL APIs", "Admin Control Web Dashboard",
    "Google Maps & GPS Location", "Offline Data Sync Capability",
    "Play Store & App Store Setup", "1 Month Post-Launch Maintenance"
  ];

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-6 border border-amber-500/30 shadow-xl bg-slate-950">
          <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=85" 
              alt="Mobile Application Hero Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=85";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"></div>
          
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
              <Smartphone className="w-4 h-4 text-amber-400" />
              <span>Mobile Engineering Suite</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
              Mobile Application Development
            </h1>

            <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              High-performance cross-platform mobile apps for Android and iOS designed with smooth 60fps micro-animations and secure cloud backends.
            </p>

            <div className="pt-2">
              <span className="inline-block font-cinzel text-xl sm:text-2xl font-extrabold text-gold-gradient px-6 py-2 bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-xl gold-glow">
                {t.mobileAppPrice}
              </span>
              <p className="text-[11px] text-amber-200/70 mt-2">*Pricing depends upon requirements, platform target (Android/iOS) and API complexity.</p>
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <div className="glass-card p-8 rounded-3xl border border-amber-500/30 shadow-lg">
          <h2 className="font-cinzel text-xl font-bold text-slate-900 mb-6 text-center">
            Included Features Across Mobile Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-white/80 p-3 rounded-xl border border-amber-500/15">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 22 Mobile Categories */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900">
              Explore Mobile App Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">Select a category for custom architecture specifications or a direct inquiry.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {MOBILE_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-amber-500/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold text-amber-800 bg-amber-500/10 px-2.5 py-0.5 rounded-full uppercase">
                      App #{idx + 1}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
                    {cat}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for iOS & Android with high responsiveness, offline capabilities, and cloud database sync.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCategoryDetail(cat, 'mobile')}
                    className="text-[11px] font-bold text-slate-700 hover:text-amber-800 transition-colors"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onOpenInquiryWithCategory(cat)}
                    className="px-3 py-1.5 bg-gold-gradient text-slate-950 font-bold rounded-lg text-xs shadow-xs hover:opacity-90 transition-all flex items-center space-x-1"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
