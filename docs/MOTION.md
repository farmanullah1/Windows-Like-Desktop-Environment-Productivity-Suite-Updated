# Motion & Animation System Specification

## 1. Principles
The motion language combines the responsive snap of Windows 11 Fluent motions with the organic spring curves of macOS and the predictable efficiency of Ubuntu:
1. **Purpose-Driven**: Motion clarifies spatial relationships (where a window minimized to, which workspace is active).
2. **Hardware-Accelerated**: Only GPU-composited properties (`transform`, `opacity`, `filter`) are animated.
3. **Interruptible**: Animations immediately yield to direct user gestures without hitching or queuing.
4. **Accessible**: Fully respects `prefers-reduced-motion` and user-toggled Performance Mode.

---

## 2. Animation Tokens

| Token | Duration | Cubic Bézier / Spring Curve | Use Case |
| :--- | :--- | :--- | :--- |
| `--motion-micro` | 100ms | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | Button click, toggle switch, hover glow |
| `--motion-normal` | 200ms | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | Tooltip, context menu open, tab transition |
| `--motion-panel` | 280ms | `cubic-bezier(0.16, 1.0, 0.3, 1.0)` | Start menu, Quick Settings, Action Center slide |
| `--motion-window` | 320ms | `cubic-bezier(0.1, 0.9, 0.2, 1.0)` | Window open, close, restore, snap preview |
| `--motion-minimize`| 280ms | `cubic-bezier(0.4, 0.0, 0.2, 1.0)` | Minimize translation towards taskbar / dock icon |
| `--motion-workspace`| 420ms | `cubic-bezier(0.2, 0.8, 0.2, 1.0)` | Virtual desktop slide & parallax depth shift |

---

## 3. High-Fidelity Micro-Interactions

### 3.1 Window Open & Close
- **Open**: Initial state `scale(0.94)`, `opacity(0)`, `translateY(12px)`. Transitions to `scale(1.0)`, `opacity(1)`, `translateY(0)` with a subtle acrylic focus glow.
- **Close**: Quick fade-out `scale(0.96)`, `opacity(0)` in 180ms.

### 3.2 Minimize & Restore
- **Minimize**: Window smoothly interpolates towards the corresponding taskbar/dock icon position while reducing scale and opacity.
- **Restore**: Reverse trajectory from taskbar icon directly into previous window bounds.

### 3.3 Snap & Tile Preview
- When dragging a window near the screen edge, a glowing translucent preview bounding box animates into view over 150ms showing the target snapped rectangle.

### 3.4 Dock Icon Magnification
- In macOS Dock mode, icons smoothly scale by up to 1.25x based on cursor proximity using a Gaussian distribution falloff.

### 3.5 Reduced Motion Mode
When `prefers-reduced-motion: reduce` is detected or user sets Reduced Motion in Settings:
- All spatial translations and zooms are replaced with instant or simple 80ms opacity cross-fades.
- Background animations and parallax are completely stopped.
