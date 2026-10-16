/**
 * Windows Desktop Environment & Productivity Suite
 * MS SQL Server Enterprise Connection & Data Layer
 * Compliant with Master Architecture Specification Sections 10, 11 & 12.
 */

import mssql from 'mssql';

let pool = null;
let connectionState = 'INITIALIZING';
let lastError = null;
let lastConnectedAt = null;

export const getDbConfig = () => ({
  server: process.env.DB_SERVER || process.env.SERVER || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || process.env.DATABASE || 'MyOS',
  user: process.env.DB_USER || 'adw_app_user',
  password: process.env.DB_PASSWORD || 'AdwDesktop2026!Secure',
  options: {
    encrypt: process.env.DB_ENCRYPT !== 'false',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
    connectTimeout: Number(process.env.DB_CONNECTION_TIMEOUT_MS) || 5000,
    requestTimeout: 10000,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
});

/**
 * Initialize connection pool to MS SQL Server
 */
export async function initDatabase() {
  const config = getDbConfig();
  connectionState = 'CONNECTING';

  try {
    // Only attempt if password or trusted auth is configured
    pool = new mssql.ConnectionPool(config);
    await pool.connect();
    connectionState = 'CONNECTED';
    lastConnectedAt = new Date().toISOString();
    lastError = null;
    // eslint-disable-next-line no-console
    console.log(`[SQL Server] Connected successfully to ${config.database} on ${config.server}:${config.port}`);
    await ensureCoreTables();
    return pool;
  } catch (err) {
    connectionState = 'DISCONNECTED';
    lastError = err.message || String(err);
    // eslint-disable-next-line no-console
    console.warn(`[SQL Server] Notice: Could not connect to SQL Server (${config.server}:${config.port}/${config.database}): ${lastError}. Using resilient local persistence cache.`);
    return null;
  }
}

/**
 * Check and ensure base tables exist in MyOS if connected
 */
async function ensureCoreTables() {
  if (!pool || connectionState !== 'CONNECTED') return;
  try {
    const request = pool.request();
    await request.query(`
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Workspaces')
      BEGIN
        CREATE TABLE dbo.Workspaces (
          Id NVARCHAR(64) PRIMARY KEY,
          Name NVARCHAR(100) NOT NULL,
          SortOrder INT NOT NULL DEFAULT 0,
          IsProtected BIT NOT NULL DEFAULT 0,
          WallpaperUrl NVARCHAR(255) NULL,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
        );
      END;

      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Notes')
      BEGIN
        CREATE TABLE dbo.Notes (
          Id NVARCHAR(64) PRIMARY KEY,
          UserId NVARCHAR(64) NOT NULL,
          Title NVARCHAR(200) NOT NULL,
          Content NVARCHAR(MAX) NULL,
          IsPinned BIT NOT NULL DEFAULT 0,
          IsArchived BIT NOT NULL DEFAULT 0,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
          UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
        );
      END;

      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AuditLogs')
      BEGIN
        CREATE TABLE dbo.AuditLogs (
          Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
          EventType NVARCHAR(100) NOT NULL,
          Severity NVARCHAR(20) NOT NULL DEFAULT 'info',
          Details NVARCHAR(MAX) NULL,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
        );
      END;

      -- Section 12.5: Applications Table
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Applications')
      BEGIN
        CREATE TABLE dbo.Applications (
          ApplicationId NVARCHAR(64) PRIMARY KEY,
          ApplicationKey NVARCHAR(150) NOT NULL UNIQUE,
          Name NVARCHAR(200) NOT NULL,
          Version NVARCHAR(50) NOT NULL,
          Description NVARCHAR(1000) NULL,
          Classification NVARCHAR(50) NOT NULL,
          IsEnabled BIT NOT NULL DEFAULT 1,
          IsSystemApplication BIT NOT NULL DEFAULT 0,
          ManifestJson NVARCHAR(MAX) NULL,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
          UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
        );
      END;

      -- Section 12.5: UserFiles Table
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserFiles')
      BEGIN
        CREATE TABLE dbo.UserFiles (
          FileId NVARCHAR(64) PRIMARY KEY,
          UserId NVARCHAR(64) NOT NULL,
          ParentFileId NVARCHAR(64) NULL,
          Name NVARCHAR(500) NOT NULL,
          Path NVARCHAR(2000) NOT NULL,
          IsDirectory BIT NOT NULL DEFAULT 0,
          SizeBytes BIGINT NULL,
          MimeType NVARCHAR(200) NULL,
          ContentHash NVARCHAR(128) NULL,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
          UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
          DeletedAt DATETIME2(3) NULL
        );
      END;

      -- Section 12.5: WindowStates Table
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'WindowStates')
      BEGIN
        CREATE TABLE dbo.WindowStates (
          WindowStateId NVARCHAR(64) PRIMARY KEY,
          UserId NVARCHAR(64) NOT NULL,
          WorkspaceId NVARCHAR(64) NULL,
          ApplicationKey NVARCHAR(150) NOT NULL,
          X INT NULL,
          Y INT NULL,
          Width INT NULL,
          Height INT NULL,
          IsMaximized BIT NOT NULL DEFAULT 0,
          IsMinimized BIT NOT NULL DEFAULT 0,
          ZIndex INT NOT NULL DEFAULT 0,
          StateJson NVARCHAR(MAX) NULL,
          UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
        );
      END;

      -- Section 12.5: Notifications Table
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Notifications')
      BEGIN
        CREATE TABLE dbo.Notifications (
          NotificationId NVARCHAR(64) PRIMARY KEY,
          UserId NVARCHAR(64) NOT NULL,
          Title NVARCHAR(300) NOT NULL,
          Message NVARCHAR(2000) NOT NULL,
          Severity NVARCHAR(30) NOT NULL,
          Category NVARCHAR(100) NULL,
          IsRead BIT NOT NULL DEFAULT 0,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
          ReadAt DATETIME2(3) NULL,
          MetadataJson NVARCHAR(MAX) NULL
        );
      END;

      -- Section 12.5: SyncQueue Table
      IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SyncQueue')
      BEGIN
        CREATE TABLE dbo.SyncQueue (
          SyncOperationId NVARCHAR(64) PRIMARY KEY,
          UserId NVARCHAR(64) NOT NULL,
          EntityType NVARCHAR(100) NOT NULL,
          EntityId NVARCHAR(200) NOT NULL,
          Operation NVARCHAR(30) NOT NULL,
          PayloadJson NVARCHAR(MAX) NOT NULL,
          AttemptCount INT NOT NULL DEFAULT 0,
          Status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',
          LastError NVARCHAR(2000) NULL,
          CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
          UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
        );
      END;

      -- Initial Seeding for Workspaces
      IF NOT EXISTS (SELECT 1 FROM dbo.Workspaces)
      BEGIN
        INSERT INTO dbo.Workspaces (Id, Name, SortOrder, IsProtected, WallpaperUrl) VALUES
          ('ws-1', 'Main', 0, 1, '/wallpapers/aurora.jpg'),
          ('ws-2', 'Development', 1, 0, '/wallpapers/cyberpunk.jpg'),
          ('ws-3', 'Productivity', 2, 0, '/wallpapers/fluent_silk.jpg'),
          ('ws-4', 'System', 3, 0, '/wallpapers/cosmic_nebula.jpg');
      END;

      -- Initial Seeding for Applications Catalog
      IF NOT EXISTS (SELECT 1 FROM dbo.Applications)
      BEGIN
        INSERT INTO dbo.Applications (ApplicationId, ApplicationKey, Name, Version, Classification, IsEnabled, IsSystemApplication, Description) VALUES
          ('app-1', 'file-explorer', 'File Explorer', '5.0.0', 'Core', 1, 1, 'Browse and organize files and folders.'),
          ('app-2', 'settings', 'Settings', '5.0.0', 'Core', 1, 1, 'System preferences and themes.'),
          ('app-3', 'notes', 'Notes', '5.0.0', 'Productivity', 1, 1, 'Markdown notes with automatic sync.'),
          ('app-4', 'terminal', 'Terminal Center', '5.0.0', 'Developer', 1, 1, 'Interactive shell and diagnostics.'),
          ('app-5', 'task-manager', 'Task Manager', '5.0.0', 'System', 1, 1, 'Inspect active processes and host performance.'),
          ('app-6', 'system-info', 'System Information', '5.0.0', 'System', 1, 1, 'Host hardware and OS metrics.'),
          ('app-7', 'calculator', 'Calculator', '5.0.0', 'Productivity', 1, 1, 'Mathematical calculations.'),
          ('app-8', 'clock', 'Clock & Timer', '5.0.0', 'Productivity', 1, 1, 'World clock, timer, and stopwatch.'),
          ('app-9', 'api-tester', 'API Tester', '5.0.0', 'Developer', 1, 1, 'HTTP REST endpoint inspection.'),
          ('app-10', 'json-viewer', 'JSON Studio', '5.0.0', 'Developer', 1, 1, 'JSON structure analysis.'),
          ('app-11', 'dev-workspace', 'Developer Hub', '5.0.0', 'Developer', 1, 1, 'Developer productivity suite.'),
          ('app-12', 'text-editor', 'Text Editor', '5.0.0', 'Productivity', 1, 1, 'Rich code and text editing.'),
          ('app-13', 'app-catalog', 'App Catalog', '5.0.0', 'System', 1, 1, 'Application registry and marketplace.'),
          ('app-14', 'diagnostics', 'Diagnostics', '5.0.0', 'System', 1, 1, 'System health and event logging.'),
          ('app-15', 'media-player', 'Media Player', '5.0.0', 'Productivity', 1, 1, 'Audio & video visualizer playback.'),
          ('app-16', 'gallery', 'Photo Gallery', '5.0.0', 'Productivity', 1, 1, 'Image preview and organization.'),
          ('app-17', 'clipboard', 'Clipboard History', '8.0.0', 'Utilities', 1, 1, 'Searchable clipboard history with pinning.'),
          ('app-18', 'snippets', 'Snippet Expander', '8.0.0', 'Productivity', 1, 1, 'Keyword expansion triggers and dynamic variables.'),
          ('app-19', 'quick-utils', 'Quick Utilities', '8.0.0', 'Utilities', 1, 1, 'Developer utilities, encoders, color studio.'),
          ('app-20', 'tasks', 'Tasks & Kanban', '8.0.0', 'Productivity', 1, 1, 'Sprint Kanban boards and project tasks.'),
          ('app-21', 'calendar', 'Calendar & Events', '8.0.0', 'Productivity', 1, 1, 'Monthly calendar grid and agenda scheduler.'),
          ('app-22', 'focus', 'Focus Mode', '8.0.0', 'Productivity', 1, 1, 'Pomodoro timer and ambient audio synthesizer.'),
          ('app-23', 'vault', 'Security Vault', '8.0.0', 'System', 1, 1, 'Encrypted password vault and TOTP 2FA tokens.'),
          ('app-24', 'ai-assistant', 'Antigravity AI', '8.0.0', 'Productivity', 1, 1, 'On-device desktop AI assistant.');
      END;

      -- Initial Seeding for Virtual User Files
      IF NOT EXISTS (SELECT 1 FROM dbo.UserFiles)
      BEGIN
        INSERT INTO dbo.UserFiles (FileId, UserId, ParentFileId, Name, Path, IsDirectory, SizeBytes, MimeType) VALUES
          ('f-docs', 'usr-admin-01', NULL, 'Documents', '/Documents', 1, 0, 'inode/directory'),
          ('f-downloads', 'usr-admin-01', NULL, 'Downloads', '/Downloads', 1, 0, 'inode/directory'),
          ('f-pictures', 'usr-admin-01', NULL, 'Pictures', '/Pictures', 1, 0, 'inode/directory'),
          ('f-projects', 'usr-admin-01', NULL, 'Projects', '/Projects', 1, 0, 'inode/directory'),
          ('f-welcome', 'usr-admin-01', NULL, 'Welcome_ADW.txt', '/Welcome_ADW.txt', 0, 4096, 'text/plain'),
          ('f-spec', 'usr-admin-01', 'f-docs', 'System_Specification.md', '/Documents/System_Specification.md', 0, 55296, 'text/markdown'),
          ('f-todo', 'usr-admin-01', 'f-docs', 'Sprint_Roadmap.txt', '/Documents/Sprint_Roadmap.txt', 0, 12288, 'text/plain'),
          ('f-wallpaper', 'usr-admin-01', 'f-pictures', 'Aurora_Wallpaper.png', '/Pictures/Aurora_Wallpaper.png', 0, 1454080, 'image/png');
      END;

      -- Initial Seeding for Notes
      IF NOT EXISTS (SELECT 1 FROM dbo.Notes)
      BEGIN
        INSERT INTO dbo.Notes (Id, UserId, Title, Content, IsPinned, IsArchived) VALUES
          ('note-1', 'usr-admin-01', 'Architecture Blueprint', '# Windows Desktop Suite v8.0\n\nProduction architecture integrating Windows 11 Fluent visuals, macOS dock dynamics, and Ubuntu workspace ergonomics with live MS SQL Server connectivity.', 1, 0);
      END;
    `);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[SQL Server] Table initialization check deferred:', err.message);
  }
}

/**
 * Test connectivity with arbitrary or active credentials
 */
export async function testConnection(customConfig = null) {
  const config = customConfig || getDbConfig();
  const startTime = Date.now();
  let testPool = null;

  try {
    testPool = new mssql.ConnectionPool({
      ...config,
      options: {
        ...config.options,
        connectTimeout: 4000,
      },
    });
    await testPool.connect();
    const result = await testPool.request().query('SELECT @@VERSION AS Version, DB_NAME() AS CurrentDb');
    const latencyMs = Date.now() - startTime;
    await testPool.close();

    return {
      success: true,
      latencyMs,
      database: result.recordset[0]?.CurrentDb || config.database,
      version: result.recordset[0]?.Version || 'Microsoft SQL Server',
      server: config.server,
      port: config.port,
    };
  } catch (err) {
    if (testPool) {
      try { await testPool.close(); } catch (_) { /* ignore */ }
    }
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      error: err.message || 'Connection failed',
      server: config.server,
      port: config.port,
    };
  }
}

/**
 * Execute a query with graceful fallback
 */
export async function executeQuery(sqlText, params = {}) {
  if (!pool || connectionState !== 'CONNECTED') {
    return null;
  }
  try {
    const request = pool.request();
    for (const [key, val] of Object.entries(params)) {
      request.input(key, val);
    }
    const result = await request.query(sqlText);
    return result.recordset;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[SQL Server Query Error]', err.message);
    throw err;
  }
}

/**
 * Get current database status summary
 */
export function getDatabaseStatus() {
  const cfg = getDbConfig();
  return {
    engine: 'Microsoft SQL Server',
    state: connectionState,
    server: cfg.server,
    port: cfg.port,
    database: cfg.database,
    user: cfg.user,
    encrypted: cfg.options.encrypt,
    trustedCertificate: cfg.options.trustServerCertificate,
    lastConnectedAt,
    lastError,
  };
}

export default {
  initDatabase,
  testConnection,
  executeQuery,
  getDatabaseStatus,
  getDbConfig,
};
