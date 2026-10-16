/**
 * Enterprise Data Contracts, Error Catalog, Event Protocol, & Permissions
 * Compliant with Master Specification Version 6.0 (Sections 14, 15, 17, 18)
 */

// ==========================================
// 1. ERROR CODE CATALOG (Section 14)
// ==========================================
export const ERROR_CODES = {
  // Authentication & Session
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  AUTH_SESSION_REVOKED: 'AUTH_SESSION_REVOKED',
  AUTH_EMAIL_NOT_VERIFIED: 'AUTH_EMAIL_NOT_VERIFIED',
  AUTH_MFA_REQUIRED: 'AUTH_MFA_REQUIRED',
  AUTH_MFA_INVALID: 'AUTH_MFA_INVALID',
  AUTH_FORBIDDEN: 'AUTH_FORBIDDEN',
  AUTH_PERMISSION_DENIED: 'AUTH_PERMISSION_DENIED',

  // Filesystem & Sandboxing
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_ALREADY_EXISTS: 'FILE_ALREADY_EXISTS',
  FILE_ACCESS_DENIED: 'FILE_ACCESS_DENIED',
  FILE_OPERATION_BLOCKED: 'FILE_OPERATION_BLOCKED',
  FILE_PATH_INVALID: 'FILE_PATH_INVALID',
  FILE_PATH_PROTECTED: 'FILE_PATH_PROTECTED',

  // Application & Window Management
  APP_NOT_FOUND: 'APP_NOT_FOUND',
  APP_DISABLED: 'APP_DISABLED',
  APP_LAUNCH_BLOCKED: 'APP_LAUNCH_BLOCKED',
  WINDOW_INVALID_STATE: 'WINDOW_INVALID_STATE',
  WORKSPACE_NOT_FOUND: 'WORKSPACE_NOT_FOUND',

  // Synchronization & Relational DB
  SYNC_CONFLICT: 'SYNC_CONFLICT',
  SYNC_OFFLINE: 'SYNC_OFFLINE',
  SYNC_FAILED: 'SYNC_FAILED',
  SYNC_VERSION_MISMATCH: 'SYNC_VERSION_MISMATCH',
  DB_CONNECTION_FAILED: 'DB_CONNECTION_FAILED',
  DB_TRANSACTION_FAILED: 'DB_TRANSACTION_FAILED',
  DB_CONSTRAINT_VIOLATION: 'DB_CONSTRAINT_VIOLATION',
  DB_QUERY_ERROR: 'DB_QUERY_ERROR',
  DB_RECORD_NOT_FOUND: 'DB_RECORD_NOT_FOUND',
  DB_UNIQUE_VIOLATION: 'DB_UNIQUE_VIOLATION',

  // Native & System
  NATIVE_UNSUPPORTED: 'NATIVE_UNSUPPORTED',
  NATIVE_PERMISSION_DENIED: 'NATIVE_PERMISSION_DENIED',
  NATIVE_OPERATION_FAILED: 'NATIVE_OPERATION_FAILED',
  SYSTEM_OPERATION_BLOCKED: 'SYSTEM_OPERATION_BLOCKED',
  USER_AUTHORIZATION_REQUIRED: 'USER_AUTHORIZATION_REQUIRED',
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// ==========================================
// 2. APPLICATION EVENT SYSTEM (Section 15)
// ==========================================
export interface ApplicationEvent<T = unknown> {
  id: string;
  type: string;
  version: number;
  timestamp: string;
  source: string;
  correlationId?: string;
  payload: T;
}

export type SystemEventType =
  | 'window.created'
  | 'window.closed'
  | 'window.focused'
  | 'window.minimized'
  | 'window.maximized'
  | 'window.restored'
  | 'window.snapped'
  | 'workspace.created'
  | 'workspace.deleted'
  | 'workspace.switched'
  | 'application.registered'
  | 'application.launched'
  | 'application.closed'
  | 'notification.created'
  | 'notification.read'
  | 'file.created'
  | 'file.moved'
  | 'file.copied'
  | 'file.deleted'
  | 'sync.started'
  | 'sync.completed'
  | 'sync.failed'
  | 'auth.login'
  | 'auth.logout'
  | 'native.capability.available';

// ==========================================
// 3. COMMAND REGISTRY SPEC (Section 17)
// ==========================================
export interface CommandDefinition {
  id: string;
  title: string;
  description?: string;
  category: string;
  keywords?: string[];
  shortcut?: string;
  requiredPermissions?: string[];
  enabled: boolean;
  execute: () => void | Promise<void>;
}

// ==========================================
// 4. PERMISSION / CAPABILITY SCHEMA (Section 18)
// ==========================================
export type PermissionKey =
  | 'filesystem.user.read'
  | 'filesystem.user.write'
  | 'filesystem.protected.read'
  | 'filesystem.protected.write'
  | 'system.info.read'
  | 'system.process.read'
  | 'system.process.control'
  | 'terminal.execute'
  | 'workspace.manage'
  | 'settings.manage'
  | 'database.read'
  | 'database.write'
  // Expansion Pack v8.0 Permissions (Section 2.1)
  | 'ai.inference.local.run'
  | 'ai.inference.cloud.run'
  | 'ai.embedding.generate'
  | 'ai.model.download'
  | 'clipboard.history.read'
  | 'clipboard.history.write'
  | 'clipboard.history.clear'
  | 'snippet.expand.global'
  | 'snippet.manage'
  | 'vault.read'
  | 'vault.write'
  | 'vault.unlock.biometric'
  | 'vault.export'
  | 'screen.capture'
  | 'screen.record'
  | 'screen.region.select'
  | 'screen.scroll.capture'
  | 'audio.system.capture'
  | 'audio.microphone.capture'
  | 'git.repository.read'
  | 'git.repository.write'
  | 'git.remote.push'
  | 'git.history.rewrite'
  | 'api.request.send'
  | 'api.collection.manage'
  | 'api.environment.manage'
  | 'database.external.connect'
  | 'database.external.query'
  | 'database.external.write'
  | 'ssh.connect'
  | 'sftp.transfer'
  | 'remote.desktop.launch'
  | 'automation.flow.create'
  | 'automation.flow.run'
  | 'automation.flow.import'
  | 'automation.flow.export'
  | 'automation.script.execute'
  | 'automation.http.request'
  | 'plugin.sdk.publish'
  | 'plugin.registry.read'
  | 'calendar.local.read'
  | 'calendar.local.write'
  | 'calendar.remote.sync'
  | 'calendar.provider.connect'
  | 'task.local.read'
  | 'task.local.write'
  | 'task.remote.sync'
  | '*';

/**
 * Validates whether a granted role or permission list satisfies a required permission
 */
export function checkPermission(grantedPermissions: string[], requiredPermission: PermissionKey): boolean {
  if (grantedPermissions.includes('*')) return true;
  if (grantedPermissions.includes(requiredPermission)) return true;

  // Wildcard scope check (e.g., 'filesystem.user.*' satisfies 'filesystem.user.read')
  const parts = requiredPermission.split('.');
  if (parts.length >= 2) {
    const domainPrefix = `${parts[0]}.${parts[1]}.*`;
    if (grantedPermissions.includes(domainPrefix)) return true;
    const globalDomain = `${parts[0]}.*`;
    if (grantedPermissions.includes(globalDomain)) return true;
  }

  return false;
}
