import React, { useState } from 'react';
import { Calculator, Check, Sparkles, Send, ShieldCheck, Zap, Info } from 'lucide-react';
import { Language } from '../types';

interface CostCalculatorProps {
  lang?: Language;
  onOpenInquiryWithEstimate?: (service: string, details: string) => void;
}

type ServiceCategoryKey = 'web' | 'mobile' | 'internship' | 'project';
type ScaleTierKey = 'starter' | 'pro' | 'enterprise';

interface FeatureItem {
  id: string;
  name: string;
  taName: string;
  price: number;
}

interface CategoryConfig {
  name: string;
  taName: string;
  starter: { price: number; label: string; taLabel: string };
  pro: { price: number; label: string; taLabel: string };
  enterprise: { price: number; label: string; taLabel: string };
  features: FeatureItem[];
}

const CATEGORY_CONFIGS: Record<ServiceCategoryKey, CategoryConfig> = {
  web: {
    name: 'Website Development',
    taName: 'இணையதள வளர்ச்சி',
    starter: { price: 4999, label: 'Starter Business Landing Page', taLabel: 'ஸ்டார்ட்டர் லேண்டிங் பக்கம்' },
    pro: { price: 11999, label: 'Professional Corporate Portal (Popular)', taLabel: 'புரோ கார்ப்பரேட் போர்டல்' },
    enterprise: { price: 24999, label: 'Enterprise Custom SaaS / E-Commerce Platform', taLabel: 'என்டர்பிரைஸ் சாஸ் / இ-காமர்ஸ்' },
    features: [
      { id: 'ecommerce', name: 'E-Commerce & Razorpay Payment Gateway', taName: 'இ-காமர்ஸ் & பேமெண்ட் வசதி', price: 3500 },
      { id: 'ai', name: 'AI Smart Assistant & Chatbot Integration', taName: 'AI ஸ்மார்ட் அசிஸ்டண்ட்', price: 4000 },
      { id: 'admin', name: 'Custom Admin Control Panel (CMS)', taName: 'நிர்வாக டாஷ்போர்டு', price: 2500 },
      { id: 'multilang', name: 'Multi-Language Support (English & Tamil)', taName: 'இருமொழி வசதி (English / தமிழ்)', price: 1500 },
      { id: 'seo', name: 'Google SEO & Speed 95+ Optimization', taName: 'கூகுள் SEO & ஸ்பீடு ஆப்டிமைசேஷன்', price: 1500 },
      { id: 'express', name: 'Express 48-Hour Priority Delivery', taName: 'விரைவு 48-மணிநேர டெலிவரி', price: 3000 },
    ]
  },
  mobile: {
    name: 'Mobile Applications',
    taName: 'மொபைல் ஆப் வளர்ச்சி',
    starter: { price: 7999, label: 'Hybrid Cross-Platform Mobile App', taLabel: 'ஹைப்ரிட் மொபைல் ஆப்' },
    pro: { price: 17999, label: 'Full-Featured iOS & Android Native Suite', taLabel: 'முழு அம்சங்கள் கொண்ட ஆப்' },
    enterprise: { price: 34999, label: 'Enterprise Mobile Suite & Dedicated Cloud Backend', taLabel: 'என்டர்பிரைஸ் மொபைல் ஆப் தொகுப்பு' },
    features: [
      { id: 'push', name: 'Real-time Push Notifications Engine', taName: 'புஷ் நோட்டிபிகேஷன் இன்ஜின்', price: 2500 },
      { id: 'offline', name: 'Offline Data Sync & Encrypted Storage', taName: 'ஆஃப்லைன் டேட்டா சேமிப்பு', price: 2000 },
      { id: 'maps', name: 'Google Maps & Live GPS Tracking', taName: 'கூகுள் மேப்ஸ் & லைவ் ஜிபிஎஸ்', price: 3500 },
      { id: 'store', name: 'Google Play & Apple App Store Publishing', taName: 'ப்ளே ஸ்டோர் / ஆப் ஸ்டோர் வெளியீடு', price: 3000 },
      { id: 'biometric', name: 'Biometric Security & Fingerprint Auth', taName: 'பயோமெட்ரிக் பாதுகாப்பு', price: 2000 },
      { id: 'analytics', name: 'In-App Telemetry & Usage Analytics', taName: 'பயனர் பகுப்பாய்வு (Analytics)', price: 1800 },
    ]
  },
  internship: {
    name: 'AI Internship',
    taName: 'AI இன்டர்ன்ஷிப்',
    starter: { price: 1499, label: '1-Month Fast-Track AI Internship', taLabel: '1 மாத வேகக் கற்றல் பயிற்சி' },
    pro: { price: 2999, label: '2-Month Full-Stack AI & ML Program', taLabel: '2 மாத முழு அடுக்க பயிற்சி' },
    enterprise: { price: 4999, label: '3-Month Master Internship + LOR & Certificate', taLabel: '3 மாத மாஸ்டர் பயிற்சி + LOR' },
    features: [
      { id: 'cert', name: 'Govt. MSME Verified Internship Certificate', taName: 'அரசு MSME பயிற்சி சான்றிதழ்', price: 500 },
      { id: 'lor', name: 'Official Recommendation Letter (LOR)', taName: 'அதிகாரப்பூர்வ LOR கடிதம்', price: 600 },
      { id: 'mentor', name: '1-on-1 Direct Senior Developer Mentorship', taName: '1-on-1 நேரடி வழிகாட்டல்', price: 1000 },
      { id: 'paper', name: 'Research Paper Writing & IEEE Guidance', taName: 'ஆராய்ச்சி தாள் (IEEE) வழிகாட்டல்', price: 1200 },
      { id: 'resume', name: 'Professional Resume & Portfolio Building', taName: 'ரெஸ்யூம் & போர்ட்ஃபோலியோ உருவாக்கம்', price: 700 },
      { id: 'hosting', name: 'Live Cloud Project Deployment Support', taName: 'லைவ் கிளவுட் திட்டம் ஹோஸ்டிங்', price: 800 },
    ]
  },
  project: {
    name: 'IEEE & Academic Projects',
    taName: 'IEEE & கல்விசார் திட்டங்கள்',
    starter: { price: 2999, label: 'Mini Project Code + Abstract + PPT', taLabel: 'மினி ப்ராஜெக்ட் கோட் + PPT' },
    pro: { price: 5999, label: 'Major IEEE Project + Full Code & Documentation', taLabel: 'மேஜர் IEEE ப்ராஜெக்ட் + அறிக்கை' },
    enterprise: { price: 12999, label: 'Custom Research Project + Paper Publishing', taLabel: 'ஆராய்ச்சி ப்ராஜெக்ட் + தாள் வெளியீடு' },
    features: [
      { id: 'synopsis', name: 'Complete Project Synopsis & Viva PPT Deck', taName: 'ப்ராஜெக்ட் சினோப்சிஸ் & PPT', price: 1000 },
      { id: 'execution', name: 'Live Online Code Execution & Explanation', taName: 'நேரடி கோட் இயக்கப் விளக்கம்', price: 1500 },
      { id: 'paper_pub', name: 'Journal Publication & IEEE Paper Writing', taName: 'ஜெர்னல் வெளியீட்டு வழிகாட்டல்', price: 2500 },
      { id: 'hardware', name: 'IoT / Hardware Sensor Integration Code', taName: 'IoT / ஹார்டுவேர் ஒருங்கிணைப்பு', price: 3000 },
      { id: 'express_proj', name: 'Urgent 24-48h Express Delivery', taName: '24-48 மணிநேர அவசர டெலிவரி', price: 2000 },
      { id: 'plagiarism', name: 'Zero Plagiarism Report & Documentation', taName: 'ப்ளேஜியரிசம் இல்லா அறிக்கை', price: 1200 },
    ]
  }
};

