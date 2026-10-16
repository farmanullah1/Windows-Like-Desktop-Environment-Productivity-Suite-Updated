import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { soundEngine } from '../../design-system/soundEngine';

interface StageLogoProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const StageLogo: React.FC<StageLogoProps> = ({ onComplete, reducedMotion = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundEngine.play('boot_chime');

    if (!reducedMotion && containerRef.current && logoRef.current && glowRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      ).fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1.2, opacity: 0.5, duration: 1.0, ease: 'sine.out' },
        '-=0.6'
      );
    }

    const duration = reducedMotion ? 400 : 1200;
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <div
      ref={containerRef}
      role="status"
      aria-label="Starting MyOS"
      className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center select-none text-white overflow-hidden"
    >
      <div className="sr-only" aria-live="polite">
        Starting MyOS Desktop Environment.
      </div>

      <div className="relative flex flex-col items-center">
        {/* Luminous Ambient Aurora Backing */}
        <div
          ref={glowRef}
          className="absolute -inset-24 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-600/30 to-purple-600/25 blur-3xl pointer-events-none"
        />

        {/* Outer Orbit Halo */}
        {!reducedMotion && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.45, 0.2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute w-48 h-48 rounded-full border border-sky-400/20 pointer-events-none"
          />
        )}

        {/* Central MyOS Logo Emblem */}
        <div ref={logoRef} className="relative z-10 w-28 h-28 mb-5 flex items-center justify-center">
          <motion.img
            src="/assets/branding/logo.svg"
            alt="MyOS Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(56,189,248,0.7)]"
            animate={reducedMotion ? {} : { y: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          />
        </div>

        {/* Wordmark Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 text-3xl font-extrabold tracking-tight text-white flex items-center gap-1"
        >
          <span>My</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
            OS
          </span>
        </motion.h1>

        {/* Tagline Reveal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative z-10 text-xs tracking-wider text-zinc-400 mt-2 font-medium"
        >
          Hybrid Desktop Environment &amp; Productivity Suite
        </motion.p>
      </div>
    </div>
  );
};
