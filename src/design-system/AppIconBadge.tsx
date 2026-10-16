import React from 'react';
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
  Box,
  Layers,
  Cpu,
  FileCode,
  Music,
  Image as ImageIcon,
  Sparkles,
  Clipboard,
  Wrench,
  CheckSquare,
  Calendar,
  Flame,
  ShieldCheck,
  Bot,
} from 'lucide-react';

interface AppIconBadgeProps {
  appId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

const APP_STYLE_MAP: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    gradient: string;
    glow: string;
    label: string;
  }
> = {
  'file-explorer': {
    icon: Folder,
    gradient: 'from-amber-500 via-amber-600 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.4)',
    label: 'File Explorer',
  },
  'settings': {
    icon: Settings,
    gradient: 'from-slate-500 via-zinc-600 to-slate-700',
    glow: 'rgba(100, 116, 139, 0.4)',
    label: 'Settings',
  },
  'notes': {
    icon: FileText,
    gradient: 'from-fuchsia-500 via-purple-600 to-indigo-600',
    glow: 'rgba(217, 70, 239, 0.4)',
    label: 'Notes',
  },
  'terminal': {
    icon: Terminal,
    gradient: 'from-emerald-500 via-teal-700 to-slate-900',
    glow: 'rgba(16, 185, 129, 0.4)',
    label: 'Terminal',
  },
  'task-manager': {
    icon: Activity,
    gradient: 'from-rose-500 via-red-600 to-pink-700',
    glow: 'rgba(244, 63, 94, 0.4)',
    label: 'Task Manager',
  },
  'system-info': {
    icon: Monitor,
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    glow: 'rgba(6, 182, 212, 0.4)',
    label: 'System Information',
  },
  'calculator': {
    icon: Calculator,
    gradient: 'from-amber-500 via-orange-600 to-amber-700',
    glow: 'rgba(249, 115, 22, 0.4)',
    label: 'Calculator',
  },
  'clock': {
    icon: Clock,
    gradient: 'from-sky-400 via-blue-500 to-indigo-600',
    glow: 'rgba(14, 165, 233, 0.4)',
    label: 'Clock',
  },
  'api-tester': {
    icon: Send,
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    glow: 'rgba(139, 92, 246, 0.4)',
    label: 'API Tester',
  },
  'json-viewer': {
    icon: Code,
    gradient: 'from-teal-500 via-emerald-600 to-cyan-700',
    glow: 'rgba(20, 184, 166, 0.4)',
    label: 'JSON Formatter',
  },
  'developer-workspace': {
    icon: Layers,
    gradient: 'from-indigo-500 via-blue-600 to-purple-800',
    glow: 'rgba(99, 102, 241, 0.4)',
    label: 'Developer Workspace',
  },
  'text-editor': {
    icon: FileCode,
    gradient: 'from-blue-500 via-sky-600 to-indigo-700',
    glow: 'rgba(59, 130, 246, 0.4)',
    label: 'Text Editor',
  },
  'app-catalog': {
    icon: Box,
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    glow: 'rgba(52, 211, 153, 0.4)',
    label: 'App Catalog',
  },
  'diagnostics': {
    icon: Cpu,
    gradient: 'from-red-500 via-rose-600 to-amber-700',
    glow: 'rgba(239, 68, 68, 0.4)',
    label: 'Diagnostics',
  },
  'media-player': {
    icon: Music,
    gradient: 'from-cyan-400 via-indigo-600 to-fuchsia-600',
    glow: 'rgba(192, 38, 211, 0.5)',
    label: 'Media Player',
  },
  'gallery': {
    icon: ImageIcon,
    gradient: 'from-rose-400 via-pink-500 to-amber-500',
    glow: 'rgba(244, 63, 94, 0.45)',
    label: 'Photo Studio',
  },
  'clipboard': {
    icon: Clipboard,
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    glow: 'rgba(245, 158, 11, 0.4)',
    label: 'Clipboard Manager',
  },
  'snippets': {
    icon: Sparkles,
    gradient: 'from-violet-400 via-purple-500 to-indigo-600',
    glow: 'rgba(139, 92, 246, 0.4)',
    label: 'Snippet Expander',
  },
  'quick-utils': {
    icon: Wrench,
    gradient: 'from-teal-400 via-cyan-500 to-blue-600',
    glow: 'rgba(6, 182, 212, 0.4)',
    label: 'Quick Utilities',
  },
  'tasks': {
    icon: CheckSquare,
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    glow: 'rgba(59, 130, 246, 0.4)',
    label: 'Tasks',
  },
  'calendar': {
    icon: Calendar,
    gradient: 'from-rose-500 via-red-600 to-amber-600',
    glow: 'rgba(244, 63, 94, 0.4)',
    label: 'Calendar',
  },
  'focus': {
    icon: Flame,
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    glow: 'rgba(249, 115, 22, 0.4)',
    label: 'Focus Mode',
  },
  'vault': {
    icon: ShieldCheck,
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    glow: 'rgba(16, 185, 129, 0.4)',
    label: 'Security Vault',
  },
  'ai-assistant': {
    icon: Bot,
    gradient: 'from-purple-500 via-indigo-600 to-pink-600',
    glow: 'rgba(168, 85, 247, 0.4)',
    label: 'MyOS AI',
  },
};

const SIZE_CLASSES = {
  sm: {
    container: 'w-9 h-9 rounded-xl',
    icon: 'w-5 h-5',
  },
  md: {
    container: 'w-12 h-12 rounded-2xl',
    icon: 'w-6 h-6',
  },
  lg: {
    container: 'w-16 h-16 rounded-2xl',
    icon: 'w-8 h-8',
  },
  xl: {
    container: 'w-20 h-20 rounded-3xl',
    icon: 'w-10 h-10',
  },
};

export const AppIconBadge: React.FC<AppIconBadgeProps> = ({
  appId,
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  const config = APP_STYLE_MAP[appId] || {
    icon: Sparkles,
    gradient: 'from-amber-600 via-orange-600 to-amber-700',
    glow: 'rgba(224, 108, 56, 0.25)',
    label: appId,
  };

  const IconComponent = config.icon;
  const sizeConfig = SIZE_CLASSES[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none transition-transform duration-200 group-hover:scale-105 ${sizeConfig.container} ${className}`}
      style={{
        boxShadow: showGlow
          ? '0 6px 16px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)'
          : '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Background Gradient with Subtle Steel / Terracotta Frame */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${config.gradient} ${sizeConfig.container} border border-[#2D333F]/80`}
      />

      {/* Subtle two-tier flat-vector specular highlight layer */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[inherit]"
      />

      {/* Centered Icon in Cool White (#ECEFF4) with crisp contrast */}
      <IconComponent
        className={`relative z-10 text-[#ECEFF4] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] ${sizeConfig.icon}`}
      />
    </div>
  );
};
