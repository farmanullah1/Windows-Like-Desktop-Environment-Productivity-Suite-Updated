# MASTER GOOGLE ANTIGRAVITY DEVELOPMENT PROMPT

## Production-Grade Windows/macOS/Ubuntu Hybrid Desktop Environment & Productivity Suite

**Version:** 6.0
**Status:** Master Implementation Prompt
**Target Platform:** Windows 10/11
**Primary Architecture:** Electron + React + TypeScript + Node.js + SQL Server + local SQLite
**Development Environment:** Google Antigravity
**Implementation Standard:** Production-oriented, secure, maintainable, testable, reversible
**Execution Mode:** BUILD-FIRST / USER-AUTHORIZED EXECUTION ONLY

---

# 0. ABSOLUTE DIRECTIVE

> ## DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.

You are acting as a **principal software architect, senior Windows engineer, senior full-stack engineer, UI/UX architect, security engineer, QA engineer, DevOps engineer, and technical product manager**.

You are not being asked to create a superficial prototype, visual mockup, fake operating system, or collection of disconnected demo screens.

You are being asked to build a **real, production-oriented Windows desktop application** that provides a sophisticated desktop environment, productivity suite, developer workspace, application launcher, file-management experience, workspace manager, system-information layer, and controlled Windows integration.

The application must feel like a coherent desktop product inspired by:

* Windows 11
* macOS
* Ubuntu/Linux desktop environments

but it must **not illegally copy proprietary assets, sounds, branding, artwork, source code, or exact proprietary UI implementations**.

The application must clearly distinguish between:

1. functionality that is genuinely implemented,
2. functionality integrated with Windows,
3. functionality simulated inside the application,
4. functionality that is informational only,
5. functionality planned for the future,
6. functionality that is unsupported.

**Never claim that simulated functionality is native Windows functionality.**

---

# 1. PRIMARY PRODUCT OBJECTIVE

Build a polished desktop application that combines:

* Windows-like desktop interaction
* macOS-inspired visual polish
* Ubuntu/Linux-inspired workspace and developer workflows
* productivity applications
* file and folder management
* notes
* text editing
* terminal integration
* application launching
* virtual workspaces
* window management
* application registry
* search
* command palette
* notifications
* quick settings
* settings/control center
* system information
* task/process monitoring
* developer tooling
* authentication
* authorization
* local persistence
* SQL Server synchronization
* offline-first behavior
* controlled Windows integration
* security controls
* accessibility
* internationalization
* diagnostics
* recovery
* update management
* professional release engineering

The final product must feel like **one unified application**, not a collection of unrelated React pages.

---

# 2. CRITICAL EXECUTION RULE

## 2.1 BUILD THE PRODUCT, DO NOT RUN THE PRODUCT

You must create and modify the project as required.

However:

> **DO NOT RUN, LAUNCH, INSTALL, EXECUTE, ELEVATE, MIGRATE, OR MODIFY THE SYSTEM WITHOUT EXPLICIT USER AUTHORIZATION.**

This includes:

* launching the desktop application;
* starting Electron;
* starting a development server;
* opening the application window;
* installing npm packages;
* installing Python packages;
* installing system packages;
* installing drivers;
* running database migrations;
* creating or modifying a SQL Server database;
* modifying Windows Registry;
* modifying Windows services;
* changing firewall rules;
* changing Windows settings;
* creating scheduled tasks;
* creating startup entries;
* creating Windows services;
* changing network configuration;
* changing power configuration;
* changing security configuration;
* deleting user files;
* modifying protected Windows directories;
* executing arbitrary PowerShell;
* executing arbitrary Bash;
* executing arbitrary Python;
* executing arbitrary executables.

### Safe operations allowed without additional approval

Antigravity may perform **non-system-modifying repository work**, such as:

* reading files;
* inspecting source code;
* creating source files;
* editing source files;
* creating documentation;
* creating schemas;
* creating migrations as files;
* creating test files;
* static code analysis;
* linting;
* formatting;
* TypeScript type-checking;
* static dependency inspection;
* static security analysis;
* repository diff inspection;
* Git status;
* Git diff;
* Git branch creation where it does not affect remote/shared history;
* Git commits;
* safe unit tests that do not launch the application, install dependencies, modify the system, modify a real database, or start services.

If an operation is uncertain:

> **Treat it as requiring explicit authorization.**

---

# 3. TEST EXECUTION AUTHORIZATION GATE

Testing must not contradict the build-only rule.

## 3.1 Test Classification

| Test/Operation                          | Default Permission |
| --------------------------------------- | ------------------ |
| Static analysis                         | Allowed            |
| ESLint                                  | Allowed            |
| Prettier/check formatting               | Allowed            |
| TypeScript typecheck                    | Allowed            |
| Schema validation                       | Allowed            |
| JSON validation                         | Allowed            |
| Unit tests with isolated in-memory data | Allowed            |
| Pure utility tests                      | Allowed            |
| Pure reducer/state tests                | Allowed            |
| Static security analysis                | Allowed            |
| App launch                              | Requires approval  |
| Electron startup                        | Requires approval  |
| React dev server                        | Requires approval  |
| Backend server                          | Requires approval  |
| E2E tests requiring app launch          | Requires approval  |
| Playwright against running app          | Requires approval  |
| Database connection                     | Requires approval  |
| SQL migration execution                 | Requires approval  |
| Dependency installation                 | Requires approval  |
| Native bridge execution                 | Requires approval  |
| PowerShell execution                    | Requires approval  |
| Python execution affecting system       | Requires approval  |
| Windows API write operation             | Requires approval  |
| Registry modification                   | Requires approval  |
| Service modification                    | Requires approval  |
| Installer execution                     | Requires approval  |
| Auto-update testing                     | Requires approval  |

## 3.2 Authorization Message

Before a restricted operation, report:

```text
EXECUTION AUTHORIZATION REQUIRED

Operation:
[exact operation]

Reason:
[why it is needed]

Potential effects:
[what it may change]

Risk:
[LOW / MEDIUM / HIGH / CRITICAL]

Rollback:
[rollback method]

Required authorization:
Explicit user approval.
```

Do not proceed until approval is received.

---

# 4. PRODUCT CAPABILITY TRUTH MODEL

Every feature must be assigned one of these classifications.

| Classification        | Meaning                                                         |
| --------------------- | --------------------------------------------------------------- |
| REAL                  | Fully implemented application functionality                     |
| WINDOWS-INTEGRATED    | Uses genuine Windows APIs/native integration                    |
| APPLICATION-SIMULATED | Simulated inside the application                                |
| INFORMATIONAL         | Displays information but does not control the underlying system |
| FUTURE                | Designed but intentionally not implemented yet                  |
| UNSUPPORTED           | Not safely or technically supported                             |

Every major feature must document its classification in:

```text
docs/CAPABILITY_MATRIX.md
```

Example:

| Feature         | Classification             | Implementation            | Limitations                                               |
| --------------- | -------------------------- | ------------------------- | --------------------------------------------------------- |
| File Explorer   | REAL + WINDOWS-INTEGRATED  | Native filesystem bridge  | Protected paths restricted                                |
| Task Manager    | WINDOWS-INTEGRATED         | Windows process APIs      | Read-only by default                                      |
| Registry Editor | INFORMATIONAL / CONTROLLED | Read-only registry access | Writes disabled by default                                |
| System Restore  | INFORMATIONAL              | Displays availability     | Does not claim to perform restore                         |
| Virtual Desktop | APPLICATION-SIMULATED      | Internal workspace engine | Not Windows virtual desktops unless explicitly integrated |
| Terminal        | WINDOWS-INTEGRATED         | Controlled process bridge | Allowlisted shells                                        |

---

# 5. DECISION AUTHORITY MATRIX

Antigravity must make sensible low-risk decisions without repeatedly asking the user.

## 5.1 Autonomous Decisions

Antigravity may decide autonomously when the decision is:

* reversible;
* local to the application;
* consistent with this specification;
* not security-sensitive;
* not destructive;
* not a licensing decision;
* not a system-modifying operation.

Examples:

* component naming;
* folder organization;
* internal TypeScript interfaces;
* CSS architecture;
* React component decomposition;
* Zustand store structure;
* utility function naming;
* test organization;
* icon placement;
* animation duration within defined limits;
* UI spacing;
* non-destructive default settings.

## 5.2 User Approval Required

Explicit approval is required for:

* changing core technology choices;
* changing the database architecture;
* changing authentication architecture;
* introducing a new privileged native capability;
* system modification;
* Windows Registry writes;
* service creation;
* firewall modification;
* scheduled task creation;
* startup persistence;
* installer execution;
* package installation;
* dependency upgrades with material security/compatibility impact;
* destructive file operations;
* destructive database operations;
* deletion of user data;
* telemetry activation;
* external data transmission;
* production deployment;
* signing credentials;
* publishing releases;
* remote Git operations affecting shared history.

---

# 6. TECHNOLOGY DECISION MATRIX

## 6.1 Mandatory Default Technology Decisions

| Decision          | Default                                                       | Rationale                                                                                                         | Alternatives           | Reversibility |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------- |
| Desktop shell     | **Electron**                                                  | Mature Windows integration, Node.js ecosystem, strong desktop tooling, straightforward native bridge architecture | Tauri                  | Medium        |
| Frontend          | **React + TypeScript**                                        | Mature component architecture and strong desktop UI ecosystem                                                     | Vue, Svelte            | High          |
| State management  | **Zustand**                                                   | Lightweight, explicit, easy to test, avoids excessive framework complexity                                        | Redux Toolkit          | High          |
| Backend           | **NestJS**                                                    | Strong module boundaries, DI, validation, testing, enterprise structure                                           | Fastify, Express       | Medium        |
| HTTP server       | **Fastify adapter for NestJS**                                | Performance and schema-friendly API layer                                                                         | Express adapter        | Medium        |
| Local persistence | **SQLite**                                                    | Offline-first local database, transactional, portable                                                             | IndexedDB, JSON files  | Medium        |
| SQLite access     | **better-sqlite3** or equivalent vetted driver                | Synchronous local transactions simplify desktop state handling                                                    | Drizzle ORM            | Medium        |
| SQL Server        | **Remote or local SQL Server supported**                      | Supports developer/local deployments and centralized environments                                                 | SQL Server only remote | High          |
| ORM/query layer   | **Prisma or Drizzle, selected during Phase 1**                | Strong schema discipline and migrations                                                                           | TypeORM                | Medium        |
| IPC               | **Electron `contextBridge` + typed IPC**                      | Explicit secure renderer/main boundary                                                                            | MessagePort            | High          |
| Native bridge     | **Dedicated Node/native bridge with tightly controlled APIs** | Keeps privileged operations isolated                                                                              | C# bridge executable   | Medium        |
| Windows APIs      | Native Node/C++/C# bridge where necessary                     | Avoid unsafe shell emulation                                                                                      | PowerShell             | Medium        |
| Python            | Specialized offline tooling only                              | Prevents Python from becoming an unnecessary runtime dependency                                                   | Node.js                | High          |
| Bash              | Developer workflow only                                       | Git Bash/WSL integration where explicitly supported                                                               | PowerShell             | High          |
| Testing           | Vitest + Playwright                                           | Fast unit testing and strong E2E ecosystem                                                                        | Jest/Cypress           | High          |
| Accessibility     | axe-core + manual keyboard testing                            | Automated + human verification                                                                                    | Pa11y                  | High          |
| Visual regression | Playwright screenshots                                        | Integrated with E2E workflow                                                                                      | Chromatic              | High          |
| Packaging         | NSIS-based signed EXE installer initially                     | Flexible Windows distribution                                                                                     | MSI/MSIX               | Medium        |
| Version control   | Git                                                           | Required by user                                                                                                  | None                   | N/A           |

### DEFAULT DECISION

Use **Electron**.

**Rationale:** This product requires extensive Windows integration, controlled native process access, filesystem integration, display information, audio/device information, system information, and developer tooling. Electron provides a mature and well-understood architecture for this use case.

Do not switch to Tauri unless an actual engineering evaluation demonstrates a significant advantage.

---

# 7. ARCHITECTURE

Use a layered architecture:

```text
┌──────────────────────────────────────────┐
│ React Renderer                           │
│ UI / UX / Windows / Applications         │
└───────────────────┬──────────────────────┘
                    │ Typed IPC
┌───────────────────▼──────────────────────┐
│ Electron Main Process                    │
│ Window lifecycle / security / IPC        │
└───────────────────┬──────────────────────┘
                    │
        ┌───────────┼──────────────┐
        ▼           ▼              ▼
 Native Bridge   Local DB       Services
 Windows APIs    SQLite         Application Logic
        │           │              │
        └───────────┼──────────────┘
                    ▼
              NestJS Backend
                    │
                    ▼
               SQL Server
```

The renderer must never receive unrestricted Node.js or filesystem access.

---

# 8. SECURITY ARCHITECTURE

## 8.1 Electron Security

Mandatory:

```text
nodeIntegration: false
contextIsolation: true
sandbox: true where compatible
webSecurity: true
```

Use a strict preload bridge.

Do not expose:

```text
require
process
fs
child_process
shell
os
net
http
crypto
```

directly to the renderer.

Expose only explicit typed functions.

---

# 9. DATA CONTRACTS & SCHEMAS

All cross-layer data must use explicit contracts.

Recommended structure:

```text
packages/
  contracts/
    auth/
    applications/
    files/
    windows/
    workspaces/
    notifications/
    settings/
    sync/
    system/
    plugins/
    commands/
    errors/
```

Use runtime validation with Zod or an equivalent validated schema system.

---

# 10. CORE SQL SERVER SCHEMA

Use UUID/GUID identifiers unless a compelling performance reason requires another strategy.

## 10.1 Users

```sql
CREATE TABLE Users (
    UserId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Users PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    Email NVARCHAR(320) NOT NULL,
    NormalizedEmail NVARCHAR(320) NOT NULL,
    PasswordHash NVARCHAR(500) NULL,

    DisplayName NVARCHAR(200) NOT NULL,

    EmailVerified BIT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    LastLoginAt DATETIME2(3) NULL,

    CONSTRAINT UQ_Users_NormalizedEmail
        UNIQUE (NormalizedEmail)
);
```

## 10.2 Roles

```sql
CREATE TABLE Roles (
    RoleId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Roles PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500) NULL,

    CONSTRAINT UQ_Roles_Name UNIQUE(Name)
);
```

## 10.3 UserRoles

```sql
CREATE TABLE UserRoles (
    UserId UNIQUEIDENTIFIER NOT NULL,
    RoleId UNIQUEIDENTIFIER NOT NULL,

    AssignedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT PK_UserRoles PRIMARY KEY(UserId, RoleId),

    CONSTRAINT FK_UserRoles_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId),

    CONSTRAINT FK_UserRoles_Role
        FOREIGN KEY(RoleId) REFERENCES Roles(RoleId)
);
```

## 10.4 Permissions

```sql
CREATE TABLE Permissions (
    PermissionId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Permissions PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    PermissionKey NVARCHAR(200) NOT NULL,
    Description NVARCHAR(500) NULL,

    CONSTRAINT UQ_Permissions_Key UNIQUE(PermissionKey)
);
```

## 10.5 RolePermissions

```sql
CREATE TABLE RolePermissions (
    RoleId UNIQUEIDENTIFIER NOT NULL,
    PermissionId UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT PK_RolePermissions
        PRIMARY KEY(RoleId, PermissionId),

    CONSTRAINT FK_RolePermissions_Role
        FOREIGN KEY(RoleId) REFERENCES Roles(RoleId),

    CONSTRAINT FK_RolePermissions_Permission
        FOREIGN KEY(PermissionId) REFERENCES Permissions(PermissionId)
);
```

## 10.6 Sessions

```sql
CREATE TABLE Sessions (
    SessionId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Sessions PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,

    RefreshTokenHash NVARCHAR(500) NOT NULL,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    ExpiresAt DATETIME2(3) NOT NULL,
    RevokedAt DATETIME2(3) NULL,

    DeviceName NVARCHAR(200) NULL,
    DeviceFingerprint NVARCHAR(500) NULL,

    CONSTRAINT FK_Sessions_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

CREATE INDEX IX_Sessions_UserId
ON Sessions(UserId);

CREATE INDEX IX_Sessions_ExpiresAt
ON Sessions(ExpiresAt);
```

## 10.7 Applications

```sql
CREATE TABLE Applications (
    ApplicationId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Applications PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    ApplicationKey NVARCHAR(150) NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Version NVARCHAR(50) NOT NULL,

    Description NVARCHAR(1000) NULL,

    Classification NVARCHAR(50) NOT NULL,

    IsEnabled BIT NOT NULL DEFAULT 1,
    IsSystemApplication BIT NOT NULL DEFAULT 0,

    ManifestJson NVARCHAR(MAX) NULL,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT UQ_Applications_Key
        UNIQUE(ApplicationKey)
);
```

## 10.8 UserFiles

```sql
CREATE TABLE UserFiles (
    FileId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_UserFiles PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,

    ParentFileId UNIQUEIDENTIFIER NULL,

    Name NVARCHAR(500) NOT NULL,
    Path NVARCHAR(2000) NOT NULL,

    IsDirectory BIT NOT NULL DEFAULT 0,

    SizeBytes BIGINT NULL,

    ContentHash NVARCHAR(128) NULL,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    DeletedAt DATETIME2(3) NULL,

    CONSTRAINT FK_UserFiles_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId),

    CONSTRAINT FK_UserFiles_Parent
        FOREIGN KEY(ParentFileId) REFERENCES UserFiles(FileId)
);

CREATE INDEX IX_UserFiles_UserId
ON UserFiles(UserId);

CREATE INDEX IX_UserFiles_ParentFileId
ON UserFiles(ParentFileId);

CREATE INDEX IX_UserFiles_Path
ON UserFiles(Path);
```

## 10.9 Notes

```sql
CREATE TABLE Notes (
    NoteId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Notes PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,

    Title NVARCHAR(500) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,

    IsPinned BIT NOT NULL DEFAULT 0,
    IsArchived BIT NOT NULL DEFAULT 0,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Notes_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

CREATE INDEX IX_Notes_UserId
ON Notes(UserId);

CREATE INDEX IX_Notes_UpdatedAt
ON Notes(UpdatedAt);
```

## 10.10 Workspaces

```sql
CREATE TABLE Workspaces (
    WorkspaceId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Workspaces PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,

    Name NVARCHAR(200) NOT NULL,
    SortOrder INT NOT NULL DEFAULT 0,

    ConfigurationJson NVARCHAR(MAX) NULL,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_Workspaces_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId)
);
```

## 10.11 WindowStates

```sql
CREATE TABLE WindowStates (
    WindowStateId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_WindowStates PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,
    WorkspaceId UNIQUEIDENTIFIER NULL,

    ApplicationKey NVARCHAR(150) NOT NULL,

    X INT NULL,
    Y INT NULL,
    Width INT NULL,
    Height INT NULL,

    IsMaximized BIT NOT NULL DEFAULT 0,
    IsMinimized BIT NOT NULL DEFAULT 0,

    ZIndex INT NOT NULL DEFAULT 0,

    StateJson NVARCHAR(MAX) NULL,

    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_WindowStates_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId),

    CONSTRAINT FK_WindowStates_Workspace
        FOREIGN KEY(WorkspaceId) REFERENCES Workspaces(WorkspaceId)
);
```

## 10.12 Notifications

```sql
CREATE TABLE Notifications (
    NotificationId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_Notifications PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,

    Title NVARCHAR(300) NOT NULL,
    Message NVARCHAR(2000) NOT NULL,

    Severity NVARCHAR(30) NOT NULL,
    Category NVARCHAR(100) NULL,

    IsRead BIT NOT NULL DEFAULT 0,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    ReadAt DATETIME2(3) NULL,

    MetadataJson NVARCHAR(MAX) NULL,

    CONSTRAINT FK_Notifications_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

CREATE INDEX IX_Notifications_User_Read
ON Notifications(UserId, IsRead);
```

## 10.13 AuditLogs

```sql
CREATE TABLE AuditLogs (
    AuditLogId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_AuditLogs PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NULL,

    Action NVARCHAR(200) NOT NULL,
    ResourceType NVARCHAR(100) NULL,
    ResourceId NVARCHAR(200) NULL,

    Severity NVARCHAR(30) NOT NULL,

    IpAddress NVARCHAR(64) NULL,
    UserAgent NVARCHAR(1000) NULL,

    MetadataJson NVARCHAR(MAX) NULL,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_AuditLogs_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId)
);

CREATE INDEX IX_AuditLogs_UserId
ON AuditLogs(UserId);

CREATE INDEX IX_AuditLogs_CreatedAt
ON AuditLogs(CreatedAt);

CREATE INDEX IX_AuditLogs_Action
ON AuditLogs(Action);
```

## 10.14 SyncQueue

```sql
CREATE TABLE SyncQueue (
    SyncOperationId UNIQUEIDENTIFIER NOT NULL
        CONSTRAINT PK_SyncQueue PRIMARY KEY
        DEFAULT NEWSEQUENTIALID(),

    UserId UNIQUEIDENTIFIER NOT NULL,

    EntityType NVARCHAR(100) NOT NULL,
    EntityId NVARCHAR(200) NOT NULL,

    Operation NVARCHAR(30) NOT NULL,

    PayloadJson NVARCHAR(MAX) NOT NULL,

    AttemptCount INT NOT NULL DEFAULT 0,

    Status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',

    LastError NVARCHAR(2000) NULL,

    CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

    CONSTRAINT FK_SyncQueue_User
        FOREIGN KEY(UserId) REFERENCES Users(UserId)
);
```

### Additional Required Tables

Implement equivalent normalized structures for:

* MFA methods
* password reset tokens
* email verification tokens
* OAuth/OIDC identities
* device registrations
* plugin registrations
* application permissions
* command definitions
* user settings
* themes
* sound preferences
* accessibility preferences
* keyboard shortcuts
* file operation history
* recovery snapshots
* update metadata
* release channels
* feature flags

Do not create unnecessary tables simply for theoretical completeness.

---

# 11. DATABASE RULES

Mandatory:

* UTC timestamps;
* parameterized SQL;
* transactions for multi-step mutations;
* foreign keys;
* indexes based on actual query patterns;
* unique constraints where appropriate;
* soft deletion where recovery is required;
* optimistic concurrency where synchronization requires it;
* migration files committed to Git;
* no production database mutation without authorization;
* no destructive migration without explicit approval.

---

# 12. API CONTRACT

Base path:

```text
/api/v1
```

## Authentication

```text
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/verify-email
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/mfa/challenge
POST   /auth/mfa/verify
GET    /auth/me
GET    /auth/sessions
DELETE /auth/sessions/:id
```

## Applications

```text
GET    /applications
GET    /applications/:id
POST   /applications
PATCH  /applications/:id
DELETE /applications/:id
```

## Workspaces

```text
GET    /workspaces
POST   /workspaces
GET    /workspaces/:id
PATCH  /workspaces/:id
DELETE /workspaces/:id
```

## Notes

```text
GET    /notes
POST   /notes
GET    /notes/:id
PATCH  /notes/:id
DELETE /notes/:id
```

## Files

```text
GET    /files
POST   /files/folder
POST   /files/move
POST   /files/copy
DELETE /files/:id
POST   /files/restore
```

## Notifications

```text
GET    /notifications
POST   /notifications/:id/read
POST   /notifications/read-all
DELETE /notifications/:id
```

## Sync

```text
GET    /sync/status
POST   /sync/push
POST   /sync/pull
POST   /sync/resolve-conflict
```

## System

```text
GET    /system/info
GET    /system/health
GET    /system/capabilities
```

---

# 13. STANDARD API RESPONSE CONTRACT

Success:

```json
{
  "success": true,
  "data": {},
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-01-01T00:00:00.000Z"
  }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "The supplied credentials are invalid.",
    "details": {},
    "retryable": false
  },
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-01-01T00:00:00.000Z"
  }
}
```

Never return stack traces to users.

---

# 14. ERROR CODE CATALOG

Use stable machine-readable codes.

Examples:

```text
AUTH_INVALID_CREDENTIALS
AUTH_SESSION_EXPIRED
AUTH_SESSION_REVOKED
AUTH_EMAIL_NOT_VERIFIED
AUTH_MFA_REQUIRED
AUTH_MFA_INVALID
AUTH_RESET_TOKEN_INVALID

AUTH_FORBIDDEN
AUTH_PERMISSION_DENIED

FILE_NOT_FOUND
FILE_ALREADY_EXISTS
FILE_ACCESS_DENIED
FILE_OPERATION_BLOCKED
FILE_PATH_INVALID
FILE_PATH_PROTECTED

APP_NOT_FOUND
APP_DISABLED
APP_LAUNCH_BLOCKED

WINDOW_INVALID_STATE
WORKSPACE_NOT_FOUND

SYNC_CONFLICT
SYNC_OFFLINE
SYNC_FAILED
SYNC_VERSION_MISMATCH

DB_CONNECTION_FAILED
DB_TRANSACTION_FAILED
DB_CONSTRAINT_VIOLATION

NATIVE_UNSUPPORTED
NATIVE_PERMISSION_DENIED
NATIVE_OPERATION_FAILED

PLUGIN_INVALID
PLUGIN_PERMISSION_DENIED
PLUGIN_EXECUTION_BLOCKED

SYSTEM_OPERATION_BLOCKED
USER_AUTHORIZATION_REQUIRED

VALIDATION_FAILED
RATE_LIMITED
INTERNAL_ERROR
```

---

# 15. EVENT SYSTEM

All internal events must have:

```typescript
interface ApplicationEvent<T = unknown> {
  id: string;
  type: string;
  version: number;
  timestamp: string;
  source: string;
  correlationId?: string;
  payload: T;
}
```

Examples:

```text
window.created
window.closed
window.focused
window.minimized
window.maximized
window.restored
window.snapped

workspace.created
workspace.deleted
workspace.switched

application.registered
application.launched
application.closed

notification.created
notification.read

file.created
file.moved
file.copied
file.deleted
file.restored

sync.started
sync.completed
sync.failed
sync.conflict

auth.login
auth.logout
auth.session.revoked

native.capability.available
native.capability.unavailable
```

---

# 16. APPLICATION REGISTRY

Application manifest:

```json
{
  "id": "com.example.notes",
  "name": "Notes",
  "version": "1.0.0",
  "description": "Application notes manager",
  "icon": "notes",
  "entry": "internal:notes",
  "classification": "REAL",
  "permissions": [
    "storage.notes.read",
    "storage.notes.write"
  ],
  "window": {
    "defaultWidth": 900,
    "defaultHeight": 650,
    "minWidth": 500,
    "minHeight": 400,
    "resizable": true,
    "multipleInstances": false
  }
}
```

The registry must support:

* internal applications;
* external applications;
* developer applications;
* plugins;
* aliases;
* disabled applications;
* permissions;
* capabilities;
* window configuration;
* lifecycle;
* versioning.

---

# 17. COMMAND REGISTRY

```typescript
interface CommandDefinition {
  id: string;
  title: string;
  description?: string;
  category: string;
  keywords?: string[];
  shortcut?: string;
  requiredPermissions?: string[];
  enabled: boolean;
  execute: string;
}
```

Examples:

```text
app.launch
window.minimize
window.maximize
window.close
window.snap.left
window.snap.right
workspace.next
workspace.previous
workspace.create
search.open
command-palette.open
settings.open
notifications.open
terminal.open
file-explorer.open
```

Commands must be permission-aware and centrally registered.

---

# 18. PERMISSION/CAPABILITY SCHEMA

Permissions use:

```text
domain.resource.action
```

Examples:

```text
filesystem.user.read
filesystem.user.write
filesystem.protected.read
filesystem.protected.write

system.info.read
system.process.read
system.process.control

network.read
network.write

power.read
power.control

audio.read
audio.control

display.read
display.control

terminal.execute
plugin.install
plugin.execute

database.read
database.write
```

Sensitive permissions require explicit user approval.

---

# 19. PLUGIN SYSTEM

Plugins must use a manifest:

```json
{
  "id": "com.example.plugin",
  "name": "Example Plugin",
  "version": "1.0.0",
  "apiVersion": "1",
  "permissions": [
    "storage.user.read"
  ],
  "entry": "plugin/index.js"
}
```

Plugins must not receive unrestricted:

* filesystem access;
* process access;
* network access;
* shell access;
* registry access;
* native API access.

Use capability-based access.

Plugin execution must be:

* permission checked;
* logged;
* cancellable where possible;
* versioned;
* validated;
* isolated from the renderer.

---

# 20. IPC CONTRACT

Renderer → Preload → Main → Native/Services.

Every IPC message must contain:

```typescript
interface IPCRequest<T> {
  requestId: string;
  channel: string;
  version: number;
  payload: T;
}
```

Validation requirements:

* runtime schema validation;
* maximum payload size;
* allowed channel list;
* permission check;
* argument validation;
* timeout;
* cancellation where appropriate;
* structured errors;
* no arbitrary channel creation.

Never allow:

```text
ipcRenderer.send(userControlledChannel)
```

without strict channel validation.

---

# 21. WINDOWS INTEGRATION API MATRIX

| Capability          | Preferred Method                          |             Privilege | Access       | Fallback                |
| ------------------- | ----------------------------------------- | --------------------: | ------------ | ----------------------- |
| OS information      | Windows APIs / WMI/CIM                    |                  None | Read         | Node OS information     |
| CPU                 | Windows Performance Counters / native API |                  None | Read         | Node metrics            |
| Memory              | Windows APIs                              |                  None | Read         | Node metrics            |
| Processes           | Native Windows APIs                       |                  None | Read         | Process list            |
| Process termination | Windows process API                       |    Sometimes elevated | Write        | Disabled                |
| Displays            | Win32 / DisplayConfig APIs                |                  None | Read         | Electron display API    |
| Audio devices       | Windows Core Audio APIs                   |                  None | Read/control | Electron limitations    |
| Battery             | Windows battery APIs / WMI                |                  None | Read         | Browser/native fallback |
| Network adapters    | Win32/WMI/CIM                             |                  None | Read         | Node network info       |
| Power status        | Windows power APIs                        |                  None | Read         | Informational           |
| Power operations    | Windows API                               | User/system dependent | Write        | Disabled                |
| Launch applications | Controlled process API                    |                  User | Write        | Disabled                |
| Filesystem          | Node filesystem through main process      |                  User | Read/write   | Disabled                |
| Registry            | Win32 registry API                        |                  User | Read         | Disabled writes         |
| Services            | SCM API                                   |    Admin for mutation | Read         | Informational           |
| Windows updates     | Windows APIs where practical              |                Varies | Read         | Informational           |
| System restore      | Windows API where supported               |                 Admin | Read/request | Informational           |
| Firewall            | Windows Firewall API                      |                 Admin | Read         | Disabled                |
| Terminal            | Controlled process spawn                  |                  User | Execute      | Disabled                |

## Rule

Never use a shell command where a safer native API exists.

Never invoke PowerShell merely because it is convenient.

---

# 22. WINDOWS SUPPORT

Primary:

```text
Windows 11 x64
Windows 11 ARM64
Windows 10 x64 where technically supported
```

ARM64 must not be falsely advertised as fully supported unless all native components support ARM64.

Unsupported features must be detected at runtime.

Display:

```text
Supported
Partially supported
Unavailable
Requires permission
Requires elevated privileges
Unsupported on this Windows version
```

---

# 23. FILESYSTEM SAFETY

Protected paths include, at minimum:

```text
C:\Windows
C:\Program Files
C:\Program Files (x86)
C:\ProgramData
C:\Windows\System32
C:\Windows\WinSxS
C:\Windows\Installer
C:\Users\<user>\AppData\Local\Microsoft
C:\Users\<user>\AppData\Roaming\Microsoft
WSL distributions
Docker data
OneDrive/cloud-synchronization roots
Visual Studio workspace/build storage
Git repositories unless explicitly selected
```

The application must not silently delete or modify these.

---

# 24. DESKTOP EXPERIENCE

Implement a unified desktop shell containing:

* wallpaper;
* desktop icons;
* taskbar/dock;
* Start/application launcher;
* system tray;
* clock;
* notifications;
* quick settings;
* widgets;
* universal search;
* command palette;
* window manager;
* workspaces;
* multi-monitor support;
* drag/drop;
* keyboard navigation.

---

# 25. HYBRID DESIGN LANGUAGE

The visual system should be approximately:

```text
Windows 11: 40%
macOS:      30%
Ubuntu/Linux: 30%
```

