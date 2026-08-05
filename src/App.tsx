import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, PageView } from './types';

// Core Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { AboutModal } from './components/AboutModal';
import { SEOHead } from './components/SEOHead';
import { LoadingOverlay } from './components/LoadingOverlay';
import { PageSkeleton } from './components/PageSkeleton';
import { ScrollProgressBar } from './components/ScrollProgressBar';

// Homepage Section Components
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { CostCalculator } from './components/CostCalculator';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ProcessTimeline } from './components/ProcessTimeline';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AIAssistantButton } from './components/AIAssistantButton';

// Lazy Loaded Sub-Pages for Core Web Vitals & Performance Optimization
const WebDevPage = lazy(() => import('./components/pages/WebDevPage').then(module => ({ default: module.WebDevPage })));
const MobileAppsPage = lazy(() => import('./components/pages/MobileAppsPage').then(module => ({ default: module.MobileAppsPage })));
const InternshipsPage = lazy(() => import('./components/pages/InternshipsPage').then(module => ({ default: module.InternshipsPage })));
const ProjectsPage = lazy(() => import('./components/pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const ContactPage = lazy(() => import('./components/pages/ContactPage').then(module => ({ default: module.ContactPage })));
const CategoryDetailPage = lazy(() => import('./components/pages/CategoryDetailPage').then(module => ({ default: module.CategoryDetailPage })));

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [lang, setLang] = useState<Language>('en');

  // Initial Loading Screen Simulation for Luxury UX
  const [initialLoading, setInitialLoading] = useState(true);

  // Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('Website Development');
  const [preselectedCategory, setPreselectedCategory] = useState('');

  // Category Detail Page State
  const [selectedCatTitle, setSelectedCatTitle] = useState('');
  const [selectedCatServiceType, setSelectedCatServiceType] = useState<'web' | 'mobile' | 'internship' | 'projects'>('web');

  useEffect(() => {
    // Sync body class for Tamil language font styling
    document.body.classList.toggle('lang-ta', lang === 'ta');
  }, [lang]);

  useEffect(() => {
    // Hide initial overlay after assets load
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenInquiry = (service: string = 'Website Development', category: string = '') => {
    setPreselectedService(service);
    setPreselectedCategory(category);
    setInquiryModalOpen(true);
  };

  const handleOpenCategoryDetail = (title: string, serviceType: 'web' | 'mobile' | 'internship' | 'projects') => {
    setSelectedCatTitle(title);
    setSelectedCatServiceType(serviceType);
    setCurrentView('category-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800 font-sans antialiased selection:bg-amber-200 selection:text-amber-900">
      
      {/* Dynamic SEO Head Manager */}
      <SEOHead currentView={currentView} selectedCategory={selectedCatTitle} lang={lang} />

      {/* Dynamic Top Scroll Expansion Progress Line */}
      <ScrollProgressBar />

      {/* Initial Luxury App Loading Overlay */}
      <LoadingOverlay isLoading={initialLoading} />

      {/* Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-extrabold focus:rounded-xl focus:shadow-2xl font-sans text-xs"
      >
        Skip to main content
      </a>

      {/* Fixed Main Header Overlay Wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full">
        <Navbar
          currentView={currentView}
          setCurrentView={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          lang={lang}
          setLang={setLang}
          onOpenInquiry={() => handleOpenInquiry('Website Development')}
          onOpenAboutModal={() => setAboutModalOpen(true)}
        />
      </div>

      {/* Main Content Router with Framer Motion Page Transitions */}
      <main id="main-content" className={`flex-grow focus:outline-none ${currentView !== 'home' ? 'pt-16 sm:pt-20' : ''}`} tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentView === 'home' && (
              <>
                <Hero
                  lang={lang}
                  onExploreServices={() => {
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else setCurrentView('web-development');
                  }}
                  onOpenInquiry={() => handleOpenInquiry('Website Development')}
                />
                
                {/* 1. Our Core Services */}
                <ServicesSection
                  lang={lang}
                  onNavigate={(view) => {
                    setCurrentView(view);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenInquiryWithService={(service, category) => handleOpenInquiry(service, category)}
                />

                {/* 2. Uncompromising Standards - Why Choose MONIX (Placed directly after Core Services) */}
                <WhyChooseUs lang={lang} />

                {/* 3. Live Portfolio Showcase Gallery */}
                <PortfolioGallery
                  lang={lang}
                  onOpenInquiry={(service, category) => handleOpenInquiry(service, category)}
                />

                {/* 4. Interactive Project Cost Calculator */}
                <CostCalculator
                  lang={lang}
                  onOpenInquiryWithEstimate={(service, details) => handleOpenInquiry(service, details)}
                />

                <ProcessTimeline lang={lang} />
                <StatsSection lang={lang} />
                <TestimonialsSection lang={lang} />
                <FAQSection lang={lang} />
                <CTASection
                  lang={lang}
                  onOpenInquiry={() => handleOpenInquiry('Website Development')}
                />
              </>
            )}

            {currentView === 'web-development' && (
              <Suspense fallback={<PageSkeleton />}>
                <WebDevPage
                  lang={lang}
                  onOpenInquiryWithCategory={(cat) => handleOpenInquiry('Website Development', cat)}
                  onSelectCategoryDetail={(cat) => handleOpenCategoryDetail(cat, 'web')}
                />
              </Suspense>
            )}

            {currentView === 'mobile-applications' && (
              <Suspense fallback={<PageSkeleton />}>
                <MobileAppsPage
                  lang={lang}
                  onOpenInquiryWithCategory={(cat) => handleOpenInquiry('Mobile Applications', cat)}
                  onSelectCategoryDetail={(cat) => handleOpenCategoryDetail(cat, 'mobile')}
                />
              </Suspense>
            )}

            {currentView === 'ai-internships' && (
              <Suspense fallback={<PageSkeleton />}>
                <InternshipsPage
                  lang={lang}
                  onOpenInquiryWithProgram={(prog) => handleOpenInquiry('AI Internship', prog)}
                  onSelectCategoryDetail={(prog) => handleOpenCategoryDetail(prog, 'internship')}
                />
              </Suspense>
            )}

            {currentView === 'academic-projects' && (
              <Suspense fallback={<PageSkeleton />}>
                <ProjectsPage
                  lang={lang}
                  onOpenInquiryWithProject={(proj) => handleOpenInquiry('Academic Projects', proj)}
                  onSelectCategoryDetail={(proj) => handleOpenCategoryDetail(proj, 'projects')}
                />
              </Suspense>
            )}

            {currentView === 'contact' && (
              <Suspense fallback={<PageSkeleton />}>
                <ContactPage lang={lang} />
              </Suspense>
            )}

            {currentView === 'category-detail' && (
              <Suspense fallback={<PageSkeleton />}>
                <CategoryDetailPage
                  categoryTitle={selectedCatTitle}
                  serviceType={selectedCatServiceType}
                  lang={lang}
                  onBack={() => {
                    if (selectedCatServiceType === 'web') setCurrentView('web-development');
                    else if (selectedCatServiceType === 'mobile') setCurrentView('mobile-applications');
                    else if (selectedCatServiceType === 'internship') setCurrentView('ai-internships');
                    else setCurrentView('academic-projects');
                  }}
                  onOpenInquiry={(title) => handleOpenInquiry(selectedCatServiceType === 'web' ? 'Website Development' : selectedCatServiceType === 'mobile' ? 'Mobile Applications' : selectedCatServiceType === 'internship' ? 'AI Internship' : 'Academic Projects', title)}
                />
              </Suspense>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenInquiry={() => handleOpenInquiry('Website Development')}
      />

      {/* Multi-step Glassmorphism Inquiry Modal Popup */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        lang={lang}
        preselectedService={preselectedService}
        preselectedCategory={preselectedCategory}
      />

      {/* About Us Interactive Sheet / Modal Popup */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        lang={lang}
      />

      {/* Floating MONIX AI Assistant Button (Bottom Left) */}
      <AIAssistantButton lang={lang} />

      {/* Floating 1-Click WhatsApp Quick Action Button (Bottom Right) */}
      <WhatsAppButton lang={lang} phoneNumber="919025087129" />

    </div>
  );
}
