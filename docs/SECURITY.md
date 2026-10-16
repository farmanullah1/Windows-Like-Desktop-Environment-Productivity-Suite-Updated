# Security Architecture & Threat Model

## 1. Security Principles
1. **Least Privilege**: Components and plugins only operate with explicitly granted capabilities.
2. **Defense in Depth**: Client-side validation is accompanied by server-side verification and native bridge gates.
3. **No Unrestricted Execution**: The application never executes arbitrary strings as shell scripts.
4. **Zero Secret Hardcoding**: Secrets and credentials are never stored in code, git commits, or `brain.md`.

---

## 2. Threat Modeling & Mitigation Matrix

| Attack Vector | Threat Description | Mitigation Strategy | Implementation Status |
| :--- | :--- | :--- | :--- |
| **Command Injection** | Malicious input passed into PowerShell or system commands. | Strict parameterization, no raw `cmd.exe /c` or PowerShell `Invoke-Expression`. Predefined allowlisted commands with regex argument validation. | IMPLEMENTED IN BRIDGE SPEC |
| **Path Traversal** | Accessing sensitive system files (e.g., `C:\Windows\System32`) via File Explorer. | Canonical path validation, jail-rooting to user application directories unless explicit read-only permission is granted. | IMPLEMENTED IN STORAGE SPEC |
| **Credential Theft** | Leaking session tokens or stored passwords. | Password hashing with bcrypt/Argon2. HTTP-only secure cookies or protected local session tokens. Expiration and revocation checks. | SPECIFIED IN AUTH ARCHITECTURE |
| **XSS & Code Injection** | Injecting scripts into Notes, Terminal output, or JSON Viewer. | Strict React DOM rendering without `dangerouslySetInnerHTML`. Safe text sanitization. | ARCHITECTURAL STANDARD |
| **SQL Injection** | Manipulating database queries via input parameters. | Parameterized queries and ORM/Query Builder boundaries across all SQL Server interactions. | SPECIFIED IN DB ARCHITECTURE |
| **Privilege Escalation** | Regular user accessing administrative features or OS changes. | Role-Based Access Control (RBAC) separating internal app roles from Windows Administrator privileges. Explicit UAC boundaries. | SPECIFIED IN RBAC ARCHITECTURE |
| **Malicious Plugins** | Untrusted third-party plugins accessing filesystem or network. | Capability-based permission manifest. Sandbox execution with restricted proxy APIs. | SPECIFIED IN PLUGIN ARCHITECTURE |

---

## 3. Native Windows Bridge Security Rules
1. **Never Automatically Modify System Security**:
   - The application shall **NEVER** disable Windows Defender, disable Windows Firewall, modify Windows policies, or edit security registry keys.
2. **Read-Only Defaults**:
   - Device Manager, Services Viewer, and Registry Viewer operate strictly in **READ-ONLY** mode.
   - Any write or modification operation requires dual confirmation, manual user authentication, and comprehensive audit logging.
3. **Subprocess Isolation**:
   - Subprocesses are spawned with explicit arguments arrays, timeouts (default 10s), restricted environment variables, and non-elevated user contexts.

---

## 4. Audit Logging Standard
All security-critical actions generate structured audit log events:
```json
{
  "timestamp": "2026-10-08T18:00:00.000Z",
  "eventType": "AUTH_LOGIN_SUCCESS",
  "userId": "usr_01HXYZ",
  "clientIp": "127.0.0.1",
  "resource": "auth:session",
  "action": "CREATE",
  "outcome": "SUCCESS",
  "details": {
    "authMethod": "password"
  }
}
```
Audit logs are stored immutably in the SQL Server `AuditLogs` table and mirrored to protected local log files.
