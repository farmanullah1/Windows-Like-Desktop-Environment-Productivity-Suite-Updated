# Release Engineering & Deployment Specification

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Enterprise Release Management (Section 81, 135, 149, 121)

---

## 1. Release Approval Gates (Section 135)

In strict adherence to the **Prime Directive and Execution Authorization Gate**, the following actions permanently require explicit user approval prior to execution:

1. **Production Database Migration:** No automatic DDL execution against SQL Server (`MyOS`).
2. **Production Installer Publication:** No public distribution or hosting without signoff.
3. **Code Signing:** No automatic signing key retrieval or execution.
4. **Auto-Update Activation:** Background updater requires user verification and consent.
5. **System Modification:** No modification of Windows services, startup keys, or firewall rules.

---

## 2. Packaging Targets

| Distribution Channel | Target Format | Architecture | Installation Scope |
| :--- | :--- | :--- | :--- |
| **Standard Windows Installer** | NSIS-based `.exe` installer | x64 (AMD64) | Per-user (`%LOCALAPPDATA%`), no admin elevation required |
| **Enterprise Managed MSI** | `.msi` package | x64 | Machine-wide, silent installation support |
| **Portable Distribution** | `.zip` standalone directory | x64 | Self-contained, zero registry modification |

---

## 3. Release Checklist

- [ ] All unit and static analysis checks pass with 0 errors (`tsc --noEmit`, ESLint).
- [ ] Production bundle compiled via Vite (`vite build`).
- [ ] No plaintext secrets or real API keys in source code or repository history.
- [ ] `docs/CHANGELOG.md` updated with release notes following Keep a Changelog standard.
- [ ] Database migration files committed and versioned in `database/migrations/`.
- [ ] Capability matrix (`docs/CAPABILITY_MATRIX.md`) verified for technical honesty.
