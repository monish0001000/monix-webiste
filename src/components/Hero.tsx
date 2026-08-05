import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroProps {
  lang?: Language;
  onExploreServices?: () => void;
  onOpenInquiry?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang = 'en', onOpenInquiry }) => {
  const t = translations[lang] || translations.en;

  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '#contact';
      }
    }
  };

  return (
    <section id="hero" className="hero-section relative bg-white sm:bg-slate-950">
      {/* Mobile Animated Background Canvas (No Image on Mobile, Clean White Canvas + Animated Glowing Orbs & Tech Rings) */}
      <div className="absolute inset-0 sm:hidden overflow-hidden bg-[#FAF9F5] pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>

        {/* Animated Orb 1 - Golden Glow */}
        <motion.div 
          animate={{
            scale: [1, 1.25, 1],
            x: [-10, 15, -10],
            y: [-15, 10, -15],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-gradient-to-br from-amber-400/40 via-amber-300/30 to-amber-500/20 blur-3xl"
        />

        {/* Animated Orb 2 - Deep Gold & Dark Slate Accent */}
        <motion.div 
          animate={{
            scale: [1.2, 1, 1.2],
            x: [15, -15, 15],
            y: [15, -10, 15],
            opacity: [0.35, 0.65, 0.35]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-600/25 via-amber-400/20 to-slate-900/10 blur-3xl"
        />

        {/* Animated Rotating Geometric Tech Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-dashed border-amber-500/30 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-amber-400/25 rounded-full"
        />

        {/* Floating Glowing Particles */}
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        />
        <motion.div 
          animate={{ y: [0, -40, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-amber-500/70 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
        />
        <motion.div 
          animate={{ y: [0, -25, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-amber-300/70 shadow-[0_0_14px_rgba(245,158,11,0.8)]"
        />
      </div>

      {/* Desktop & Tablet Background Image (Hidden on Mobile view) */}
      <picture className="hero-picture hidden sm:block">
        <source media="(max-aspect-ratio: 1/1)" srcSet="/assets/hero-portrait.webp" type="image/webp" />
        <source srcSet="/assets/hero-landscape.webp" type="image/webp" />
        <img 
          src="/assets/hero-landscape.webp" 
          alt="MONIX Software Solutions Landing Hero" 
          referrerPolicy="no-referrer"
          className="hero-img" 
          draggable={false} 
          loading="eager" 
          fetchPriority="high" 
          decoding="async" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=90";
          }}
        />
      </picture>

      <div className="hero-overlay-container z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          {/* Prominent World-Class MONIX Software Solutions Brand Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-slate-950/90 border border-amber-400/50 backdrop-blur-xl shadow-lg shadow-amber-500/10 mb-6 group hover:border-amber-400 transition-all duration-300 active:scale-95"
          >
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-amber-500/20 flex items-center justify-center p-1 border border-amber-400/40 shrink-0">
              <img 
                src="/assets/logo.webp" 
                alt="MONIX Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter brightness-0 invert" 
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="font-cinzel text-lg sm:text-2xl font-black text-amber-400 tracking-wider leading-none">
                {t.heroBrandName}
              </span>
              <span className="text-amber-400 font-serif text-lg sm:text-xl font-bold leading-none">.</span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-slate-200 uppercase pl-2 border-l border-amber-500/40 leading-none">
                {t.heroBrandSub}
              </span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-kicker"
          >
            {t.heroKicker}
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-title"
          >
            {t.heroTitlePart1}<br />
            {t.heroTitlePart2}<br />
            <span className="text-gradient-gold drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">{t.heroTitlePart3}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hero-subtitle"
          >
            {t.heroSubtitleLine1}<br />
            {t.heroSubtitleLine2}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-2"
          >
            <a href="#contact" onClick={handleCTAClick} className="btn-premium-gold active:scale-95 transition-transform inline-flex items-center justify-center">
              {t.heroCta}
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