export const CostCalculator: React.FC<CostCalculatorProps> = ({ 
  lang = 'en',
  onOpenInquiryWithEstimate 
}) => {
  const isTa = lang === 'ta';

  const [serviceType, setServiceType] = useState<ServiceCategoryKey>('web');
  const [scale, setScale] = useState<ScaleTierKey>('pro');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['admin', 'seo']);

  const currentConfig = CATEGORY_CONFIGS[serviceType];

  const handleCategoryChange = (newType: ServiceCategoryKey) => {
    setServiceType(newType);
    // Select default recommended features for the new category
    const defaultFeats = CATEGORY_CONFIGS[newType].features.slice(0, 2).map(f => f.id);
    setSelectedFeatures(defaultFeats);
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const base = currentConfig[scale].price;
    const featuresCost = selectedFeatures.reduce((acc, featId) => {
      const feat = currentConfig.features.find(f => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);
    return base + featuresCost;
  };

  const totalEstimate = calculateTotal();

  const handleRequestQuote = () => {
    const featNames = selectedFeatures
      .map(fId => {
        const feat = currentConfig.features.find(item => item.id === fId);
        return isTa ? feat?.taName : feat?.name;
      })
      .filter(Boolean)
      .join(', ');

    const tierObj = currentConfig[scale];
    const details = `Estimated Approx Budget: ~ ₹${totalEstimate.toLocaleString('en-IN')} (Approx.) | Tier: ${scale.toUpperCase()} (${isTa ? tierObj.taLabel : tierObj.label}) | Add-ons: ${featNames || 'None'}`;
    
    if (onOpenInquiryWithEstimate) {
      onOpenInquiryWithEstimate(isTa ? currentConfig.taName : currentConfig.name, details);
    }
  };

  return (
    <section id="cost-calculator" className="py-10 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-4 mb-6 sm:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold backdrop-blur-md">
            <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>{isTa ? 'உடனடி பட்ஜெட் கணக்கீடு' : 'Instant Project Budget Estimator'}</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-5xl font-black text-white">
            {isTa ? 'திட்ட செலவு கணக்கீட்டான்' : 'Interactive Project Cost Calculator'}
          </h2>

          <p className="text-amber-100/80 text-xs sm:text-base leading-relaxed">
            {isTa 
              ? 'உங்கள் சேவை வகையைத் தேர்ந்தெடுத்து, தேவைக்கேற்ப பேக்கேஜ் மற்றும் அம்சங்களை தேர்வு செய்து உடனடியாக தோராயமான பட்ஜெட்டை தெரிந்து கொள்ளுங்கள்.'
              : 'Choose your service category, select package scale, and customize features for an instant, dynamic approximate estimate.'}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-start">
          
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 bg-slate-950/80 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-500/30 shadow-2xl backdrop-blur-lg">
            
            {/* Step 1: Service Category Selection */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center justify-between">
                <span>1. {isTa ? 'சேவை வகையைத் தேர்ந்தெடுக்கவும்' : 'Select Service Category'}</span>
                <span className="text-[11px] text-amber-300/80 font-semibold normal-case">Tailored for each category</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'web', name: isTa ? 'இணையதளம்' : 'Web Dev' },
                  { id: 'mobile', name: isTa ? 'மொபைல் ஆப்' : 'Mobile App' },
                  { id: 'internship', name: isTa ? 'இன்டர்ன்ஷிப்' : 'AI Internship' },
                  { id: 'project', name: isTa ? 'ப்ராஜெக்ட்' : 'IEEE Project' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleCategoryChange(item.id as ServiceCategoryKey)}
                    className={`px-3 py-3 rounded-2xl text-xs font-bold transition-all border cursor-pointer text-center ${
                      serviceType === item.id 
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg gold-glow font-extrabold scale-[1.02]'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Package Scale / Tier */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center justify-between">
                <span>2. {isTa ? 'பேக்கேஜ் அளவைத் தேர்ந்தெடுக்கவும்' : 'Select Package Scale'}</span>
                <span className="text-[11px] font-bold text-emerald-400">Live Price Updates</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { 
                    id: 'starter', 
                    title: isTa ? 'ஸ்டார்ட்டர்' : 'Starter', 
                    sub: isTa ? currentConfig.starter.taLabel : currentConfig.starter.label,
                    price: currentConfig.starter.price 
                  },
                  { 
                    id: 'pro', 
                    title: isTa ? 'புரோ (பிரபலம்)' : 'Pro (Popular)', 
                    sub: isTa ? currentConfig.pro.taLabel : currentConfig.pro.label,
                    price: currentConfig.pro.price 
                  },
                  { 
                    id: 'enterprise', 
                    title: isTa ? 'என்டர்பிரைஸ்' : 'Enterprise', 
                    sub: isTa ? currentConfig.enterprise.taLabel : currentConfig.enterprise.label,
                    price: currentConfig.enterprise.price 
                  },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setScale(tier.id as ScaleTierKey)}
                    className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      scale === tier.id 
                        ? 'bg-slate-900 border-amber-400 ring-2 ring-amber-500/50 shadow-xl'
                        : 'bg-slate-900/50 border-slate-800 hover:border-amber-500/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{tier.title}</span>
                        {scale === tier.id && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-tight">{tier.sub}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-800/80 text-amber-400 text-xs font-black">
                      ~ ₹{tier.price.toLocaleString('en-IN')} <span className="text-[10px] text-slate-400 font-medium">(Approx.)</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-on Features for Selected Category */}
            <div className="space-y-3">
              <label className="text-xs font-extrabold text-amber-400 uppercase tracking-widest flex items-center justify-between">
                <span>3. {isTa ? 'கூடுதல் அம்சங்கள்' : `Optional Add-ons for ${currentConfig.name}`}</span>
                <span className="text-[11px] text-slate-400">Toggle to include</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentConfig.features.map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-sm' 
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{isTa ? feature.taName : feature.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-amber-300 ml-2 shrink-0">+~₹{feature.price.toLocaleString('en-IN')}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Estimate Summary Box */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl space-y-6 lg:sticky lg:top-24">
            
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
              <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isTa ? 'தோராயமான பட்ஜெட் கணக்கீடு' : 'Estimated Approx Investment'}</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                MONIX Estimate
              </span>
            </div>

            {/* Price Display */}
            <div className="space-y-2 text-center py-2">
              <div className="text-xs text-amber-300/80 font-bold tracking-wider uppercase">
                {isTa ? currentConfig.taName : currentConfig.name} • {scale.toUpperCase()} TIER
              </div>
              <div className="font-cinzel text-3xl sm:text-5xl font-black text-gold-gradient drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]">
                ~ ₹{totalEstimate.toLocaleString('en-IN')}
              </div>
              <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-400/20 rounded-full text-amber-300 font-bold text-xs">
                (Approximate Quote)
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1 max-w-xs mx-auto">
                *{isTa 
                  ? 'காட்டப்படும் தொகைகள் தோராயமானவை. வாடிக்கையாளர் தேவைகளைப் பொறுத்து விலை பேசித் தீர்மானிக்கப்படலாம் அல்லது மாற்றப்படலாம்.'
                  : 'Prices shown are approximate estimates. Final pricing can be negotiated or tailored higher/lower based on client requirements.'}
              </p>
            </div>

            {/* Features Breakdown */}
            <div className="space-y-2 bg-slate-900/80 p-4 rounded-2xl border border-amber-500/20 text-xs text-slate-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-amber-300 font-bold text-[11px]">
                <span>Selected Tier Base</span>
                <span>~ ₹{currentConfig[scale].price.toLocaleString('en-IN')}</span>
              </div>
              {selectedFeatures.length > 0 && (
                <div className="space-y-1 pt-1 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block mb-1">Included Add-ons ({selectedFeatures.length}):</span>
                  {selectedFeatures.map(fId => {
                    const feat = currentConfig.features.find(f => f.id === fId);
                    if (!feat) return null;
                    return (
                      <div key={fId} className="flex justify-between items-center text-[10px]">
                        <span className="truncate max-w-[180px]">• {isTa ? feat.taName : feat.name}</span>
                        <span className="text-amber-400">+~₹{feat.price.toLocaleString('en-IN')}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quality & Maintenance Assurance */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isTa ? '100% தூய்மையான கோடிங் & லைட்னிங் வேகம்' : 'Clean Modern Codebase & High Performance'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isTa ? 'இலவச பராமரிப்பு & 24/7 தொழில் நுட்ப உதவி' : 'Free Maintenance Support & Lifetime Code Guarantee'}</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px] text-amber-300">
                <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isTa ? 'முழுமையாக விவாதிக்கத்தக்க நெகிழ்வான பட்ஜெட்' : 'Negotiable & Customizable to match exact budget'}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleRequestQuote}
              className="w-full py-4 bg-gold-gradient text-slate-950 font-black rounded-2xl text-sm shadow-xl gold-glow hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>{isTa ? 'இந்த பட்ஜெட்டில் அதிகாரப்பூர்வ விலை கோரவும்' : 'Request Official Quote for this Estimate'}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
