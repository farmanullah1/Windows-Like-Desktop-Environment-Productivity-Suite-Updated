import React, { useState, useEffect } from 'react';
import { Clock, Play, Pause, RotateCcw, Flag, Bell, Globe } from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export const ClockApp: React.FC<{ windowId: string }> = () => {
  const [tab, setTab] = useState<'world' | 'stopwatch' | 'timer'>('world');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Stopwatch state
  const [swTimeMs, setSwTimeMs] = useState(0);
  const [isSwRunning, setIsSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  // Timer state
  const [timerDurationSec, setTimerDurationSec] = useState(300); // 5 mins
  const [timerRemainingSec, setTimerRemainingSec] = useState(300);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Time updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Stopwatch interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSwRunning) {
      interval = setInterval(() => {
        setSwTimeMs((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isSwRunning]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerRemainingSec > 0) {
      interval = setInterval(() => {
        setTimerRemainingSec((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            soundEngine.play('notification');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerRemainingSec]);

  const formatStopwatch = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  };

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* Header Tabs */}
      <div className="flex items-center gap-2 p-2 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)]">
        <button
          onClick={() => { setTab('world'); soundEngine.play('click'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
            tab === 'world'
              ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
              : 'text-[var(--text-secondary)] hover:bg-[var(--surface-card)]'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>World Clock</span>
        </button>
        <button
          onClick={() => { setTab('stopwatch'); soundEngine.play('click'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
            tab === 'stopwatch'
              ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
              : 'text-[var(--text-secondary)] hover:bg-[var(--surface-card)]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Stopwatch</span>
        </button>
        <button
          onClick={() => { setTab('timer'); soundEngine.play('click'); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
            tab === 'timer'
              ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
              : 'text-[var(--text-secondary)] hover:bg-[var(--surface-card)]'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Timer</span>
        </button>
      </div>

      {/* Main Tab Area */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
        {/* WORLD CLOCK */}
        {tab === 'world' && (
          <div className="w-full max-w-md space-y-4">
            <div className="text-center p-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-card)] shadow-md">
              <span className="text-xs uppercase font-semibold text-[var(--text-muted)] tracking-wider">Local Time</span>
              <div className="text-4xl font-mono font-bold my-2 text-[var(--accent-primary)]">
                {currentTime.toLocaleTimeString([], { hour12: false })}
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { city: 'London (UTC)', tz: 'UTC' },
                { city: 'New York (EDT)', tz: 'America/New_York' },
                { city: 'Tokyo (JST)', tz: 'Asia/Tokyo' },
                { city: 'Dubai (GST)', tz: 'Asia/Dubai' },
              ].map((loc) => {
                const timeString = new Intl.DateTimeFormat([], {
                  timeZone: loc.tz,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }).format(currentTime);

                return (
                  <div key={loc.city} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
                    <span className="text-[11px] text-[var(--text-muted)] font-medium">{loc.city}</span>
                    <p className="text-lg font-mono font-bold mt-1">{timeString}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STOPWATCH */}
        {tab === 'stopwatch' && (
          <div className="w-full max-w-sm flex flex-col items-center space-y-6">
            <div className="text-5xl font-mono font-bold tracking-tight text-[var(--text-primary)]">
              {formatStopwatch(swTimeMs)}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.play('click');
                  setIsSwRunning(!isSwRunning);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all ${
                  isSwRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]'
                }`}
              >
                {isSwRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isSwRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.play('click');
                  if (isSwRunning) {
                    setLaps((prev) => [swTimeMs, ...prev]);
                  } else {
                    setSwTimeMs(0);
                    setLaps([]);
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-medium transition-colors"
              >
                {isSwRunning ? <Flag className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                <span>{isSwRunning ? 'Lap' : 'Reset'}</span>
              </button>
            </div>

            {/* Laps List */}
            {laps.length > 0 && (
              <div className="w-full max-h-40 overflow-y-auto border border-[var(--border-subtle)] rounded-xl divide-y divide-[var(--border-subtle)] text-xs font-mono">
                {laps.map((lapMs, idx) => (
                  <div key={lapMs + idx} className="flex justify-between px-4 py-2 bg-[var(--surface-card)]">
                    <span className="text-[var(--text-muted)]">Lap {laps.length - idx}</span>
                    <span className="font-semibold">{formatStopwatch(lapMs)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TIMER */}
        {tab === 'timer' && (
          <div className="w-full max-w-sm flex flex-col items-center space-y-6">
            <div className="text-5xl font-mono font-bold tracking-tight text-[var(--accent-primary)]">
              {formatSeconds(timerRemainingSec)}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-[var(--surface-card)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent-primary)] transition-all duration-1000"
                style={{ width: `${(timerRemainingSec / timerDurationSec) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-2">
              {[60, 180, 300, 600, 1500].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    soundEngine.play('click');
                    setIsTimerRunning(false);
                    setTimerDurationSec(sec);
                    setTimerRemainingSec(sec);
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-colors ${
                    timerDurationSec === sec
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-subtle)] text-[var(--accent-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)]'
                  }`}
                >
                  {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundEngine.play('click');
                  setIsTimerRunning(!isTimerRunning);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all ${
                  isTimerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)]'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.play('click');
                  setIsTimerRunning(false);
                  setTimerRemainingSec(timerDurationSec);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
