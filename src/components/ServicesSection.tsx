import React from 'react';
import { Globe, Smartphone, GraduationCap, Code2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Language, PageView } from '../types';
import { translations } from '../data/translations';
import { WEB_CATEGORIES, MOBILE_CATEGORIES, INTERNSHIP_PROGRAMS, PROJECT_CATEGORIES } from '../data/content';

interface ServicesSectionProps {
  lang: Language;
  onNavigate: (view: PageView) => void;
  onOpenInquiryWithService: (service: string, category?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onNavigate,
  onOpenInquiryWithService,
}) => {
  const t = translations[lang];

  const services = [
    {
      id: 'web',
      view: 'web-development' as PageView,
      title: t.webDevTitle,
      price: t.webDevPrice,
      icon: Globe,
      badge: "26+ Categories",
      desc: "Pixel-perfect, ultra-fast corporate websites, landing pages, custom dashboards, and AI-powered e-commerce stores.",
      categories: WEB_CATEGORIES.slice(0, 6),
      totalCount: WEB_CATEGORIES.length,
      bgGradient: "from-amber-500/10 via-amber-500/5 to-transparent",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 'mobile',
      view: 'mobile-applications' as PageView,
      title: t.mobileAppTitle,
      price: t.mobileAppPrice,
      icon: Smartphone,
      badge: "20+ Categories",
      desc: "Native Android & iOS apps, Flutter & React Native cross-platform applications with payment gateways and AI features.",
      categories: MOBILE_CATEGORIES.slice(0, 6),
      totalCount: MOBILE_CATEGORIES.length,
      bgGradient: "from-amber-600/10 via-amber-600/5 to-transparent",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 'internship',
      view: 'ai-internships' as PageView,
      title: t.internshipTitle,
      price: t.internshipSubtitle,
      icon: GraduationCap,
      badge: "100% Online & Certified",
      desc: "Industry-aligned live mentorship programs in AI Full Stack, Cyber Security, Prompt Engineering, Python, and Flutter.",
      categories: INTERNSHIP_PROGRAMS.slice(0, 6),
      totalCount: INTERNSHIP_PROGRAMS.length,
      bgGradient: "from-amber-700/10 via-amber-700/5 to-transparent",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 'projects',
      view: 'academic-projects' as PageView,
      title: t.projectsTitle,
      price: t.projectsSubtitle,
      icon: Code2,
      badge: "Full Code + PPT + Viva",
      desc: "Turnkey final year major projects, mini projects, IEEE paper implementations for CSE, IT, ECE & AI students.",
      categories: PROJECT_CATEGORIES,
      totalCount: PROJECT_CATEGORIES.length,
      bgGradient: "from-amber-800/10 via-amber-800/5 to-transparent",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="services" className="py-10 sm:py-20 bg-white border-y border-amber-500/10 relative">
      <div className="w-full max-w-[90rem] 2xl:max-w-[105rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 transition-all duration-300">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-amber-500/20">
            Digital Transformation
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-slate-900">
            {t.servicesTitle}
          </h2>
          <p className="text-slate-600 text-xs sm:text-base">
            {t.servicesSubtitle}
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gold-gradient mx-auto rounded-full mt-2"></div>
        </div>

        {/* 4 Large Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card glass-card-hover p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-500/30 flex flex-col justify-between relative overflow-hidden group shadow-lg"
              >
                {/* Background Tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-60 pointer-events-none`}></div>

                {/* Card Top Image Header */}
                <div className="relative h-36 -mx-8 -mt-8 mb-6 overflow-hidden border-b border-amber-500/20">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-bold text-amber-300 tracking-wide">{service.badge}</span>
                    <span className="text-[11px] font-bold text-slate-200 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">{service.totalCount} Offering Types</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-900 p-0.5 shadow-md shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">
                          {service.title}
                        </h3>
                        <p className="text-xs font-bold text-amber-700 mt-0.5">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Featured Category Tags */}
                  <div className="space-y-2 mb-8">
                    <p className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
                      Popular Categories:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.categories.map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => onOpenInquiryWithService(service.title, cat)}
                          className="px-3 py-1 bg-white/90 hover:bg-amber-500/15 border border-amber-500/20 hover:border-amber-500/50 rounded-lg text-xs font-medium text-slate-700 hover:text-amber-900 transition-all cursor-pointer flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{cat}</span>
                        </button>
                      ))}
                      {service.totalCount > 6 && (
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-900 rounded-lg text-xs font-bold">
                          +{service.totalCount - 6} More
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate(service.view)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-white border border-amber-500/40 text-slate-900 hover:bg-amber-500/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>View All Details & Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenInquiryWithService(service.title)}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gold-gradient text-slate-950 font-bold rounded-xl text-xs shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>{t.inquireNow}</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
