#!/usr/bin/env node
/**
 * MyOS — One-Click Setup & Run
 *
 * This script:
 *   1. Verifies Node.js and npm are installed and recent enough.
 *   2. Installs project dependencies (npm install).
 *   3. Creates .env from .env.example if missing.
 *   4. Starts the MyOS dev server.
 *   5. Waits for the server to be ready.
 *   6. Opens the app in your default browser.
 *
 * It does NOT:
 *   - Modify Windows registry, services, firewall, or system settings.
 *   - Install system packages.
 *   - Require administrator privileges.
 *   - Delete user files.
 *   - Connect to any database without your configuration.
 *
 * Safe to run repeatedly. Press Ctrl+C to stop.
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, copyFileSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { platform, release } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

// ─────────────────────────────────────────────────────────────────────────────
// Paths & constants
// ─────────────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const PKG_PATH = join(ROOT, 'package.json');
const ENV_PATH = join(ROOT, '.env');
const ENV_EXAMPLE_PATH = join(ROOT, '.env.example');

const DEFAULT_PORT = 5173;
const PORT_SCAN_RANGE = 20;
const HEALTH_PATH = '/';
const HEALTH_TIMEOUT_MS = 60_000;
const HEALTH_POLL_MS = 500;

const MIN_NODE_MAJOR = 20;
const MIN_NPM_MAJOR = 10;

// ─────────────────────────────────────────────────────────────────────────────
// Pretty output (no external deps)
// ─────────────────────────────────────────────────────────────────────────────

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
  console.log(`  ${bold('MyOS')} ${dim('— Setup & Run')}`);
  console.log(`  ${dim('A hybrid desktop environment, productivity suite, and developer workspace.')}\n`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Environment checks
// ─────────────────────────────────────────────────────────────────────────────

function fail(msg, hint) {
  log.err(msg);
  if (hint) log.raw(`\n${dim('Hint:')} ${hint}\n`);
  process.exit(1);
}

function getCmdVersion(cmd, args) {
  const isWin = platform() === 'win32';
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: isWin });
  if (r.error || r.status !== 0) return null;
  return (r.stdout || '').trim();
}

function verifyNode() {
  log.step(1, 'Checking environment');

  const nodeVersion = process.versions.node;
  const major = Number(nodeVersion.split('.')[0]);

  if (major < MIN_NODE_MAJOR) {
    fail(
      `Node.js ${MIN_NODE_MAJOR}+ is required. Found v${nodeVersion}.`,
      'Install the latest LTS from https://nodejs.org/ and re-run.'
    );
  }
  log.ok(`Node.js v${nodeVersion}`);

  const npmVersion = getCmdVersion('npm', ['--version']);
  if (!npmVersion) {
    fail(
      'npm was not found on your PATH.',
      'npm ships with Node.js. Reinstall Node from https://nodejs.org/ and ensure "Add to PATH" is enabled.'
    );
  }
  const npmMajor = Number(npmVersion.split('.')[0]);
  if (npmMajor < MIN_NPM_MAJOR) {
    fail(
      `npm ${MIN_NPM_MAJOR}+ is required. Found v${npmVersion}.`,
      'Run: npm install -g npm@latest'
    );
  }
  log.ok(`npm v${npmVersion}`);

  const gitVersion = getCmdVersion('git', ['--version']);
  if (gitVersion) {
    log.ok(gitVersion);
  } else {
    log.warn('git was not found on your PATH. Some developer features will be unavailable.');
  }

  log.info(`Platform: ${platform()} ${release()}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Verify project
// ─────────────────────────────────────────────────────────────────────────────

function verifyProject() {
  log.step(2, 'Verifying project');

  if (!existsSync(PKG_PATH)) {
    fail(
      `package.json not found at ${PKG_PATH}.`,
      'Run this script from the MyOS project root, or ensure the repository is complete.'
    );
  }

  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8'));
  log.ok(`Project: ${pkg.productName || pkg.name || 'MyOS'} v${pkg.version || '0.0.0'}`);

  const runner = existsSync(join(ROOT, 'package-lock.json')) ? 'npm ci' : 'npm install';
  log.info(`Will run: ${bold(runner)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 3 — Install dependencies
// ─────────────────────────────────────────────────────────────────────────────

async function installDependencies() {
  log.step(3, 'Installing dependencies');
  log.info('This may take a few minutes on first run.');

  const useCi = existsSync(join(ROOT, 'package-lock.json')) && process.env.CI === 'true';
  const args = useCi ? ['ci', '--no-audit', '--no-fund'] : ['install', '--no-audit', '--no-fund'];

  const code = await runForeground('npm', args, { cwd: ROOT });
  if (code !== 0) {
    fail(
      'Dependency installation failed.',
      'Check the output above. Common causes: no internet, proxy required, or a registry issue.'
    );
  }
  log.ok('Dependencies installed.');
}

function runForeground(cmd, args, opts = {}) {
  return new Promise((resolvePromise) => {
    const isWin = platform() === 'win32';
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: isWin, // npm is a .cmd on Windows
      ...opts,
    });
    child.on('close', (code) => resolvePromise(code ?? 1));
    child.on('error', () => resolvePromise(1));
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 4 — Environment file
// ─────────────────────────────────────────────────────────────────────────────

function ensureEnvFile() {
  log.step(4, 'Preparing environment file');

  if (existsSync(ENV_PATH)) {
    log.ok('.env already exists. Leaving it untouched.');
  } else if (!existsSync(ENV_EXAMPLE_PATH)) {
    log.warn('.env.example not found. Skipping .env creation.');
  } else {
    try {
      copyFileSync(ENV_EXAMPLE_PATH, ENV_PATH);
      log.ok('Created .env from .env.example');
      log.info(dim('Edit .env to configure database and auth before production use.'));
    } catch (e) {
      log.warn(`Could not create .env: ${e.message}`);
    }
  }

  // Detect configured DB engine (informational only — never connects)
  try {
    const env = readFileSync(existsSync(ENV_PATH) ? ENV_PATH : ENV_EXAMPLE_PATH, 'utf8');
    const engine = /^DB_ENGINE\s*=\s*(\S+)/m.exec(env)?.[1] || /^DB_SERVER\s*=/m.test(env) ? 'mssql' : 'sqlite';
    if (engine) log.info(`Configured database engine: ${bold(engine)}`);
  } catch {
    /* ignore */
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 5 — Find a free port
// ─────────────────────────────────────────────────────────────────────────────

