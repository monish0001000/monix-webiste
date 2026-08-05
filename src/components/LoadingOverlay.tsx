import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  message = "Initializing MONIX AI Digital Suite..." 
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090D16] text-white p-6"
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-sm">
            
            {/* Animated Logo Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.95, 1.05, 1], opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-amber-500/50 shadow-2xl gold-glow flex items-center justify-center p-3 overflow-hidden">
                <img 
                  src="/assets/logo.webp" 
                  alt="MONIX Software Solutions Logo" 
                  width={64} 
                  height={64} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" 
                />
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center shadow-lg border border-amber-100"
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <div className="space-y-1">
              <h2 className="font-cinzel text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                MONIX
              </h2>
              <p className="text-[11px] uppercase tracking-widest text-amber-500/80 font-bold">
                Software Solutions
              </p>
            </div>

            {/* Progress Bar Animation */}
            <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-amber-500/20">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full"
              />
            </div>

            {/* Message */}
            <p className="text-xs text-slate-400 font-sans tracking-wide">
              {message}
            </p>

            {/* MSME Trust Stamp */}
            <div className="pt-4 border-t border-slate-800 flex items-center space-x-2 text-[10px] text-amber-400/80 uppercase font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Govt of India MSME Registered Company</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
