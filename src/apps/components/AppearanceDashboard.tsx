import React, { useState } from 'react';
import {
  Palette,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { useTheme, ThemeType } from '../../design-system/ThemeProvider';
import { MotionProfile, MOTION_PROFILES } from '../../design-system/motionEngine';
import { useDesktop } from '../../core/desktopStore';
import { soundEngine } from '../../design-system/soundEngine';

interface ThemeInfo {
  id: ThemeType;
  name: string;
  category: 'dark' | 'light' | 'vibrant' | 'accessibility';
  desc: string;
  bgPreview: string;
  surfacePreview: string;
  accentPreview: string;
}

export const THEMES_CATALOG: ThemeInfo[] = [
  {
    id: 'midnight-aurora',
    name: 'Midnight Aurora (Default)',
    category: 'dark',
    desc: 'Deep charcoal slate with warm terracotta amber accents and subtle steel lines',
    bgPreview: '#14171D',
    surfacePreview: '#1E222A',
    accentPreview: '#E06C38',
  },
  {
    id: 'ocean-glass',
    name: 'Ocean Glass',
    category: 'vibrant',
    desc: 'Marine turquoise, deep sea-glass translucency, and sky cyan',
    bgPreview: '#04101c',
    surfacePreview: '#0a223a',
    accentPreview: '#06b6d4',
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    category: 'vibrant',
    desc: 'Warm amber, golden twilight, and charcoal mica surfaces',
    bgPreview: '#140d08',
    surfacePreview: '#2a180e',
    accentPreview: '#f59e0b',
  },
  {
    id: 'emerald-terminal',
    name: 'Emerald Terminal',
    category: 'vibrant',
    desc: 'Forest jade, mint accents, and dark graphite developer depth',
    bgPreview: '#06120d',
    surfacePreview: '#0e261b',
    accentPreview: '#10b981',
  },
  {
    id: 'rose-quartz',
    name: 'Rose Quartz',
    category: 'vibrant',
    desc: 'Rich berry, plum obsidian, and soft crimson highlights',
    bgPreview: '#180d14',
    surfacePreview: '#301826',
    accentPreview: '#f43f5e',
  },
  {
    id: 'arctic-light',
    name: 'Arctic Light',
    category: 'light',
    desc: 'Crisp platinum, ice blue hues, and subtle airy drop shadows',
    bgPreview: '#e2e8f0',
    surfacePreview: '#ffffff',
    accentPreview: '#0284c7',
  },
  {
    id: 'sunset-horizon',
    name: 'Sunset Horizon',
    category: 'vibrant',
    desc: 'Coral orange, magenta twilight, and deep dusk plum',
    bgPreview: '#160c18',
    surfacePreview: '#2e1634',
    accentPreview: '#f97316',
  },
  {
    id: 'cyber-spectrum',
    name: 'Cyber Spectrum',
    category: 'vibrant',
    desc: 'Electric neon cyan, synthwave violet, and jet black glass',
    bgPreview: '#050508',
    surfacePreview: '#12121e',
    accentPreview: '#06b6d4',
  },
  {
    id: 'sage-sand',
    name: 'Sage & Sand',
    category: 'dark',
    desc: 'Earthy moss, warm sand, and organic clay surfaces',
    bgPreview: '#101412',
    surfacePreview: '#1e2621',
    accentPreview: '#84cc16',
  },
  {
    id: 'monochrome-studio',
    name: 'Monochrome Studio',
    category: 'dark',
    desc: 'Distraction-free pure neutral grayscale with zinc highlights',
    bgPreview: '#121316',
    surfacePreview: '#202125',
    accentPreview: '#a1a1aa',
  },
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    category: 'dark',
    desc: 'Familiar royal sapphire blue with crisp contrast',
    bgPreview: '#0a1128',
    surfacePreview: '#12224a',
    accentPreview: '#3b82f6',
  },
  {
    id: 'warm-light',
    name: 'Warm Light',
    category: 'light',
    desc: 'Soft cream parchment, warm cocoa, and amber accents',
    bgPreview: '#f4efe6',
    surfacePreview: '#ffffff',
    accentPreview: '#d97706',
  },
  {
    id: 'deep-space',
    name: 'Deep Space',
    category: 'dark',
    desc: 'Pure OLED black void with cosmic indigo & starlight violet',
    bgPreview: '#000000',
    surfacePreview: '#10101c',
    accentPreview: '#818cf8',
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    category: 'accessibility',
    desc: 'WCAG AAA certified pure black/white boundaries with neon yellow focus',
    bgPreview: '#000000',
    surfacePreview: '#000000',
    accentPreview: '#ffff00',
  },
];

