import React, { useState, useEffect } from 'react';
import {
  Flame,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  BellOff,
  CloudRain,
  Trees,
  Waves,
  CheckCircle2,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';
import { useDesktop } from '../../core/desktopStore';

type FocusPreset = 'pomodoro' | 'deepwork' | 'meeting' | 'evening';

export const FocusModeApp: React.FC<{ windowId: string }> = () => {
  const { addNotification } = useDesktop();
  const [activePreset, setActivePreset] = useState<FocusPreset>('pomodoro');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [dndActive, setDndActive] = useState(true);
  const [ambientSound, setAmbientSound] = useState<'rain' | 'forest' | 'waves' | 'none'>('rain');
  const [sessionsCompleted, setSessionsCompleted] = useState(3);

  // Timer countdown hook
  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isRunning) {
      setIsRunning(false);
      soundEngine.play('success');
      setSessionsCompleted((c) => c + 1);
      addNotification('Focus Session Complete', 'Time for a 5-minute restorative break.', 'success', 'Focus');
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeftSeconds, addNotification]);

  const toggleTimer = () => {
    soundEngine.play('click');
    setIsRunning(!isRunning);
  };

  const resetTimer = (mins: number) => {
    soundEngine.play('click');
    setIsRunning(false);
    setTimeLeftSeconds(mins * 60);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progressPercent = Math.round(((25 * 60 - timeLeftSeconds) / (25 * 60)) * 100);

  return (
    <div className="flex flex-col h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs p-6 overflow-y-auto space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold">Focus Mode & Pomodoro Studio</h2>
            <p className="text-[11px] text-[var(--text-muted)]">
              Context-aware productivity sessions with ambient synthesis and notification gating.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.play('click');
              setDndActive(!dndActive);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              dndActive
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                : 'bg-[var(--surface-card)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
            }`}
          >
            <BellOff className="w-3.5 h-3.5" />
            <span>{dndActive ? 'Do Not Disturb (ON)' : 'DND Off'}</span>
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { id: 'pomodoro', label: 'Pomodoro (25m)', desc: 'Sprint interval with breaks' },
          { id: 'deepwork', label: 'Deep Work (50m)', desc: 'High-focus flow state' },
          { id: 'meeting', label: 'Meeting Focus', desc: 'Muted notifications' },
          { id: 'evening', label: 'Evening Calm', desc: 'Relaxed audio backdrop' },
        ].map((preset) => (
          <div
            key={preset.id}
            onClick={() => {
              soundEngine.play('click');
              setActivePreset(preset.id as FocusPreset);
              if (preset.id === 'pomodoro') resetTimer(25);
              if (preset.id === 'deepwork') resetTimer(50);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activePreset === preset.id
                ? 'border-[var(--accent-primary)] bg-[var(--accent-subtle)] shadow-sm'
                : 'border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-medium)]'
            }`}
          >
            <span className="font-semibold text-xs block text-[var(--text-primary)]">{preset.label}</span>
            <span className="text-[10px] text-[var(--text-muted)]">{preset.desc}</span>
          </div>
        ))}
      </div>

      {/* Big Pomodoro Timer Canvas */}
      <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
        <div className="text-5xl font-mono font-bold tracking-tight text-[var(--text-primary)]">
          {formatTime(timeLeftSeconds)}
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 rounded-full bg-[var(--surface-input)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(2, progressPercent))}%` }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause Focus' : 'Start Focus Session'}</span>
          </button>

          <button
            onClick={() => resetTimer(activePreset === 'deepwork' ? 50 : 25)}
            className="p-2.5 rounded-xl border border-[var(--border-subtle)] hover:bg-[var(--surface-input)] text-[var(--text-secondary)]"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ambient Audio Synthesis Options */}
      <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <h4 className="font-semibold text-xs">Procedural Ambient Atmosphere</h4>
          </div>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Web Audio API</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'rain', label: 'Gentle Rain', icon: CloudRain },
            { id: 'forest', label: 'Nordic Forest', icon: Trees },
            { id: 'waves', label: 'Ocean Waves', icon: Waves },
            { id: 'none', label: 'Muted', icon: VolumeX },
          ].map((amb) => {
            const Icon = amb.icon;
            return (
              <button
                key={amb.id}
                onClick={() => {
                  soundEngine.play('click');
                  setAmbientSound(amb.id as any);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs transition-colors ${
                  ambientSound === amb.id
                    ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 font-semibold'
                    : 'border-[var(--border-subtle)] bg-[var(--surface-input)] text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{amb.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Metrics */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center justify-between">
          <span className="text-[var(--text-muted)]">Completed Sprints Today</span>
          <span className="font-bold font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {sessionsCompleted} Sessions
          </span>
        </div>
        <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center justify-between">
          <span className="text-[var(--text-muted)]">Focus Score</span>
          <span className="font-bold font-mono text-[var(--accent-primary)]">94% Optimum</span>
        </div>
      </div>
    </div>
  );
};
