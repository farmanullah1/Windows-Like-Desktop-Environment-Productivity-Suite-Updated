import React from 'react';
import {
  Wifi,
  Bluetooth,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Battery,
  Settings as SettingsIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useDesktop } from '../core/desktopStore';
import { useTheme } from '../design-system/ThemeProvider';
import { soundEngine } from '../design-system/soundEngine';

export const QuickSettings: React.FC = () => {
  const { isQuickSettingsOpen, setQuickSettingsOpen, openApp, metrics } = useDesktop();
  const {
    theme,
    setTheme,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
  } = useTheme();

  if (!isQuickSettingsOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-16 right-4 w-80 p-4 rounded-3xl bg-[#1E222A]/95 border border-[#2D333F] shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl z-[var(--z-quick-settings)] flex flex-col gap-4 select-none"
    >
      {/* 2x3 Toggles Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Network / Internet Status */}
        <button
          onClick={() => soundEngine.play('click')}
          className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            metrics.isOnline
              ? 'border-[#E06C38] bg-[#E06C38]/15 text-[#E06C38]'
              : 'border-[#D9822B]/30 bg-[#D9822B]/10 text-[#D9822B]'
          }`}
        >
          <Wifi className="w-4 h-4" />
          <div className="text-left">
            <span className="block leading-tight text-[#ECEFF4]">Network</span>
            <span className="text-[10px] font-normal text-[#8F96A3]">{metrics.isOnline ? 'Online (Active)' : 'Offline (Local)'}</span>
          </div>
        </button>

        {/* Bluetooth Toggle */}
        <button
          onClick={() => soundEngine.play('click')}
          className="flex items-center gap-3 p-3 rounded-xl border border-[#2D333F] bg-[#14171D] hover:border-[#E06C38]/50 text-xs font-semibold transition-all cursor-pointer"
        >
          <Bluetooth className="w-4 h-4 text-[#E06C38]" />
          <div className="text-left">
            <span className="block leading-tight text-[#ECEFF4]">Bluetooth</span>
            <span className="text-[10px] text-[#8F96A3] font-normal">Ready</span>
          </div>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-3 p-3 rounded-xl border border-[#2D333F] bg-[#14171D] hover:border-[#E06C38]/50 text-xs font-semibold transition-all cursor-pointer"
        >
          {theme === 'dark' ? <Moon className="w-4 h-4 text-[#F07D49]" /> : <Sun className="w-4 h-4 text-[#D9822B]" />}
          <div className="text-left">
            <span className="block leading-tight text-[#ECEFF4]">Theme</span>
            <span className="text-[10px] text-[#8F96A3] font-normal capitalize">{theme}</span>
          </div>
        </button>

        {/* Audio Mute Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
            soundEnabled
              ? 'border-[#E06C38] bg-[#E06C38]/15 text-[#E06C38]'
              : 'border-[#2D333F] bg-[#14171D] text-[#8F96A3]'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#E05252]" />}
          <div className="text-left">
            <span className="block leading-tight text-[#ECEFF4]">Sound Cues</span>
            <span className="text-[10px] font-normal text-[#8F96A3]">{soundEnabled ? 'Enabled' : 'Muted'}</span>
          </div>
        </button>
      </div>

      {/* Sliders Area */}
      <div className="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#14171D] border border-[#2D333F]">
        {/* Volume Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-medium text-[#ECEFF4]">
              <Volume2 className="w-3.5 h-3.5 text-[#8F96A3]" />
              <span>Volume</span>
            </span>
            <span className="text-[11px] font-mono text-[#8F96A3]">{Math.round(soundVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={soundVolume}
            onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
            className="w-full accent-[#E06C38] cursor-pointer"
          />
        </div>
      </div>

      {/* Footer System Telemetry */}
      <div className="flex items-center justify-between pt-1 border-t border-[#2D333F] text-xs text-[#8F96A3]">
        <div className="flex items-center gap-2">
          <Battery className="w-4 h-4 text-[#2D9C5E]" />
          {metrics.hasBattery ? (
            <>
              <span className="font-semibold text-[#ECEFF4]">{metrics.batteryLevel}%</span>
              <span>{metrics.isCharging ? 'Charging' : 'Remaining'}</span>
            </>
          ) : (
            <span className="font-semibold text-[#ECEFF4]">AC Mains Connected</span>
          )}
        </div>

        <button
          onClick={() => {
            soundEngine.play('click');
            setQuickSettingsOpen(false);
            openApp('settings', 'Settings', 'Settings');
          }}
          className="p-1.5 rounded-lg hover:bg-[#2D333F] text-[#8F96A3] hover:text-[#ECEFF4] transition-colors cursor-pointer"
          title="Open All Settings"
        >
          <SettingsIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
