import React, { useState, useEffect } from 'react';
import {
  Search,
  Wifi,
  Volume2,
  VolumeX,
  Battery,
  Bell,
  X,
  Clock,
} from 'lucide-react';
import { useDesktop } from '../core/desktopStore';
import { useTheme } from '../design-system/ThemeProvider';
import { getPinnedApps, getAllApps } from '../apps/registry';
import { soundEngine } from '../design-system/soundEngine';
import { AppIconBadge } from '../design-system/AppIconBadge';
import { motion } from 'motion/react';

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    openApp,
    focusWindow,
    minimizeWindow,
    restoreWindow,
    closeWindow,
    workspaces,
    activeWorkspaceId,
    switchWorkspace,
    toggleShowDesktop,
    isStartMenuOpen,
    setStartMenuOpen,
    isQuickSettingsOpen,
    setQuickSettingsOpen,
    isNotificationCenterOpen,
    setNotificationCenterOpen,
    setCommandPaletteOpen,
    notifications,
    metrics,
  } = useDesktop();

  const { shellMode, soundEnabled } = useTheme();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [fullDateStr, setFullDateStr] = useState('');
  const [fullTimeStr, setFullTimeStr] = useState('');
  const [showClockCard, setShowClockCard] = useState(false);
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  // Clock updates
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(d.toLocaleDateString([], { month: 'short', day: 'numeric' }));
      setFullDateStr(d.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
      setFullTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pinnedApps = getPinnedApps();
  const runningAppIds = Array.from(new Set(windows.map((w) => w.appId)));

  // Combine pinned apps with any running unpinned apps
  const allDisplayApps = [
    ...pinnedApps,
    ...getAllApps().filter((a) => !a.isPinned && runningAppIds.includes(a.id)),
  ];

  const handleAppClick = (appId: string, displayName: string, icon: string) => {
    soundEngine.play('click');
    const existing = windows.find((w) => w.appId === appId && w.workspaceId === activeWorkspaceId);
    if (!existing) {
      openApp(appId, displayName, icon);
    } else if (existing.isMinimized) {
      restoreWindow(existing.id);
    } else if (existing.id === activeWindowId) {
      minimizeWindow(existing.id);
    } else {
      focusWindow(existing.id);
    }
  };

  const isHybrid = shellMode === 'hybrid';
  const isMac = shellMode === 'macos';
  const isDev = shellMode === 'developer';

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[var(--z-taskbar)] flex items-center justify-between select-none ${
        isHybrid
          ? 'pb-2.5 px-3'
          : isMac
          ? 'pb-3 px-4 justify-center'
          : isDev
          ? 'h-[44px] bg-[var(--surface-taskbar)] border-t border-[var(--border-subtle)] px-2 backdrop-blur-2xl'
          : 'h-[54px] bg-[var(--surface-taskbar)] border-t border-[var(--border-subtle)] px-3 backdrop-blur-2xl'
      }`}
    >
      {/* Floating Island Container (for Hybrid / Mac) */}
      <div
        className={`flex items-center justify-between w-full transition-all ${
          isHybrid
            ? 'h-[52px] px-3 rounded-2xl bg-[var(--surface-taskbar)] border border-[var(--border-medium)] shadow-2xl backdrop-blur-3xl'
            : isMac
            ? 'h-[58px] px-4 rounded-3xl bg-[var(--surface-dock)] border border-[var(--border-medium)] shadow-2xl backdrop-blur-3xl max-w-fit mx-auto'
            : 'h-full'
        }`}
      >
        {/* Left Section: Start & Search & Workspaces */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Start Launcher Button (Hybrid / Windows / Linux) */}
          <motion.button
            whileHover={{ scale: 1.08, y: -1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            onClick={() => {
              soundEngine.play('click');
              const nextState = !isStartMenuOpen;
              setStartMenuOpen(nextState);
              if (nextState) {
                setQuickSettingsOpen(false);
                setNotificationCenterOpen(false);
              }
            }}
            className={`w-10 h-10 rounded-xl flex items-center justify-center p-1.5 transition-colors cursor-pointer ${
              isStartMenuOpen
                ? 'bg-[var(--accent-primary)]/25 text-white shadow-md ring-1 ring-[var(--accent-primary)]'
                : 'hover:bg-white/10'
            }`}
            title="MyOS Start Menu"
          >
            <img src="/assets/branding/logo.svg" alt="Start Menu" className="w-6 h-6 object-contain" />
          </motion.button>

          {/* Universal Search / Command Palette */}
          <button
            onClick={() => {
              soundEngine.play('click');
              setCommandPaletteOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[#ECEFF4] transition-all text-xs cursor-pointer"
            title="Universal Search & Commands (Ctrl+Space)"
          >
            <Search className="w-4 h-4 text-[var(--accent-primary)]" />
            <span className="hidden sm:inline text-[11px] text-[var(--text-secondary)] font-medium">Search...</span>
          </button>

          {/* Virtual Workspaces Switcher Pills */}
          <div className="flex items-center gap-1 pl-2 border-l border-[var(--border-subtle)]">
            {workspaces.map((ws, idx) => (
              <button
                key={ws.id}
                onClick={() => switchWorkspace(ws.id)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono transition-all ${
                  ws.id === activeWorkspaceId
                    ? 'bg-[var(--accent-primary)] text-white shadow-sm scale-105'
                    : 'text-[var(--text-muted)] hover:bg-[var(--border-medium)] hover:text-white'
                }`}
                title={`Workspace ${ws.name} (Ctrl+Alt+${idx + 1})`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Center Section: App Icons */}
        <div className="flex items-center gap-1.5 px-3 min-w-0 flex-1 justify-center overflow-x-auto no-scrollbar">
          {allDisplayApps.map((app) => {
            const isRunning = runningAppIds.includes(app.id);
            const activeWin = windows.find(
              (w) => w.appId === app.id && w.workspaceId === activeWorkspaceId
            );
            const isFocused = activeWin && activeWin.id === activeWindowId;

            return (
              <div
                key={app.id}
                className="relative flex-shrink-0"
                onMouseEnter={() => setHoveredAppId(app.id)}
                onMouseLeave={() => setHoveredAppId(null)}
              >
                <motion.button
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  onClick={() => handleAppClick(app.id, app.displayName, app.icon)}
                  className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors cursor-pointer ${
                    isFocused
                      ? 'bg-white/15 shadow-md ring-1 ring-[var(--accent-primary)]/70'
                      : 'hover:bg-white/10'
                  }`}
                  title={app.displayName}
                >
                  <AppIconBadge appId={app.id} size="sm" showGlow={isFocused} />

                  {/* Running indicator dot */}
                  {isRunning && (
                    <span
                      className={`absolute bottom-0.5 rounded-full transition-all ${
                        isFocused
                          ? 'w-4 h-1 bg-[#E06C38] shadow-[0_0_8px_rgba(224,108,56,0.85)]'
                          : 'w-1.5 h-1.5 bg-[#8F96A3]/80'
                      }`}
                    />
                  )}
                </motion.button>

                {/* Window Thumbnail Preview Hover Card */}
                {hoveredAppId === app.id && activeWin && (
                  <div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 w-56 p-3 rounded-2xl bg-[#1E222A]/95 border border-[#2D333F] shadow-2xl backdrop-blur-2xl z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-2.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAppClick(app.id, app.displayName, app.icon);
                    }}
                  >
                    {/* Preview Header */}
                    <div className="flex items-center justify-between pb-1.5 mb-0.5 border-b border-[var(--border-subtle)] text-[11px]">
                      <div className="flex items-center gap-2 truncate pr-1">
                        <AppIconBadge appId={app.id} size="sm" />
                        <span className="font-semibold truncate text-[var(--text-primary)]">
                          {activeWin.title}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEngine.play('window_close');
                          closeWindow(activeWin.id);
                          setHoveredAppId(null);
                        }}
                        className="w-5 h-5 rounded flex items-center justify-center text-[var(--text-secondary)] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Close Window"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Thumbnail Body Simulation */}
                    <div className="h-20 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] p-2 flex flex-col justify-between overflow-hidden relative group/thumb hover:border-[var(--accent-primary)]/50 transition-colors">
                      <div className="flex items-center gap-1.5 opacity-70">
                        <span className="w-2 h-2 rounded-full bg-red-400/80" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                      </div>
                      <div className="flex-1 flex items-center justify-center">
                        <span className="text-[10px] text-[var(--text-secondary)] font-mono text-center">
                          {activeWin.width} × {activeWin.height}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-[var(--text-secondary)] pt-1 border-t border-white/5 font-mono">
                        <span>{activeWin.isMinimized ? 'Minimized' : 'Active'}</span>
                        <span className="text-[var(--accent-primary)] font-semibold">Click to Switch</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Section: System Tray */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Quick Settings trigger with Wi-Fi, Volume, Battery */}
          <button
            onClick={() => {
              soundEngine.play('click');
              const nextState = !isQuickSettingsOpen;
              setQuickSettingsOpen(nextState);
              if (nextState) {
                setStartMenuOpen(false);
                setNotificationCenterOpen(false);
              }
            }}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              isQuickSettingsOpen
                ? 'bg-[var(--surface-card)] ring-1 ring-[var(--accent-primary)] text-[#ECEFF4]'
                : 'hover:bg-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[#ECEFF4]'
            }`}
            title="Quick Settings"
          >
            <Wifi className={`w-4 h-4 ${metrics.isOnline ? 'text-[var(--accent-primary)]' : 'text-[#8F96A3] opacity-60'}`} />
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#ECEFF4]" />
            ) : (
              <VolumeX className="w-4 h-4 text-red-400" />
            )}
            <div className="flex items-center gap-1 text-[11px] font-medium">
              <Battery className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline font-mono">
                {metrics.hasBattery ? `${metrics.batteryLevel}%` : 'AC'}
              </span>
            </div>
          </button>

          {/* Clock & Date with Interactive Flyout Card */}
          <div className="relative">
            <button
              onClick={() => {
                soundEngine.play('click');
                const calWin = windows.find((w) => w.appId === 'calendar');
                if (calWin) focusWindow(calWin.id);
                else openApp('calendar', 'Calendar & Events', 'calendar');
              }}
              onMouseEnter={() => setShowClockCard(true)}
              onMouseLeave={() => setShowClockCard(false)}
              className="text-right px-3 py-1 rounded-xl text-xs leading-tight font-medium hidden sm:block hover:bg-[var(--border-medium)] transition-colors cursor-pointer select-none"
              title="Click to launch Calendar & Events"
            >
              <span className="block font-semibold text-[#ECEFF4]">{timeStr}</span>
              <span className="text-[10px] text-[var(--text-secondary)]">{dateStr}</span>
            </button>

            {/* Hover Tooltip Card */}
            {showClockCard && (
              <div className="absolute bottom-16 right-0 w-64 p-3 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-medium)] shadow-2xl backdrop-blur-3xl z-50 animate-in fade-in zoom-in-95 duration-150 pointer-events-none">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)]">
                  <div>
                    <span className="text-xs font-bold text-[var(--text-primary)] block">
                      {fullTimeStr}
                    </span>
                    <span className="text-[10px] text-[var(--text-secondary)] block">
                      {fullDateStr}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-mono">
                  <span>Session Active</span>
                  <span className="text-[var(--accent-primary)] font-semibold">Click for Calendar</span>
                </div>
              </div>
            )}
          </div>

          {/* Notification Center Trigger */}
          <button
            onClick={() => {
              soundEngine.play('click');
              const nextState = !isNotificationCenterOpen;
              setNotificationCenterOpen(nextState);
              if (nextState) {
                setStartMenuOpen(false);
                setQuickSettingsOpen(false);
              }
            }}
            className={`relative p-2.5 rounded-xl transition-all cursor-pointer ${
              isNotificationCenterOpen
                ? 'bg-[var(--accent-primary)] text-white'
                : 'hover:bg-[var(--border-medium)] text-[var(--text-secondary)] hover:text-[#ECEFF4]'
            }`}
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
            )}
          </button>

          {/* Show Desktop Peek Slice */}
          <button
            onClick={toggleShowDesktop}
            className="w-1.5 h-8 rounded-full bg-[var(--border-subtle)] hover:bg-[var(--accent-primary)] transition-colors ml-1"
            title="Show Desktop (Win+D)"
          />
        </div>
      </div>
    </div>
  );
};
