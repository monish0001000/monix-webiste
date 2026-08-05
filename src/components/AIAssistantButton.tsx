import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, User, ShieldCheck, RefreshCw, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

interface AIAssistantButtonProps {
  lang?: Language;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  isOutofScope?: boolean;
}

const MONIX_COMPANY_INFO = `
MONIX Software Solutions is an official Govt. Registered MSME Software & AI Enterprise in India.
Key Offerings & Details:
1. Website Development: Custom responsive websites, e-commerce, corporate portals, and SaaS platforms starting from ~₹4,999 (Approx, negotiable). Tech stack: React, TypeScript, Tailwind CSS, Node.js, Express, Python.
2. Mobile Applications: Cross-platform iOS & Android mobile applications starting from ~₹7,999 (Approx, negotiable). Features include push notifications, offline sync, biometric security, Google Maps API, and App Store / Play Store publishing.
3. AI Internships: 100% online mentorship programs (1 to 3 months) covering AI, Machine Learning, Full-Stack Web, and Mobile App development. Includes official MSME Internship Certificate, Offer Letter, Recommendation Letter (LOR), and senior developer guidance.
4. IEEE & Academic Projects: Major and mini projects for B.Tech/M.Tech/MCA/BCA computer science students. Includes full source code, synopsis, PPT deck, video explanation, and 24-48h express delivery.
5. Official Contact Details:
   - Phone / WhatsApp: +91 90250 87129
   - Official Email: rajibabu1184@gmail.com
   - Instagram: monix.srm
   - LinkedIn: monix-softwaresolutions
6. Mission & Values: Founded to deliver high-performance software engineering, transparent pricing, and quality technological education across India.
`;

const INITIAL_SUGGESTIONS = [
  "What web dev packages do you offer?",
  "Tell me about AI Internships",
  "How much for IEEE Academic Projects?",
  "How can I contact MONIX officials?"
];

