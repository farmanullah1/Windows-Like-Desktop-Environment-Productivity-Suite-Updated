import React, { useState } from 'react';
import {
  Search,
  Power,
  Lock,
  RotateCcw,
  Folder,
  Settings,
  FileText,
  Terminal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesktop } from '../core/desktopStore';
import { getAllApps } from '../apps/registry';
import { soundEngine } from '../design-system/soundEngine';
import { AppIconBadge } from '../design-system/AppIconBadge';

export const StartMenu: React.FC = () => {
  const { isStartMenuOpen, setStartMenuOpen, openApp, addNotification, setLocked } = useDesktop();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [userProfile] = useState<{ displayName: string; email: string }>(() => {
    try {
      const saved = localStorage.getItem('adw_current_user');
      return saved ? JSON.parse(saved) : { displayName: 'Administrator', email: 'admin@desktop.local' };
    } catch {
      return { displayName: 'Administrator', email: 'admin@desktop.local' };
    }
  });
  const apps = getAllApps();

  if (!isStartMenuOpen) return null;

  const CATEGORIES = ['All', 'Core', 'Productivity', 'Developer', 'Utilities', 'System', 'Media'];

  const filteredApps = apps.filter((a) => {
    const matchesSearch =
      a.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || a.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleLaunch = (appId: string, displayName: string, icon: string) => {
    soundEngine.play('click');
    openApp(appId, displayName, icon);
    setStartMenuOpen(false);
  };

  const handlePowerAction = (action: string) => {
    soundEngine.play('click');
    setShowPowerMenu(false);
    setStartMenuOpen(false);
    if (action === 'lock') {
      addNotification('Session Locked', 'Desktop workspace session has been secured.', 'info', 'System');
      setLocked(true);
    } else if (action === 'restart') {
      if (confirm('Restart desktop workspace session?')) {
        window.location.reload();
      }
    } else if (action === 'shutdown') {
      addNotification('Power Options', 'Desktop application platform session suspended.', 'warning', 'Power');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[560px] max-w-[95vw] max-h-[640px] rounded-3xl bg-[#1E222A]/95 border border-[#2D333F] shadow-[0_30px_70px_rgba(0,0,0,0.65)] backdrop-blur-3xl z-[var(--z-flyout-menu)] flex flex-col overflow-hidden select-none"
    >
      {/* Top Search Input & Keyboard Hints */}
      <div className="p-4 border-b border-[#2D333F] bg-[#14171D] flex flex-col gap-3">
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#8F96A3]">
            <Search className="w-4 h-4 text-[#E06C38]" />
          </div>
          <input
            type="text"
            placeholder="Type to search apps, files, settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            style={{ paddingLeft: '2.75rem', paddingRight: '3.5rem' }}
            className="w-full pl-11 pr-16 py-2.5 bg-[#1E222A] border border-[#2D333F] rounded-xl text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none focus:border-[#E06C38] focus:ring-1 focus:ring-[#E06C38]/40 shadow-inner transition-all"
          />
          <div className="absolute right-3 flex items-center">
            <kbd className="px-1.5 py-0.5 rounded bg-[#14171D] border border-[#2D333F] text-[9px] font-mono text-[#8F96A3]">
              Esc
            </kbd>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[11px]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E06C38] text-white shadow-sm'
                  : 'bg-[#1E222A] text-[#8F96A3] hover:text-[#ECEFF4] hover:bg-[#2D333F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Apps View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Pinned Applications Header */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#ECEFF4]">
            {selectedCategory === 'All' ? 'All Applications' : `${selectedCategory} Applications`}
          </span>
          <span className="text-[11px] text-[#8F96A3] font-medium">
            {filteredApps.length} of {apps.length} apps
          </span>
        </div>

        {/* Pinned Apps Grid */}
        <div className="grid grid-cols-4 gap-3">
          {filteredApps.map((app) => {
            return (
              <motion.button
                key={app.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLaunch(app.id, app.displayName, app.icon)}
                className="flex flex-col items-center p-3 rounded-2xl hover:bg-[#2D333F]/40 transition-colors text-center group cursor-pointer"
              >
                <AppIconBadge appId={app.id} size="md" className="mb-2" />
                <span className="text-xs font-medium text-[#ECEFF4] truncate w-full">
                  {app.displayName}
                </span>
                <span className="text-[10px] text-[#8F96A3] truncate w-full">
                  {app.category}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Recommended / Recent Items */}
        <div className="pt-2 border-t border-[#2D333F]">
          <span className="text-xs font-bold text-[#ECEFF4] px-1 block mb-2">
            Recommended
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: 'System Specification.md', time: '10m ago', icon: FileText, appId: 'notes' },
              { title: 'File Explorer Storage', time: '2h ago', icon: Folder, appId: 'file-explorer' },
              { title: 'Terminal Diagnostics', time: 'Yesterday', icon: Terminal, appId: 'terminal' },
              { title: 'Appearance Settings', time: 'Yesterday', icon: Settings, appId: 'settings' },
            ].map((rec) => {
              const RecIcon = rec.icon;
              return (
                <motion.div
                  key={rec.title}
                  whileHover={{ scale: 1.02, x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLaunch(rec.appId, rec.title, rec.appId)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#2D333F]/40 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#14171D] border border-[#2D333F] flex items-center justify-center text-[#E06C38] flex-shrink-0">
                    <RecIcon className="w-4 h-4" />
                  </div>
                  <div className="truncate flex-1">
                    <p className="text-xs font-medium truncate text-[#ECEFF4]">{rec.title}</p>
                    <span className="text-[10px] text-[#8F96A3]">{rec.time}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Footer & Power Bar */}
      <div className="p-3 border-t border-[#2D333F] bg-[#14171D] flex items-center justify-between relative gap-2">
        <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-[#2D333F]/40 cursor-pointer transition-colors min-w-0 flex-1">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C85728] via-[#E06C38] to-[#F07D49] flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0">
            {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="text-left min-w-0 flex-1 truncate">
            <span className="text-xs font-semibold block leading-tight truncate text-[#ECEFF4]">
              {userProfile?.displayName || 'MyOS Administrator'}
            </span>
            <span className="text-[10px] text-[#8F96A3] truncate block">
              {userProfile?.email || 'Verified Workstation Profile'}
            </span>
          </div>
        </div>

        {/* Power Menu Trigger */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowPowerMenu(!showPowerMenu)}
            className="p-2 rounded-xl hover:bg-[#2D333F] text-[#8F96A3] hover:text-[#E05252] transition-colors cursor-pointer"
            title="Power Options"
          >
            <Power className="w-4 h-4" />
          </button>

          {/* Power flyout */}
          <AnimatePresence>
            {showPowerMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 bottom-10 w-44 p-1.5 rounded-xl bg-[#1E222A] border border-[#2D333F] shadow-2xl backdrop-blur-2xl z-50 text-xs"
              >
                <button
                  onClick={() => handlePowerAction('lock')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2D333F] text-[#ECEFF4] transition-colors text-left cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#E06C38]" />
                  <span>Lock Workspace</span>
                </button>
                <button
                  onClick={() => handlePowerAction('restart')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2D333F] text-[#ECEFF4] transition-colors text-left cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#D9822B]" />
                  <span>Restart Session</span>
                </button>
                <button
                  onClick={() => handlePowerAction('shutdown')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#E05252]/20 text-[#E05252] transition-colors text-left cursor-pointer"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>Suspend Desktop</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
