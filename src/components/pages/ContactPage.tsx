import React, { useState } from 'react';
import { 
  Mail, Phone, Globe, MessageSquare, Instagram, Linkedin, Send, Clock, 
  ShieldCheck, MapPin, CheckCircle2, Copy, AlertCircle, RefreshCw, MessageCircle, ExternalLink, Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language } from '../../types';
import { translations } from '../../data/translations';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = translations[lang];

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Honeypot field for bot protection
  const [honeypot, setHoneypot] = useState('');

  // Math Captcha
  const [captchaNum1] = useState(8);
  const [captchaNum2] = useState(3);
  const [userCaptcha, setUserCaptcha] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Website Project',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rajibabu1184@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyTicket = () => {
    if (ticketId) {
      navigator.clipboard.writeText(ticketId);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam Honeypot Check
    if (honeypot.trim() !== '') {
      console.warn('Bot detected via honeypot field.');
      setSubmitted(true);
      return;
    }

    // Validate Captcha
    if (parseInt(userCaptcha.trim(), 10) !== captchaNum1 + captchaNum2) {
      setCaptchaError(`Math answer incorrect. What is ${captchaNum1} + ${captchaNum2}?`);
      return;
    }

    setCaptchaError('');
    setSubmitting(true);

    const newTicket = `TICKET-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(newTicket);

    // Telegram & Google Sheet Dispatch Configuration
    const TELEGRAM_BOT_TOKEN = "8251796240:AAGPRIAZH50aUl6Vlmtu1ZKOFmANOiH2lYc";
    const TELEGRAM_CHAT_ID = "-1003676902980";
    const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzB_OxIcpvXWgqw2hkoDc9u8mrROqsvgRURUhd1l-G5MMQ4n30fxt-ch7C_njXYrXgU1A/exec";
    const GOOGLE_SHEET_VIEW_URL = "https://docs.google.com/spreadsheets/d/1TTbSQXCOWDICz3EZw_E8BeQdWI17oyonYGyZlS-jGI4/edit?usp=sharing";

    const escapeHtml = (str: string) => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 1. Dispatch to Google Sheet Web App
    const sheetPayload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: form.name,
      email: form.email,
      phone: form.phone,
      programType: "Contact Desk",
      program: form.subject || "General Inquiry",
      dynamicVal: newTicket,
      message: form.message,
      source: "Contact Page",
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

    // 2. Dispatch to Telegram Bot
    const telegramText = `
🌟 <b>New Website Enquiry Received!</b> 🌟
━━━━━━━━━━━━━━━━━━
📝 <b>Source:</b> Contact Desk
💼 <b>Program:</b> ${escapeHtml(form.subject || 'General Inquiry')}
✏️ <b>Internship Duration:</b> Standard
👤 <b>Name:</b> ${escapeHtml(form.name)}
📞 <b>Phone:</b> ${escapeHtml(form.phone)}
📧 <b>Email:</b> ${escapeHtml(form.email)}
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

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFD700', '#B8860B', '#1E293B'],
        });
      } catch (err) {}
    }, 1500);
  };

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi MONIX Team, I am visiting your website contact desk.\nName: ${form.name || 'Client'}\nSubject: ${form.subject}\nMessage: ${form.message || 'I would like to discuss a project requirement.'}`
    );
    return `https://wa.me/919025087129?text=${text}`;
  };

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Get In Touch
          </span>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-slate-900">
            Contact MONIX Software Solutions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Have a project requirement or internship inquiry? Speak directly with our executive technology team today.
          </p>
          <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Channels & Interactive Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Connect Quick Action Bar */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-300/20 rounded-full blur-2xl"></div>
              
              <div className="flex items-center space-x-2 text-xs uppercase font-extrabold tracking-wider bg-slate-950/15 w-fit px-3 py-1 rounded-full text-slate-900">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                <span>Instant Connect Desk</span>
              </div>
              
              <h3 className="font-cinzel text-xl font-bold text-slate-950">
                Need Fast Project Guidance?
              </h3>
              <p className="text-xs text-slate-900 leading-relaxed font-medium">
                Connect directly on WhatsApp or dial our official helpline for immediate pricing estimates and scope analysis.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://wa.me/919025087129?text=Hi%20MONIX%20Software%20Solutions,%20I%20have%20a%20project%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                
                <a
                  href="tel:+919025087129"
                  className="flex-1 py-3 px-4 bg-slate-950 hover:bg-slate-900 text-amber-400 rounded-xl font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Helpline</span>
                </a>
              </div>
            </div>

            {/* Official Channels Details */}
            <div className="glass-card p-8 rounded-3xl border border-amber-500/30 shadow-lg space-y-6">
              <h3 className="font-cinzel text-xl font-bold text-slate-900">
                Official Channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Phone Number */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Direct Contact & Helpline</p>
                    <a href="tel:+919025087129" className="text-amber-800 font-bold hover:underline flex items-center">
                      <span>+91 90250 87129</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-bold text-slate-900">Official Email</p>
                    <div className="flex items-center justify-between">
                      <a href="mailto:rajibabu1184@gmail.com" className="text-amber-800 font-semibold hover:underline truncate max-w-[200px] sm:max-w-none">
                        rajibabu1184@gmail.com
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="ml-2 text-[11px] px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-900 font-bold rounded-lg cursor-pointer transition-colors shrink-0"
                      >
                        {copiedEmail ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Working Hours</p>
                    <p className="text-slate-600">Monday - Saturday: 9:00 AM - 8:00 PM IST</p>
                    <p className="text-[11px] text-emerald-700 font-bold mt-0.5">🟢 Support Desk Operational Today</p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Service Coverage</p>
                    <p className="text-slate-600">Govt of India MSME Registered Enterprise — Pan-India Online Services</p>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-amber-500/20 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.instagram.com/monix.srm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-pink-500/30 rounded-xl text-pink-900 font-bold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
                >
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span>monix.srm</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/company/monix-softwaresolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-900 font-bold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-700" />
                  <span>monix-softwaresolutions</span>
                </a>
              </div>
            </div>

            {/* Interactive Location / Pan-India Service Center Card */}
            <div className="glass-card p-6 rounded-3xl border border-amber-500/30 shadow-md space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-800">
                <Compass className="w-4 h-4 text-amber-600" />
                <span>Pan-India Virtual Tech Hub</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We operate digitally with high-speed remote consultation, code sync, real-time preview links, and instant WhatsApp support for corporate clients and university students across India.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form with Anti-Spam & Payload Tracking */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-amber-500/30 shadow-lg">
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-cinzel text-2xl font-bold text-slate-900">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-slate-500">Fill the form below for an official reply within 2 hours.</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700">
                  <MessageSquare className="w-5 h-5 text-amber-600" />
                </div>
              </div>

              {submitted ? (
                /* SUCCESS STATE */
                <div className="text-center py-10 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 bg-amber-500/15 border-2 border-amber-500 rounded-full flex items-center justify-center mx-auto text-amber-700 gold-glow">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="font-cinzel text-2xl font-bold text-slate-900">Message Dispatched!</h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                      Thank you for contacting MONIX. Our engineering coordinator will respond to your inquiry on WhatsApp and Email shortly.
                    </p>
                  </div>

                  {/* Reference Ticket Card */}
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl max-w-md mx-auto flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[11px] uppercase font-bold text-amber-900 tracking-wider">Reference Support Ticket</p>
                      <p className="font-mono text-base font-black text-slate-900">{ticketId}</p>
                    </div>
                    <button
                      onClick={handleCopyTicket}
                      className="px-3 py-1.5 bg-white border border-amber-500/30 hover:bg-amber-50 rounded-xl text-xs font-bold text-amber-900 shadow-xs cursor-pointer transition-all flex items-center space-x-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedTicket ? 'Copied!' : 'Copy Ticket'}</span>
                    </button>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Follow up on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: '',
                          phone: '',
                          email: '',
                          subject: 'Website Project',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-white border border-amber-500/30 text-slate-800 font-bold text-xs rounded-xl hover:bg-amber-50 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Honeypot field for anti-spam */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Inquiry Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-900"
                    >
                      <option value="Website Project">Website Development Project (From ₹4,999*)</option>
                      <option value="Mobile App Project">Mobile Application Development (From ₹7,999*)</option>
                      <option value="AI Internship">AI Internship Application (Online)</option>
                      <option value="Academic Project">College Academic / IEEE Project</option>
                      <option value="General Inquiry">General Corporate Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Message / Project Details *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your requirements, preferred tech stack, or questions..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-amber-500/30 bg-white focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                    />
                  </div>

                  {/* Anti-Spam Math Validation */}
                  <div className="bg-white p-3 rounded-xl border border-amber-500/30 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700">
                      Anti-Spam Verification: <strong className="text-slate-950 font-bold">{captchaNum1} + {captchaNum2} = ?</strong>
                    </span>
                    <input
                      type="number"
                      required
                      placeholder="Result"
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                      className="w-20 px-3 py-1 rounded-lg border border-amber-500/40 text-center font-bold text-sm focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  {captchaError && (
                    <p className="text-xs text-red-600 flex items-center"><AlertCircle className="w-3.5 h-3.5 mr-1" />{captchaError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gold-gradient text-slate-950 font-bold text-sm rounded-xl shadow-md gold-glow cursor-pointer hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                  >
                    {submitting ? (
                      <span className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Dispatching Payload...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Direct Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
