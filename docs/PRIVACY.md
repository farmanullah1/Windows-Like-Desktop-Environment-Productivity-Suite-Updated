# Privacy Policy & Data Minimization Architecture

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Privacy-by-Design & Data Sovereignty (Section 121, 147, 154)

---

## 1. Core Principles

The Windows-Like Desktop Environment & Productivity Suite operates under a strict **Zero-Telemetry, Local-First, and Data Minimization** model:

1. **Zero Unsolicited Telemetry:** No user metrics, keystrokes, application usage, or system identifiers are transmitted to third-party tracking services or external cloud endpoints without explicit consent.
2. **Local Data Sovereignty:** Notes, files, workspace configurations, and personal preferences remain stored in local offline storage on the user's computer.
3. **Controlled SQL Server Sync:** Synchronization with SQL Server (`MyOS`) is exclusively performed with user-specified database endpoints under corporate or personal governance.
4. **Credential Isolation:** Passwords and secrets are never stored in plain text. Session tokens utilize rotating HMAC-SHA256 signatures with client-side expiration.
5. **No File Scanning:** The universal search and file explorer only index locations explicitly navigated by the user. Protected OS directories and private credential vaults are strictly blocked from scanning.

---

## 2. Data Categories & Retention

| Data Category | Storage Location | Encryption / Protection | Retention Policy |
| :--- | :--- | :--- | :--- |
| **Notes & Documents** | LocalStorage / SQLite / SQL Server | In-memory encryption / Relational ACID | User controlled; soft delete with purge |
| **Workspace Settings** | LocalStorage (`adw_desktop_state_v5`) | Local sandbox | Persisted until reset |
| **Audit Logs** | SQL Server `AuditLogs` table | Parameterized, tamper-resistant | Enterprise configured retention |
| **System Metrics** | Memory only (ephemeral) | Transient telemetry | Discarded immediately after display |
