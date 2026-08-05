import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCheck, Smile, Paperclip } from 'lucide-react';
import { Language } from '../types';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  lang?: Language;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = "919025087129",
  lang = 'en'
}) => {
  const isTa = lang === 'ta';
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [step, setStep] = useState<'awaiting_name' | 'chatting_active'>('awaiting_name');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: isTa 
        ? "வணக்கம்! மோனிக்ஸ் சாஃப்ட்வேர் சொல்யூஷன்ஸ்க்கு நல்வரவு! 🚀 உங்கள் பெயர் என்ன என்பதை அறியலாமா?"
        : "👋 Hello! Welcome to MONIX Software Solutions. Before we connect you with our technical team, may I please know your name?",
      time: getCurrentTime()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const redirectWhatsApp = (textMsg: string, name: string) => {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    const userIntro = name ? `Hello MONIX, my name is ${name}. ` : `Hello MONIX, `;
    const fullText = `${userIntro}${textMsg}`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, '_blank');
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const time = getCurrentTime();

    if (step === 'awaiting_name') {
      // Validate name
      if (trimmed.length < 2) {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: 'bot',
            text: isTa 
              ? "தயவுசெய்து உங்கள் சரியான பெயரை உள்ளிடவும் 😊"
              : "Please enter your valid name to proceed 😊",
            time
          }
        ]);
        return;
      }

      setUserName(trimmed);
      setInputText('');
      
      // User name message
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'user', text: trimmed, time }
      ]);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: isTa
              ? `மகிழ்ச்சி ${trimmed}! 🚀 உங்களுக்கு என்ன வகையான சேவை தேவைப்படுகிறது? உங்கள் மெசேஜை தட்டச்சு செய்யவும் (நேரடி வாட்ஸ்அப்பிற்கு செல்லும்).`
              : `Nice to meet you, ${trimmed}! 🚀 What software requirement can we assist you with? Type your message below and it will send directly to WhatsApp.`,
            time: getCurrentTime()
          }
        ]);
        setStep('chatting_active');
      }, 600);

    } else if (step === 'chatting_active') {
      setInputText('');
      
      // Append user's message
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'user', text: trimmed, time }
      ]);

      setIsTyping(true);
      
      // Open WhatsApp immediately with the user message and name
      redirectWhatsApp(trimmed, userName);

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: isTa 
              ? "வாட்ஸ்அப்பிற்கு அனுப்பப்பட்டது! 📲 மேலும் மெசேஜ்களை இங்கே அனுப்பலாம்."
              : "Sent to WhatsApp! 📲 You can type another message below anytime to send again.",
            time: getCurrentTime()
          }
        ]);
      }, 700);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      
      {/* Real WhatsApp Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[360px] max-h-[520px] h-[500px] bg-[#E5DDD5] rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col transition-all animate-fadeIn">
          
          {/* Header (Authentic WhatsApp Deep Green #075E54 with MONIX DP) */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {/* Official DP Container */}
                <div className="w-10 h-10 rounded-full bg-slate-900 p-0.5 overflow-hidden border-2 border-amber-400 flex items-center justify-center shadow-md shrink-0">
                  <img 
                    src="/assets/monix-logo.webp" 
                    alt="MONIX Profile Picture" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/assets/logo.webp";
                    }}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-sans font-bold text-sm tracking-wide leading-tight text-white">
                  MONIX Software Solutions
                </h3>
                <span className="text-[11px] text-emerald-200 font-medium leading-none mt-0.5">
                  Online • Direct +91 90250 87129
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body (WhatsApp Light Pattern Wallpaper) */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#E5DDD5] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]">
            
            <div className="text-center my-1">
              <span className="text-[10px] font-bold text-slate-500 bg-white/80 px-2.5 py-1 rounded-md shadow-2xs">
                TODAY
              </span>
            </div>

            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl shadow-xs text-xs relative leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none' 
                      : 'bg-white text-slate-900 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <div className={`flex items-center justify-end space-x-1 mt-1 text-[9px] ${msg.sender === 'user' ? 'text-emerald-800' : 'text-slate-400'}`}>
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-slate-200/60 shadow-xs flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form 
            onSubmit={handleSend}
            className="bg-[#F0F2F5] p-2.5 flex items-center space-x-2 border-t border-slate-300 shrink-0"
          >
            <Smile className="w-5 h-5 text-slate-500 shrink-0 hidden sm:block" />
            <Paperclip className="w-5 h-5 text-slate-500 shrink-0 hidden sm:block" />

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                step === 'awaiting_name' 
                  ? (isTa ? "உங்கள் பெயரை உள்ளிடவும்..." : "Type your name...") 
                  : (isTa ? "உங்கள் மெசேஜை உள்ளிடவும்..." : "Type your message...")
              }
              className="flex-grow bg-white text-slate-900 text-xs px-3.5 py-2.5 rounded-full border border-slate-300 focus:outline-none focus:border-emerald-500 shadow-2xs"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-full bg-[#128C7E] hover:bg-[#075E54] disabled:opacity-50 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Official WhatsApp Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact MONIX on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer ring-4 ring-[#25D366]/30"
      >
        {/* Pulsing Aura Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25"></span>

        {/* Real WhatsApp Icon */}
        <svg className="w-8 h-8 fill-white relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>

        {/* Unread Alert Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white font-bold text-[10px] flex items-center justify-center rounded-full border-2 border-white shadow-md">
            1
          </span>
        )}
      </button>

    </div>
  );
};
