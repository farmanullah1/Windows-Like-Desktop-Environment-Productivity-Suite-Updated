import React, { createContext, useContext, useEffect, useState } from 'react';
import { soundEngine } from './soundEngine';
import {
  MotionProfile,
  getMotionConfig,
  applyMotionToDocument,
} from './motionEngine';

export type ThemeType =
  | 'midnight-aurora'
  | 'ocean-glass'
  | 'solar-flare'
  | 'emerald-terminal'
  | 'rose-quartz'
  | 'arctic-light'
  | 'sunset-horizon'
  | 'cyber-spectrum'
  | 'sage-sand'
  | 'monochrome-studio'
  | 'classic-blue'
  | 'warm-light'
  | 'deep-space'
  | 'high-contrast'
  // Legacy Aliases
  | 'dark'
  | 'light'
  | 'midnight'
  | 'graphite'
  | 'aurora'
  | 'ocean'
  | 'ubuntu-dark';

export type EffectsModeType = 'minimal' | 'balanced' | 'enhanced' | 'immersive';
export type ShellModeType = 'hybrid' | 'windows' | 'macos' | 'developer';

export interface ThemeContextValue {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  effectsMode: EffectsModeType;
  setEffectsMode: (mode: EffectsModeType) => void;
  shellMode: ShellModeType;
  setShellMode: (mode: ShellModeType) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  motionProfile: MotionProfile;
  setMotionProfile: (profile: MotionProfile) => void;
  wallpaperDimming: number;
  setWallpaperDimming: (dim: number) => void;
  ambientEffects: boolean;
  setAmbientEffects: (enabled: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  soundVolume: number;
  setSoundVolume: (volume: number) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    return (localStorage.getItem('myos_theme') as ThemeType) ||
           (localStorage.getItem('adw_theme') as ThemeType) ||
           'midnight-aurora';
  });

  const [effectsMode, setEffectsModeState] = useState<EffectsModeType>(() => {
    return (localStorage.getItem('myos_effects') as EffectsModeType) || 'balanced';
  });

  const [shellMode, setShellModeState] = useState<ShellModeType>(() => {
    return (localStorage.getItem('myos_shell_mode') as ShellModeType) || 'hybrid';
  });

  const [accentColor, setAccentColorState] = useState<string>(() => {
    const saved = localStorage.getItem('myos_accent_color');
    if (saved && saved !== '#38bdf8') return saved;
    return '#E06C38';
  });

  const [motionProfile, setMotionProfileState] = useState<MotionProfile>(() => {
    return (localStorage.getItem('myos_motion_profile') as MotionProfile) || 'balanced';
  });

  const [wallpaperDimming, setWallpaperDimmingState] = useState<number>(() => {
    const saved = localStorage.getItem('myos_wallpaper_dimming');
    return saved !== null ? parseFloat(saved) : 0.2;
  });

  const [ambientEffects, setAmbientEffectsState] = useState<boolean>(() => {
    const saved = localStorage.getItem('myos_ambient_effects');
    return saved !== null ? saved === 'true' : true;
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    const saved = localStorage.getItem('myos_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const [soundVolume, setSoundVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('myos_sound_volume');
    return saved !== null ? parseFloat(saved) : 0.6;
  });

  const [reducedMotion, setReducedMotionState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Apply theme attributes to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('myos_theme', theme);
  }, [theme]);

  // Apply effects mode
  useEffect(() => {
    document.documentElement.setAttribute('data-effects', effectsMode);
    localStorage.setItem('myos_effects', effectsMode);
  }, [effectsMode]);

  // Apply motion profile & tokens
  useEffect(() => {
    const config = getMotionConfig(motionProfile, reducedMotion);
    applyMotionToDocument(config);
    localStorage.setItem('myos_motion_profile', motionProfile);
  }, [motionProfile, reducedMotion]);

  // Apply wallpaper dimming & ambient effects
  useEffect(() => {
    document.documentElement.style.setProperty('--wallpaper-dimming', String(wallpaperDimming));
    document.documentElement.setAttribute('data-ambient-effects', String(ambientEffects));
    localStorage.setItem('myos_wallpaper_dimming', String(wallpaperDimming));
    localStorage.setItem('myos_ambient_effects', String(ambientEffects));
  }, [wallpaperDimming, ambientEffects]);

  // Apply accent color override if customized
  useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty('--accent-primary', accentColor);
      document.documentElement.style.setProperty(
        '--accent-glow',
        `${accentColor}55`
      );
      document.documentElement.style.setProperty(
        '--accent-subtle',
        `${accentColor}26`
      );
      if (accentColor.toLowerCase() === '#e06c38') {
        document.documentElement.style.setProperty('--accent-hover', '#C85728');
        document.documentElement.style.setProperty('--accent-active', '#F07D49');
      }
      localStorage.setItem('myos_accent_color', accentColor);
    }
  }, [accentColor]);

  // Sound sync
  useEffect(() => {
    soundEngine.setMuted(!soundEnabled);
    localStorage.setItem('myos_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    soundEngine.setMasterVolume(soundVolume);
    localStorage.setItem('myos_sound_volume', String(soundVolume));
  }, [soundVolume]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    soundEngine.play('click');
  };

  const setEffectsMode = (mode: EffectsModeType) => {
    setEffectsModeState(mode);
    soundEngine.play('click');
  };

  const setShellMode = (mode: ShellModeType) => {
    setShellModeState(mode);
    localStorage.setItem('myos_shell_mode', mode);
    soundEngine.play('click');
  };

  const setAccentColor = (color: string) => {
    setAccentColorState(color);
  };

  const setMotionProfile = (profile: MotionProfile) => {
    setMotionProfileState(profile);
    soundEngine.play('click');
  };

  const setWallpaperDimming = (dim: number) => {
    setWallpaperDimmingState(dim);
  };

  const setAmbientEffects = (enabled: boolean) => {
    setAmbientEffectsState(enabled);
    soundEngine.play('click');
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
  };

  const setSoundVolume = (volume: number) => {
    setSoundVolumeState(volume);
  };

  const setReducedMotion = (reduced: boolean) => {
    setReducedMotionState(reduced);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        effectsMode,
        setEffectsMode,
        shellMode,
        setShellMode,
        accentColor,
        setAccentColor,
        motionProfile,
        setMotionProfile,
        wallpaperDimming,
        setWallpaperDimming,
        ambientEffects,
        setAmbientEffects,
        soundEnabled,
        setSoundEnabled,
        soundVolume,
        setSoundVolume,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
