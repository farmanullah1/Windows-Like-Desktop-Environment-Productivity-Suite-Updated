# MyOS — Setup & Launch Guide

**Product:** MyOS  
**Scope:** One-Click Bootstrap, Verification, Dev Server, and Browser Launch  
**Platform:** Windows 10/11 (primary), macOS, Linux  

---

## 1. Quick Start — One Command

To install dependencies, verify your environment, start the development server, and automatically launch MyOS in your default browser, run the command for your operating system:

| Platform | Recommended Command |
| :--- | :--- |
| **Windows (Double-Click)** | Double-click `setup-and-run.bat` |
| **Windows (PowerShell)** | `.\setup-and-run.ps1` or `npm run setup` |
| **Windows (CMD / Terminal)** | `npm run setup` |
| **macOS / Linux** | `./setup-and-run.sh` or `npm run setup` |
| **Any Platform (Node.js)** | `node scripts/setup-and-run.mjs` |

---

## 2. Prerequisites

The bootstrap script automatically verifies your environment against these requirements:
- **Node.js:** Version `20.x` LTS or newer (check with `node --version`)
- **npm:** Version `10.x` or newer (check with `npm --version`)
- **Git:** Recommended for developer features (check with `git --version`)

If Node.js or npm is missing or outdated, download the latest LTS release from [https://nodejs.org/](https://nodejs.org/) and ensure **"Add to PATH"** is selected.

---

## 3. What the Script Does Automatically

When executed, `scripts/setup-and-run.mjs`:
1. **Checks Environment:** Confirms Node.js ≥ 20 and npm ≥ 10.
2. **Verifies Project:** Validates `package.json` and lockfile presence.
3. **Installs Dependencies:** Runs repository-local `npm install` (or `npm ci` in CI).
4. **Prepares Environment File:** Creates `.env` from `.env.example` if no `.env` exists.
5. **Detects Free Port:** Scans starting at port `5173` (or the port defined in `.env`).
6. **Starts Dev Server:** Spawns Vite bound securely to `127.0.0.1`.
7. **Performs Health Check:** Continuously polls until the server returns `HTTP 200`.
8. **Opens Browser:** Automatically opens your default browser to `http://127.0.0.1:<PORT>/`.

---

## 4. What the Script Does NOT Do

In accordance with the **Prime Directive of Safety & Transparency**:
- ❌ Does **not** require or request administrator / root privileges.
- ❌ Does **not** modify the Windows Registry, system services, or firewall rules.
- ❌ Does **not** install global npm packages or system packages.
- ❌ Does **not** modify or delete any user files.
- ❌ Does **not** connect to or execute migrations on any database without your explicit configuration.
- ❌ Does **not** bind to public network interfaces (`0.0.0.0`) by default.

---

## 5. Stopping & Uninstalling

- **To Stop MyOS:** Press <kbd>Ctrl+C</kbd> in the terminal window running the script. The script performs a graceful shutdown and terminates child server processes.
- **To Reset/Revert:**
  - Delete `node_modules/` (reverts dependencies).
  - Delete `.env` (reverts environment variables).
  - Delete `dist/` (reverts production build assets).
  No system-level configuration or registry keys were modified.
