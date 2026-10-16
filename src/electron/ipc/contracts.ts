/**
 * Electron Typed IPC Contracts & Protocol (Master Specification Section 20)
 * Provides strict request/response interfaces, payload limits, channel validation, and error structures.
 */

import { IPC_CHANNELS, isAllowedIpcChannel, type IpcChannelName } from './channels.ts';

/**
 * Standard IPC Request envelope
 */
export interface IPCRequest<T = unknown> {
  requestId: string;
  channel: IpcChannelName;
  version: number;
  timestamp: string;
  payload: T;
}

/**
 * Standard IPC Response envelope
 */
export interface IPCResponse<T = unknown> {
  requestId: string;
  channel: string;
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  durationMs: number;
}

/**
 * Maximum permitted IPC payload size (1 MB) to prevent renderer memory exhaustion
 */
export const MAX_IPC_PAYLOAD_BYTES = 1024 * 1024;

/**
 * Payload validation and sanitization for IPC messages
 */
export function validateIpcRequest<T>(rawRequest: unknown): { isValid: boolean; error?: string; request?: IPCRequest<T> } {
  if (!rawRequest || typeof rawRequest !== 'object') {
    return { isValid: false, error: 'IPC request must be a valid non-null object.' };
  }

  const req = rawRequest as Partial<IPCRequest<T>>;

  if (!req.requestId || typeof req.requestId !== 'string') {
    return { isValid: false, error: 'IPC request missing valid string requestId.' };
  }

  if (!req.channel || typeof req.channel !== 'string' || !isAllowedIpcChannel(req.channel)) {
    return { isValid: false, error: `Invalid or disallowed IPC channel: ${String(req.channel)}` };
  }

  if (typeof req.version !== 'number' || req.version < 1) {
    return { isValid: false, error: 'IPC request must specify a valid numerical version >= 1.' };
  }

  // Check payload size
  try {
    const serialized = JSON.stringify(req.payload);
    if (serialized && serialized.length > MAX_IPC_PAYLOAD_BYTES) {
      return { isValid: false, error: `IPC payload exceeds maximum limit of ${MAX_IPC_PAYLOAD_BYTES} bytes.` };
    }
  } catch (_e) {
    return { isValid: false, error: 'IPC payload failed JSON serialization validation.' };
  }

  return {
    isValid: true,
    request: {
      requestId: req.requestId,
      channel: req.channel as IpcChannelName,
      version: req.version,
      timestamp: req.timestamp || new Date().toISOString(),
      payload: req.payload as T,
    },
  };
}

/**
 * Creates a standard IPC response
 */
export function createIpcSuccessResponse<T>(requestId: string, channel: string, data: T, startTime: number): IPCResponse<T> {
  return {
    requestId,
    channel,
    success: true,
    data,
    durationMs: Math.max(0, performance.now() - startTime),
  };
}

/**
 * Creates a standard IPC error response
 */
export function createIpcErrorResponse(
  requestId: string,
  channel: string,
  code: string,
  message: string,
  startTime: number,
  details?: unknown
): IPCResponse {
  return {
    requestId,
    channel,
    success: false,
    error: {
      code,
      message,
      details,
    },
    durationMs: Math.max(0, performance.now() - startTime),
  };
}

export { IPC_CHANNELS };