# Master Capability Matrix

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Truth in Engineering & Production Capability Model (Sections 0, 4, 19, 21)

---

## 1. Truth in Engineering Classification Model

To preserve product integrity and prevent misrepresentation, every subsystem and application in the suite is assigned an unambiguous classification:

| Classification | Definition |
| :--- | :--- |
| **REAL** | Fully implemented, genuine application functionality running directly within the client/server runtime. |
| **WINDOWS-INTEGRATED** | Genuine integration with the host Windows OS via vetted Node APIs, WMI/CIM queries, or controlled PowerShell bridges. |
| **APPLICATION-SIMULATED** | Sophisticated desktop environment behavior managed strictly within the application's canvas/windowing engine (not replacing Windows OS equivalents). |
| **INFORMATIONAL** | Read-only inspection or telemetry display; does not modify or configure the underlying operating system. |
| **FUTURE** | Architected and designed in schema/specs, but deferred to future release milestones. |
| **UNSUPPORTED** | Intentionally blocked or technically unsupported due to OS security boundaries, safety policies, or stability constraints. |

---

## 2. Feature Capability Matrix

| Feature / Subsystem | Classification | Implementation Mechanism | Privileges & Boundaries | Safety Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Desktop Shell & Canvas** | APPLICATION-SIMULATED | React 18 Canvas, customizable wallpapers, custom desktop icons, right-click context menu | User process; no desktop hook injection | Fixed canvas viewport |
| **Taskbar / Dock System** | APPLICATION-SIMULATED | Hybrid dock/taskbar engine with pinned apps, active indicators, workspace pills, and system tray | Runs within app container; does not modify Windows Taskbar | Responsive flex layout |
| **Start Menu & Search** | APPLICATION-SIMULATED | Categorized application launcher, pinned apps grid, recommended files, power menu | In-memory & SQLite registry search | Static catalog fallback |
| **Command Palette (`Ctrl+Space`)** | REAL | Universal fuzzy command executor, keyboard-first shortcut palette | Sandboxed dispatch; permission-checked commands | In-app command list |
| **Window Manager** | APPLICATION-SIMULATED | Full window container with drag, 8-handle resize, z-index stacking, minimize/maximize | Bounded by desktop canvas container | Cascade default layout |
| **Win 11 Snap Layouts** | APPLICATION-SIMULATED | Windows 11 style hover menu (Left, Right, Top, Corners) and edge magnet snapping | Calculated against canvas coordinate space | Standard maximize |
| **Virtual Workspaces (1–4)** | APPLICATION-SIMULATED | Multi-desktop workspace engine isolating window stacks, independent wallpapers | Application-level; not Windows Virtual Desktops API | Single workspace mode |
| **File Explorer** | REAL + WINDOWS-INTEGRATED | Virtual folder navigator with breadcrumbs, search, file creation, and native FS bridge | User-scoped paths only; protected Windows folders blocked | Virtual sandbox FS |
| **Notes App** | REAL | Markdown editor with live preview, word/character counter, tag categorization, auto-save | Offline SQLite / LocalStorage + SQL Server sync | In-memory state |
| **Terminal Center** | REAL + WINDOWS-INTEGRATED | Interactive command interpreter (`help`, `sysinfo`, `ps`, `calc`, `curl`, `workspaces`) | Controlled process bridge; shell allowlist; no raw admin execution | Sandboxed simulation shell |
| **Task Manager** | REAL + WINDOWS-INTEGRATED | Active process table, CPU/Memory telemetry gauges, task termination | Read-only inspection by default; termination requires confirmation | Simulated process snapshot |
| **System Information** | REAL + WINDOWS-INTEGRATED | Genuine OS version, architecture, CPU model, total/free RAM, and uptime inspection | Read-only WMI / Node `os` module | Static build specs fallback |
| **Calculator** | REAL | Complete arithmetic and scientific calculator with expression history strip | Standard JavaScript math engine | Standard arithmetic |
| **Clock, Timer & Stopwatch** | REAL | World clock (UTC, EST, GMT, PKT, JST), stopwatch with lap recording, countdown timer | High-resolution browser timers (`performance.now()`) | Standard `Date` timer |
| **API Tester** | REAL | Full HTTP REST client with method selection, headers editor, JSON request body, latency gauge | Browser `fetch` / Node proxy client | Mock echo client |
| **JSON Viewer & Formatter** | REAL | JSON syntax tree viewer, 2/4-space beautifier, minifier, and error validator | Native `JSON.parse` with line/col error pinpointing | Raw text display |
| **Design System & Themes** | REAL | 8 themes (Dark, Light, Midnight, Graphite, Aurora, Ocean, Ubuntu, High-Contrast) | Centralized CSS variables (`tokens.css`, `themes.css`) | Default dark theme |
| **Visual Performance Tiers** | REAL | 4 tiers (Minimal, Balanced, Enhanced, Immersive) controlling blurs, acrylic, animations | Dynamic CSS class application (`tier-minimal` to `tier-immersive`) | Balanced mode |
| **Web Audio Sound Engine** | REAL | Synthesized procedural audio (clicks, opens, snaps, minimizes, errors) via Web Audio API | Zero external binary audio dependencies; accessibility mute switch | Silent visual feedback |
| **Quick Settings Flyout** | REAL | Action center flyout with Wi-Fi toggle, theme switcher, sound mute, volume slider | Application state control; informational network status | Local preference store |
| **Notification Center** | REAL | Stacked notification tray with categories (Info, Warning, Success, Error), dismiss controls | In-memory event bus and database persistence | Browser console log |
| **Local SQLite Persistence** | REAL | Relational offline-first local database caching users, workspaces, windows, notes | Local user AppData directory; zero remote transmission needed | IndexedDB fallback |
| **SQL Server Sync (`MyOS`)** | REAL | Versioned T-SQL migrations, sync queue, delta push/pull with transactional safety | Requires configured connection; explicitly gated execution | Offline-first mode |
| **REST API Server (`/api/v1`)** | REAL | Node.js Express/Fastify service with JWT auth, request correlation (`X-Request-Id`) | Runs on user-configured port (default 3000) | Client-side standalone |
| **Clipboard History** | REAL | Searchable clipboard manager with type filters, sensitive content masking, local storage | Client-side memory/storage; does not intercept global OS keystrokes | In-app clipboard list |
| **Snippet Expander** | REAL | Keyword trigger macro expansion sandbox with dynamic `{date}`, `{time}`, `{uuid}` evaluation | Application-scoped sandbox text expander | Plain text templates |
| **Quick Utilities** | REAL | Color palette studio, UUID v4/NanoID generator, SHA-256/Base64 encoders, Regex tester | Client-side JavaScript Web Crypto APIs | Basic string tools |
| **Tasks & Kanban** | REAL | Sprint Kanban boards (To Do, In Progress, Review, Done), priority labels, due dates | Offline-first LocalStorage and REST sync | In-memory task list |
| **Calendar & Events** | REAL | Monthly interactive calendar grid, agenda scheduler, meeting join links (Meet, Teams, Zoom) | Client-side calendar engine and offline persistence | In-memory event array |
| **Focus Mode** | REAL | Pomodoro countdown, deep work sessions, procedural Web Audio ambient sound synthesizer | Synthesized procedural audio (Rain, Forest, Ocean) | Silent timer |
| **Security Vault** | REAL | Client-side encrypted credential store with master PIN, live 30s TOTP generator, password maker | Client-side hashing and concealed memory fields | Locked local vault |
| **Antigravity AI** | REAL | On-device desktop AI assistant for SQL schema queries, React tips, and workspace commands | High-speed client-side inference heuristics | Contextual help docs |
| **Cinematic Boot Sequence** | APPLICATION-SIMULATED | Deterministic startup animation with VOID, animated SVG logo, and handoff (runs strictly once per cold start) | Sandboxed in-app canvas; does not simulate booting Windows OS | Direct login screen bypass |
| **System Startup Loader** | REAL | Honest initialization sequence reflecting real milestones (vault, design tokens, DB, app registry) | In-app milestone pipeline; no fake progress bars | Minimal spinner |
| **Integrated Login Screen** | REAL | Acrylic authentication panel with email/password, CapsLock detection, show/hide toggle, and remember me | REST API JWT auth (`/api/v1/auth/login`) or local profile mode | Offline local profile |
| **Top-Right Account Entry** | REAL | Fixed accessible corner link transitioning to registration flow without page reload or boot replay | In-app view transition; >= 44x44px touch target | Standard sign-in switch |
| **One-Click Bootstrap Engine** | REAL | Cross-platform Node/Batch/Shell bootstrap verifying environment, installing deps, and launching browser | Loopback only (127.0.0.1); zero elevated privileges; non-invasive | Manual `npm run dev:web` |
| **MyOS Universal Branding** | REAL | Original vector SVG and multi-res PNG icon set for MyOS across desktop, browser tab, and start menu | Pure client SVG/PNG artwork; zero external copyright assets | Fallback favicon |
| **14-Theme Semantic Gallery** | REAL | 14 curated thematic palettes (Midnight Aurora, Ocean Glass, Solar Flare, Emerald, Rose Quartz, Arctic, Sunset, Cyber Spectrum, Sage & Sand, Monochrome, Classic Blue, Warm Light, Deep Space, High Contrast) | Applied via atomic `:root` CSS custom property classes | Legacy 8-theme list |
| **Central Motion Engine (6 Profiles)** | REAL | Unified motion API (`motionEngine.ts`) with balanced, expressive, cinematic, minimal, performance_saver, and off profiles | Respects OS `prefers-reduced-motion` and custom easing curves | Ad-hoc CSS transitions |
| **Accent Studio & WCAG 2.2 AA Checker** | REAL | Custom hex picker, curated swatches, and live luminance contrast ratio computation (pass >= 4.5:1) | Client-side formulaic evaluation with live component preview | Fixed 8-color picker |
| **Wallpaper Studio & Readability Dimming**| REAL | 4K curated wallpapers with dynamic 0%–60% readability scrim to ensure icon contrast | Client-side CSS background and opacity scrim layer | Static wallpaper |
| **Active Window Edge Lighting** | REAL | Focus-aware top accent edge lighting (`--gradient-edge-light`) for active window disambiguation | Window manager focus listener and gradient bar | Standard window outline |
| **Ambient Aurora Drift Layer** | APPLICATION-SIMULATED | Subtle procedural gradient pulse adding atmospheric depth without high CPU overhead | Hardware-accelerated CSS opacity animation; pauses on performance mode | Static desktop canvas |
| **Registry Editor** | INFORMATIONAL / CONTROLLED | Read-only registry view of harmless application settings | Registry writes permanently disabled without explicit admin approval | In-app settings |
| **Windows System Restore** | INFORMATIONAL | Displays restore point status and instructions | Does not initiate system restore points | Documentation link |
| **Replacing `explorer.exe`** | UNSUPPORTED | Running as primary Windows shell replacement | Blocked by design; application operates as user-level productivity workspace | Standalone window |
| **Kernel-Level Drivers** | UNSUPPORTED | Low-level hardware kernel drivers | Blocked by design; standard user-mode Win32/Node only | N/A |

---

## 3. Windows Integration API Safety Policy

In strict compliance with **Section 2.1 (Build-First / User-Authorized Execution Only)** and **Section 21 (Windows Integration API Matrix)**:

1. **Read Operations**: Safe read-only metrics (CPU, Memory, OS Version, Non-sensitive processes) are permitted via verified Node.js standard libraries and non-invasive CIM queries.
2. **Write Operations**: Operations modifying system state (terminating third-party processes, writing to system directories, modifying Windows services) are locked behind explicit user confirmation dialogs and administrative authorization gates.
3. **Protected Paths**: All filesystem operations strictly forbid tampering with `C:\Windows`, `C:\Program Files`, `C:\ProgramData`, System32, WinSxS, and user credential vaults.
4. **No Arbitrary Shell Execution**: The terminal application enforces a strict command allowlist and parameter sanitizer. Arbitrary `powershell.exe -EncodedCommand` or destructive shell piping is prohibited.
