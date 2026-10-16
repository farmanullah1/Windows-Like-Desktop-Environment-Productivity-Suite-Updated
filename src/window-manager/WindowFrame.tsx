import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Minus,
  Square,
  Copy,
  X,
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
  AppWindow,
} from 'lucide-react';
import { WindowState } from '../core/types';
import { useDesktop } from '../core/desktopStore';
import { APP_REGISTRY } from '../apps/registry';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
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
  AppWindow,
};

export const WindowFrame: React.FC<{ window: WindowState }> = ({ window: win }) => {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    snapWindow,
    updateWindowBounds,
  } = useDesktop();

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showSnapMenu, setShowSnapMenu] = useState(false);
  const snapMenuTimeout = useRef<NodeJS.Timeout | null>(null);

  const windowRef = useRef<HTMLDivElement>(null);
  const appDef = APP_REGISTRY[win.appId];
  const AppComponent = appDef?.component;
  const IconComponent = ICON_MAP[win.icon] || AppWindow;

  // Window drag handler
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (win.isMaximized || (e.target as HTMLElement).closest('button')) return;
    focusWindow(win.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - win.x,
      y: e.clientY - win.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const newX = e.clientX - dragOffset.x;
      const newY = Math.max(0, Math.min(screenHeight - 100, e.clientY - dragOffset.y));

      updateWindowBounds(win.id, newX, newY, win.width, win.height);

      // Edge snap detection
      if (e.clientX <= 20) {
        snapWindow(win.id, 'left');
        setIsDragging(false);
      } else if (e.clientX >= screenWidth - 20) {
        snapWindow(win.id, 'right');
        setIsDragging(false);
      } else if (e.clientY <= 15) {
        snapWindow(win.id, 'top');
        setIsDragging(false);
      }
    },
    [isDragging, dragOffset, win.id, win.width, win.height, updateWindowBounds, snapWindow]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Window resize handler
  const handleResizeMouseDown = (direction: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusWindow(win.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = win.width;
    const startHeight = win.height;
    const startPosX = win.x;
    const startPosY = win.y;

    const onResizeMove = (moveEvt: MouseEvent) => {
      const deltaX = moveEvt.clientX - startX;
      const deltaY = moveEvt.clientY - startY;

      let nextWidth = startWidth;
      let nextHeight = startHeight;
      let nextX = startPosX;
      let nextY = startPosY;

      if (direction.includes('e')) nextWidth = Math.max(win.minWidth || 340, startWidth + deltaX);
      if (direction.includes('s')) nextHeight = Math.max(win.minHeight || 240, startHeight + deltaY);
      if (direction.includes('w')) {
        const potentialWidth = startWidth - deltaX;
        if (potentialWidth >= (win.minWidth || 340)) {
          nextWidth = potentialWidth;
          nextX = startPosX + deltaX;
        }
      }
      if (direction.includes('n')) {
        const potentialHeight = startHeight - deltaY;
        if (potentialHeight >= (win.minHeight || 240)) {
          nextHeight = potentialHeight;
          nextY = startPosY + deltaY;
        }
      }

      updateWindowBounds(win.id, nextX, nextY, nextWidth, nextHeight);
    };

    const onResizeUp = () => {
      document.removeEventListener('mousemove', onResizeMove);
      document.removeEventListener('mouseup', onResizeUp);
    };

    document.addEventListener('mousemove', onResizeMove);
    document.addEventListener('mouseup', onResizeUp);
  };

  if (win.isMinimized) return null;

  // Compute CSS placement
  const isMaximized = win.isMaximized || win.snapState === 'top';
  const taskbarHeight = 54;

  const style: React.CSSProperties = isMaximized
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `calc(100% - ${taskbarHeight}px)`,
        zIndex: win.zIndex,
      }
    : {
        position: 'absolute',
        top: `${win.y}px`,
        left: `${win.x}px`,
        width: `${win.width}px`,
        height: `${win.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      ref={windowRef}
      style={style}
      onClick={() => focusWindow(win.id)}
      className={`flex flex-col rounded-2xl overflow-hidden backdrop-blur-2xl transition-[box-shadow,border-color] duration-150 ${
        win.isFocused
          ? 'shadow-[0_25px_65px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(224,108,56,0.6)] border border-[#E06C38]/50 ring-1 ring-[#E06C38]/30'
          : 'shadow-[0_12px_35px_-8px_rgba(0,0,0,0.65)] border border-[#2D333F]'
      } ${isMaximized ? 'rounded-none' : ''}`}
    >
      {/* Active Window Top Edge-Light Bar */}
      {win.isFocused && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px] z-50 pointer-events-none opacity-90"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #E06C38 50%, transparent 100%)' }}
        />
      )}

      {/* Window Title Bar */}
      <div
        onMouseDown={handleHeaderMouseDown}
        onDoubleClick={() => {
          if (win.isMaximized) restoreWindow(win.id);
          else maximizeWindow(win.id);
        }}
        className={`flex items-center justify-between px-3.5 py-2.5 select-none cursor-default border-b border-[#2D333F] transition-colors ${
          win.isFocused
            ? 'bg-gradient-to-r from-[#1E222A] via-[#242A35] to-[#1E222A] text-[#ECEFF4]'
            : 'bg-[#14171D] text-[#8F96A3]'
        }`}
      >
        {/* App Title & Icon */}
        <div className="flex items-center gap-2.5 truncate flex-1 min-w-0 mr-2">
          <IconComponent className="w-4 h-4 text-[#E06C38] flex-shrink-0" />
          <span className="text-xs font-semibold tracking-wide truncate text-[#ECEFF4]">{win.title}</span>
        </div>

        {/* Window Control Buttons */}
        <div className="flex items-center gap-1 -mr-1 flex-shrink-0">
          {/* Minimize Button */}
          <button
            onClick={() => minimizeWindow(win.id)}
            className="w-8 h-7 flex items-center justify-center rounded-lg hover:bg-[#2D333F] text-[#8F96A3] hover:text-[#ECEFF4] transition-all cursor-pointer"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize / Snap Button with Snap Layouts Hover Menu */}
          <div
            className="relative"
            onMouseEnter={() => {
              snapMenuTimeout.current = setTimeout(() => setShowSnapMenu(true), 250);
            }}
            onMouseLeave={() => {
              if (snapMenuTimeout.current) clearTimeout(snapMenuTimeout.current);
              setShowSnapMenu(false);
            }}
          >
            <button
              onClick={() => {
                if (win.isMaximized || win.snapState !== 'none') restoreWindow(win.id);
                else maximizeWindow(win.id);
              }}
              className="w-8 h-7 flex items-center justify-center rounded-lg hover:bg-[#2D333F] text-[#8F96A3] hover:text-[#ECEFF4] transition-all cursor-pointer"
              title={win.isMaximized ? 'Restore' : 'Maximize'}
            >
              {win.isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3.5 h-3.5" />}
            </button>

            {/* Windows 11 Snap Layouts Flyout Menu */}
            {showSnapMenu && (
              <div
                className="absolute right-0 top-8 w-48 p-2 rounded-xl bg-[#1E222A] border border-[#2D333F] shadow-2xl backdrop-blur-2xl z-[var(--z-context-menu)] animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-[10px] uppercase font-bold text-[#8F96A3] tracking-wider px-1">
                  Snap Layouts
                </span>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {/* Left / Right halves */}
                  <div className="flex gap-1 h-12 p-1 rounded-lg border border-[#2D333F] bg-[#14171D]">
                    <button
                      onClick={() => { snapWindow(win.id, 'left'); setShowSnapMenu(false); }}
                      className="flex-1 rounded bg-[#2D333F] hover:bg-[#E06C38] transition-colors"
                      title="Snap Left"
                    />
                    <button
                      onClick={() => { snapWindow(win.id, 'right'); setShowSnapMenu(false); }}
                      className="flex-1 rounded bg-[#2D333F] hover:bg-[#E06C38] transition-colors"
                      title="Snap Right"
                    />
                  </div>

                  {/* 4 Quadrants */}
                  <div className="grid grid-cols-2 gap-1 h-12 p-1 rounded-lg border border-[#2D333F] bg-[#14171D]">
                    <button
                      onClick={() => { snapWindow(win.id, 'top-left'); setShowSnapMenu(false); }}
                      className="rounded bg-[#2D333F] hover:bg-[#E06C38] transition-colors"
                      title="Top-Left"
                    />
                    <button
                      onClick={() => { snapWindow(win.id, 'top-right'); setShowSnapMenu(false); }}
                      className="rounded bg-[#2D333F] hover:bg-[#E06C38] transition-colors"
                      title="Top-Right"
                    />
                    <button
                      onClick={() => { snapWindow(win.id, 'bottom-left'); setShowSnapMenu(false); }}
                      className="rounded bg-[#2D333F] hover:bg-[#E06C38] transition-colors"
                      title="Bottom-Left"
                    />
                    <button
                      onClick={() => { snapWindow(win.id, 'bottom-right'); setShowSnapMenu(false); }}
                      className="rounded bg-[#2D333F] hover:bg-[#E06C38] transition-colors"
                      title="Bottom-Right"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => closeWindow(win.id)}
            className="w-8 h-7 flex items-center justify-center rounded-lg hover:bg-[#E05252] active:bg-[#C85728] text-[#8F96A3] hover:text-white transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body (Application Host) */}
      <div className="flex-1 overflow-hidden bg-[#1E222A] relative">
        {AppComponent ? (
          <AppComponent windowId={win.id} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-xs text-[#8F96A3] gap-1">
            <AppWindow className="w-8 h-8 opacity-40" />
            <span>Application "{win.appId}" not found.</span>
          </div>
        )}
      </div>

      {/* Resize handles (Active when not maximized) */}
      {!isMaximized && (
        <>
          <div onMouseDown={handleResizeMouseDown('n')} className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize" />
          <div onMouseDown={handleResizeMouseDown('s')} className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize" />
          <div onMouseDown={handleResizeMouseDown('w')} className="absolute top-0 bottom-0 left-0 w-1 cursor-ew-resize" />
          <div onMouseDown={handleResizeMouseDown('e')} className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize" />
          <div onMouseDown={handleResizeMouseDown('nw')} className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize" />
          <div onMouseDown={handleResizeMouseDown('ne')} className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize" />
          <div onMouseDown={handleResizeMouseDown('sw')} className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize" />
          <div onMouseDown={handleResizeMouseDown('se')} className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize" />
        </>
      )}
    </div>
  );
};