This is an **inspiration ratio**, not a literal cloning requirement.

## Windows-inspired

* taskbar;
* Start experience;
* snapping;
* Fluent-style depth;
* quick settings;
* system panels.

## macOS-inspired

* elegant spacing;
* dock behavior;
* workspace overview;
* restrained glass effects;
* polished transitions;
* high-quality typography.

## Ubuntu/Linux-inspired

* workspace concepts;
* application launcher;
* developer workflows;
* terminal-first capabilities;
* productivity-oriented desktop organization.

Do not copy:

* Apple logos;
* Windows logos;
* Ubuntu logos;
* proprietary sounds;
* proprietary wallpapers;
* proprietary icons;
* exact proprietary UI artwork;
* copyrighted source code.

---

# 26. WINDOW MANAGER

Every application window must have:

```text
id
applicationId
workspaceId
title
position
size
minimumSize
maximumSize
state
zIndex
focused
alwaysOnTop
resizable
movable
closable
minimizable
maximizable
```

States:

```text
NORMAL
MINIMIZED
MAXIMIZED
FULLSCREEN
SNAPPED_LEFT
SNAPPED_RIGHT
SNAPPED_TOP
SNAPPED_BOTTOM
TILED
```

Implement:

* focus;
* z-index;
* minimize;
* restore;
* maximize;
* close;
* resize;
* move;
* snap;
* tile;
* fullscreen;
* multi-window;
* workspace reassignment.

---

# 27. VIRTUAL WORKSPACES

Provide application-level workspaces.

Default:

```text
Workspace 1 — General
Workspace 2 — Development
Workspace 3 — Communication
Workspace 4 — Research
```

Users can:

* rename;
* create;
* delete;
* reorder;
* duplicate;
* assign applications;
* assign windows;
* configure wallpaper;
* configure workspace shortcuts.

Do not claim these are native Windows virtual desktops unless genuine Windows integration is implemented.

---

# 28. TASKBAR / DOCK

Support:

* pinned apps;
* running apps;
* active state;
* badges;
* context menus;
* drag/drop;
* application launch;
* workspace indicator;
* system tray;
* clock;
* notification indicator.

Offer settings for:

* position;
* size;
* auto-hide;
* transparency;
* animation;
* icon size;
* grouping.

---

# 29. START / APPLICATION LAUNCHER

Support:

* application search;
* recent applications;
* pinned applications;
* categories;
* recommended items;
* power controls;
* settings;
* user profile;
* search integration.

Power actions must be clearly separated from application actions.

Any actual shutdown/restart/sleep operation requires user confirmation.

---

# 30. UNIVERSAL SEARCH

Search:

* applications;
* commands;
* files;
* folders;
* notes;
* settings;
* workspaces;
* system information.

Ranking should consider:

```text
exact match
prefix match
recent usage
frequency
category relevance
keyword relevance
```

Never index sensitive content without user consent.

---

# 31. COMMAND PALETTE

Provide a keyboard-first command palette similar in concept to developer productivity tools.

Default:

```text
Ctrl + Shift + P
```

Allow user customization.

Commands must display:

* title;
* description;
* shortcut;
* category;
* required permission;
* current availability.

---

# 32. FILE EXPLORER

Provide:

* drives;
* folders;
* files;
* breadcrumbs;
* search;
* sorting;
* filtering;
* grid/list view;
* details view;
* context menus;
* create folder;
* rename;
* copy;
* move;
* delete;
* restore;
* properties.

Operations must use confirmation where destructive.

Never silently overwrite files.

Use safe conflict options:

```text
Replace
Keep Both
Skip
Cancel
```

---

# 33. NOTES APPLICATION

Support:

* create;
* edit;
* delete;
* pin;
* archive;
* search;
* tags;
* autosave;
* timestamps;
* offline editing;
* synchronization;
* conflict resolution.

Autosave must be resilient against application crashes.

---

# 34. TEXT EDITOR

Support:

* plain text;
* syntax highlighting;
* tabs;
* find/replace;
* line numbers;
* encoding detection;
* unsaved-change indicator;
* recovery;
* large-file safeguards.

Never load an extremely large file into memory without checking its size.

---

# 35. TERMINAL CENTER

Support controlled access to:

* PowerShell;
* Command Prompt;
* Git Bash;
* WSL where available.

Each shell must be explicitly detected.

Do not assume:

```text
bash = WSL
bash = Git Bash
```

They are separate environments.

Terminal execution must be clearly marked as an external process.

---

# 36. SYSTEM INFORMATION

Display:

* Windows version;
* architecture;
* CPU;
* RAM;
* storage;
* GPU;
* displays;
* network;
* battery;
* audio devices;
* processes;
* uptime;
* application version.

Read-only by default.

---

# 37. TASK MANAGER

Provide a process monitoring interface.

Display:

* process name;
* PID;
* CPU;
* memory;
* path where available;
* status;
* application classification.

Process termination:

* disabled by default;
* confirmation required;
* protected processes blocked;
* administrative requirements clearly shown.

---

# 38. SETTINGS / CONTROL CENTER

Sections:

```text
Appearance
Themes
Wallpaper
Animations
Sounds
Accessibility
Keyboard
Mouse
Touch
Workspaces
Taskbar
Applications
Notifications
Privacy
Security
Accounts
Authentication
Sync
Storage
Network
Audio
Displays
Performance
Developer
Terminal
Updates
Backup
Recovery
About
```

---

# 39. ADVANCED ANIMATION SYSTEM

The user specifically wants **very high-quality and advanced animation**, not careless maximum animation.

Implement:

* window open;
* window close;
* minimize;
* maximize;
* restore;
* snap;
* workspace transition;
* Start menu;
* launcher;
* notifications;
* dock hover;
* icon interaction;
* context menus;
* quick settings;
* command palette;
* page transitions;
* modal transitions;
* drag interactions;
* loading transitions;
* success/error feedback.

Animation levels:

```text
MINIMAL
BALANCED
ENHANCED
IMMERSIVE
```

### DEFAULT DECISION

Default to:

```text
BALANCED
```

Rationale: advanced visual quality without sacrificing usability, battery life, accessibility, or performance.

---

# 40. ANIMATION PERFORMANCE RULES

Never animate:

* layout-heavy properties unnecessarily;
* huge DOM trees;
* expensive blur regions continuously;
* large canvas effects continuously;
* high-frequency shadows;
* unnecessary full-screen filters.

Prefer:

```text
transform
opacity
GPU-compositor-friendly properties
```

Avoid unnecessary:

```text
top
left
width
height
```

animation.

---

# 41. COLOR EFFECT SYSTEM

Support:

* accent colors;
* dynamic accent;
* semantic colors;
* gradients;
* subtle glass;
* glow;
* depth;
* hover illumination;
* active-state emphasis;
* wallpaper-aware accents.

Effects must never reduce text readability.

Semantic colors:

```text
accent
background
surface
surface-elevated
text-primary
text-secondary
border
success
warning
danger
info
focus
disabled
```

---

# 42. SOUND EFFECT SYSTEM

Provide original or properly licensed sound assets.

Categories:

```text
UI
SYSTEM
NOTIFICATION
SUCCESS
WARNING
ERROR
WORKSPACE
APPLICATION
ACCESSIBILITY
```

Examples:

* application open;
* application close;
* notification;
* success;
* warning;
* error;
* workspace switch;
* file operation;
* login success;
* authentication failure.

Every sound must have visual feedback.

Users can control:

```text
Master volume
UI volume
Notification volume
System volume
Application volume
Workspace sounds
Accessibility sounds
Mute all
```

Respect Windows mute/volume state.

Do not use copyrighted operating-system sounds without appropriate licensing.

---

# 43. WALLPAPER SYSTEM

Support:

* static wallpapers;
* user-provided wallpapers;
* gradients;
* abstract generated artwork;
* animated backgrounds only when performance permits;
* per-workspace wallpaper.

Never ship copyrighted wallpapers without appropriate licensing.

---

# 44. THEMES

Required:

```text
System
Light
Dark
High Contrast
```

Optional:

```text
Midnight
Graphite
Aurora
Ocean
Forest
Solar
Ubuntu-inspired
Developer
Minimal
```

Themes must be token-based.

Do not hardcode colors throughout components.

---

# 45. ACCESSIBILITY

Target:

> **WCAG 2.2 AA**

Minimum requirements:

* keyboard-only operation;
* visible focus;
* semantic controls;
* screen-reader labels;
* accessible dialogs;
* accessible menus;
* accessible notifications;
* accessible forms;
* reduced motion;
* high contrast;
* scalable text;
* minimum touch/click target guidance.

Contrast:

* normal text: at least 4.5:1;
* large text: at least 3:1;
* important UI indicators: target 3:1 where WCAG requires it.

Screen-reader targets:

* Windows Narrator;
* NVDA;
* JAWS where practical.

Focus rules:

1. focus moves logically;
2. dialogs trap focus appropriately;
3. closing a dialog restores focus;
4. menus close predictably;
5. focus is never invisible;
6. keyboard navigation must not depend on mouse hover.

---

# 46. KEYBOARD SHORTCUTS

Provide a centralized shortcut registry.

Examples:

```text
Alt + Tab                 Window switching
Win/Ctrl + Space          Launcher
Ctrl + Shift + P          Command palette
Ctrl + Alt + Right        Next workspace
Ctrl + Alt + Left         Previous workspace
Ctrl + Shift + N          New folder where supported
Ctrl + S                  Save
Ctrl + F                  Find
Esc                       Close transient UI
```

Do not override critical Windows shortcuts unless explicitly supported and clearly documented.

Shortcut conflicts must be resolved by:

```text
Windows-reserved
Application-global
Application-local
User-customizable
```

---

# 47. INTERNATIONALIZATION

Required architecture:

```text
i18n/
  en-US
  ur-PK
```

### DEFAULT DECISION

Initial languages:

* English (US)
* Urdu (Pakistan)

Rationale: English provides the primary development baseline while Urdu provides useful local-language support.

Architecture must allow:

* Arabic;
* Hindi;
* French;
* German;
* Spanish;
* additional languages later.

Support:

* RTL;
* locale-aware dates;
* time zones;
* numbers;
* currencies;
* pluralization;
* localized error messages;
* font fallback.

Never concatenate translated strings incorrectly.

Use translation keys.

---

# 48. TIME AND DATE

Store timestamps as UTC.

Display according to user locale/time zone.

Support:

```text
12-hour
24-hour
automatic
```

System time zone changes must be detected safely.

---

# 49. AUTHENTICATION

Support:

### Local/server-backed authentication

Default:

> **DEFAULT DECISION:** Use server-backed authentication when a backend is configured, with secure local session persistence for offline use.

Authentication options:

* email/password;
* email verification;
* password reset;
* MFA;
* optional OAuth/OIDC;
* session management.

---

# 50. PASSWORD SECURITY

Never store plaintext passwords.

Use:

```text
Argon2id
```

with secure parameters selected according to current library recommendations.

Passwords must never appear in:

* logs;
* telemetry;
* exceptions;
* Git;
* `brain.md`;
* configuration files.

---

# 51. SESSION SECURITY

Use:

* short-lived access tokens;
* rotating refresh tokens;
* hashed refresh-token storage;
* revocation;
* expiration;
* device/session management.

Default:

```text
Access token: 15 minutes
Refresh token: 30 days
```

These are configurable server-side.

---

# 52. OFFLINE AUTHENTICATION

Offline authentication must not become an unrestricted security bypass.

Default behavior:

* previously authenticated trusted device;
* encrypted local session state;
* limited offline functionality;
* configurable offline grace period;
* reauthentication when security policy requires.

Sensitive operations require online authentication where appropriate.

---

# 53. RBAC

Default roles:

```text
User
PowerUser
Developer
Administrator
SuperAdministrator
```

Do not assume application Administrator equals Windows Administrator.

These are separate concepts.

Permission scopes:

```text
own
team
department
organization
system
```

Enforce permissions:

* UI;
* API;
* service layer;
* database where appropriate;
* native bridge.

Never rely only on frontend authorization.

---

# 54. MFA / OIDC

Architecture must support:

* TOTP MFA;
* recovery codes;
* optional security keys in future;
* OAuth/OIDC providers.

MFA secrets must be encrypted.

OIDC tokens must be validated correctly.

Never trust identity claims without issuer/audience/signature validation.

---

# 55. SECURITY THREAT MODEL

Threat categories:

```text
Malicious plugin
Compromised dependency
XSS
CSRF
CORS abuse
IPC injection
Command injection
Path traversal
Privilege escalation
Token theft
Credential theft
Database injection
File overwrite
Symlink attacks
DLL/EXE side-loading
Supply-chain attack
Malicious update
Log injection
Sensitive data leakage
Unauthorized telemetry
```

Each threat must have:

```text
Threat
Impact
Likelihood
Mitigation
Detection
Recovery
Residual Risk
```

Store the register in:

```text
docs/RISK_REGISTER.md
```

---

# 56. FILESYSTEM SECURITY

Reject:

```text
..
path traversal
UNC paths where unsafe
unexpected device paths
invalid control characters
```

Canonicalize paths before sensitive operations.

Use allowlists where appropriate.

Do not trust filenames supplied by users.

---

# 57. SUBPROCESS SECURITY

Every executable launch must use:

```text
explicit executable allowlist
explicit argument validation
no shell interpretation
shell: false
```

Never build:

```text
powershell -Command "<user input>"
```

Never concatenate user-controlled input into shell commands.

Do not download and execute remote scripts.

---

# 58. CSP / CORS / CSRF / XSS

Implement:

* strict Content Security Policy;
* no unsafe inline scripts where avoidable;
* strict CORS;
* CSRF protection where cookie authentication is used;
* output encoding;
* input validation;
* HTML sanitization;
* safe URL handling.

Never use:

```text
dangerouslySetInnerHTML
```

unless the content is sanitized by a trusted sanitizer.

---

# 59. ENCRYPTION

In transit:

```text
TLS 1.2+
```

Prefer:

```text
TLS 1.3
```

At rest:

* Windows DPAPI/Credential Manager for local secrets where appropriate;
* SQL Server encryption capabilities where deployed;
* encrypted sensitive local storage.

Do not invent custom cryptography.

---

# 60. TELEMETRY

### DEFAULT DECISION

Telemetry is:

> **OFF BY DEFAULT.**

If telemetry is implemented:

* explicit consent;
* privacy settings;
* minimal data;
* no passwords;
* no file contents;
* no personal document contents;
* no raw command lines;
* no secret values;
* transparent documentation;
* deletion/export support where applicable.

---

# 61. PRIVACY / GDPR / CCPA

Provide architecture for:

* data export;
* data deletion;
* account deletion;
* privacy preferences;
* telemetry consent;
* data retention.

The application must clearly identify:

```text
Local-only data
Synchronized data
Server data
Diagnostic data
Telemetry data
```

---

# 62. AUDIT LOGGING

Audit:

* login;
* logout;
* authentication failures;
* permission changes;
* file operations;
* plugin installation;
* plugin permission changes;
* privileged operations;
* security settings;
* account changes.

Never log secrets.

Default retention:

```text
90 days
```

### DEFAULT DECISION

90-day retention is the initial default because it provides useful diagnostics without indefinite accumulation.

Retention must be configurable.

---

# 63. PLUGIN SECURITY

Plugins must be treated as untrusted by default.

Permission request UI:

```text
Plugin:
[Name]

Requests:
[permissions]

Reason:
[description]

Allow
Deny
```

High-risk permissions:

```text
terminal.execute
filesystem.protected.write
network.write
process.control
registry.write
```

must never be granted silently.

---

# 64. ACCESSIBLE NOTIFICATIONS

Notification priorities:

```text
LOW
NORMAL
HIGH
CRITICAL
```

Rules:

* do not spam;
* group duplicates;
* respect quiet mode;
* respect accessibility preferences;
* provide visual and optional audio indication;
* do not use color alone.

---

# 65. USER PERSONAS

Primary personas:

### Persona A — Developer

Needs:

* terminal;
* Git;
* workspaces;
* application launcher;
* notes;
* project navigation;
* system monitoring.

### Persona B — Productivity User

Needs:

* files;
* notes;
* search;
* reminders/notifications;
* workspaces;
* customization.

### Persona C — Power User

Needs:

* system information;
* processes;
* devices;
* performance;
* shortcuts;
* advanced settings.

### Persona D — Administrator

Needs:

* diagnostics;
* audit;
* configuration;
* controlled system integration.

---

# 66. PRIMARY USER FLOWS

## Signup

```text
Launch
→ Signup
→ Validate fields
→ Create account
→ Verify email if configured
→ Create session
→ First-run onboarding
→ Desktop
```

## Login

```text
Launch
→ Login
→ Validate credentials
→ MFA if required
→ Create session
→ Restore workspace
→ Desktop
```

## First Run

```text
Welcome
→ Choose theme
→ Choose language
→ Choose animation level
→ Choose sound level
→ Accessibility setup
→ Workspace setup
→ Privacy settings
→ Finish
```

## File Operation

```text
Explorer
→ Select
→ Action
→ Permission check
→ Path validation
→ Confirmation if destructive
→ Execute
→ Update UI
→ Audit
→ Sync queue
```

## Sync

```text
Detect changes
→ Queue
→ Authenticate
→ Push
→ Pull
→ Detect conflict
→ Resolve
→ Confirm
→ Mark synchronized
```

## Recovery

```text
Detect failure
→ Preserve state
→ Attempt safe recovery
→ Restore previous session
→ Notify user
→ Offer diagnostic report
```

---

# 67. ONBOARDING

Onboarding must be skippable.

Do not overwhelm users.

Default first-run choices:

```text
Theme: System
Animations: Balanced
Sounds: UI + Notifications
Language: System
Workspace count: 4
Telemetry: Off
```

These are:

> **DEFAULT DECISION**

because they provide sensible behavior while minimizing aggressive changes.

---

# 68. EMPTY STATES

Every major screen requires:

* title;
* explanation;
* useful next action;
* optional help.

Example:

```text
No Notes Yet

Create your first note to start organizing ideas.

[Create Note]
```

---

# 69. LOADING STATES

Use:

* skeletons;
* progress indicators;
* optimistic UI only where safe;
* cancellation where possible.

Never show indefinite loading without explanation.

---

# 70. ERROR STATES

Errors must include:

```text
What happened
Why it happened when known
What the user can do
Retry
Cancel
Details
```

Technical details should be expandable.

---

# 71. RECOVERY

Support:

* unsaved document recovery;
* workspace recovery;
* application-state recovery;
* sync retry;
* crash-safe state persistence.

Never overwrite recovery data automatically without validation.

---

# 72. PERFORMANCE BUDGETS

These are engineering targets, not excuses to sacrifice correctness.

## Startup

Target:

```text
Cold startup: ≤ 3 seconds on recommended hardware
Warm startup: ≤ 1.5 seconds
```

## Idle memory

Target:

```text
≤ 500 MB
```

for the baseline shell on recommended hardware, excluding deliberately opened heavy applications.

## Idle CPU

Target:

```text
≤ 3% average CPU
```

during normal idle conditions.

## UI

Target:

```text
60 FPS
```

where the display supports it.

For 60 FPS:

```text
~16.67 ms/frame
```

Avoid sustained frame times above:

```text
33 ms
```

for normal UI interactions.

## Animation

Animations should feel smooth at:

```text
60 FPS minimum target
```

and adapt on lower-performance systems.

## Bundle

Avoid unnecessary dependencies.

Establish actual measured budgets during Phase 1 rather than pretending bundle size can be predicted before implementation.

---

# 73. PERFORMANCE MODES

Provide:

```text
Battery Saver
Performance
Balanced
Immersive
```

### DEFAULT DECISION

Balanced.

Performance mode may reduce:

* blur;
* shadows;
* background effects;
* animation complexity;
* sound effects;
* wallpaper animation.

---

# 74. MINIMUM HARDWARE

Initial target:

```text
CPU: modern x64 dual-core or better
RAM: 8 GB minimum
RAM: 16 GB recommended
Storage: SSD recommended
GPU: DirectX-capable integrated GPU
Display: 1280×720 minimum
```

For the best experience:

```text
16 GB RAM
modern 4+ core CPU
SSD
DirectX-capable GPU
1920×1080+
```

---

# 75. WEBVIEW2

Electron bundles its required Chromium runtime.

Do not independently depend on a user-installed WebView2 runtime unless a separate Windows component explicitly requires it.

If any feature requires WebView2:

* detect it;
* report requirement;
* provide safe installation guidance;
* never silently install it.

---

# 76. PACKAGING

Initial release:

> **DEFAULT DECISION:** Signed EXE installer using NSIS.

Support architecture for:

```text
Per-user installation
Per-machine installation
Portable mode
MSIX future support
```

Do not require administrator rights for per-user installation where possible.

---

# 77. CODE SIGNING

Production releases must use:

* trusted code-signing certificate;
* secure signing process;
* protected signing keys;
* timestamping.

Never commit:

```text
.pfx
.p12
private keys
passwords
tokens
```

to Git.

---

# 78. AUTO-UPDATE

Support architecture for:

```text
Stable
Beta
Canary
```

Update process:

```text
Check
→ Verify metadata
→ Verify signature
→ Download
→ Verify integrity
→ Stage
→ Install
→ Verify
→ Rollback if necessary
```

Never install unsigned or untrusted updates.

### DEFAULT DECISION

Auto-update is designed but must remain disabled until explicitly configured for a real release environment.

---

# 79. RELEASE CHANNELS

```text
CANARY
BETA
STABLE
```

Versioning:

```text
Semantic Versioning
MAJOR.MINOR.PATCH
```

Pre-release:

```text
1.2.0-beta.1
1.2.0-canary.1
```

---

# 80. UNINSTALLATION

Provide:

```text
Remove application only
Remove application + local data
Remove application + cached data
Preserve user documents
```

Never delete user documents silently.

Clearly explain what will be removed.

---

# 81. CI/CD

Pipeline stages:

```text
Checkout
→ Dependency integrity check
→ Lint
→ Typecheck
→ Unit tests
→ Security scan
→ Build
→ Package
→ Artifact verification
→ E2E
→ Accessibility
→ Visual regression
→ Sign
→ Release
```

Antigravity must not trigger production deployment without explicit approval.

---

# 82. SBOM

Generate:

```text
CycloneDX
```

or equivalent SBOM.

Track:

* package;
* version;
* license;
* source;
* vulnerability status.

---

# 83. THIRD-PARTY LICENSES

Maintain:

```text
docs/THIRD_PARTY_LICENSES.md
```

Track:

* dependency;
* version;
* license;
* attribution;
* usage;
* modifications.

Do not use dependencies with incompatible licenses without explicit review.

---

# 84. LEGAL & LICENSING

The project must contain placeholders/documentation for:

```text
LICENSE
TERMS_OF_SERVICE.md
PRIVACY_POLICY.md
THIRD_PARTY_LICENSES.md
ATTRIBUTIONS.md
```

### DEFAULT DECISION

Use an explicit proprietary/commercial-license placeholder until the owner selects the final license.

Do not assume the application is open source.

---

# 85. FONTS / ICONS / SOUNDS / WALLPAPERS

Every external asset must have:

```text
source
license
attribution requirement
modification permission
distribution permission
```

Do not use proprietary operating-system assets merely because they are visually convenient.

---

# 86. EXPORT COMPLIANCE

Maintain documentation identifying:

* cryptographic libraries;
* encryption features;
* third-party services;
* jurisdictional considerations.

Do not make unsupported legal claims.

---

# 87. DATA PROCESSING AGREEMENTS

If external processors are introduced, document:

* provider;
* data processed;
* purpose;
* retention;
* geographic location;
* security controls;
* deletion behavior.

---

# 88. UI DESIGN SYSTEM

Create:

```text
src/ui/
  tokens/
  components/
  primitives/
  layouts/
  overlays/
  motion/
  themes/
  accessibility/
```

Tokens include:

```text
spacing
radius
typography
elevation
motion
opacity
colors
z-index
breakpoints
```

No random values unless justified.

---

# 89. RESPONSIVE DESKTOP LAYOUT

Support:

* 1280×720;
* 1366×768;
* 1920×1080;
* 2560×1440;
* 3840×2160;
* multi-monitor configurations.

UI must not break at common DPI scaling levels.

Test:

```text
100%
125%
150%
175%
200%
```

---

# 90. HIGH-DPI / DISPLAY SUPPORT

Support:

* DPI scaling;
* mixed-DPI monitors;
* monitor changes;
* orientation changes;
* display disconnect/reconnect;
* fullscreen transitions.

---

# 91. MULTI-MONITOR

Support:

* monitor detection;
* primary display;
* window restoration;
* workspace placement;
* DPI-aware positioning;
* disconnected-monitor recovery.

Never restore a window outside the visible desktop.

---

# 92. NOTIFICATION CENTER

Support:

* categories;
* grouping;
* priority;
* timestamps;
* read/unread;
* actions;
* dismiss;
* quiet mode;
* sound preferences.

---

# 93. QUICK SETTINGS

Provide configurable controls for available capabilities such as:

* Wi-Fi status;
* Bluetooth status;
* volume;
* brightness where supported;
* battery;
* dark/light mode;
* performance mode;
* notifications;
* airplane-mode status where available.

Unavailable controls must be clearly marked.

Never fake a toggle.

---

# 94. WIDGETS

Widgets may include:

* clock;
* calendar;
* system performance;
* battery;
* storage;
* network;
* notes;
* workspace summary.

Widgets must be:

* removable;
* reorderable;
* resizable where practical;
* performance-conscious.

---

# 95. SYSTEM APPLICATIONS

Provide:

```text
File Explorer
Notes
Text Editor
Terminal
Calculator
Clock
Settings
Task Manager
System Information
Notification Center
Command Palette
Application Launcher
Performance Dashboard
```

Potential future applications:

```text
Paint
Device Manager
Disk Management
Services
Event Viewer
Registry Viewer
Network Center
Backup/Recovery
Security Center
Update Center
```

Only implement features to the extent they can be done honestly and safely.

---

# 96. SECURITY CENTER

Display:

* application security status;
* authentication status;
* session status;
* update status;
* plugin security;
* permission status;
* telemetry status.

Do not claim to replace Microsoft Defender or Windows Security.

---

# 97. DEVICE MANAGER

Initial implementation may be:

> INFORMATIONAL

Display available device information.

Do not claim to replace Device Manager unless genuine device-control functionality exists.

---

# 98. DISK MANAGEMENT

Initial implementation may be:

> INFORMATIONAL

Display:

* disks;
* partitions;
* volumes;
* capacity;
* free space.

Disk modifications require explicit authorization and should remain disabled unless fully engineered.

---

# 99. SERVICES

Initial implementation:

> INFORMATIONAL / READ-ONLY

Display:

* service;
* state;
* startup type;
* description.

Changing services requires explicit authorization and administrative privileges.

---

# 100. EVENT VIEWER

Support safe viewing of relevant application/system events where technically available.

Do not expose arbitrary privileged logs without authorization.

---

# 101. REGISTRY VIEWER

Default:

> READ-ONLY.

Never provide registry write functionality as an ordinary user action.

If registry editing is eventually implemented:

* explicit warning;
* backup;
* confirmation;
* elevation;
* allowlist;
* rollback.

---

# 102. BACKUP / RECOVERY

Support:

* application settings backup;
* workspace configuration backup;
* notes backup;
* export;
* restore.

Do not claim to provide full Windows system backup unless genuinely implemented.

---

# 103. CRASH RECOVERY

On crash:

* preserve safe state;
* recover windows;
* recover notes;
* preserve unsaved work where possible;
* produce diagnostics;
* never expose secrets in crash reports.

---

# 104. SYNC ARCHITECTURE

Use:

```text
Local First
→ Change Queue
→ Server Sync
→ Conflict Detection
→ Conflict Resolution
```

Sync states:

```text
LOCAL_ONLY
PENDING
SYNCING
SYNCED
CONFLICT
FAILED
OFFLINE
```

---

# 105. CONFLICT RESOLUTION

Default strategy:

```text
Detect
→ Preserve both versions
→ Inform user
→ Offer resolution
```

Never silently overwrite user data.

Possible strategies:

```text
Keep Local
Keep Server
Keep Both
Merge
Cancel
```

---

# 106. OFFLINE MODE

The application must remain useful when the backend is unavailable.

Offline-capable:

* notes;
* local files;
* workspaces;
* settings;
* application registry;
* local search;
* UI configuration.

Online-required:

* server account creation;
* remote sync;
* account security operations;
* server-only data.

---

# 107. SEARCH INDEXING PRIVACY

Do not index:

* passwords;
* authentication tokens;
* private keys;
* sensitive system secrets.

Allow users to exclude:

* folders;
* file extensions;
* applications;
* notes.

---

# 108. DEFAULT SETTINGS

```text
Theme = System
Animation = Balanced
Performance = Balanced
Sounds = Enabled
Telemetry = Disabled
Auto-update = Disabled until configured
Notifications = Normal
High-contrast = System
Reduced-motion = System preference
Workspace count = 4
Offline mode = Enabled
```

These are:

> **DEFAULT DECISION**

because they provide conservative, accessible defaults.

---

# 109. BRAIN.MD — MANDATORY ENGINEERING MEMORY

Create:

```text
/brain.md
```

at repository root.

This is mandatory.

It must be updated after every meaningful implementation unit.

It must contain:

```text
# Project Identity
# Product Vision
# Current Project Status
# Current Phase
# Current Task
# Current Architecture
# Technology Stack
# Directory Structure
# Implemented Features
# Features In Progress
# Features Not Implemented
# Future Features
# Unsupported Features
# Capability Matrix Summary
# Windows Integration Status
# Desktop Shell Status
# Window Manager Status
# Workspace Status
# Application Registry Status
# Authentication Architecture
# Authorization Architecture
# Database Architecture
# Database Migration Status
# API Architecture
# Offline Architecture
# Synchronization Architecture
# Conflict Resolution
# UI/UX Architecture
# Design System
# Theme System
# Animation System
# Sound System
# Accessibility System
# Internationalization
# Security Decisions
# Performance Decisions
# Important Constraints
# Things That Must NOT Be Changed
# Known Bugs
# Resolved Bugs
# Failed Approaches
# Decisions and Reasons
# Assumptions
# Technical Debt
# Testing Status
# Performance Findings
# Security Findings
# Git Development History Summary
# Remaining Work
# Last Completed Task
# Last Git Commit
# Next Recommended Task
# Last Updated
```

Do not put secrets in `brain.md`.

Do not turn `brain.md` into a copy of this prompt.

It is an engineering memory, not a specification dump.

---

# 110. ASSUMPTIONS REGISTER

Maintain:

```text
docs/ASSUMPTIONS.md
```

Every non-trivial assumption must contain:

```text
ID:
Date:
Assumption:
Reason:
Impact:
Risk:
Validation Method:
Status:
```

Example:

```text
ASM-001

Assumption:
SQLite will be the local persistence layer.

Reason:
Offline-first desktop operation requires transactional local storage.

Impact:
Local data layer is designed around SQLite.

Risk:
Medium.

Validation:
Benchmark startup, query performance, and migration behavior.

Status:
Accepted.
```

---

# 111. DECISION LOG

Maintain:

```text
docs/DECISIONS.md
```

Format:

```text
Decision ID:
Date:
Decision:
Context:
Options:
Chosen Option:
Reason:
Consequences:
Reversible:
Approval Required:
Status:
```

---

# 112. IMPLEMENTATION STATUS

Maintain:

```text
docs/IMPLEMENTATION_STATUS.md
```

Statuses:

```text
NOT_STARTED
PLANNED
IN_PROGRESS
IMPLEMENTED
TESTED
PARTIALLY_IMPLEMENTED
BLOCKED
UNSUPPORTED
FUTURE
```

Never mark something `IMPLEMENTED` merely because a UI exists.

---

# 113. CHANGELOG

Maintain:

```text
docs/CHANGELOG.md
```

Use Keep-a-Changelog-style organization:

```text
Added
Changed
Fixed
Security
Performance
Deprecated
Removed
```

---

# 114. DEFINITION OF DONE

A feature is complete only when:

* implementation exists;
* architecture is documented;
* contracts exist;
* validation exists;
* errors are handled;
* security is reviewed;
* accessibility is considered;
* performance is considered;
* tests exist where appropriate;
* documentation is updated;
* capability classification is updated;
* `brain.md` is updated;
* `IMPLEMENTATION_STATUS.md` is updated;
* Git diff is reviewed;
* secrets are checked;
* a meaningful Git commit is created.

