#!/usr/bin/env bash
# ── MyOS — One-Click Setup & Run ─────────────────────────────────────────
# Verifies Node.js, installs dependencies, starts the dev server, opens the browser.
# Does NOT modify system settings. Does NOT require sudo.

set -euo pipefail

cd "$(dirname "$0")"

echo
echo "  MyOS — Setup & Run"
echo "  ------------------"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "  [X] Node.js was not found on your PATH." >&2
  echo "      Install Node.js 20 LTS from https://nodejs.org/" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "  [X] npm was not found on your PATH." >&2
  echo "      npm ships with Node.js. Reinstall Node.js from https://nodejs.org/" >&2
  exit 1
fi

echo "  [OK] Node.js $(node --version)"

exec node "scripts/setup-and-run.mjs"
