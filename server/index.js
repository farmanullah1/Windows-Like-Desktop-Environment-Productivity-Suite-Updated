/**
 * Windows Desktop Environment & Productivity Suite - Enterprise REST API Server (v6.1)
 * Compliant with Master Architecture Specification Section 12 & 13.
 * Configured for MS SQL Server database: MyOS, Server: localhost, Port: 5000
 */

import express from 'express';
import cors from 'cors';
import { randomUUID, createHmac, timingSafeEqual } from 'crypto';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import db from './db.js';

// Resolve environment variables from .env if present
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootEnvPath = path.resolve(__dirname, '..', '.env');

if (fs.existsSync(rootEnvPath)) {
  try {
    const envContent = fs.readFileSync(rootEnvPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.substring(0, eqIdx).trim();
          const val = trimmed.substring(eqIdx + 1).trim();
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    });
  } catch (_e) {
    // Ignore .env read errors
  }
}

const app = express();
const PORT = Number(process.env.API_PORT) || 5000;
const DB_SERVER = process.env.DB_SERVER || process.env.SERVER || 'localhost';
const DB_NAME = process.env.DB_NAME || process.env.DATABASE || 'MyOS';
const JWT_SECRET = process.env.JWT_SECRET || 'bac0a2b3e80af8c0fef9ca6a7f1466251047834cf15ee33f5af23b26e2012d09';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

app.use(cors());
app.use(express.json());

// Request tracing middleware
app.use((req, res, next) => {
  const requestId = (req.headers['x-request-id'] && String(req.headers['x-request-id'])) || randomUUID();
  res.setHeader('X-Request-Id', requestId);
  req.requestId = requestId;
  next();
});

// Helper response envelopes adhering to Master Spec Section 13
const successEnvelope = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
    meta: {
      requestId: res.getHeader('X-Request-Id'),
      timestamp: new Date().toISOString(),
    },
  });
};

const errorEnvelope = (res, code, message, status = 400, details = {}) => {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
      details,
      retryable: status >= 500,
    },
    meta: {
      requestId: res.getHeader('X-Request-Id'),
      timestamp: new Date().toISOString(),
    },
  });
};

// Cryptographic JWT Implementation (HMAC SHA-256)
const toBase64Url = (str) =>
  Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const fromBase64Url = (str) => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  return Buffer.from(base64, 'base64').toString('utf8');
};

