import React from 'react';
import { GraduationCap, CheckCircle2, Award, Users, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { INTERNSHIP_PROGRAMS } from '../../data/content';

interface InternshipsPageProps {
  lang: Language;
  onOpenInquiryWithProgram: (program: string) => void;
  onSelectCategoryDetail: (catTitle: string, serviceType: 'internship') => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({
  lang,
  onOpenInquiryWithProgram,
  onSelectCategoryDetail,
}) => {
  const t = translations[lang];

  const benefits = [
    "100% Online & Flexible Timings", "Senior Engineer 1-on-1 Mentorship",
    "Real Industry Capstone Projects", "Govt MSME Registered Certificate",
    "Letter of Recommendation (LOR)", "GitHub & Resume Review Support"
  ];

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-6 border border-amber-500/30 shadow-xl bg-slate-950">
          <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
            <img 
              src="/assets/internship_hero_bg.webp" 
              alt="AI Internship Hero Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"></div>
          
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Govt MSME Certified AI Internships</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
              AI Internship Programs
            </h1>

            <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Everything Online • AI Powered Workflow • Mentorship Driven • Build Live Portfolio Projects under Senior Software Engineers.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs font-bold">
              <span className="px-4 py-2 bg-gold-gradient text-slate-950 rounded-xl font-bold shadow-md">
                Duration: 4 Weeks / 8 Weeks Options
              </span>
              <span className="px-4 py-2 bg-slate-900/90 text-amber-300 border border-amber-500/30 rounded-xl backdrop-blur-md">
                Mode: 100% Remote / Online
              </span>
            </div>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="glass-card p-8 rounded-3xl border border-amber-500/30 shadow-lg">
          <h2 className="font-cinzel text-xl font-bold text-slate-900 mb-6 text-center">
            Key Advantages of MONIX Internship Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700 bg-white/80 p-3.5 rounded-xl border border-amber-500/15">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 16 Internship Programs Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900">
              Select Your Specialization Track
            </h2>
            <p className="text-xs text-slate-500 mt-1">Available for B.E, B.Tech, B.Sc, BCA, MCA & Diploma Students.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {INTERNSHIP_PROGRAMS.map((prog, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-amber-500/20 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold text-amber-800 bg-amber-500/10 px-2.5 py-0.5 rounded-full uppercase">
                      Track #{idx + 1}
                    </span>
                    <Award className="w-4 h-4 text-amber-600 opacity-70" />
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
                    {prog}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Hands-on live coding, AI integration, capstone development, and verifiable Govt MSME certification.
                  </p>

                  <div className="flex items-center space-x-2 text-[11px] font-bold text-amber-800">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>4-8 Weeks Options</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-500/15 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectCategoryDetail(prog, 'internship')}
                    className="text-[11px] font-bold text-slate-700 hover:text-amber-800 transition-colors"
                  >
                    Curriculum
                  </button>
                  <button
                    onClick={() => onOpenInquiryWithProgram(prog)}
                    className="px-3.5 py-1.5 bg-gold-gradient text-slate-950 font-bold rounded-lg text-xs shadow-xs hover:opacity-90 transition-all flex items-center space-x-1"
                  >
                    <span>Apply Now</span>
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
