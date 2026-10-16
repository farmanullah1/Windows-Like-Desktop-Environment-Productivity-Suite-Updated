# MyOS — Hybrid Desktop Environment & Productivity Suite

<p align="center">
  <img src="public/assets/branding/wordmark.svg" alt="MyOS Wordmark" width="460" />
</p>

[![Version](https://img.shields.io/badge/version-1.0.0-E06C38.svg?style=flat-square)](docs/CHANGELOG.md)
[![Product](https://img.shields.io/badge/Product-MyOS-E06C38.svg?style=flat-square)](docs/SETUP.md)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38bdf8.svg?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646cff.svg?style=flat-square&logo=vite)](https://vitejs.dev)
[![MS SQL Server](https://img.shields.io/badge/MS_SQL_Server-2025_Ready-CC292B.svg?style=flat-square&logo=microsoftsqlserver)](https://www.microsoft.com/sql-server)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000.svg?style=flat-square&logo=express)](https://expressjs.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-f06292.svg?style=flat-square&logo=pwa)](public/manifest.json)
[![WCAG AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-00b894.svg?style=flat-square)](docs/ACCESSIBILITY.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A serious, production-grade hybrid desktop environment, productivity suite, and developer workstation designed for modern Windows operating systems.

Combining three dominant interface design philosophies into one cohesive, high-performance workspace:
- **Windows 11 (40%)**: Taskbar with hover card window previews, Start Menu, System Tray, Quick Settings action center, Windows 11 hover snap layouts, edge magnet snapping, and Fluent mica/acrylic depth.
- **macOS (30%)**: Dock ergonomic mode, refined typography, spring physics & fluid transitions, workspace-centric app launcher, and glass translucent surfaces.
- **Ubuntu/Linux (30%)**: 4-desktop virtual workspace matrix, universal developer command palette (`Ctrl + Space`), interactive terminal center, system transparency, and live hardware telemetry.

---

## 🎮 One-Click Quick Start (Game `.exe` Style Launcher)

Just like launching a game with an executable file, **MyOS** features a dedicated Windows launcher (`MyOS.cmd` / `MyOS.bat`) that handles everything in one go:

```text
Double-click MyOS.cmd (or MyOS.bat) in the project folder!
```

### What happens when you open `MyOS`:
1. **Prerequisite Check**: Automatically verifies that Node.js (≥ 20) and npm (≥ 10) are installed. If missing, it provides clear installation links and pauses so the window doesn't close.
2. **Auto-Install Dependencies**: If `node_modules` is not yet installed, it executes `npm install` with clean progress indicators.
3. **Environment Initialization**: Generates `.env` from `.env.example` if not already present.
4. **Service Orchestration**: Starts the backend REST server (port 5000) and the Vite development server on an open loopback port.
5. **Instant Browser Launch**: Automatically opens your default web browser to a brand-new tab displaying **MyOS** with cold-boot cinematic animations.

| Platform | Recommended Launcher Command |
| :--- | :--- |
| **Windows (Double-Click)** | Double-click `MyOS.cmd` or `MyOS.bat` |
| **Windows (Command Prompt / PowerShell)** | `MyOS` or `.\MyOS.cmd` |
| **All Platforms (npm)** | `npm run start:myos` (or `npm run setup`) |
| **macOS / Linux** | `npm run start:myos` or `./setup-and-run.sh` |
| **Node.js Direct** | `node scripts/start-myos.mjs` |

> [!TIP]
> **Launch-Session Architecture:** Running `MyOS.cmd` generates a unique launch session ID. On initial launch, the system plays the smooth boot animation. Subsequent browser refreshes (F5 / reload) retain the active session and skip the animation straight to your workstation desktop!

---

## Table of Contents

- [One-Click Quick Start](#-one-click-quick-start-game-exe-style-launcher)
- [Architectural Overview](#architectural-overview)
- [Key Features & Highlights](#key-features--highlights)
- [Application Catalog (24 Applications)](#application-catalog-24-applications)
- [Microsoft SQL Server Enterprise Data Layer](#microsoft-sql-server-enterprise-data-layer)
- [Design System & Sound Engine](#design-system--sound-engine)
- [Truth in Engineering & Capability Model](#truth-in-engineering--capability-model)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started & Development](#getting-started--development)
- [Essential Keyboard Shortcuts](#essential-keyboard-shortcuts)
- [Architectural Documentation Sitemap](#architectural-documentation-sitemap)
- [License](#license)

---

## Architectural Overview

```mermaid
graph TD
    Client["React 18 Desktop Shell (Vite 6 + Tailwind v4)"]
    DesktopStore["desktopStore.tsx (Central State & Telemetry)"]
    ThemeEngine["ThemeProvider.tsx (14 Thematic Palettes & Sound Engine)"]
    WindowManager["WindowFrame.tsx (Drag, 8-Handle Resize, Snap Layouts)"]
    AppRegistry["registry.ts (24 Registered Desktop Applications)"]
    
    ExpressAPI["Node.js Express Server (:5000 /api/v1)"]
    SqlServer[("Microsoft SQL Server 2025 (MyOS on localhost:1433)")]
    LocalCache[("Resilient LocalStorage / SQLite Client Cache")]
    
    Client --> DesktopStore
    Client --> ThemeEngine
    Client --> WindowManager
    Client --> AppRegistry
    
    DesktopStore <-->|"REST API + JWT Bearer"| ExpressAPI
    ExpressAPI <-->|"Connection Pool (mssql)"| SqlServer
    DesktopStore <-->|"Offline-First Fallback"| LocalCache
```

---

## Key Features & Highlights

### 1. Hybrid Desktop Shell & Window Management
- **Taskbar with Live Hover Previews**: Hover over running applications in the Taskbar to inspect interactive thumbnail preview cards displaying window titles, process status, and real-time bounds.
- **Windows 11 Snap Layouts**: Hover over any window's maximize button to reveal a 4-quadrant snap menu (*Left Half, Right Half, Full Maximize, Quarter Corners*) or drag windows to canvas boundaries for magnetic edge snapping.
- **Virtual Desktops (1–4)**: Switch seamlessly across isolated workspaces with dedicated window stacks and independent 4K wallpapers.
- **Desktop Widgets Layer**: Real-time Weather widget with multi-city cycling, live SVG CPU sparkline telemetry, draggable sticky notes with boundary clamping, and a digital clock.
- **Session Lock Screen**: Security lock screen featuring blurred background wallpaper, digital clock, and PIN keypad authorization (Default: `1234`).
- **Universal Command Palette (`Ctrl + Space`)**: Keyboard-first fuzzy search to launch apps, change themes, toggle sound, or switch workspaces in milliseconds.

### 2. Live Host Telemetry & Native Web APIs
- **Real OS Telemetry**: Genuine host metrics queried through Node.js standard libraries (Host OS, CPU model & cores, RAM statistics, live load sampling, host uptime).
- **Web Battery Status API**: Detects real-time battery charge percentage, charging state, and AC power status via `navigator.getBattery()`.
- **Network Information API**: Real-time online/offline event synchronization and bandwidth status.

---

## Application Catalog (24 Applications)

Every application is built as an interactive, fully functioning vertical slice with custom 3D squircle iconography:

| Application | Icon | Category | Key Capabilities & Features |
| :--- | :---: | :--- | :--- |
| **File Explorer** | 📁 | Core | Virtual folder tree, breadcrumb navigation, search, file/folder creation, delete, and native SQL Server sync. |
| **Settings** | ⚙️ | Core | Theme switcher, effects mode, sound volume, workspace manager, and dedicated **MS SQL Server** management console. |
| **App Catalog** | 📦 | Core | Application store and registry inspector with permission reviews and single-click launch. |
| **Tasks & Sprint Kanban** | 📋 | Productivity | 4-column Sprint Kanban board (*To Do, In Progress, Review, Done*), list view, priority tags (*Urgent, High, Medium, Low*), and project filtering. |
| **Calendar & Events** | 📅 | Productivity | Interactive month calendar grid, daily agenda sidebar, event scheduling, and 1-click meeting join links (Google Meet, Teams, Zoom). |
| **Focus Mode** | 🔥 | Productivity | Pomodoro and Deep Work sessions, circular countdown ring, and procedural Web Audio ambient sound synthesizer (*Rain, Forest, Ocean Waves*). |
| **Notes** | 📝 | Productivity | Markdown note-taking with instant preview, word counter, tags, search, and SQL Server persistence. |
| **Snippet Expander** | ✨ | Productivity | Keyword macro triggers (`!addr`, `!date`, `!react`, `!uuid`), dynamic token substitution (`{date}`, `{time}`, `{uuid}`, `{clipboard}`), and live test sandbox. |
| **Quick Utilities** | 🔧 | Utilities | Color studio with CSS export, UUID v4/NanoID generator, SHA-256/Base64 encoders, and live Regex tester. |
| **Clipboard History** | 📋 | Utilities | Searchable clipboard manager, type filters (Text, Code, URL, Color), sensitive token heuristics, item pinning, and copy-back. |
| **Security Vault** | 🛡️ | System | Master PIN locked credential store (Default: `1234`), 30s live TOTP authenticator ring, and cryptographic password generator. |
| **MyOS AI** | 🤖 | Productivity | On-device desktop AI assistant for SQL query optimization, React component guidance, and system commands. |
| **Terminal Center** | 💻 | Developer | Interactive shell environment with built-in commands (`help`, `sysinfo`, `ps`, `calc`, `curl`, `workspaces`, `clear`). |
| **Developer Hub** | 🗂️ | Developer | Sprint board, Git status center, project shortcuts, and environment launch profiles. |
| **API Tester** | 🚀 | Developer | Full REST client with HTTP methods (GET, POST, PUT, DELETE), custom headers, JSON body formatting, and latency measurement. |
| **JSON Studio** | 🔍 | Developer | JSON syntax tree viewer, 2/4-space beautifier, minifier, and real-time schema error pinpointing. |
| **Text Editor** | 📄 | Productivity | Lightweight code and text editor with tabs, line numbers, character statistics, and file saving. |
| **Groove Media Player** | 🎵 | Media | Real procedural Web Audio synthesizer (Lo-Fi, Ambient Space, Synthwave 80s) and 32-band FFT canvas spectrum visualizer. |
| **Photo Studio** | 🖼️ | Media | High-resolution photo gallery, image metadata inspector, zoom/pan controls, and 1-click "Set as Desktop Wallpaper". |
| **Task Manager** | 📊 | System | Active process inspector, CPU/Memory telemetry gauges, search, and process termination. |
| **System Information** | 🖥️ | System | Genuine OS version, architecture, CPU model, total/free RAM, and uptime inspection. |
| **Event Viewer & Diagnostics** | ⚡ | System | System health logs, audit records, and JSON diagnostic telemetry export. |
| **Calculator** | 🔢 | Productivity | Standard and scientific calculation engine with live formula strip and history tape. |
| **Clock & Timer** | ⏱️ | Productivity | Multi-timezone world clock (UTC, EST, GMT, PKT, JST), lap stopwatch, and countdown timer. |

---

## Microsoft SQL Server Enterprise Data Layer

The platform connects directly to **Microsoft SQL Server (2019/2022/2025)**:

- **Target Database:** `MyOS` on `localhost:1433`
- **Driver:** Node.js `mssql` connection pool with secure parameterization and TLS 1.2+ encryption (`Encrypt=True; TrustServerCertificate=True`).
- **Resilient Fallback:** If SQL Server is offline or undergoing maintenance, the frontend automatically switches to local persistence and continues running seamlessly without crashing.
- **Relational Schema:**
  - `dbo.Workspaces` — Virtual desktop profiles, display order, and wallpapers.
  - `dbo.Applications` — Registered platform applications and capability permissions.
  - `dbo.UserFiles` — Hierarchical virtual file system (directories, files, MIME types).
  - `dbo.Notes` — Markdown notes with timestamps and pin flags.
  - `dbo.WindowStates` — Window positions, dimensions, z-index, and maximized state persistence.
  - `dbo.Notifications` — Action center notifications and read receipts.
  - `dbo.AuditLogs` — Structured security and system events.
  - `dbo.SyncQueue` — Transactional delta queue for offline-to-online sync.

---

## Design System & Sound Engine

### Premium Executive Color Palette
MyOS features a signature mechanical keyboard and terminal-inspired executive color scheme:
- **Primary Accent (`#E06C38`)**: Deep Terracotta / Warm Amber. Replaces generic AI glows with a grounded, warm tone. Hover: `#C85728`, Active: `#F07D49`.
- **Desktop Surface (`#14171D`)**: Charcoal Slate. Deep neutral dark background with a tiny touch of blue-grey.
- **Elevated Window Surface (`#1E222A`)**: Off-Black Slate. High-contrast distinction from desktop canvas.
- **Window Borders & Chrome (`#2D333F`)**: Subtle Steel hairline outline.
- **Text Primary (`#ECEFF4`)**: Cool White for maximum contrast and legibility.
- **Text Secondary (`#8F96A3`)**: Muted Slate for auxiliary metadata.

### 14 Thematic Color Palettes
1. `midnight-aurora` (Default Deep Terracotta & Midnight)
2. `ocean-glass` (Deep Navy & Cyan)
3. `solar-flare` (Solar Gold & Amber)
4. `emerald-terminal` (Classic Matrix Emerald)
5. `rose-quartz` (Soft Rose & Amethyst)
6. `arctic-light` (Clean High-Key Light Mode)
7. `sunset-horizon` (Dusk Indigo & Sunset Red)
8. `cyber-spectrum` (High-Energy Cyberpunk Neon)
9. `sage-sand` (Earthy Sage Green & Warm Sand)
10. `monochrome-studio` (Minimalist Matte Slate)
11. `classic-blue` (Enterprise Windows Blue)
12. `warm-light` (Cream & Terracotta Light Mode)
13. `deep-space` (OLED Neutral Void)
14. `high-contrast` (WCAG AAA Solid Contrast)

### 6 Visual Motion Profiles
- `off`: Instant 0ms response for accessibility and screen readers.
- `minimal`: 100ms micro-transitions with zero ambient loops.
- `balanced` (Default): 200ms spring curves with standard transitions.
- `expressive`: 280ms fluid spring physics and hover lift.
- `cinematic`: 380ms deep atmospheric curves and backdrop glides.
- `performance_saver`: Disables parallax, particle canvas, and background animations.

### Web Audio Synthesizer (Zero Binary Dependencies)
Procedural audio generated on-the-fly using the browser's native Web Audio API oscillators:
- `click` — Crisp mechanical mouse feedback.
- `open` / `close` — Smooth resonant frequency sweeps.
- `maximize` / `minimize` — Upward and downward pitch bends.
- `snap` — Snappy magnetic confirmation pop.
- `error` — Soft warning double-tone.
- `mute` — Accessible system-wide mute switch with persistent volume control.

---

## Truth in Engineering & Capability Model

In strict adherence to product honesty (see [CAPABILITY_MATRIX.md](docs/CAPABILITY_MATRIX.md)):

| Classification | Meaning | Examples in Suite |
| :--- | :--- | :--- |
| **REAL** | 100% genuine code execution in the client/server runtime. | Notes, Calculator, API Tester, JSON Studio, Kanban, Calendar, Media Player, Vault, SQL Sync. |
| **WINDOWS-INTEGRATED** | Safe integration with host OS via Node standard libraries and WMI. | System Information, genuine CPU/RAM telemetry, Battery Status API, Network info. |
| **APPLICATION-SIMULATED** | Desktop environment behavior sandboxed within the app container. | Virtual desktop canvas, Taskbar, window dragging, snap layouts (does not replace Windows `explorer.exe`). |
| **INFORMATIONAL** | Read-only inspection; does not modify external OS state. | Diagnostic telemetry, event logs, Windows restore information. |
| **UNSUPPORTED** | Explicitly blocked by safety design. | Kernel driver injection, replacing Windows shell (`explorer.exe`), modifying system registries. |

---

## Technology Stack

- **Frontend Core**: [React 18.3](https://react.dev), [TypeScript 5.7](https://www.typescriptlang.org)
- **Build Tool & Bundler**: [Vite 6.1](https://vitejs.dev)
- **Styling Pipeline**: [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` + Vanilla CSS Design Tokens
- **Icons**: [Lucide React](https://lucide.dev)
- **Audio**: Web Audio API Procedural Synthesizer
- **Backend Server**: [Node.js 22](https://nodejs.org), [Express 4.21](https://expressjs.com)
- **Database Engine**: [Microsoft SQL Server](https://www.microsoft.com/sql-server) via official [`mssql`](https://www.npmjs.com/package/mssql) driver
- **Security**: Cryptographic JWT (HMAC SHA-256), client-side AES-256 vault helpers, request tracing via `X-Request-Id`
- **PWA**: Full Web App Manifest (`manifest.json`), service worker ready, complete Apple & SEO icon suite

---

## Project Directory Structure

```text
├── database/
│   └── migrations/
│       ├── 001_initial_schema.sql         # Initial T-SQL schema
│       └── 002_v6_enterprise_schema.sql    # Enterprise relational schema
├── docs/                                  # 23 architectural specifications
│   ├── ARCHITECTURE.md                    # Core system architecture
│   ├── CAPABILITY_MATRIX.md               # Truth-in-engineering capability matrix
│   ├── CHANGELOG.md                       # Release notes and version history
│   ├── DATABASE.md                        # MS SQL Server relational spec
│   ├── SECURITY.md                        # Threat model and security boundaries
│   └── ...                                # Motion, Sound, Themes, API specs
├── public/
│   ├── assets/branding/                   # Vector logo, wordmark, and icons
│   ├── wallpapers/                        # 4K curated desktop wallpapers
│   ├── favicon.svg                        # Scalable browser favicon
│   ├── manifest.json                      # Web App Manifest
│   └── robots.txt                         # Search engine directives
├── server/
│   ├── db.js                              # MS SQL Server pool & auto-seeding
│   └── index.js                           # Express REST API (/api/v1)
├── src/
│   ├── apps/
│   │   ├── components/                    # 24 built-in application components
│   │   │   ├── AiAssistantApp.tsx         # MyOS AI on-device assistant
│   │   │   ├── CalendarApp.tsx            # Calendar & meeting joiner
│   │   │   ├── ClipboardManagerApp.tsx    # Clipboard history manager
│   │   │   ├── FocusModeApp.tsx           # Pomodoro & ambient sound synth
│   │   │   ├── MediaPlayerApp.tsx         # Groove synth & FFT visualizer
│   │   │   ├── QuickUtilitiesApp.tsx      # Encoders, UUID, regex playground
│   │   │   ├── SettingsApp.tsx            # Settings & SQL Server manager
│   │   │   ├── TasksApp.tsx               # Sprint Kanban & tasks
│   │   │   ├── VaultApp.tsx               # Security vault & TOTP authenticator
│   │   │   └── ...                        # Explorer, Notes, Terminal, etc.
│   │   └── registry.ts                    # Central 24-app catalog registry
│   ├── core/
│   │   ├── contracts.ts                   # Error codes & 32-permission schema
│   │   ├── desktopStore.tsx               # Global desktop context & telemetry
│   │   ├── i18n.ts                        # en-US and ur-PK dictionaries
│   │   └── types.ts                       # Typed TypeScript interfaces
│   ├── design-system/
│   │   ├── AppIconBadge.tsx               # 3D squircle icons with specular sheen
│   │   ├── soundEngine.ts                 # Web Audio sound synthesizer
│   │   ├── ThemeProvider.tsx              # Theme context & performance tiers
│   │   ├── themes.css                     # 14 complete color themes
│   │   └── tokens.css                     # Centralized design tokens
│   ├── shell/
│   │   ├── CommandPalette.tsx             # Universal search & command palette
│   │   ├── DesktopCanvas.tsx              # Desktop canvas & icon layout
│   │   ├── DesktopWidgets.tsx             # Weather, CPU sparkline, sticky notes
│   │   ├── LockScreen.tsx                 # PIN keypad session lock screen
│   │   ├── NotificationCenter.tsx         # Action center notification tray
│   │   ├── QuickSettings.tsx              # Flyout toggles (Wi-Fi, Volume, Theme)
│   │   ├── StartMenu.tsx                  # Windows 11 Fluent start menu
│   │   └── Taskbar.tsx                    # Hybrid taskbar/dock & window hover cards
│   ├── window-manager/
│   │   └── WindowFrame.tsx                # Window drag, resize, & snap layouts
│   ├── App.tsx                            # Root application component
│   └── index.css                          # Tailwind v4 import & token variables
├── tests/
│   └── contracts.test.mjs                 # Automated unit tests
├── MyOS.cmd                               # Windows double-click launcher
├── MyOS.bat                               # Windows command-line launcher
├── package.json                           # Dependencies and npm scripts
└── vite.config.ts                         # Vite 6 & Tailwind v4 compiler config
```

---

## Getting Started & Development

### Automated One-Click Start (Windows)
Double-click `MyOS.cmd` or run in terminal:
```bash
.\MyOS.cmd
```

### Manual Development Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run tests:**
   ```bash
   npm test
   ```

3. **Type-check TypeScript:**
   ```bash
   node ./node_modules/typescript/lib/tsc.js --noEmit
   ```

4. **Start Vite development server:**
   ```bash
   npm run dev
   ```

5. **Start Express REST server:**
   ```bash
   npm run server
   ```

---

## Essential Keyboard Shortcuts

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>Space</kbd> | Open Universal Command Palette | Global |
| <kbd>Win</kbd> / <kbd>Super</kbd> | Toggle Start Menu | Global |
| <kbd>Win</kbd> + <kbd>D</kbd> | Minimize All / Show Desktop | Global |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>→</kbd> | Switch to Next Virtual Workspace | Global |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>←</kbd> | Switch to Previous Virtual Workspace | Global |
| <kbd>Escape</kbd> | Dismiss Menus, Flyouts & Modals | Global |
| <kbd>Tab</kbd> / <kbd>Shift+Tab</kbd> | Navigate Focusable Elements | Accessible UI |

---

## Architectural Documentation Sitemap

Explore detailed technical specifications located in the [docs/](docs/) directory:

- [System Architecture](docs/ARCHITECTURE.md) — Comprehensive technical overview.
- [Capability Matrix](docs/CAPABILITY_MATRIX.md) — Truth-in-engineering classification.
- [Security Model & Threat Assessment](docs/SECURITY.md) — Authentication, permissions, and threat vectors.
- [Database Specification](docs/DATABASE.md) — MS SQL Server schema, indexing, and sync queues.
- [REST API Specification (`/api/v1`)](docs/API.md) — Endpoints, request schemas, and response envelopes.
- [Themes & Design Tokens](docs/THEMES.md) — Token hierarchy, CSS variables, and color recipes.
- [Motion & Animation System](docs/MOTION.md) — Spring physics, performance tiers, and reduced motion.
- [Web Audio Sound Engine](docs/SOUND.md) — Procedural synthesis and audio frequency curves.
- [Accessibility Guide](docs/ACCESSIBILITY.md) — WCAG 2.1 AA keyboard navigation, contrast, and ARIA roles.
- [Windows Integration & Native Bridge](docs/WINDOWS-INTEGRATION.md) — WMI, PowerShell bridge, and process controls.
- [Testing & Quality Assurance](docs/TESTING.md) — Test matrix, unit testing, and E2E verification.
- [Changelog](docs/CHANGELOG.md) — Detailed version-by-version release history.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. Built with passion for modern desktop ergonomics, beautiful interface design, and resilient engineering.
