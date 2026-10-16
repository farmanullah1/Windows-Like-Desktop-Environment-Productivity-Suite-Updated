import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface StageHandoffProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const StageHandoff: React.FC<StageHandoffProps> = ({ onComplete, reducedMotion = false }) => {
  useEffect(() => {
    const duration = reducedMotion ? 150 : 350;
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <motion.div
      role="presentation"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.15 : 0.35, ease: 'easeOut' }}
      className="fixed inset-0 z-[100000] bg-black flex items-center justify-center pointer-events-none select-none"
    >
      <motion.div
        initial={{ scale: 1, filter: 'blur(0px)' }}
        animate={{ scale: reducedMotion ? 1 : 1.15, filter: reducedMotion ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: 0.35, ease: 'easeIn' }}
        className="w-20 h-20 flex items-center justify-center drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]"
      >
        <img
          src="/assets/branding/logo.svg"
          alt="MyOS Logo"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
};
