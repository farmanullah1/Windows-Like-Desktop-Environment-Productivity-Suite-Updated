/**
 * Typed IPC Channel Allowlists & Definitions (Master Specification Section 20)
 * Prevents arbitrary or unsanitized IPC execution.
 */

export const IPC_CHANNELS = {
  // System Telemetry & Capabilities (Read-Only)
  SYSTEM_GET_INFO: 'system:getInfo',
  SYSTEM_GET_CAPABILITIES: 'system:getCapabilities',
  SYSTEM_GET_PERFORMANCE: 'system:getPerformance',

  // Window Container Controls
  WINDOW_MINIMIZE: 'window:minimize',
  WINDOW_MAXIMIZE: 'window:maximize',
  WINDOW_RESTORE: 'window:restore',
  WINDOW_CLOSE: 'window:close',
  WINDOW_IS_MAXIMIZED: 'window:isMaximized',

  // Safe Filesystem Sandboxed Bridge
  FS_LIST_DIR: 'fs:listDirectory',
  FS_READ_FILE: 'fs:readFile',
  FS_WRITE_USER_FILE: 'fs:writeUserFile',

  // Local Offline SQLite Storage
  SQLITE_EXEC: 'sqlite:execute',
  SQLITE_QUERY: 'sqlite:query',

  // Controlled Native Process / Terminal
  TERMINAL_EXEC_SAFE: 'terminal:executeSafe',

  // Audio & Notification Handlers
  NOTIFICATION_SHOW: 'notification:show',
} as const;

export type IpcChannelName = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

/**
 * Validates that an incoming channel is on the strict allowlist
 */
export function isAllowedIpcChannel(channel: string): channel is IpcChannelName {
  return Object.values(IPC_CHANNELS).includes(channel as IpcChannelName);
}
