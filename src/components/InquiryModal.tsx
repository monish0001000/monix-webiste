import React, { useState, useEffect } from 'react';
import { 
  X, Check, Upload, Sparkles, Send, ShieldCheck, ArrowRight, ArrowLeft, 
  Copy, FileText, AlertCircle, MessageCircle, Lock, RefreshCw, Trash2,
  Award, Clock, CheckCircle2, Zap, Star, PartyPopper
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, InquiryFormData } from '../types';
import { translations } from '../data/translations';
import { WEB_CATEGORIES, MOBILE_CATEGORIES, INTERNSHIP_PROGRAMS, PROJECT_CATEGORIES } from '../data/content';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  preselectedService?: string;
  preselectedCategory?: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  captcha?: string;
  requirement?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  lang,
  preselectedService = 'Website Development',
  preselectedCategory = '',
}) => {
  const t = translations[lang];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [copied, setCopied] = useState(false);

  // Math Captcha for Anti-Spam
  const [captchaNum1, setCaptchaNum1] = useState(7);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [userCaptcha, setUserCaptcha] = useState('');
  
  // Honeypot field (hidden for human users)
  const [honeypot, setHoneypot] = useState('');

  // Extended Form State with Timeline
  const [formData, setFormData] = useState<InquiryFormData & { timeline?: string }>({
    name: '',
    phone: '',
    email: '',
    service: preselectedService,
    category: preselectedCategory || WEB_CATEGORIES[0],
    budget: '₹4,999 - ₹10,000 (Standard)',
    requirement: '',
    documentName: '',
    timeline: 'Standard (1 - 2 Weeks)',
  });

  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Reset or initialize state on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitted(false);
      setSubmitting(false);
      setErrors({});
      setRefId('');
      setCopied(false);

      // Generate random captcha
      const num1 = Math.floor(Math.random() * 8) + 2;
      const num2 = Math.floor(Math.random() * 8) + 1;
      setCaptchaNum1(num1);
      setCaptchaNum2(num2);
      setUserCaptcha('');
      setHoneypot('');

      setFormData({
        name: '',
        phone: '',
        email: '',
        service: preselectedService || 'Website Development',
        category: preselectedCategory || WEB_CATEGORIES[0],
        budget: preselectedService === 'Mobile Applications' ? '₹7,999 - ₹15,000' : '₹4,999 - ₹10,000',
        requirement: '',
        documentName: '',
        timeline: 'Standard (1 - 2 Weeks)',
      });
      setUploadedFile(null);
    }
  }, [isOpen, preselectedService, preselectedCategory]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (at least 2 characters)';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit WhatsApp number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: FormErrors = {};

    // Validate Captcha
    const expectedSum = captchaNum1 + captchaNum2;
    if (parseInt(userCaptcha.trim(), 10) !== expectedSum) {
      newErrors.captcha = `Incorrect answer. What is ${captchaNum1} + ${captchaNum2}?`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strictly extract digits and cap at 10
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: digitsOnly });
    if (errors.phone) setErrors({ ...errors, phone: undefined });
  };

  const handleServiceChange = (service: string) => {
    let defaultCat = '';
    let defaultBudget = '₹4,999 - ₹10,000';

    if (service === 'Website Development') {
      defaultCat = WEB_CATEGORIES[0];
      defaultBudget = '₹4,999 - ₹10,000';
    } else if (service === 'Mobile Applications') {
      defaultCat = MOBILE_CATEGORIES[0];
      defaultBudget = '₹7,999 - ₹15,000';
    } else if (service === 'AI Internship' || service === 'Live AI Internship') {
      defaultCat = INTERNSHIP_PROGRAMS[0];
      defaultBudget = 'Student Internship Package';
    } else {
      defaultCat = PROJECT_CATEGORIES[0];
      defaultBudget = 'Academic Project Package';
    }

    setFormData({ ...formData, service, category: defaultCat, budget: defaultBudget });
  };

  const getCategoryOptions = () => {
    switch (formData.service) {
      case 'Website Development':
        return WEB_CATEGORIES;
      case 'Mobile Applications':
        return MOBILE_CATEGORIES;
      case 'AI Internship':
      case 'Live AI Internship':
        return INTERNSHIP_PROGRAMS;
      default:
        return PROJECT_CATEGORIES;
    }
  };

  const appendRequirementTag = (tagText: string) => {
    const current = formData.requirement.trim();
    if (current.includes(tagText)) return;
    const updated = current ? `${current}\n- ${tagText}` : `- ${tagText}`;
    setFormData({ ...formData, requirement: updated });
  };

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit.');
      return;
    }
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setUploadedFile({
      name: file.name,
      size: `${sizeInMB} MB`,
      type: file.type || 'Document',
    });
    setFormData((prev) => ({ ...prev, documentName: file.name }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const fireGrandCelebration = () => {
    // Initial big burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#D97706', '#10B981', '#FBBF24', '#FFFFFF'],
    });

    // Secondary side cannons
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F59E0B', '#FFD700', '#FFFFFF'],
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#F59E0B', '#FFD700', '#FFFFFF'],
      });
    }, 250);

    // Final sparkle shower
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.3 },
        shapes: ['star'],
        colors: ['#FFD700', '#D4AF37', '#10B981'],
      });
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot.trim() !== '') {
      setSubmitted(true);
      return;
    }

    // Rate Limiting Cooldown Check (30 seconds)
    const lastSubTime = localStorage.getItem('monix_last_inquiry_time');
    if (lastSubTime) {
      const elapsed = Date.now() - parseInt(lastSubTime, 10);
      if (elapsed < 30000) {
        const remainingSecs = Math.ceil((30000 - elapsed) / 1000);
        setErrors(prev => ({
          ...prev,
          captcha: `Rate limit active: Please wait ${remainingSecs}s before sending another inquiry to prevent spam.`
        }));
        return;
      }
    }

    if (!validateStep3()) return;

    // Record current submission timestamp for cooldown
    localStorage.setItem('monix_last_inquiry_time', Date.now().toString());

    setSubmitting(true);

    const generatedId = `MONIX-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedId);

    // Telegram & Google Sheet Dispatch Configuration
    const TELEGRAM_BOT_TOKEN = "8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc";
    const TELEGRAM_CHAT_ID = "-1003676902980";
    const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzB_OxIcpvXWgqw2hkoDc9u8mrROqsvgRURUhd1l-G5MMQ4n30fxt-ch7C_njXYrXgU1A/exec";
    const GOOGLE_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1TTbSQXCOWDICz3EZw_E8BeQdWI17oyonYGyZlS-jGI4/edit?usp=sharing";

    const escapeHtml = (str: string) => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 1. Dispatch to Google Sheet Web App (with Ticket ID MONIX-XXXXXX)
    const sheetPayload = {
      ticketId: generatedId,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      programType: formData.category || formData.service || "General Inquiry",
      program: formData.service || formData.category || "General Inquiry",
      dynamicVal: `[Ticket: ${generatedId}] ` + (formData.budget || ""),
      message: `Inquiry Ticket Ref: ${generatedId} | Details: ${formData.requirement || "None"}`,
      source: `Inquiry Modal (${generatedId})`,
      url: window.location.href
    };

    try {
      const payloadString = JSON.stringify(sheetPayload);
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payloadString], { type: 'text/plain;charset=utf-8' });
        navigator.sendBeacon(GOOGLE_SHEET_WEBAPP_URL, blob);
      } else {
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: payloadString
        }).catch(() => {});
      }
    } catch {
      // Safe fallback
    }

    // 2. Dispatch to Telegram Bot (with Ticket ID MONIX-XXXXXX)
    const telegramText = `
