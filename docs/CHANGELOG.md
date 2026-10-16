# Changelog

All notable changes to the **Windows-Like Desktop Environment & Productivity Suite** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [9.0.0] - 2026-10-09

### Added
- **14 Thematic Color Palettes & Semantic Token System (§2)**:
  - 14 curated themes: Midnight Aurora (default), Ocean Glass, Solar Flare, Emerald Terminal, Rose Quartz, Arctic Light, Sunset Horizon, Cyber Spectrum, Sage & Sand, Monochrome Studio, Classic Blue, Warm Light, Deep Space, and High Contrast.
  - Reusable gradient tokens in `:root`: `--gradient-aurora`, `--gradient-ocean`, `--gradient-sunset`, `--gradient-solar`, `--gradient-emerald`, `--gradient-spectrum`, `--gradient-glass`, `--gradient-edge-light`, `--gradient-focus-progress`, `--gradient-selection`.
  - Atomic theme switching with zero flash or DOM thrashing via `themes.css` data attributes.
- **Central Motion Engine (§4)**:
  - Typed central motion API (`src/design-system/motionEngine.ts`) with 6 distinct motion profiles: `balanced` (default), `expressive`, `cinematic`, `minimal`, `performance_saver`, and `off` (Reduced Motion).
  - Centralized timing tokens (instant 0–80ms, fast 100–160ms, standard 160–240ms, emphasis 240–360ms, cinematic 360–650ms, stagger 20–45ms).
  - Dynamic injection of `--motion-*` and `--ease-*` tokens onto `:root`.
- **Appearance & Accessibility Studio (§5.7)**:
  - Dedicated studio component (`src/apps/components/AppearanceDashboard.tsx`) embedded directly into Settings.
  - 14-Theme Gallery with live swatches, active indicator, and category filters (Dark, Light, Vibrant, Accessibility).
  - Accent Studio featuring 10 curated swatches, native color picker, hex input, and live WCAG 2.2 AA contrast evaluator (target ≥ 4.5:1).
  - Live component preview strip showing button, outline, and focus ring reactions in real time.
- **Wallpaper Studio & Visual Depth Layer (§3)**:
  - Wallpaper readability dimming slider (0% to 60%) to guarantee desktop icon text contrast.
  - Hardware-accelerated ambient aurora drift layer with performance-mode pause.
  - Active window top edge-light bar (`--gradient-edge-light`) and focus halo on window frames.
- **Automated Verification**:
  - Added test suite coverage in `tests/contracts.test.mjs` verifying all 14 theme definitions, gradient tokens, and all 6 motion profiles.

## [8.2.0] - 2026-10-09

### Added
- **One-Click Bootstrap, Setup & Launch Engine**:
  - Pure Node.js cross-platform bootstrap script (`scripts/setup-and-run.mjs`) executing with zero third-party dependencies before `npm install`.
  - Automated environment verification (Node.js ≥ 20, npm ≥ 10, git optional check).
  - Port conflict resolution scanning for free ports starting at 5173.
  - Development server spawn bound securely to loopback `127.0.0.1`.
  - HTTP health polling (`waitForHealth`) validating server readiness before triggering default browser auto-open.
  - Graceful process termination on <kbd>Ctrl+C</kbd> with zero orphan background processes.
  - Platform wrappers: `setup-and-run.bat` (Windows double-click), `setup-and-run.ps1` (PowerShell), and `setup-and-run.sh` (macOS/Linux).
  - Registered `npm run setup` and `npm run dev:web` in `package.json`.
- **MyOS Universal Branding & Identity**:
  - Full original vector SVG suite in `assets/branding/` and `public/assets/branding/`: `logo.svg`, `logo-mono.svg`, `mask-icon.svg`, `wordmark.svg`, `splash.svg`.
  - Multi-resolution PNG icon suite: `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon-192.png`, `favicon-512.png`, `apple-touch-icon.png` (180×180), and `favicon.ico`.
  - Centralized `document.title` manager (`src/lib/documentTitle.ts`) syncing browser tab title dynamically (`MyOS`, `MyOS — Starting…`, `MyOS — Sign In`, `MyOS — <AppName>`).
  - Updated `index.html`, `public/manifest.json`, `Taskbar.tsx` start button, and `StartMenu.tsx` to MyOS.
- **Documentation**:
  - Created [docs/SETUP.md](docs/SETUP.md) and [docs/BOOTSTRAP.md](docs/BOOTSTRAP.md).
  - Updated [README.md](README.md) with One-Click Quick Start section.