export const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ lang = 'en' }) => {
  const isTa = lang === 'ta';
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: isTa 
        ? "வணக்கம்! நான் MONIX AI அசிஸ்டண்ட் 🤖. MONIX சாஃப்ட்வேர் சேவைகள், இணையதளம், ஆப் வளர்ச்சி, இன்டர்ன்ஷிப் மற்றும் ப்ராஜெக்ட்ஸ் பற்றிய உங்கள் கேள்விகளுக்கு பதிலளிக்க సిద్ధமாக உள்ளேன். நான் உங்களுக்கு எவ்வாறு உதவட்டும்?"
        : "Hello! I am MONIX AI Assistant 🤖. I am specialized in providing details about MONIX Software Solutions services, web/mobile development, live AI internships, and academic projects. How can I assist you today?",
      time: getCurrentTime()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const checkIsCompanyRelated = (query: string): boolean => {
    const q = query.toLowerCase();
    const companyKeywords = [
      'monix', 'service', 'website', 'web', 'app', 'mobile', 'android', 'ios',
      'internship', 'project', 'ieee', 'price', 'pricing', 'cost', 'quote',
      'contact', 'phone', 'whatsapp', 'email', 'certificate', 'lor', 'react',
      'python', 'ai', 'developer', 'software', 'technology', 'msme', 'founder',
      'deliver', 'domain', 'hosting', 'discount', 'offer', 'address', 'duration',
      'hi', 'hello', 'hey', 'வணக்கம்', 'ஹலோ'
    ];
    return companyKeywords.some(kw => q.includes(kw));
  };

  const getFallbackCompanyResponse = (query: string): { text: string; isOutofScope: boolean } => {
    const q = query.toLowerCase();

    if (!checkIsCompanyRelated(q)) {
      return {
        isOutofScope: true,
        text: isTa
          ? "மன்னிக்கவும்! நான் MONIX நிறுவனத்தின் சேவைகள், இணையதளம், ஆப் வளர்ச்சி மற்றும் இன்டர்ன்ஷிப் தொடர்பான தகவல்களை மட்டுமே வழங்க வடிவமைக்கப்பட்டுள்ளேன்.\n\nமற்ற பொதுவான அல்லது குறிப்பிட்ட சந்தேகங்களுக்கு தயவுசெய்து எங்களது அதிகாரப்பூர்வ குழுவை நேரடியாக தொடர்பு கொள்ளவும்:\n📞 தொலைபேசி / வாட்ஸ்அப்: +91 90250 87129\n📧 மின்னஞ்சல்: rajibabu1184@gmail.com"
          : "I am MONIX AI, dedicated exclusively to providing information about MONIX Software Solutions services, web/mobile development, AI internships, and academic projects.\n\nFor general or out-of-scope inquiries, please contact our official support team directly for direct clarifications:\n📞 Phone / WhatsApp: +91 90250 87129\n📧 Email: rajibabu1184@gmail.com"
      };
    }

    if (q.includes('web') || q.includes('website') || q.includes('இணையதளம்')) {
      return {
        isOutofScope: false,
        text: isTa 
          ? "MONIX இணையதள வளர்ச்சி சேவைகள் (Website Development):\n• ஸ்டார்ட்டர் லேண்டிங் பக்கம்: ~ ₹4,999 (தோராயமாக)\n• புரோ கார்ப்பரேட் போர்டல்: ~ ₹11,999 (தோராயமாக)\n• என்டர்பிரைஸ் சாஸ் / இ-காமர்ஸ்: ~ ₹24,999 (தோராயமாக)\nஅனைத்து இணையதளங்களும் Razorpay Payment, Google SEO, Admin Dashboard மற்றும் 100% மொபைல் ரெஸ்பான்சிவ் வசதிகளுடன் வழங்கப்படுகின்றன."
          : "MONIX Website Development Services:\n• Starter Landing Page: ~ ₹4,999 (Approx.)\n• Professional Corporate Portal: ~ ₹11,999 (Approx.)\n• Enterprise Custom SaaS / E-Commerce: ~ ₹24,999 (Approx.)\nAll web platforms feature payment gateway integration, admin CMS, Google SEO, and lightning fast responsiveness."
      };
    }

    if (q.includes('app') || q.includes('mobile') || q.includes('android') || q.includes('ios') || q.includes('ஆப்')) {
      return {
        isOutofScope: false,
        text: isTa
          ? "MONIX மொபைல் ஆப் வளர்ச்சி சேவைகள் (Mobile Applications):\n• ஹைப்ரிட் மொபைல் ஆப்: ~ ₹7,999 (தோராயமாக)\n• முழு அம்சங்கள் கொண்ட ஆப்: ~ ₹17,999 (தோராயமாக)\n• என்டர்பிரைஸ் மொபைல் தொகுப்பு: ~ ₹34,999 (தோராயமாக)\nPush Notifications, Google Maps API, ஆஃப்லைன் டேட்டா சேமிப்பு மற்றும் Play Store / App Store வெளியீடு ஆகியவை அடங்கும்."
          : "MONIX Mobile Application Services:\n• Hybrid Cross-Platform Native App: ~ ₹7,999 (Approx.)\n• Full-Featured iOS & Android App: ~ ₹17,999 (Approx.)\n• Enterprise Mobile Suite & API Backend: ~ ₹34,999 (Approx.)\nIncludes real-time push notifications, offline sync, GPS maps, and App Store publishing."
      };
    }

    if (q.includes('intern') || q.includes('internship') || q.includes('இன்டர்ன்ஷிப்') || q.includes('certificate') || q.includes('lor')) {
      return {
        isOutofScope: false,
        text: isTa
          ? "MONIX AI இன்டர்ன்ஷிப் (AI Internship):\n• 1 முதல் 3 மாதங்கள் வரையிலான 100% ஆன்லைன் நேரலை பயிற்சி\n• அரசு MSME பயிற்சி சான்றிதழ் + அதிகாரப்பூர்வ LOR கடிதம்\n• நேரடி மூத்த டெவலப்பர் வழிகாட்டல் மற்றும் லைவ் கிளவுட் ப்ராஜெக்ட் ஹோஸ்டிங்\nபயிற்சி கட்டணம் ~ ₹1,499 முதல் தொடங்குகிறது."
          : "MONIX Online AI Internship:\n• 1 to 3 Months online fast-track & master programs\n• Govt. MSME Verified Internship Certificate + Official LOR Letter\n• 1-on-1 Senior Developer Mentorship & Live Cloud Project Deployment\nPackages start from ~ ₹1,499 (Approx.) for students."
      };
    }

    if (q.includes('project') || q.includes('ieee') || q.includes('academic') || q.includes('ப்ராஜெக்ட்')) {
      return {
        isOutofScope: false,
        text: isTa
          ? "MONIX IEEE & கல்விசார் ப்ராஜெக்ட்ஸ் (Academic Projects):\n• மினி ப்ராஜெக்ட் கோட் + Abstract + PPT: ~ ₹2,999 (தோராயமாக)\n• மேஜர் IEEE ப்ராஜெக்ட் + அறிக்கை: ~ ₹5,999 (தோராயமாக)\n• 24-48 மணிநேர விரைவு அவசர டெலிவரி வசதி\nமுழுமையான கோட் இயக்க விளக்கம் மற்றும் Viva PPT தயாரிக்கப்படும்."
          : "MONIX IEEE & Academic Major Projects:\n• Mini Project Code + Abstract + PPT: ~ ₹2,999 (Approx.)\n• Major IEEE Project + Full Code & Documentation: ~ ₹5,999 (Approx.)\n• Custom Research & Paper Publication: ~ ₹12,999 (Approx.)\nIncludes 24-48h express delivery options and live code execution walkthrough."
      };
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('email') || q.includes('அதிகாரி')) {
      return {
        isOutofScope: false,
        text: isTa
          ? "MONIX அதிகாரப்பூர்வ தொடர்பு விவரங்கள்:\n📞 தொலைபேசி / வாட்ஸ்அப்: +91 90250 87129\n📧 மின்னஞ்சல்: rajibabu1184@gmail.com\n📷 இன்ஸ்டாகிராம்: monix.srm\n💼 லிங்க்ட்இன்: monix-softwaresolutions\nநேரடி ஆலோசனை மற்றும் உடனடி விலை சலுகைகளுக்கு எங்களை எப்போது வேண்டுமானாலும் தொடர்பு கொள்ளலாம்!"
          : "MONIX Official Contact Details:\n📞 Phone / WhatsApp: +91 90250 87129\n📧 Official Email: rajibabu1184@gmail.com\n📷 Instagram: monix.srm\n💼 LinkedIn: monix-softwaresolutions\nFeel free to contact us anytime for direct consultation, customized quotes, or project inquiries."
      };
    }

    return {
      isOutofScope: false,
      text: isTa
        ? "MONIX Software Solutions என்பது அரசு பதிவு பெற்ற MSME சாஃப்ட்வேர் நிறுவனமாகும். நாங்கள் உயர்தர இணையதளம், மொபைல் ஆப், AI இன்டர்ன்ஷிப் மற்றும் IEEE ப்ராஜெக்ட்களை வழங்குகிறோம். மேலும் விவரங்களுக்கு எங்களை வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்: +91 90250 87129."
        : "MONIX Software Solutions is a premier Govt. Registered MSME Software Enterprise providing Web Development, Mobile Apps, Live Online AI Internships, and IEEE Academic Projects. For custom inquiries or official quotes, contact our team directly at +91 90250 87129."
    };
  };

  const generateLLMResponse = async (userPrompt: string): Promise<string> => {
    const systemPrompt = `${MONIX_COMPANY_INFO}\n\nSTRICT INSTRUCTION: You are MONIX AI Assistant. Answer the user's question clearly and concisely based ONLY on MONIX Software Solutions services, web/mobile development, AI internships, academic projects, pricing, and contact info. If the user asks anything unrelated to MONIX company, refuse politely and refer them to official contact details: Phone/WhatsApp +91 90250 87129, Email rajibabu1184@gmail.com.`;

    // 1. Try OpenRouter API (Supports free LLM models e.g. google/gemini-2.0-flash-exp:free, meta-llama/llama-3.3-70b-instruct:free, deepseek/deepseek-r1:free)
    const openRouterKey =
      (import.meta as any).env?.VITE_OPENROUTER_API_KEY ||
      (process as any).env?.OPENROUTER_API_KEY ||
      (import.meta as any).env?.VITE_FREE_LLM_API_KEY;

    const openRouterModel =
      (import.meta as any).env?.VITE_OPENROUTER_MODEL ||
      (process as any).env?.OPENROUTER_MODEL ||
      'google/gemini-2.0-flash-exp:free';

    if (openRouterKey) {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterKey}`,
            'HTTP-Referer': 'https://monixsoftwaresolutions.com',
            'X-Title': 'MONIX AI Assistant'
          },
          body: JSON.stringify({
            model: openRouterModel,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 600
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content && typeof content === 'string') return content.trim();
        }
      } catch (e) {
        console.warn('OpenRouter API request failed:', e);
      }
    }

    // 2. Try Google Gemini API
    const geminiKey =
      (import.meta as any).env?.VITE_GEMINI_API_KEY ||
      (process as any).env?.GEMINI_API_KEY;

    if (geminiKey && geminiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nUser Question: ${userPrompt}`
        });
        if (response.text) return response.text.trim();
      } catch (e) {
        console.warn('Gemini API request failed:', e);
      }
    }

    // 3. Try OpenRouter public free tier endpoint
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://monixsoftwaresolutions.com',
          'X-Title': 'MONIX AI Assistant Free'
        },
        body: JSON.stringify({
          model: 'google/gemini-2.0-flash-exp:free',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content && typeof content === 'string') return content.trim();
      }
    } catch {
      // Fallback silently to rule engine
    }

    return '';
  };

  const handleSend = async (textToSend?: string) => {
    const trimmed = (textToSend || inputText).trim();
    if (!trimmed || isTyping) return;

    const time = getCurrentTime();
    setInputText('');

    // Append user message
    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: trimmed, time }
    ]);

    setIsTyping(true);

    try {
      let aiText = '';
      let isOutofScope = false;

      // Check client-side guardrail first for immediate out-of-scope response
      if (!checkIsCompanyRelated(trimmed)) {
        const fallback = getFallbackCompanyResponse(trimmed);
        aiText = fallback.text;
        isOutofScope = fallback.isOutofScope;
      } else {
        // Try multi-LLM API (OpenRouter free models / Gemini)
        aiText = await generateLLMResponse(trimmed);
        
        if (!aiText) {
          const fallback = getFallbackCompanyResponse(trimmed);
          aiText = fallback.text;
          isOutofScope = fallback.isOutofScope;
        }
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            text: aiText,
            time: getCurrentTime(),
            isOutofScope
          }
        ]);
      }, 600);

    } catch (err) {
      console.error('AI Response generation error:', err);
      const fallback = getFallbackCompanyResponse(trimmed);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: fallback.text,
          time: getCurrentTime(),
          isOutofScope: fallback.isOutofScope
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating AI Trigger Button (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 sm:p-4 rounded-full bg-slate-950 text-amber-400 border-2 border-amber-400/80 shadow-2xl gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center overflow-hidden"
          aria-label="Toggle MONIX AI Assistant"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-transparent animate-pulse pointer-events-none"></div>
          
          <div className="relative flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-amber-400 animate-spin-slow" />
            <span className="hidden sm:inline-block text-xs font-black tracking-wider text-amber-300 pr-1 uppercase">
              MONIX AI
            </span>
          </div>

          {/* Unread Indicator Pulse */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-slate-950"></span>
          </span>
        </button>
      </div>

      {/* Floating Interactive AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] h-[520px] max-h-[85vh] bg-slate-950 text-white rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden flex flex-col transition-all animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 border-b border-amber-500/30 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-md">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-black text-white flex items-center space-x-1.5">
                  <span>MONIX AI Assistant</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded border border-amber-400/30">Official</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Specialized Company Intelligence</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Scroll Container */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-slate-950/90 text-xs no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 space-y-1 shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none'
                      : msg.isOutofScope
                      ? 'bg-red-950/80 border border-red-500/40 text-red-100 rounded-tl-none'
                      : 'bg-slate-900 border border-amber-500/25 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 border-b border-white/10 pb-1">
                    <span className="font-bold uppercase tracking-wider">
                      {msg.sender === 'user' ? 'You' : 'MONIX AI'}
                    </span>
                    <span>{msg.time}</span>
                  </div>

                  <p className="whitespace-pre-line leading-relaxed text-xs">
                    {msg.text}
                  </p>

                  {/* If out of scope, show official quick connect button */}
                  {msg.isOutofScope && (
                    <div className="pt-2">
                      <a
                        href="https://wa.me/919025087129?text=Hello%20MONIX%20Team%2C%20I%20have%20a%20direct%20inquiry."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 text-slate-950 font-black rounded-lg text-[11px] hover:bg-amber-400 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Connect Official Support</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900 border border-amber-500/30 text-amber-300 p-3 rounded-2xl rounded-tl-none flex items-center space-x-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span className="text-xs font-semibold">MONIX AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0">
            {INITIAL_SUGGESTIONS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-amber-500/20 hover:border-amber-400/50 border border-slate-700 text-slate-300 text-[10px] font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-950 border-t border-amber-500/30 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              placeholder={isTa ? "MONIX சேவைகள் பற்றி கேட்கவும்..." : "Ask about MONIX services, pricing..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-grow bg-slate-900 text-white placeholder-slate-500 px-3.5 py-2.5 rounded-xl border border-amber-500/30 focus:outline-none focus:border-amber-400 text-xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-gold-gradient text-slate-950 rounded-xl font-bold shadow-md hover:opacity-90 disabled:opacity-40 cursor-pointer transition-all shrink-0"
            >
              <Send className="w-4 h-4 text-slate-950" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
