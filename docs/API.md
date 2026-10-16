# API Specification (`/api/v1`)

## 1. Design Standards
- **Protocol:** HTTP/1.1 and HTTP/2 over TLS (or localhost HTTP for local backend)
- **Base Route:** `/api/v1`
- **Data Serialization:** JSON (`application/json; charset=utf-8`)
- **Authentication:** `Authorization: Bearer <jwt-token>`
- **Request Tracing:** `X-Request-Id` UUID header returned on every response
- **Standard Response Envelope**:
  ```json
  {
    "success": true,
    "data": { ... },
    "meta": {
      "timestamp": "2026-10-08T18:00:00.000Z",
      "requestId": "c1f7b8...-..."
    }
  }
  ```
- **Standard Error Envelope**:
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_CREDENTIALS",
      "message": "The provided username or password is incorrect.",
      "details": {},
      "requestId": "c1f7b8...-..."
    }
  }
  ```

---

## 2. Core Endpoints

### 2.1 Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/signup`: Create a new user account with validated credentials.
- `POST /api/v1/auth/login`: Authenticate and issue JWT access token + refresh token.
- `POST /api/v1/auth/refresh`: Exchange valid refresh token for a fresh access token.
- `POST /api/v1/auth/logout`: Revoke active session tokens.
- `GET /api/v1/auth/me`: Retrieve current user profile and role permissions.

### 2.2 Workspaces (`/api/v1/workspaces`)
- `GET /api/v1/workspaces`: List workspaces with layout and window states.
- `POST /api/v1/workspaces`: Create a new virtual workspace.
- `PUT /api/v1/workspaces/:id`: Update workspace properties (name, sortOrder, wallpaper).
- `DELETE /api/v1/workspaces/:id`: Delete workspace (orphaned windows migrate to primary workspace).
- `POST /api/v1/workspaces/:id/windows`: Save active open window positions.

### 2.3 Notes & Productivity (`/api/v1/notes`)
- `GET /api/v1/notes`: Retrieve notes with tag and search filtering.
- `POST /api/v1/notes`: Create note with autosave version tracking.
- `PUT /api/v1/notes/:id`: Update note content and title with optimistic concurrency check (`version`).
- `DELETE /api/v1/notes/:id`: Soft delete / move note to trash.

### 2.4 User Preferences (`/api/v1/preferences`)
- `GET /api/v1/preferences`: Retrieve user theme, sound, performance, and dock settings.
- `PUT /api/v1/preferences`: Update preferences.

### 2.5 Synchronization (`/api/v1/sync`)
- `POST /api/v1/sync/push`: Batch push local changes from offline queue.
- `GET /api/v1/sync/pull?since=<timestamp>`: Pull upstream delta modifications.
- `POST /api/v1/sync/resolve-conflict`: Post resolved payload for contested records.

### 2.6 Native System Bridge (`/api/v1/system`)
- `GET /api/v1/system/info`: Retrieve hardware, OS version, CPU, and RAM metrics.
- `GET /api/v1/system/processes`: Retrieve list of active processes (with CPU and Memory).
- `POST /api/v1/system/command`: Execute controlled, allowlisted shell commands.