## [8.1.0] - 2026-10-09

### Added
- **Cinematic Startup Sequence & Boot State Machine**:
  - Five-stage deterministic launch sequence: `STAGE_VOID` -> `STAGE_LOGO` -> `STAGE_LOADER` -> `STAGE_HANDOFF` -> `LOGIN_ENTRY`.
  - Process-local single-use cold boot detection signal (`/api/v1/boot/consume-cold-signal`) ensuring the boot sequence runs strictly once per genuine app launch and **never** on renderer refresh (<kbd>F5</kbd>, <kbd>Ctrl+R</kbd>), HMR reload, or routing changes.
  - Honest initialization progress loader across 5 verified system milestones without fake percentage delays.
  - Procedural Web Audio API startup sound chimes (`playBootChime` harmonic C4-G4-C5 and `playWelcomeChime` E-major triad) with zero copyright OS sound dependencies and accessibility mute compliance.
  - Full support for `prefers-reduced-motion` and performance tiers.
- **Integrated Login Experience & Authentication**:
  - Centered acrylic authentication card with email/password authentication, show/hide toggle, real-time CapsLock detection, and "Remember me" option.
  - Fixed top-right corner **"Create account"** entry point (`CreateAccountLink.tsx`) with accessible hit area ≥ 44×44 px, providing instant transition to account registration without app reload or boot replay.
  - Full registration screen (`SignupScreen.tsx`) integrated with `POST /api/v1/auth/register`.
  - Offline local workstation session bypass ("Continue with local profile").
- **Extended Contract Tests**:
  - Added cold-boot single-use signal consumption and 32 permission key coverage tests in `tests/contracts.test.mjs` (7 passing test suites).

## [8.0.0] - 2026-10-09

### Added
- **Master Expansion Pack 8.0 Productivity Suite**:
  - **Clipboard History Manager** (`ClipboardManagerApp.tsx`): Real-time searchable clipboard history, type filters (Text, Code, URL, Color), sensitive content masking heuristics, and quick re-copying.
  - **Snippet Expander & Template Sandbox** (`SnippetExpanderApp.tsx`): Keyword trigger macro expansion (`!addr`, `!date`, `!react`, `!uuid`), live dynamic variable evaluation (`{date}`, `{time}`, `{uuid}`, `{clipboard}`), and interactive testing sandbox.
  - **Quick Utilities Studio** (`QuickUtilitiesApp.tsx`): Color palette generator & CSS copy, UUID v4 / NanoID generator, SHA-256 / Base64 cryptographic encoders, and live interactive Regex playground with match counts.
  - **Tasks & Sprint Kanban Board** (`TasksApp.tsx`): Full Kanban columns (To Do, In Progress, In Review, Completed) plus List view, priority badges (Urgent, High, Medium, Low), project categorization, and Desktop Notification Center dispatch.
  - **Calendar & Agenda Scheduler** (`CalendarApp.tsx`): Interactive monthly calendar grid, day agenda sidebar, event scheduling, and direct 1-click meeting join links (Google Meet, Teams, Zoom).
  - **Focus Mode & Pomodoro Timer** (`FocusModeApp.tsx`): Customizable Pomodoro and Deep Work sessions, circular countdown progress ring, session stats, and Web Audio procedural ambient sound synthesizer (Rain, Forest, Waves).
  - **Security Vault & Password Generator** (`VaultApp.tsx`): Master PIN locked credentials manager (Default `1234`), 30-second live TOTP authenticator countdown, cryptographic password generator with length/symbol toggles, and zero-knowledge local storage.
  - **Antigravity AI Desktop Assistant** (`AiAssistantApp.tsx`): On-device desktop AI assistant with conversational interface, MS SQL Server query assistance, React architectural tips, and desktop commands.
- **Section 2.1 Permission Schema Extension**:
  - Extended `PermissionKey` union in `src/core/contracts.ts` with all 32 required capability keys across `clipboard.*`, `snippet.*`, `vault.*`, `task.*`, `calendar.*`, `ai.*`, and `database.*`.
- **Expanded Application Catalog**:
  - Registered all 8 new applications in `src/apps/registry.ts` and `server/index.js` bringing total platform applications to 24.
  - Added customized 3D squircle iconography and distinct thematic gradients in `AppIconBadge.tsx`.

