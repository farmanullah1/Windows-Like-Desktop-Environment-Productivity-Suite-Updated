# Security Threat Model

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** STRIDE & Defense-in-Depth Security Architecture (Section 8, Section 55)

---

## 1. Threat Landscape Overview

The Desktop Suite integrates frontend presentation, local offline persistence, IPC boundaries, native Windows system inspection, and enterprise SQL Server synchronization. The threat surface is analyzed across all core layers.

---

## 2. STRIDE Threat Analysis

| Threat Category | Target Subsystem | Attack Vector | Mitigation in Place | Residual Risk |
| :--- | :--- | :--- | :--- | :--- |
| **Spoofing** | Authentication & Sessions | Forged JWT tokens or session hijacking | HMAC-SHA256 signature verification with timing-safe comparison; cryptographic session IDs; IP and user-agent binding | LOW (Session stored securely in memory/encrypted local store) |
| **Tampering** | File Explorer & Local Storage | Path traversal (`../../etc`) attempting to escape user root | Canonical path sanitization, rejection of `..` segments, and strict blocklist on Windows protected paths (`C:\Windows`, `C:\Program Files`, System32) | LOW |
| **Repudiation** | Audit Logs & Operations | User claims action was unauthorized or performed by system | Normalized `AuditLogs` table recording UTC timestamp, user GUID, action name, resource ID, IP address, and metadata | LOW |
| **Information Disclosure** | System Information & Logs | Leaking cleartext passwords, tokens, or private system keys | Structured logging redaction; passwords hashed with Argon2id/bcrypt; zero secrets in logs, responses, or error envelopes | LOW |
| **Denial of Service** | Electron IPC & API Server | Malformed IPC payloads or unbounded memory allocation | 1 MB payload size limit (`MAX_IPC_PAYLOAD_BYTES`); IPC channel allowlist; API request size limits; rate limiting | LOW |
| **Elevation of Privilege** | Terminal & Native Bridge | Executing arbitrary administrative PowerShell scripts | Shell command allowlist (`help`, `sysinfo`, `ps`, `calc`, `curl`); parameterized script invocations; no raw admin execution | LOW |

---

## 3. Defense-in-Depth Safeguards

1. **Renderer Isolation:** `nodeIntegration: false`, `contextIsolation: true`, `sandbox: true`. The renderer cannot invoke `child_process` or raw file I/O directly.
2. **Channel Allowlist:** Every IPC message must match a registered channel in `src/electron/ipc/channels.ts`. Arbitrary channels are rejected immediately.
3. **Protected Path Enforcement:** Write and delete operations targeting Windows OS system directories are permanently hard-blocked.
4. **Parameterized Persistence:** All database communication uses strictly parameterized inputs to eliminate SQL injection attacks.
