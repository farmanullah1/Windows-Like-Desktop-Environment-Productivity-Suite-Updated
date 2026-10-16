# MyOS Color System & Theme Gallery Specification (v9.0)

## 1. Overview
The MyOS Version 9.0 design architecture establishes a centralized, semantic token foundation for color, elevation, and gradients. Components consume semantic custom properties rather than hardcoded hex codes.

---

## 2. The 14 Semantic Palettes

| # | Theme Palette | Category | Canvas / Base | Dominant Accent | Semantic Intention |
|---|---------------|----------|---------------|-----------------|-------------------|
| 1 | **Midnight Aurora (Default)** | Dark | `#07090e` | `#38bdf8` (Cyan/Sky) | Deep obsidian navy with glowing cyan & teal polar borealis |
| 2 | **Ocean Glass** | Vibrant | `#04101c` | `#06b6d4` (Turquoise) | Marine turquoise, sea-glass translucency, and sky cyan |
| 3 | **Solar Flare** | Vibrant | `#140d08` | `#f59e0b` (Amber) | Warm amber, golden twilight, and charcoal mica surfaces |
| 4 | **Emerald Terminal** | Vibrant | `#06120d` | `#10b981` (Jade Mint) | Forest jade, mint accents, and dark graphite developer workstation |
| 5 | **Rose Quartz** | Vibrant | `#180d14` | `#f43f5e` (Rose Berry) | Rich berry, plum obsidian, and soft crimson highlights |
| 6 | **Arctic Light** | Light | `#f5f8fc` | `#0284c7` (Cobalt) | Crisp glacial ice blue, platinum cards, and silver borders |
| 7 | **Sunset Horizon** | Vibrant | `#170b12` | `#f97316` (Coral Orange) | Coral, sunset orange, twilight magenta, and dusk violet |
| 8 | **Cyber Spectrum** | Vibrant | `#080512` | `#d946ef` (Electric Fuchsia) | Electric cyan, neon magenta, and deep synthwave violet |
| 9 | **Sage & Sand** | Dark/Warm | `#0f130f` | `#84cc16` (Warm Sage) | Organic sage, clay neutrals, and warm paper textures |
| 10 | **Monochrome Studio** | Minimal | `#09090b` | `#e4e4e7` (Silver Slate) | Pure grayscale with razor-sharp borders and minimal eye fatigue |
| 11 | **Classic Blue** | Balanced | `#0a1120` | `#2563eb` (Royal Blue) | Traditional Windows/macOS blue with contemporary depth |
| 12 | **Warm Light** | Light | `#faf7f2` | `#d97706` (Amber Ochre) | Cream canvas, soft cocoa typography, and warm amber accents |
| 13 | **Deep Space** | Dark | `#05050d` | `#818cf8` (Indigo Stellar) | Near-black void with stellar indigo and ultraviolet accents |
| 14 | **High Contrast** | Accessibility | `#000000` | `#eab308` (Yellow Gold) | WCAG AAA compliant max-contrast mode with solid borders and zero blur |

---

## 3. Reusable Gradient Tokens
Registered directly in `:root` and consumable via CSS:
- `--gradient-aurora`: `linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #8b5cf6 100%)`
- `--gradient-ocean`: `linear-gradient(135deg, #0284c7 0%, #06b6d4 50%, #3b82f6 100%)`
- `--gradient-sunset`: `linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%)`
- `--gradient-solar`: `linear-gradient(135deg, #eab308 0%, #f97316 50%, #ef4444 100%)`
- `--gradient-emerald`: `linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%)`
- `--gradient-spectrum`: `linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #38bdf8 100%)`
- `--gradient-glass`: Translucent diagonal glass refraction layer
- `--gradient-edge-light`: Active window accent glow strip applied at the top edge of focused windows
- `--gradient-focus-progress`: Interactive progress bars and slider tracks
- `--gradient-selection`: Highlighting selected text and active grid cells

---

## 4. Accent Studio & WCAG 2.2 AA Contrast Assurance
The Appearance Dashboard includes an integrated Accent Studio:
1. **Curated Swatches**: 10 harmonious hues (Sky Blue, Aurora Teal, Emerald, Amber Gold, Sunset Orange, Coral Red, Rose Berry, Electric Violet, Cyber Fuchsia, Graphite).
2. **Custom Hex Input**: Native HTML color input and validated 6-digit hex text input with real-time application.
3. **WCAG 2.2 AA Live Verification**: Computes relative luminance ($Y = 0.2126R + 0.7152G + 0.0722B$) in real time against the canvas, alerting users if contrast is below the 4.5:1 recommended ratio.
4. **Live Component Preview**: Renders primary button, outline button, and focus ring simultaneously to evaluate optical balance before confirmation.

---

## 5. Wallpaper Studio & Depth Controls
- **Wallpaper Readability Dimming**: Dynamic slider allowing 0% to 60% opacity black scrim over desktop wallpapers to ensure icon labels and widgets maintain high contrast.
- **Ambient Aurora Drift**: Opt-in subtle background aurora pulse for immersive depth.
- **Active Window Edge Lighting**: Focused windows render an edge light strip (`--gradient-edge-light`) across their top border to clearly demarcate the active focus context.
