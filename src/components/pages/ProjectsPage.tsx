import React from 'react';
import { Code2, CheckCircle2, Sparkles, ArrowRight, FileText, Monitor, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { PROJECT_CATEGORIES } from '../../data/content';

interface ProjectsPageProps {
  lang: Language;
  onOpenInquiryWithProject: (projectCategory: string) => void;
  onSelectCategoryDetail: (catTitle: string, serviceType: 'projects') => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  onOpenInquiryWithProject,
  onSelectCategoryDetail,
}) => {
  const t = translations[lang];

  const deliverables = [
    { title: "100% Tested Source Code", desc: "Clean, documented, error-free code written in modern frameworks." },
    { title: "Project Report Document", desc: "Complete 50+ page university format report (Word & PDF)." },
    { title: "Presentation PPT Slides", desc: "Professional slide deck for final oral viva presentation." },
    { title: "Synopsis & Abstract", desc: "Initial project proposal and architectural diagram documentation." },
    { title: "Free Remote Installation", desc: "Live setup on your laptop via AnyDesk / TeamViewer." },
    { title: "Viva Voce Prep Sheet", desc: "Expected viva questions and answers to score top grades." }
  ];

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center max-w-5xl mx-auto space-y-6 border border-amber-500/30 shadow-xl bg-slate-950">
          <div className="absolute inset-0 opacity-30 mix-blend-luminosity">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=85" 
              alt="Academic Projects Hero Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=85";
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60"></div>
          
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold backdrop-blur-md">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Academic & Research Engineering</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
              Academic & IEEE Final Year Projects
            </h1>

            <p className="text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Turnkey Major Projects, Mini Projects, and IEEE Research Paper implementations for CSE, IT, ECE, AI, and Data Science students.
            </p>

            <div className="pt-2">
              <span className="inline-block font-cinzel text-xl sm:text-2xl font-extrabold text-gold-gradient px-6 py-2 bg-slate-900/90 border border-amber-500/30 rounded-2xl shadow-xl gold-glow">
                Student Friendly Custom Pricing
              </span>
            </div>
          </div>
        </div>

        {/* Deliverables Banner */}
        <div className="glass-card p-8 rounded-3xl border border-amber-500/30 shadow-lg">
          <h2 className="font-cinzel text-xl font-bold text-slate-900 mb-6 text-center">
            Complete Package Included with Every Project
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/80 border border-amber-500/20 space-y-1">
                <div className="flex items-center space-x-2 text-amber-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] text-slate-600 pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Project Categories */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900">
              Project Categories
            </h2>
            <p className="text-xs text-slate-500 mt-1">Select a category to view sample topics or request immediate customization.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {PROJECT_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold text-amber-900 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
                      Category #{idx + 1}
                    </span>
                    <Sparkles className="w-5 h-5 text-amber-600" />
                  </div>

                  <h3 className="font-cinzel text-xl font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-3">
                    {cat}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Tailored to university guidelines with full source code, database, machine learning models, report documentation, and remote execution support.
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <p className="flex items-center"><FileText className="w-3.5 h-3.5 text-amber-600 mr-2" /> Complete Project Report & Synopsis</p>
                    <p className="flex items-center"><Monitor className="w-3.5 h-3.5 text-amber-600 mr-2" /> AnyDesk Remote Installation Included</p>
                    <p className="flex items-center"><HelpCircle className="w-3.5 h-3.5 text-amber-600 mr-2" /> Viva Voce Guidance & Code Explanation</p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-amber-500/20 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectCategoryDetail(cat, 'projects')}
                    className="text-xs font-bold text-slate-800 hover:text-amber-800 transition-colors"
                  >
                    View Details & Deliverables
                  </button>

                  <button
                    onClick={() => onOpenInquiryWithProject(cat)}
                    className="px-5 py-2.5 bg-gold-gradient text-slate-950 font-bold rounded-xl text-xs shadow-md hover:opacity-90 transition-all flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>Inquire Project</span>
                    <ArrowRight className="w-4 h-4" />
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
