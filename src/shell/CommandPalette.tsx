import React, { useState, useEffect, useRef } from 'react';
import {
  Folder,
  Settings,
  FileText,
  Terminal,
  Activity,
  Monitor,
  Calculator,
  Clock,
  Send,
  Code,
  Layout,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Eye,
  Command as CommandIcon,
} from 'lucide-react';
import { useDesktop } from '../core/desktopStore';
import { useTheme } from '../design-system/ThemeProvider';
import { soundEngine } from '../design-system/soundEngine';

interface CommandEntry {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  shortcut?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    openApp,
    workspaces,
    switchWorkspace,
    toggleShowDesktop,
  } = useDesktop();

  const { theme, setTheme, soundEnabled, setSoundEnabled } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  // Keyboard shortcut listener for global Ctrl+Space or Alt+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.code === 'Space') || (e.altKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        soundEngine.play('click');
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  // Build command list
  const commands: CommandEntry[] = [
    // Applications
    {
      id: 'cmd-files',
      title: 'Open File Explorer',
      subtitle: 'Browse files and virtual directories',
      category: 'Applications',
      shortcut: 'Win+E',
      icon: Folder,
      action: () => openApp('file-explorer', 'File Explorer', 'Folder'),
    },
    {
      id: 'cmd-terminal',
      title: 'Open Terminal Center',
      subtitle: 'Launch PowerShell and interactive bash console',
      category: 'Applications',
      shortcut: 'Ctrl+`',
      icon: Terminal,
      action: () => openApp('terminal', 'Terminal Center', 'Terminal'),
    },
    {
      id: 'cmd-notes',
      title: 'Open Notes',
      subtitle: 'Create and edit markdown documents',
      category: 'Applications',
      icon: FileText,
      action: () => openApp('notes', 'Notes', 'FileText'),
    },
    {
      id: 'cmd-settings',
      title: 'Open Settings',
      subtitle: 'Personalize themes, sounds, and display',
      category: 'Applications',
      shortcut: 'Win+I',
      icon: Settings,
      action: () => openApp('settings', 'Settings', 'Settings'),
    },
    {
      id: 'cmd-taskmgr',
      title: 'Open Task Manager',
      subtitle: 'Inspect processes and resource telemetry',
      category: 'Applications',
      shortcut: 'Ctrl+Shift+Esc',
      icon: Activity,
      action: () => openApp('task-manager', 'Task Manager', 'Activity'),
    },
    {
      id: 'cmd-sysinfo',
      title: 'Open System Information',
      subtitle: 'Hardware, OS version, and diagnostic metrics',
      category: 'Applications',
      icon: Monitor,
      action: () => openApp('system-info', 'System Information', 'Monitor'),
    },
    {
      id: 'cmd-calc',
      title: 'Open Calculator',
      subtitle: 'Arithmetic and scientific computation',
      category: 'Applications',
      icon: Calculator,
      action: () => openApp('calculator', 'Calculator', 'Calculator'),
    },
    {
      id: 'cmd-clock',
      title: 'Open Clock & Timer',
      subtitle: 'World time, stopwatch, and timer',
      category: 'Applications',
      icon: Clock,
      action: () => openApp('clock', 'Clock & Timer', 'Clock'),
    },
    {
      id: 'cmd-api',
      title: 'Open API Tester',
      subtitle: 'REST client for HTTP requests',
      category: 'Developer',
      icon: Send,
      action: () => openApp('api-tester', 'API Tester', 'Send'),
    },
    {
      id: 'cmd-json',
      title: 'Open JSON Formatter',
      subtitle: 'Validate, format, and minify JSON',
      category: 'Developer',
      icon: Code,
      action: () => openApp('json-viewer', 'JSON Formatter', 'Code'),
    },

    // Workspaces
    ...workspaces.map((ws) => ({
      id: `cmd-ws-${ws.id}`,
      title: `Switch to Workspace: ${ws.name}`,
      subtitle: `Activate virtual desktop ${ws.name}`,
      category: 'Workspaces',
      icon: Layout,
      action: () => switchWorkspace(ws.id),
    })),

    // System Actions
    {
      id: 'cmd-desktop',
      title: 'Toggle Show Desktop',
      subtitle: 'Minimize or restore all windows',
      category: 'System',
      shortcut: 'Win+D',
      icon: Eye,
      action: () => toggleShowDesktop(),
    },
    {
      id: 'cmd-theme',
      title: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      subtitle: 'Change desktop color scheme',
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'cmd-sound',
      title: soundEnabled ? 'Mute Sound Cues' : 'Unmute Sound Cues',
      subtitle: 'Toggle procedural Web Audio synthesis',
      category: 'Preferences',
      icon: soundEnabled ? VolumeX : Volume2,
      action: () => setSoundEnabled(!soundEnabled),
    },
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd: CommandEntry) => {
    soundEngine.play('click');
    setCommandPaletteOpen(false);
    cmd.action();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleSelect(filteredCommands[selectedIndex]);
      }
    }
  };

  return (
    <div
      onClick={() => setCommandPaletteOpen(false)}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[var(--z-command-palette)] flex items-start justify-center pt-24 select-none animate-in fade-in duration-100"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-3xl bg-[#1E222A]/95 border border-[#2D333F] shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-3xl overflow-hidden flex flex-col max-h-[480px] animate-in zoom-in-95 duration-100"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2D333F] bg-[#14171D]">
          <CommandIcon className="w-4 h-4 text-[#E06C38] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search commands, apps, and workspaces..."
            className="flex-1 bg-transparent border-none text-xs text-[#ECEFF4] placeholder-[#8F96A3] focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded-md bg-[#1E222A] border border-[#2D333F] font-mono text-[10px] text-[#8F96A3]">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-1.5">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--text-muted)]">
              No matching commands or applications found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={cmd.id}
                  onClick={() => handleSelect(cmd)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-xs transition-colors gap-3.5 ${
                    isSelected
                      ? 'bg-[var(--accent-primary)] text-white'
                      : 'hover:bg-[var(--surface-card)] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 truncate min-w-0 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[var(--surface-input)] text-[var(--accent-primary)]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate min-w-0 flex-1">
                      <span className="font-semibold block truncate leading-tight">{cmd.title}</span>
                      <span
                        className={`text-[10px] block truncate mt-0.5 ${
                          isSelected ? 'text-white/80' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {cmd.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[var(--surface-input)] text-[var(--text-muted)]'
                      }`}
                    >
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[var(--surface-input)] text-[var(--text-muted)]'
                        }`}
                      >
                        {cmd.shortcut}
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
