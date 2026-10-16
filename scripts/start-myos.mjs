#!/usr/bin/env node
/**
 * MyOS — One-Command Development Launcher
 * Compliant with New-Updates.md Section 10 & 11 and Master Specification v9.
 *
 * Responsibilities:
 * 1. Generates a fresh unique non-secret launchSessionId.
 * 2. Verifies Node.js (>= 20) and npm (>= 10) prerequisites.
 * 3. Safely verifies / installs project dependencies if missing.
 * 4. Ensures .env exists from .env.example if missing.
 * 5. Finds an available port starting at 5173.
 * 6. Starts the Vite development server bound to loopback 127.0.0.1.
 * 7. Waits for HTTP readiness before triggering browser opening.
 * 8. Opens exactly ONE browser tab with `?launchSession=<launchSessionId>`.
 * 9. Manages Ctrl+C lifecycle with zero orphan child processes.
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, copyFileSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { platform } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const PKG_PATH = join(ROOT, 'package.json');
const ENV_PATH = join(ROOT, '.env');
const ENV_EXAMPLE_PATH = join(ROOT, '.env.example');

const DEFAULT_PORT = 5173;
const PORT_SCAN_RANGE = 20;
const HEALTH_TIMEOUT_MS = 60_000;
const HEALTH_POLL_MS = 400;

const MIN_NODE_MAJOR = 20;
const MIN_NPM_MAJOR = 10;

// Unique launch session ID for this specific invocation
const launchSessionId = `launch_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const supportsColor =
  process.stdout.isTTY && process.env.NO_COLOR !== '1' && process.env.TERM !== 'dumb';

const color = (c, s) => (supportsColor ? `${C[c]}${s}${C.reset}` : s);
const bold = (s) => color('bold', s);
const dim = (s) => color('dim', s);

const log = {
  info: (m) => console.log(`${color('cyan', 'ℹ')}  ${m}`),
  ok: (m) => console.log(`${color('green', '✔')}  ${m}`),
  warn: (m) => console.log(`${color('yellow', '⚠')}  ${m}`),
  err: (m) => console.error(`${color('red', '✖')}  ${m}`),
  step: (n, m) => console.log(`\n${color('magenta', `[${n}]`)} ${bold(m)}`),
  raw: (m) => console.log(m),
};

function banner() {
  const art = `
  ███╗   ███╗██╗   ██╗ ██████╗ ███████╗
  ████╗ ████║╚██╗ ██╔╝██╔═══██╗██╔════╝
  ██╔████╔██║ ╚████╔╝ ██║   ██║███████╗
  ██║╚██╔╝██║  ╚██╔╝  ██║   ██║╚════██║
  ██║ ╚═╝ ██║   ██║   ╚██████╔╝███████║
  ╚═╝     ╚═╝   ╚═╝    ╚═════╝ ╚══════╝
  `;
  console.log(color('cyan', art));
  console.log(`  ${bold('MyOS')} ${dim('— Development Launcher')}`);
  console.log(`  ${dim('Launch Session ID:')} ${color('yellow', launchSessionId)}\n`);
}

function checkNodeVersion() {
  const [major] = process.versions.node.split('.').map(Number);
  if (major < MIN_NODE_MAJOR) {
    log.err(`Node.js ${process.versions.node} detected. MyOS requires Node.js >= ${MIN_NODE_MAJOR}.0.0.`);
    process.exit(1);
  }
  log.ok(`Node.js v${process.versions.node} (>= ${MIN_NODE_MAJOR}) verified`);
}

function checkNpmVersion() {
  const isWin = platform() === 'win32';
  const npmCmd = isWin ? 'npm.cmd' : 'npm';
  const res = spawnSync(npmCmd, ['--version'], { encoding: 'utf8', shell: false });
  if (res.error || res.status !== 0) {
    log.err('npm executable not found on PATH.');
    process.exit(1);
  }
  const version = (res.stdout || '').trim();
  const [major] = version.split('.').map(Number);
  if (major < MIN_NPM_MAJOR) {
    log.err(`npm ${version} detected. MyOS requires npm >= ${MIN_NPM_MAJOR}.0.0.`);
    process.exit(1);
  }
  log.ok(`npm v${version} (>= ${MIN_NPM_MAJOR}) verified`);
}

function ensureDependencies() {
  const nodeModulesDir = join(ROOT, 'node_modules');
  const viteBin = join(nodeModulesDir, 'vite', 'bin', 'vite.js');
  if (existsSync(nodeModulesDir) && existsSync(viteBin)) {
    log.ok('Project dependencies are already installed.');
    return;
  }

  log.info('Dependencies missing. Installing via npm...');
  const isWin = platform() === 'win32';
  const npmCmd = isWin ? 'npm.cmd' : 'npm';
  const lockfile = join(ROOT, 'package-lock.json');
  const installArgs = existsSync(lockfile) ? ['ci'] : ['install'];

  const res = spawnSync(npmCmd, installArgs, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: false,
  });

  if (res.status !== 0) {
    log.err('Dependency installation failed.');
    process.exit(res.status || 1);
  }
  log.ok('Dependencies installed successfully.');
}

function ensureEnvFile() {
  if (existsSync(ENV_PATH)) {
    log.ok('.env file present.');
    return;
  }
  if (existsSync(ENV_EXAMPLE_PATH)) {
    copyFileSync(ENV_EXAMPLE_PATH, ENV_PATH);
    log.ok('Created .env from .env.example.');
  }
}

function isPortAvailable(port) {
  return new Promise((resolvePort) => {
    const srv = createServer();
    srv.once('error', () => resolvePort(false));
    srv.once('listening', () => {
      srv.close(() => resolvePort(true));
    });
    srv.listen(port, '127.0.0.1');
  });
}

async function findAvailablePort(startPort) {
  for (let offset = 0; offset < PORT_SCAN_RANGE; offset++) {
    const port = startPort + offset;
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  return null;
}

async function waitForHealth(url, timeoutMs = HEALTH_TIMEOUT_MS) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.status < 500) return true;
    } catch (_e) {
      // Server warming up
    }
    await sleep(HEALTH_POLL_MS);
  }
  return false;
}

function openBrowser(targetUrl) {
  const currentPlatform = platform();
  log.info(`Opening MyOS in browser: ${color('cyan', targetUrl)}`);

  if (currentPlatform === 'win32') {
    spawn('cmd.exe', ['/c', 'start', '""', targetUrl], {
      detached: true,
      stdio: 'ignore',
      shell: false,
    }).unref();
  } else if (currentPlatform === 'darwin') {
    spawn('open', [targetUrl], {
      detached: true,
      stdio: 'ignore',
      shell: false,
    }).unref();
  } else {
    spawn('xdg-open', [targetUrl], {
      detached: true,
      stdio: 'ignore',
      shell: false,
    }).unref();
  }
}

async function main() {
  banner();

  log.step('1/4', 'Prerequisites & Environment Verification');
  checkNodeVersion();
  checkNpmVersion();

  log.step('2/4', 'Dependency & Configuration Check');
  ensureDependencies();
  ensureEnvFile();

  log.step('3/4', 'Allocating Local Loopback Port');
  const port = await findAvailablePort(DEFAULT_PORT);
  if (!port) {
    log.err(`Could not find an open port in range ${DEFAULT_PORT}-${DEFAULT_PORT + PORT_SCAN_RANGE}.`);
    process.exit(1);
  }
  log.ok(`Allocated loopback port: ${bold(String(port))}`);

  // Optional: Start backend server on port 5000 if port is free
  let apiProcess = null;
  const isApiFree = await isPortAvailable(5000);
  const serverPath = join(ROOT, 'server', 'index.js');
  if (isApiFree && existsSync(serverPath)) {
    log.info('Starting MyOS Backend REST Server on port 5000...');
    apiProcess = spawn(process.execPath, [serverPath], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
    });
    apiProcess.stderr.on('data', () => {});
    apiProcess.unref();
  }

  log.step('4/4', 'Starting MyOS Development Server');
  const viteBin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
  const appUrl = `http://127.0.0.1:${port}/?launchSession=${encodeURIComponent(launchSessionId)}`;

  const devProcess = spawn(
    process.execPath,
    [viteBin, '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
    {
      cwd: ROOT,
      env: {
        ...process.env,
        MYOS_LAUNCH_SESSION: launchSessionId,
      },
      stdio: ['inherit', 'pipe', 'pipe'],
      shell: false,
    }
  );

  devProcess.stdout.on('data', (d) => process.stdout.write(d));
  devProcess.stderr.on('data', (d) => process.stderr.write(d));

  devProcess.on('exit', (code, signal) => {
    if (code !== 0 && signal !== 'SIGINT') {
      log.err(`MyOS server exited with code ${code} (${signal || 'none'})`);
    }
    process.exit(code || 0);
  });

  const isReady = await waitForHealth(`http://127.0.0.1:${port}/`);
  if (!isReady) {
    log.err('Timed out waiting for MyOS development server.');
    devProcess.kill();
    if (apiProcess) apiProcess.kill();
    process.exit(1);
  }

  log.ok('MyOS development server is responsive!');
  openBrowser(appUrl);

  console.log(`\n${bold('✔ MyOS is running!')}`);
  console.log(`  Local URL:      ${color('cyan', `http://127.0.0.1:${port}/`)}`);
  console.log(`  Launch Session: ${color('yellow', launchSessionId)}`);
  console.log(`  ${dim('Press Ctrl+C to stop.')}\n`);

  const shutdown = () => {
    console.log(`\n${dim('Shutting down MyOS server...')}`);
    if (apiProcess) {
      try { apiProcess.kill('SIGINT'); } catch { /* ignore */ }
    }
    devProcess.kill('SIGINT');
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  log.err(err.message || String(err));
  process.exit(1);
});
