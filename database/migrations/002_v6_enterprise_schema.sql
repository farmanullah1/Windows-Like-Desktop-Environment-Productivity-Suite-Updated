-- ==============================================================================
-- MIGRATION 002: Enterprise Relational Schema (Master Specification Version 6.0)
-- Target Database: MyOS (Microsoft SQL Server)
-- SAFETY DIRECTIVE: DO NOT EXECUTE AUTOMATICALLY. Awaiting explicit user approval.
-- ==============================================================================

USE [MyOS];
GO

-- 1. Users Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Users')
BEGIN
    CREATE TABLE dbo.Users (
        UserId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Users PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        Email NVARCHAR(320) NOT NULL,
        NormalizedEmail NVARCHAR(320) NOT NULL,
        PasswordHash NVARCHAR(500) NULL,
        DisplayName NVARCHAR(200) NOT NULL,
        EmailVerified BIT NOT NULL DEFAULT 0,
        IsActive BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        LastLoginAt DATETIME2(3) NULL,
        CONSTRAINT UQ_Users_NormalizedEmail UNIQUE (NormalizedEmail)
    );
    CREATE NONCLUSTERED INDEX IX_Users_NormalizedEmail ON dbo.Users(NormalizedEmail);
END
GO

-- 2. Roles Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Roles')
BEGIN
    CREATE TABLE dbo.Roles (
        RoleId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Roles PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        Name NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        CONSTRAINT UQ_Roles_Name UNIQUE (Name)
    );
END
GO

-- 3. UserRoles Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserRoles')
BEGIN
    CREATE TABLE dbo.UserRoles (
        UserId UNIQUEIDENTIFIER NOT NULL,
        RoleId UNIQUEIDENTIFIER NOT NULL,
        AssignedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT PK_UserRoles PRIMARY KEY (UserId, RoleId),
        CONSTRAINT FK_UserRoles_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE,
        CONSTRAINT FK_UserRoles_Role FOREIGN KEY (RoleId) REFERENCES dbo.Roles(RoleId) ON DELETE CASCADE
    );
END
GO

-- 4. Permissions Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Permissions')
BEGIN
    CREATE TABLE dbo.Permissions (
        PermissionId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Permissions PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        PermissionKey NVARCHAR(200) NOT NULL,
        Description NVARCHAR(500) NULL,
        CONSTRAINT UQ_Permissions_Key UNIQUE (PermissionKey)
    );
END
GO

-- 5. RolePermissions Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'RolePermissions')
BEGIN
    CREATE TABLE dbo.RolePermissions (
        RoleId UNIQUEIDENTIFIER NOT NULL,
        PermissionId UNIQUEIDENTIFIER NOT NULL,
        CONSTRAINT PK_RolePermissions PRIMARY KEY (RoleId, PermissionId),
        CONSTRAINT FK_RolePermissions_Role FOREIGN KEY (RoleId) REFERENCES dbo.Roles(RoleId) ON DELETE CASCADE,
        CONSTRAINT FK_RolePermissions_Permission FOREIGN KEY (PermissionId) REFERENCES dbo.Permissions(PermissionId) ON DELETE CASCADE
    );
END
GO

-- 6. Sessions Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Sessions')
BEGIN
    CREATE TABLE dbo.Sessions (
        SessionId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Sessions PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        RefreshTokenHash NVARCHAR(500) NOT NULL,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        ExpiresAt DATETIME2(3) NOT NULL,
        RevokedAt DATETIME2(3) NULL,
        DeviceName NVARCHAR(200) NULL,
        DeviceFingerprint NVARCHAR(500) NULL,
        CONSTRAINT FK_Sessions_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
    );
    CREATE NONCLUSTERED INDEX IX_Sessions_UserId ON dbo.Sessions(UserId);
    CREATE NONCLUSTERED INDEX IX_Sessions_ExpiresAt ON dbo.Sessions(ExpiresAt);
END
GO

-- 7. Applications Catalog Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Applications')
BEGIN
    CREATE TABLE dbo.Applications (
        ApplicationId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Applications PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        ApplicationKey NVARCHAR(150) NOT NULL,
        Name NVARCHAR(200) NOT NULL,
        Version NVARCHAR(50) NOT NULL,
        Description NVARCHAR(1000) NULL,
        Classification NVARCHAR(50) NOT NULL,
        IsEnabled BIT NOT NULL DEFAULT 1,
        IsSystemApplication BIT NOT NULL DEFAULT 0,
        ManifestJson NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT UQ_Applications_Key UNIQUE (ApplicationKey)
    );
END
GO

