# Release Plan & Packaging Strategy

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0 (Production Engineering Edition)  
**Standard:** Enterprise Packaging, Release Gates & Distribution (Section 20, Section 135)

---

## 1. Release Milestones & Roadmaps

| Milestone | Scope | Target Deliverables | Verification Gates |
| :--- | :--- | :--- | :--- |
| **M1: Core Workspace Shell** | Shell, Window Manager, Workspaces, Design System | Electron + React client, 8 themes, Sound Engine | 100% automated unit tests passing; zero TypeScript errors |
| **M2: Productivity & Dev Tools** | Notes, Files, Terminal, Task Manager, Dev Workspace | Built-in apps, offline local storage, safe PS bridge | Isolated sandbox checks; permission-gated file access |
| **M3: Enterprise Relational Backend** | REST API v6.0, Microsoft SQL Server `MyOS` migrations | Express/Fastify service, JWT authentication, SyncQueue | Transactional rollback scripts; parameterization checks |
| **M4: Distribution & Packaging** | NSIS Installer, Portable Zip, Auto-Update | Signed Windows binaries, per-user AppData installer | Code signing verification; SmartScreen readiness review |

---

## 2. Packaging Targets (Section 20.1)

1. **Per-User Windows Installer (NSIS):**
   - Installs to `%LOCALAPPDATA%\Programs\AntigravityDesktopSuite`.
   - Zero administrative UAC prompts required for standard users.
   - Clean uninstaller removing application binaries while prompting before deleting user databases or notes.
2. **Standalone Portable Distribution:**
   - Single `.zip` archive containing executable and local `data/` directory.
   - Zero Windows Registry keys created; 100% portable on external USB drives.
3. **Enterprise MSI Package (Future):**
   - Silent GPO deployment support for enterprise Active Directory environments.

---

## 3. Update Verification & Security (Section 20.2)

* **Cryptographic Signatures:** Differential update archives must be signed via Authenticode certificates.
* **HTTPS Transport:** Updates downloaded exclusively over TLS 1.3 endpoints with checksum verification.
* **Rollback Safeguards:** Failed binary replacements automatically restore prior version snapshots without data loss.
