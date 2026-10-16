import React from 'react';

export type SnapZone =
  | 'none'
  | 'left'
  | 'right'
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minWidth: number;
  minHeight: number;
  zIndex: number;
  workspaceId: string;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFullscreen: boolean;
  isResizable: boolean;
  isDraggable: boolean;
  isModal: boolean;
  snapState: SnapZone;
  previousBounds?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Workspace {
  id: string;
  name: string;
  sortOrder: number;
  wallpaperUrl?: string;
  accentColor?: string;
  isProtected?: boolean;
}

export type AppCategory =
  | 'Core'
  | 'Productivity'
  | 'System'
  | 'Developer'
  | 'Media'
  | 'Utilities';

export interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'teal' | 'coral' | 'violet' | 'sky';
  x: number;
  y: number;
  createdAt: string;
}

export interface AppDefinition {
  id: string;
  name: string;
  displayName: string;
  description: string;
  version: string;
  icon: string; // Lucide icon identifier or SVG
  category: AppCategory;
  defaultWidth: number;
  defaultHeight: number;
  minWidth?: number;
  minHeight?: number;
  isPinned: boolean;
  component: React.ComponentType<{ windowId: string }>;
  permissions?: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  source: string;
  icon?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

export interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
}

export interface DatabaseStatus {
  engine: string;
  state: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING' | 'INITIALIZING';
  server: string;
  port: number;
  database: string;
  user: string;
  encrypted: boolean;
  trustedCertificate: boolean;
  lastConnectedAt: string | null;
  lastError: string | null;
}

export interface HostSystemInfo {
  os: string;
  platform: string;
  release: string;
  arch: string;
  hostname: string;
  cpuModel: string;
  cpuSpeedMhz: number;
  cpuCores: number;
  cpuUsage: number;
  memoryTotalMb: number;
  memoryUsedMb: number;
  memoryFreeMb: number;
  memoryPercent: number;
  activeProcesses: number;
  uptimeSeconds: number;
  classification: string;
  database: DatabaseStatus;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsedMb: number;
  memoryTotalMb: number;
  batteryLevel: number;
  isCharging: boolean;
  isOnline: boolean;
  hasBattery?: boolean;
  activeProcessesCount: number;
  uptimeSeconds: number;
  hostInfo?: HostSystemInfo;
  dbStatus?: DatabaseStatus;
}
