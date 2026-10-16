# Project Risk Register

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Continuous Engineering Risk Assessment (Section 134, Section 121)

---

## Active Risk Register

| Risk ID | Description | Likelihood | Impact | Severity | Mitigation | Owner | Status | Contingency |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-001** | Accidental automated execution of SQL Server migrations or system modifications | LOW | CRITICAL | HIGH | Strict compliance with Section 2.1 Directive; execution gates require explicit user authorization. | Lead Architect | MITIGATED | Script generation only; zero automatic execution without approval. |
| **RSK-002** | Renderer memory bloating during multi-window, multi-workspace usage | MEDIUM | MEDIUM | MEDIUM | Dynamic virtualization of hidden workspace windows; lightweight CSS variable styling; component unmounting. | UI Architect | CONTROLLED | Performance Tier toggles (Minimal, Balanced) to reduce acrylic filters. |
| **RSK-003** | Unauthorized file modification outside user boundaries | LOW | HIGH | HIGH | Path normalization and validation blocking `..`, root traversal, and protected Windows system paths. | Security Engineer | MITIGATED | Operation cancelled with structured `FILE_PATH_PROTECTED` error envelope. |
| **RSK-004** | Disconnection from enterprise SQL Server backend | MEDIUM | LOW | LOW | Offline-first local caching in SQLite/LocalStorage; queued sync operations (`SyncQueue` schema). | Backend Engineer | MITIGATED | Transparent local operation with automatic sync indicator. |
| **RSK-005** | Native PowerShell command execution failure on locked-down Windows systems | LOW | MEDIUM | LOW | Non-invasive WMI/CIM fallback queries; Node.js `os` module telemetry fallback. | Windows Engineer | CONTROLLED | Informational telemetry card with honest capability status. |
