import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { WindowState, Workspace, SnapZone, NotificationItem, SystemMetrics, StickyNote } from './types';
import { soundEngine } from '../design-system/soundEngine';
import { setDocumentTitle } from '../lib/documentTitle';

export interface DesktopContextValue {
  // Workspaces
  workspaces: Workspace[];
  activeWorkspaceId: string;
  switchWorkspace: (workspaceId: string) => void;
  createWorkspace: (name: string) => void;
  deleteWorkspace: (workspaceId: string) => void;
  renameWorkspace: (workspaceId: string, newName: string) => void;

  // Windows
  windows: WindowState[];
  activeWindowId: string | null;
  openApp: (appId: string, title?: string, icon?: string, defaultWidth?: number, defaultHeight?: number) => string;
  closeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  snapWindow: (windowId: string, zone: SnapZone) => void;
  updateWindowBounds: (windowId: string, x: number, y: number, width: number, height: number) => void;
  moveWindowToWorkspace: (windowId: string, targetWorkspaceId: string) => void;
  toggleShowDesktop: () => void;

  // Personalization & Wallpapers
  currentWallpaper: string;
  setWallpaper: (url: string) => void;

  // Session & Security
  isLocked: boolean;
  setLocked: (locked: boolean) => void;

  // Desktop Widgets & Sticky Notes
  widgetsVisible: boolean;
  toggleWidgets: () => void;
  stickyNotes: StickyNote[];
  addStickyNote: (note: { text: string; color: StickyNote['color']; x?: number; y?: number }) => void;
  updateStickyNote: (id: string, text: string, color?: StickyNote['color'], x?: number, y?: number) => void;
  deleteStickyNote: (id: string) => void;

  // Overlays
  isStartMenuOpen: boolean;
  setStartMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isQuickSettingsOpen: boolean;
  setQuickSettingsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isNotificationCenterOpen: boolean;
  setNotificationCenterOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  isOverviewOpen: boolean;
  setOverviewOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  closeAllOverlays: () => void;

  // Notifications
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: NotificationItem['type'], source?: string) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;

  // System Metrics & Database Connection
  metrics: SystemMetrics;
  testDbConnection: (config?: any) => Promise<any>;
  refreshSystemInfo: () => Promise<void>;
}

const DEFAULT_WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: 'Main', sortOrder: 0, isProtected: true },
  { id: 'ws-2', name: 'Development', sortOrder: 1 },
  { id: 'ws-3', name: 'Productivity', sortOrder: 2 },
  { id: 'ws-4', name: 'System', sortOrder: 3 },
];

const DesktopContext = createContext<DesktopContextValue | null>(null);

