@echo off
setlocal

REM ── MyOS — One-Click Setup & Run ─────────────────────────────────────────
REM  This script verifies Node.js, installs dependencies, starts the dev
REM  server, and opens MyOS in your default browser.
REM
REM  It does NOT modify Windows settings, registry, services, or firewall.
REM  It does NOT require administrator privileges.
REM ─────────────────────────────────────────────────────────────────────────

title MyOS — Setup & Run
cd /d "%~dp0"

echo.
echo   MyOS — Setup ^& Run
echo   ------------------
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   [X] Node.js was not found on your PATH.
  echo.
  echo   Please install Node.js 20 LTS or newer from:
  echo       https://nodejs.org/
  echo.
  echo   During installation, keep "Add to PATH" enabled.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo   [X] npm was not found on your PATH.
  echo       npm ships with Node.js. Please reinstall Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo   [OK] Node.js and npm detected.
echo.

node "scripts\setup-and-run.mjs"

if errorlevel 1 (
  echo.
  echo   MyOS exited with an error. See the output above.
  pause
  exit /b 1
)

endlocal