-- 8. UserFiles Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'UserFiles')
BEGIN
    CREATE TABLE dbo.UserFiles (
        FileId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_UserFiles PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        ParentFileId UNIQUEIDENTIFIER NULL,
        Name NVARCHAR(500) NOT NULL,
        Path NVARCHAR(2000) NOT NULL,
        IsDirectory BIT NOT NULL DEFAULT 0,
        SizeBytes BIGINT NULL,
        ContentHash NVARCHAR(128) NULL,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        DeletedAt DATETIME2(3) NULL,
        CONSTRAINT FK_UserFiles_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId),
        CONSTRAINT FK_UserFiles_Parent FOREIGN KEY (ParentFileId) REFERENCES dbo.UserFiles(FileId)
    );
    CREATE NONCLUSTERED INDEX IX_UserFiles_UserId ON dbo.UserFiles(UserId);
    CREATE NONCLUSTERED INDEX IX_UserFiles_ParentFileId ON dbo.UserFiles(ParentFileId);
    CREATE NONCLUSTERED INDEX IX_UserFiles_Path ON dbo.UserFiles(Path);
END
GO

-- 9. Notes Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Notes')
BEGIN
    CREATE TABLE dbo.Notes (
        NoteId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Notes PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        Title NVARCHAR(500) NOT NULL,
        Content NVARCHAR(MAX) NOT NULL,
        IsPinned BIT NOT NULL DEFAULT 0,
        IsArchived BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_Notes_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId)
    );
    CREATE NONCLUSTERED INDEX IX_Notes_UserId ON dbo.Notes(UserId);
    CREATE NONCLUSTERED INDEX IX_Notes_UpdatedAt ON dbo.Notes(UpdatedAt);
END
GO

-- 10. Workspaces Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Workspaces')
BEGIN
    CREATE TABLE dbo.Workspaces (
        WorkspaceId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Workspaces PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        Name NVARCHAR(200) NOT NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        ConfigurationJson NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_Workspaces_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId)
    );
    CREATE NONCLUSTERED INDEX IX_Workspaces_UserId ON dbo.Workspaces(UserId);
END
GO

-- 11. WindowStates Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'WindowStates')
BEGIN
    CREATE TABLE dbo.WindowStates (
        WindowStateId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_WindowStates PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        WorkspaceId UNIQUEIDENTIFIER NULL,
        ApplicationKey NVARCHAR(150) NOT NULL,
        X INT NULL,
        Y INT NULL,
        Width INT NULL,
        Height INT NULL,
        IsMaximized BIT NOT NULL DEFAULT 0,
        IsMinimized BIT NOT NULL DEFAULT 0,
        ZIndex INT NOT NULL DEFAULT 0,
        StateJson NVARCHAR(MAX) NULL,
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_WindowStates_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId),
        CONSTRAINT FK_WindowStates_Workspace FOREIGN KEY (WorkspaceId) REFERENCES dbo.Workspaces(WorkspaceId)
    );
END
GO

-- 12. Notifications Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Notifications')
BEGIN
    CREATE TABLE dbo.Notifications (
        NotificationId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_Notifications PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        Title NVARCHAR(300) NOT NULL,
        Message NVARCHAR(2000) NOT NULL,
        Severity NVARCHAR(30) NOT NULL,
        Category NVARCHAR(100) NULL,
        IsRead BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        ReadAt DATETIME2(3) NULL,
        MetadataJson NVARCHAR(MAX) NULL,
        CONSTRAINT FK_Notifications_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId)
    );
    CREATE NONCLUSTERED INDEX IX_Notifications_User_Read ON dbo.Notifications(UserId, IsRead);
END
GO

-- 13. AuditLogs Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'AuditLogs')
BEGIN
    CREATE TABLE dbo.AuditLogs (
        AuditLogId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_AuditLogs PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NULL,
        Action NVARCHAR(200) NOT NULL,
        ResourceType NVARCHAR(100) NULL,
        ResourceId NVARCHAR(200) NULL,
        Severity NVARCHAR(30) NOT NULL,
        IpAddress NVARCHAR(64) NULL,
        UserAgent NVARCHAR(1000) NULL,
        MetadataJson NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_AuditLogs_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId)
    );
    CREATE NONCLUSTERED INDEX IX_AuditLogs_UserId ON dbo.AuditLogs(UserId);
    CREATE NONCLUSTERED INDEX IX_AuditLogs_CreatedAt ON dbo.AuditLogs(CreatedAt);
    CREATE NONCLUSTERED INDEX IX_AuditLogs_Action ON dbo.AuditLogs(Action);
END
GO

-- 14. SyncQueue Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SyncQueue')
BEGIN
    CREATE TABLE dbo.SyncQueue (
        SyncOperationId UNIQUEIDENTIFIER NOT NULL
            CONSTRAINT PK_SyncQueue PRIMARY KEY
            DEFAULT NEWSEQUENTIALID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        EntityType NVARCHAR(100) NOT NULL,
        EntityId NVARCHAR(200) NOT NULL,
        Operation NVARCHAR(30) NOT NULL,
        PayloadJson NVARCHAR(MAX) NOT NULL,
        AttemptCount INT NOT NULL DEFAULT 0,
        Status NVARCHAR(30) NOT NULL DEFAULT 'PENDING',
        LastError NVARCHAR(2000) NULL,
        CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_SyncQueue_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId)
    );
    CREATE NONCLUSTERED INDEX IX_SyncQueue_User_Status ON dbo.SyncQueue(UserId, Status);
END
GO