---

# 115. GIT DEVELOPMENT POLICY

Git is mandatory.

## After every meaningful implementation unit:

```text
Inspect status
→ Inspect diff
→ Review files
→ Check secrets
→ Validate
→ Update documentation
→ Commit
```

Every meaningful implementation must result in a Git commit.

Examples:

```text
feat(shell): implement desktop shell
feat(window-manager): add window lifecycle
feat(workspaces): implement workspace state
feat(auth): implement session architecture
feat(notes): add notes persistence
feat(sync): implement offline queue
feat(native): add system information bridge
feat(ui): implement theme system
feat(motion): add workspace transitions
feat(sound): add notification sound engine
test(shell): add desktop shell tests
fix(auth): prevent refresh token reuse
docs(brain): update engineering memory
```

---

# 116. GIT SAFETY

Never:

```text
git reset --hard
git clean -fd
git push --force
git rebase shared history
delete remote branches
overwrite unrelated user changes
```

unless explicitly authorized.

Never commit:

```text
.env
.env.local
credentials
API keys
private keys
passwords
certificates
tokens
database secrets
```

unless they are explicitly documented non-secret examples.

---

# 117. BRANCHING

Default:

```text
main
feature/*
fix/*
security/*
docs/*
```

Use feature branches for meaningful isolated work.

Do not create dozens of unnecessary branches for trivial changes.

---

# 118. COMMIT GRANULARITY

A commit should represent a coherent implementation unit.

Bad:

```text
feat: update everything
```

Good:

```text
feat(shell): establish desktop shell architecture
feat(window-manager): implement window state machine
feat(workspaces): persist workspace configuration
```

---

# 119. BRANCH PROTECTION

For a production repository, recommend:

* protected main branch;
* required review;
* required CI;
* signed commits where practical;
* no force pushes;
* status checks;
* security scanning.

Do not configure remote branch protection without explicit authorization.

---

# 120. COMMIT SIGNING

### DEFAULT DECISION

Support commit signing documentation, but do not create or access signing keys automatically.

Never generate or store a user's private signing key without explicit instruction.

---

# 121. DESIGN DOCUMENTATION

Maintain:

```text
docs/
  ARCHITECTURE.md
  CAPABILITY_MATRIX.md
  SECURITY.md
  THREAT_MODEL.md
  PERFORMANCE.md
  ACCESSIBILITY.md
  INTERNATIONALIZATION.md
  MOTION.md
  SOUND.md
  THEMES.md
  WINDOWS_INTEGRATION.md
  API.md
  DATABASE.md
  TESTING.md
  RELEASE.md
  INSTALLATION.md
  PRIVACY.md
  THIRD_PARTY_LICENSES.md
  ASSUMPTIONS.md
  DECISIONS.md
  IMPLEMENTATION_STATUS.md
  CHANGELOG.md
  RISK_REGISTER.md
```

---

# 122. PROJECT STRUCTURE

Recommended:

```text
project/
│
├── apps/
│   ├── desktop/
│   │   ├── electron/
│   │   ├── preload/
│   │   └── renderer/
│   │
│   └── server/
│
├── packages/
│   ├── contracts/
│   ├── ui/
│   ├── config/
│   ├── validation/
│   ├── database/
│   ├── security/
│   └── utilities/
│
├── native/
│   └── windows/
│
├── scripts/
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schemas/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   ├── accessibility/
│   ├── visual/
│   └── security/
│
├── assets/
│   ├── icons/
│   ├── sounds/
│   ├── wallpapers/
│   └── fonts/
│
├── docs/
│
├── brain.md
├── README.md
├── LICENSE
├── TERMS_OF_SERVICE.md
├── PRIVACY_POLICY.md
├── package.json
└── .gitignore
```

Adapt this structure to the existing repository rather than destroying a functioning project.

---

# 123. EXISTING PROJECT RULE

Before changing anything:

1. inspect repository;
2. inspect package files;
3. inspect source structure;
4. inspect existing configuration;
5. inspect Git status;
6. inspect existing documentation;
7. inspect existing database files;
8. inspect existing tests;
9. identify working functionality;
10. identify broken functionality;
11. identify architectural debt;
12. update `brain.md`.

Do not blindly regenerate the project.

Do not replace working code merely because another architecture looks cleaner.

---

# 124. NO UNNECESSARY REWRITES

Preserve working functionality.

If refactoring is necessary:

```text
Existing
→ Compatibility plan
→ Migration
→ Validation
→ Remove old code
```

Do not perform massive rewrites without documenting why.

---

# 125. PHASED IMPLEMENTATION

## Phase 0 — Discovery

Deliver:

* repository analysis;
* architecture analysis;
* risk analysis;
* capability inventory;
* technology decision matrix;
* assumptions register;
* initial `brain.md`;
* implementation roadmap.

Do not execute the application.

---

## Phase 1 — Architecture

Implement/document:

* repository structure;
* contracts;
* configuration;
* security boundaries;
* database architecture;
* IPC architecture;
* native bridge architecture.

Exit criteria:

* architecture documented;
* no unresolved critical contradiction;
* security boundaries defined.

---

## Phase 2 — Design System

Implement:

* tokens;
* typography;
* themes;
* colors;
* accessibility primitives;
* motion system;
* sound system;
* UI primitives.

Exit criteria:

* reusable design system;
* accessible components;
* no random styling architecture.

---

## Phase 3 — Desktop Shell

Implement:

* desktop;
* wallpaper;
* taskbar/dock;
* Start;
* system tray;
* notifications;
* quick settings.

Exit criteria:

* shell state model;
* keyboard support;
* accessibility;
* responsive desktop layout.

---

## Phase 4 — Window Manager

Implement:

* window state;
* focus;
* z-index;
* resize;
* move;
* minimize;
* maximize;
* restore;
* snap.

Exit criteria:

* deterministic window behavior;
* tests for state transitions.

---

## Phase 5 — Workspaces

Implement:

* workspace creation;
* deletion;
* switching;
* assignment;
* persistence;
* shortcuts.

Exit criteria:

* workspace state survives restart after authorized testing.

---

## Phase 6 — Application System

Implement:

* registry;
* manifests;
* lifecycle;
* launcher;
* command palette;
* app permissions.

---

## Phase 7 — Storage

Implement:

* local database;
* file management;
* notes;
* text editor;
* recovery.

---

## Phase 8 — Authentication

Implement:

* signup;
* login;
* sessions;
* email verification architecture;
* password reset;
* MFA architecture;
* RBAC.

---

## Phase 9 — Database

Implement:

* SQL schema;
* migrations;
* indexes;
* constraints;
* seed strategy.

Do not execute migrations without authorization.

---

## Phase 10 — API

Implement:

* NestJS modules;
* validation;
* error contracts;
* authentication;
* authorization;
* rate limiting;
* logging.

---

## Phase 11 — Offline / Sync

Implement:

* queue;
* sync states;
* conflict detection;
* conflict resolution;
* retry behavior.

---

## Phase 12 — Windows Integration

Implement read-only capabilities first:

* system;
* processes;
* displays;
* audio;
* battery;
* network;
* filesystem.

Then carefully evaluate writable capabilities.

---

## Phase 13 — System Applications

Implement:

* Task Manager;
* System Information;
* Settings;
* Terminal;
* Calculator;
* Clock;
* Performance Dashboard;
* Notifications.

---

## Phase 14 — Visual Polish

Implement:

* advanced animations;
* color effects;
* sound effects;
* wallpapers;
* transitions;
* microinteractions;
* accessibility polish.

Do not sacrifice performance.

---

## Phase 15 — Testing

Implement:

* unit;
* integration;
* security;
* accessibility;
* visual;
* performance;
* E2E architecture.

Execute only tests permitted by the Test Execution Authorization Gate.

---

## Phase 16 — Release Readiness

Review:

* security;
* licensing;
* packaging;
* signing;
* update system;
* rollback;
* accessibility;
* performance;
* documentation;
* Git cleanliness.

Do not publish or deploy without authorization.

---

# 126. TEST STRATEGY

## Unit Coverage Target

### DEFAULT DECISION

Target:

```text
≥ 80% meaningful business-logic coverage
```

Do not inflate coverage with meaningless tests.

Prioritize:

* security;
* authentication;
* authorization;
* filesystem validation;
* synchronization;
* conflict resolution;
* state machines;
* command registry;
* permission checks.

---

# 127. INTEGRATION TESTS

Test:

* API contracts;
* database repositories;
* authentication;
* sync;
* permission enforcement;
* IPC validation.

Use isolated test environments.

Never connect tests to production databases.

---

# 128. E2E TESTS

Use Playwright or equivalent.

Cover:

```text
signup
login
first run
desktop
launcher
application launch
window lifecycle
workspace switching
notes
file operations
settings
notifications
logout
recovery
```

E2E execution requires explicit authorization if it launches the application.

---

# 129. VISUAL REGRESSION

Capture screenshots for:

* light theme;
* dark theme;
* high contrast;
* launcher;
* desktop;
* settings;
* notes;
* file explorer;
* notifications;
* workspace overview.

Check:

* layout;
* typography;
* overflow;
* contrast;
* alignment;
* animation end states.

---

# 130. ACCESSIBILITY TESTING

Use:

* axe-core;
* keyboard-only tests;
* screen-reader smoke testing;
* focus-order testing;
* high-contrast testing;
* reduced-motion testing;
* zoom testing.

---

# 131. SECURITY TESTING

Test:

* XSS;
* path traversal;
* command injection;
* IPC injection;
* privilege bypass;
* authorization bypass;
* token replay;
* refresh-token reuse;
* plugin permission bypass;
* malicious filenames;
* malformed IPC payloads.

---

# 132. PERFORMANCE TESTING

Measure:

* startup;
* memory;
* CPU;
* frame time;
* animation smoothness;
* search latency;
* filesystem operation latency;
* sync throughput.

Do not fabricate performance numbers.

---

# 133. PHASE EXIT CRITERIA

Every phase must satisfy:

```text
Implementation complete
Documentation complete
Tests created
Known limitations documented
Security reviewed
Accessibility considered
Performance considered
brain.md updated
Implementation status updated
Git diff reviewed
Git commit created
```

---

# 134. RISK REGISTER

Every major risk must have:

```text
Risk ID
Description
Likelihood
Impact
Severity
Mitigation
Owner
Status
Contingency
```

Critical unresolved risks block release readiness.

---

# 135. RELEASE APPROVAL GATES

Explicit approval required before:

```text
production database migration
production deployment
installer publication
auto-update activation
system-level installer testing
code-signing release
telemetry activation
remote release upload
Windows system modification
```

---

# 136. DANGEROUS OPERATION GATE

Any operation involving:

* deletion;
* privilege escalation;
* Windows modification;
* service creation;
* Registry modification;
* firewall changes;
* scheduled tasks;
* startup persistence;
* database destruction;
* external upload;
* installation;
* execution of unknown code;

must stop and request approval.

---

# 137. DO NOT INVENT FUNCTIONALITY

Never write:

```text
"Windows Firewall successfully configured"
```

if the app only displays a simulated interface.

Never write:

```text
"System Restore completed"
```

unless it genuinely completed.

Never write:

```text
"Process terminated"
```

unless the native operation succeeded.

Use honest statuses:

```text
SIMULATED
INFORMATIONAL
UNAVAILABLE
UNSUPPORTED
REQUIRES ADMINISTRATOR
REQUIRES USER AUTHORIZATION
FAILED
SUCCESS
```

---

# 138. NO FAKE BACKEND

Do not create:

```text
fake API success
fake authentication
fake database records
fake sync
fake system state
```

for production functionality.

Mocks are permitted only inside controlled tests.

---

# 139. NO HARDCODED SECRETS

Never hardcode:

* passwords;
* API keys;
* JWT secrets;
* database passwords;
* OAuth secrets;
* signing keys.

Use environment configuration and secure secret storage.

---

# 140. CONFIGURATION

Use:

```text
.env.example
```

with placeholders only.

Example:

```env
NODE_ENV=development
API_PORT=3000
DATABASE_URL=
SQL_SERVER_HOST=
SQL_SERVER_DATABASE=
SQL_SERVER_USER=
SQL_SERVER_PASSWORD=
JWT_SECRET=
```

Never commit real `.env`.

---

# 141. DATABASE DEPLOYMENT MODEL

Support:

```text
Local SQL Server
Remote SQL Server
```

### DEFAULT DECISION

Development should support:

```text
Local SQL Server Developer/Express where available
```

Production should support:

```text
Remote SQL Server
```

The application must not assume SQL Server is always running locally.

---

# 142. PYTHON POLICY

Python is not a mandatory runtime dependency.

Use Python only when it provides a clear advantage for:

* offline data processing;
* specialized utilities;
* analysis;
* asset processing;
* development tooling.

Do not create a Python dependency merely because Python is available.

---

# 143. BASH POLICY

Bash may be used for developer workflows:

* Git Bash;
* WSL.

Always identify the environment.

Never assume Bash means WSL.

---

# 144. NATIVE BRIDGE POLICY

Native operations must live behind a narrow abstraction:

```text
NativeCapabilities
SystemInfo
ProcessService
DisplayService
AudioService
BatteryService
NetworkService
PowerService
FilesystemService
ApplicationLauncher
```

The renderer must never call native Windows APIs directly.

---

# 145. CAPABILITY DETECTION

At startup, determine supported capabilities.

Example:

```json
{
  "systemInfo": {
    "supported": true
  },
  "processControl": {
    "supported": true,
    "requiresElevation": true
  },
  "battery": {
    "supported": false
  }
}
```

The UI must react to capability availability.

---

# 146. STATE MACHINES

Use explicit state machines for:

* authentication;
* application lifecycle;
* windows;
* workspaces;
* synchronization;
* update lifecycle;
* file operations;
* notifications.

Avoid scattered boolean flags when state transitions become complex.

---

# 147. OBSERVABILITY

Provide structured logs:

```text
DEBUG
INFO
WARN
ERROR
SECURITY
AUDIT
```

Use correlation IDs.

Never log:

* passwords;
* tokens;
* private keys;
* sensitive file contents.

---

# 148. DIAGNOSTICS

Provide a diagnostic export containing:

* app version;
* OS version;
* architecture;
* enabled capabilities;
* performance summary;
* recent non-sensitive errors;
* configuration summary.

Allow users to review the report before exporting.

---

# 149. HELP SYSTEM

Provide:

* contextual help;
* keyboard shortcut reference;
* feature explanations;
* permission explanations;
* troubleshooting;
* diagnostic guidance.

Avoid unnecessary technical jargon for ordinary users.

---

# 150. CONTENT PRINCIPLES

UI copy must be:

* concise;
* clear;
* respectful;
* actionable;
* non-alarming unless necessary.

Do not use fake marketing claims such as:

```text
"Ultimate AI-powered revolutionary operating system"
```

The product should communicate what it actually does.

---

# 151. UI QUALITY RULES

Avoid:

* excessive gradients;
* excessive glowing;
* oversized rounded cards everywhere;
* excessive glassmorphism;
* constant animation;
* low-contrast text;
* fake 3D effects;
* unnecessary visual noise.

Use visual effects intentionally.

The result should feel:

```text
Premium
Professional
Modern
Fast
Calm
Technical
Cohesive
```

---

# 152. ANIMATION QUALITY RULES

Animation should communicate:

* hierarchy;
* continuity;
* cause/effect;
* focus;
* state changes.

Never animate merely because animation is possible.

---

# 153. SOUND QUALITY RULES

Sound must be:

* subtle;
* short;
* consistent;
* optional;
* accessible;
* original or licensed.

Never create an annoying soundscape.

---

# 154. DESIGN INSPIRATION MATRIX

| Source         | Borrow                                   | Do Not Copy               |
| -------------- | ---------------------------------------- | ------------------------- |
| Windows 11     | Start, snapping, taskbar concepts, depth | Microsoft branding/assets |
| macOS          | Dock, spacing, workspace polish          | Apple branding/assets     |
| Ubuntu/Linux   | workspace/developer concepts             | Ubuntu branding/assets    |
| Developer IDEs | command palette, keyboard workflows      | proprietary artwork       |

---

# 155. DOCUMENTATION QUALITY

Every major architectural decision must be documented.

Documentation must explain:

```text
What
Why
How
Limitations
Security implications
Performance implications
Future migration path
```

---

# 156. BUILD ORDER

Do not attempt to implement every feature simultaneously.

Use vertical slices.

Recommended first slice:

```text
Desktop Shell
+
Window Manager
+
Application Registry
+
Notes
+
Settings
+
Local Persistence
```

Then progressively integrate backend, authentication, synchronization, and Windows capabilities.

---

# 157. IMPLEMENTATION LOOP

For every meaningful task, execute this logical workflow:

```text
1. READ
2. INSPECT
3. UNDERSTAND
4. CHECK brain.md
5. CHECK IMPLEMENTATION_STATUS.md
6. CHECK ASSUMPTIONS
7. CHECK DECISIONS
8. PLAN
9. IMPLEMENT
10. VALIDATE STATICALLY
11. RUN ONLY AUTHORIZED TESTS
12. SECURITY REVIEW
13. ACCESSIBILITY REVIEW
14. PERFORMANCE REVIEW
15. UPDATE DOCUMENTATION
16. UPDATE brain.md
17. UPDATE IMPLEMENTATION_STATUS.md
18. UPDATE CHANGELOG.md if appropriate
19. REVIEW Git diff
20. CHECK FOR SECRETS
21. CREATE MEANINGFUL GIT COMMIT
22. RECORD COMMIT IN brain.md
23. CONTINUE TO NEXT SAFE TASK
```

---

# 158. DO NOT WAIT FOR ANOTHER PROMPT FOR LOW-RISK WORK

If a reasonable implementation decision is covered by:

* this master prompt;
* the Decision Authority Matrix;
* an accepted assumption;
* an existing architectural decision;

proceed without asking.

Do not repeatedly ask:

> "What should I implement next?"

Determine the next safe task from:

```text
brain.md
IMPLEMENTATION_STATUS.md
remaining phase work
dependency order
risk
```

---

# 159. WHEN TO STOP AND ASK

Stop only when:

* explicit approval is required;
* requirements genuinely conflict;
* a destructive decision is unavoidable;
* security policy requires user choice;
* legal/licensing approval is required;
* credentials are required;
* a production decision is required;
* multiple high-risk architectural options exist without a safe default.

For low-risk decisions, use the documented defaults.

---

# 160. FINAL REVIEW

Before declaring the project complete, verify:

## Architecture

* [ ] layered architecture
* [ ] secure IPC
* [ ] native isolation
* [ ] database architecture
* [ ] API contracts

## Functionality

* [ ] desktop
* [ ] taskbar/dock
* [ ] Start
* [ ] search
* [ ] command palette
* [ ] windows
* [ ] workspaces
* [ ] applications
* [ ] files
* [ ] notes
* [ ] settings
* [ ] notifications
* [ ] system information

## Security

* [ ] authentication
* [ ] authorization
* [ ] secure tokens
* [ ] IPC validation
* [ ] path validation
* [ ] subprocess allowlist
* [ ] CSP
* [ ] CORS
* [ ] CSRF
* [ ] XSS protection
* [ ] plugin permissions
* [ ] audit logging
* [ ] secrets management

## UX

* [ ] keyboard navigation
* [ ] accessibility
* [ ] themes
* [ ] animations
* [ ] sounds
* [ ] reduced motion
* [ ] high contrast
* [ ] responsive desktop layouts
* [ ] high DPI

## Engineering

