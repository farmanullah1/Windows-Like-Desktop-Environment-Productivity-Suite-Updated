import React from 'react';
import { useDesktop } from '../core/desktopStore';
import { WindowFrame } from './WindowFrame';

export const WindowManager: React.FC = () => {
  const { windows, activeWorkspaceId } = useDesktop();

  // Render windows on current workspace
  const workspaceWindows = windows.filter((w) => w.workspaceId === activeWorkspaceId);

  return (
    <div className="absolute inset-0 pointer-events-none z-[var(--z-windows-base)]">
      {workspaceWindows.map((win) => (
        <div key={win.id} className="pointer-events-auto">
          <WindowFrame window={win} />
        </div>
      ))}
    </div>
  );
};
