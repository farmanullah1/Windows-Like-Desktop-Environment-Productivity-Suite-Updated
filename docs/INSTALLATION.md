# Installation & Setup Guide

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Specification Version:** 6.0  
**Standard:** Standardized Installation & Configuration (Section 121, 140, 141)

---

## 1. Prerequisites

- **Operating System:** Windows 10 (version 2004+) or Windows 11 (64-bit).
- **Node.js:** v20.x or v22.x LTS.
- **Database (Optional for central sync):** Microsoft SQL Server 2019/2022 or SQL Server Express / Developer Edition.

---

## 2. Environment Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure parameters:
   ```env
   NODE_ENV=development
   PORT=3000
   SERVER=localhost
   DATABASE=MyOS
   JWT_SECRET=bac0a2b3e80af8c0fef9ca6a7f1466251047834cf15ee33f5af23b26e2012d09
   JWT_EXPIRES_IN=7d
   ```

---

## 3. Database Setup (SQL Server)

*The database migration scripts are located in `database/migrations/`:*
- `001_initial_schema.sql` (Base tables)
- `002_v6_enterprise_schema.sql` (Master v6.0 schema for database `MyOS`)

> **SAFETY DIRECTIVE:** As per Section 2.1, migrations are **never run automatically**. Execute them via SQL Server Management Studio (SSMS) or `sqlcmd` upon explicit administrative authorization.

---

## 4. Running the Application (Authorized User Commands)

*Development Mode:*
```bash
npm run dev
```
Starts the Vite local development server at `http://localhost:3000` (or configured port).

*Backend REST API Server:*
```bash
npm run server
```
Starts the Node.js Express/Fastify API service on port 3000.

*Static Typecheck:*
```bash
node ./node_modules/typescript/lib/tsc.js --noEmit
```
Verifies strict TypeScript compliance with 0 errors.

*Production Build:*
```bash
npm run build
```
Compiles and bundles the desktop suite for deployment.
