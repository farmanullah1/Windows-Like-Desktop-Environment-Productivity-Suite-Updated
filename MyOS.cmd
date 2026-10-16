@echo off
setlocal enabledelayedexpansion
title MyOS — Executive Desktop Environment ^& Productivity Suite

echo.
echo  ==============================================================
echo     __  __       ____   _____ 
echo    ^|  \/  ^|     / __ \ / ____^|
echo    ^| \  / ^|_   ^| ^|  ^| ^| ^(___  
echo    ^| ^|\/^| ^| ^| ^| ^| ^|  ^| ^|\___ \ 
echo    ^| ^|  ^| ^| ^|_^| ^| ^|__^| ^|____^) ^|
echo    ^|_^|  ^|_^|\__, ^|\____//_____/ 
echo             __/ ^|             
echo            ^|___/              
echo.
echo     Executive Desktop Environment ^& Productivity Suite
echo  ==============================================================
echo.

cd /d "%~dp0"

REM Step 1: Verify Node.js prerequisite
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found on your system PATH.
    echo.
    echo MyOS requires Node.js (version 20 or higher).
    echo Please download and install Node.js from: https://nodejs.org/
    echo During installation, ensure the option "Add to PATH" is checked.
    echo.
    pause
    exit /b 1
)

REM Step 2: Verify npm prerequisite
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] npm package manager was not found on your system PATH.
    echo.
    echo npm comes bundled with Node.js. Please install or repair Node.js from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Step 3: Check and automatically install dependencies if not installed
if not exist "node_modules\vite" (
    echo [MyOS] First-time setup detected: Installing required dependencies...
    echo [MyOS] This will take just a moment. Please wait...
    echo.
    if exist "package-lock.json" (
        call npm ci --no-audit --no-fund
    ) else (
        call npm install --no-audit --no-fund
    )
    if %ERRORLEVEL% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies.
        echo Please verify your internet connection and try running 'npm install' manually.
        echo.
        pause
        exit /b %ERRORLEVEL%
    )
    echo [MyOS] Dependencies installed successfully!
    echo.
)

REM Step 4: Ensure .env exists from .env.example
if not exist ".env" (
    if exist ".env.example" (
        copy ".env.example" ".env" >nul
        echo [MyOS] Created .env configuration file from .env.example.
    )
)

REM Step 5: Launch MyOS App (Starts server, checks health, and opens in new browser tab)
echo [MyOS] Initializing MyOS development and REST services...
node "%~dp0scripts\start-myos.mjs" %*
if %ERRORLEVEL% neq 0 (
    echo.
    echo [MyOS] Application exited with status code %ERRORLEVEL%.
    pause
)
