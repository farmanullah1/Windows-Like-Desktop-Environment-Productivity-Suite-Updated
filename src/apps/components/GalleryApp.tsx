import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Check,
  ZoomIn,
  ZoomOut,
  Palette,
} from 'lucide-react';
import { useDesktop } from '../../core/desktopStore';
import { soundEngine } from '../../design-system/soundEngine';

interface WallpaperItem {
  id: string;
  title: string;
  category: 'Landscapes' | 'Cyberpunk' | 'Abstract' | 'Space';
  url: string;
  description: string;
  resolution: string;
  colorPalette: string[];
}

const WALLPAPERS: WallpaperItem[] = [
  {
    id: 'wp-aurora',
    title: 'Nordic Aurora Lake',
    category: 'Landscapes',
    url: '/wallpapers/aurora.jpg',
    description: 'Emerald and violet auroras reflecting over an Arctic alpine lake with snow-dusted peaks.',
    resolution: '3840 × 2160 (4K UHD)',
    colorPalette: ['#10b981', '#6366f1', '#0f172a', '#e2e8f0'],
  },
  {
    id: 'wp-cyberpunk',
    title: 'Neon Cyberpunk Metropolis',
    category: 'Cyberpunk',
    url: '/wallpapers/cyberpunk.jpg',
    description: 'Futuristic night skyline with rain-slicked sky-bridges, flying transit, and cyan neon glow.',
    resolution: '3840 × 2160 (4K UHD)',
    colorPalette: ['#ec4899', '#06b6d4', '#1e1b4b', '#f43f5e'],
  },
  {
    id: 'wp-fluent-silk',
    title: 'Fluent Iridescent Silk',
    category: 'Abstract',
    url: '/wallpapers/fluent_silk.jpg',
    description: 'Windows 11 & macOS inspired fluid silk ribbons in deep sapphire, violet, and periwinkle.',
    resolution: '3840 × 2160 (4K UHD)',
    colorPalette: ['#3b82f6', '#8b5cf6', '#1e293b', '#c084fc'],
  },
  {
    id: 'wp-cosmic',
    title: 'Cosmic Nebula Starscape',
    category: 'Space',
    url: '/wallpapers/cosmic_nebula.jpg',
    description: 'Luminous swirling clouds of interstellar cyan and magenta dust with distant spiral galaxy.',
    resolution: '3840 × 2160 (4K UHD)',
    colorPalette: ['#06b6d4', '#d946ef', '#030712', '#38bdf8'],
  },
];

export const GalleryApp: React.FC<{ windowId: string }> = () => {
  const { currentWallpaper, setWallpaper, addNotification } = useDesktop();
  const [selectedId, setSelectedId] = useState<string>(WALLPAPERS[0].id);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const selectedWallpaper = WALLPAPERS.find((w) => w.id === selectedId) || WALLPAPERS[0];
  const isApplied = currentWallpaper === selectedWallpaper.url;

  const categories = ['All', 'Landscapes', 'Cyberpunk', 'Abstract', 'Space'];

  const filteredWallpapers = WALLPAPERS.filter(
    (w) => categoryFilter === 'All' || w.category === categoryFilter
  );

  const handleApplyWallpaper = () => {
    soundEngine.play('click');
    setWallpaper(selectedWallpaper.url);
    addNotification(
      'Wallpaper Changed',
      `Applied "${selectedWallpaper.title}" to active desktop canvas.`,
      'success',
      'Personalization'
    );
  };

  return (
    <div className="flex h-full w-full bg-[var(--bg-surface)] text-[var(--text-primary)] select-none text-xs">
      {/* Left Sidebar / Gallery Grid */}
      <div className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex flex-col">
        {/* Header & Filter */}
        <div className="p-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-2">
            <ImageIcon className="w-4 h-4 text-[var(--color-accent)]" />
            <h2 className="font-semibold text-xs">Photo & Wallpaper Studio</h2>
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-0.5 rounded text-[10px] transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-[var(--color-accent)] text-white font-medium'
                    : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {filteredWallpapers.map((item) => {
            const isCurrent = currentWallpaper === item.url;
            const isSelected = selectedId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setZoomLevel(1);
                  soundEngine.play('click');
                }}
                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30'
                    : 'border-[var(--border-subtle)] hover:border-[var(--color-accent)]/50'
                }`}
              >
                <div className="h-28 w-full overflow-hidden bg-black/40">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2 bg-[var(--bg-surface-elevated)] flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-[11px] truncate">{item.title}</h3>
                    <span className="text-[10px] text-[var(--text-secondary)]">{item.category}</span>
                  </div>
                  {isCurrent && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-medium flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 flex flex-col bg-black/40">
        {/* Preview Toolbar */}
        <div className="p-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs">{selectedWallpaper.title}</span>
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">
              {selectedWallpaper.resolution}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[var(--bg-hover)]">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.25))}
                className="p-1 hover:text-[var(--color-accent)] rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="p-1 hover:text-[var(--color-accent)] rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Set as Wallpaper Button */}
            <button
              onClick={handleApplyWallpaper}
              disabled={isApplied}
              className={`px-3 py-1.5 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                isApplied
                  ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 cursor-default'
                  : 'bg-[var(--color-accent)] hover:opacity-90 text-white active:scale-95'
              }`}
            >
              {isApplied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Active Wallpaper
                </>
              ) : (
                <>
                  <Palette className="w-3.5 h-3.5" /> Set as Wallpaper
                </>
              )}
            </button>
          </div>
        </div>

        {/* Viewport with Zoom & Pan */}
        <div className="flex-1 overflow-hidden relative flex items-center justify-center p-6 bg-gradient-to-br from-black/60 to-black/90">
          <div
            className="transition-transform duration-200 ease-out shadow-2xl rounded-2xl overflow-hidden max-w-full max-h-full border border-white/10"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={selectedWallpaper.url}
              alt={selectedWallpaper.title}
              className="max-h-[380px] w-auto object-contain rounded-2xl select-none"
            />
          </div>
        </div>

        {/* Footer Metadata Strip */}
        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
          <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 max-w-md">
            {selectedWallpaper.description}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[var(--text-secondary)] font-mono">Palette:</span>
            <div className="flex items-center gap-1">
              {selectedWallpaper.colorPalette.map((color, i) => (
                <div
                  key={i}
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryApp;
