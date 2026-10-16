import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StageLoaderProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

const INIT_STEPS = [
  'Starting MyOS kernel services…',
  'Initializing Microsoft SQL Server database provider…',
  'Hydrating 24 desktop applications & shell manifests…',
  'Synthesizing Fluent theme tokens & audio engine…',
  'Launching secure desktop workspace…',
];

export const StageLoader: React.FC<StageLoaderProps> = ({ onComplete, reducedMotion = false }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Step progression every 260ms
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < INIT_STEPS.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 260);

    // Total duration ~1400ms (or 600ms in reduced motion)
    const duration = reducedMotion ? 600 : 1400;
    const timer = setTimeout(onComplete, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete, reducedMotion]);

  const dotDelays = [0, 0.15, 0.3, 0.45, 0.6];

  return (
    <div
      role="status"
      aria-label="Initializing MyOS workspace"
      className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center select-none text-white overflow-hidden"
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Glowing Logo at Stage Loader */}
        <motion.div
          initial={{ opacity: 0.8, scale: 0.98 }}
          animate={{ opacity: [0.85, 1, 0.85], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 mb-9 p-1 rounded-2xl drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]"
        >
          <img
            src="/assets/branding/logo.svg"
            alt="MyOS Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Authentic Windows 11 Orbiting Chasing Dots Spinner */}
        <div className="relative w-12 h-12 mb-7 flex items-center justify-center">
          {!reducedMotion ? (
            <div className="relative w-10 h-10">
              {dotDelays.map((delay, index) => (
                <div
                  key={index}
                  className="absolute inset-0 win-dot-orbit pointer-events-none"
                  style={{ animationDelay: `${delay}s` }}
                >
                  <div className="w-1.5 h-1.5 mx-auto rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,1),0_0_14px_rgba(59,130,246,0.8)]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-3.5 h-3.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
          )}
        </div>

        {/* Animated Progress Text with Framer Motion */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, filter: 'blur(3px)' }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4, filter: 'blur(3px)' }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="text-xs font-mono text-zinc-400 tracking-wide"
            >
              {INIT_STEPS[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Step Indicator Glowing Dots */}
        <div className="flex gap-2 mt-5">
          {INIT_STEPS.map((_, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: idx === stepIndex ? 1.3 : 1,
                backgroundColor: idx <= stepIndex ? '#60a5fa' : '#27272a',
                boxShadow:
                  idx === stepIndex
                    ? '0 0 10px rgba(96,165,250,0.9)'
                    : idx < stepIndex
                    ? '0 0 5px rgba(96,165,250,0.5)'
                    : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-1.5 h-1.5 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