* [ ] tests
* [ ] documentation
* [ ] brain.md
* [ ] assumptions
* [ ] decisions
* [risk register
* [ ] implementation status
* [ ] changelog
* [ ] Git history
* [ ] no secrets
* [ ] clean repository

---

# 161. FINAL ENGINEERING REPORT

At the end of the current authorized implementation phase, provide:

```text
Implementation Summary
Completed Features
Partially Completed Features
Unsupported Features
Known Limitations
Security Review
Accessibility Review
Performance Review
Test Results
Git Commits Created
Documentation Updated
Database Status
Windows Integration Status
Remaining Work
Required User Approvals
Recommended Next Task
Execution Status
```

---

# 162. FINAL EXECUTION STATUS

Always clearly report:

```text
APPLICATION EXECUTED: NO
DEV SERVER STARTED: NO
DEPENDENCIES INSTALLED: NO
DATABASE MIGRATIONS EXECUTED: NO
WINDOWS MODIFICATIONS PERFORMED: NO
ELEVATION REQUESTED: NO
PRODUCTION DEPLOYMENT PERFORMED: NO
```

If any operation was explicitly authorized and performed, report it accurately.

Never claim otherwise.

---

# 163. FINAL STOP CONDITION

After completing all currently authorized work:

1. save files;
2. validate static code;
3. update documentation;
4. update `brain.md`;
5. update implementation status;
6. inspect Git diff;
7. check for secrets;
8. create the required meaningful Git commit;
9. report what was completed;
10. stop.

Do not launch the application automatically.

Do not start servers automatically.

Do not install dependencies automatically.

Do not perform migrations automatically.

Do not modify Windows automatically.

Wait for explicit authorization before those actions.

---

# 164. MASTER PRODUCT VISION

The final product should feel like a carefully engineered desktop environment combining:

**Windows 11**
for familiarity and desktop interaction,

**macOS**
for polish, spacing, animation quality, and workspace ergonomics,

**Ubuntu/Linux**
for developer workflows, workspace concepts, terminal integration, and technical flexibility.

It must be:

```text
Production-oriented
Secure
Transparent
Reversible
Accessible
Fast
Beautiful
Extensible
Maintainable
Offline-capable
Windows-aware
Developer-friendly
```

But above all:

> **DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.**

Do not invent functionality.

Do not silently execute dangerous operations.

Do not pretend simulated functionality is native.

Do not destroy existing working code.

Do not expose secrets.

Do not bypass security controls.

Do not install or execute anything without authorization.

Do not leave meaningful implementation work uncommitted.

Use `brain.md` to maintain engineering memory.

Use the Decision Authority Matrix to make safe decisions without unnecessary questions.

Use the Assumptions Register to make assumptions visible.

Use the capability model to maintain technical honesty.

Use Git after every meaningful implementation unit.

Build the product incrementally and professionally.

**Begin with Phase 0 — Discovery.**

Do not launch the application.

Do not start a development server.

Do not install dependencies.

Do not execute migrations.

Do not modify Windows.

Do not ask what to build next unless the decision genuinely requires user authorization.

Proceed with safe, documented, reversible repository work.

---

# REVISION NOTES

## 1. Technology Architecture

The previous architecture allowed Electron/Tauri, Express/Fastify/NestJS, and several persistence choices. This revision establishes concrete defaults:

* Electron
* React + TypeScript
* Zustand
* NestJS + Fastify
* SQLite for local persistence
* SQL Server for centralized persistence
* typed Electron IPC
* isolated native bridge

This removes ambiguity while preserving alternative paths where migration remains realistic.

## 2. Test Execution Contradiction Resolved

The previous requirement to build tests while also prohibiting execution could be interpreted inconsistently.

This revision introduces the explicit **Test Execution Authorization Gate**.

Static validation and safe isolated tests may proceed.

Application launches, E2E tests, migrations, dependency installation, server startup, and system integration require explicit approval.

## 3. Decision Authority Added

Antigravity is now explicitly allowed to make low-risk reversible engineering decisions without repeatedly asking the user.

High-risk, destructive, system-modifying, security-sensitive, legal, credential-related, and production decisions require approval.

## 4. Assumptions Register Added

A dedicated:

```text
docs/ASSUMPTIONS.md
```

was added so assumptions are visible rather than silently embedded in implementation.

## 5. Decision Log Added

A dedicated:

```text
docs/DECISIONS.md
```

was added to distinguish architectural decisions from assumptions.

## 6. Data Contracts Expanded

The revision adds:

* SQL schema;
* API endpoint catalog;
* API response contracts;
* event contracts;
* application manifests;
* command registry;
* permission schema;
* plugin manifest;
* IPC contracts;
* error codes.

## 7. Authentication Expanded

The revision explicitly defines:

* local/server-backed authentication;
* session lifecycle;
* refresh-token rotation;
* revocation;
* password reset;
* email verification;
* MFA;
* OAuth/OIDC architecture;
* RBAC;
* offline authentication boundaries.

## 8. Windows Integration Expanded

A Windows Integration API Matrix now specifies:

* preferred technology;
* privilege requirements;
* read/write classification;
* fallback;
* unsupported behavior.

This prevents Antigravity from implementing arbitrary PowerShell commands simply because they are convenient.

## 9. Security Expanded

The revision adds:

* threat modeling;
* plugin isolation;
* subprocess allowlists;
* argument validation;
* IPC validation;
* encryption;
* CSP;
* CORS;
* CSRF;
* XSS controls;
* audit retention;
* telemetry policy;
* privacy controls;
* SBOM;
* license tracking.

## 10. Accessibility Made Measurable

Accessibility is now explicitly based on:

> WCAG 2.2 AA

with measurable contrast targets, screen-reader targets, focus rules, reduced-motion behavior, keyboard requirements, and scalable UI requirements.

## 11. Internationalization Added

The architecture now includes English and Urdu initially, with RTL and future-language support built into the design rather than added later.

## 12. Performance Budgets Added

The revision introduces measurable engineering targets for:

* startup;
* memory;
* CPU;
* frame rate;
* animation frame time.

These are treated as engineering targets rather than fabricated guarantees.

## 13. Packaging and Release Engineering Added

The revision specifies:

* signed EXE/NSIS as the initial installer;
* per-user installation;
* future MSIX support;
* release channels;
* semantic versioning;
* update verification;
* rollback;
* code signing;
* SBOM;
* CI/CD.

## 14. Legal and Licensing Added

The revision explicitly covers:

* application licensing;
* fonts;
* icons;
* sounds;
* wallpapers;
* third-party dependencies;
* attribution;
* privacy policy;
* terms;
* data processing;
* export-compliance considerations.

## 15. Git Requirement Strengthened

The user's requirement that every meaningful implementation be committed has been made a mandatory engineering rule.

The implementation loop now explicitly requires:

```text
IMPLEMENT
→ VALIDATE
→ DOCUMENT
→ UPDATE brain.md
→ REVIEW DIFF
→ CHECK SECRETS
→ COMMIT
→ RECORD COMMIT
```

## 16. `brain.md` Expanded

`brain.md` remains the persistent engineering memory and now records:

* implementation state;
* architecture;
* decisions;
* assumptions;
* security;
* performance;
* testing;
* Git history;
* remaining work.

It must not become a duplicate of the master prompt.

## 17. Animation Requirement Clarified

The original request for very high animations has been preserved as:

> **very high-quality, advanced animations**

rather than indiscriminately maximizing animation.

The product now supports:

```text
Minimal
Balanced
Enhanced
Immersive
```

plus performance-aware behavior and reduced-motion support.

## 18. Sound System Expanded

A centralized sound architecture was added with:

* categories;
* volume controls;
* accessibility behavior;
* licensing requirements;
* visual equivalents;
* workspace/application/system events.

## 19. Capability Honesty Strengthened

The REAL / WINDOWS-INTEGRATED / APPLICATION-SIMULATED / INFORMATIONAL / FUTURE / UNSUPPORTED classification is now required throughout the product.

This prevents the application from pretending to replace actual Windows components when it only provides a visual or informational equivalent.

## 20. Existing Project Preservation Strengthened

Antigravity must inspect the existing repository before changing it and must not blindly regenerate working code.

This is especially important if the master prompt is used against an already-developed project.

## 21. Release and Destructive Operation Gates Added

Production deployment, database migrations, Windows modifications, installer execution, signing, telemetry activation, and other high-impact operations now have explicit approval gates.

## 22. Sensible Defaults Added

The revision explicitly establishes defaults for:

* theme;
* animation;
* sound;
* telemetry;
* update behavior;
* workspaces;
* local persistence;
* authentication;
* SQL Server deployment;
* language;
* performance mode.

Every such default is marked **DEFAULT DECISION** where introduced.

## 23. No-Unnecessary-Questions Rule Clarified

Antigravity should not repeatedly ask the user for decisions that are already covered by:

* this master prompt;
* the Decision Authority Matrix;
* documented defaults;
* accepted assumptions;
* existing architectural decisions.

Only genuinely high-risk or approval-dependent decisions should interrupt implementation.







# MASTER GOOGLE ANTIGRAVITY DEVELOPMENT PROMPT

## Hybrid Desktop Environment, Productivity Suite & Developer Workspace

### Production Engineering Edition — Version 6.0

**MANDATORY DIRECTIVE: DO NOT MAKE MISTAKES, ANTIGRAVITY.**

Build a coherent, secure, production-oriented desktop application inspired by Windows 11, macOS, and Ubuntu Linux. Deliver real functionality, excellent usability, sophisticated animations, a consistent visual design system, reliable data handling, and maintainable architecture.

Every meaningful implementation unit must be reviewed, validated within the permitted execution rules, documented, and committed to Git.

**Do not launch the application, start a development server, install dependencies, run database migrations, elevate privileges, modify Windows settings, or execute system-changing scripts until I explicitly authorize the relevant action.**

This document is the authoritative product and engineering specification. Read it completely before implementation. Follow its requirements, document assumptions, resolve low-risk uncertainties using the defaults below, and do not repeatedly ask what to build next.

---

# 1. Product Vision and Objectives

## 1.1 Product vision

Create a Windows desktop application that combines:

* A polished desktop shell and application launcher.
* Window management and virtual workspaces.
* File and folder management.
* Notes, documents, search, and productivity tools.
* Developer utilities and workspace management.
* System information and carefully controlled Windows integrations.
* User accounts, secure settings, local persistence, and optional synchronization.
* Advanced animation, visual effects, themes, and sound effects.
* Recovery, diagnostics, accessibility, privacy, and security controls.

The result should feel like a cohesive desktop environment rather than a collection of unrelated web pages.

This is a desktop application running on Windows, **not a replacement operating system**. Never claim that application-simulated functionality changes the actual Windows operating system.

## 1.2 Product objectives

1. Make the interface visually polished, intuitive, and responsive.
2. Make every implemented feature perform its advertised action.
3. Provide a consistent experience across all screens and application windows.
4. Support keyboard, mouse, touch-compatible layouts, and assistive technology where practical.
5. Preserve user data and prevent accidental destructive operations.
6. Keep idle resource consumption low.
7. Provide a clear separation between UI, application logic, persistence, backend services, and native Windows integrations.
8. Maintain a reliable engineering record through `brain.md`, implementation tracking, and Git commits.
9. Make the project extensible without introducing unnecessary complexity.
10. Prefer complete, tested feature slices over many unfinished features.

## 1.3 Product capability classifications

Every feature must be classified internally and in relevant documentation as one of the following:

| Classification          | Meaning                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `REAL`                  | Implemented and working within the application.                                    |
| `WINDOWS_INTEGRATED`    | Uses a real Windows API or verified operating-system capability.                   |
| `APPLICATION_SIMULATED` | Works inside the application's own environment but does not modify Windows itself. |
| `INFORMATIONAL`         | Displays information without performing the underlying action.                     |
| `FUTURE`                | Planned but not implemented.                                                       |
| `UNSUPPORTED`           | Cannot be supported under the current architecture or platform constraints.        |

Never represent a simulated task manager, virtual desktop, recycle bin, lock screen, system setting, or power control as a genuine Windows capability.

Do not show fake progress, fabricated system information, misleading success messages, or controls that appear functional but have no implementation.

---

# 2. Decision Authority Matrix

Antigravity must distinguish ordinary engineering decisions from operations requiring approval.

| Decision or action                                                      | Authority                  | Rule                                                                        |
| ----------------------------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------- |
| Inspect existing files, architecture, Git history, and project status   | Autonomous                 | Read before modifying.                                                      |
| Improve component structure and remove duplication                      | Autonomous                 | Preserve existing behavior.                                                 |
| Select spacing, typography, layout, and animation defaults              | Autonomous                 | Follow this specification.                                                  |
| Implement low-risk UI improvements                                      | Autonomous                 | Keep changes focused and reversible.                                        |
| Choose a library within the approved technology stack                   | Autonomous                 | Check maintenance, security, licensing, and bundle cost first.              |
| Create or update documentation and `brain.md`                           | Autonomous                 | Never include secrets.                                                      |
| Run permitted static checks                                             | Autonomous                 | Only if they do not install, launch, or modify the system.                  |
| Run safe, isolated unit tests                                           | Autonomous                 | Must satisfy the Test Execution Authorization Gate.                         |
| Create a local Git branch                                               | Autonomous                 | Inspect repository state first.                                             |
| Create meaningful local Git commits                                     | Authorized                 | The user explicitly requires commits after meaningful implementation units. |
| Install packages or update lockfiles through package-manager execution  | Requires approval          | Do not execute installation commands without authorization.                 |
| Start a development server or launch the app                            | Requires explicit approval | No exceptions.                                                              |
| Execute E2E tests that launch the application                           | Requires explicit approval | Explain the scope before requesting approval.                               |
| Run database migrations or seed a real database                         | Requires explicit approval | Never against production by default.                                        |
| Modify Windows registry, services, power settings, or security settings | Requires explicit approval | Prefer read-only integration.                                               |
| Delete, reset, or overwrite user work                                   | Requires explicit approval | Preserve uncommitted changes.                                               |
| Access external accounts, deploy, publish, or transmit user data        | Requires explicit approval | No automatic deployment.                                                    |
| Sign releases or publish an installer                                   | Requires explicit approval | Signing keys must remain protected.                                         |
| Perform an irreversible or high-risk operation                          | Requires explicit approval | Provide a risk explanation and rollback plan.                               |

### 2.1 Default decisions

**DEFAULT DECISION:** When a decision is low-risk, reversible, and within the product vision, choose a sensible option and document it.

**DEFAULT DECISION:** When multiple implementations are possible, prefer the simplest secure architecture that meets the requirement.

**DEFAULT DECISION:** When a requirement is ambiguous but noncritical, use a reasonable default and record the assumption.

**DEFAULT DECISION:** When an operation could lose data, weaken security, modify Windows, incur a cost, or expose private information, stop and request explicit approval.

Do not use the instruction to avoid unnecessary questions as permission to perform dangerous actions.

---

# 3. Assumptions Register and Engineering Memory

## 3.1 Required files

Maintain these files at the repository root or in the appropriate documentation directory:

* `brain.md`
* `README.md`
* `IMPLEMENTATION_STATUS.md`
* `docs/ARCHITECTURE.md`
* `docs/DECISIONS.md`
* `docs/SECURITY.md`
* `docs/TESTING.md`
* `docs/ACCESSIBILITY.md`
* `docs/ANIMATIONS_AND_EFFECTS.md`
* `docs/SOUND_DESIGN.md`
* `docs/RELEASE_PLAN.md`
* `docs/RISK_REGISTER.md`
* `docs/CHANGELOG.md`

Create or update files incrementally. Do not overwrite valuable existing documentation without reviewing it.

## 3.2 Assumptions Register

Maintain a section in `brain.md` and, if needed, a more detailed `docs/DECISIONS.md`.

Each assumption must contain:

| Field            | Description                                  |
| ---------------- | -------------------------------------------- |
| ID               | Unique identifier such as `ASM-001`.         |
| Assumption       | What is being assumed.                       |
| Reason           | Why a default is necessary.                  |
| Risk             | Low, Medium, High, or Critical.              |
| Reversibility    | Easy, Moderate, or Difficult.                |
| Decision owner   | Antigravity or User.                         |
| Status           | Proposed, Accepted, Rejected, or Superseded. |
| Review condition | When the assumption should be revisited.     |

Do not silently convert uncertain assumptions into facts.

## 3.3 `brain.md` maintenance

`brain.md` is the persistent engineering memory for the project. Keep it accurate, concise, and useful.

It must record:

* Product vision and boundaries.
* Current implementation phase.
* Technology stack and architecture.
* Directory structure.
* Implemented, incomplete, planned, and unsupported features.
* Current UI/UX and design-system decisions.
* Animation and sound architecture.
* State management and persistence decisions.
* Authentication and authorization.
* Database and API status.
* Windows integration capabilities.
* Known bugs and technical debt.
* Security and performance findings.
* Important constraints that must not change.
* Assumptions and unresolved decisions.
* Recent meaningful Git commits.
* Last completed task and next recommended task.
* Validation performed and its result.
* Whether application execution has been authorized.

Update `brain.md` after every meaningful implementation unit. Do not record a feature as completed merely because code was generated.

Never store passwords, access tokens, private keys, database credentials, or other secrets in `brain.md`.

---

# 4. Technology Decision Matrix

Use this matrix unless repository inspection establishes a compelling compatibility constraint.

| Decision                | Default                                                               | Rationale                                                                                          | Alternatives                                                               | Reversibility |
| ----------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| Desktop shell           | Electron                                                              | Mature Windows desktop ecosystem, broad tooling, React integration, and reliable desktop packaging | Tauri                                                                      | Moderate      |
| Frontend                | React + TypeScript                                                    | Component reuse, type safety, maintainability                                                      | Vue, other established frameworks                                          | Moderate      |
| Styling                 | CSS Modules or organized vanilla CSS with design tokens               | Predictable styling, explicit control, reduced utility-class sprawl                                | Tailwind CSS for suitable parts                                            | Easy          |
| Backend                 | Node.js + Fastify                                                     | Structured validation, good performance, clear API boundaries                                      | Express, NestJS                                                            | Moderate      |
| UI state                | Zustand with local component state where appropriate                  | Simple shared state without unnecessary complexity                                                 | Redux Toolkit, Context for small scopes                                    | Easy          |
| Server-state management | TanStack Query                                                        | Cache invalidation, loading/error states, retries, query lifecycle                                 | Equivalent established query library                                       | Moderate      |
| Local persistence       | SQLite through a vetted native integration, with versioned migrations | Reliable local relational storage and offline operation                                            | IndexedDB for browser-only prototypes; encrypted files for narrow settings | Moderate      |
| Remote database         | Microsoft SQL Server                                                  | Fits the intended database ecosystem                                                               | Other relational database only with approval                               | Moderate      |
| IPC                     | Electron context-isolated IPC using narrow, validated channels        | Explicit main/renderer boundaries                                                                  | Tauri command bridge if shell changes                                      | Moderate      |
| Native Windows bridge   | C#/.NET helper or narrowly scoped native Node integration             | Typed Windows integration and maintainable interop                                                 | PowerShell for restricted administrative tasks                             | Moderate      |
| Python                  | Optional isolated helper for specialized processing                   | Avoids adding another runtime to ordinary UI operations                                            | Node.js or C# implementation                                               | Easy          |
| Unit testing            | Vitest or compatible established runner                               | Fast isolated tests                                                                                | Jest                                                                       | Easy          |
| UI component testing    | React Testing Library                                                 | Tests user-visible behavior                                                                        | Equivalent accessible component-testing library                            | Easy          |
| E2E testing             | Playwright                                                            | Desktop/web workflow testing where authorized                                                      | Approved alternative                                                       | Moderate      |
| Accessibility checks    | axe-based automated checks plus manual review                         | Finds common accessibility defects                                                                 | Equivalent tooling                                                         | Easy          |
| Visual regression       | Playwright screenshots or equivalent                                  | Detects visual regressions                                                                         | Approved screenshot comparison system                                      | Moderate      |
| Packaging               | Electron Forge or Electron Builder, selected after inspection         | Mature Windows distribution support                                                                | Approved alternative                                                       | Moderate      |
| CI                      | GitHub Actions or existing repository CI                              | Repeatable validation                                                                              | Existing CI provider                                                       | Moderate      |

**DEFAULT DECISION:** Use Electron unless the existing repository already has a functioning, justified Tauri architecture. Do not migrate an existing working shell merely because another framework is theoretically smaller.

**DEFAULT DECISION:** SQL Server is the remote/shared database option; SQLite is the local-first persistence option. Do not assume a remote SQL Server is installed locally.

**DEFAULT DECISION:** Python and Bash are optional supporting tools, not mandatory layers for every feature.

---

# 5. Hybrid Design Philosophy

Create a distinctive interface inspired by three desktop environments.

| Inspiration  | Influence | Features to adapt                                                                                           |
| ------------ | --------: | ----------------------------------------------------------------------------------------------------------- |
| Windows 11   |       40% | Start menu, taskbar, window snapping, Quick Settings, familiar system controls                              |
| macOS        |       30% | Dock behavior, workspace overview, refined spacing, elegant transitions                                     |
| Ubuntu/Linux |       30% | Workspace overview, application launcher, developer workflows, terminal integration, practical system tools |

These percentages are design guidance, not a requirement to copy individual operating-system interfaces.

Do not reproduce proprietary logos, copyrighted wallpapers, trademarked assets, or proprietary sound effects without appropriate authorization.

Build a cohesive design language with original branding.

## 5.1 Design principles

* Familiar but original.
* Clean and professional.
* Strong visual hierarchy.
* Consistent interaction patterns.
* Restrained use of transparency and blur.
* Subtle depth rather than excessive glow.
* Advanced animation without constant motion.
* Accessible color contrast.
* Responsive layout.
* Consistent spacing, typography, iconography, and component behavior.
* Functional before decorative.

Avoid generic AI-generated design patterns, excessive gradients, meaningless dashboard cards, unnecessary glass panels, decorative charts with fabricated data, and animation that makes routine work slower.

---

# 6. Feature Architecture and Product Scope

Implement the product in coherent modules.

## 6.1 Desktop shell

Required features:

* Desktop workspace.
* Configurable wallpaper.
* Desktop shortcuts.
* Context menu.
* Start menu.
* Taskbar.
* Application launcher.
* Search.
* Notification center.
* Quick Settings.
* System clock and date.
* Volume and brightness indicators where supported.
* Network and battery indicators where supported.
* Window management.
* Application overview.
* Keyboard shortcuts.
* Workspace switching.
* Settings access.
* Lock and session controls within the application.
* Recovery after an application-level error.

Every capability must identify whether it is application-only or integrated with Windows.

## 6.2 Start menu and application launcher

Implement:

* Pinned applications.
* Recommended or recently used items, with privacy controls.
* Search.
* Alphabetical application listing.
* Categories.
* Recently opened documents where authorized.
* Pin/unpin.
* Reordering.
* Application details.
* Launch error reporting.
* Keyboard navigation.
* Search history controls.
* Configurable layout.

Search must not silently index private directories or transmit queries to a remote service.

## 6.3 Taskbar and Dock

Provide a hybrid taskbar/dock with:

* Running-application indicators.
* Pinned applications.
* Active-window indication.
* Window preview where practical.
* Minimize, restore, focus, and close controls.
* Optional auto-hide.
* Configurable alignment.
* Adjustable icon size.
* Multi-monitor-aware behavior where supported.
* Workspace-aware filtering.
* Context menus.
* Accessible keyboard navigation.
* Reduced animation mode.

Hover effects must not obstruct clicking or keyboard focus.

## 6.4 Window manager

Support application-level windows with:

* Move.
* Resize.
* Minimize.
* Restore.
* Maximize.
* Close.
* Focus and z-order.
* Title bars.
* Window menus.
* Snap layouts.
* Split-screen arrangements.
* Edge snapping.
* Cascading and tiling layouts.
* Window position persistence.
* Minimize and restore animations.
* Keyboard-driven positioning.
* Window boundary protection.
* Dialog ownership.
* Modal and nonmodal windows.

A simulated window must not be described as a native Windows window unless it actually is one.

### Window behavior acceptance criteria

* Only one application window is the active keyboard target at a time.
* Closing a window does not unexpectedly delete its saved data.
* Minimized windows can be restored.
* Focus returns to an appropriate window after closing a dialog.
* Snap layouts respect minimum window dimensions.
* Window state is restored safely after a restart.
* Invalid saved geometry falls back to a safe visible position.
* All primary operations have keyboard alternatives.

## 6.5 Virtual workspaces

Implement application-level workspaces with:

* Create, rename, switch, and delete.
* Workspace thumbnails.
* Assign applications to workspaces.
* Move windows between workspaces.
* Per-workspace pinned applications.
* Optional workspace wallpapers.
* Workspace transition animations.
* Keyboard shortcuts.
* Restore the previous workspace after restart.

Do not claim that these are actual Windows virtual desktops unless the implementation uses a verified native Windows capability.

## 6.6 File Explorer

Implement a safe application file manager with:

* Folder creation.
* File creation.
* Rename.
* Copy.
* Move.
* Duplicate.
* Delete.
* Search.
* Sorting.
* Filtering.
* Grid and list views.
* Breadcrumb navigation.
* Recent items.
* Favorites.
* File details.
* Drag-and-drop.
* Multi-select.
* Context menus.
* Safe overwrite confirmation.
* Trash/recycle behavior.
* Undo where feasible.
* Progress reporting for longer operations.
* Clear permission errors.
* Recovery after interrupted operations.

### Storage boundaries

Clearly distinguish:

1. Application-owned storage.
2. User-authorized filesystem locations.
3. Read-only protected locations.
4. Network locations.
5. Unsupported or inaccessible locations.

Use an explicit path allowlist or a user-granted access model for filesystem operations. Prevent path traversal and symlink/junction escapes where applicable.

Never recursively delete a directory without an explicit, understandable confirmation.

## 6.7 Notes and documents

Implement:

* Create, read, update, and delete.
* Autosave with visible save status.
* Search.
* Tags.
* Favorites.
* Sorting and filtering.
* Pinning.
* Archive.
* Trash and recovery.
* Markdown support.
* Word and character counts.
* Last-edited information.
* Keyboard shortcuts.
* Import/export.
* Conflict handling during synchronization.

Autosave must use debouncing and reliable persistence, not save every keystroke through an expensive synchronous operation.

## 6.8 Developer workspace

Provide a practical developer-focused area with:

* Project shortcuts.
* Configurable application groups.
* Multiple applications per workspace.
* Terminal launcher.
* Git status integration where safe.
* Project directory shortcuts.
* Environment information.
* API request workspace or Postman shortcut.
* Database connection configuration UI.
* Log viewer.
* Task list.
* Workspace profiles.
* Optional editor/browser/tool launch profiles.

Do not execute project scripts, terminals, package managers, or arbitrary commands automatically.

## 6.9 System applications

Prioritize useful applications:

1. File Explorer.
2. Notes.
3. Text Editor.
4. Calculator.
5. Clock.
6. Settings.
7. System Information.
8. Task Manager.
9. Notification Center.
10. Terminal Center.
11. Developer Workspace Manager.
12. Application Catalog.
13. Backup and Recovery.
14. Event and Diagnostic Viewer.

Additional utilities may include clipboard history, media controls, calendar, screenshots, image viewer, archive manager, and system resource graphs.

For each application, specify the real capabilities, permission requirements, empty states, error states, persistence behavior, and acceptance tests.

Do not build every possible utility before the core desktop shell and storage layer are reliable.

---

# 7. Expanded Features and Workflow Improvements

Add the following capabilities when they fit the current phase and can be implemented correctly.

## 7.1 Command palette

Provide a keyboard-first command palette that can:

* Search applications.
* Open settings.
* Switch workspaces.
* Create a note.
* Open a folder.
* Run approved internal commands.
* Search application data.
* Display keyboard shortcuts.
* Navigate to recent items.
* Open help and diagnostics.

Use a configurable shortcut such as `Ctrl+Shift+P`, subject to conflict checks.

The palette must show relevant command names, descriptions, shortcuts, and any required confirmation.

It must never execute arbitrary shell commands by default.

## 7.2 Global search

Provide a unified search interface with:

* Applications.
* Notes.
* Files and folders within authorized locations.
* Settings.
* Commands.
* Help articles.
* Recent items, if enabled.

Search results must be grouped by category, keyboard navigable, and understandable.

Use debouncing, cancellation of stale requests, clear loading states, and indexed local search where appropriate.

Provide privacy settings for indexed locations, search history, and recent-item tracking.

## 7.3 Quick Settings

Implement a panel for supported application and Windows controls:

* Theme.
* Animation profile.
* Sound effects.
* Volume where supported.
* Workspace selection.
* Notifications.
* Do Not Disturb.
* Performance mode.
* Accessibility shortcuts.
* Relevant system information.

Only show working controls. Unsupported system controls must be disabled with an explanation or omitted.

## 7.4 Notification Center

Provide:

* Informational, success, warning, error, and critical priorities.
* Grouping.
* Dismiss.
* Mark as read.
* Optional history.
* Per-category settings.
* Do Not Disturb.
* Accessible announcements.
* Sound preferences.
* Notification expiration where appropriate.

Critical security or data-loss warnings must not be suppressed by ordinary cosmetic notification preferences.

## 7.5 Application catalog

Provide a catalog of built-in and registered applications with:

* Application name.
* Description.
* Category.
* Icon.
* Version.
* Capabilities.
* Permission requirements.
* Status.
* Open, pin, and unpin actions.
* Help information.
* Availability and compatibility status.

Do not download or install applications without explicit user approval.

## 7.6 Backup and recovery

Implement application-data backup and restoration with:

* Manual backup.
* Configurable backup destination.
* Backup metadata.
* Version compatibility checks.
* Integrity verification.
* Restore preview.
* Confirmation before overwriting.
* Failure reporting.
* Recovery documentation.

A backup is not complete until its contents and integrity have been verified.

## 7.7 Personalization

Provide controls for:

* Wallpaper.
* Accent color.
* Theme.
* Taskbar and Dock behavior.
* Window effects.
* Workspace layouts.
* Application shortcuts.
* Sound effects.
* Notification behavior.
* Font scaling.
* Animation profile.
* Performance profile.

Persist settings and validate them on load. Invalid or missing settings must fall back to safe defaults.

---

# 8. UI/UX Design System

Build a centralized, reusable design system rather than styling every screen independently.

## 8.1 Design tokens

Create centralized tokens for:

* Backgrounds and surfaces.
* Primary, secondary, and tertiary text.
* Accent and interactive states.
* Success, warning, error, and information colors.
* Borders.
* Focus rings.
* Shadows.
* Blur.
* Corner radii.
* Spacing.
* Typography.
* Icon sizes.
* Layering and z-index.
* Animation durations.
* Easing curves.
* Sound categories.
* Disabled and loading states.

Example token structure:

```css
:root {
  --color-background: #f5f6f8;
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;
  --color-text-primary: #202124;
  --color-text-secondary: #5f6368;
  --color-border: #d9dde3;
  --color-accent: #4267d5;
  --color-success: #21864b;
  --color-warning: #a96808;
  --color-danger: #c43c3c;

  --radius-small: 6px;
  --radius-medium: 10px;
  --radius-large: 16px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --motion-fast: 120ms;
  --motion-standard: 200ms;
  --motion-emphasized: 320ms;
}
```

These values are initial defaults, not universal requirements. Validate them against the finished interface and accessibility requirements.

## 8.2 Theme catalog

Required themes:

* Light.
* Dark.
* System.
* High Contrast.

Optional themes:

* Graphite.
* Midnight.
* Ocean.
* Forest.
* Aurora.
* Solar.
* Ubuntu-inspired.
* Minimal.
* Developer.

Optional themes must use the same semantic tokens and pass contrast testing. Avoid implementing separate, inconsistent component styles for every theme.

## 8.3 Component standards

Build reusable components for:

* Buttons.
* Icon buttons.
* Inputs.
* Search fields.
* Checkboxes.
* Radio buttons.
* Switches.
* Dropdowns.
* Tooltips.
* Menus.
* Context menus.
* Tabs.
* Cards.
* Tables.
* Dialogs.
* Drawers.
* Toasts.
* Notifications.
* Progress indicators.
* Skeletons.
* Empty states.
* Error states.
* Window title bars.
* Window controls.
* Command palette.
* Settings sections.
* Confirmation prompts.

Every interactive component must support loading, disabled, focused, hover, active, error, and keyboard states where applicable.

## 8.4 Responsive behavior

Support resizing from compact windows to large desktop displays.

* Avoid clipped controls.
* Use adaptive layouts.
* Keep important actions visible.
* Support reasonable minimum window dimensions.
* Avoid horizontal scrolling unless appropriate.
* Reflow settings panels and forms.
* Support Windows display scaling.
* Keep dialogs within visible screen bounds.

## 8.5 UX consistency

* Use the same wording for the same action everywhere.
* Make destructive actions visually distinct.
* Place primary actions predictably.
* Avoid unnecessary confirmation dialogs for reversible, low-risk actions.
* Require clear confirmation for destructive or high-impact actions.
* Preserve form data when validation fails.
* Provide useful errors rather than generic “Something went wrong” messages.
* Never show success until the operation has actually succeeded.
* Provide undo when practical.
* Explain permission requirements before asking users to grant access.

---

# 9. Advanced Animation, Motion, and Visual Effects

The application must have sophisticated, high-quality motion. Do not interpret “more animations” as permission to animate everything continuously.

**Objective: maximum perceived polish, not maximum unnecessary movement.**

## 9.1 Animation architecture

Create a centralized motion system with:

* Shared timing tokens.
* Standard easing curves.
* Reusable transitions.
* Reduced-motion support.
* Animation cancellation.
* Interruption handling.
* Performance-aware fallbacks.
* Consistent motion direction.
* State-driven animation.
* No duplicated competing animation systems.

Use CSS transitions for simple UI state changes and a vetted animation library for complex sequences only when justified.

**DEFAULT DECISION:** Prefer CSS transitions and transforms for ordinary interface motion. Introduce a library such as Framer Motion only when it provides meaningful value and is compatible with the existing architecture.

Do not add multiple animation libraries for overlapping purposes.

## 9.2 Animation profile settings

Provide four profiles:

| Profile   | Behavior                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| Minimal   | Essential feedback only; short transitions and minimal movement.                                           |
| Balanced  | Smooth everyday interactions and restrained visual effects.                                                |
| Enhanced  | Richer window, panel, workspace, and notification transitions.                                             |
| Immersive | More expressive transitions and optional ambient visual effects, subject to performance and accessibility. |

Also provide:

* Performance Mode.
* Reduced Motion.
* Disable animated backgrounds.
* Disable decorative particles.
* Disable blur.
* Disable sound effects.
* Per-category effect controls where useful.

Persist the user's selections.

## 9.3 Required motion catalog

### Desktop and window motion

* Window opening.
* Window closing.
* Minimize.
* Restore.
* Maximize.
* Resize feedback.
* Focus transitions.
* Snap-layout previews.
* Snap completion.
* Window switching.
* Workspace switching.
* Application overview entrance and exit.
* Desktop context menu.
* Window shadow and elevation transitions.

### Navigation motion

* Start menu opening and closing.
* Dock hover and focus.
* Search opening.
* Command palette opening.
* Quick Settings.
* Notification Center.
* Settings navigation.
* Tabs and segmented controls.
* Breadcrumb navigation.
* Expandable sections.
* Sidebar collapse and expansion.

### Feedback motion

* Button press.
* Toggle changes.
* Checkbox state changes.
* Save confirmation.
* Copy confirmation.
* Drag-and-drop targets.
* File movement.
* Upload and download progress.
* Validation errors.
* Toast entrance and dismissal.
* Notification arrival.
* Progress completion.
* Warning emphasis.
* Empty-state transitions.

### Productivity motion

* Note creation.
* Note saving.
* List insertion and removal.
* Grid/list view changes.
* Search result updates.
* Filter changes.
* Sort changes.
* Workspace thumbnails.
* Backup progress.
* Restore progress.
* Synchronization status changes.

## 9.4 Motion timing defaults

| Interaction                 | Default duration |
| --------------------------- | ---------------: |
| Button press                |        80–140 ms |
| Hover/focus emphasis        |       100–160 ms |
| Tooltip                     |       120–200 ms |
| Dropdown/menu               |       120–200 ms |
| Toast                       |       160–240 ms |
| Dialog                      |       160–240 ms |
| Window transition           |       180–280 ms |
| Workspace transition        |       220–360 ms |
| Complex overview transition |       250–400 ms |

**DEFAULT DECISION:** Use these as starting ranges and shorten or eliminate motion when it impedes responsiveness or accessibility.

Avoid making routine actions feel slow. Never require a user to wait for decorative animation before interacting with the interface.

## 9.5 Advanced visual effects

Provide carefully controlled effects:

* Acrylic-style surfaces.
* Frosted-glass panels.
* Layered shadows.
* Subtle depth.
* Accent-colored focus rings.
* Gradient accents.
* Adaptive wallpaper colors.
* Soft background transitions.
* Optional ambient glow.
* Lightweight particle or parallax effects.
* Contextual color feedback.
* Dynamic taskbar and Dock emphasis.
* Optional animated wallpapers, if implemented efficiently.
* Optional desktop visualizer effects that never obscure important information.

These effects must be optional where they materially affect performance, readability, or accessibility.

Do not use blur as a substitute for proper visual hierarchy. Avoid constant pulsating elements, aggressive color cycling, flashing lights, excessive neon effects, or animations that distract from work.

## 9.6 Motion implementation requirements

* Prefer `transform` and `opacity` for animation.
* Avoid repeated layout-triggering animations.
* Avoid unbounded animation loops.
* Pause decorative animations when hidden or minimized.
* Cancel stale animations during rapid interactions.
* Prevent focus and pointer behavior from becoming inconsistent during transitions.
* Support reduced-motion preferences.
* Avoid rapid flashing.
* Never use motion as the sole indication of status.
* Keep focus indicators visible.
* Avoid layout shifts.
* Ensure all animations remain usable under high DPI and display scaling.

## 9.7 Animation acceptance criteria

* Animation never blocks essential input.
* Window state remains correct if transitions are interrupted.
* Rapid clicks do not produce duplicate windows or corrupted state.
* Reduced Motion substantially removes nonessential motion.
* Performance Mode disables expensive decorative effects.
* Visual state and application state remain synchronized.
* Animations do not cause content to become inaccessible.
* No continuous animation consumes significant idle CPU without a user-visible purpose.

---

# 10. Sound Effects and Audio Experience

Create a centralized sound system with user-controlled, context-appropriate sounds.

## 10.1 Sound categories

* UI.
* Window.
* Workspace.
* Navigation.
* Notification.
* Success.
* Warning.
* Error.
* Application.
* Accessibility.
* System integration.

## 10.2 Sound behavior

Support:

* Master volume.
* Category volume.
* Mute.
* Sound theme selection.
* Preview.
* Per-category enable/disable.
* Respect for the application's audio focus and relevant operating-system preferences where possible.
* Sensible rate limiting.
* Avoidance of repeated sounds during rapid events.

Never play a loud sound automatically on application startup.

Use short, subtle sounds that complement visual feedback. Visual confirmation must always exist even when sounds are disabled.

## 10.3 Sound asset policy

* Use original, properly licensed, or explicitly permitted audio.
* Do not copy proprietary operating-system sounds without authorization.
* Store assets centrally.
* Document source and license.
* Prefer compact audio assets such as OGG or WAV when suitable.
* Use consistent perceived loudness.
* Avoid clipping and excessively high volume.
* Avoid loading a large sound library into memory unnecessarily.
* Provide silent behavior as a first-class option.
* Never use sound as the sole way to communicate an error.

## 10.4 Sound settings

Create a dedicated Sound & Effects settings page with:

* Master enable/disable.
* Master volume.
* UI sounds.
* Notification sounds.
* Success/error sounds.
* Window and workspace sounds.
* Sound theme.
* Preview buttons.
* Reset to defaults.

**DEFAULT DECISION:** Sound effects are enabled only at a restrained, nonintrusive default level, with an obvious global mute control. Do not autoplay media or promotional audio.

## 10.5 Audio acceptance criteria

* Muting disables application-generated sounds.
* Category settings persist after restart.
* Repeated events do not create overlapping audio chaos.
* Missing audio assets fail gracefully.
* Audio playback errors do not crash the application.
* Sound never replaces visible or accessible status information.

---

# 11. Authentication, Authorization, and Privacy

Implement authentication only where it provides a genuine product benefit.

## 11.1 Authentication model

Support:

* Local profile mode.
* Optional server-backed accounts.
* Signup and login for server-backed mode.
* Secure logout.
* Session expiration.
* Password reset.
* Email verification.
* Optional MFA.
* OAuth/OIDC only through a properly configured provider.
* Account recovery.
* Session revocation.
* Account deletion and data export.

**DEFAULT DECISION:** Local-first mode must work without requiring a remote account. Server-backed authentication is optional and must be explicitly configured.

Do not imply that a local application profile provides the same security as a verified remote identity provider.

## 11.2 Authorization

Use role-based access control with explicit permission scopes.

Possible roles:

* Owner.
* Administrator.
* Standard User.
* Read-only User.

Possible scopes:

* Own resources.
* Shared resources.
* Workspace.
* Organization.
* System integration capabilities.

Enforce authorization in the backend and native bridge, not only in the UI.

## 11.3 Session security

* Protect session tokens.
* Never store plaintext passwords.
* Use secure password hashing such as Argon2id when implementing password authentication.
* Rotate refresh tokens.
* Revoke sessions on logout and relevant security events.
* Set explicit expiration policies.
* Protect against brute force.
* Avoid sensitive information in logs.
* Use platform-protected credential storage when appropriate.
* Do not store privileged credentials in renderer-accessible storage.
* Handle offline authentication without bypassing authorization.

## 11.4 Privacy controls

Provide controls for:

* Recent items.
* Search history.
* Local indexing.
* Notifications.
* Telemetry, if any.
* Data export.
* Account deletion.
* Local cache clearing.
* Sync.
* Application diagnostics.

Telemetry must be disabled by default unless the user explicitly enables it or a justified, disclosed requirement is approved.

---

# 12. Persistence, Database, API, and Synchronization

## 12.1 Data architecture

Use separate layers for:

* UI.
* Domain logic.
* Application services.
* Repository interfaces.
* Local persistence.
* Remote API.
* Synchronization.
* Native Windows capabilities.

Do not couple UI components directly to database drivers.

## 12.2 Local-first behavior

Support:

* Offline startup.
* Local data access.
* Reliable autosave.
* A synchronization queue.
* Retry with backoff.
* Conflict detection.
* Conflict resolution.
* Sync status visibility.
* Recovery after interrupted synchronization.

## 12.3 SQL Server

When remote persistence is configured, use SQL Server with:

* Versioned migrations.
* Foreign keys.
* Appropriate indexes.
* Transactions.
* Parameterized queries.
* Least-privilege database accounts.
* Connection pooling.
* Timeouts.
* Secure connection configuration.
* Auditability for sensitive operations.

Never embed database credentials in source code.

Do not assume that a SQL Server instance is installed, reachable, or configured. Detect configuration issues and provide setup instructions.

## 12.4 API standards

* Version the API.
* Validate every request.
* Enforce authorization.
* Return consistent errors.
* Use pagination for collections.
* Use idempotency for operations that may be retried.
* Apply rate limiting to sensitive endpoints.
* Use structured logging with secret redaction.
* Document request and response schemas.
* Use explicit timeout and cancellation behavior.

Example error structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "requestId": "non-sensitive-correlation-id",
    "details": []
  }
}
```

## 12.5 Synchronization

Implement:

* Pending.
* Syncing.
* Synced.
* Conflict.
* Failed.
* Offline.

Resolve conflicts according to resource type. Do not silently overwrite a user's newer changes.

Provide conflict-resolution UI with enough information for users to choose the correct version.

---

# 13. Windows Integration and Safety

## 13.1 Native integration architecture

Use a narrow, documented interface for Windows operations.

Possible integration areas:

* System information.
* Processes.
* Displays.
* Audio devices.
* Battery.
* Network.
* Launching approved applications.
* User-authorized filesystem operations.
* Power information.
* Notifications.
* File associations, if explicitly approved.

For each capability, document:

* Windows API or native method.
* Required privilege.
* Read-only or writable status.
* Supported Windows versions.
* Fallback behavior.
* Error behavior.
* Privacy impact.
* Whether the capability is simulated or integrated.

## 13.2 Default restrictions

* Prefer read-only access.
* Never auto-elevate.
* Never disable Windows security protections.
* Never silently change the registry.
* Never silently stop services.
* Never change power plans automatically.
* Never terminate arbitrary processes.
* Never execute arbitrary shell commands.
* Never change firewall rules or network configuration automatically.
* Never delete user files as part of optimization.
* Never install a driver or service without approval.

## 13.3 Native bridge security

* Expose only required functions.
* Validate all arguments.
* Enforce explicit capability permissions.
* Restrict filesystem access.
* Use a strict subprocess allowlist.
* Use structured argument arrays rather than shell-string construction.
* Avoid shell execution unless specifically justified and approved.
* Prevent command injection.
* Return structured errors.
* Apply operation timeouts.
* Log security-relevant operations without recording secrets.
* Ensure the renderer cannot access arbitrary Node.js or operating-system APIs.

---

# 14. Accessibility and Internationalization

## 14.1 Accessibility

Target WCAG 2.2 AA for applicable interface content.

Requirements:

* Keyboard access to all essential features.
* Visible focus indicators.
* Logical focus order.
* Correct accessible names and roles.
* Screen-reader-friendly dialogs and menus.
* Sufficient contrast.
* Scalable text.
* No color-only status communication.
* Reduced-motion support.
* Accessible notifications.
* Error messages associated with the relevant controls.
* Focus restoration after dialogs close.
* Keyboard-accessible drag-and-drop alternatives.

Use automated accessibility tests plus manual keyboard and screen-reader review.

## 14.2 Internationalization

Use a localization-ready architecture from the beginning.

* Keep user-facing strings out of business logic.
* Support locale-aware dates, numbers, and time.
* Store timestamps in UTC where appropriate and display them in the user's selected time zone.
* Design layouts to accommodate longer translations.
* Support right-to-left layout where implemented.
* Use properly licensed fonts with fallback stacks.
* Avoid concatenating translated strings in fragile ways.
* Provide text alternatives for audio feedback.

**DEFAULT DECISION:** Begin with English. Structure the application so Urdu and other languages can be added without architectural rewrites. Do not claim complete RTL support until it has been implemented and tested.

---

# 15. Performance and Reliability

## 15.1 Performance budgets

Use these initial targets as engineering budgets, not as grounds to sacrifice security or reliability.

| Metric                            | Initial target                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| Warm startup to interactive shell | Within 3 seconds on reference hardware                                              |
| Cold startup                      | Within 5 seconds on reference hardware                                              |
| Idle CPU                          | Typically below 2% on reference hardware when truly idle                            |
| Idle memory                       | Target below 400 MB for the application shell, excluding separately managed helpers |
| Routine interaction               | Usually responds within 100 ms                                                      |
| Animation                         | Target 60 FPS on capable hardware                                                   |
| Frame-time stability              | Avoid repeated frames above 33 ms during ordinary transitions                       |
| Renderer bundle                   | Aim for a compressed initial JavaScript bundle below 1 MB where practical           |
| Sound and decorative assets       | Load on demand; avoid unnecessarily large initial payloads                          |
| Search                            | Return initial local results quickly and avoid blocking the UI                      |
| Large file operations             | Use progress reporting and nonblocking execution                                    |

Measure actual performance on documented hardware. Record deviations rather than claiming targets were achieved without evidence.

## 15.2 Performance behavior

* Lazy-load secondary applications.
* Split bundles where appropriate.
* Avoid excessive re-rendering.
* Use virtualized lists for large collections.
* Debounce search.
* Cancel stale requests.
* Avoid unnecessary background polling.
* Cache only when invalidation is understood.
* Release listeners and resources.
* Stop decorative animations when not visible.
* Avoid loading every sound, wallpaper, or application asset at startup.
* Provide a low-resource mode.

## 15.3 Reliability

* Handle expected errors explicitly.
* Prevent duplicate actions during pending operations.
* Make writes transactional where appropriate.
* Preserve user data after crashes.
* Validate saved state.
* Support recovery from corrupted settings.
* Avoid unhandled promise rejections.
* Use structured diagnostics.
* Provide a clear recovery process.

## 15.4 Supported platform

**DEFAULT DECISION:** Prioritize Windows 11 x64 first. Support Windows 10 only if the selected runtime, dependencies, and lifecycle requirements remain compatible. Evaluate ARM64 separately.

Document the minimum Windows build, architecture, runtime requirements, display scaling assumptions, and GPU/WebView2 dependencies before claiming support.

---

# 16. Testing and Test Execution Authorization Gate

## 16.1 Mandatory authorization boundary

The instruction not to run the application takes precedence over the convenience of testing.

### Allowed without additional approval

Provided the necessary tools are already available and no installation or system modification is required:

* Read source files.
* Inspect Git status and diffs.
* Review configuration.
* Perform static analysis.
* Run available lint commands.
* Run available type checks.
* Run safe, isolated unit tests that do not launch the app, start a server, access real services, or modify the system.
* Validate JSON and other static configuration.
* Review dependency declarations without installing packages.
* Review SQL migration files without executing them.
* Inspect generated files.
* Perform security and accessibility source reviews.

If a command could launch the app, start a server, execute a migration, or modify the environment, do not run it under the assumption that it is harmless.

### Requires explicit user authorization

* Installing or updating dependencies.
* Launching the application.
* Starting a development server.
* Running E2E tests that launch the app.
* Running browser automation against the live application.
* Applying database migrations.
* Modifying Windows.
* Installing or registering a native helper.
* Building or running installers if the process launches code or modifies the system.
* Accessing external accounts or production systems.
* Deploying, publishing, or releasing.
* Running tests that modify shared data or real services.

## 16.2 Test strategy

Create:

* Unit tests.
* Integration tests.
* API contract tests.
* Repository and persistence tests.
* Authorization tests.
* Input-validation tests.
* IPC security tests.
* Accessibility tests.
* Visual regression tests.
* E2E tests.
* Performance tests.
* Recovery tests.
* Windows compatibility tests.

Write the tests and document how they should be run, but do not execute tests that cross the authorization boundary.

## 16.3 Coverage targets

**DEFAULT DECISION:**

* Critical security and authorization logic: full branch review, with tests for every identified security boundary.
* Core domain logic: target at least 80% meaningful statement coverage.
* Other business logic: target at least 70% meaningful statement coverage.
* UI components: test meaningful user interactions, keyboard behavior, and error states rather than chasing a coverage percentage.
* Every destructive operation: include safety and failure-path tests.
* Every feature marked complete: include acceptance criteria and test evidence.

Coverage numbers alone do not prove quality.

## 16.4 Test data

* Use synthetic data.
* Never use production credentials.
* Never use real customer data without explicit authorization.
* Keep test fixtures deterministic.
* Ensure test cleanup does not delete user data.
* Use isolated databases or in-memory substitutes where suitable.
* Make destructive test scope explicit.

---

# 17. Git Workflow and Implementation Discipline

## 17.1 Mandatory Git commits

Every meaningful implementation unit must be committed.

Examples:

* `feat(shell): implement desktop navigation`
* `feat(window-manager): add snapping and restore behavior`
* `feat(workspaces): persist workspace configuration`
* `feat(notes): implement autosave and recovery`
* `feat(motion): add reduced-motion support`
* `feat(sound): add centralized sound preferences`
* `fix(files): prevent unsafe path traversal`
* `test(auth): cover authorization boundaries`
* `docs(brain): record architecture and progress`

## 17.2 Required workflow

For each meaningful unit:

1. Inspect the repository.
2. Review existing changes.
3. Identify scope and dependencies.
4. Implement a focused change.
5. Perform permitted static validation.
6. Review the diff.
7. Check for secrets and unrelated changes.
8. Update `brain.md`.
9. Update `IMPLEMENTATION_STATUS.md`.
10. Update tests and documentation.
11. Create a meaningful Git commit.
12. Record the commit in the engineering memory.
13. Continue to the next unit.

Do not commit secrets, local databases, user files, unnecessary build artifacts, generated credentials, or machine-specific configuration.

Do not overwrite uncommitted user changes.

Never use destructive Git operations, force-push, rewrite shared history, or delete remote branches without explicit authorization.

If signing is configured and safe to use, sign commits. If signing is unavailable, document the limitation rather than fabricating a signature.

---

# 18. Phased Implementation Roadmap

Implement in phases. Do not attempt to create every feature in one enormous unverified change.

## Phase 0 — Discovery and baseline

* Inspect the repository.
* Identify the current stack.
* Review existing implementation.
* Identify missing requirements.
* Inspect Git status.
* Document assumptions.
* Create or update `brain.md`.
* Establish the implementation roadmap.

**Exit criteria:** Existing state and constraints are understood, with no unapproved execution.

## Phase 1 — Architecture and contracts

* Confirm desktop shell.
* Define module boundaries.
* Define state and persistence.
* Define IPC.
* Define permission boundaries.
* Define error handling.
* Document data contracts.
* Define application registry and command registry.
* Establish threat model.

**Exit criteria:** Architecture is documented and internally consistent.

## Phase 2 — Design system

* Design tokens.
* Theme system.
* Typography.
* Iconography.
* Components.
* Accessibility defaults.
* Motion tokens.
* Sound service.
* Visual regression baseline strategy.

**Exit criteria:** Shared design components and guidelines exist.

## Phase 3 — Desktop shell

* Desktop.
* Start menu.
* Taskbar/Dock.
* Application launcher.
* Search.
* Context menus.
* Notifications.
* Quick Settings.

**Exit criteria:** Core navigation is coherent and functional.

## Phase 4 — Window manager

* Window lifecycle.
* Focus.
* Minimize/restore.
* Maximize.
* Resize.
* Snapping.
* Keyboard navigation.
* Motion integration.

**Exit criteria:** Window state and interactions are reliable.

## Phase 5 — Workspaces

* Create, rename, switch, and delete.
* Application assignments.
* Workspace persistence.
* Overview transitions.
* Recovery of invalid workspace state.

**Exit criteria:** Workspaces survive application restart when persistence is available.

## Phase 6 — Application registry

* Manifest schema.
* Registration.
* Capabilities.
* Permission checks.
* Application lifecycle.
* Launch error handling.

**Exit criteria:** Applications are registered and invoked through a consistent interface.

## Phase 7 — Storage and productivity

* Local persistence.
* File Explorer.
* Notes.
* Text Editor.
* Search.
* Backup and recovery foundations.

**Exit criteria:** Data operations are reliable and tested within authorized boundaries.

## Phase 8 — Authentication and authorization

* Local profile.
* Optional server authentication.
* Session management.
* RBAC.
* Account recovery.
* Security testing.

**Exit criteria:** Authentication and permissions have documented behavior and test coverage.

## Phase 9 — Database and API

* SQL schema.
* Versioned migrations.
* API contracts.
* Validation.
* Error catalog.
* Transactions.
* Audit events.

**Exit criteria:** Contracts and implementation are consistent. Migrations remain unexecuted until authorized.

## Phase 10 — Offline and synchronization

* Sync queue.
* Retry behavior.
* Conflict detection.
* Conflict-resolution UI.
* Offline indicators.

**Exit criteria:** Offline and conflict behavior are documented and covered by tests.

## Phase 11 — Windows integration

* Capability detection.
* Read-only system information.
* Approved application launching.
* Optional audio, display, network, and power integrations.
* Permission and failure handling.

**Exit criteria:** Each integration has documented privilege requirements and a verified fallback.

## Phase 12 — System applications

* Settings.
* System Information.
* Task Manager.
* Terminal Center.
* Developer Workspace Manager.
* Other prioritized utilities.

**Exit criteria:** Each delivered application performs its advertised actions.

## Phase 13 — Visual polish

* Animation refinement.
* Sound effects.
* Advanced visual effects.
* Theme refinement.
* Keyboard polish.
* Empty and error states.
* Accessibility improvements.

**Exit criteria:** Motion, sound, and effects meet performance and accessibility requirements.

## Phase 14 — Quality and security

* Static validation.
* Authorized tests.
* Security review.
* Performance review.
* Accessibility review.
* Recovery review.
* Visual regression review.

**Exit criteria:** Findings are documented and no unresolved critical issue is concealed.

## Phase 15 — Packaging and release preparation

* Packaging configuration.
* Versioning.
* Installer design.
* Signing plan.
* Update architecture.
* Uninstall behavior.
* Release notes.
* Release checklist.

**Exit criteria:** Release configuration is documented and prepared. Do not publish or install without authorization.

## Phase 16 — Final review

* Review requirements against implementation.
* Review Git history.
* Review documentation.
* Verify the status of all claims.
* Record remaining work.
* Produce the final engineering report.

**Exit criteria:** The report accurately distinguishes completed, tested, partial, blocked, and untested features.

---

# 19. Definition of Done

A feature is complete only when all applicable requirements are satisfied:

1. The implementation meets the documented acceptance criteria.
2. The UI matches the design system.
3. Loading, empty, success, and error states are handled.
4. Keyboard navigation is supported for essential interactions.
5. Accessibility has been reviewed.
6. Permissions and data boundaries are enforced.
7. Relevant tests have been written.
8. Permitted tests have been run, with results recorded.
9. Unauthorized tests have not been run.
10. Error handling and recovery are considered.
11. Documentation has been updated.
12. `brain.md` has been updated.
13. `IMPLEMENTATION_STATUS.md` has been updated.
14. The Git diff has been reviewed.
15. No secrets have been committed.
16. A meaningful Git commit has been created.
17. Known limitations are disclosed.

If testing is blocked by the authorization rules, label the feature accordingly. Do not misrepresent untested functionality as fully verified.

---

# 20. Release, Packaging, and Licensing

## 20.1 Packaging

Evaluate:

* Per-user versus per-machine installation.
* Signed Windows installer.
* Application updates.
* Rollback.
* Uninstallation.
* Data retention and deletion options.
* Repair installation.
* Version compatibility.
* Windows Defender and SmartScreen considerations.
* Architecture-specific packages.

**DEFAULT DECISION:** Prefer a per-user Windows installer for initial distribution unless requirements justify an alternative. Evaluate MSIX, MSI, EXE, or portable packaging against the actual application architecture.

Do not build or execute an installer without the relevant authorization.

## 20.2 Update security

* Verify update signatures.
* Use authenticated transport.
* Protect update metadata.
* Avoid unsigned arbitrary downloads.
* Preserve user data.
* Support recovery from failed updates.
* Make release channels explicit.
* Never deploy an update silently without an approved policy.

## 20.3 Licensing

Review licenses for:

* Dependencies.
* Icons.
* Fonts.
* Sounds.
* Wallpapers.
* Illustrations.
* Native helpers.
* Bundled executables.

Maintain a software bill of materials and third-party attribution record.

Do not claim legal compliance without performing the required review. Terms of service, privacy policy, and data-processing documentation must reflect the actual product behavior and applicable requirements.

---

# 21. Risk Register and Decision Log

Maintain `docs/RISK_REGISTER.md`.

For each risk, record:

* Risk ID.
* Description.
* Likelihood.
* Impact.
* Severity.
* Mitigation.
* Owner.
* Status.
* Review date.

Prioritize:

* Data loss.
* Unauthorized system modification.
* Privilege escalation.
* Credential leakage.
* IPC abuse.
* Command injection.
* Dependency vulnerabilities.
* Synchronization conflicts.
* Untrusted plugin execution.
* Resource exhaustion.
* Update compromise.
* Incorrect claims about Windows integration.

Maintain `docs/DECISIONS.md` with:

```markdown
## DEC-001: Example decision title

