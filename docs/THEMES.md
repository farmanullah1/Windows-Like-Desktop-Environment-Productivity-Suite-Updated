# Theme System & Visual Styling Specification

## 1. Visual Token Structure
The desktop interface is built strictly on centralized CSS Custom Properties located in `:root` and theme data attributes (`data-theme="dark"`, `data-theme="light"`, etc.):

```css
:root {
  /* Surfaces */
  --bg-desktop: #0c1017;
  --surface-base: rgba(18, 24, 38, 0.75);
  --surface-card: rgba(26, 34, 52, 0.85);
  --surface-elevated: rgba(33, 44, 68, 0.95);
  --surface-translucent: rgba(20, 28, 45, 0.65);
  --surface-acrylic: rgba(15, 22, 36, 0.72);
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-focus: #0078d4;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Ubuntu", "Helvetica Neue", sans-serif;
  --font-mono: "Cascadia Code", "Fira Code", Consolas, Menlo, Monaco, monospace;
  --text-primary: #f0f4f8;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-disabled: #475569;

  /* Brand & Accents */
  --accent-primary: #0078d4;
  --accent-secondary: #3b82f6;
  --accent-glow: rgba(0, 120, 212, 0.35);
  --status-success: #10b981;
  --status-warning: #f59e0b;
  --status-error: #ef4444;
  --status-info: #06b6d4;

  /* Geometry & Elevation */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 22px;
  --radius-full: 9999px;

  --shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.45);
  --shadow-window: 0 20px 60px rgba(0, 0, 0, 0.55);

  --backdrop-blur: blur(20px);
}
```

---

## 2. Supported Themes
1. **Dark (Default)**: Deep obsidian blues (`#0c1017`) with Fluent acrylic translucency and vibrant blue accents.
2. **Light**: Crisp platinum surfaces (`#f8fafc`) with subtle drop shadows and slate text.
3. **Midnight**: Pure black OLED contrast (`#000000`) with electric violet and cyan accents.
4. **Graphite**: Minimalist monochrome aesthetic inspired by professional Linux developer workstations.
5. **Aurora**: Atmospheric northern lights gradient glow with dynamic teal and purple ambient lighting.
6. **Ocean**: Deep navy tones inspired by macOS Monterey marine aesthetics.
7. **Ubuntu-Dark**: Rich aubergine and warm dark tones (`#2c001e` accents, `#1e1e1e` base).
8. **High Contrast**: WCAG AAA compliant pure high-contrast mode with solid borders and maximum legibility.

---

## 3. Dynamic Accent Lighting & Visual Performance Modes
- **Balanced (Default)**: Acrylic translucency with `backdrop-filter: blur(20px)`, window drop shadows, and subtle focus glows.
- **Enhanced**: Adds dynamic ambient lighting behind active windows and animated desktop wallpaper gradients.
- **Immersive**: Full glass reflections, subtle particle micro-animations, and wallpaper-derived adaptive accent theming.
- **Minimal / Performance Mode**: Disables all `backdrop-filter` blurs, particle layers, and expensive shadows. Uses solid opaque surface colors to guarantee 60-120 FPS on all hardware.
