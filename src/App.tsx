import React, { useState } from 'react';
import { ThemeProvider } from './design-system/ThemeProvider';
import { DesktopProvider } from './core/desktopStore';
import { DesktopCanvas } from './shell/DesktopCanvas';
import { WindowManager } from './window-manager/WindowManager';
import { Taskbar } from './shell/Taskbar';
import { StartMenu } from './shell/StartMenu';
import { QuickSettings } from './shell/QuickSettings';
import { NotificationCenter } from './shell/NotificationCenter';
import { CommandPalette } from './shell/CommandPalette';
import { LockScreen } from './shell/LockScreen';
import { BootSequence } from './boot/BootSequence';
import { LoginScreen } from './auth/LoginScreen';
import { soundEngine } from './design-system/soundEngine';
import { motion, AnimatePresence } from 'motion/react';
import './design-system/tokens.css';
import './design-system/themes.css';

export const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleBootComplete = () => {
    setBootComplete(true);
  };

  const handleLoginSuccess = (user?: { id: string; email: string; displayName: string }) => {
    if (user) {
      try {
        localStorage.setItem('adw_current_user', JSON.stringify(user));
      } catch {
        // safe localStorage fallback
      }
    }
    soundEngine.play('welcome_chime');
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <DesktopProvider>
        {/* Layer 0: Boot Sequence (Runs exclusively on cold start; instant on F5/HMR) */}
        {!bootComplete && (
          <BootSequence onComplete={handleBootComplete} />
        )}

        {/* Layer 1: Integrated Authentication Login Screen with Corner Account Creation */}
        <AnimatePresence mode="wait">
          {bootComplete && !isAuthenticated && (
            <motion.div
              key="auth-layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="fixed inset-0 z-[99999]"
            >
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2: Main Desktop Environment Shell */}
        {bootComplete && isAuthenticated && (
          <motion.div
            key="desktop-workspace"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-screen h-screen overflow-hidden select-none bg-[var(--bg-desktop)] text-[var(--text-primary)] font-sans"
          >
            {/* Layer 1: Desktop Canvas with Wallpapers & Icons */}
            <DesktopCanvas />

            {/* Layer 2: Window Manager Engine (Active Workspace Windows) */}
            <WindowManager />

            {/* Layer 3: Desktop Shell Overlays */}
            <StartMenu />
            <QuickSettings />
            <NotificationCenter />
            <CommandPalette />

            {/* Layer 4: Hybrid Taskbar / Dock */}
            <Taskbar />

            {/* Layer 5: Session Lock Screen */}
            <LockScreen />
          </motion.div>
        )}
      </DesktopProvider>
    </ThemeProvider>
  );
};

export default App;