- Status: Accepted
- Date: YYYY-MM-DD
- Context:
- Decision:
- Alternatives:
- Rationale:
- Security implications:
- Performance implications:
- Reversibility:
- Approval required:
```

Do not silently reverse architectural decisions. Document why a decision changed.

---

# 22. Final Operating Instructions to Antigravity

Before starting:

1. Read this prompt completely.
2. Inspect the existing repository.
3. Check Git status and preserve existing changes.
4. Identify the existing implementation and missing functionality.
5. Create or update `brain.md`.
6. Create or update the Assumptions Register.
7. Document the initial risk assessment.
8. Update `IMPLEMENTATION_STATUS.md`.
9. Select the first coherent implementation unit.
10. Begin implementation without unnecessary clarification questions.

During development:

* Prefer working vertical slices.
* Keep the architecture maintainable.
* Make UI and UX improvements consistent across the product.
* Add sophisticated animations and visual effects only through the centralized motion system.
* Add sound effects only through the centralized sound system.
* Keep effects configurable and performance-aware.
* Test state transitions, data persistence, errors, and permissions.
* Do not leave misleading placeholders.
* Do not claim unsupported operating-system integration.
* Update documentation and `brain.md`.
* Create meaningful Git commits after every implementation unit.
* Preserve the user's uncommitted work.
* Stop before any operation requiring explicit authorization.

When blocked:

* State the exact blocker.
* Record what has been completed.
* Identify what requires approval or unavailable tooling.
* Continue with independent, safe work where possible.

## Final response requirements

At the end of an authorized implementation session, provide:

1. Summary of completed work.
2. Features implemented.
3. Features partially implemented.
4. Features not implemented.
5. Tests written.
6. Tests actually run and their results.
7. Tests not run because authorization was required.
8. Security and accessibility findings.
9. Performance observations and unverified targets.
10. Files created or changed.
11. Git commits created.
12. Current contents/status of `brain.md`.
13. Known issues and technical debt.
14. Next recommended implementation unit.
15. Explicit statement confirming that the application was not launched, dependencies were not installed, and system-changing operations were not performed unless specifically authorized.

Never fabricate test results, commits, performance measurements, or completed functionality.

# 23. Final Mandatory Directive

**ANTIGRAVITY: BUILD A REAL, COHESIVE, SECURE, HIGH-QUALITY PRODUCT. DO NOT MAKE MISTAKES.**

Use Windows 11 for familiarity, macOS for refinement, and Ubuntu/Linux for workspace and developer productivity inspiration. Create an original identity rather than a superficial clone.

Deliver excellent UI and UX, reliable application behavior, purposeful advanced animations, tasteful visual effects, optional sound feedback, responsive layouts, accessibility, secure storage, robust error handling, and maintainable code.

Do not confuse more features with better software. Prioritize complete functionality, consistent behavior, performance, and data safety.

Do not ask me what to build next when the roadmap already provides the next safe step.

Do not make high-risk assumptions.

Do not execute, install, launch, migrate, deploy, elevate, or modify Windows without the appropriate explicit authorization.

**Record decisions in `brain.md`. Review each meaningful change. Commit each meaningful implementation unit to Git.**

Begin with Phase 0, inspect the repository, establish the baseline, and proceed one verified implementation unit at a time.

---

# Appendix A — Revision Notes

This edition consolidates the previous product requirements and expands the specification to make the expected implementation behavior clearer.

1. **Feature expansion:** Added command palette, global search, workspace-aware application behavior, Quick Settings, notification management, application catalog, developer workspace features, personalization, and backup/recovery workflows.

2. **UI/UX improvement:** Added centralized design tokens, reusable components, responsive layout rules, interaction-state standards, keyboard-first navigation, and consistent loading, empty, success, and error states.

3. **Advanced animations:** Added a motion architecture, animation profiles, detailed window/navigation/productivity motion catalogs, timing defaults, interruption handling, reduced-motion support, and measurable performance expectations.

4. **Visual effects:** Added configurable acrylic-style surfaces, depth, shadows, accent effects, optional particles, parallax, and animated backgrounds, with safeguards against excessive movement and GPU use.

5. **Sound effects:** Expanded sound categories, centralized settings, volume controls, preview, licensing, rate limiting, muted behavior, and accessibility requirements.

6. **Product functionality:** Clarified that application controls must perform their advertised actions and that simulated capabilities must not be presented as real Windows operations.

7. **Decision governance:** Added explicit autonomy boundaries and documented defaults, with approval requirements for destructive, system-modifying, external, and otherwise high-risk actions.

8. **Engineering memory:** Strengthened `brain.md` requirements and introduced a structured Assumptions Register, decision log, risk register, and implementation-status tracking.

9. **Safety:** Preserved the prohibition on launching the application, installing dependencies, executing migrations, or modifying Windows without explicit authorization.

10. **Git discipline:** Clarified the review, validation, documentation, and meaningful-commit workflow while prohibiting destructive Git operations and accidental inclusion of secrets.

11. **Performance and accessibility:** Added measurable initial budgets and criteria for reduced motion, keyboard behavior, scalable interfaces, and resource-aware effects.

12. **Implementation governance:** Added phase exit criteria, a Definition of Done, explicit final-report requirements, and rules against fabricated test results or unsupported completion claims.

13. **Contradiction resolution:** Clarified that permission to write tests does not imply permission to execute tests that launch the app, install dependencies, access live services, or modify the system.

14. **Scope control:** Established a phased roadmap so additional features do not undermine the reliability of the desktop shell, window manager, persistence, or security foundations.

15. **Default technology decisions:** Established a default Electron, React, TypeScript, Fastify, Zustand, SQLite, and optional SQL Server architecture while preserving justified alternatives and avoiding unnecessary migration of existing working code.

16. **Release and licensing:** Clarified installer, update, signing, packaging, dependency-license, and data-handling requirements without authorizing actual publication or deployment.

17. **Quality over quantity:** Clarified that “more animations” means richer, better-designed motion rather than constant movement or effects that impair usability.

18. **Implementation status honesty:** Features that are coded but untested, blocked by authorization, partially implemented, or unsupported must remain explicitly classified rather than being reported as complete.




MASTER GOOGLE ANTIGRAVITY DEVELOPMENT PROMPT
Hybrid Desktop Environment, Productivity Suite & Developer Workspace
Production Engineering Edition — Version 7.0
Status: Master Implementation Prompt
Target Platform: Windows 10/11 (x64 first, ARM64 evaluated)
Primary Architecture: Electron + React + TypeScript + Node.js + MySQL (primary) / SQL Server (supported) + SQLite (local-first)
Development Environment: Google Antigravity
Implementation Standard: Production-oriented, secure, maintainable, testable, reversible
Execution Mode: BUILD-FIRST / USER-AUTHORIZED EXECUTION ONLY

0. ABSOLUTE DIRECTIVE
DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.
You act as principal software architect, senior Windows engineer, senior full-stack engineer, UI/UX architect, security engineer, QA engineer, DevOps engineer, and technical product manager.

You are not building a superficial prototype, a visual mockup, a fake operating system, or a collection of disconnected demo screens.

You are building a real, production-oriented Windows desktop application: a desktop environment, productivity suite, developer workspace, application launcher, file manager, workspace manager, system-information layer, and controlled Windows integration surface.

It must feel like a coherent desktop product inspired by Windows 11, macOS, and Ubuntu/Linux, while not illegally copying proprietary assets, sounds, branding, artwork, source code, or exact proprietary UI implementations.

Every feature must be classified as one of:

genuinely implemented,

integrated with Windows,

simulated inside the application,

informational only,

planned for the future,

unsupported.

Never claim simulated functionality is native Windows functionality.

1. PRIMARY PRODUCT OBJECTIVE
Build a polished desktop application combining:

Windows-like desktop interaction

macOS-inspired visual polish and motion

Ubuntu/Linux-inspired workspace and developer workflows

productivity applications (notes, editor, files, calculator, clock, media)

file and folder management

terminal integration

application launching and registry

virtual workspaces and window management

universal search and command palette

notifications and quick settings

settings / control center

system information and task/process monitoring

developer tooling

authentication and authorization

local persistence and SQL synchronization

offline-first behavior

controlled Windows integration

security controls, accessibility, internationalization

diagnostics, recovery, update management

release engineering

The final product must feel like one unified application, not a collection of unrelated React pages.

2. CRITICAL EXECUTION RULE
2.1 BUILD THE PRODUCT, DO NOT RUN THE PRODUCT
DO NOT RUN, LAUNCH, INSTALL, EXECUTE, ELEVATE, MIGRATE, OR MODIFY THE SYSTEM WITHOUT EXPLICIT USER AUTHORIZATION.

This includes: launching the app; starting Electron; starting a dev server; opening an app window; installing npm/Python/system packages; installing drivers; running database migrations; creating or modifying a MySQL or SQL Server database; modifying the Windows Registry; modifying services; changing firewall rules; changing Windows settings; creating scheduled tasks; creating startup entries; changing network, power, or security configuration; deleting user files; modifying protected Windows directories; executing arbitrary PowerShell, Bash, Python, or executables.

Safe operations allowed without additional approval
Non-system-modifying repository work:

reading files; inspecting source; creating/editing source files

creating documentation, schemas, migrations as files, tests

static analysis, linting, formatting, TypeScript typechecking

static dependency inspection, static security analysis

repository diff inspection, Git status, Git diff

Git branch creation (not affecting shared history), Git commits

safe unit tests that do not launch the app, install dependencies, modify the system, touch a real database, or start services

If an operation is uncertain: treat it as requiring explicit authorization.

3. TEST EXECUTION AUTHORIZATION GATE
3.1 Test classification
Test / Operation	Default permission
Static analysis	Allowed
ESLint / Prettier check	Allowed
TypeScript typecheck	Allowed
Schema / JSON validation	Allowed
Unit tests with isolated in-memory data	Allowed
Pure utility / reducer / state tests	Allowed
Static security analysis	Allowed
App launch	Requires approval
Electron startup	Requires approval
React dev server	Requires approval
Backend server	Requires approval
E2E / Playwright against running app	Requires approval
Database connection	Requires approval
SQL migration execution	Requires approval
Dependency installation	Requires approval
Native bridge execution	Requires approval
PowerShell / Python affecting system	Requires approval
Windows API write, Registry, Service modification	Requires approval
Installer execution, auto-update testing	Requires approval
3.2 Authorization message template
text
EXECUTION AUTHORIZATION REQUIRED

Operation:      [exact operation]
Reason:         [why it is needed]
Potential effects: [what it may change]
Risk:           [LOW / MEDIUM / HIGH / CRITICAL]
Rollback:       [rollback method]
Required authorization: Explicit user approval.
Do not proceed until approval is received.

4. PRODUCT CAPABILITY TRUTH MODEL
Classification	Meaning
REAL	Fully implemented application functionality
WINDOWS-INTEGRATED	Uses genuine Windows APIs / native integration
APPLICATION-SIMULATED	Simulated inside the application
INFORMATIONAL	Displays information but does not control the underlying system
FUTURE	Designed but intentionally not implemented yet
UNSUPPORTED	Not safely or technically supported
Documented in docs/CAPABILITY_MATRIX.md.

Feature	Classification	Implementation	Limitations
File Explorer	REAL + WINDOWS-INTEGRATED	Native filesystem bridge	Protected paths restricted
Task Manager	WINDOWS-INTEGRATED	Windows process APIs	Read-only by default
Registry Editor	INFORMATIONAL / CONTROLLED	Read-only registry access	Writes disabled by default
System Restore	INFORMATIONAL	Displays availability	Does not perform restore
Virtual Desktop	APPLICATION-SIMULATED	Internal workspace engine	Not Windows virtual desktops
Terminal	WINDOWS-INTEGRATED	Controlled process bridge	Allowlisted shells
Lock Screen	APPLICATION-SIMULATED	Internal session lock	Does not lock Windows
Window Thumbnails	APPLICATION-SIMULATED	In-app window capture	Not the Windows taskbar
Media Keys	WINDOWS-INTEGRATED (where permitted)	Global shortcut / SMTC	Falls back to in-app controls
5. DECISION AUTHORITY MATRIX
5.1 Autonomous decisions
Reversible, local, consistent with this spec, not security-sensitive, not destructive, not licensing, not system-modifying:

component naming, folder organization, internal TypeScript interfaces

CSS architecture, React component decomposition, Zustand store structure

utility naming, test organization, icon placement

animation duration within defined limits, UI spacing

non-destructive default settings

5.2 User approval required
changing core technology choices, database architecture, or authentication architecture

introducing a new privileged native capability

system modification, Registry writes, service creation, firewall modification, scheduled tasks, startup persistence

installer execution, package installation, dependency upgrades with material impact

destructive file or database operations, deleting user data

telemetry activation, external data transmission

production deployment, signing credentials, publishing releases

remote Git operations affecting shared history

5.3 Default decisions
DEFAULT DECISION: low-risk + reversible + within product vision → choose sensibly and document.
DEFAULT DECISION: multiple implementations → prefer the simplest secure architecture.
DEFAULT DECISION: ambiguous but non-critical → reasonable default + recorded assumption.
DEFAULT DECISION: could lose data, weaken security, modify Windows, incur cost, or expose private data → stop and ask.

6. TECHNOLOGY DECISION MATRIX
Decision	Default	Rationale	Alternatives	Reversibility
Desktop shell	Electron	Mature Windows integration, Node ecosystem, reliable packaging	Tauri	Medium
Frontend	React + TypeScript	Mature component architecture	Vue, Svelte	High
Styling	CSS Modules / organized CSS + design tokens	Predictable, explicit control	Tailwind for suitable parts	High
UI state	Zustand + local component state	Lightweight, testable	Redux Toolkit, Context	High
Server state	TanStack Query	Caching, retries, lifecycle	Equivalent library	Medium
Backend	NestJS on Fastify adapter	Module boundaries, DI, validation	Fastify, Express	Medium
Local persistence	SQLite (better-sqlite3 or vetted driver)	Offline-first, transactional, portable	IndexedDB, JSON	Medium
Remote database	MySQL 8.0+ (primary) / SQL Server (supported)	Fits .env deployment target	—	Medium
ORM / query layer	Prisma or Drizzle (decided in Phase 1)	Schema discipline, migrations	Knex, TypeORM	Medium
IPC	Electron contextBridge + typed IPC	Explicit secure boundary	MessagePort	High
Native bridge	Narrow Node/C# bridge	Isolated privileged ops	C# executable	Medium
Windows APIs	Native bridge where necessary	Avoid shell emulation	PowerShell (restricted)	Medium
Python	Specialized offline tooling only	Avoid unnecessary runtime dependency	Node.js	High
Bash	Developer workflow only (Git Bash / WSL, explicitly identified)	—	PowerShell	High
Testing	Vitest + Playwright	Fast unit + strong E2E	Jest, Cypress	High
Accessibility	axe-core + manual keyboard/screen-reader review	Automated + human	Pa11y	High
Visual regression	Playwright screenshots	Integrated with E2E	Chromatic	High
Packaging	NSIS signed EXE (per-user default)	Flexible Windows distribution	MSI / MSIX / portable	Medium
CI	GitHub Actions or existing provider	Repeatable validation	—	Medium
Version control	Git (mandatory)	Required	—	N/A
DEFAULT DECISION: Use Electron. This product requires extensive Windows integration, controlled native process access, filesystem integration, display/audio/device information, and developer tooling. Do not switch to Tauri without a documented engineering evaluation demonstrating significant advantage.

7. ARCHITECTURE
text
┌──────────────────────────────────────────┐
│ React Renderer                           │
│ UI / UX / Desktop Shell / Applications   │
└───────────────────┬──────────────────────┘
                    │ Typed IPC (validated)
┌───────────────────▼──────────────────────┐
│ Electron Main Process                    │
│ Window lifecycle / security / IPC        │
└───────────────────┬──────────────────────┘
        ┌───────────┼──────────────┐
        ▼           ▼              ▼
 Native Bridge   Local DB       Services
 Windows APIs    SQLite         Application Logic
        │           │              │
        └───────────┼──────────────┘
                    ▼
              NestJS Backend
                    │
                    ▼
        MySQL / SQL Server
Layers: UI → Domain logic → Application services → Repository interfaces → Local persistence → Remote API → Sync → Native Windows capabilities. UI components must never touch database drivers directly. The renderer must never receive unrestricted Node.js or filesystem access.

7.1 Project structure
text
project/
├── apps/
│   ├── desktop/
│   │   ├── electron/
│   │   ├── preload/
│   │   └── renderer/
│   └── server/
├── packages/
│   ├── contracts/     (auth, applications, files, windows, workspaces,
│   │                   notifications, settings, sync, system, plugins,
│   │                   commands, media, widgets, errors)
│   ├── ui/
│   ├── config/
│   ├── validation/
│   ├── database/
│   ├── security/
│   └── utilities/
├── native/windows/
├── scripts/
├── database/{migrations,seeds,schemas}
├── tests/{unit,integration,e2e,accessibility,visual,security}
├── assets/{icons,sounds,wallpapers,fonts,media}
├── docs/
├── brain.md
├── README.md
├── LICENSE
├── TERMS_OF_SERVICE.md
├── PRIVACY_POLICY.md
├── package.json
└── .gitignore
Adapt to the existing repository. Do not destroy a functioning project.

8. SECURITY ARCHITECTURE
8.1 Electron security (mandatory)
text
nodeIntegration: false
contextIsolation: true
sandbox: true where compatible
webSecurity: true
Strict preload bridge. Never expose require, process, fs, child_process, shell, os, net, http, crypto directly to the renderer. Expose only explicit typed functions.

8.2 Threat model
Categories: malicious plugin, compromised dependency, XSS, CSRF, CORS abuse, IPC injection, command injection, path traversal, privilege escalation, token theft, credential theft, database injection, file overwrite, symlink attacks, DLL/EXE side-loading, supply-chain attack, malicious update, log injection, sensitive data leakage, unauthorized telemetry, audio/media file parsing exploits.

Each threat records: Threat / Impact / Likelihood / Mitigation / Detection / Recovery / Residual Risk → docs/RISK_REGISTER.md.

8.3 Filesystem security
Reject .., path traversal, unsafe UNC paths, unexpected device paths, invalid control characters. Canonicalize paths before sensitive operations. Use allowlists. Never trust user-supplied filenames.

8.4 Subprocess security
Every executable launch uses an explicit executable allowlist, explicit argument validation, shell: false, and no shell interpretation. Never build powershell -Command "<user input>". Never concatenate user-controlled input into shell commands. Never download and execute remote scripts.

8.5 Web security
Strict Content Security Policy; no unsafe inline scripts where avoidable; strict CORS; CSRF protection where cookie auth is used; output encoding; input validation; HTML sanitization; safe URL handling. Never use dangerouslySetInnerHTML unless content is sanitized by a trusted sanitizer.

8.6 Encryption
In transit: TLS 1.2+ (prefer 1.3). At rest: Windows DPAPI / Credential Manager for local secrets; database encryption where deployed; encrypted sensitive local storage. Do not invent custom cryptography.

8.7 Telemetry & privacy
DEFAULT DECISION: Telemetry OFF by default. If implemented: explicit consent, privacy settings, minimal data, no passwords, no file contents, no personal document contents, no raw command lines, no secret values, transparent documentation, deletion/export support.

Provide architecture for data export, data deletion, account deletion, privacy preferences, retention. Clearly identify: local-only data, synchronized data, server data, diagnostic data, telemetry data.

8.8 Audit logging
Audit: login, logout, authentication failures, permission changes, file operations, plugin installation, plugin permission changes, privileged operations, security settings, account changes. Never log secrets.

DEFAULT DECISION: 90-day default retention, configurable.

8.9 Plugin security
Plugins are untrusted by default. Permission request UI:

text
Plugin: [Name]
Requests: [permissions]
Reason: [description]
[Allow] [Deny]
High-risk permissions (terminal.execute, filesystem.protected.write, network.write, process.control, registry.write, media.library.read) must never be granted silently. Plugin execution must be permission-checked, logged, cancellable where possible, versioned, validated, and isolated from the renderer.

9. DATA CONTRACTS, IPC, EVENTS & REGISTRIES
9.1 Contracts
All cross-layer data uses explicit runtime-validated contracts (Zod or equivalent).

9.2 Standard API response contract
Success:

json
{
  "success": true,
  "data": {},
  "meta": { "requestId": "uuid", "timestamp": "2026-01-01T00:00:00.000Z" }
}
Error:

json
{
  "success": false,
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "The supplied credentials are invalid.",
    "details": {},
    "retryable": false
  },
  "meta": { "requestId": "uuid", "timestamp": "2026-01-01T00:00:00.000Z" }
}
Never return stack traces to users.

9.3 Error code catalog
text
AUTH_INVALID_CREDENTIALS        AUTH_SESSION_EXPIRED
AUTH_SESSION_REVOKED            AUTH_EMAIL_NOT_VERIFIED
AUTH_MFA_REQUIRED               AUTH_MFA_INVALID
AUTH_RESET_TOKEN_INVALID        AUTH_FORBIDDEN
AUTH_PERMISSION_DENIED          AUTH_ACCOUNT_LOCKED
AUTH_RATE_LIMITED               AUTH_WEAK_PASSWORD
AUTH_EMAIL_ALREADY_EXISTS       AUTH_TOKEN_REUSE_DETECTED

FILE_NOT_FOUND                  FILE_ALREADY_EXISTS
FILE_ACCESS_DENIED              FILE_OPERATION_BLOCKED
FILE_PATH_INVALID               FILE_PATH_PROTECTED

APP_NOT_FOUND                   APP_DISABLED
APP_LAUNCH_BLOCKED              WINDOW_INVALID_STATE
WORKSPACE_NOT_FOUND

SYNC_CONFLICT                   SYNC_OFFLINE
SYNC_FAILED                     SYNC_VERSION_MISMATCH

DB_CONNECTION_FAILED            DB_TRANSACTION_FAILED
DB_CONSTRAINT_VIOLATION         DB_MIGRATION_REQUIRED

NATIVE_UNSUPPORTED              NATIVE_PERMISSION_DENIED
NATIVE_OPERATION_FAILED

PLUGIN_INVALID                  PLUGIN_PERMISSION_DENIED
PLUGIN_EXECUTION_BLOCKED

MEDIA_DECODE_FAILED             MEDIA_LIBRARY_UNAVAILABLE
MEDIA_UNSUPPORTED_FORMAT        WIDGET_LOAD_FAILED
WALLPAPER_IMPORT_FAILED         WALLPAPER_UNSUPPORTED_FORMAT

SYSTEM_OPERATION_BLOCKED        USER_AUTHORIZATION_REQUIRED

VALIDATION_FAILED               RATE_LIMITED
INTERNAL_ERROR
9.4 Event system
typescript
interface ApplicationEvent<T = unknown> {
  id: string;
  type: string;
  version: number;
  timestamp: string;
  source: string;
  correlationId?: string;
  payload: T;
}
Event names include: window.created|closed|focused|minimized|maximized|restored|snapped|thumbnail.requested, workspace.created|deleted|switched, application.registered|launched|closed, notification.created|read, file.created|moved|copied|deleted|restored, sync.started|completed|failed|conflict, auth.login|logout|session.revoked|locked|unlocked, native.capability.available|unavailable, media.playback.started|paused|stopped|track.changed, widget.mounted|unmounted|updated, wallpaper.changed, theme.changed.

9.5 IPC contract
Renderer → Preload → Main → Native/Services.

typescript
interface IPCRequest<T> {
  requestId: string;
  channel: string;
  version: number;
  payload: T;
}
Requirements: runtime schema validation, maximum payload size, allowed channel list, permission check, argument validation, timeout, cancellation where appropriate, structured errors, no arbitrary channel creation. Never allow ipcRenderer.send(userControlledChannel) without strict channel validation.

9.6 Application manifest
json
{
  "id": "com.example.notes",
  "name": "Notes",
  "version": "1.0.0",
  "description": "Application notes manager",
  "icon": "notes",
  "entry": "internal:notes",
  "classification": "REAL",
  "permissions": ["storage.notes.read", "storage.notes.write"],
  "window": {
    "defaultWidth": 900, "defaultHeight": 650,
    "minWidth": 500, "minHeight": 400,
    "resizable": true, "multipleInstances": false
  }
}
Registry must support internal, external, developer, and plugin applications; aliases; disabled applications; permissions; capabilities; window configuration; lifecycle; versioning.

9.7 Command registry
typescript
interface CommandDefinition {
  id: string;
  title: string;
  description?: string;
  category: string;
  keywords?: string[];
  shortcut?: string;
  requiredPermissions?: string[];
  enabled: boolean;
  execute: string;
}
Examples: app.launch, window.minimize|maximize|close|snap.left|snap.right|snap.layout, workspace.next|previous|create, search.open, command-palette.open, settings.open, notifications.open, terminal.open, file-explorer.open, session.lock, media.play|pause|next, wallpaper.next, widgets.toggle.

Commands must be permission-aware and centrally registered.

9.8 Permission schema
Format: domain.resource.action

text
filesystem.user.read            filesystem.user.write
filesystem.protected.read       filesystem.protected.write
system.info.read                system.process.read
system.process.control          network.read
network.write                   power.read
power.control                   audio.read
audio.control                   display.read
display.control                 terminal.execute
plugin.install                  plugin.execute
database.read                   database.write
media.library.read              media.library.write
media.playback.control          widgets.install
widgets.execute                 wallpaper.import
session.lock                    biometric.unlock
Sensitive permissions require explicit user approval.

9.9 Plugin manifest
json
{
  "id": "com.example.plugin",
  "name": "Example Plugin",
  "version": "1.0.0",
  "apiVersion": "1",
  "permissions": ["storage.user.read"],
  "entry": "plugin/index.js"
}
Plugins never receive unrestricted filesystem, process, network, shell, registry, or native API access. Capability-based access only.

10. ENVIRONMENT CONFIGURATION
10.1 Authoritative development .env
env
PORT=3000

SERVER=localhost

DATABASE=MyOS

NODE_ENV=development

JWT_SECRET=bac0a2b3e80af8c0fef9ca6a7f1466251047834cf15ee33f5af23b26e2012d09

JWT_EXPIRES_IN=7d

# Additional application defaults

API_PORT=3000

DB_SERVER=localhost

DB_PORT=1433

DB_NAME=MyOS

DEFAULT_EFFECTS_MODE=balanced

ENABLE_WEB_AUDIO_SOUNDS=true

LOG_LEVEL=info
10.2 Configuration rules
Commit .env.example with placeholders only. Never commit a real .env.

ASM-002 (assumption to validate): DB_PORT=1433 is the SQL Server default. If MySQL is the target engine (per your request), the standard port is 3306. Confirm the intended engine and port in Phase 0 before connecting. Both are supported; the app must not hardcode either.

JWT_SECRET above is a development placeholder and must be rotated before any non-local use. Generate with a CSPRNG (≥ 256 bits of entropy). Never reuse the example value. Never log it. Never ship it.

JWT_EXPIRES_IN=7d is the refresh horizon convention; access tokens remain short-lived (15 minutes) — see §15.

DEFAULT_EFFECTS_MODE=balanced maps directly to the animation profile default in §28.

ENABLE_WEB_AUDIO_SOUNDS=true gates the centralized sound engine (§32) and the Antigravity Groove audio engine (§34).

LOG_LEVEL=info controls structured logging verbosity (debug|info|warn|error|security|audit).

10.3 .env.example
env
NODE_ENV=development
PORT=3000
API_PORT=3000

# Database — engine: mysql | sqlserver
DB_ENGINE=mysql
DB_SERVER=localhost
DB_PORT=3306
DB_NAME=MyOS
DB_USER=
DB_PASSWORD=
DATABASE_URL=

# Auth
JWT_SECRET=
JWT_EXPIRES_IN=7d
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# Effects
DEFAULT_EFFECTS_MODE=balanced
ENABLE_WEB_AUDIO_SOUNDS=true
LOG_LEVEL=info
11. DATABASE SETUP — MySQL (PRIMARY) AND SQL SERVER (SUPPORTED)
Execution gate: Creating databases, creating users, running migrations, and starting database services all require explicit authorization (§3). This section documents the required setup; Antigravity prepares scripts and migrations as files but does not execute them.

11.1 MySQL server setup (primary path)
Minimum version: MySQL 8.0+ (utf8mb4, CTEs, window functions, JSON type).

Installation options (documented, not executed):

Option	Notes
MySQL Installer for Windows	Recommended for a local developer instance
MySQL Community Server (ZIP/MSI)	Manual service configuration
Docker container	Reproducible, isolated; requires user-approved container runtime
Remote MySQL	Team/central deployment; TLS required
Required steps (prepared as scripts, executed only with approval):

Install MySQL Server and confirm the Windows service is running.

Set a strong root password at install time. Never use root for the application.

Create the application database:

sql
CREATE DATABASE IF NOT EXISTS MyOS
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
Create a least-privilege application user:

sql
CREATE USER 'myos_app'@'localhost'
  IDENTIFIED BY '<STRONG_RANDOM_PASSWORD>';

GRANT SELECT, INSERT, UPDATE, DELETE
  ON MyOS.* TO 'myos_app'@'localhost';

-- Migrations run under a separate, narrower account:
CREATE USER 'myos_migrator'@'localhost'
  IDENTIFIED BY '<SEPARATE_STRONG_PASSWORD>';

GRANT SELECT, INSERT, UPDATE, DELETE,
      CREATE, ALTER, DROP, INDEX, REFERENCES
  ON MyOS.* TO 'myos_migrator'@'localhost';

FLUSH PRIVILEGES;
Verify connectivity and charset:

sql
SELECT VERSION(), @@character_set_database, @@collation_database;
Connection configuration (development, matches .env):

env
DB_ENGINE=mysql
DB_SERVER=localhost
DB_PORT=3306
DB_NAME=MyOS
DB_USER=myos_app
DB_PASSWORD=<from secure store, never committed>
DATABASE_URL=mysql://myos_app:<password>@localhost:3306/MyOS
Connection pool defaults (initial, tune after measurement): connectionLimit: 10, acquireTimeout: 10000, idleTimeout: 30000, enableKeepAlive: true, timezone: 'Z', charset: 'utf8mb4'.

Operational requirements: UTC timestamps, utf8mb4 everywhere, prepared/parameterized statements only, explicit transactions for multi-step mutations, automated backups with verified restore, slow-query logging in development, TLS for any non-localhost connection.

11.2 SQL Server (supported path)
When DB_ENGINE=sqlserver, use:

env
DB_ENGINE=sqlserver
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=MyOS
DATABASE_URL=sqlserver://<user>:<password>@localhost:1433;database=MyOS;encrypt=true;trustServerCertificate=false
SQL Server type mapping: CHAR(36) → UNIQUEIDENTIFIER (with NEWSEQUENTIALID()), VARCHAR(n) → NVARCHAR(n), DATETIME(3) → DATETIME2(3), TINYINT(1) → BIT, JSON → NVARCHAR(MAX) validated JSON, LONGTEXT → NVARCHAR(MAX).

The application must not assume a database is installed, running, or reachable. Detect configuration problems and present clear setup guidance.

11.3 Migration discipline
Versioned migration files committed to Git.

up and down for every migration.

No destructive migration without explicit approval.

No production migration without explicit approval.

Migrations validated statically in CI; executed only under authorization.

12. CORE DATABASE SCHEMA
Identifiers are UUID/GUID (CHAR(36) in MySQL, UNIQUEIDENTIFIER in SQL Server). Timestamps are UTC with millisecond precision.

12.1 Users
sql
CREATE TABLE Users (
  UserId            CHAR(36)     NOT NULL PRIMARY KEY,
  Email             VARCHAR(320) NOT NULL,
  NormalizedEmail   VARCHAR(320) NOT NULL,
  PasswordHash      VARCHAR(500) NULL,
  DisplayName       VARCHAR(200) NOT NULL,
  AvatarPath        VARCHAR(1000) NULL,
  EmailVerified     TINYINT(1)   NOT NULL DEFAULT 0,
  IsActive          TINYINT(1)   NOT NULL DEFAULT 1,
  IsLocked          TINYINT(1)   NOT NULL DEFAULT 0,
  FailedLoginCount  INT          NOT NULL DEFAULT 0,
  LockedUntil       DATETIME(3)  NULL,
  PreferredLocale   VARCHAR(20)  NOT NULL DEFAULT 'en-US',
  PreferredTheme    VARCHAR(40)  NOT NULL DEFAULT 'system',
  CreatedAt         DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UpdatedAt         DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  LastLoginAt       DATETIME(3)  NULL,
  UNIQUE KEY UQ_Users_NormalizedEmail (NormalizedEmail),
  KEY IX_Users_IsActive (IsActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
12.2 Roles, Permissions, UserRoles, RolePermissions
sql
CREATE TABLE Roles (
  RoleId      CHAR(36)     NOT NULL PRIMARY KEY,
  Name        VARCHAR(100) NOT NULL,
  Description VARCHAR(500) NULL,
  UNIQUE KEY UQ_Roles_Name (Name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Permissions (
  PermissionId  CHAR(36)     NOT NULL PRIMARY KEY,
  PermissionKey VARCHAR(200) NOT NULL,
  Description   VARCHAR(500) NULL,
  UNIQUE KEY UQ_Permissions_Key (PermissionKey)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE UserRoles (
  UserId     CHAR(36)    NOT NULL,
  RoleId     CHAR(36)    NOT NULL,
  AssignedAt DATETIME(3) NOT NULL DEFAULT UTC_TIMESTAMP(3),
  PRIMARY KEY (UserId, RoleId),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  FOREIGN KEY (RoleId) REFERENCES Roles(RoleId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE RolePermissions (
  RoleId       CHAR(36) NOT NULL,
  PermissionId CHAR(36) NOT NULL,
  PRIMARY KEY (RoleId, PermissionId),
  FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
  FOREIGN KEY (PermissionId) REFERENCES Permissions(PermissionId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
12.3 Sessions
sql
CREATE TABLE Sessions (
  SessionId         CHAR(36)     NOT NULL PRIMARY KEY,
  UserId            CHAR(36)     NOT NULL,
  RefreshTokenHash  VARCHAR(500) NOT NULL,
  TokenFamilyId     CHAR(36)     NOT NULL,
  CreatedAt         DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  ExpiresAt         DATETIME(3)  NOT NULL,
  RevokedAt         DATETIME(3)  NULL,
  RevokedReason     VARCHAR(200) NULL,
  DeviceName        VARCHAR(200) NULL,
  DeviceFingerprint VARCHAR(500) NULL,
  IpAddress         VARCHAR(64)  NULL,
  UserAgent         VARCHAR(1000) NULL,
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_Sessions_UserId (UserId),
  KEY IX_Sessions_ExpiresAt (ExpiresAt),
  KEY IX_Sessions_TokenFamily (TokenFamilyId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
12.4 Auth support tables
sql
CREATE TABLE EmailVerificationTokens (
  TokenId   CHAR(36)     NOT NULL PRIMARY KEY,
  UserId    CHAR(36)     NOT NULL,
  TokenHash VARCHAR(500) NOT NULL,
  ExpiresAt DATETIME(3)  NOT NULL,
  UsedAt    DATETIME(3)  NULL,
  CreatedAt DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_EVT_UserId (UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE PasswordResetTokens (
  TokenId   CHAR(36)     NOT NULL PRIMARY KEY,
  UserId    CHAR(36)     NOT NULL,
  TokenHash VARCHAR(500) NOT NULL,
  ExpiresAt DATETIME(3)  NOT NULL,
  UsedAt    DATETIME(3)  NULL,
  CreatedAt DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_PRT_UserId (UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE MfaMethods (
  MfaMethodId CHAR(36)     NOT NULL PRIMARY KEY,
  UserId      CHAR(36)     NOT NULL,
  MethodType  VARCHAR(30)  NOT NULL,   -- totp | recovery | webauthn
  SecretEnc   VARBINARY(500) NULL,
  Label       VARCHAR(120) NULL,
  IsPrimary   TINYINT(1)   NOT NULL DEFAULT 0,
  ConfirmedAt DATETIME(3)  NULL,
  CreatedAt   DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_Mfa_UserId (UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE RecoveryCodes (
  RecoveryCodeId CHAR(36)     NOT NULL PRIMARY KEY,
  UserId         CHAR(36)     NOT NULL,
  CodeHash       VARCHAR(500) NOT NULL,
  UsedAt         DATETIME(3)  NULL,
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_Recovery_UserId (UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE OAuthIdentities (
  IdentityId   CHAR(36)     NOT NULL PRIMARY KEY,
  UserId       CHAR(36)     NOT NULL,
  Provider     VARCHAR(60)  NOT NULL,
  Subject      VARCHAR(255) NOT NULL,
  EmailAtLink  VARCHAR(320) NULL,
  LinkedAt     DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UNIQUE KEY UQ_OAuth_Provider_Subject (Provider, Subject),
  FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE LoginAttempts (
  AttemptId   CHAR(36)     NOT NULL PRIMARY KEY,
  NormalizedEmail VARCHAR(320) NOT NULL,
  IpAddress   VARCHAR(64)  NULL,
  Succeeded   TINYINT(1)   NOT NULL,
  Reason      VARCHAR(120) NULL,
  CreatedAt   DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  KEY IX_LoginAttempts_Email_Time (NormalizedEmail, CreatedAt),
  KEY IX_LoginAttempts_Ip_Time (IpAddress, CreatedAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
12.5 Applications, UserFiles, Notes, Workspaces, WindowStates, Notifications, AuditLogs, SyncQueue
sql
CREATE TABLE Applications (
  ApplicationId      CHAR(36)     NOT NULL PRIMARY KEY,
  ApplicationKey     VARCHAR(150) NOT NULL,
  Name               VARCHAR(200) NOT NULL,
  Version            VARCHAR(50)  NOT NULL,
  Description        VARCHAR(1000) NULL,
  Classification     VARCHAR(50)  NOT NULL,
  IsEnabled          TINYINT(1)   NOT NULL DEFAULT 1,
  IsSystemApplication TINYINT(1)  NOT NULL DEFAULT 0,
  ManifestJson       JSON         NULL,
  CreatedAt          DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UpdatedAt          DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UNIQUE KEY UQ_Applications_Key (ApplicationKey)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE UserFiles (
  FileId       CHAR(36)      NOT NULL PRIMARY KEY,
  UserId       CHAR(36)      NOT NULL,
  ParentFileId CHAR(36)      NULL,
  Name         VARCHAR(500)  NOT NULL,
  Path         VARCHAR(2000) NOT NULL,
  IsDirectory  TINYINT(1)    NOT NULL DEFAULT 0,
  SizeBytes    BIGINT        NULL,
  MimeType     VARCHAR(200)  NULL,
  ContentHash  VARCHAR(128)  NULL,
  CreatedAt    DATETIME(3)   NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UpdatedAt    DATETIME(3)   NOT NULL DEFAULT UTC_TIMESTAMP(3),
  DeletedAt    DATETIME(3)   NULL,
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  FOREIGN KEY (ParentFileId) REFERENCES UserFiles(FileId),
  KEY IX_UserFiles_UserId (UserId),
  KEY IX_UserFiles_Parent (ParentFileId),
  KEY IX_UserFiles_Path (Path(255))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Notes (
  NoteId     CHAR(36)     NOT NULL PRIMARY KEY,
  UserId     CHAR(36)     NOT NULL,
  Title      VARCHAR(500) NOT NULL,
  Content    LONGTEXT     NOT NULL,
  TagsJson   JSON         NULL,
  IsPinned   TINYINT(1)   NOT NULL DEFAULT 0,
  IsArchived TINYINT(1)   NOT NULL DEFAULT 0,
  DeletedAt  DATETIME(3)  NULL,
  CreatedAt  DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UpdatedAt  DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_Notes_UserId (UserId),
  KEY IX_Notes_UpdatedAt (UpdatedAt),
  FULLTEXT KEY FT_Notes_Title_Content (Title, Content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Workspaces (
  WorkspaceId       CHAR(36)     NOT NULL PRIMARY KEY,
  UserId            CHAR(36)     NOT NULL,
  Name              VARCHAR(200) NOT NULL,
  SortOrder         INT          NOT NULL DEFAULT 0,
  WallpaperId       CHAR(36)     NULL,
  ConfigurationJson JSON         NULL,
  CreatedAt         DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UpdatedAt         DATETIME(3)  NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE WindowStates (
  WindowStateId CHAR(36)     NOT NULL PRIMARY KEY,
  UserId        CHAR(36)     NOT NULL,
  WorkspaceId   CHAR(36)     NULL,
  ApplicationKey VARCHAR(150) NOT NULL,
  X INT NULL, Y INT NULL, Width INT NULL, Height INT NULL,
  IsMaximized TINYINT(1) NOT NULL DEFAULT 0,
  IsMinimized TINYINT(1) NOT NULL DEFAULT 0,
  ZIndex      INT        NOT NULL DEFAULT 0,
  StateJson   JSON       NULL,
  UpdatedAt   DATETIME(3) NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  FOREIGN KEY (WorkspaceId) REFERENCES Workspaces(WorkspaceId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE Notifications (
  NotificationId CHAR(36)      NOT NULL PRIMARY KEY,
  UserId         CHAR(36)      NOT NULL,
  Title          VARCHAR(300)  NOT NULL,
  Message        VARCHAR(2000) NOT NULL,
  Severity       VARCHAR(30)   NOT NULL,
  Category       VARCHAR(100)  NULL,
  IsRead         TINYINT(1)    NOT NULL DEFAULT 0,
  CreatedAt      DATETIME(3)   NOT NULL DEFAULT UTC_TIMESTAMP(3),
  ReadAt         DATETIME(3)   NULL,
  MetadataJson   JSON          NULL,
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_Notifications_User_Read (UserId, IsRead)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE AuditLogs (
  AuditLogId   CHAR(36)      NOT NULL PRIMARY KEY,
  UserId       CHAR(36)      NULL,
  Action       VARCHAR(200)  NOT NULL,
  ResourceType VARCHAR(100)  NULL,
  ResourceId   VARCHAR(200)  NULL,
  Severity     VARCHAR(30)   NOT NULL,
  IpAddress    VARCHAR(64)   NULL,
  UserAgent    VARCHAR(1000) NULL,
  MetadataJson JSON          NULL,
  CreatedAt    DATETIME(3)   NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_AuditLogs_UserId (UserId),
  KEY IX_AuditLogs_CreatedAt (CreatedAt),
  KEY IX_AuditLogs_Action (Action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE SyncQueue (
  SyncOperationId CHAR(36)      NOT NULL PRIMARY KEY,
  UserId          CHAR(36)      NOT NULL,
  EntityType      VARCHAR(100)  NOT NULL,
  EntityId        VARCHAR(200)  NOT NULL,
  Operation       VARCHAR(30)   NOT NULL,
  PayloadJson     JSON          NOT NULL,
  AttemptCount    INT           NOT NULL DEFAULT 0,
  Status          VARCHAR(30)   NOT NULL DEFAULT 'PENDING',
  LastError       VARCHAR(2000) NULL,
  CreatedAt       DATETIME(3)   NOT NULL DEFAULT UTC_TIMESTAMP(3),
  UpdatedAt       DATETIME(3)   NOT NULL DEFAULT UTC_TIMESTAMP(3),
  FOREIGN KEY (UserId) REFERENCES Users(UserId),
  KEY IX_SyncQueue_Status (Status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
12.6 Additional required tables
Implement normalized equivalents for: MFA methods, password reset tokens, email verification tokens, OAuth/OIDC identities, device registrations, plugin registrations, application permissions, command definitions, user settings, themes, wallpaper library, wallpaper assignments, media library, playlists, sound preferences, widget instances, widget settings, focus/quiet-hours schedules, accessibility preferences, keyboard shortcuts, file operation history, recovery snapshots, update metadata, release channels, feature flags.

Do not create tables purely for theoretical completeness.

13. DATABASE RULES
UTC timestamps everywhere.

Parameterized SQL only — never string concatenation.

Transactions for multi-step mutations.

Foreign keys enforced.

Indexes based on actual query patterns.

Unique constraints where appropriate.

Soft deletion where recovery is required.

Optimistic concurrency where synchronization requires it.

Migration files committed to Git.

No production database mutation without authorization.

No destructive migration without explicit approval.

Least-privilege database accounts (separate app and migrator accounts).

Backups must be verified, not merely scheduled.

14. API CONTRACT
Base path: /api/v1

Authentication
text
POST   /auth/signup
POST   /auth/login
POST   /auth/logout
POST   /auth/logout-all
POST   /auth/refresh
POST   /auth/verify-email
POST   /auth/resend-verification
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/change-password
POST   /auth/mfa/challenge
POST   /auth/mfa/verify
POST   /auth/mfa/setup
POST   /auth/mfa/disable
GET    /auth/me
PATCH  /auth/me
GET    /auth/sessions
DELETE /auth/sessions/:id
DELETE /auth/sessions
Applications / Workspaces / Notes / Files / Notifications / Sync / System
text
GET|POST|PATCH|DELETE  /applications[/:id]
GET|POST|PATCH|DELETE  /workspaces[/:id]

GET|POST|PATCH|DELETE  /notes[/:id]
GET                    /notes/search

GET                    /files
POST                   /files/folder
POST                   /files/move
POST                   /files/copy
DELETE                 /files/:id
POST                   /files/restore

GET                    /notifications
POST                   /notifications/:id/read
POST                   /notifications/read-all
DELETE                 /notifications/:id

GET                    /sync/status
POST                   /sync/push
POST                   /sync/pull
POST                   /sync/resolve-conflict

GET                    /system/info
GET                    /system/health
GET                    /system/capabilities

GET|POST|PATCH|DELETE  /wallpapers[/:id]
POST                   /wallpapers/import
GET|POST|PATCH|DELETE  /widgets[/:id]
GET|POST|PATCH|DELETE  /media/tracks[/:id]
GET|POST|PATCH|DELETE  /media/playlists[/:id]
POST                   /media/playback/control
GET|POST|PATCH|DELETE  /sessions/lock  (lock/unlock state)
Rate limiting (mandatory on auth endpoints): /auth/signup, /auth/login, /auth/forgot-password, /auth/reset-password, /auth/mfa/verify, /auth/refresh.

15. AUTHENTICATION & IDENTITY SYSTEM (SIGNUP, LOGIN, SESSIONS, MFA)
15.1 Authentication model
DEFAULT DECISION: Server-backed authentication when a backend is configured, with secure local session persistence for offline use. A local profile mode must also work without a remote account, clearly distinguished in the UI.

Supported: email/password, email verification, password reset, MFA (TOTP + recovery codes), optional OAuth/OIDC, session management, session revocation, account deletion, data export.

15.2 Signup flow
text
Launch
→ Signup screen
→ Client-side validation
→ POST /auth/signup
→ Server validation + normalization
→ Duplicate-email check
→ Argon2id password hash
→ User + default role created
→ Email verification token generated (hashed, single-use, 24h expiry)
→ Verification email queued (or skipped if email not configured)
→ Session created (if verification not required to proceed)
→ First-run onboarding
→ Desktop
Signup validation rules
Field	Rule
Email	RFC-compliant, ≤ 320 chars, normalized (trim + lowercase), uniqueness enforced on NormalizedEmail
Display name	1–200 chars, trimmed, control characters rejected
Password	≥ 12 chars; must contain upper, lower, digit, symbol; rejected against a common-password denylist; optional breach check
Confirm password	Must match exactly
Terms acceptance	Explicit checkbox, recorded with timestamp and version
Password policy
Never store plaintext passwords. Argon2id with parameters selected per current library guidance (memory, iterations, parallelism tuned to target hardware).

Passwords must never appear in logs, telemetry, exceptions, Git, brain.md, or configuration files.

Password comparison uses constant-time verification.

15.3 Login flow
text
Launch
→ Login screen
→ POST /auth/login (email + password)
→ Rate limit + lockout check
→ Timing-safe credential verification
→ If MFA enabled → MFA challenge required
→ Issue access token (15m) + refresh token (30d, rotating)
→ Persist refresh token hash server-side (session row)
→ Store tokens securely on device (DPAPI / Credential Manager)
→ Restore workspace
→ Desktop
Login rules
No user enumeration: identical generic error for unknown email and wrong password (AUTH_INVALID_CREDENTIALS).

Rate limiting per email and per IP (sliding window).

Progressive lockout after repeated failures; LockedUntil recorded; unlock path documented.

All attempts recorded in LoginAttempts (never storing the password).

Unverified email → AUTH_EMAIL_NOT_VERIFIED with a resend action.

MFA required → AUTH_MFA_REQUIRED, then /auth/mfa/verify.

Successful login updates LastLoginAt and writes an audit entry.

15.4 Token architecture
Token	Lifetime	Storage	Notes
Access token (JWT)	15 minutes	Renderer memory only	Never persisted to disk
Refresh token	30 days	OS-protected secure storage	Rotating, single-use, hashed server-side
Email verification token	24 hours	Server (hashed)	Single-use
Password reset token	30 minutes	Server (hashed)	Single-use, invalidates on use
MFA challenge token	5 minutes	Server	Short-lived, bound to the login attempt
JWT claims: sub (UserId), sid (SessionId), roles, perms (compact), iat, exp, iss, aud, jti.

Refresh token rotation: each refresh issues a new refresh token and revokes the old one. Reuse of a revoked refresh token revokes the entire token family and raises AUTH_TOKEN_REUSE_DETECTED.

15.5 Session management
Sessions are server-side records (Sessions table) with device name, fingerprint, IP, and user agent.

Users can view and revoke individual sessions and all sessions.

Logout revokes the current session; logout-all revokes every session for the user.

Revocation on password change, MFA change, and detected token reuse.

Sessions visible in Settings → Accounts → Sessions.

15.6 Password reset
POST /auth/forgot-password always returns success (no enumeration).

Token generated, hashed, stored, emailed with a short expiry.

Reset invalidates all existing sessions and refresh tokens.

Reset success triggers a notification to the account owner.

15.7 Email verification
Token hashed at rest, single-use, 24h expiry.

Resend is rate-limited.

Verification status is displayed in Settings and can gate sensitive operations (configurable).

15.8 MFA
TOTP (RFC 6238) with a QR provisioning flow.

Recovery codes generated once, displayed once, stored hashed.

MFA secrets encrypted at rest (never plaintext).

Disabling MFA requires password re-entry and, if configured, a recovery code.

Future: WebAuthn/security keys (architecture-ready, not claimed as implemented until built).

15.9 OAuth / OIDC (optional)
Only via a properly configured provider.

Validate issuer, audience, signature, nonce, and expiry.

Never trust identity claims without full validation.

Linking an OAuth identity to an existing account requires verified email.

15.10 RBAC
Default roles: User, PowerUser, Developer, Administrator, SuperAdministrator.
Scopes: own, team, department, organization, system.

Application Administrator ≠ Windows Administrator. These are separate concepts and must never be conflated in UI copy.

Enforce permissions in UI, API, service layer, database where appropriate, and the native bridge. Never rely on frontend authorization alone.

15.11 Offline authentication
Previously authenticated trusted device only.

Encrypted local session state.

Limited offline functionality.

Configurable offline grace period.

Reauthentication required when policy demands.

Sensitive operations require online authentication where appropriate.

Offline mode must never become an unrestricted security bypass.

15.12 Authentication UI screens
Required screens: Splash/Auth Gate, Login, Signup, Email Verification, Forgot Password, Reset Password, MFA Challenge, MFA Setup, Session List, Account Settings, Lock Screen (see §37).

UX requirements
Password strength meter with actionable guidance (not shaming language).

Show/hide password toggle.

Caps Lock indicator.

Correct autocomplete attributes (username, current-password, new-password, one-time-code).

Inline field validation with accessible error association (aria-describedby).

Keyboard-first operation; Enter submits; Escape clears non-destructive state.

Visible focus rings on every control.

No layout shift when errors appear.

Loading states on submit; submit disabled while pending to prevent duplicates.

Errors are specific and actionable, never "Something went wrong."

Success is never shown before the server confirms it.

Screen-reader announcements for auth state changes.

16. WINDOWS INTEGRATION API MATRIX
Capability	Preferred method	Privilege	Access	Fallback
OS information	Windows APIs / WMI/CIM	None	Read	Node OS info
CPU / Memory	Performance Counters / native API	None	Read	Node metrics
Processes	Native Windows APIs	None	Read	Process list
Process termination	Windows process API	Sometimes elevated	Write	Disabled
Displays	Win32 / DisplayConfig	None	Read	Electron display API
Audio devices	Windows Core Audio	None	Read/control	Electron limits
Battery	Windows battery APIs / WMI	None	Read	Browser/native fallback
Network adapters	Win32 / WMI / CIM	None	Read	Node network info
Power status	Windows power APIs	None	Read	Informational
Power operations	Windows API	User/system dependent	Write	Disabled
Launch applications	Controlled process API	User	Write	Disabled
Filesystem	Node fs via main process	User	Read/write	Disabled
Registry	Win32 registry API	User	Read	Writes disabled
Services	SCM API	Admin for mutation	Read	Informational
Windows updates	Windows APIs where practical	Varies	Read	Informational
System restore	Windows API where supported	Admin	Read/request	Informational
Firewall	Windows Firewall API	Admin	Read	Disabled
Terminal	Controlled process spawn	User	Execute	Disabled
Media keys / SMTC	Windows media transport controls	None	Control	In-app controls only
Windows Hello	WebAuthn / Windows APIs	User	Auth	In-app password unlock
Rule: never use a shell command where a safer native API exists. Never invoke PowerShell merely because it is convenient.

16.1 Capability detection
At startup, determine supported capabilities:

json
{
  "systemInfo":       { "supported": true },
  "processControl":   { "supported": true, "requiresElevation": true },
  "battery":          { "supported": false },
  "mediaKeys":        { "supported": true },
  "windowsHello":     { "supported": true, "requiresEnrollment": true }
}
The UI must react to capability availability and must never fake a toggle.

17. FILESYSTEM SAFETY
Protected paths include at minimum:

text
C:\Windows
C:\Program Files
C:\Program Files (x86)
C:\ProgramData
C:\Windows\System32
C:\Windows\WinSxS
C:\Windows\Installer
C:\Users\<user>\AppData\Local\Microsoft
C:\Users\<user>\AppData\Roaming\Microsoft
WSL distributions
Docker data
OneDrive / cloud-synchronization roots
Visual Studio workspace/build storage
Git repositories unless explicitly selected
The application must not silently delete or modify these.

Storage boundaries must be explicit: application-owned storage, user-authorized locations, read-only protected locations, network locations, unsupported locations.

Never recursively delete a directory without an explicit, understandable confirmation. Never silently overwrite files. Conflict options: Replace / Keep Both / Skip / Cancel.

18. DESKTOP SHELL EXPERIENCE
Implement a unified desktop shell containing:

wallpaper and desktop icons

taskbar / dock

Start / application launcher

system tray

clock and date

notifications

quick settings

widgets

universal search

command palette

window manager

workspaces

multi-monitor support

drag and drop

keyboard navigation

lock screen and session controls

recovery after an application-level error

Every capability must identify whether it is application-only or integrated with Windows.

19. HYBRID DESIGN LANGUAGE
Inspiration ratio (guidance, not cloning):

text
Windows 11:   40%
macOS:        30%
Ubuntu/Linux: 30%
Windows-inspired: taskbar, Start experience, snapping, Fluent-style depth, quick settings, system panels.
macOS-inspired: elegant spacing, dock behavior, workspace overview, restrained glass, polished transitions, high-quality typography.
Ubuntu/Linux-inspired: workspace concepts, application launcher, developer workflows, terminal-first capabilities, productivity organization.

Do not copy: Apple/Windows/Ubuntu logos, proprietary sounds, proprietary wallpapers, proprietary icons, exact proprietary UI artwork, copyrighted source code.

Design principles
Familiar but original · clean and professional · strong hierarchy · consistent interaction patterns · restrained transparency · subtle depth · advanced motion without constant movement · accessible contrast · responsive layout · functional before decorative.

Avoid: excessive gradients, meaningless dashboard cards, decorative charts with fabricated data, glass panels without purpose, animation that slows routine work.

20. WINDOW MANAGER
Every application window has: id, applicationId, workspaceId, title, position, size, minimumSize, maximumSize, state, zIndex, focused, alwaysOnTop, resizable, movable, closable, minimizable, maximizable.

States: NORMAL, MINIMIZED, MAXIMIZED, FULLSCREEN, SNAPPED_LEFT, SNAPPED_RIGHT, SNAPPED_TOP, SNAPPED_BOTTOM, TILED, SNAP_GRID.

Implement: focus, z-index, minimize, restore, maximize, close, resize, move, snap, tile, fullscreen, multi-window, workspace reassignment, title bars, window menus, snap layouts, split-screen, edge snapping, cascading/tiling, position persistence, dialog ownership, modal and nonmodal windows.

Acceptance criteria
Only one application window is the active keyboard target at a time.

Closing a window does not unexpectedly delete its saved data.

Minimized windows can be restored.

Focus returns to an appropriate window after a dialog closes.

Snap layouts respect minimum window dimensions.

Window state is restored safely after restart.

Invalid saved geometry falls back to a safe visible position.

Rapid clicks do not produce duplicate windows or corrupted state.

All primary operations have keyboard alternatives.

21. VIRTUAL WORKSPACES
Application-level workspaces with: create, rename, switch, delete, duplicate, reorder; workspace thumbnails; assign applications; move windows between workspaces; per-workspace pinned applications; per-workspace wallpaper; workspace transition animations; keyboard shortcuts; restore the previous workspace after restart.

Default:

text
Workspace 1 — General
Workspace 2 — Development
Workspace 3 — Communication
Workspace 4 — Research
Do not claim these are native Windows virtual desktops unless a verified native Windows capability is used.

22. TASKBAR / DOCK
Support: pinned apps, running apps, active state, badges, context menus, drag/drop, application launch, workspace indicator, system tray, clock, notification indicator.

Settings: position, size, auto-hide, transparency, animation, icon size, grouping, alignment, multi-monitor behavior.

Hover effects must not obstruct clicking or keyboard focus. Provide accessible keyboard navigation and a reduced-animation mode.

23. START / APPLICATION LAUNCHER
Support: application search, recent applications, pinned applications, categories, recommended items, power controls, settings, user profile, search integration, alphabetical listing, pin/unpin, reordering, application details, launch error reporting.

Power actions must be clearly separated from application actions. Any actual shutdown/restart/sleep operation requires user confirmation. Search must not silently index private directories or transmit queries remotely.

24. UNIVERSAL SEARCH
Search: applications, commands, files, folders, notes, settings, workspaces, system information, help articles, recent items (if enabled).

Ranking: exact match > prefix match > recent usage > frequency > category relevance > keyword relevance.

Use debouncing, cancellation of stale requests, clear loading states, and indexed local search. Provide privacy settings for indexed locations, search history, and recent-item tracking. Never index sensitive content without consent.

25. COMMAND PALETTE
Keyboard-first palette (default Ctrl + Shift + P, user-customizable). Searches applications, opens settings, switches workspaces, creates a note, opens a folder, runs approved internal commands, searches application data, displays shortcuts, navigates to recent items, opens help/diagnostics.

Commands display title, description, shortcut, category, required permission, and current availability. It must never execute arbitrary shell commands by default.

26. SYSTEM APPLICATIONS
Priority order:

File Explorer

Notes

Text Editor

Calculator

Clock

Settings

System Information

Task Manager

Notification Center

Terminal Center

Developer Workspace Manager

Application Catalog

Backup and Recovery

Event and Diagnostic Viewer

File Explorer
Drives, folders, files, breadcrumbs, search, sorting, filtering, grid/list/details views, context menus, create folder, rename, copy, move, delete, restore, properties, favorites, recent items, multi-select, drag-and-drop, progress reporting, permission errors, recovery after interrupted operations.

Notes
Create, edit, delete, pin, archive, search, tags, autosave with visible status, timestamps, offline editing, synchronization, conflict resolution, Markdown support, word/character counts, trash and recovery, import/export.

Text Editor
Plain text, syntax highlighting, tabs, find/replace, line numbers, encoding detection, unsaved-change indicator, recovery, large-file safeguards (never load an extremely large file into memory without checking its size).

Terminal Center
Controlled access to PowerShell, Command Prompt, Git Bash, and WSL where available. Each shell must be explicitly detected. Do not assume bash = WSL or bash = Git Bash. Terminal execution must be clearly marked as an external process.

Calculator, Clock
Standard/scientific calculation; world clock, alarms, timers, stopwatch, with accessible controls and persistence.

System Information
Windows version, architecture, CPU, RAM, storage, GPU, displays, network, battery, audio devices, processes, uptime, application version. Read-only by default.

Task Manager
Process name, PID, CPU, memory, path where available, status, application classification. Termination disabled by default, confirmation required, protected processes blocked, administrative requirements clearly shown.

Performance Dashboard
Live CPU, memory, disk, network, GPU (where available) with configurable sampling intervals and history.

Additional utilities (implement progressively, only when done honestly)
Clipboard history, screenshot & screen recording, calendar, weather (requires a provider + consent, otherwise INFORMATIONAL), archive manager, image viewer, PDF viewer, sticky notes, to-do, focus timer, color picker, hash checker, regex tester, JSON formatter, Base64 tool, port checker, duplicate finder, disk usage analyzer, emoji picker, quick actions.

Only implement features to the extent they can be done honestly and safely.

27. SETTINGS / CONTROL CENTER
text
Appearance            Themes                Wallpaper
Colors & Accent       Animations            Sounds & Effects
Widgets               Lock Screen           Accessibility
Keyboard              Mouse                 Touch
Workspaces            Taskbar / Dock        Applications
Notifications         Privacy               Security
Accounts              Authentication        Sessions
Sync                  Storage               Network
Audio                 Displays              Performance
Media (Groove)        Photos & Wallpapers   Developer
Terminal              Updates               Backup
Recovery              About
Every setting must persist, validate on load, and fall back to a safe default if invalid or missing.

28. ADVANCED ANIMATION SYSTEM
The user requires very high-quality, advanced animation — not careless maximum animation.

Objective: maximum perceived polish, not maximum unnecessary movement.

28.1 Architecture
Centralized motion system with: shared timing tokens, standard easing curves, reusable transitions, reduced-motion support, animation cancellation, interruption handling, performance-aware fallbacks, consistent motion direction, state-driven animation, and no duplicated competing animation systems.

DEFAULT DECISION: Prefer CSS transitions and transform/opacity for ordinary interface motion. Introduce a library such as Framer Motion only where it adds meaningful value; never run two overlapping animation libraries.

28.2 Animation profiles
Profile	Behavior
Minimal	Essential feedback only; short transitions, minimal movement
Balanced	Smooth everyday interactions and restrained effects
Enhanced	Richer window, panel, workspace, and notification transitions
Immersive	Expressive transitions and optional ambient effects, subject to performance and accessibility
Plus toggles for: Performance Mode, Reduced Motion, disable animated backgrounds, disable decorative particles, disable blur, disable sound effects, and per-category effect controls.

DEFAULT DECISION: DEFAULT_EFFECTS_MODE=balanced (matches .env).

28.3 Required motion catalog
Desktop & window: window open, close, minimize, restore, maximize, resize feedback, focus transitions, snap-layout previews, snap completion, window switching, workspace switching, application overview in/out, desktop context menu, shadow and elevation transitions, taskbar thumbnail preview appear/dismiss, snap-layout flyout open/close, snap-assist entrance.

Navigation: Start menu open/close, dock hover/focus, search opening, command palette opening, quick settings, notification center, settings navigation, tabs and segmented controls, breadcrumbs, expandable sections, sidebar collapse/expand, widget board slide, media mini-player expand/collapse.

Feedback: button press, toggle changes, checkbox changes, save confirmation, copy confirmation, drag-and-drop targets, file movement, upload/download progress, validation errors, toast entrance/dismissal, notification arrival, progress completion, warning emphasis, empty-state transitions, wallpaper apply confirmation, lock/unlock transition.

Productivity: note creation, note saving, list insertion/removal, grid/list view changes, search result updates, filter/sort changes, workspace thumbnails, backup progress, restore progress, sync status changes.

Media (Groove): play/pause morph, track transition crossfade, queue reorder, visualizer fade-in, volume slider response, full-screen player transition.

28.4 Timing defaults
Interaction	Default
Button press	80–140 ms
Hover/focus emphasis	100–160 ms
Tooltip	120–200 ms
Dropdown/menu	120–200 ms
Toast	160–240 ms
Dialog	160–240 ms
Window transition	180–280 ms
Workspace transition	220–360 ms
Complex overview transition	250–400 ms
Lock/unlock transition	220–340 ms
Shorten or eliminate motion when it impedes responsiveness or accessibility. Never require a user to wait for decorative animation before interacting.

28.5 Advanced visual effects
Acrylic-style surfaces, frosted-glass panels, layered shadows, subtle depth, accent-colored focus rings, gradient accents, adaptive wallpaper colors, soft background transitions, optional ambient glow, lightweight particle/parallax effects, contextual color feedback, dynamic taskbar/dock emphasis, optional animated wallpapers (if efficient), optional desktop visualizer effects that never obscure information.

These must be optional where they materially affect performance, readability, or accessibility. Do not use blur as a substitute for hierarchy. Avoid constant pulsation, aggressive color cycling, flashing lights, excessive neon.

28.6 Implementation requirements
Prefer transform and opacity. Avoid repeated layout-triggering animations. Avoid unbounded animation loops. Pause decorative animations when hidden or minimized. Cancel stale animations during rapid interaction. Support reduced motion. Avoid rapid flashing. Never use motion as the sole status indicator. Keep focus indicators visible. Avoid layout shift. Remain usable under high DPI and display scaling.

28.7 Acceptance criteria
Animation never blocks essential input. Window state remains correct if transitions are interrupted. Rapid clicks do not produce duplicate windows or corrupted state. Reduced Motion substantially removes nonessential motion. Performance Mode disables expensive decorative effects. Visual state and application state remain synchronized. No continuous animation consumes significant idle CPU without a user-visible purpose.

29. ANIMATION PERFORMANCE RULES
Never animate: layout-heavy properties unnecessarily, huge DOM trees, expensive blur regions continuously, large canvas effects continuously, high-frequency shadows, unnecessary full-screen filters.

Prefer transform, opacity, and GPU-compositor-friendly properties. Avoid animating top, left, width, height where a transform will do.

30. COLOR & THEME SYSTEM
30.1 Semantic color tokens
text
accent
accent-hover
accent-active
accent-subtle
background
background-elevated
surface
surface-elevated
surface-sunken
overlay-scrim
text-primary
text-secondary
text-tertiary
text-disabled
text-inverse
border
border-strong
border-subtle
focus
success
warning
danger
info
disabled
30.2 Token structure
css
:root {
  /* Brand / accent ramp */
  --accent-50:  #eef2ff;
  --accent-100: #e0e7ff;
  --accent-200: #c7d2fe;
  --accent-300: #a5b4fc;
  --accent-400: #818cf8;
  --accent-500: #4267d5;   /* primary accent */
  --accent-600: #3a58b8;
  --accent-700: #31499b;
  --accent-800: #283a7d;
  --accent-900: #1f2c60;

  /* Neutrals */
  --neutral-0:   #ffffff;
  --neutral-50:  #f7f8fa;
  --neutral-100: #eef0f4;
  --neutral-200: #d9dde3;
  --neutral-300: #bcc2cc;
  --neutral-400: #9098a5;
  --neutral-500: #6b7381;
  --neutral-600: #4d5563;
  --neutral-700: #363d49;
  --neutral-800: #232932;
  --neutral-900: #161a21;
  --neutral-950: #0d1015;

  /* Semantic (light theme) */
  --color-background:        var(--neutral-50);
  --color-surface:           var(--neutral-0);
  --color-surface-elevated:  var(--neutral-0);
  --color-surface-sunken:    var(--neutral-100);
  --color-text-primary:      var(--neutral-900);
  --color-text-secondary:    var(--neutral-600);
  --color-text-disabled:     var(--neutral-400);
  --color-border:            var(--neutral-200);
  --color-accent:            var(--accent-500);
  --color-success:           #21864b;
  --color-warning:           #a96808;
  --color-danger:            #c43c3c;
  --color-info:              #2563a8;
  --color-focus:             var(--accent-500);

  /* Shape & motion */
  --radius-small: 6px;
  --radius-medium: 10px;
  --radius-large: 16px;
  --radius-squircle: 28%;

  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;
  --space-4: 16px; --space-6: 24px;  --space-8: 32px;

  --motion-fast: 120ms;
  --motion-standard: 200ms;
  --motion-emphasized: 320ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
30.3 Color behaviors
Accent colors, dynamic accent, semantic colors, gradients, subtle glass, glow, depth, hover illumination, active-state emphasis, wallpaper-aware accents.

Effects must never reduce text readability.

Dynamic accent may be derived from the active wallpaper, but must always pass contrast validation before being applied to text or focus rings.

Provide per-user accent selection plus a curated set of accessible presets.

30.4 Theme catalog
Required: System, Light, Dark, High Contrast.
Optional: Midnight, Graphite, Aurora, Ocean, Forest, Solar, Ubuntu-inspired, Developer, Minimal.

Themes must be token-based. Do not hardcode colors throughout components. Optional themes use the same semantic tokens and must pass contrast testing.

30.5 Contrast requirements
Normal text ≥ 4.5:1

Large text ≥ 3:1

Important UI indicators target ≥ 3:1 where WCAG requires

Automated contrast validation must run in CI for every shipped theme

31. WALLPAPER SYSTEM — RICH HIGH-RESOLUTION WALLPAPERS & VISUAL THEMES
Currently missing real imagery. This section corrects that.

31.1 Wallpaper categories
text
Abstract      Nature        Minimal       Dark
Developer     Space         Gradient      Seasonal
Solid         Live/Animated Textured      Artistic
Photography   Brand/Original
31.2 Resolution & format tiers
Tier	Target resolution	Format	Use
Thumbnail	320×180	WebP	Library grid
Preview	1280×720	WebP	Detail view
Standard	1920×1080	WebP/AVIF	FHD displays
High	2560×1440	WebP/AVIF	QHD
Ultra	3840×2160	AVIF/WebP	4K
Extreme	5120×2880 / 7680×4320	AVIF	5K/8K, opt-in
Load the correct tier for the target monitor. Never decode an 8K image to render a 320px thumbnail on the main thread.

31.3 Image sources and licensing
Ship only original, commissioned, or properly licensed imagery.

Acceptable sources include permissively licensed stock libraries (verify each license), public-domain works, and procedurally generated artwork.

Do not ship Microsoft, Apple, or Ubuntu wallpapers, or any copyrighted operating-system artwork.

Every bundled asset must record: source, author, license, attribution requirement, modification permission, distribution permission → docs/THIRD_PARTY_LICENSES.md and assets/wallpapers/ATTRIBUTION.md.

31.4 Procedurally generated wallpapers
Provide an in-house generator for: mesh gradients, flow fields, noise fields, particle drift, aurora bands, geometric line art, topographic contours, star fields, bokeh fields. These are original by construction, resolution-independent, and lightweight — excellent defaults when licensed photography is unavailable.

31.5 Wallpaper features
Import user images (drag-and-drop and file picker) with format validation.

Per-monitor wallpaper assignment.

Per-workspace wallpaper assignment.

Slideshow / playlist with interval, shuffle, and transition (crossfade, slide, zoom, none).

Dynamic wallpaper: time-of-day color shift, seasonal rotation, accent extraction.

Live/animated wallpapers only when performance permits, and paused when occluded or minimized.

Favorites, tags, search, and sorting in the wallpaper library.

"Fit / Fill / Stretch / Center / Tile / Span" scaling modes.

Safe fallback if a wallpaper file is deleted or corrupt (never render a blank desktop).

31.6 Performance rules
Lazy-load the library; virtualize the grid.

Downscale thumbnails once and cache them.

Decode off the main thread where possible.

Preload only the next slideshow image.

Cap concurrent decodes.

Provide a "reduce wallpaper quality" option in Performance Mode.

32. SOUND EFFECT SYSTEM
32.1 Categories
text
UI  WINDOW  WORKSPACE  NAVIGATION  NOTIFICATION
SUCCESS  WARNING  ERROR  APPLICATION  ACCESSIBILITY
SYSTEM  MEDIA
Events include: application open/close, notification, success, warning, error, workspace switch, file operation, login success, authentication failure, lock/unlock, snap completion, wallpaper apply.

Every sound must have a visual equivalent. Never use sound as the sole indicator of status.

32.2 Controls
Master volume, category volumes, mute all, sound theme selection, preview buttons, per-category enable/disable, reset to defaults. Respect the Windows mute/volume state where possible.

32.3 Rules
Original or properly licensed audio only. Do not use copyrighted OS sounds.

Short, subtle, consistent loudness; no clipping; no overlapping chaos; rate-limited.

Never autoplay loud audio at startup.

Missing audio assets fail gracefully and never crash the app.

Silent operation is a first-class option.

Governed by ENABLE_WEB_AUDIO_SOUNDS and the current animation/effects profile.

33. DESKTOP WIDGETS LAYER (WINDOWS 11 / MACOS SONICS)
A dockable, resizable, reorderable widget board inspired by Windows 11 widgets and macOS Sonoma-style desktop composition.

33.1 Widget board
Slide-in panel anchored to the taskbar/dock, plus optional free-floating desktop widgets.

Grid layout with small / medium / large sizes.

Drag-to-reorder, resize handles, pin/unpin, remove.

Per-workspace widget sets.

Keyboard navigation: arrow keys between widgets, Enter to activate, Delete to remove (with confirmation).

Reduced-motion and performance-aware transitions.

33.2 Built-in widgets
Widget	Classification	Notes
Clock / World Clock	REAL	Local + configurable time zones
Calendar	REAL	Month view, agenda, today highlight
Weather	INFORMATIONAL unless a provider + consent is configured	Never fabricate data
System Performance	REAL + WINDOWS-INTEGRATED	CPU, RAM, disk, network, GPU where available
Battery	WINDOWS-INTEGRATED	Hidden on desktops without a battery
Storage	REAL	Capacity and usage with a clear "informational" label
Notes (mini)	REAL	Quick capture into Notes
To-Do (mini)	REAL	Local task list
Media (Groove mini)	REAL	Now-playing, transport controls
Photo Frame	REAL	Rotates from the wallpaper/photo library
Workspace Summary	APPLICATION-SIMULATED	Open windows per workspace
Quick Actions	REAL	Mute, theme toggle, focus mode, lock
Countdown / Timer	REAL	Persisted across restarts
Network Status	WINDOWS-INTEGRATED	Adapter state, throughput
Never invent widget data. If a data source is unavailable, show an honest empty/unavailable state.

33.3 Widget platform
Widgets are registered components declared in a manifest with required permissions.

Third-party widgets run sandboxed and cannot access the filesystem, network, or native APIs without explicit, user-approved capabilities.

Widget update intervals are configurable with sane minimums (e.g. ≥ 1s for performance, ≥ 60s for weather).

Widgets pause updates when off-screen, when the board is closed, or in Performance Mode.

33.4 Performance rules
No continuous GPU rendering for static widgets.

Cap simultaneous animated widgets.

Virtualize the widget board.

Update on visibility, not on a global timer.

Memory and CPU budgets documented in docs/PERFORMANCE.md.

34. ANTIGRAVITY GROOVE — MEDIA PLAYER & SOUNDSCAPE STUDIO
A first-party media application combining a music player, a soundscape generator, and a lightweight visualizer. Gated by ENABLE_WEB_AUDIO_SOUNDS.

34.1 Media Player
Library

Scan user-authorized folders only (never scan system or protected paths).

Supported formats: MP3, FLAC, WAV, OGG/Vorbis, Opus, M4A/AAC, WMA (where a codec is available).

Metadata reading (title, artist, album, track, year, artwork) with graceful fallback for missing tags.

Incremental indexing with progress, cancellation, and resume.

Duplicate detection by content hash.

Playback

Play, pause, stop, next, previous, seek, volume, mute.

Shuffle, repeat one, repeat all, gapless playback where feasible.

Queue management with drag-to-reorder and "play next" / "add to queue".

Playback speed (0.5×–2.0×) and optional pitch preservation.

Equalizer (10-band) with presets and a custom profile.

Crossfade with configurable duration.

Resume-on-restart with safe state persistence.

Organization

Playlists (create, rename, reorder, delete, import/export M3U).

Favorites, recently played, most played.

Search across library metadata.

Smart playlists (rule-based: genre, year, rating, play count).

Integration

Mini-player widget.

Taskbar/dock media controls and thumbnail transport buttons.

Windows media key / SMTC integration where permitted — classified WINDOWS-INTEGRATED; otherwise falls back to in-app controls and is labeled honestly.

Optional global media shortcuts (user-configurable, conflict-checked).

34.2 Soundscape Studio
Layered ambient generator: rain, thunder, ocean waves, forest, wind, birds, cafe murmur, fireplace, white/pink/brown noise, fan, train, keyboard.

Independent per-layer volume, mute, and solo.

Layer presets ("Deep Focus", "Rainy Night", "Calm Morning") with save/rename/delete.

Focus timer (Pomodoro-style) and sleep timer with gentle fade-out.

Crossfade between presets.

Optional subtle generative variation so loops do not feel mechanical.

All generators are synthesized or properly licensed — no scraped audio.

34.3 Visualizer
Modes: spectrum bars, oscilloscope, waveform, particles, radial.

GPU-friendly canvas; caps frame rate; pauses when hidden, minimized, or in Performance Mode.

Reduced-motion users receive a static or low-motion alternative.

34.4 Audio engine
Web Audio API graph: source → gain → EQ → compressor/limiter → analyser → destination.

Master limiter prevents clipping when layers stack.

Smooth gain ramps; no clicks or pops.

Proper node teardown on track change to avoid leaks.

Audio decoding off the main thread where possible.

Malformed or unsupported files produce MEDIA_DECODE_FAILED and never crash the app.

34.5 Licensing and privacy
Only user-owned or properly licensed audio.

No telemetry about listening habits unless explicitly opted in.

Playback history is local by default and user-deletable.

Do not scan folders the user has not authorized.

35. PHOTO & WALLPAPER STUDIO
A non-destructive image editor and wallpaper composition tool.

35.1 Library
Import from user-authorized folders and drag-and-drop.

Formats: JPG, PNG, WebP, AVIF, BMP, GIF (static frame), HEIC where a codec is available.

Grid and detail views, tags, favorites, ratings, albums.

Duplicate detection and near-duplicate grouping.

EXIF read (camera, date, dimensions) displayed honestly; missing data shown as unknown.

File size and dimension display before applying as a wallpaper.

35.2 Editing (non-destructive)
Crop (freeform, aspect presets, monitor aspect ratios).

Rotate, straighten, flip.

Scale and resample with quality preservation.

Adjust: brightness, contrast, exposure, saturation, vibrance, temperature, tint, highlights, shadows, sharpness, blur, vignette, grain.

Filters/LUT-style presets (original, not copied from other products).

Before/after comparison slider.

Full undo/redo history; edits stored as a parameter stack, not destructive pixel writes.

35.3 Wallpaper composition
Target a specific monitor or a multi-monitor span.

Compose a single image across multiple displays with correct per-monitor resolution.

Preview exactly what will be applied, including taskbar/dock occlusion areas.

Export at monitor-native resolution in AVIF/WebP/PNG/JPG.

One-click "Apply as wallpaper" with the ability to revert to the previous wallpaper.

35.4 Slideshow creation
Build a slideshow playlist from selected images with interval, order, transition, and shuffle; preview before enabling.

35.5 Safety and performance
Never overwrite the user's original file without explicit confirmation; default to "Save a copy."

Large images processed off the main thread with progress and cancellation.

Cap decode size; refuse or downscale absurdly large inputs with a clear explanation.

Do not upload user photos anywhere.

36. VISUAL IDENTITY OVERHAUL — 3D SQUIRCLE APP ICON BADGES
A unified icon system giving the desktop a distinctive, premium identity.

36.1 Squircle geometry
Superellipse / squircle shape (iOS/macOS-like continuous corner), not a plain rounded rectangle.

Implemented as an SVG path or a CSS clip-path generated from a superellipse formula with configurable "squircle-ness."

Consistent optical sizing across the dock, taskbar, Start menu, window title bars, and the Application Catalog.

36.2 3D layered composition
Each badge is composed of layers:

Base plate — squircle with the app's gradient.

Ambient occlusion — soft inner darkening at the lower edge.

Inner shadow — subtle top-edge depth.

Specular highlight — soft directional sheen.

Glow / accent bleed — accent-colored halo, theme-aware.

Glyph — monochrome or duotone, centered with optical alignment.

State badge — notification count, running dot, pinned marker, disabled overlay.

36.3 Interaction motion
Hover: subtle perspective tilt (±6–8°), spring return, highlight shift.

Press: compression with a spring release.

Launch: scale + fade into the window opening animation.

Drag: lift elevation with a soft drop shadow.

All motion respects Reduced Motion and Performance Mode.

36.4 Sizing & assets
Size	Use
16 / 20	Title bar, menus
24 / 32	Taskbar small, lists
48 / 64	Dock, Start grid
96 / 128	App catalog detail
256 / 512	Store/detail, high DPI
Prefer SVG/vector sources; rasterize only for packaging.

Ship 1×, 1.5×, 2×, 3× variants.

Provide a monochrome high-contrast variant for accessibility themes.

36.5 Consistency rules
One <AppIconBadge /> component renders every icon — no ad-hoc icon styling.

Icon base colors derive from theme tokens; a per-app accent may override but must pass contrast checks.

Third-party/plugin apps supply a base glyph; the system applies the squircle/3D treatment so the desktop stays visually coherent.

Missing icon → deterministic generated fallback (glyph from the app's initials or category), never a broken image.

36.6 Accessibility
Every icon has an accessible name and role.

Focus ring is always visible and not clipped by the squircle clip path.

Hover-only states have keyboard equivalents.

No motion when Reduced Motion is enabled.

Icons remain distinguishable in grayscale and in High Contrast mode.

37. LOCK SCREEN & SESSION SECURITY SIMULATION
Classification: APPLICATION-SIMULATED. This locks the application, not Windows. It must never be described as locking the operating system.

37.1 Lock screen composition
Full-screen wallpaper (reuses the active wallpaper, with an optional dedicated lock wallpaper).

Large clock and date, locale-aware (12h/24h per user setting).

User avatar, display name, and account state.

Notification summary count — content hidden by default with a user setting to show or hide previews.

Quick actions: network status, volume, accessibility shortcuts, sign-out.

Optional "Lock after idle" indicator and remaining time before automatic lock.

37.2 Session state machine
text
ACTIVE  →  IDLE  →  LOCKED  →  AUTHENTICATING  →  ACTIVE
                              ↘  FAILED (retry / cooldown)
ACTIVE  →  SIGNING_OUT  →  SIGNED_OUT
ACTIVE  →  EXPIRED  →  SIGNED_OUT
37.3 Lock triggers
Manual lock: Ctrl + Alt + L (configurable, conflict-checked).

Idle timeout (configurable: 1, 5, 10, 15, 30, 60 minutes, never).

System sleep/suspend detection where available.

Application window hidden/minimized for an extended period (optional).

After a configurable number of failed unlock attempts.

On explicit "Lock" from the Start menu, tray, or Quick Settings.

Note: detecting the Windows lock event requires a native integration and is classified WINDOWS-INTEGRATED only if genuinely implemented; otherwise only in-app triggers apply.

37.4 Unlock methods
Method	Classification
Password	REAL
PIN (local, rate-limited)	REAL
Biometric (Windows Hello / WebAuthn)	WINDOWS-INTEGRATED if implemented; otherwise UNSUPPORTED
Recovery code	REAL (MFA accounts)
37.5 Security requirements
Failed unlock attempts are rate-limited with progressive cooldown.

Unlock attempts are audited (never logging the credential).

Optional full sign-out after N failed attempts.

Sensitive content is obscured while locked: window contents blurred or hidden, notifications redacted, media metadata optionally hidden.

Lock state survives application restart; unlocking is required before content is restored.

Lock screen cannot be bypassed by keyboard shortcuts, the command palette, or deep links.

Accessibility: full keyboard operation, screen-reader announcements, High Contrast support, and a Reduced Motion transition.

37.6 Privacy
Hide notification content on the lock screen by default.

Option to hide the user's full email/name on the lock screen.

Optional "privacy screen" that blurs everything except the lock UI.

38. TASKBAR WINDOW THUMBNAIL PREVIEWS & SNAP ANIMATIONS
Classification: APPLICATION-SIMULATED. These are in-application window previews, not the Windows taskbar's own previews.

38.1 Thumbnail previews
Hovering a taskbar/dock item shows a preview card after a short delay (~250 ms, configurable).

Preview shows the window title, application icon (squircle badge), and a live or cached thumbnail.

Multiple windows of the same app are grouped into a single flyout with per-window entries.

Each preview offers: focus, minimize/restore, close.

Keyboard equivalents: focus the taskbar item, press ↑ to open the preview strip, arrow between windows, Enter to focus, Delete to close (with confirmation if the window has unsaved work).

Pinned apps with no open window show a jump list instead of a thumbnail.

Thumbnail generation
Capture window content via an in-app render snapshot or a throttled capturePage-style mechanism on the main process.

Throttle aggressively: refresh at most a few frames per second, only for visible previews.

Pause all capture when the preview is closed, the app is minimized, or Performance Mode is enabled.

Cache the last good thumbnail per window; fall back to an icon-only card if capture fails.

Never capture when the window is locked or privacy mode is active.

Privacy
Provide a "do not capture previews for sensitive apps" setting.

Lock-screen state disables all thumbnail capture.

38.2 Snap layout flyout
Hovering the maximize button (or pressing Ctrl + Alt + Z) opens a snap layout grid.

Layout options adapt to the window's current monitor aspect ratio: 2-column, 3-column, 2×2, 3×2, 1+2, wide+stack, etc.

Zones highlight on hover with a smooth scale/fade; the selected zone previews the resulting window bounds.

Clicking a zone snaps the window; Esc cancels.

Fully keyboard-navigable: arrows move between zones, Enter confirms.

38.3 Snap assist
After a snap, the remaining space shows a snap assist chooser listing open windows with thumbnails.

Selecting one fills the remaining zone.

Dismissible with Esc and disabled in Settings if unwanted.

38.4 Snap animations
Action	Motion
Layout flyout open	Scale from the maximize button + fade, ~180 ms, ease-decelerate
Zone hover	Subtle scale (1.0 → 1.03) + accent border, ~120 ms
Snap commit	Window bounds animate to the zone with a gentle spring, ~240 ms
Snap assist entrance	Fade + slight upward slide, ~200 ms
Unsnap / restore	Reverse spring with slight overshoot, ~220 ms
Thumbnail preview open	Scale + fade from the taskbar item, ~160 ms
Thumbnail preview close	Fade + scale down, ~120 ms
All snap animations must be interruptible: if the user drags mid-animation, the animation cancels cleanly and the window follows the pointer.

38.5 Snap acceptance criteria
Snapping respects minimum window dimensions; a zone too small for a window is disabled with a tooltip explanation.

Snap state persists across restart and restores to a valid visible region.

Disconnecting a monitor moves snapped windows back to a valid display.

Rapid snap commands do not corrupt window state.

Every snap action has a keyboard equivalent.

Reduced Motion replaces spring animations with short fades.

39. ACCESSIBILITY
Target WCAG 2.2 AA for applicable interface content.

Keyboard-only operation for all essential features.

Visible focus indicators at all times.

Logical focus order; focus trap in dialogs; focus restoration on close.

Correct accessible names and roles; semantic controls.

Screen-reader-friendly dialogs, menus, notifications, and forms.

Sufficient contrast (normal ≥ 4.5:1, large ≥ 3:1, key indicators ≥ 3:1).

Scalable text without layout breakage.

No color-only status communication.

Reduced-motion support throughout.

Accessible notifications (visual + optional audio).

Error messages programmatically associated with the relevant controls.

Keyboard-accessible alternatives to drag-and-drop.

Minimum touch/click target guidance.

Screen-reader targets: Windows Narrator, NVDA, JAWS where practical.

Menus close predictably; keyboard navigation never depends on mouse hover.

40. INTERNATIONALIZATION & LOCALIZATION
Architecture:

text
i18n/
  en-US
  ur-PK
DEFAULT DECISION: Initial languages English (US) and Urdu (Pakistan). Architecture must allow Arabic, Hindi, French, German, Spanish, and others later without rewrites.

Support: RTL, locale-aware dates, time zones, numbers, currencies, pluralization, localized error messages, font fallback. Store timestamps in UTC and display per locale/time zone. Support 12-hour, 24-hour, and automatic formats. Never concatenate translated strings incorrectly — use translation keys.

DEFAULT DECISION: Do not claim complete RTL support until it has been implemented and tested.

41. PERFORMANCE, RELIABILITY & BUDGETS
41.1 Budgets (engineering targets, not guarantees)
Metric	Initial target
Cold startup	≤ 5 s on reference hardware
Warm startup	≤ 3 s to interactive shell
Idle CPU	≤ 2–3 % average when truly idle
Idle memory	≤ 400–500 MB for the baseline shell (excluding deliberately opened heavy apps)
Routine interaction	≤ 100 ms response
Animation	60 FPS target; avoid sustained frames > 33 ms
Renderer bundle	Aim < 1 MB compressed initial JS where practical
Search	Initial local results quickly; never block the UI
Large file operations	Non-blocking with progress and cancellation
Record actual measurements on documented hardware. Do not fabricate performance numbers.

41.2 Performance modes
Battery Saver · Performance · Balanced · Immersive

DEFAULT DECISION: Balanced. Performance/Battery modes may reduce blur, shadows, background effects, animation complexity, sound effects, widget update rates, wallpaper quality, and thumbnail capture frequency.

41.3 Reliability
Handle expected errors explicitly.

Prevent duplicate actions during pending operations.

Make writes transactional where appropriate.

Preserve user data after crashes.

Validate saved state; recover from corrupted settings.

Avoid unhandled promise rejections.

Provide structured diagnostics and a clear recovery process.

Release listeners, audio nodes, capture streams, and timers.

41.4 Minimum hardware
text
CPU: modern x64 dual-core or better
RAM: 8 GB minimum / 16 GB recommended
Storage: SSD recommended
GPU: DirectX-capable integrated GPU
Display: 1280×720 minimum
Best experience: 16 GB RAM, modern 4+ core CPU, SSD, DirectX-capable GPU, 1920×1080+.

41.5 Supported platform
DEFAULT DECISION: Windows 11 x64 first. Windows 10 x64 only if runtime and lifecycle requirements remain compatible. ARM64 must not be advertised as fully supported unless all native components support it. Unsupported features must be detected at runtime and reported honestly.

42. TESTING STRATEGY
Create: unit, integration, API contract, repository/persistence, authorization, input validation, IPC security, accessibility, visual regression, E2E, performance, recovery, and Windows compatibility tests.

42.1 Coverage targets
DEFAULT DECISION:

Critical security and authorization logic: full branch review with tests for every identified boundary.

Core domain logic: ≥ 80 % meaningful statement coverage.

Other business logic: ≥ 70 % meaningful statement coverage.

UI components: test meaningful interactions, keyboard behavior, and error states — do not chase a percentage.

Every destructive operation: safety and failure-path tests.

Every feature marked complete: acceptance criteria and test evidence.

Coverage numbers alone do not prove quality.

42.2 E2E coverage
text
signup · login · MFA · logout · session revocation
first run · desktop · launcher · application launch
window lifecycle · snapping · thumbnails · workspaces
notes · file operations · settings · notifications
wallpaper apply · widget board · media playback
lock / unlock · recovery · offline behavior
E2E execution requires explicit authorization if it launches the application.

42.3 Test data
Synthetic only. Never production credentials. Never real customer data without authorization. Deterministic fixtures. Cleanup must not delete user data. Isolated or in-memory databases. Destructive test scope must be explicit.

43. GIT WORKFLOW AND IMPLEMENTATION DISCIPLINE
43.1 Mandatory commits
Every meaningful implementation unit results in a Git commit:

text
feat(shell): implement desktop shell
feat(window-manager): add window lifecycle
feat(window-manager): add snap layouts and assist
feat(taskbar): add window thumbnail previews
feat(workspaces): implement workspace state
feat(auth): implement signup and login
feat(auth): add refresh token rotation and reuse detection
feat(security): add lock screen session state machine
feat(db): add MySQL migrations
feat(wallpapers): add high-resolution wallpaper library
feat(wallpapers): add procedural wallpaper generator
feat(studio): add photo editor and wallpaper composer
feat(widgets): implement widget board
feat(media): implement Antigravity Groove player
feat(media): implement soundscape studio
feat(ui): overhaul app icons with 3D squircle badges
feat(ui): implement theme and color token system
feat(ui): implement widget layer
feat(motion): add workspace transitions
feat(sound): add notification sound engine
test(shell): add desktop shell tests
test(auth): cover authorization boundaries
fix(auth): prevent refresh token reuse
fix(files): prevent unsafe path traversal
docs(brain): update engineering memory
43.2 Required workflow
text
1. Inspect repository
2. Inspect Git status and diff
3. Identify scope and dependencies
4. Check brain.md, IMPLEMENTATION_STATUS.md, ASSUMPTIONS, DECISIONS
5. Plan
6. Implement a focused change
7. Perform permitted static validation
8. Run only authorized tests
9. Security review
10. Accessibility review
11. Performance review
12. Review the diff
13. Check for secrets
14. Update documentation
15. Update brain.md
16. Update IMPLEMENTATION_STATUS.md
17. Update CHANGELOG.md when appropriate
18. Create a meaningful Git commit
19. Record the commit in brain.md
20. Continue to the next safe task
43.3 Git safety
Never run git reset --hard, git clean -fd, git push --force, rebase shared history, delete remote branches, or overwrite unrelated user changes without explicit authorization.

Never commit .env, .env.local, credentials, API keys, private keys, passwords, certificates, tokens, database secrets, local databases, user files, or machine-specific configuration.

43.4 Branching
text
main
feature/*
fix/*
security/*
docs/*
Use feature branches for meaningful isolated work. Do not create dozens of branches for trivial changes.

43.5 Commit signing
DEFAULT DECISION: Support commit-signing documentation, but never create or access signing keys automatically. Never generate or store a user's private signing key without explicit instruction.

44. PHASED IMPLEMENTATION ROADMAP
Implement in phases. Do not attempt everything in one enormous unverified change.

Phase 0 — Discovery. Inspect repository, stack, existing implementation, gaps, Git status; document assumptions; create/update brain.md; establish the roadmap.

Phase 1 — Architecture & contracts. Confirm desktop shell; define module boundaries, state, persistence, IPC, permission boundaries, error handling, data contracts, application registry, command registry, threat model.

Phase 2 — Design system. Tokens, theme system, typography, iconography (including squircle badge foundation), components, accessibility defaults, motion tokens, sound service, visual-regression baseline strategy.

Phase 3 — Desktop shell. Desktop, wallpaper, Start menu, taskbar/dock, launcher, search, context menus, notifications, quick settings.

Phase 4 — Window manager. Window lifecycle, focus, minimize/restore, maximize, resize, snapping, snap layouts, snap assist, keyboard navigation, motion integration.

Phase 5 — Taskbar interaction layer. Window thumbnail previews, hover flyouts, jump lists, preview throttling and privacy controls.

Phase 6 — Workspaces. Create, rename, switch, delete, assignment, persistence, overview transitions, recovery of invalid workspace state.

Phase 7 — Application registry & command palette. Manifest schema, registration, capabilities, permissions, lifecycle, launch error handling, command registry.

Phase 8 — Storage & productivity. Local persistence (SQLite), File Explorer, Notes, Text Editor, Search, backup/recovery foundations.

Phase 9 — Authentication & authorization. Signup, login, sessions, JWT access/refresh rotation, email verification, password reset, MFA, RBAC, offline authentication, lock screen and session state machine.

Phase 10 — Database (MySQL / SQL Server). Schema, migrations (as files), indexes, constraints, seeds. Do not execute migrations without authorization.

Phase 11 — API. NestJS modules, validation, error contracts, authentication, authorization, rate limiting, logging.

Phase 12 — Offline & sync. Queue, sync states, conflict detection, conflict resolution, retry with backoff.

Phase 13 — Windows integration. Read-only first: system, processes, displays, audio, battery, network, filesystem. Then evaluate writable capabilities individually.

Phase 14 — System applications. Task Manager, System Information, Settings, Terminal, Calculator, Clock, Performance Dashboard, Notifications, Diagnostics.

Phase 15 — Visual identity & personalization. 3D squircle icon overhaul, color/accent system, theme catalog, rich high-resolution wallpaper library, procedural wallpapers, slideshow, per-monitor/per-workspace assignment.

Phase 16 — Desktop widgets layer. Widget board, built-in widgets, widget platform, performance rules.

Phase 17 — Antigravity Groove. Media library, playback engine, playlists, EQ, soundscape studio, visualizer, media-key integration.

Phase 18 — Photo & Wallpaper Studio. Import, non-destructive editing, multi-monitor composition, slideshow creation, wallpaper export.

Phase 19 — Visual polish. Animation refinement, sound effects, advanced visual effects, transitions, microinteractions, empty/error states, accessibility polish.

Phase 20 — Quality & security. Static validation, authorized tests, security review, performance review, accessibility review, recovery review, visual-regression review.

Phase 21 — Packaging & release preparation. Packaging config, versioning, installer design, signing plan, update architecture, uninstall behavior, release notes, checklist. Do not publish or install without authorization.

Phase 22 — Final review. Requirements-to-implementation review, Git history review, documentation review, claim verification, remaining work, final engineering report.

45. DEFINITION OF DONE
A feature is complete only when:

Implementation meets documented acceptance criteria.

UI matches the design system.

Loading, empty, success, and error states are handled.

Keyboard navigation is supported for essential interactions.

Accessibility has been reviewed.

Permissions and data boundaries are enforced.

Relevant tests have been written.

Permitted tests have been run, with results recorded.

Unauthorized tests have not been run.

Error handling and recovery are considered.

Documentation is updated.

brain.md is updated.

IMPLEMENTATION_STATUS.md is updated.

The Git diff has been reviewed.

No secrets have been committed.

A meaningful Git commit has been created.

Known limitations are disclosed.

Capability classification is recorded in docs/CAPABILITY_MATRIX.md.

If testing is blocked by the authorization rules, label the feature accordingly. Do not misrepresent untested functionality as fully verified.

46. RELEASE, PACKAGING, SIGNING, UPDATE, UNINSTALL
46.1 Packaging
DEFAULT DECISION: Signed EXE installer using NSIS, per-user installation by default. Support architecture for per-machine install, portable mode, and future MSIX. Do not require administrator rights for per-user installation where possible.

46.2 Code signing
Production releases use a trusted code-signing certificate, a secure signing process, protected signing keys, and timestamping. Never commit .pfx, .p12, private keys, passwords, or tokens to Git.

46.3 Auto-update
Channels: Stable, Beta, Canary. Process: check → verify metadata → verify signature → download → verify integrity → stage → install → verify → roll back if necessary.

DEFAULT DECISION: Auto-update is designed but remains disabled until explicitly configured for a real release environment.

46.4 Versioning
Semantic Versioning MAJOR.MINOR.PATCH, with pre-release identifiers (1.2.0-beta.1, 1.2.0-canary.1).

46.5 Uninstallation
Offer: remove application only · remove application + local data · remove application + cached data · preserve user documents. Never delete user documents silently. Clearly explain what will be removed.

46.6 CI/CD
text
Checkout → Dependency integrity check → Lint → Typecheck → Unit tests
→ Security scan → Build → Package → Artifact verification → E2E
→ Accessibility → Visual regression → Sign → Release
Antigravity must not trigger production deployment without explicit approval.

46.7 SBOM & third-party licenses
Generate a CycloneDX (or equivalent) SBOM tracking package, version, license, source, and vulnerability status. Maintain docs/THIRD_PARTY_LICENSES.md with dependency, version, license, attribution, usage, and modifications. Do not use dependencies with incompatible licenses without explicit review.

46.8 Fonts, icons, sounds, wallpapers
Every external asset must record: source, license, attribution requirement, modification permission, distribution permission. Do not use proprietary operating-system assets merely because they are visually convenient.

47. LEGAL, LICENSING & COMPLIANCE
The project must contain placeholders/documentation for:

text
LICENSE
TERMS_OF_SERVICE.md
PRIVACY_POLICY.md
THIRD_PARTY_LICENSES.md
ATTRIBUTIONS.md
docs/RISK_REGISTER.md
docs/DATA_PROCESSING.md
docs/EXPORT_COMPLIANCE.md
DEFAULT DECISION: Use an explicit proprietary/commercial-license placeholder until the owner selects the final license. Do not assume the application is open source.

If external processors are introduced, document: provider, data processed, purpose, retention, geographic location, security controls, deletion behavior.

Maintain export-compliance documentation identifying cryptographic libraries, encryption features, third-party services, and jurisdictional considerations. Do not make unsupported legal claims.

48. ENGINEERING MEMORY & GOVERNANCE FILES
48.1 brain.md (mandatory, repository root)
Updated after every meaningful implementation unit. Must contain:

text
# Project Identity
# Product Vision
# Current Project Status
# Current Phase
# Current Task
# Current Architecture
# Technology Stack
# Directory Structure
# Implemented Features
# Features In Progress
# Features Not Implemented
# Future Features
# Unsupported Features
# Capability Matrix Summary
# Windows Integration Status
# Desktop Shell Status
# Window Manager Status
# Taskbar Preview Status
# Workspace Status
# Application Registry Status
# Widgets Status
# Media (Groove) Status
# Photo Studio Status
# Wallpaper & Theme Status
# Icon System Status
# Lock Screen & Session Status
# Authentication Architecture
# Authorization Architecture
# Database Architecture
# Database Migration Status
# API Architecture
# Offline Architecture
# Synchronization Architecture
# Conflict Resolution
# UI/UX Architecture
# Design System
# Theme System
# Color System
# Animation System
# Sound System
# Accessibility System
# Internationalization
# Security Decisions
# Performance Decisions
# Important Constraints
# Things That Must NOT Be Changed
# Known Bugs
# Resolved Bugs
# Failed Approaches
# Decisions and Reasons
# Assumptions
# Technical Debt
# Testing Status
# Performance Findings
# Security Findings
# Git Development History Summary
# Remaining Work
# Last Completed Task
# Last Git Commit
# Next Recommended Task
# Last Updated
Do not put secrets in brain.md. Do not turn it into a copy of this prompt.

48.2 docs/ASSUMPTIONS.md
text
ID / Date / Assumption / Reason / Impact / Risk / Validation Method / Status
Example:

text
ASM-001
Assumption: SQLite will be the local persistence layer.
Reason: Offline-first desktop operation requires transactional local storage.
Impact: Local data layer is designed around SQLite.
Risk: Medium.
Validation: Benchmark startup, query performance, migration behavior.
Status: Accepted.

ASM-002
Assumption: DB_PORT=1433 in the provided .env indicates SQL Server, but the
request specifies MySQL. Confirm the intended engine and port before connecting.
Reason: 1433 is the SQL Server default; MySQL defaults to 3306.
Impact: Connection configuration and DDL dialect.
Risk: Medium.
Validation: Confirm with the project owner in Phase 0; support both engines.
Status: Proposed.
48.3 docs/DECISIONS.md
text
Decision ID / Date / Decision / Context / Options / Chosen Option /
Reason / Consequences / Reversible / Approval Required / Status
48.4 docs/IMPLEMENTATION_STATUS.md
Statuses: NOT_STARTED, PLANNED, IN_PROGRESS, IMPLEMENTED, TESTED, PARTIALLY_IMPLEMENTED, BLOCKED, UNSUPPORTED, FUTURE.

Never mark something IMPLEMENTED merely because a UI exists.

48.5 docs/CHANGELOG.md
Keep-a-Changelog style: Added, Changed, Fixed, Security, Performance, Deprecated, Removed.

48.6 docs/RISK_REGISTER.md
Risk ID, Description, Likelihood, Impact, Severity, Mitigation, Owner, Status, Contingency, Review date.

Prioritize: data loss, unauthorized system modification, privilege escalation, credential leakage, IPC abuse, command injection, dependency vulnerabilities, sync conflicts, untrusted plugin/widget execution, resource exhaustion, update compromise, media-decoder exploits, incorrect Windows-integration claims.

Critical unresolved risks block release readiness.

48.7 Required documentation set
text
docs/
  ARCHITECTURE.md          CAPABILITY_MATRIX.md
  SECURITY.md              THREAT_MODEL.md
  PERFORMANCE.md           ACCESSIBILITY.md
  INTERNATIONALIZATION.md  MOTION.md
  SOUND.md                 THEMES.md
  COLORS.md                WALLPAPERS.md
  WIDGETS.md               MEDIA.md
  PHOTO_STUDIO.md          ICONS.md
  LOCK_SCREEN.md           TASKBAR_PREVIEWS.md
  WINDOWS_INTEGRATION.md   API.md
  DATABASE.md              TESTING.md
  RELEASE.md               INSTALLATION.md
  PRIVACY.md               THIRD_PARTY_LICENSES.md
  ASSUMPTIONS.md           DECISIONS.md
  IMPLEMENTATION_STATUS.md CHANGELOG.md
  RISK_REGISTER.md         DATA_PROCESSING.md
  EXPORT_COMPLIANCE.md
49. RELEASE APPROVAL GATES & DANGEROUS OPERATION GATE
Explicit approval required before:

text
production database migration
production deployment
installer publication
auto-update activation
system-level installer testing
code-signing release
telemetry activation
remote release upload
Windows system modification
Any operation involving deletion, privilege escalation, Windows modification, service creation, Registry modification, firewall changes, scheduled tasks, startup persistence, database destruction, external upload, installation, or execution of unknown code must stop and request approval.

50. DO NOT INVENT FUNCTIONALITY
Never write "Windows Firewall successfully configured" if the app only displays a simulated interface.
Never write "System Restore completed" unless it genuinely completed.
Never write "Process terminated" unless the native operation succeeded.
Never write "Windows locked" — the lock screen is application-simulated.
Never present in-app window thumbnails as the Windows taskbar's own previews.
Never present the widget layer as the Windows 11 widgets panel.
Never present Antigravity Groove as the Windows Media Player or Spotify.

Use honest statuses: SIMULATED, INFORMATIONAL, UNAVAILABLE, UNSUPPORTED, REQUIRES ADMINISTRATOR, REQUIRES USER AUTHORIZATION, FAILED, SUCCESS.

50.1 No fake backend
Do not create fake API success, fake authentication, fake database records, fake sync, or fake system state for production functionality. Mocks are permitted only inside controlled tests.

50.2 No hardcoded secrets
Never hardcode passwords, API keys, JWT secrets, database passwords, OAuth secrets, or signing keys. Use environment configuration and secure secret storage.

51. FINAL OPERATING INSTRUCTIONS TO ANTIGRAVITY
Before starting:

Read this prompt completely.

Inspect the existing repository, package files, source structure, configuration, Git status, documentation, database files, and tests.

Identify working functionality, broken functionality, and architectural debt.

Create or update brain.md, the Assumptions Register, the risk assessment, and IMPLEMENTATION_STATUS.md.

Select the first coherent implementation unit and begin without unnecessary clarification questions.

During development:

Prefer working vertical slices.

Keep the architecture maintainable.

Keep UI/UX consistent across the product.

Add sophisticated animation only through the centralized motion system.

Add sound only through the centralized sound system.

Route all imagery through the licensed wallpaper/photo pipeline.

Keep effects configurable and performance-aware.

Test state transitions, persistence, errors, and permissions.

Do not leave misleading placeholders.

Do not claim unsupported operating-system integration.

Update documentation and brain.md.

Create meaningful Git commits after every implementation unit.

Preserve uncommitted user work.

Stop before any operation requiring explicit authorization.

When blocked: state the exact blocker, record what has been completed, identify what requires approval or unavailable tooling, and continue with independent safe work where possible.

51.1 Final report requirements
At the end of an authorized implementation session, provide:

text
Implementation Summary
Completed Features
Partially Completed Features
Unsupported Features
Known Limitations
Security Review
Accessibility Review
Performance Review
Test Results (written vs actually run)
Files Created or Changed
Git Commits Created
Documentation Updated
Database Status
Windows Integration Status
Current brain.md Status
Remaining Work
Required User Approvals
Recommended Next Task
Execution Status
51.2 Final execution status (mandatory honesty block)
text
APPLICATION EXECUTED:            NO
DEV SERVER STARTED:              NO
DEPENDENCIES INSTALLED:          NO
DATABASE MIGRATIONS EXECUTED:    NO
DATABASE SERVER INSTALLED:       NO
WINDOWS MODIFICATIONS PERFORMED: NO
ELEVATION REQUESTED:             NO
PRODUCTION DEPLOYMENT PERFORMED: NO
If any operation was explicitly authorized and performed, report it accurately. Never claim otherwise.

51.3 Final stop condition
After completing all currently authorized work: save files, validate statically, update documentation, update brain.md, update implementation status, inspect the Git diff, check for secrets, create the required meaningful Git commit, report what was completed, and stop.

Do not launch the application automatically. Do not start servers. Do not install dependencies. Do not execute migrations. Do not modify Windows. Wait for explicit authorization.

52. MASTER PRODUCT VISION
The final product should feel like a carefully engineered desktop environment combining Windows 11 familiarity, macOS polish and workspace ergonomics, and Ubuntu/Linux developer flexibility.

It must be:

text
Production-oriented
Secure
Transparent
Reversible
Accessible
Fast
Beautiful
Extensible
Maintainable
Offline-capable
Windows-aware
Developer-friendly
But above all:

DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.

Do not invent functionality. Do not silently execute dangerous operations. Do not pretend simulated functionality is native. Do not destroy existing working code. Do not expose secrets. Do not bypass security controls. Do not install or execute anything without authorization. Do not leave meaningful implementation work uncommitted.

Use brain.md for engineering memory. Use the Decision Authority Matrix for safe decisions. Use the Assumptions Register to keep assumptions visible. Use the capability model to maintain technical honesty. Use Git after every meaningful implementation unit.

Begin with Phase 0 — Discovery.

Do not launch the application. Do not start a development server. Do not install dependencies. Do not execute migrations. Do not modify Windows. Do not ask what to build next unless the decision genuinely requires user authorization.

Proceed with safe, documented, reversible repository work.

APPENDIX A — WHAT CHANGED IN VERSION 7.0
Login & Signup system (§15, §14, §12.3–12.4). Full signup/login/logout/refresh/verify-email/forgot-password/reset-password/MFA/session-management endpoints, flows, validation rules, password policy (Argon2id), JWT access + rotating refresh tokens with reuse detection, no user enumeration, rate limiting, lockout, offline authentication boundaries, RBAC, and complete auth UI/UX requirements.

MySQL server setup (§10, §11). The provided .env is now the authoritative development configuration. MySQL 8.0+ is added as the primary engine with database creation, least-privilege app and migrator users, connection pooling defaults, operational requirements, and full MySQL DDL in §12. SQL Server remains supported with an explicit type-mapping note. Flagged: DB_PORT=1433 is SQL Server's default while MySQL uses 3306 — recorded as ASM-002 for confirmation.

Wallpapers and colors (§30, §31). New full color token system with accent ramps, neutrals, and semantic tokens; contrast requirements; token-based theming mandate. New Rich High-Resolution Wallpapers & Visual Themes section addressing the missing real imagery: categories, resolution/format tiers up to 8K, licensing policy, procedural wallpaper generation, per-monitor and per-workspace assignment, slideshow, dynamic wallpaper, and performance rules.

Desktop Widgets Layer (§33). New section covering the widget board, widget sizing/reordering/pinning, fourteen built-in widgets with honest classifications, a sandboxed widget platform with permissions, and strict performance rules.

Antigravity Groove — Media Player & Soundscape Studio (§34). New first-party media app: library scanning of authorized folders, format support, playback, queue, playlists, EQ, crossfade, soundscape layer mixer with presets, focus/sleep timers, visualizer modes, a Web Audio engine with limiter and proper teardown, and licensing/privacy constraints.

Photo & Wallpaper Studio (§35). New non-destructive editor: library, import, format support, EXIF read, full adjustment stack, filters, undo/redo, multi-monitor wallpaper composition, exact-resolution export, one-click apply with revert, slideshow builder, and safety/performance rules.

Visual Identity Overhaul: 3D Squircle App Icon Badges (§36). New icon system: superellipse geometry, seven-layer 3D composition, hover/press/launch motion, sizing table with high-DPI variants, mandatory single-component consistency, deterministic fallbacks, and accessibility rules.

Lock Screen & Session Security Simulation (§37). New lock screen composition, session state machine, lock triggers, unlock methods with honest classifications, security requirements (rate limiting, auditing, content obscuring, no shortcut bypass), and privacy controls. Explicitly classified APPLICATION-SIMULATED — it does not lock Windows.

Taskbar Window Thumbnail Previews & Snap Animations (§38). New thumbnail preview system with hover delay, grouping, per-window actions, keyboard equivalents, throttled capture, caching, and privacy controls; plus snap layout flyout, snap assist, a full snap animation table, and acceptance criteria including interruptibility.

"And any more things" (§26, §44). Added a broader utility app list (clipboard history, screenshot/recording, calendar, archive manager, image/PDF viewer, sticky notes, to-do, focus timer, color picker, hash checker, regex tester, JSON formatter, Base64, port checker, duplicate finder, disk usage analyzer), added Phase 5 (Taskbar interaction), Phase 15 (Visual identity), Phase 16 (Widgets), Phase 17 (Groove), and Phase 18 (Photo Studio) to the roadmap, and added matching commit-message examples in §43.

Structural consolidation. The two previously duplicated halves of the document are merged into one master specification (Version 7.0) so there is a single source of truth. Every substantive requirement from both halves is preserved.

Honesty reinforcement (§4, §50). Explicit prohibitions against presenting the lock screen, widget layer, taskbar previews, and media player as native Windows features.

Engineering memory (§48). brain.md, ASSUMPTIONS.md, IMPLEMENTATION_STATUS.md, and the risk register now track the new subsystems (widgets, media, photo studio, wallpapers, icons, lock screen, taskbar previews).

ANTIGRAVITY: BUILD A REAL, COHESIVE, SECURE, HIGH-QUALITY PRODUCT. DO NOT MAKE MISTAKES.

Use Windows 11 for familiarity, macOS for refinement, and Ubuntu/Linux for workspace and developer productivity inspiration. Create an original identity — including original wallpaper, icon, and sound assets — rather than a superficial clone.

Record decisions in brain.md. Review each meaningful change. Commit each meaningful implementation unit to Git.

Begin with Phase 0, inspect the repository, establish the baseline, and proceed one verified implementation unit at a time.
