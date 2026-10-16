# ── MyOS — One-Click Setup & Run ─────────────────────────────────────────
# Verifies Node.js, installs dependencies, starts the dev server, opens the browser.
# Does NOT modify Windows settings, registry, services, or firewall.
# Does NOT require administrator privileges.

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

Write-Host ""
Write-Host "  MyOS — Setup & Run" -ForegroundColor Cyan
Write-Host "  ------------------" -ForegroundColor DarkGray
Write-Host ""

function Fail($msg, $hint) {
  Write-Host "  [X] $msg" -ForegroundColor Red
  if ($hint) { Write-Host "      $hint" -ForegroundColor DarkGray }
  Write-Host ""
  Read-Host "Press Enter to exit"
  exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Fail "Node.js was not found on your PATH." "Install Node.js 20 LTS from https://nodejs.org/"
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Fail "npm was not found on your PATH." "npm ships with Node.js. Reinstall Node.js from https://nodejs.org/"
}

$nodeVersion = (node --version)
Write-Host "  [OK] Node.js $nodeVersion" -ForegroundColor Green

node "scripts\setup-and-run.mjs"
exit $LASTEXITCODE
