import React from 'react';
import { Eye, Target, Cpu, HeartHandshake, ShieldCheck, Sparkles, Award, Zap, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  lang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-amber-50/20 to-white border-y border-amber-500/10 relative overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-[90rem] 2xl:max-w-[105rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20 space-y-3">
          <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 shadow-xs hover:scale-105 transition-transform">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            {t.aboutBadge}
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {t.aboutTitle}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-900 mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          
          {/* Executive MONIX Brand Identity & Certification Showcase (Replaces Founder Photo) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 relative overflow-hidden group flex-1 flex flex-col justify-between bg-white/80 backdrop-blur-md">
              
              {/* Top ambient radial light */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-400/20 via-amber-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>

              <div>
                {/* Brand Header Centered without Logo */}
                <div className="flex flex-col items-center text-center mb-6">
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    MONIX
                  </h3>
                  <p className="text-xs font-extrabold text-amber-700 tracking-wider uppercase mt-0.5">
                    Software Solutions
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-600 font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1 rounded-md w-fit mx-auto shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Govt MSME Registered Enterprise</span>
                  </div>
                </div>

                {/* Company Tagline Quote */}
                <blockquote className="text-slate-700 font-serif italic text-sm sm:text-base leading-relaxed border-l-3 border-amber-500 pl-4 py-2 my-6 bg-amber-500/5 rounded-r-xl">
                  "At MONIX, we merge enterprise-grade software architecture with artificial intelligence to build transformative digital experiences for businesses, startups, and academic pioneers across India."
                </blockquote>

                {/* Interactive Achievement Chips */}
                <div className="grid grid-cols-2 gap-3 my-6">
                  <div className="p-3 bg-slate-900 text-white rounded-xl border border-amber-500/30 flex items-center space-x-3 group/chip hover:bg-slate-800 transition-colors">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover/chip:scale-110 transition-transform">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-400">100% Legal</p>
                      <p className="text-[10px] text-slate-300">Govt Verified MSME</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-xl border border-amber-500/30 flex items-center space-x-3 group/chip hover:bg-slate-800 transition-colors">
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover/chip:scale-110 transition-transform">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-400">24/7 Support</p>
                      <p className="text-[10px] text-slate-300">Direct Developer Team</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Info */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs text-slate-600 font-medium">
                <span className="font-semibold text-slate-700">Domain: Web, Mobile, AI & IEEE</span>
                <a href="tel:+919025087129" className="text-amber-800 font-bold hover:underline flex items-center gap-1">
                  <span>+91 90250 87129</span>
                </a>
              </div>

            </div>
          </div>

          {/* 4 Pillars Grid with Enhanced Hover Animations */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            
            {/* Pillar 1: Vision */}
            <div className="glass-card p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-white/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Eye className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                {t.visionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.visionDesc}
              </p>
            </div>

            {/* Pillar 2: Mission */}
            <div className="glass-card p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-white/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                {t.missionTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.missionDesc}
              </p>
            </div>

            {/* Pillar 3: Innovation */}
            <div className="glass-card p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-white/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                {t.innovationTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.innovationDesc}
              </p>
            </div>

            {/* Pillar 4: Commitment */}
            <div className="glass-card p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group bg-white/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-700 mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-cinzel text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                {t.commitmentTitle}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.commitmentDesc}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
