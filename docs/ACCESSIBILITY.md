# Accessibility Specification (WCAG 2.1 AA Compliance)

## 1. Core Commitments
1. **Full Keyboard Operability**: Every interactive element is accessible and functional without a mouse.
2. **Visual Focus Indicators**: Visible, high-contrast focus rings (`outline: 2px solid var(--border-focus)`) on all active controls.
3. **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text and UI boundaries.
4. **Reduced Motion**: Respects `prefers-reduced-motion` and software toggle in Settings.
5. **No Color-Only Cues**: Errors, warnings, and states are accompanied by distinct text or iconography.
6. **Screen Reader Semantic Tree**: Appropriate ARIA roles (`role="dialog"`, `role="toolbar"`, `role="menu"`), accessible labels (`aria-label`), and live status regions (`aria-live="polite"`).

---

## 2. Global Keyboard Navigation Map

| Shortcut | Context | Action |
| :--- | :--- | :--- |
| `Super` / `Win` | Desktop Shell | Toggle Start Menu |
| `Alt + K` or `Ctrl + Space` | Universal | Open Command Palette & Universal Search |
| `Alt + Tab` | Window Manager | Switch focus between running windows |
| `Alt + F4` | Window Manager | Close active window |
| `Win + Left / Right` | Window Manager | Snap active window to left / right half |
| `Win + Up` | Window Manager | Maximize active window |
| `Win + Down` | Window Manager | Restore or minimize active window |
| `Ctrl + Alt + Left / Right`| Workspaces | Switch to previous / next virtual workspace |
| `Win + Tab` | Workspaces | Open Workspace Overview Switcher |
| `Win + D` | Desktop | Show / Hide desktop (minimize all windows) |
| `Win + L` | Session | Lock workspace session |
| `Escape` | Modals / Menus | Dismiss active popup, context menu, or search |

---

## 3. High Contrast & Font Scaling
- Supports font scaling from 80% to 150% without broken layout boundaries or horizontal overflow.
- High Contrast theme replaces transparent blurs with high-contrast opaque borders and clear geometric separation.