## [6.2.0] - 2026-10-09

### Added
- **Tailwind CSS v4 Integration**:
  - Full installation and configuration via `@tailwindcss/vite` plugin.
  - Native compile pipeline generating over 104 KB of optimized Tailwind CSS utilities while preserving centralized design tokens.
- **Microsoft SQL Server Enterprise Data Layer** (`server/db.js`):
  - Official Node `mssql` driver integration connecting securely using `.env` variables (`DB_SERVER`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_ENCRYPT`, `DB_TRUST_SERVER_CERTIFICATE`).
  - Connection pool management, connection testing API (`/api/v1/db/test`), schema verification, and resilient local persistence fallback.
  - Dedicated **MS SQL Server** management tab in [SettingsApp.tsx](file:///c:/Users/farma/Desktop/Windows-Like%20Desktop%20Environment%20&%20Productivity%20Suite/src/apps/components/SettingsApp.tsx) featuring live status badge, interactive credential tester, and SQL query playground.
- **Live System Telemetry & Web APIs**:
  - Replaced all dummy numbers with genuine host telemetry queried via Node.js `os` module (Host OS, actual CPU model & cores, 32 GB RAM, live load sampling, uptime).
  - Real browser Battery Status API integration (`navigator.getBattery()`) with AC line power detection.
  - Real Network Information API with online/offline event synchronization.
- **Metadata, SEO, PWA & Social Sharing Suite**:
  - Full Web App Manifest (`public/manifest.json`) and `robots.txt`.
  - Production icon suite: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180x180), `icon-192.png`, `icon-512.png`.
  - Complete Open Graph (`og:*`), Twitter Card (`twitter:*`), Apple mobile web app, and canonical tags in `index.html`.
- **Section 12.5 Relational Schema & Virtual File System**:
  - Implemented full MS SQL Server schema verification and seeding in `server/db.js` for `dbo.Applications`, `dbo.UserFiles`, `dbo.WindowStates`, `dbo.Notes`, `dbo.Workspaces`, `dbo.Notifications`, `dbo.AuditLogs`, and `dbo.SyncQueue`.
  - Added REST endpoints in `server/index.js` for Applications catalog (`/api/v1/applications`), User Files (`/api/v1/files`), and Window States (`/api/v1/window-states`).
  - Integrated live backend synchronization into `FileExplorerApp.tsx` with folder creation, file creation, item deletion, and offline-resilient local cache fallback.
  - Linked `AppCatalogApp.tsx` to live database application registry.
- **Extended Contract Tests**:
  - Added database error codes and REST error envelope tests to `tests/contracts.test.mjs` (5 passing test suites).

## [6.1.0] - 2026-10-09

### Added
- **4K Desktop Wallpapers**: High-resolution curated wallpapers (`aurora.jpg`, `cyberpunk.jpg`, `fluent_silk.jpg`, `cosmic_nebula.jpg`) served statically from `public/wallpapers/`.
- **3D Squircle App Icon Badge System** (`AppIconBadge.tsx`): Skeuomorphic specular sheen, ambient drop shadow, and distinct thematic gradients applied across Desktop, Taskbar, Start Menu, and App Catalog.
- **Desktop Widgets Engine** (`DesktopWidgets.tsx`):
  - Live Weather widget with city cycling (SF, Tokyo, London, NYC), °C/°F toggle, and 4-day forecast.
  - Live System Performance Telemetry widget with real-time SVG sparkline history and CPU/RAM/Disk gauges.
  - Interactive Canvas Sticky Notes with real-time editing, 5 color palettes, and desktop positioning.
  - Quick Clock & Date widget with instant '+ Note' creation action.
- **Groove Media Player** (`MediaPlayerApp.tsx`):
  - 100% real procedural Web Audio API synthesizer with Lo-Fi Beats, Ambient Space, Synthwave 80s, and Rain Lo-Fi sound engines.
  - Real-time HTML5 Canvas 32-band FFT spectrum visualizer with dynamic gradients and peak meters.
- **Photo & Wallpaper Studio** (`GalleryApp.tsx`):
  - High-res photo browser with zoom/pan controls, camera metadata, and dimensions inspection.
  - One-click "Set as Wallpaper" action that instantly updates the active desktop shell background.
- **Session Lock Screen** (`LockScreen.tsx`):
  - Fullscreen frosted acrylic overlay with blurred active wallpaper backdrop.
  - Large digital clock & date display.
  - Interactive PIN keypad with audio feedback and PIN authentication (`1234`).
  - Integrated "Lock" action in Start Menu and desktop shortcuts.

### Fixed
- **`npm run dev` and `npm run build` Execution on Windows**:
  - Resolved `cmd.exe` batch file syntax error caused by directory name ampersand (`& Productivity Suite`).
  - Updated `package.json` scripts to invoke Node directly (`node ./node_modules/vite/bin/vite.js`), ensuring seamless operation across Windows PowerShell and Command Prompt.
- **Desktop Widget Layout Anchoring**:
  - Added dedicated CSS utility tokens (`.w-72`, `.top-14`, `.right-5`, `.right-6`) and z-index hierarchy classes in `src/index.css`.
  - Added `--z-lockscreen: 9999` token in `src/design-system/tokens.css`.
  - Enforced right-side docked positioning and z-index isolation for desktop widgets.

## [6.0.0] - 2026-10-08

### Added
- Master Specification Version 6.0 upgrade incorporating strict truth-in-engineering capability classification.
- Full 23 required engineering documents in `docs/` (including `ANIMATIONS_AND_EFFECTS.md`, `SOUND_DESIGN.md`, `RELEASE_PLAN.md`, `ASSUMPTIONS.md`, `DECISIONS.md`, `THREAT_MODEL.md`, `RISK_REGISTER.md`, `PERFORMANCE.md`, `INTERNATIONALIZATION.md`, `RELEASE.md`, `INSTALLATION.md`, `PRIVACY.md`, `THIRD_PARTY_LICENSES.md`, `CAPABILITY_MATRIX.md`).
- Enterprise SQL Server migration script `002_v6_enterprise_schema.sql` targeting database `MyOS`.
- Four new built-in production applications:
  - Developer Workspace (`DeveloperWorkspaceApp.tsx`): Multi-project management, active repo indicators, terminal launch, and health metrics.
  - Text Editor (`TextEditorApp.tsx`): Multi-tab code & text editor, syntax highlighting mockups, line/column tracking, word counts, formatting, and file export.
  - Application Catalog (`AppCatalogApp.tsx`): Filterable application catalog with categories, search, taskbar pinning, and sandboxing indicators.
  - Diagnostics & Event Viewer (`DiagnosticsApp.tsx`): Real-time system event feed, severity filtering, subsystem status, and diagnostic export.
- Typed Electron IPC boundaries and channels allowlist (`src/electron/ipc/channels.ts`, `contracts.ts`).
- Enterprise error catalog, event protocol, command definitions, and permission validation (`src/core/contracts.ts`).
- Multi-language internationalization engine supporting English (`en-US`) and Urdu (`ur-PK`) with dynamic RTL support (`src/core/i18n.ts`).
- Isolated automated unit test suite with Node.js test runner (`tests/contracts.test.mjs`).

### Changed
- Upgraded REST API server (`server/index.js`) to v6.0 with JWT authentication, session tracking, and request correlation.
- Updated `package.json` test script to execute isolated unit test suite.

## [5.0.0-alpha.1] - 2026-10-08

### Added
- Master Product Specification 5.0 integrating Windows 11, macOS, and Ubuntu/Linux desktop paradigms.
- Persistent engineering memory architecture in `brain.md`.
- Comprehensive system documentation suite in `docs/`:
  - `ARCHITECTURE.md`: High-level system architecture and component interaction models.
  - `SECURITY.md`: Threat model, mitigation strategies, and least-privilege standards.
  - `DATABASE.md`: Microsoft SQL Server relational schema and migration specifications.
  - `API.md`: Versioned REST API endpoints and error envelopes for `/api/v1`.
  - `MOTION.md`: Hardware-accelerated motion tokens, spring curves, and reduced-motion rules.
  - `SOUND.md`: Procedural Web Audio API sound synthesis engine specifications.
  - `THEMES.md`: Centralized CSS design tokens and multi-theme definitions.
  - `ACCESSIBILITY.md`: WCAG 2.1 AA accessibility guidelines and global keyboard shortcuts.
  - `WINDOWS-INTEGRATION.md`: Controlled native bridge safety protocols and command allowlist.
  - `TESTING.md`: 6-tier QA testing standards.
  - `IMPLEMENTATION_STATUS.md`: Feature status matrix with honest capability classifications.
- Repository safety configuration with `.gitignore` and `.env.example`.