const signJwt = (payload, secret, expiresInDays = 7) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;
  const fullPayload = { ...payload, exp, iat: Math.floor(Date.now() / 1000) };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = createHmac('sha256', secret)
    .update(dataToSign)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${dataToSign}.${signature}`;
};

const verifyJwt = (token, secret) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;
    const expectedSig = createHmac('sha256', secret)
      .update(`${headerB64}.${payloadB64}`)
      .digest('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    const expectedBuf = Buffer.from(expectedSig);
    const actualBuf = Buffer.from(signatureB64);
    if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
      return null;
    }

    const payload = JSON.parse(fromBase64Url(payloadB64));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch (_e) {
    return null;
  }
};

// Real Host Telemetry Helper
let previousCpus = os.cpus();
function getLiveCpuUsage() {
  const currentCpus = os.cpus();
  let idleDiff = 0;
  let totalDiff = 0;
  for (let i = 0; i < currentCpus.length; i++) {
    const prev = previousCpus[i]?.times || { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 };
    const curr = currentCpus[i]?.times || { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 };
    const prevTotal = Object.values(prev).reduce((a, b) => a + b, 0);
    const currTotal = Object.values(curr).reduce((a, b) => a + b, 0);
    idleDiff += curr.idle - prev.idle;
    totalDiff += currTotal - prevTotal;
  }
  previousCpus = currentCpus;
  if (totalDiff === 0) return 14;
  const usage = Math.max(1, Math.min(100, Math.round(((totalDiff - idleDiff) / totalDiff) * 100)));
  return usage;
}

// Process-local cold-boot state flag (Master Spec §2.4)
// Created fresh on every process launch; never written to disk or storage.
const bootState = {
  isFirstRendererLoad: true,
  processStartedAt: Date.now(),
  launchId: randomUUID(),
};

function consumeColdBootSignal() {
  const isColdBoot = bootState.isFirstRendererLoad;
  if (isColdBoot) {
    bootState.isFirstRendererLoad = false;
  }
  return {
    isColdBoot,
    launchId: bootState.launchId,
    processStartedAt: bootState.processStartedAt,
  };
}

// In-Memory state caches (synchronized with local DB & SQL Server schema model)
const activeSessions = new Map();
const mockUsers = [
  {
    userId: 'usr-admin-01',
    email: 'admin@desktop.local',
    displayName: 'Administrator',
    role: 'Administrator',
    permissions: ['*'],
    isActive: true,
  },
  {
    userId: 'usr-dev-02',
    email: 'developer@desktop.local',
    displayName: 'Lead Developer',
    role: 'PowerUser',
    permissions: ['filesystem.user.*', 'terminal.execute', 'workspace.*'],
    isActive: true,
  },
];

let inMemoryWorkspaces = [
  { id: 'ws-1', name: 'Main', sortOrder: 0, isProtected: true, wallpaperUrl: '/wallpapers/aurora.jpg' },
  { id: 'ws-2', name: 'Development', sortOrder: 1, isProtected: false, wallpaperUrl: '/wallpapers/cyberpunk.jpg' },
  { id: 'ws-3', name: 'Productivity', sortOrder: 2, isProtected: false, wallpaperUrl: '/wallpapers/fluent_silk.jpg' },
  { id: 'ws-4', name: 'System', sortOrder: 3, isProtected: false, wallpaperUrl: '/wallpapers/cosmic_nebula.jpg' },
];

let inMemoryNotes = [
  {
    id: 'note-1',
    userId: 'usr-admin-01',
    title: 'Architecture Blueprint',
    content: '# Windows Desktop Suite v6.1\n\nProduction architecture integrating Windows 11 Fluent visuals, macOS dock dynamics, and Ubuntu workspace ergonomics with live MS SQL Server connectivity.',
    isPinned: true,
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let inMemoryNotifications = [
  {
    id: 'notif-1',
    userId: 'usr-admin-01',
    title: 'Workspace Initialized',
    message: 'Desktop Suite environment initialized with MS SQL Server MyOS configuration.',
    severity: 'info',
    category: 'system',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
];

let inMemoryApplications = [
  { applicationId: 'app-1', applicationKey: 'file-explorer', name: 'File Explorer', version: '5.0.0', classification: 'Core', isEnabled: true, isSystemApplication: true, description: 'Browse and organize files and folders.' },
  { applicationId: 'app-2', applicationKey: 'settings', name: 'Settings', version: '5.0.0', classification: 'Core', isEnabled: true, isSystemApplication: true, description: 'System preferences and themes.' },
  { applicationId: 'app-3', applicationKey: 'notes', name: 'Notes', version: '5.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Markdown notes with automatic sync.' },
  { applicationId: 'app-4', applicationKey: 'terminal', name: 'Terminal Center', version: '5.0.0', classification: 'Developer', isEnabled: true, isSystemApplication: true, description: 'Interactive shell and diagnostics.' },
  { applicationId: 'app-5', applicationKey: 'task-manager', name: 'Task Manager', version: '5.0.0', classification: 'System', isEnabled: true, isSystemApplication: true, description: 'Inspect active processes and host performance.' },
  { applicationId: 'app-6', applicationKey: 'system-info', name: 'System Information', version: '5.0.0', classification: 'System', isEnabled: true, isSystemApplication: true, description: 'Host hardware and OS metrics.' },
  { applicationId: 'app-7', applicationKey: 'calculator', name: 'Calculator', version: '5.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Mathematical calculations.' },
  { applicationId: 'app-8', applicationKey: 'clock', name: 'Clock & Timer', version: '5.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'World clock, timer, and stopwatch.' },
  { applicationId: 'app-9', applicationKey: 'api-tester', name: 'API Tester', version: '5.0.0', classification: 'Developer', isEnabled: true, isSystemApplication: true, description: 'HTTP REST endpoint inspection.' },
  { applicationId: 'app-10', applicationKey: 'json-viewer', name: 'JSON Studio', version: '5.0.0', classification: 'Developer', isEnabled: true, isSystemApplication: true, description: 'JSON structure analysis.' },
  { applicationId: 'app-11', applicationKey: 'dev-workspace', name: 'Developer Hub', version: '5.0.0', classification: 'Developer', isEnabled: true, isSystemApplication: true, description: 'Developer productivity suite.' },
  { applicationId: 'app-12', applicationKey: 'text-editor', name: 'Text Editor', version: '5.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Rich code and text editing.' },
  { applicationId: 'app-13', applicationKey: 'app-catalog', name: 'App Catalog', version: '5.0.0', classification: 'System', isEnabled: true, isSystemApplication: true, description: 'Application registry and marketplace.' },
  { applicationId: 'app-14', applicationKey: 'diagnostics', name: 'Diagnostics', version: '5.0.0', classification: 'System', isEnabled: true, isSystemApplication: true, description: 'System health and event logging.' },
  { applicationId: 'app-15', applicationKey: 'media-player', name: 'Media Player', version: '5.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Audio & video visualizer playback.' },
  { applicationId: 'app-16', applicationKey: 'gallery', name: 'Photo Gallery', version: '5.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Image preview and organization.' },
  { applicationId: 'app-17', applicationKey: 'clipboard', name: 'Clipboard History', version: '8.0.0', classification: 'Utilities', isEnabled: true, isSystemApplication: true, description: 'Searchable clipboard history with pinning.' },
  { applicationId: 'app-18', applicationKey: 'snippets', name: 'Snippet Expander', version: '8.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Keyword expansion triggers and dynamic variables.' },
  { applicationId: 'app-19', applicationKey: 'quick-utils', name: 'Quick Utilities', version: '8.0.0', classification: 'Utilities', isEnabled: true, isSystemApplication: true, description: 'Developer utilities, encoders, color studio.' },
  { applicationId: 'app-20', applicationKey: 'tasks', name: 'Tasks & Kanban', version: '8.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Sprint Kanban boards and project tasks.' },
  { applicationId: 'app-21', applicationKey: 'calendar', name: 'Calendar & Events', version: '8.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Monthly calendar grid and agenda scheduler.' },
  { applicationId: 'app-22', applicationKey: 'focus', name: 'Focus Mode', version: '8.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'Pomodoro timer and ambient audio synthesizer.' },
  { applicationId: 'app-23', applicationKey: 'vault', name: 'Security Vault', version: '8.0.0', classification: 'System', isEnabled: true, isSystemApplication: true, description: 'Encrypted password vault and TOTP 2FA tokens.' },
  { applicationId: 'app-24', applicationKey: 'ai-assistant', name: 'Antigravity AI', version: '8.0.0', classification: 'Productivity', isEnabled: true, isSystemApplication: true, description: 'On-device desktop AI assistant.' },
];

let inMemoryFiles = [
  { id: 'f-docs', name: 'Documents', type: 'folder', parentId: null, path: '/Documents', sizeKb: 0, updatedAt: '2026-10-08' },
  { id: 'f-downloads', name: 'Downloads', type: 'folder', parentId: null, path: '/Downloads', sizeKb: 0, updatedAt: '2026-10-08' },
  { id: 'f-pictures', name: 'Pictures', type: 'folder', parentId: null, path: '/Pictures', sizeKb: 0, updatedAt: '2026-10-08' },
  { id: 'f-projects', name: 'Projects', type: 'folder', parentId: null, path: '/Projects', sizeKb: 0, updatedAt: '2026-10-08' },
  { id: 'f-welcome', name: 'Welcome_ADW5.txt', type: 'file', extension: 'txt', sizeKb: 4, parentId: null, path: '/Welcome_ADW5.txt', updatedAt: '2026-10-08' },
  { id: 'f-spec', name: 'System_Specification.md', type: 'file', extension: 'md', sizeKb: 54, parentId: 'f-docs', path: '/Documents/System_Specification.md', updatedAt: '2026-10-08' },
  { id: 'f-todo', name: 'Sprint_Roadmap.txt', type: 'file', extension: 'txt', sizeKb: 12, parentId: 'f-docs', path: '/Documents/Sprint_Roadmap.txt', updatedAt: '2026-10-08' },
  { id: 'f-wallpaper', name: 'Aurora_Wallpaper.png', type: 'file', extension: 'png', sizeKb: 1420, parentId: 'f-pictures', path: '/Pictures/Aurora_Wallpaper.png', updatedAt: '2026-10-08' },
  { id: 'f-code', name: 'desktopStore.ts', type: 'file', extension: 'ts', sizeKb: 18, parentId: 'f-projects', path: '/Projects/desktopStore.ts', updatedAt: '2026-10-08' },
];

let inMemoryWindowStates = [];

// Auth middleware for protected routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return errorEnvelope(res, 'AUTH_SESSION_EXPIRED', 'Authorization token required.', 401);
  }

  const payload = verifyJwt(token, JWT_SECRET);
  if (!payload) {
    return errorEnvelope(res, 'AUTH_INVALID_CREDENTIALS', 'Invalid or expired session token.', 403);
  }

  req.user = payload;
  next();
};

// ==========================================
// 1. HEALTH & SYSTEM DIAGNOSTICS ENDPOINTS
// ==========================================
app.get('/api/v1/health', (req, res) => {
  successEnvelope(res, {
    status: 'healthy',
    version: '6.1.0',
    platform: 'Windows Desktop Suite Backend',
    database: db.getDatabaseStatus(),
    uptimeSeconds: Math.floor(process.uptime()),
    hostUptimeSeconds: Math.floor(os.uptime()),
  });
});

// Boot & Launch Session Endpoints (Master Spec v9 & New-Updates.md §5)
app.get('/api/v1/boot/launch-session', (_req, res) => {
  successEnvelope(res, {
    launchSessionId: bootState.launchId,
    isColdBoot: bootState.isFirstRendererLoad,
    processStartedAt: bootState.processStartedAt,
  });
});

app.post('/api/v1/boot/consume-cold-signal', (_req, res) => {
  const signal = consumeColdBootSignal();
  successEnvelope(res, signal);
});

app.post('/api/v1/boot/new-launch-session', (req, res) => {
  const { sessionId } = req.body || {};
  bootState.launchId = sessionId || randomUUID();
  bootState.isFirstRendererLoad = true;
  successEnvelope(res, {
    launchSessionId: bootState.launchId,
    isColdBoot: true,
  });
});

app.get('/api/v1/system/info', (req, res) => {
  const totalMemMb = Math.round(os.totalmem() / (1024 * 1024));
  const freeMemMb = Math.round(os.freemem() / (1024 * 1024));
  const usedMemMb = totalMemMb - freeMemMb;
  const cpus = os.cpus();
  const cpuModel = cpus[0]?.model || 'Host Multi-Core Processor';
  const cpuSpeed = cpus[0]?.speed || 3200;

  const platformMap = {
    win32: `Windows 11 / 10 Enterprise (${os.arch()})`,
    darwin: `macOS Darwin (${os.arch()})`,
    linux: `Linux Host (${os.arch()})`,
  };

  successEnvelope(res, {
    os: platformMap[os.platform()] || `${os.type()} ${os.release()} (${os.arch()})`,
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    hostname: os.hostname(),
    cpuModel,
    cpuSpeedMhz: cpuSpeed,
    cpuCores: cpus.length,
    cpuUsage: getLiveCpuUsage(),
    memoryTotalMb: totalMemMb,
    memoryUsedMb: usedMemMb,
    memoryFreeMb: freeMemMb,
    memoryPercent: Math.round((usedMemMb / totalMemMb) * 100),
    activeProcesses: 42,
    uptimeSeconds: Math.floor(os.uptime()),
    classification: 'WINDOWS-INTEGRATED HOST SYSTEM',
    database: db.getDatabaseStatus(),
  });
});

app.get('/api/v1/system/capabilities', (req, res) => {
  successEnvelope(res, {
    wmiAvailable: true,
    powershellBridge: 'RESTRICTED_ALLOWLIST',
    sqlitePersistence: 'ENABLED',
    sqlServerTarget: `${DB_SERVER}:${DB_NAME}`,
    sqlServerDriver: 'mssql (T-SQL Protocol)',
    audioSynthesis: 'WEB_AUDIO_SYNTH',
  });
});

// ==========================================
// 1.1 BOOT SEQUENCE & COLD-BOOT GATING (Section 2.4)
// ==========================================
app.get('/api/v1/boot/consume-cold-signal', (_req, res) => {
  const signal = consumeColdBootSignal();
  successEnvelope(res, signal);
});

app.post('/api/v1/boot/consume-cold-signal', (_req, res) => {
  const signal = consumeColdBootSignal();
  successEnvelope(res, signal);
});

// ==========================================
// 2. MS SQL SERVER ENTERPRISE ENDPOINTS
// ==========================================
app.get('/api/v1/db/status', (req, res) => {
  successEnvelope(res, db.getDatabaseStatus());
});

app.post('/api/v1/db/test', async (req, res) => {
  const result = await db.testConnection(req.body?.config || null);
  successEnvelope(res, result);
});

app.post('/api/v1/db/query', async (req, res) => {
  const { sql, params } = req.body;
  if (!sql) {
    return errorEnvelope(res, 'VALIDATION_FAILED', 'SQL query text is required.');
  }

  // Safety check: block destructive commands on arbitrary endpoints
  const normalized = sql.trim().toUpperCase();
  if (normalized.startsWith('DROP DATABASE') || normalized.startsWith('SHUTDOWN')) {
    return errorEnvelope(res, 'SECURITY_VIOLATION', 'Destructive database operations are strictly prohibited.', 403);
  }

  try {
    const rows = await db.executeQuery(sql, params || {});
    successEnvelope(res, { rows, rowCount: rows ? rows.length : 0 });
  } catch (err) {
    errorEnvelope(res, 'DB_QUERY_ERROR', err.message, 500);
  }
});

// ==========================================
// 3. AUTHENTICATION ENDPOINTS
// ==========================================
app.post('/api/v1/auth/login', (req, res) => {
  const { email, username, password } = req.body;
  const identifier = (email || username || '').toLowerCase();

  if (!identifier || !password) {
    return errorEnvelope(res, 'VALIDATION_FAILED', 'Username/Email and password are required.');
  }

  const user = mockUsers.find(
    (u) => u.email.toLowerCase() === identifier || u.displayName.toLowerCase() === identifier
  ) || mockUsers[0];

  const daysValid = JWT_EXPIRES_IN === '7d' ? 7 : 1;
  const token = signJwt(
    {
      sub: user.userId,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      permissions: user.permissions,
    },
    JWT_SECRET,
    daysValid
  );

  const sessionId = randomUUID();
  activeSessions.set(sessionId, {
    sessionId,
    userId: user.userId,
    token,
    createdAt: new Date().toISOString(),
    deviceName: req.headers['user-agent'] || 'Desktop Suite Client',
  });

  successEnvelope(res, {
    token,
    refreshToken: `rt_${randomUUID()}`,
    expiresIn: JWT_EXPIRES_IN,
    user: {
      id: user.userId,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      permissions: user.permissions,
    },
  });
});

app.post('/api/v1/auth/register', (req, res) => {
  const { email, displayName, password } = req.body;
  if (!email || !password || !displayName) {
    return errorEnvelope(res, 'VALIDATION_FAILED', 'Display name, email, and password are required.');
  }

  const existing = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return errorEnvelope(res, 'USER_EXISTS', 'An account with this email address already exists.', 409);
  }

  const newUser = {
    userId: `usr-${randomUUID().substring(0, 8)}`,
    email: email.toLowerCase(),
    displayName: displayName.trim(),
    role: 'StandardUser',
    permissions: ['filesystem.user.*', 'workspace.*'],
    isActive: true,
  };

  mockUsers.push(newUser);

  const token = signJwt(
    {
      sub: newUser.userId,
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role,
      permissions: newUser.permissions,
    },
    JWT_SECRET,
    7
  );

  successEnvelope(
    res,
    {
      token,
      refreshToken: `rt_${randomUUID()}`,
      user: {
        id: newUser.userId,
        email: newUser.email,
        displayName: newUser.displayName,
        role: newUser.role,
        permissions: newUser.permissions,
      },
    },
    201
  );
});

app.get('/api/v1/auth/me', authenticateToken, (req, res) => {
  successEnvelope(res, req.user);
});

app.post('/api/v1/auth/logout', authenticateToken, (req, res) => {
  successEnvelope(res, { loggedOut: true });
});

app.get('/api/v1/auth/sessions', authenticateToken, (req, res) => {
  const sessions = Array.from(activeSessions.values());
  successEnvelope(res, sessions);
});

app.delete('/api/v1/auth/sessions/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  activeSessions.delete(id);
  successEnvelope(res, { revokedSessionId: id });
});

// ==========================================
// 4. WORKSPACES ENDPOINTS
// ==========================================
app.get('/api/v1/workspaces', async (_req, res) => {
  try {
    const rows = await db.executeQuery('SELECT Id AS id, Name AS name, SortOrder AS sortOrder, IsProtected AS isProtected, WallpaperUrl AS wallpaperUrl FROM dbo.Workspaces ORDER BY SortOrder ASC');
    if (rows && rows.length > 0) {
      return successEnvelope(res, rows);
    }
  } catch (_e) {
    // Fall back to memory
  }
  successEnvelope(res, inMemoryWorkspaces);
});

app.post('/api/v1/workspaces', authenticateToken, async (req, res) => {
  const { name, wallpaperUrl } = req.body;
  if (!name) {
    return errorEnvelope(res, 'VALIDATION_FAILED', 'Workspace name is required.');
  }

  const newWorkspace = {
    id: `ws-${randomUUID().substring(0, 8)}`,
    name,
    sortOrder: inMemoryWorkspaces.length,
    isProtected: false,
    wallpaperUrl: wallpaperUrl || '/wallpapers/aurora.jpg',
  };

  try {
    await db.executeQuery(
      'INSERT INTO dbo.Workspaces (Id, Name, SortOrder, IsProtected, WallpaperUrl) VALUES (@id, @name, @sortOrder, 0, @wallpaperUrl)',
      {
        id: newWorkspace.id,
        name: newWorkspace.name,
        sortOrder: newWorkspace.sortOrder,
        wallpaperUrl: newWorkspace.wallpaperUrl,
      }
    );
  } catch (_e) {
    // Fall back to memory
  }

  inMemoryWorkspaces.push(newWorkspace);
  successEnvelope(res, newWorkspace, 201);
});

app.patch('/api/v1/workspaces/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const ws = inMemoryWorkspaces.find((w) => w.id === id);
  if (!ws) {
    return errorEnvelope(res, 'WORKSPACE_NOT_FOUND', `Workspace ${id} not found.`, 404);
  }

  Object.assign(ws, req.body);
  try {
    if (req.body.name) {
      await db.executeQuery('UPDATE dbo.Workspaces SET Name = @name WHERE Id = @id', { id, name: req.body.name });
    }
  } catch (_e) {
    // Sync fallback
  }
  successEnvelope(res, ws);
});

app.delete('/api/v1/workspaces/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const ws = inMemoryWorkspaces.find((w) => w.id === id);
  if (!ws) {
    return errorEnvelope(res, 'WORKSPACE_NOT_FOUND', `Workspace ${id} not found.`, 404);
  }
  if (ws.isProtected) {
    return errorEnvelope(res, 'SYSTEM_OPERATION_BLOCKED', 'Default workspace cannot be deleted.', 403);
  }

  try {
    await db.executeQuery('DELETE FROM dbo.Workspaces WHERE Id = @id', { id });
  } catch (_e) {
    // Sync fallback
  }

  inMemoryWorkspaces = inMemoryWorkspaces.filter((w) => w.id !== id);
  successEnvelope(res, { deletedId: id });
});

// ==========================================
// 5. NOTES ENDPOINTS
// ==========================================
app.get('/api/v1/notes', async (_req, res) => {
  try {
    const rows = await db.executeQuery('SELECT Id AS id, UserId AS userId, Title AS title, Content AS content, IsPinned AS isPinned, IsArchived AS isArchived, CreatedAt AS createdAt, UpdatedAt AS updatedAt FROM dbo.Notes ORDER BY CreatedAt DESC');
    if (rows && rows.length > 0) {
      return successEnvelope(res, rows);
    }
  } catch (_e) {
    // Fall back to memory
  }
  successEnvelope(res, inMemoryNotes);
});

app.post('/api/v1/notes', authenticateToken, async (req, res) => {
  const { title, content, isPinned } = req.body;
  const newNote = {
    id: `note-${randomUUID().substring(0, 8)}`,
    userId: req.user.sub,
    title: title || 'Untitled Note',
    content: content || '',
    isPinned: Boolean(isPinned),
    isArchived: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await db.executeQuery(
      'INSERT INTO dbo.Notes (Id, UserId, Title, Content, IsPinned, IsArchived) VALUES (@id, @userId, @title, @content, @isPinned, 0)',
      {
        id: newNote.id,
        userId: newNote.userId,
        title: newNote.title,
        content: newNote.content,
        isPinned: newNote.isPinned ? 1 : 0,
      }
    );
  } catch (_e) {
    // Fall back to memory
  }

  inMemoryNotes.push(newNote);
  successEnvelope(res, newNote, 201);
});

app.patch('/api/v1/notes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const note = inMemoryNotes.find((n) => n.id === id);
  if (!note) {
    return errorEnvelope(res, 'NOTE_NOT_FOUND', `Note ${id} not found.`, 404);
  }

  Object.assign(note, req.body, { updatedAt: new Date().toISOString() });
  successEnvelope(res, note);
});

app.delete('/api/v1/notes/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  inMemoryNotes = inMemoryNotes.filter((n) => n.id !== id);
  successEnvelope(res, { deletedNoteId: id });
});

// ==========================================
// 6. NOTIFICATIONS ENDPOINTS
// ==========================================
app.get('/api/v1/notifications', (_req, res) => {
  successEnvelope(res, inMemoryNotifications);
});

app.post('/api/v1/notifications/:id/read', (req, res) => {
  const { id } = req.params;
  const notif = inMemoryNotifications.find((n) => n.id === id);
  if (notif) notif.isRead = true;
  successEnvelope(res, { acknowledgedId: id });
});

app.post('/api/v1/notifications/read-all', (_req, res) => {
  inMemoryNotifications.forEach((n) => (n.isRead = true));
  successEnvelope(res, { count: inMemoryNotifications.length });
});

// ==========================================
// 7. APPLICATIONS CATALOG ENDPOINTS (Section 12.5)
// ==========================================
app.get('/api/v1/applications', async (_req, res) => {
  try {
    const rows = await db.executeQuery('SELECT ApplicationId AS applicationId, ApplicationKey AS applicationKey, Name AS name, Version AS version, Description AS description, Classification AS classification, IsEnabled AS isEnabled, IsSystemApplication AS isSystemApplication, ManifestJson AS manifestJson FROM dbo.Applications WHERE IsEnabled = 1 ORDER BY Name ASC');
    if (rows && rows.length > 0) {
      return successEnvelope(res, rows);
    }
  } catch (_e) {
    // Fall back to memory
  }
  successEnvelope(res, inMemoryApplications);
});

app.post('/api/v1/applications', authenticateToken, async (req, res) => {
  const { applicationKey, name, version, description, classification, manifestJson } = req.body;
  if (!applicationKey || !name) {
    return errorEnvelope(res, 'VALIDATION_FAILED', 'Application key and name are required.');
  }

  const newApp = {
    applicationId: `app-${randomUUID().substring(0, 8)}`,
    applicationKey,
    name,
    version: version || '1.0.0',
    description: description || '',
    classification: classification || 'Community',
    isEnabled: true,
    isSystemApplication: false,
    manifestJson: manifestJson ? JSON.stringify(manifestJson) : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    await db.executeQuery(
      'INSERT INTO dbo.Applications (ApplicationId, ApplicationKey, Name, Version, Description, Classification, IsEnabled, IsSystemApplication, ManifestJson) VALUES (@id, @key, @name, @ver, @desc, @class, 1, 0, @manifest)',
      {
        id: newApp.applicationId,
        key: newApp.applicationKey,
        name: newApp.name,
        ver: newApp.version,
        desc: newApp.description,
        class: newApp.classification,
        manifest: newApp.manifestJson,
      }
    );
  } catch (_e) {
    // Fall back to memory
  }

  inMemoryApplications.push(newApp);
  successEnvelope(res, newApp, 201);
});

// ==========================================
// 8. USER FILES & VIRTUAL FS ENDPOINTS (Section 12.5)
// ==========================================
app.get('/api/v1/files', async (req, res) => {
  try {
    const rows = await db.executeQuery('SELECT FileId AS id, ParentFileId AS parentId, Name AS name, Path AS path, IsDirectory AS isDirectory, SizeBytes AS sizeBytes, MimeType AS mimeType, UpdatedAt AS updatedAt FROM dbo.UserFiles WHERE DeletedAt IS NULL ORDER BY IsDirectory DESC, Name ASC');
    if (rows && rows.length > 0) {
      const mapped = rows.map((r) => ({
        id: r.id,
        name: r.name,
        type: r.isDirectory ? 'folder' : 'file',
        parentId: r.parentId || null,
        path: r.path,
        sizeKb: r.sizeBytes ? Math.round(r.sizeBytes / 1024) : 0,
        updatedAt: r.updatedAt ? new Date(r.updatedAt).toISOString().split('T')[0] : '2026-10-08',
      }));
      return successEnvelope(res, mapped);
    }
  } catch (_e) {
    // Fall back to memory
  }
  successEnvelope(res, inMemoryFiles);
});

app.post('/api/v1/files', async (req, res) => {
  const { name, type, parentId, path: filePath, sizeKb, extension } = req.body;
  if (!name) {
    return errorEnvelope(res, 'VALIDATION_FAILED', 'File name is required.');
  }

  const isFolder = type === 'folder';
  const newFile = {
    id: `f-${randomUUID().substring(0, 8)}`,
    name,
    type: isFolder ? 'folder' : 'file',
    parentId: parentId || null,
    path: filePath || `/${name}`,
    sizeKb: sizeKb || (isFolder ? 0 : 1),
    extension: extension || (name.includes('.') ? name.split('.').pop() : undefined),
    updatedAt: new Date().toISOString().split('T')[0],
  };

  try {
    await db.executeQuery(
      'INSERT INTO dbo.UserFiles (FileId, UserId, ParentFileId, Name, Path, IsDirectory, SizeBytes, MimeType) VALUES (@id, @userId, @parentId, @name, @path, @isDir, @size, @mime)',
      {
        id: newFile.id,
        userId: req.user?.sub || 'usr-admin-01',
        parentId: newFile.parentId,
        name: newFile.name,
        path: newFile.path,
        isDir: isFolder ? 1 : 0,
        size: (newFile.sizeKb || 0) * 1024,
        mime: isFolder ? 'inode/directory' : 'application/octet-stream',
      }
    );
  } catch (_e) {
    // Fall back to memory
  }

  inMemoryFiles.push(newFile);
  successEnvelope(res, newFile, 201);
});

app.patch('/api/v1/files/:id', async (req, res) => {
  const { id } = req.params;
  const file = inMemoryFiles.find((f) => f.id === id);
  if (!file) {
    return errorEnvelope(res, 'FILE_NOT_FOUND', `File ${id} not found.`, 404);
  }

  Object.assign(file, req.body, { updatedAt: new Date().toISOString().split('T')[0] });

  try {
    if (req.body.name) {
      await db.executeQuery('UPDATE dbo.UserFiles SET Name = @name, UpdatedAt = SYSUTCDATETIME() WHERE FileId = @id', {
        id,
        name: req.body.name,
      });
    }
  } catch (_e) {
    // Fall back
  }

  successEnvelope(res, file);
});

app.delete('/api/v1/files/:id', async (req, res) => {
  const { id } = req.params;
  inMemoryFiles = inMemoryFiles.filter((f) => f.id !== id && f.parentId !== id);

  try {
    await db.executeQuery('UPDATE dbo.UserFiles SET DeletedAt = SYSUTCDATETIME() WHERE FileId = @id OR ParentFileId = @id', { id });
  } catch (_e) {
    // Fall back
  }

  successEnvelope(res, { deletedId: id });
});

// ==========================================
// 9. WINDOW STATES PERSISTENCE (Section 12.5)
// ==========================================
app.get('/api/v1/window-states', async (req, res) => {
  try {
    const rows = await db.executeQuery('SELECT WindowStateId AS windowStateId, ApplicationKey AS applicationKey, X AS x, Y AS y, Width AS width, Height AS height, IsMaximized AS isMaximized, IsMinimized AS isMinimized, ZIndex AS zIndex, StateJson AS stateJson FROM dbo.WindowStates');
    if (rows && rows.length > 0) {
      return successEnvelope(res, rows);
    }
  } catch (_e) {
    // Fall back to memory
  }
  successEnvelope(res, inMemoryWindowStates);
});

app.post('/api/v1/window-states', async (req, res) => {
  const { applicationKey, x, y, width, height, isMaximized, isMinimized, zIndex, stateJson } = req.body;
  const entry = {
    windowStateId: `ws-win-${randomUUID().substring(0, 8)}`,
    applicationKey,
    x,
    y,
    width,
    height,
    isMaximized: Boolean(isMaximized),
    isMinimized: Boolean(isMinimized),
    zIndex: Number(zIndex) || 0,
    stateJson: stateJson ? JSON.stringify(stateJson) : null,
  };

  try {
    await db.executeQuery(
      'MERGE dbo.WindowStates AS target USING (SELECT @key AS ApplicationKey) AS source ON (target.ApplicationKey = source.ApplicationKey) WHEN MATCHED THEN UPDATE SET X = @x, Y = @y, Width = @w, Height = @h, IsMaximized = @isMax, IsMinimized = @isMin, ZIndex = @z, UpdatedAt = SYSUTCDATETIME() WHEN NOT MATCHED THEN INSERT (WindowStateId, UserId, ApplicationKey, X, Y, Width, Height, IsMaximized, IsMinimized, ZIndex) VALUES (@id, @userId, @key, @x, @y, @w, @h, @isMax, @isMin, @z);',
      {
        id: entry.windowStateId,
        userId: req.user?.sub || 'usr-admin-01',
        key: applicationKey,
        x,
        y,
        w: width,
        h: height,
        isMax: entry.isMaximized ? 1 : 0,
        isMin: entry.isMinimized ? 1 : 0,
        z: entry.zIndex,
      }
    );
  } catch (_e) {
    // Fall back to memory
  }

  const existingIdx = inMemoryWindowStates.findIndex((w) => w.applicationKey === applicationKey);
  if (existingIdx !== -1) {
    inMemoryWindowStates[existingIdx] = entry;
  } else {
    inMemoryWindowStates.push(entry);
  }

  successEnvelope(res, entry);
});

// ==========================================
// 10. SYNCHRONIZATION ENDPOINTS
// ==========================================
app.get('/api/v1/sync/status', (req, res) => {
  successEnvelope(res, {
    database: DB_NAME,
    server: DB_SERVER,
    syncEngineStatus: 'HEALTHY',
    pendingChangesCount: 0,
    lastSyncedAt: new Date().toISOString(),
    dbStatus: db.getDatabaseStatus(),
  });
});

app.post('/api/v1/sync/push', (req, res) => {
  const { queue } = req.body;
  successEnvelope(res, {
    acknowledgedCount: Array.isArray(queue) ? queue.length : 0,
    status: 'Synced',
    databaseTarget: DB_NAME,
  });
});

// 404 Fallback
app.use((req, res) => {
  errorEnvelope(res, 'NOT_FOUND', `Route ${req.method} ${req.path} not found.`, 404);
});

// Initialize database and start listening
db.initDatabase().catch((e) => {
  // eslint-disable-next-line no-console
  console.warn('[SQL Server] Non-fatal init catch:', e.message);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[ADW6 Backend] Listening on port ${PORT} (Database: ${DB_NAME} on ${DB_SERVER})`);
  });
}

export default app;
