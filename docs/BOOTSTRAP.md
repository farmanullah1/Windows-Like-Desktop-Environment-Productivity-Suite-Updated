# MyOS — Bootstrap Architecture & Safety Policy

**Product:** MyOS  
**Specification:** One-Click Bootstrap, Setup & Launch Specification v1.0  
**Standard:** Truth in Engineering & Non-Invasive Developer Tooling  

---

## 1. Architectural Philosophy

The MyOS bootstrap engine (`scripts/setup-and-run.mjs`) is engineered as a **developer-friendly bootstrap, not a silent system mutator**. It bridges the gap between cloning the git repository and experiencing the running desktop workspace in a single, transparent, idempotent step.

### 1.1 Core Principles
1. **Full Transparency:** Prints an explanation of every action before performing it.
2. **Pure Node.js Standard Library:** Written with zero third-party dependencies (`node:child_process`, `node:fs`, `node:net`, `node:os`, `node:timers/promises`), allowing it to execute safely before `npm install`.
3. **Idempotence:** Safe to run repeatedly; detects existing `node_modules` and preserves custom user `.env` files.
4. **Security Isolation:** Binds strictly to loopback (`127.0.0.1`) and never requires elevated permissions.
5. **Verified Health Gating:** Never opens the browser until an HTTP health check returns a genuine `200 OK` or `304 Not Modified`.

---

## 2. Capability Transparency Matrix

| Action | Allowed | Mechanism | Notes |
| :--- | :---: | :--- | :--- |
| **Inspect Node / npm / git** | YES | `spawnSync` inspection | Read-only version comparison against Node ≥ 20, npm ≥ 10. |
| **Local `npm install`** | YES | `spawn('npm', ['install'])` | Installs dependencies into repository-local `node_modules/` only. |
| **Global Package Installation** | **NO** | Blocked by design | Never runs `npm install -g`. |
| **File Creation (`.env`)** | YES | `copyFileSync` from `.env.example` | Only copies if `.env` does not already exist. |
| **Delete User Files** | **NO** | Blocked by design | Never touches user documents or workspace files. |
| **Windows Registry Writes** | **NO** | Blocked by design | Completely forbidden. Zero registry keys altered. |
| **Windows Service Changes** | **NO** | Blocked by design | No Windows services created or altered. |
| **Windows Firewall Alterations** | **NO** | Blocked by design | Operates entirely within standard user-space loopback. |
| **Database Migrations** | **NO** | Detection only | Detects configured DB engine; never runs unattended schema changes. |
| **Elevated Rights (`sudo`/Admin)** | **NO** | Blocked by design | Runs strictly within the executing user's privilege scope. |
| **Browser Auto-Launch** | YES | Platform-specific shell bridge | Invokes `cmd /c start` (Win), `open` (macOS), `xdg-open` (Linux). |

---

## 3. Platform Wrappers

To ensure seamless double-click launch across all environments:
- **`setup-and-run.bat`**: Windows Command Prompt wrapper. Verifies Node/npm presence and forwards to `scripts/setup-and-run.mjs`.
- **`setup-and-run.ps1`**: Windows PowerShell wrapper with colored logging and error trap.
- **`setup-and-run.sh`**: POSIX shell script for macOS and Linux workstations with `set -euo pipefail`.
- **`npm run setup`**: Cross-platform script registered in `package.json`.

---

## 4. Reversibility & Clean Uninstallation

Because the bootstrap script creates zero global files or registry entries:
```bash
# Revert all bootstrap actions:
rm -rf node_modules .env dist
```
After deleting these folders, the repository is returned to its fresh git clone state without leaving any residue on the host operating system.
