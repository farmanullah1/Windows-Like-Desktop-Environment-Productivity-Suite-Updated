-- ==============================================================================
-- MIGRATION 001: Initial Relational Schema for Microsoft SQL Server
-- Windows-Like Desktop Environment & Productivity Suite (Version 5.0)
-- SAFETY NOTE: DO NOT EXECUTE AUTOMATICALLY. Explicit user consent required.
-- ==============================================================================

-- 1. Users Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE dbo.Users (
        Id NVARCHAR(36) NOT NULL PRIMARY KEY,
        Username NVARCHAR(50) NOT NULL CONSTRAINT UQ_Users_Username UNIQUE,
        Email NVARCHAR(255) NOT NULL CONSTRAINT UQ_Users_Email UNIQUE,
        PasswordHash NVARCHAR(255) NOT NULL,
        FullName NVARCHAR(100) NULL,
        AvatarUrl NVARCHAR(500) NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT SYSDATETIMEOFFSET(),
        UpdatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Users_UpdatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_Users_Username ON dbo.Users(Username);
    CREATE NONCLUSTERED INDEX IX_Users_Email ON dbo.Users(Email);
END
GO

-- 2. Sessions Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Sessions')
BEGIN
    CREATE TABLE dbo.Sessions (
        Id NVARCHAR(36) NOT NULL PRIMARY KEY,
        UserId NVARCHAR(36) NOT NULL CONSTRAINT FK_Sessions_Users FOREIGN KEY REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        RefreshTokenHash NVARCHAR(255) NOT NULL,
        UserAgent NVARCHAR(500) NULL,
        IpAddress NVARCHAR(45) NULL,
        ExpiresAt DATETIMEOFFSET NOT NULL,
        IsRevoked BIT NOT NULL CONSTRAINT DF_Sessions_IsRevoked DEFAULT 0,
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Sessions_CreatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_Sessions_UserId ON dbo.Sessions(UserId);
    CREATE NONCLUSTERED INDEX IX_Sessions_ExpiresAt ON dbo.Sessions(ExpiresAt);
END
GO

-- 3. Roles and Permissions (RBAC)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Roles')
BEGIN
    CREATE TABLE dbo.Roles (
        Id NVARCHAR(50) NOT NULL PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL,
        Description NVARCHAR(255) NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Permissions')
BEGIN
    CREATE TABLE dbo.Permissions (
        Id NVARCHAR(50) NOT NULL PRIMARY KEY,
        Scope NVARCHAR(100) NOT NULL CONSTRAINT UQ_Permissions_Scope UNIQUE,
        Description NVARCHAR(255) NULL
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserRoles')
BEGIN
    CREATE TABLE dbo.UserRoles (
        UserId NVARCHAR(36) NOT NULL CONSTRAINT FK_UserRoles_Users FOREIGN KEY REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        RoleId NVARCHAR(50) NOT NULL CONSTRAINT FK_UserRoles_Roles FOREIGN KEY REFERENCES dbo.Roles(Id) ON DELETE CASCADE,
        CONSTRAINT PK_UserRoles PRIMARY KEY (UserId, RoleId)
    );
END
GO

-- 4. Workspaces Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Workspaces')
BEGIN
    CREATE TABLE dbo.Workspaces (
        Id NVARCHAR(36) NOT NULL PRIMARY KEY,
        UserId NVARCHAR(36) NOT NULL CONSTRAINT FK_Workspaces_Users FOREIGN KEY REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        Name NVARCHAR(100) NOT NULL,
        SortOrder INT NOT NULL CONSTRAINT DF_Workspaces_SortOrder DEFAULT 0,
        WallpaperUrl NVARCHAR(500) NULL,
        ThemeOverride NVARCHAR(50) NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_Workspaces_IsActive DEFAULT 0,
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Workspaces_CreatedAt DEFAULT SYSDATETIMEOFFSET(),
        UpdatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Workspaces_UpdatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_Workspaces_UserId ON dbo.Workspaces(UserId);
END
GO

-- 5. Workspace Windows State
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'WorkspaceWindows')
BEGIN
    CREATE TABLE dbo.WorkspaceWindows (
        Id NVARCHAR(36) NOT NULL PRIMARY KEY,
        WorkspaceId NVARCHAR(36) NOT NULL CONSTRAINT FK_WorkspaceWindows_Workspaces FOREIGN KEY REFERENCES dbo.Workspaces(Id) ON DELETE CASCADE,
        AppId NVARCHAR(50) NOT NULL,
        Title NVARCHAR(255) NOT NULL,
        PosX INT NOT NULL,
        PosY INT NOT NULL,
        Width INT NOT NULL,
        Height INT NOT NULL,
        ZIndex INT NOT NULL,
        IsMinimized BIT NOT NULL CONSTRAINT DF_WorkspaceWindows_IsMinimized DEFAULT 0,
        IsMaximized BIT NOT NULL CONSTRAINT DF_WorkspaceWindows_IsMaximized DEFAULT 0,
        SnapState NVARCHAR(20) NOT NULL CONSTRAINT DF_WorkspaceWindows_SnapState DEFAULT 'none',
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_WorkspaceWindows_CreatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_WorkspaceWindows_WorkspaceId ON dbo.WorkspaceWindows(WorkspaceId);
END
GO

-- 6. Notes Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Notes')
BEGIN
    CREATE TABLE dbo.Notes (
        Id NVARCHAR(36) NOT NULL PRIMARY KEY,
        UserId NVARCHAR(36) NOT NULL CONSTRAINT FK_Notes_Users FOREIGN KEY REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        Title NVARCHAR(255) NOT NULL,
        Content NVARCHAR(MAX) NOT NULL,
        IsPinned BIT NOT NULL CONSTRAINT DF_Notes_IsPinned DEFAULT 0,
        IsArchived BIT NOT NULL CONSTRAINT DF_Notes_IsArchived DEFAULT 0,
        ColorHex NVARCHAR(10) NULL,
        Version BIGINT NOT NULL CONSTRAINT DF_Notes_Version DEFAULT 1,
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Notes_CreatedAt DEFAULT SYSDATETIMEOFFSET(),
        UpdatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_Notes_UpdatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_Notes_UserId ON dbo.Notes(UserId);
END
GO

-- 7. AuditLogs Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AuditLogs')
BEGIN
    CREATE TABLE dbo.AuditLogs (
        Id BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        UserId NVARCHAR(36) NULL,
        EventType NVARCHAR(50) NOT NULL,
        Resource NVARCHAR(100) NOT NULL,
        Action NVARCHAR(50) NOT NULL,
        Outcome NVARCHAR(20) NOT NULL,
        DetailsJson NVARCHAR(MAX) NULL,
        IpAddress NVARCHAR(45) NULL,
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_AuditLogs_CreatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_AuditLogs_EventType ON dbo.AuditLogs(EventType);
    CREATE NONCLUSTERED INDEX IX_AuditLogs_CreatedAt ON dbo.AuditLogs(CreatedAt);
END
GO

-- 8. SyncQueue Table (Offline-First Delta Sync)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SyncQueue')
BEGIN
    CREATE TABLE dbo.SyncQueue (
        Id NVARCHAR(36) NOT NULL PRIMARY KEY,
        UserId NVARCHAR(36) NOT NULL CONSTRAINT FK_SyncQueue_Users FOREIGN KEY REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        EntityName NVARCHAR(50) NOT NULL,
        EntityId NVARCHAR(36) NOT NULL,
        Operation NVARCHAR(10) NOT NULL,
        PayloadJson NVARCHAR(MAX) NOT NULL,
        ClientTimestamp DATETIMEOFFSET NOT NULL,
        Status NVARCHAR(20) NOT NULL CONSTRAINT DF_SyncQueue_Status DEFAULT 'Pending',
        Attempts INT NOT NULL CONSTRAINT DF_SyncQueue_Attempts DEFAULT 0,
        LastError NVARCHAR(MAX) NULL,
        CreatedAt DATETIMEOFFSET NOT NULL CONSTRAINT DF_SyncQueue_CreatedAt DEFAULT SYSDATETIMEOFFSET()
    );
    CREATE NONCLUSTERED INDEX IX_SyncQueue_Status ON dbo.SyncQueue(Status);
END
GO
