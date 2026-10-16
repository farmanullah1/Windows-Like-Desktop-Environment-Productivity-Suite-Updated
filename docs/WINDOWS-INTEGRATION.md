# Windows Integration & Native Bridge Specification

## 1. Scope & Safety Boundaries
This application integrates with Windows 10/11 through a controlled, permission-gated bridge:
- **Application Boundary**: This software does NOT replace Windows Explorer, does NOT replace the Windows Shell executable, and does NOT alter system security configurations.
- **Honest Classification**: Every system metric is classified as `WINDOWS-INTEGRATED`, `APPLICATION-SIMULATED`, `INFORMATIONAL`, or `UNSUPPORTED`.
- **Zero Destructive Automation**: Never automatically format disks, delete system partitions, terminate critical OS processes, modify firewall rules, or edit system registry keys without explicit confirmation.

---

## 2. Supported Native Capabilities

| Capability | Windows API / Command | Safety Classification | Fallback / Behavior |
| :--- | :--- | :--- | :--- |
| **System Info** | WMI / CIM / PowerShell (`Get-CimInstance Win32_OperatingSystem`, `Win32_Processor`, `Win32_PhysicalMemory`) | WINDOWS-INTEGRATED | Reads mock hardware specs if bridge is offline. |
| **Process Inspection** | `Get-Process` | WINDOWS-INTEGRATED | Shows application-managed processes when offline. |
| **Battery Status** | `Get-CimInstance Win32_Battery` | WINDOWS-INTEGRATED | Reports AC mains power if desktop / unsupported. |
| **Network Adapters**| `Get-NetAdapter`, `Get-NetIPAddress` | WINDOWS-INTEGRATED | Reports browser Navigator network status. |
| **Disk Space** | `Get-PSDrive -PSProvider FileSystem` | WINDOWS-INTEGRATED | Reports application local storage quota. |
| **Terminal Center** | Sandboxed PowerShell 7 / Windows PowerShell execution | WINDOWS-INTEGRATED | Executes commands inside current directory with timeouts. |
| **File Operations** | Node `fs/promises` canonical path operations | WINDOWS-INTEGRATED | Confined to application sandbox and user home directories. |
| **Power State** | `shutdown /s /t 60`, `shutdown /r`, LockWorkStation | WINDOWS-INTEGRATED | Requires double confirmation dialog before dispatch. |

---

## 3. Native Bridge Architecture
The bridge protocol communicates via local IPC or restricted loopback HTTP/WebSocket (`localhost:5050`):
1. **Request**:
   ```json
   {
     "capability": "system.cpu",
     "args": {},
     "token": "session_auth_token"
   }
   ```
2. **Security Gate**:
   - Validates capability against allowed permission manifest.
   - Rejects unauthorized commands with `SECURITY_ACCESS_DENIED`.
3. **Response**:
   ```json
   {
     "success": true,
     "capability": "system.cpu",
     "data": {
       "usagePercent": 14.2,
       "coreCount": 8,
       "model": "Intel Core i7 / AMD Ryzen"
     }
   }
   ```
