# MyOS Central Motion Engine Specification (v9.0)

## 1. Core Architecture
The MyOS Version 9.0 Central Motion Engine is implemented in `src/design-system/motionEngine.ts` and managed globally by `ThemeProvider.tsx`. Every transition across the desktop shell, window manager, taskbar, start menu, and productivity apps derives duration, easing, and loop parameters from the active profile.

---

## 2. Motion Profiles

| Profile ID | Display Name | Standard Duration | Character & Use Case | Loop / Parallax Status |
|---|---|---|---|---|
| `balanced` | **Balanced (Default)** | 200ms | Restrained, fluid 60 FPS transitions across shell controls | Ambient loops enabled; blurs optimized |
| `expressive` | **Expressive** | 240ms | Richer spring dynamics and accent glows for creative tasks | Ambient loops & spring overshoots enabled |
| `cinematic` | **Cinematic** | 320ms | Extended easing curves and atmospheric workspace reveals | High-depth ambient & parallax enabled |
| `minimal` | **Minimal** | 120ms | Snappy fades with minimal spatial travel | Parallax disabled; loops disabled |
| `performance_saver` | **Performance Saver** | 120ms | Maximizes frame rate on battery or low-power hardware | Disables parallax, particles, blurs, and ambient loops |
| `off` | **Off / Reduced Motion** | 0ms | Instant feedback honoring accessibility (`prefers-reduced-motion`) | Zero spatial travel; linear opacity only |

---

## 3. Motion Timing Tokens

| Token | Timing Range | Usage |
|---|---|---|
| **Instant** | 0–80ms | Checkbox marks, button presses, radio selections |
| **Fast** | 100–160ms | Tooltip displays, context menus, hover states |
| **Standard** | 160–240ms | Tab navigation, modal dialogs, window minimize/restore |
| **Emphasis** | 240–360ms | Window creation/close, notification toast entrance |
| **Cinematic** | 360–650ms | Workspace transitions, desktop environment reveal |
| **Stagger** | 20–45ms | App catalog grid items, search results stagger |

---

## 4. Easing Curves
- **Standard**: `cubic-bezier(0.2, 0.0, 0.0, 1.0)` — responsive deceleration without lingering
- **Decelerate**: `cubic-bezier(0.0, 0.0, 0.2, 1.0)` — entrances from outside the screen
- **Accelerate**: `cubic-bezier(0.4, 0.0, 1.0, 1.0)` — dismissals and exits
- **Spring**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)` — lively overshoot for buttons and badges (Expressive profile)

---

## 5. CSS Injection & Document Binding
`applyMotionToDocument(profile, rootElement)` injects CSS custom properties directly onto `:root`:
- `--motion-instant`
- `--motion-fast`
- `--motion-standard`
- `--motion-emphasis`
- `--motion-cinematic`
- `--motion-stagger`
- `--ease-standard`, `--ease-decelerate`, `--ease-accelerate`, `--ease-spring`

All CSS transition definitions reference these tokens, guaranteeing that changing the motion profile in Settings instantly scales all UI transitions system-wide without DOM recalculations.
