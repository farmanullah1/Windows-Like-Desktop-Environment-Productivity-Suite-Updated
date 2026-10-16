import React, { useEffect } from 'react';

interface StageVoidProps {
  onComplete: () => void;
  reducedMotion?: boolean;
}

export const StageVoid: React.FC<StageVoidProps> = ({ onComplete, reducedMotion = false }) => {
  useEffect(() => {
    const duration = reducedMotion ? 40 : 100;
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, reducedMotion]);

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-[100000] bg-black flex items-center justify-center select-none"
    >
      {/* 1px subtle central seed dot */}
      <div className="w-1 h-1 rounded-full bg-blue-500/20 animate-pulse" />
    </div>
  );
};
