import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// 1. Start Express REST API backend server on port 5000
const apiProcess = spawn(process.execPath, [join(ROOT, 'server', 'index.js')], {
  cwd: ROOT,
  stdio: 'inherit',
  env: {
    ...process.env,
    API_PORT: '5000',
  },
});

// 2. Start Vite development server on 0.0.0.0:3000
const viteBin = join(ROOT, 'node_modules', 'vite', 'bin', 'vite.js');
const viteProcess = spawn(
  process.execPath,
  [viteBin, '--host', '0.0.0.0', '--port', '3000'],
  {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  }
);

function cleanup() {
  try {
    apiProcess.kill();
  } catch {}
  try {
    viteProcess.kill();
  } catch {}
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
