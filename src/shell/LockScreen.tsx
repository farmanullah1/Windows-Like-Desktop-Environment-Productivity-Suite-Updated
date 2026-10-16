import React, { useState, useEffect } from 'react';
import { Unlock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useDesktop } from '../core/desktopStore';
import { soundEngine } from '../design-system/soundEngine';

export const LockScreen: React.FC = () => {
  const { isLocked, setLocked, currentWallpaper } = useDesktop();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isLocked) return null;

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Default PIN: 1234 or any entered PIN
    if (pin === '1234' || pin.length > 0) {
      soundEngine.play('success');
      setError(false);
      setPin('');
      setLocked(false);
    } else {
      soundEngine.play('error');
      setError(true);
      setTimeout(() => setError(false), 1200);
    }
  };

  const handleKeypadPress = (digit: string) => {
    soundEngine.play('click');
    if (pin.length < 6) {
      setPin((prev) => prev + digit);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed inset-0 z-[var(--z-lockscreen)] select-none overflow-y-auto min-h-screen flex flex-col items-center justify-between p-6 sm:p-8 text-white"
    >
      {/* Blurred Wallpaper Background with Dark Tint */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-xl scale-110 pointer-events-none transition-all duration-700"
        style={{ backgroundImage: `url(${currentWallpaper})` }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl pointer-events-none" />

      {/* Top Header: Clock & Date */}
      <div className="relative z-10 flex flex-col items-center text-center mt-6 sm:mt-10">
        <h1 className="text-6xl sm:text-7xl font-extralight tracking-tight font-sans drop-shadow-md">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-base sm:text-lg font-medium text-white/80 mt-2 drop-shadow-sm">
          {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Center: User Profile & PIN Unlock */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-xs my-auto py-6">
        {/* User Avatar */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#C85728] via-[#E06C38] to-[#F07D49] p-1 shadow-2xl mb-3 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#1E222A] flex items-center justify-center">
            <User className="w-10 h-10 text-[#ECEFF4]" />
          </div>
        </div>

        <h2 className="text-base font-semibold text-[#ECEFF4] mb-1">Administrator</h2>
        <div className="flex items-center gap-1 text-[11px] text-[#2D9C5E] font-mono mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Session Locked (Safe Mode)</span>
        </div>

        {/* PIN Input Form */}
        <form onSubmit={handleUnlock} className="w-full flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <input
              type="password"
              placeholder="Enter PIN (1234)..."
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
              className={`w-full px-4 py-2.5 rounded-xl bg-[#14171D] border text-center font-mono tracking-widest text-sm backdrop-blur-md focus:outline-none transition-all ${
                error
                  ? 'border-[#E05252] bg-[#E05252]/20 text-[#E05252] animate-shake'
                  : 'border-[#2D333F] focus:border-[#E06C38] text-[#ECEFF4]'
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-[#E06C38] hover:bg-[#C85728] active:bg-[#F07D49] text-white flex items-center justify-center shadow-lg active:scale-95 transition-all cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Quick Keypad */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[220px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeypadPress(num)}
              className="py-2.5 rounded-xl bg-[#14171D] hover:bg-[#1E222A] border border-[#2D333F] font-mono text-sm font-semibold text-[#ECEFF4] active:scale-95 transition-all cursor-pointer"
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              soundEngine.play('click');
              setPin('');
            }}
            className="py-2.5 rounded-xl bg-[#14171D] hover:bg-[#1E222A] border border-[#2D333F] font-mono text-xs text-[#8F96A3] active:scale-95 transition-all cursor-pointer"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => handleKeypadPress('0')}
            className="py-2.5 rounded-xl bg-[#14171D] hover:bg-[#1E222A] border border-[#2D333F] font-mono text-sm font-semibold text-[#ECEFF4] active:scale-95 transition-all cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={() => handleUnlock()}
            className="py-2.5 rounded-xl bg-[#2D9C5E]/80 hover:bg-[#2D9C5E] border border-[#2D9C5E]/50 text-white text-xs font-semibold flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          >
            <Unlock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer hint */}
      <div className="relative z-10 text-center text-xs text-[#8F96A3] mb-2">
        <p>Press Enter or use PIN <span className="font-mono text-[#ECEFF4]">1234</span> to unlock</p>
      </div>
    </div>
  );
};