🌟 <b>New Website Enquiry Received!</b> 🌟
━━━━━━━━━━━━━━━━━━
🎫 <b>Inquiry Reference Ticket ID:</b> <code>${generatedId}</code>
📝 <b>Source / Category:</b> ${escapeHtml(formData.category || formData.service)}
💼 <b>Service / Program:</b> ${escapeHtml(formData.service || formData.category)}
✏️ <b>Target Timeline:</b> ${escapeHtml(formData.timeline || 'Standard')}
👤 <b>Client Name:</b> ${escapeHtml(formData.name)}
📞 <b>WhatsApp Phone:</b> +91 ${escapeHtml(formData.phone)}
📧 <b>Email Address:</b> ${escapeHtml(formData.email)}
💰 <b>Estimated Budget:</b> ${escapeHtml(formData.budget)}
🕒 <b>Time (IST):</b> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
📊 <b>Google Sheet:</b> <a href="${GOOGLE_SHEET_VIEW_URL}">Open Leads Database ↗</a>
━━━━━━━━━━━━━━━━━━
    `.trim();

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    }).catch(err => console.error('Telegram notification dispatch error:', err));

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      fireGrandCelebration();
    }, 1500);
  };

  const copyRefId = () => {
    if (refId) {
      navigator.clipboard.writeText(refId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello MONIX Team!\nI submitted an inquiry on your website.\n\n🎟 Ticket ID: ${refId}\n👤 Name: ${formData.name}\n📞 WhatsApp: +91 ${formData.phone}\n🚀 Service: ${formData.service}\n📌 Category: ${formData.category}\n💰 Budget: ${formData.budget}\n⏱ Timeline: ${formData.timeline || 'Standard'}\n\nPlease share the quote and details.`
    );
    return `https://wa.me/919025087129?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden my-6 sm:my-8">
        
        {/* Top Gold Accent Bar */}
        <div className="h-2.5 w-full bg-gold-gradient"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 pb-4 border-b border-amber-500/15">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">{t.modalTitle}</h3>
              <p className="text-xs text-slate-500">{t.modalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {!submitted && (
          <div className="bg-amber-500/5 px-6 py-3 border-b border-amber-500/10 flex items-center justify-between text-xs font-semibold text-slate-600">
            <span className={`flex items-center space-x-1.5 ${step === 1 ? 'text-amber-800 font-bold' : step > 1 ? 'text-emerald-700 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${step === 1 ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs' : step > 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>1</span>
              <span>{t.step1}</span>
            </span>
            <span className="text-amber-300">•</span>
            <span className={`flex items-center space-x-1.5 ${step === 2 ? 'text-amber-800 font-bold' : step > 2 ? 'text-emerald-700 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${step === 2 ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs' : step > 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200'}`}>2</span>
              <span>{t.step2}</span>
            </span>
            <span className="text-amber-300">•</span>
            <span className={`flex items-center space-x-1.5 ${step === 3 ? 'text-amber-800 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center ${step === 3 ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs' : 'bg-slate-200'}`}>3</span>
              <span>{t.step3}</span>
            </span>
          </div>
        )}

        {/* Form Body */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            /* GRAND CONGRATULATIONS CELEBRATION STATE */
            <div className="text-center py-4 space-y-6 animate-fade-in">
              
              {/* Floating Animated Celebration Badge */}
              <div className="relative inline-block">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 blur-lg opacity-75 animate-pulse"></div>
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 border-4 border-white rounded-3xl flex items-center justify-center mx-auto text-slate-950 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5] text-slate-950" />
                </div>
              </div>

              {/* Congratulatory Headline */}
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-black tracking-wider uppercase">
                  <PartyPopper className="w-4 h-4 text-amber-600" />
                  <span>Congratulations! Inquiry Registered</span>
                </div>
                
                <h4 className="font-cinzel text-2xl sm:text-3xl font-black text-slate-900">
                  You're All Set!
                </h4>
                
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>! Your inquiry for <strong className="text-amber-800">{formData.service}</strong> has been logged into our priority queue.
                </p>
              </div>

              {/* Official Ticket & Receipt Card */}
              <div className="bg-slate-950 text-white rounded-2xl p-5 border border-amber-500/40 shadow-xl text-left max-w-lg mx-auto space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block">Inquiry Reference Ticket</span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-widest">{refId}</span>
                  </div>
                  <button
                    onClick={copyRefId}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-300 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Client Name</span>
                    <span className="font-bold text-slate-100">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">WhatsApp Phone</span>
                    <span className="font-bold text-slate-100">+91 {formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Service & Category</span>
                    <span className="font-bold text-amber-300 truncate block">{formData.service} ({formData.category})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Est. Budget</span>
                    <span className="font-bold text-emerald-400">{formData.budget}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Response SLA: Within 2 Hours</span>
                  </span>
                  <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Priority Queue</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Connect Instant on WhatsApp</span>
                </a>
                
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-amber-300 border border-amber-500/30 rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-all cursor-pointer"
                >
                  {t.closeModal}
                </button>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Bot Honeypot Field (Hidden) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  autoComplete="off"
                />
              </div>

              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-slate-900 text-sm ${
                        errors.name ? 'border-red-500 focus:ring-red-400' : 'border-amber-500/30 focus:ring-amber-500'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      WhatsApp Phone Number (10 Digits) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-xs font-extrabold text-slate-600">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full pl-12 pr-12 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-slate-900 text-sm font-mono tracking-wider ${
                          errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-amber-500/30 focus:ring-amber-500'
                        }`}
                      />
                      <span className="absolute right-3.5 top-3.5 text-xs font-semibold text-slate-400">
                        {formData.phone.length}/10
                      </span>
                    </div>
                    {errors.phone ? (
                      <p className="text-xs text-red-600 mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.phone}</p>
                    ) : (
                      <p className="text-[11px] text-slate-500 mt-1">We send instant project quotes & PDF proposals directly via WhatsApp.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.emailAddr} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-slate-900 text-sm ${
                        errors.email ? 'border-red-500 focus:ring-red-400' : 'border-amber-500/30 focus:ring-amber-500'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.email}</p>}
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (validateStep1()) setStep(2);
                      }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gold-gradient text-slate-950 font-bold text-sm rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-all"
                    >
                      <span>Proceed to Step 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Service & Details */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.selectService} *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm font-semibold"
                    >
                      <option value="Website Development">Website Development (Pricing from ₹4,999*)</option>
                      <option value="Mobile Applications">Mobile Applications (Pricing from ₹7,999*)</option>
                      <option value="AI Internship">AI Internship (100% Online & Mentorship)</option>
                      <option value="Academic Projects">Academic & IEEE Major Projects</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.selectCategory} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                    >
                      {getCategoryOptions().map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {t.estimatedBudget}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl border border-amber-500/30 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-xs font-medium"
                      >
                        <option value="₹4,999 - ₹10,000 (Standard)">₹4,999 - ₹10,000 (Standard)</option>
                        <option value="₹10,000 - ₹25,000 (Professional)">₹10,000 - ₹25,000 (Professional)</option>
                        <option value="₹25,000 - ₹50,000 (Enterprise)">₹25,000 - ₹50,000 (Enterprise)</option>
                        <option value="₹50,000+ (Custom SaaS / ERP)">₹50,000+ (Custom SaaS / ERP)</option>
                        <option value="Student Internship Package">Student Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Target Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3.5 py-3 rounded-xl border border-amber-500/30 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-xs font-medium"
                      >
                        <option value="Standard (1 - 2 Weeks)">Standard (1 - 2 Weeks)</option>
                        <option value="Express Priority (3 - 5 Days)">Express Priority (3 - 5 Days)</option>
                        <option value="Urgent Delivery (48 Hours)">Urgent Delivery (48 Hours)</option>
                        <option value="Flexible Schedule">Flexible Schedule</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-amber-500/15">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center space-x-1 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center space-x-2 px-6 py-2.5 bg-gold-gradient text-slate-950 font-bold text-sm rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-all"
                    >
                      <span>Proceed to Step 3</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Requirements, File Dropzone & Anti-Spam Captcha */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t.reqDescription}
                      </label>
                      <span className="text-[10px] text-amber-800 font-semibold">Tap chips to add quick features</span>
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Describe key features, reference websites, specific objectives, or deadlines..."
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 text-sm"
                    />

                    {/* Quick Requirement Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={() => appendRequirementTag('Payment Gateway Integration')}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        + Payment Gateway
                      </button>
                      <button
                        type="button"
                        onClick={() => appendRequirementTag('Mobile Responsive Layout')}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        + Mobile Responsive
                      </button>
                      <button
                        type="button"
                        onClick={() => appendRequirementTag('Admin Control Panel')}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        + Admin Panel
                      </button>
                      <button
                        type="button"
                        onClick={() => appendRequirementTag('SEO & Fast Loading Optimization')}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        + SEO & Speed
                      </button>
                    </div>
                  </div>

                  {/* Drag and Drop File Upload Area */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.uploadDoc}
                    </label>
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-2xl p-3.5 text-center transition-all relative ${
                        isDragging ? 'border-amber-500 bg-amber-500/15 scale-[1.01]' : 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500'
                      }`}
                    >
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt,.zip"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      
                      {uploadedFile ? (
                        <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-amber-500/30 text-xs text-slate-800">
                          <div className="flex items-center space-x-2 text-left">
                            <FileText className="w-5 h-5 text-amber-600 shrink-0" />
                            <div className="truncate max-w-[240px]">
                              <p className="font-bold text-slate-900 truncate">{uploadedFile.name}</p>
                              <p className="text-[10px] text-slate-500">{uploadedFile.size}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFile(null);
                              setFormData({ ...formData, documentName: '' });
                            }}
                            className="p-1 rounded-lg text-red-500 hover:bg-red-50 z-20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                          <p className="text-xs font-bold text-slate-800">
                            Drag & Drop project file here, or <span className="text-amber-700 underline">browse</span>
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Supports PDF, Word, JPG, PNG, ZIP (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Anti-Spam Math Protection */}
                  <div className="bg-white p-3 rounded-2xl border border-amber-500/30 flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                      <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Security Verification: What is <strong className="text-slate-950 text-sm font-extrabold">{captchaNum1} + {captchaNum2}</strong>?</span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Answer"
                      value={userCaptcha}
                      onChange={(e) => {
                        setUserCaptcha(e.target.value);
                        if (errors.captcha) setErrors({ ...errors, captcha: undefined });
                      }}
                      className="w-24 px-3 py-1.5 rounded-xl border border-amber-500/40 text-center font-bold text-slate-900 text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  {errors.captcha && <p className="text-xs text-red-600 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{errors.captcha}</p>}

                  {/* Complete Confirmation Summary Box */}
                  <div className="bg-slate-900 text-white p-3.5 rounded-2xl text-xs space-y-1.5 border border-amber-500/30">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
                      <span>Inquiry Summary Confirmation</span>
                      <span className="text-emerald-400">Ready To Submit</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <p><strong className="text-slate-400">Client:</strong> {formData.name}</p>
                      <p><strong className="text-slate-400">WhatsApp:</strong> +91 {formData.phone}</p>
                      <p><strong className="text-slate-400">Service:</strong> {formData.service}</p>
                      <p><strong className="text-slate-400">Category:</strong> {formData.category}</p>
                      <p><strong className="text-slate-400">Budget:</strong> {formData.budget}</p>
                      <p><strong className="text-slate-400">Timeline:</strong> {formData.timeline}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-amber-500/15">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center space-x-1 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex items-center space-x-2 px-8 py-3 bg-gold-gradient text-slate-950 font-black text-sm rounded-xl shadow-lg gold-glow cursor-pointer hover:opacity-95 transition-all"
                    >
                      {submitting ? (
                        <span className="flex items-center space-x-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Official Ticket...</span>
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-slate-950" />
                          <span>Submit Official Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
