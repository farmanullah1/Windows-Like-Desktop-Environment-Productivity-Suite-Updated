# Architectural Decision Log (ADR)

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Truth in Engineering & Production Safety (Section 5.1, Section 6, Section 121)

---

## Decision Record 001: Desktop Shell Runtime Architecture
* **Status:** Accepted (Section 6.1)
* **Context:** The product requires deep desktop integration (native file systems, process inspection, display information, window management, audio synthesis, and developer tooling).
* **Decision:** Selected **Electron** as the primary desktop shell hosting a React 18 + TypeScript renderer.
* **Rationale:** Provides mature Win32 API access, stable Node.js process lifecycle, and hardened `contextBridge` isolation between unprivileged renderer and privileged native APIs.
* **Alternatives Considered:** Tauri (lower initial memory but smaller ecosystem for enterprise Windows APIs), native WinUI 3 (locks development strictly to Windows C#).

---

## Decision Record 002: Frontend State Management
* **Status:** Accepted (Section 6.1)
* **Context:** Window dragging, resizing, active workspace segregation, sound playback, and notifications require high-frequency, reactive state updates without unnecessary re-renders.
* **Decision:** Selected **Zustand** with local storage persistence and custom action subscribers.
* **Rationale:** Lightweight, predictable, avoids boilerplate of Redux Toolkit, and supports fine-grained selector subscription ensuring 60+ FPS window manipulation.
* **Alternatives Considered:** Redux Toolkit (excessive boilerplate), React Context (causes widespread re-render cascades on drag/resize).

---

## Decision Record 003: Enterprise Persistence & Local Caching
* **Status:** Accepted (Section 10 & 141)
* **Context:** The application operates offline-first on user machines while synchronizing with enterprise Microsoft SQL Server (`MyOS`).
* **Decision:** Hybrid persistence architecture:
  1. Local offline-first caching via SQLite / LocalStorage.
  2. Centralized relational persistence in Microsoft SQL Server (`MyOS`) using versioned T-SQL migrations (`001_initial_schema.sql`, `002_v6_enterprise_schema.sql`).
* **Rationale:** Ensures zero downtime or data loss when offline; provides ACID-compliant enterprise storage with relational integrity (UUID/GUID primary keys, foreign keys, audit logs).

---

## Decision Record 004: Audio Engine Architecture
* **Status:** Accepted (Section 42 & 153)
* **Context:** Operating system UI sounds are expected for clicks, snaps, minimizes, errors, and notifications without infringing proprietary copyright or requiring heavy audio asset downloads.
* **Decision:** Built a procedural Web Audio API synthesizer (`src/design-system/soundEngine.ts`) generating harmonic oscillator tones (sine, triangle, low-pass filter envelopes).
* **Rationale:** 100% original, copyright-free, zero latency, zero bandwidth overhead, and equipped with a global accessibility mute switch and volume scaling.

---

## Decision Record 005: Typed IPC Boundary
* **Status:** Accepted (Section 8 & 20)
* **Context:** Direct access to `require`, `fs`, or `child_process` from the renderer creates catastrophic Remote Code Execution (RCE) vulnerabilities.
* **Decision:** Enforce context isolation, strict preload channels allowlist (`src/electron/ipc/channels.ts`), max payload size limit (1 MB), and typed request/response envelopes (`src/electron/ipc/contracts.ts`).
* **Rationale:** Defense-in-depth security model completely separating UI rendering from system execution privileges.
