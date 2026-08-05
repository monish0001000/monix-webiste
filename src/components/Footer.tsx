import React from 'react';
import { ShieldCheck, Mail, Phone, Globe, Instagram, Linkedin, Send } from 'lucide-react';
import { Language, PageView } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (view: PageView) => void;
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, onOpenInquiry }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-amber-500/30 pt-16 pb-8 relative">
      <div className="w-full max-w-[90rem] 2xl:max-w-[105rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 transition-all duration-300">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-500/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-md overflow-hidden">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/monix-logo.webp" 
                    alt="MONIX Logo" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold text-white tracking-wider">
                  MONIX
                </span>
                <p className="text-[9px] font-semibold tracking-widest text-amber-500 uppercase">
                  Software Solutions
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="inline-flex items-center space-x-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.msmeTag}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider">{t.quickLinks}</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">{t.navHome}</button></li>
              <li><button onClick={() => onNavigate('web-development')} className="hover:text-amber-400 transition-colors">{t.navWebDev}</button></li>
              <li><button onClick={() => onNavigate('mobile-applications')} className="hover:text-amber-400 transition-colors">{t.navMobileApps}</button></li>
              <li><button onClick={() => onNavigate('ai-internships')} className="hover:text-amber-400 transition-colors">{t.navInternships}</button></li>
              <li><button onClick={() => onNavigate('academic-projects')} className="hover:text-amber-400 transition-colors">{t.navProjects}</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-amber-400 transition-colors">{t.navContact}</button></li>
            </ul>
          </div>

          {/* Services List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider">{t.servicesList}</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Corporate & E-Commerce Websites</li>
              <li>Android & iOS Mobile Applications</li>
              <li>AI & Full Stack Internships</li>
              <li>College Final Year & IEEE Projects</li>
              <li>AI Chatbot & SaaS Application Suite</li>
              <li>CRM & Custom Enterprise ERPs</li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-cinzel text-sm font-bold text-amber-400 uppercase tracking-wider">{t.contactInfo}</h4>
            
            <div className="space-y-2.5 text-xs">
              <a 
                href="mailto:rajibabu1184@gmail.com" 
                className="flex items-center text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
                <span>rajibabu1184@gmail.com</span>
              </a>
              <a 
                href="tel:+919025087129" 
                className="flex items-center text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500 mr-2 shrink-0" />
                <span>+91 90250 87129</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-[11px] text-amber-200/80 mb-2">Subscribe for AI & Software updates</p>
              <div className="flex items-center space-x-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full"
                />
                <button
                  onClick={onOpenInquiry}
                  className="p-2 bg-gold-gradient text-slate-950 rounded-lg shadow-md cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://www.instagram.com/monix.srm" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram: @monix.srm"
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center space-x-2 text-amber-400 hover:bg-amber-500/20 transition-colors text-xs font-semibold"
              >
                <Instagram className="w-4 h-4" />
                <span>monix.srm</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/monix-softwaresolutions" 
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn: monix-softwaresolutions"
                className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center space-x-2 text-amber-400 hover:bg-amber-500/20 transition-colors text-xs font-semibold"
              >
                <Linkedin className="w-4 h-4" />
                <span>monix-softwaresolutions</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} MONIX Software Solutions. {t.rightsReserved}</p>
          <p className="text-[11px] text-slate-400">{t.disclaimerPricing}</p>
        </div>

      </div>
    </footer>
  );
};
