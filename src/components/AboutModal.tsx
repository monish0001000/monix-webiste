import React from 'react';
import { X, Eye, Target, Cpu, HeartHandshake, ShieldCheck, User } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white w-full h-full min-h-screen overflow-y-auto flex flex-col animate-fadeIn">
      
      {/* Full Screen Header */}
      <div className="bg-slate-950/90 backdrop-blur-md sticky top-0 z-20 border-b border-amber-500/30 px-4 sm:px-8 py-4 flex items-center justify-between w-full max-w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-cinzel text-lg sm:text-2xl font-black text-white tracking-wide">{t.aboutTitle}</h3>
            <p className="text-xs text-amber-400 font-bold tracking-wider">{t.msmeTag}</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-white transition-all cursor-pointer flex items-center space-x-2 text-xs font-bold"
          aria-label="Close About Section"
        >
          <span>{t.closeModal || 'Close Fullscreen'}</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Full Screen Content Body */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Founder & Enterprise Spotlight Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          


          <div className="space-y-3 text-center md:text-left flex-grow">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-extrabold uppercase tracking-widest">
              Founder & Director Spotlight
            </div>
            <h4 className="font-cinzel text-2xl sm:text-4xl font-black text-white">{t.founderTitle}</h4>
            <p className="text-sm font-bold text-amber-400">MONIX Software Solutions • Registered MSME Enterprise</p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl font-sans italic pt-1">
              "Merging architectural software engineering with artificial intelligence to make high-end custom web portals, mobile apps, and academic research technology accessible, affordable, and transformative across India."
            </p>
          </div>
        </div>

        {/* 4 Pillars Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-amber-500/25 bg-slate-900/60 backdrop-blur-md space-y-3">
            <div className="flex items-center space-x-3 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Eye className="w-4 h-4 text-amber-400" />
              </div>
              <span>{t.visionTitle}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{t.visionDesc}</p>
          </div>

          <div className="p-6 rounded-2xl border border-amber-500/25 bg-slate-900/60 backdrop-blur-md space-y-3">
            <div className="flex items-center space-x-3 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Target className="w-4 h-4 text-amber-400" />
              </div>
              <span>{t.missionTitle}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{t.missionDesc}</p>
          </div>

          <div className="p-6 rounded-2xl border border-amber-500/25 bg-slate-900/60 backdrop-blur-md space-y-3">
            <div className="flex items-center space-x-3 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-amber-400" />
              </div>
              <span>{t.innovationTitle}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{t.innovationDesc}</p>
          </div>

          <div className="p-6 rounded-2xl border border-amber-500/25 bg-slate-900/60 backdrop-blur-md space-y-3">
            <div className="flex items-center space-x-3 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
              </div>
              <span>{t.commitmentTitle}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{t.commitmentDesc}</p>
          </div>
        </div>

        {/* Government Recognition & Quality Assurance Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-amber-300 text-xs font-bold">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
            <span>Govt. Registered MSME Enterprise • Certified Software Engineering Practices</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gold-gradient text-slate-950 text-xs font-extrabold rounded-xl shadow-lg gold-glow hover:scale-105 transition-all cursor-pointer shrink-0"
          >
            {t.closeModal || 'Return to Main Experience'}
          </button>
        </div>

      </div>

    </div>
  );
};