export const DesktopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Workspaces state with localStorage restoration
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    try {
      const saved = localStorage.getItem('adw_workspaces');
      return saved ? JSON.parse(saved) : DEFAULT_WORKSPACES;
    } catch {
      return DEFAULT_WORKSPACES;
    }
  });

  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(() => {
    return localStorage.getItem('adw_active_workspace') || 'ws-1';
  });

  // Windows state
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [topZIndex, setTopZIndex] = useState<number>(100);

  // Overlays state
  const [isStartMenuOpen, setStartMenuOpen] = useState(false);
  const [isQuickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [isNotificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isOverviewOpen, setOverviewOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-welcome',
      title: 'Welcome to MyOS',
      message: 'Hybrid executive workspace platform is active and ready.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'System',
      type: 'info',
      read: false,
    },
  ]);

  // Real host system metrics & database status
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 14,
    memoryUsedMb: 3500,
    memoryTotalMb: 16384,
    batteryLevel: 100,
    isCharging: true,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    hasBattery: false,
    activeProcessesCount: 42,
    uptimeSeconds: 0,
  });

  const fetchHostMetrics = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/system/info');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setMetrics((prev) => ({
            ...prev,
            cpuUsage: d.cpuUsage,
            memoryTotalMb: d.memoryTotalMb,
            memoryUsedMb: d.memoryUsedMb,
            uptimeSeconds: d.uptimeSeconds,
            activeProcessesCount: d.activeProcesses,
            hostInfo: d,
            dbStatus: d.database,
          }));
        }
      }
    } catch (_e) {
      // Offline resilient fallback
    }
  }, []);

  const testDbConnection = useCallback(async (customConfig?: any) => {
    try {
      const res = await fetch('/api/v1/db/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: customConfig }),
      });
      const data = await res.json();
      await fetchHostMetrics();
      return data?.data || { success: false, error: 'Network error contacting endpoint' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to contact database endpoint' };
    }
  }, [fetchHostMetrics]);

  // Hook live system telemetry, Web Battery API, and Network events
  useEffect(() => {
    fetchHostMetrics();
    const interval = setInterval(fetchHostMetrics, 3000);

    // Real Web Battery API
    if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setMetrics((prev) => ({
            ...prev,
            hasBattery: true,
            batteryLevel: Math.round(battery.level * 100),
            isCharging: battery.charging,
          }));
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      }).catch(() => {
        // Line-powered desktop without battery
      });
    }

    // Real Online/Offline Network APIs
    const handleOnline = () => setMetrics((prev) => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics((prev) => ({ ...prev, isOnline: false }));
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [fetchHostMetrics]);

  // Save workspaces to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('adw_workspaces', JSON.stringify(workspaces));
    } catch {
      // storage error handled safely
    }
  }, [workspaces]);

  useEffect(() => {
    localStorage.setItem('adw_active_workspace', activeWorkspaceId);
  }, [activeWorkspaceId]);

  // Synchronize browser tab document.title with active focused window
  useEffect(() => {
    const focused = windows.find((w) => w.id === activeWindowId && !w.isMinimized);
    if (focused && focused.title) {
      setDocumentTitle(focused.title);
    } else {
      setDocumentTitle();
    }
  }, [activeWindowId, windows]);

  // Close overlays helper
  const closeAllOverlays = useCallback(() => {
    setStartMenuOpen(false);
    setQuickSettingsOpen(false);
    setNotificationCenterOpen(false);
    setCommandPaletteOpen(false);
    setOverviewOpen(false);
  }, []);

  // Workspace actions
  const switchWorkspace = useCallback((wsId: string) => {
    setActiveWorkspaceId(wsId);
    soundEngine.play('workspace_switch');
    closeAllOverlays();
  }, [closeAllOverlays]);

  const createWorkspace = useCallback((name: string) => {
    const newWs: Workspace = {
      id: `ws-${Date.now()}`,
      name: name.trim() || `Workspace ${workspaces.length + 1}`,
      sortOrder: workspaces.length,
    };
    setWorkspaces((prev) => [...prev, newWs]);
    setActiveWorkspaceId(newWs.id);
    soundEngine.play('workspace_switch');
  }, [workspaces.length]);

  const deleteWorkspace = useCallback((wsId: string) => {
    if (wsId === 'ws-1') return; // Cannot delete primary workspace
    setWorkspaces((prev) => prev.filter((w) => w.id !== wsId));
    // Migrate any windows on this workspace to ws-1
    setWindows((prev) =>
      prev.map((win) => (win.workspaceId === wsId ? { ...win, workspaceId: 'ws-1' } : win))
    );
    if (activeWorkspaceId === wsId) {
      setActiveWorkspaceId('ws-1');
    }
    soundEngine.play('click');
  }, [activeWorkspaceId]);

  const renameWorkspace = useCallback((wsId: string, newName: string) => {
    setWorkspaces((prev) =>
      prev.map((w) => (w.id === wsId ? { ...w, name: newName } : w))
    );
  }, []);

  // Window Focus
  const focusWindow = useCallback((windowId: string) => {
    setTopZIndex((prev) => {
      const nextZ = prev + 1;
      setWindows((wins) =>
        wins.map((w) => ({
          ...w,
          isFocused: w.id === windowId,
          isMinimized: w.id === windowId ? false : w.isMinimized,
          zIndex: w.id === windowId ? nextZ : w.zIndex,
        }))
      );
      setActiveWindowId(windowId);
      return nextZ;
    });
  }, []);

  // Open App
  const openApp = useCallback(
    (appId: string, title?: string, icon?: string, defaultWidth = 840, defaultHeight = 560): string => {
      closeAllOverlays();

      // Check if an existing window of this app is already open on this workspace
      const existing = windows.find((w) => w.appId === appId && w.workspaceId === activeWorkspaceId);
      if (existing) {
        if (existing.isMinimized) {
          restoreWindow(existing.id);
        } else {
          focusWindow(existing.id);
        }
        return existing.id;
      }

      const newId = `win-${appId}-${Date.now()}`;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
      const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

      // Center with cascade offset
      const cascadeCount = windows.filter((w) => w.workspaceId === activeWorkspaceId).length;
      const cascadeOffset = (cascadeCount % 6) * 28;

      const clampedWidth = Math.min(defaultWidth, screenWidth - 40);
      const clampedHeight = Math.min(defaultHeight, screenHeight - 90);
      const posX = Math.max(20, Math.floor((screenWidth - clampedWidth) / 2) + cascadeOffset);
      const posY = Math.max(30, Math.floor((screenHeight - clampedHeight - 60) / 2) + cascadeOffset);

      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);

      const newWin: WindowState = {
        id: newId,
        appId,
        title: title || appId,
        icon: icon || 'AppWindow',
        x: posX,
        y: posY,
        width: clampedWidth,
        height: clampedHeight,
        minWidth: 400,
        minHeight: 280,
        zIndex: nextZ,
        workspaceId: activeWorkspaceId,
        isFocused: true,
        isMinimized: false,
        isMaximized: false,
        isFullscreen: false,
        isResizable: true,
        isDraggable: true,
        isModal: false,
        snapState: 'none',
      };

      setWindows((prev) => [
        ...prev.map((w) => ({ ...w, isFocused: false })),
        newWin,
      ]);
      setActiveWindowId(newId);
      soundEngine.play('window_open');
      return newId;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeWorkspaceId, closeAllOverlays, topZIndex, windows]
  );

  // Close Window
  const closeWindow = useCallback((windowId: string) => {
    setWindows((prev) => {
      const remaining = prev.filter((w) => w.id !== windowId);
      // Focus highest zIndex remaining window in active workspace
      const activeWins = remaining.filter((w) => w.workspaceId === activeWorkspaceId && !w.isMinimized);
      if (activeWins.length > 0) {
        activeWins.sort((a, b) => b.zIndex - a.zIndex);
        const topWin = activeWins[0];
        topWin.isFocused = true;
        setActiveWindowId(topWin.id);
      } else {
        setActiveWindowId(null);
      }
      return remaining;
    });
    soundEngine.play('window_close');
  }, [activeWorkspaceId]);

  // Minimize Window
  const minimizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true, isFocused: false } : w))
    );
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
    soundEngine.play('window_minimize');
  }, [activeWindowId]);

  // Maximize Window
  const maximizeWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w;
        if (!w.isMaximized) {
          // Store bounds for restoration
          return {
            ...w,
            isMaximized: true,
            snapState: 'none',
            previousBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
          };
        }
        return w;
      })
    );
    soundEngine.play('window_maximize');
  }, []);

  // Restore Window
  const restoreWindow = useCallback((windowId: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w;
        if (w.previousBounds) {
          return {
            ...w,
            isMinimized: false,
            isMaximized: false,
            snapState: 'none',
            x: w.previousBounds.x,
            y: w.previousBounds.y,
            width: w.previousBounds.width,
            height: w.previousBounds.height,
          };
        }
        return { ...w, isMinimized: false, isMaximized: false, snapState: 'none' };
      })
    );
    focusWindow(windowId);
    soundEngine.play('window_open');
  }, [focusWindow]);

  // Snap Window
  const snapWindow = useCallback((windowId: string, zone: SnapZone) => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const taskbarHeight = 52;
    const availableHeight = (typeof window !== 'undefined' ? window.innerHeight : 800) - taskbarHeight;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w;

        // Cache previous bounds if un-snapping
        const prevBounds = w.previousBounds || { x: w.x, y: w.y, width: w.width, height: w.height };

        if (zone === 'none') {
          return {
            ...w,
            snapState: 'none',
            x: prevBounds.x,
            y: prevBounds.y,
            width: prevBounds.width,
            height: prevBounds.height,
          };
        }

        let x = 0;
        let y = 0;
        let width = screenWidth / 2;
        let height = availableHeight;

        if (zone === 'left') {
          x = 0;
          y = 0;
          width = Math.floor(screenWidth / 2);
          height = availableHeight;
        } else if (zone === 'right') {
          x = Math.floor(screenWidth / 2);
          y = 0;
          width = Math.floor(screenWidth / 2);
          height = availableHeight;
        } else if (zone === 'top') {
          x = 0;
          y = 0;
          width = screenWidth;
          height = availableHeight;
        } else if (zone === 'top-left') {
          x = 0;
          y = 0;
          width = Math.floor(screenWidth / 2);
          height = Math.floor(availableHeight / 2);
        } else if (zone === 'top-right') {
          x = Math.floor(screenWidth / 2);
          y = 0;
          width = Math.floor(screenWidth / 2);
          height = Math.floor(availableHeight / 2);
        } else if (zone === 'bottom-left') {
          x = 0;
          y = Math.floor(availableHeight / 2);
          width = Math.floor(screenWidth / 2);
          height = Math.floor(availableHeight / 2);
        } else if (zone === 'bottom-right') {
          x = Math.floor(screenWidth / 2);
          y = Math.floor(availableHeight / 2);
          width = Math.floor(screenWidth / 2);
          height = Math.floor(availableHeight / 2);
        }

        return {
          ...w,
          snapState: zone,
          isMaximized: zone === 'top',
          previousBounds: prevBounds,
          x,
          y,
          width,
          height,
        };
      })
    );
    soundEngine.play('window_snap');
  }, []);

  // Update Window Bounds (drag / resize)
  const updateWindowBounds = useCallback(
    (windowId: string, x: number, y: number, width: number, height: number) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? {
                ...w,
                x,
                y,
                width: Math.max(w.minWidth || 300, width),
                height: Math.max(w.minHeight || 200, height),
                snapState: 'none',
                isMaximized: false,
              }
            : w
        )
      );
    },
    []
  );

  // Move Window to Target Workspace
  const moveWindowToWorkspace = useCallback(
    (windowId: string, targetWorkspaceId: string) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === windowId ? { ...w, workspaceId: targetWorkspaceId } : w))
      );
      soundEngine.play('click');
    },
    []
  );

  // Toggle Show Desktop
  const toggleShowDesktop = useCallback(() => {
    const activeWins = windows.filter(
      (w) => w.workspaceId === activeWorkspaceId && !w.isMinimized
    );
    if (activeWins.length > 0) {
      // Minimize all in current workspace
      setWindows((prev) =>
        prev.map((w) => (w.workspaceId === activeWorkspaceId ? { ...w, isMinimized: true, isFocused: false } : w))
      );
      setActiveWindowId(null);
    } else {
      // Restore all
      setWindows((prev) =>
        prev.map((w) => (w.workspaceId === activeWorkspaceId ? { ...w, isMinimized: false } : w))
      );
    }
    soundEngine.play('window_minimize');
  }, [activeWorkspaceId, windows]);

  // Notifications
  const addNotification = useCallback(
    (title: string, message: string, type: NotificationItem['type'] = 'info', source = 'System') => {
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title,
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source,
        type,
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
      soundEngine.play('notification');
    },
    []
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    soundEngine.play('click');
  }, []);

  // Personalization & Wallpaper
  const [currentWallpaper, setCurrentWallpaper] = useState<string>(() => {
    try {
      return localStorage.getItem('adw_current_wallpaper') || '/wallpapers/aurora.jpg';
    } catch {
      return '/wallpapers/aurora.jpg';
    }
  });

  const setWallpaper = useCallback((url: string) => {
    setCurrentWallpaper(url);
    try {
      localStorage.setItem('adw_current_wallpaper', url);
    } catch {
      // safe fallback
    }
  }, []);

  // Session & Security
  const [isLocked, setLocked] = useState<boolean>(false);

  // Desktop Widgets
  const [widgetsVisible, setWidgetsVisible] = useState<boolean>(() => {
    try {
      return localStorage.getItem('adw_widgets_visible') !== 'false';
    } catch {
      return true;
    }
  });

  const toggleWidgets = useCallback(() => {
    setWidgetsVisible((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('adw_widgets_visible', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Sticky Notes
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(() => {
    try {
      const saved = localStorage.getItem('adw_sticky_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((n: StickyNote) => ({
          ...n,
          text: (n.text || '')
            .replace(/Antigravity OS/g, 'MyOS')
            .replace(/ADW-5 Desktop/g, 'MyOS Desktop')
            .replace(/ADW-5/g, 'MyOS'),
          x: n.x === 180 && n.y === 80 ? 160 : n.x,
          y: n.x === 180 && n.y === 80 ? 460 : n.y,
        }));
      }
      return [
        {
          id: 'sn-1',
          text: '✨ Welcome to MyOS!\n- Press Ctrl+Space for Command Palette\n- Try the new Media Player & Photo Studio\n- Toggle desktop widgets anytime',
          color: 'yellow',
          x: 160,
          y: 460,
          createdAt: new Date().toISOString(),
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('adw_sticky_notes', JSON.stringify(stickyNotes));
    } catch {
      // ignore
    }
  }, [stickyNotes]);

  const addStickyNote = useCallback(
    (note: { text: string; color: StickyNote['color']; x?: number; y?: number }) => {
      const newNote: StickyNote = {
        id: `sn-${Date.now()}`,
        text: note.text,
        color: note.color,
        x: note.x ?? Math.floor(Math.random() * 200 + 160),
        y: note.y ?? Math.floor(Math.random() * 150 + 100),
        createdAt: new Date().toISOString(),
      };
      setStickyNotes((prev) => [...prev, newNote]);
      soundEngine.play('click');
    },
    []
  );

  const updateStickyNote = useCallback(
    (id: string, text: string, color?: StickyNote['color'], x?: number, y?: number) => {
      setStickyNotes((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, text, ...(color ? { color } : {}), ...(x !== undefined && y !== undefined ? { x, y } : {}) }
            : n
        )
      );
    },
    []
  );

  const deleteStickyNote = useCallback((id: string) => {
    setStickyNotes((prev) => prev.filter((n) => n.id !== id));
    soundEngine.play('click');
  }, []);

  const value = useMemo(
    () => ({
      workspaces,
      activeWorkspaceId,
      switchWorkspace,
      createWorkspace,
      deleteWorkspace,
      renameWorkspace,
      windows,
      activeWindowId,
      openApp,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      snapWindow,
      updateWindowBounds,
      moveWindowToWorkspace,
      toggleShowDesktop,
      currentWallpaper,
      setWallpaper,
      isLocked,
      setLocked,
      widgetsVisible,
      toggleWidgets,
      stickyNotes,
      addStickyNote,
      updateStickyNote,
      deleteStickyNote,
      isStartMenuOpen,
      setStartMenuOpen,
      isQuickSettingsOpen,
      setQuickSettingsOpen,
      isNotificationCenterOpen,
      setNotificationCenterOpen,
      isCommandPaletteOpen,
      setCommandPaletteOpen,
      isOverviewOpen,
      setOverviewOpen,
      closeAllOverlays,
      notifications,
      addNotification,
      dismissNotification,
      clearAllNotifications,
      metrics,
      testDbConnection,
      refreshSystemInfo: fetchHostMetrics,
    }),
    [
      workspaces,
      activeWorkspaceId,
      switchWorkspace,
      createWorkspace,
      deleteWorkspace,
      renameWorkspace,
      windows,
      activeWindowId,
      openApp,
      closeWindow,
      focusWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      snapWindow,
      updateWindowBounds,
      moveWindowToWorkspace,
      toggleShowDesktop,
      currentWallpaper,
      setWallpaper,
      isLocked,
      setLocked,
      widgetsVisible,
      toggleWidgets,
      stickyNotes,
      addStickyNote,
      updateStickyNote,
      deleteStickyNote,
      isStartMenuOpen,
      isQuickSettingsOpen,
      isNotificationCenterOpen,
      isCommandPaletteOpen,
      isOverviewOpen,
      closeAllOverlays,
      notifications,
      addNotification,
      dismissNotification,
      clearAllNotifications,
      metrics,
      testDbConnection,
      fetchHostMetrics,
    ]
  );

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
};

export const useDesktop = (): DesktopContextValue => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within a DesktopProvider');
  }
  return context;
};