function isPortFree(port) {
  return new Promise((resolvePromise) => {
    const server = createServer();
    server.once('error', () => resolvePromise(false));
    server.once('listening', () => server.close(() => resolvePromise(true)));
    server.listen(port, '127.0.0.1');
  });
}

async function findFreePort(start) {
  for (let p = start; p < start + PORT_SCAN_RANGE; p++) {
    // eslint-disable-next-line no-await-in-loop
    if (await isPortFree(p)) return p;
  }
  fail(
    `No free port found in range ${start}-${start + PORT_SCAN_RANGE - 1}.`,
    'Close other applications using these ports, or set PORT in .env.'
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 6 — Start dev server
// ─────────────────────────────────────────────────────────────────────────────

function startDevServer(port) {
  log.step(5, 'Starting MyOS dev server');

  const isWin = platform() === 'win32';
  const env = {
    ...process.env,
    PORT: String(port),
    BROWSER: 'none', // we open the browser ourselves after health check
  };

  const child = spawn('npm', ['run', 'dev:web'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: isWin,
    env,
  });

  child.stdout?.on('data', (d) => process.stdout.write(dim(d.toString())));
  child.stderr?.on('data', (d) => process.stderr.write(dim(d.toString())));

  child.on('exit', (code, signal) => {
    if (signal === 'SIGINT' || signal === 'SIGTERM') return;
    if (code !== 0 && code !== null) {
      log.err(`Dev server exited unexpectedly with code ${code}.`);
      process.exit(code ?? 1);
    }
  });

  return child;
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 7 — Wait for health
// ─────────────────────────────────────────────────────────────────────────────

async function waitForHealth(url, timeoutMs) {
  log.step(6, 'Waiting for MyOS to be ready');
  log.info(`Polling ${url}`);

  const start = Date.now();
  let lastErr = null;

  while (Date.now() - start < timeoutMs) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(t);
      if (res.ok || res.status === 304) {
        log.ok(`Ready after ${((Date.now() - start) / 1000).toFixed(1)}s`);
        return true;
      }
      lastErr = `HTTP ${res.status}`;
    } catch (e) {
      lastErr = e.message;
    }
    // eslint-disable-next-line no-await-in-loop
    await sleep(HEALTH_POLL_MS);
  }

  log.err(`Server did not become ready within ${timeoutMs / 1000}s. Last error: ${lastErr}`);
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 8 — Open browser
// ─────────────────────────────────────────────────────────────────────────────

function openBrowser(url) {
  log.step(7, 'Opening MyOS in your browser');
  const p = platform();
  let cmd;
  let args;

  if (p === 'win32') {
    cmd = 'cmd';
    args = ['/c', 'start', '""', url];
  } else if (p === 'darwin') {
    cmd = 'open';
    args = [url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }

  const r = spawnSync(cmd, args, { stdio: 'ignore', shell: false });
  if (r.error || r.status !== 0) {
    log.warn('Could not open the browser automatically.');
    log.raw(`\n  ${bold('Open this URL manually:')} ${color('cyan', url)}\n`);
    return;
  }
  log.ok(`Opened ${url}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Graceful shutdown
// ─────────────────────────────────────────────────────────────────────────────

function attachShutdown(child) {
  const stop = (signal) => {
    console.log(`\n${color('yellow', '⏹')}  Stopping MyOS (${signal})...`);
    try {
      child.kill('SIGINT');
    } catch {
      /* ignore */
    }
    setTimeout(() => process.exit(0), 300);
  };
  process.on('SIGINT', () => stop('SIGINT'));
  process.on('SIGTERM', () => stop('SIGTERM'));
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.clear?.();
  banner();

  verifyNode();
  verifyProject();
  await installDependencies();
  ensureEnvFile();

  const port = await findFreePort(Number(process.env.PORT) || DEFAULT_PORT);
  const url = `http://127.0.0.1:${port}${HEALTH_PATH}`;

  const server = startDevServer(port);
  attachShutdown(server);

  const ok = await waitForHealth(url, HEALTH_TIMEOUT_MS);
  if (!ok) {
    log.err('MyOS failed to start. Scroll up for the server log.');
    try { server.kill('SIGINT'); } catch { /* ignore */ }
    process.exit(1);
  }

  openBrowser(url);

  console.log(`\n${color('green', '🚀')}  ${bold('MyOS is running.')}`);
  console.log(`   ${dim('URL:')}    ${color('cyan', url)}`);
  console.log(`   ${dim('Stop:')}   Ctrl+C\n`);
}

main().catch((e) => {
  log.err(`Unexpected error: ${e?.message ?? e}`);
  process.exit(1);
});
