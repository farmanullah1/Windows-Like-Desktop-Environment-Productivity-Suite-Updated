# Assumptions Register

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Truth in Engineering & Production Safety (Section 5.1, Section 121)

---

## 1. Operating System Environment

| ID | Assumption | Rationale | Impact if Invalid | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ASM-001** | Target host environment is Windows 10 (Build 19041+) or Windows 11 (64-bit). | Modern Fluent styling, WMI providers, and Win32 desktop API compatibility require Windows 10/11 x64. | Windows 7/8 legacy systems will fail to run native bridge queries and acrylic visual compositors. | ACCEPTED |
| **ASM-002** | PowerShell 5.1+ or PowerShell 7 is available in system PATH. | Safe system telemetry inspection (`querySystem.ps1`) utilizes standard WMI/CIM cmdlets via PowerShell. | System metrics fallback to Node.js `os` runtime primitives. | ACCEPTED |
| **ASM-003** | Display DPI scaling may vary between 100% and 200%. | Modern Windows laptops and high-DPI monitors require vector rendering and relative `rem`/CSS variables. | Fixed-pixel artifacts would clip or blur on 4K/retina displays. | ACCEPTED |

---

## 2. Persistence & Database Environment

| ID | Assumption | Rationale | Impact if Invalid | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ASM-004** | SQL Server deployment target is database `MyOS` on `localhost` (default port 1433 or dynamic port). | Master Specification Section 10 & 141 targets enterprise relational SQL Server persistence with versioned migrations. | Migration scripts and push/pull sync remain queued in offline-first SQLite cache. | ACCEPTED |
| **ASM-005** | Offline-first client cache uses LocalStorage / IndexedDB / local SQLite. | Desktop users expect full productivity (Notes, Calculator, File Explorer) when disconnected from the backend. | Loss of unsaved changes upon offline restart if cache fails. | ACCEPTED |
| **ASM-006** | Database migrations require explicit user authorization prior to execution. | Safety Directive Section 2.1 strictly forbids automated execution of DDL or schema alterations on user databases. | Schema remains unmigrated until explicitly authorized by the user. | ACCEPTED |

---

## 3. Runtime & Security Boundaries

| ID | Assumption | Rationale | Impact if Invalid | Status |
| :--- | :--- | :--- | :--- | :--- |
| **ASM-007** | Application runs with standard user privileges by default. | Administrative elevation should never be assumed or requested unless a privileged task explicitly demands it. | Read-only process inspection works; task termination of elevated system processes is prevented. | ACCEPTED |
| **ASM-008** | Client UI executes inside sandboxed renderer without nodeIntegration. | Electron security standards (Section 8) mandate context isolation and typed IPC bridge to avoid remote code execution. | Renderer cannot directly execute arbitrary child processes or unvalidated filesystem writes. | ACCEPTED |
| **ASM-009** | Third-party unsigned plugins are disabled by default. | Security threat model (Section 19 & 55) dictates strict capability-based authorization for any future extension. | Plugins cannot access user data or network sockets without explicit approval. | ACCEPTED |
