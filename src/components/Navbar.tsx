import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Sparkles, PhoneCall } from 'lucide-react';
import { Language, PageView } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenInquiry: () => void;
  onOpenAboutModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  lang,
  setLang,
  onOpenInquiry,
  onOpenAboutModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = currentView === 'home' && !scrolled;

  const navItems: { label: string; view: PageView | 'about' }[] = [
    { label: t.navHome, view: 'home' },
    { label: t.navAbout, view: 'about' },
    { label: t.navWebDev, view: 'web-development' },
    { label: t.navMobileApps, view: 'mobile-applications' },
    { label: t.navInternships, view: 'ai-internships' },
    { label: t.navProjects, view: 'academic-projects' },
    { label: t.navContact, view: 'contact' },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ta' : 'en');
  };

  const handleNavClick = (view: PageView | 'about') => {
    setMobileMenuOpen(false);
    if (view === 'about') {
      if (onOpenAboutModal) {
        onOpenAboutModal();
      } else {
        const aboutEl = document.getElementById('about');
        if (aboutEl) {
          aboutEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
      return;
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-header"
      className={`main-header w-full transition-all duration-300 ${
        scrolled
          ? 'scrolled bg-white shadow-md border-b border-slate-200/80' 
          : isTransparent 
          ? 'bg-transparent border-b border-transparent shadow-none' 
          : 'bg-white/95 backdrop-blur-md border-b border-amber-500/20 shadow-sm'
      }`}
    >
      <div className="w-full max-w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo Image in corner */}
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center cursor-pointer group"
            title="MONIX Software Solutions Home"
          >
            <img 
              src="/assets/logo.webp" 
              alt="MONIX Logo" 
              width={38}
              height={38}
              referrerPolicy="no-referrer"
              className="w-9 sm:w-11 h-9 sm:h-11 object-contain transition-transform group-hover:scale-105 shrink-0 filter brightness-0"
              loading="eager"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`nav-link px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 relative ${
                    isActive
                      ? 'active text-amber-800 bg-amber-500/15 border border-amber-500/30 font-bold shadow-2xs'
                      : isTransparent
                      ? 'text-slate-900 bg-white/40 hover:bg-white/80 hover:text-amber-900 font-bold border border-white/50 shadow-2xs'
                      : 'text-slate-800 hover:text-amber-800 hover:bg-amber-500/10'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-0.5 bg-amber-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-amber-600/30 bg-amber-500/5 text-amber-900 hover:bg-amber-500/15 transition-all"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.langSwitch}</span>
            </button>

            {/* Inquire Button */}
            <button
              onClick={onOpenInquiry}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gold-gradient hover:opacity-95 rounded-lg shadow-sm gold-glow transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>{t.inquireNow}</span>
            </button>
          </div>

          {/* Mobile Menu Action Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-lg border border-amber-600/30 bg-amber-500/10 text-amber-900 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3 h-3 text-amber-600" />
              <span>{lang === 'en' ? 'TA' : 'EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg border border-amber-500/30 bg-amber-500/10 text-slate-900 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-amber-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer lg:hidden border-b border-amber-500/20 bg-[#FAF8F5]/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-xl transition-all">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/15 text-amber-900 border border-amber-500/30 font-bold'
                      : 'text-slate-700 hover:bg-amber-500/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-amber-500/20 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-base shadow-md gold-glow"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{t.inquireNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