const CURATED_ACCENTS = [
  { name: 'Deep Terracotta (Primary)', hex: '#E06C38' },
  { name: 'Warm Amber Active', hex: '#F07D49' },
  { name: 'Terracotta Hover', hex: '#C85728' },
  { name: 'Forest Mint', hex: '#2D9C5E' },
  { name: 'Amber Gold', hex: '#D9822B' },
  { name: 'Crimson Danger', hex: '#E05252' },
  { name: 'Sky Cyan', hex: '#38bdf8' },
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Teal Aurora', hex: '#06b6d4' },
  { name: 'Rose Quartz', hex: '#f43f5e' },
  { name: 'Violet Nebula', hex: '#8b5cf6' },
  { name: 'Subtle Steel', hex: '#2D333F' },
];

const WALLPAPERS_LIST = [
  { name: 'Northern Aurora', path: '/wallpapers/aurora.jpg' },
  { name: 'Cyberpunk Neon', path: '/wallpapers/cyberpunk.jpg' },
  { name: 'Fluent Silk Glass', path: '/wallpapers/fluent_silk.jpg' },
  { name: 'Cosmic Nebula', path: '/wallpapers/cosmic_nebula.jpg' },
];

// Helper to calculate approximate luminance
function getLuminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g);
  if (!rgb) return 0.5;
  const [r, g, b] = rgb.map((c) => parseInt(c, 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export const AppearanceDashboard: React.FC = () => {
  const {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    motionProfile,
    setMotionProfile,
    wallpaperDimming,
    setWallpaperDimming,
    ambientEffects,
    setAmbientEffects,
  } = useTheme();

  const { currentWallpaper, setWallpaper, addNotification } = useDesktop();

  const [activeSection, setActiveSection] = useState<'themes' | 'accents' | 'wallpapers' | 'motion'>('themes');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'dark' | 'light' | 'vibrant' | 'accessibility'>('all');
  const [customColor, setCustomColor] = useState(accentColor);

  const filteredThemes = THEMES_CATALOG.filter(
    (t) => categoryFilter === 'all' || t.category === categoryFilter
  );

  // Contrast check against dark card surface
  const accentLum = getLuminance(accentColor);
  const isHighContrast = accentLum > 0.25;

  const handleApplyAccent = (hex: string) => {
    setAccentColor(hex);
    setCustomColor(hex);
    soundEngine.play('click');
    addNotification('Accent Updated', `Applied color ${hex}`, 'info', 'Theme');
  };

  const handleResetDefaults = () => {
    setTheme('midnight-aurora');
    setAccentColor('#E06C38');
    setCustomColor('#E06C38');
    setMotionProfile('balanced');
    setWallpaperDimming(0.2);
    setAmbientEffects(true);
    soundEngine.play('click');
    addNotification('Appearance Reset', 'Restored default MyOS design tokens.', 'info', 'Theme');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-6 text-white select-none pr-1">
      {/* Top Header Strip with Quick Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#2D333F]">
        <div>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2 text-[#ECEFF4]">
            <Palette className="w-5 h-5 text-[#E06C38]" />
            <span>Appearance &amp; Accessibility Studio</span>
          </h2>
          <p className="text-xs text-[#8F96A3] mt-0.5">
            14 thematic palettes, custom accent studio, wallpaper dimming &amp; central motion engine
          </p>
        </div>
        <button
          onClick={handleResetDefaults}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-[#1E222A] hover:bg-[#2D333F] border border-[#2D333F] text-[#ECEFF4] transition-colors cursor-pointer"
          title="Reset to default MyOS tokens"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#14171D] border border-[#2D333F] w-fit">
        <button
          onClick={() => setActiveSection('themes')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeSection === 'themes'
              ? 'bg-[#E06C38] text-white shadow-md'
              : 'text-[#8F96A3] hover:text-[#ECEFF4]'
          }`}
        >
          Theme Gallery (14)
        </button>
        <button
          onClick={() => setActiveSection('accents')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeSection === 'accents'
              ? 'bg-[#E06C38] text-white shadow-md'
              : 'text-[#8F96A3] hover:text-[#ECEFF4]'
          }`}
        >
          Accent Studio
        </button>
        <button
          onClick={() => setActiveSection('wallpapers')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            activeSection === 'wallpapers'
              ? 'bg-[#E06C38] text-white shadow-md'
              : 'text-[#8F96A3] hover:text-[#ECEFF4]'
          }`}
        >
          Wallpaper Studio
        </button>
        <button
          onClick={() => setActiveSection('motion')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
            activeSection === 'motion'
              ? 'bg-sky-500 text-white shadow-md'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Motion Engine
        </button>
      </div>

      {/* SECTION 1: THEME GALLERY */}
      {activeSection === 'themes' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 text-xs">
            {(['all', 'dark', 'light', 'vibrant', 'accessibility'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full border capitalize text-[11px] transition-all ${
                  categoryFilter === cat
                    ? 'bg-white/20 border-white/40 text-white font-semibold'
                    : 'bg-transparent border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Palettes' : cat}
              </button>
            ))}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-2 gap-3">
            {filteredThemes.map((t) => {
              const isSelected = theme === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    soundEngine.play('click');
                    addNotification('Theme Applied', `Switched to ${t.name}`, 'info', 'Appearance');
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-sky-400 bg-white/10 ring-2 ring-sky-400/40 shadow-xl'
                      : 'border-white/10 bg-black/30 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{t.name}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{t.desc}</p>
                    </div>
                  </div>

                  {/* Swatches Visual Preview */}
                  <div className="flex items-center gap-1.5 mt-2 p-1.5 rounded-xl bg-black/40 border border-white/5">
                    <div
                      className="w-5 h-5 rounded-lg border border-white/15"
                      style={{ backgroundColor: t.bgPreview }}
                      title="Background Canvas"
                    />
                    <div
                      className="w-5 h-5 rounded-lg border border-white/15"
                      style={{ backgroundColor: t.surfacePreview }}
                      title="Card Surface"
                    />
                    <div
                      className="w-5 h-5 rounded-lg border border-white/15 flex items-center justify-center text-[10px] text-black font-bold"
                      style={{ backgroundColor: t.accentPreview }}
                      title="Primary Accent"
                    >
                      A
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono ml-auto">
                      {t.accentPreview}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: ACCENT STUDIO */}
      {activeSection === 'accents' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Curated Swatches Grid */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
              Curated Accent Harmonies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
              {CURATED_ACCENTS.map((item) => {
                const isActive = accentColor.toLowerCase() === item.hex.toLowerCase();
                return (
                  <button
                    key={item.hex}
                    onClick={() => handleApplyAccent(item.hex)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition-all ${
                      isActive
                        ? 'border-white bg-white/15 ring-2 ring-white/50'
                        : 'border-white/10 bg-black/30 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 border border-white/20 shadow-sm"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-[11px] font-medium truncate">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color Picker + Contrast Evaluation */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Custom Hex / Color Input
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  setAccentColor(e.target.value);
                }}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    setAccentColor(e.target.value);
                  }
                }}
                placeholder="#38bdf8"
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
              {/* Contrast Indicator */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                  isHighContrast
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}
              >
                {isHighContrast ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>WCAG 2.2 AA (Pass ≥ 4.5:1)</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Low Contrast Alert</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview Strip */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Live Component Preview
            </h3>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-transform active:scale-95"
                style={{ backgroundColor: accentColor }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Outline Action
              </button>
              <div
                className="px-3 py-1.5 rounded-xl text-xs border focus:ring-2"
                style={{ borderColor: accentColor }}
              >
                Focus Ring Active
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: WALLPAPER STUDIO */}
      {activeSection === 'wallpapers' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Wallpapers Grid */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
              Curated 4K Wallpapers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {WALLPAPERS_LIST.map((wp) => {
                const isActive = currentWallpaper === wp.path;
                return (
                  <div
                    key={wp.path}
                    onClick={() => {
                      setWallpaper(wp.path);
                      soundEngine.play('click');
                      addNotification('Wallpaper Applied', `Active background: ${wp.name}`, 'info', 'Personalization');
                    }}
                    className={`relative rounded-2xl overflow-hidden border cursor-pointer group transition-all h-28 ${
                      isActive
                        ? 'border-sky-400 ring-2 ring-sky-400/50 shadow-xl'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={wp.path}
                      alt={wp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2.5">
                      <span className="text-xs font-bold text-white drop-shadow-md">
                        {wp.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wallpaper Readability Dimming Slider */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-300">Readability Dimming Scrim</span>
              <span className="font-mono text-sky-400">{Math.round(wallpaperDimming * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.6"
              step="0.05"
              value={wallpaperDimming}
              onChange={(e) => setWallpaperDimming(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <p className="text-[11px] text-zinc-500">
              Darkens wallpaper to ensure comfortable WCAG text contrast for desktop widgets and icons.
            </p>
          </div>

          {/* Ambient Effects Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/10">
            <div>
              <span className="text-xs font-semibold text-zinc-200 block">Ambient Aurora Drift</span>
              <span className="text-[11px] text-zinc-500">
                Gentle hardware-composited canvas aurora shimmer behind windows
              </span>
            </div>
            <button
              onClick={() => setAmbientEffects(!ambientEffects)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                ambientEffects ? 'bg-sky-500' : 'bg-zinc-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  ambientEffects ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 4: MOTION ENGINE */}
      {activeSection === 'motion' && (
        <div className="space-y-4 animate-fadeIn">
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Select Motion Profile
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { id: 'balanced', name: 'Balanced (Default)', desc: 'Restrained, fluid 60 FPS transitions across all shell controls' },
                { id: 'expressive', name: 'Expressive', desc: 'Richer spring dynamics and accent glows for creative tasks' },
                { id: 'cinematic', name: 'Cinematic', desc: 'Extended easing curves and atmospheric workspace reveals' },
                { id: 'minimal', name: 'Minimal', desc: 'Quick 80–120ms fades with minimal spatial travel' },
                { id: 'performance_saver', name: 'Performance Saver', desc: 'Disables parallax, ambient loops, and non-essential blurs' },
                { id: 'off', name: 'Off / Reduced Motion', desc: 'Instantaneous UI feedback complying with accessibility needs' },
              ] as const
            ).map((p) => {
              const isSelected = motionProfile === p.id;
              const config = MOTION_PROFILES[p.id as MotionProfile];
              return (
                <div
                  key={p.id}
                  onClick={() => setMotionProfile(p.id as MotionProfile)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-sky-400 bg-white/10 ring-2 ring-sky-400/40 shadow-xl'
                      : 'border-white/10 bg-black/30 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{p.name}</span>
                    <span className="text-[10px] font-mono text-sky-400">
                      {config.durationStandard}ms
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
