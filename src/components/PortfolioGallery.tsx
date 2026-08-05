import React, { useState } from 'react';
import { ExternalLink, Star, Code2, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface PortfolioGalleryProps {
  lang?: Language;
  onOpenInquiry?: (service: string, category: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ 
  lang = 'en',
  onOpenInquiry 
}) => {
  const isTa = lang === 'ta';
  const [filter, setFilter] = useState<'all' | 'web' | 'mobile' | 'ai' | 'academic'>('all');

  const projects = [
    {
      id: '1',
      category: 'ai',
      title: 'Sentinel_SOC',
      subtitle: 'An autonomous Security Operations Center (SOC) platform featuring real-time threat detection, AI-driven analysis, and automated incident response capabilities.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      tags: ['Autonomous SOC', 'Threat Detection', 'AI Analysis', 'Incident Response'],
      rating: 5.0,
      client: 'Security Platform',
    },
    {
      id: '2',
      category: 'web',
      title: 'MONIX Web-OS',
      subtitle: 'A comprehensive, browser-based cloud operating system featuring a custom Virtual File System (VFS), P2P multiplayer ecosystem, and integrated AURA Voice AI.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tags: ['Cloud OS', 'Virtual File System', 'P2P Ecosystem', 'AURA Voice AI'],
      rating: 5.0,
      client: 'Cloud Platform',
    },
    {
      id: '3',
      category: 'academic',
      title: 'Social Engineering Awareness Simulator',
      subtitle: 'An interactive educational platform exposing sophisticated attacks, complete with an "Attack Anatomy" module visualizing silent exfiltration of camera feeds, GPS, and device fingerprints in a Cyber-Dark UI.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      tags: ['Cyber Security', 'Attack Anatomy', 'Educational Simulator', 'Cyber-Dark UI'],
      rating: 4.9,
      client: 'Security Awareness Suite',
    },
    {
      id: '4',
      category: 'ai',
      title: 'Aura AI',
      subtitle: 'An intelligent AI assistant designed to provide smart solutions and interactive user experiences.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
      tags: ['Aura AI', 'Gemini Engine', 'Interactive UX', 'Smart Assistant'],
      rating: 5.0,
      client: 'AI Product Suite',
    },
    {
      id: '5',
      category: 'web',
      title: 'SangethaMakeover',
      subtitle: 'A modern, responsive website for a beauty parlor featuring service showcases, appointment booking, and an elegant design to attract customers.',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      tags: ['Beauty Parlor', 'Appointment Booking', 'Service Showcase', 'Responsive UI'],
      rating: 5.0,
      client: 'Commercial Client',
    },
    {
      id: '6',
      category: 'web',
      title: 'Aari Embroidery Work Website',
      subtitle: 'A showcase website for traditional Aari embroidery work featuring portfolio galleries, custom order forms, and cultural storytelling.',
      image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80',
      tags: ['Aari Embroidery', 'Portfolio Gallery', 'Custom Order Forms', 'Cultural Storytelling'],
      rating: 4.9,
      client: 'Artisan Business',
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-10 sm:py-20 bg-slate-950 text-white relative">
      <div className="w-full max-w-[90rem] 2xl:max-w-[105rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 space-y-6 sm:space-y-12 transition-all duration-300">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold backdrop-blur-md">
            <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>{isTa ? 'எங்களின் படைப்புகள்' : 'Proven Digital Masterpieces'}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-5xl font-black text-white">
            {isTa ? 'போர்ட்ஃபோலியோ தொகுப்புகள்' : 'Portfolio Showcases'}
          </h2>

          <p className="text-amber-100/80 text-xs sm:text-base leading-relaxed">
            {isTa 
              ? 'நாங்கள் உருவாக்கிய முன்னணி இணையதளங்கள், மொபைல் செயலிகள் மற்றும் AI திட்டங்களின் நேரடித் தொகுப்பு.'
              : 'Explore our track record of high-performance client web portals, cross-platform mobile apps, and IEEE academic projects.'}
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 sm:pt-4">
            {[
              { id: 'all', label: isTa ? 'அனைத்தும்' : 'All Projects' },
              { id: 'web', label: isTa ? 'இணையதளங்கள்' : 'Web Dev' },
              { id: 'mobile', label: isTa ? 'மொபைல் செயலிகள்' : 'Mobile Apps' },
              { id: 'ai', label: isTa ? 'AI கருவிகள்' : 'AI & ML Tools' },
              { id: 'academic', label: isTa ? 'IEEE திட்டங்கள்' : 'Academic IEEE' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all border cursor-pointer ${
                  filter === tab.id
                    ? 'bg-gold-gradient text-slate-950 border-amber-400 shadow-md gold-glow'
                    : 'bg-slate-900 text-slate-300 border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900 rounded-2xl sm:rounded-3xl border border-amber-500/20 overflow-hidden hover:border-amber-400/50 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute top-3 right-3 flex items-center space-x-1 bg-slate-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 text-[11px] font-bold text-amber-300">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{project.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {project.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 mt-auto flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 text-[11px]">{project.client}</span>
                <button
                  onClick={() => onOpenInquiry && onOpenInquiry('Website Development', project.title)}
                  className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  <span>{isTa ? 'இதே போன்ற திட்டம் கோருக' : 'Build Similar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
