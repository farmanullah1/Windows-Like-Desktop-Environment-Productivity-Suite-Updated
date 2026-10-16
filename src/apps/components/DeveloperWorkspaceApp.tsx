import React, { useState } from 'react';
import {
  Code,
  GitBranch,
  Terminal,
  Database,
  Send,
  Play,
  CheckSquare,
  Square,
  Layers,
  Folder,
  RefreshCw,
  Clock,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';
import { useDesktop } from '../../core/desktopStore';
import { Workspace } from '../../core/types';

interface DevTask {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface AppProfile {
  id: string;
  name: string;
  description: string;
  apps: string[];
}

export const DeveloperWorkspaceApp: React.FC<{ windowId: string }> = () => {
  const { openApp, activeWorkspaceId, workspaces } = useDesktop();

  const [activeTab, setActiveTab] = useState<'overview' | 'profiles' | 'database' | 'tasks' | 'logs'>('overview');
  const [dbHost, setDbHost] = useState('localhost');
  const [dbName, setDbName] = useState('MyOS');
  const [dbPort, setDbPort] = useState('1433');
  const [dbStatus, setDbStatus] = useState<'idle' | 'testing' | 'connected' | 'error'>('idle');
  const [dbMessage, setDbMessage] = useState('');

  const [tasks, setTasks] = useState<DevTask[]>([
    { id: '1', text: 'Validate TypeScript types with tsc --noEmit', completed: true, priority: 'high' },
    { id: '2', text: 'Run unit test suite for typed IPC & contracts', completed: true, priority: 'high' },
    { id: '3', text: 'Review STRIDE threat model & permission allowlists', completed: true, priority: 'medium' },
    { id: '4', text: 'Verify SQL Server MyOS v6 schema migration script', completed: false, priority: 'medium' },
    { id: '5', text: 'Audit performance budget (cold startup < 2.5s)', completed: false, priority: 'low' },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const appProfiles: AppProfile[] = [
    {
      id: 'fullstack',
      name: 'Full-Stack Development',
      description: 'Terminal Center, API Tester, JSON Formatter, and File Explorer',
      apps: ['terminal', 'api-tester', 'json-viewer', 'file-explorer'],
    },
    {
      id: 'productivity',
      name: 'Productivity & Planning',
      description: 'Notes Markdown Editor, Calculator, and Task Manager',
      apps: ['notes', 'calculator', 'task-manager'],
    },
    {
      id: 'system',
      name: 'System Diagnostics & Telemetry',
      description: 'System Information, Task Manager, and Settings Center',
      apps: ['system-info', 'task-manager', 'settings'],
    },
  ];

  const handleLaunchProfile = (profile: AppProfile) => {
    profile.apps.forEach((appId, index) => {
      setTimeout(() => {
        openApp(appId);
      }, index * 120);
    });
  };

  const handleTestDbConnection = () => {
    setDbStatus('testing');
    setDbMessage('Connecting to Microsoft SQL Server...');
    setTimeout(() => {
      if (dbHost && dbName) {
        setDbStatus('connected');
        setDbMessage(`Target [${dbName}] on ${dbHost}:${dbPort} configured. Ready for user-authorized migration.`);
      } else {
        setDbStatus('error');
        setDbMessage('Missing database host or database name.');
      }
    }, 600);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: DevTask = {
      id: String(Date.now()),
      text: newTaskText.trim(),
      completed: false,
      priority: 'medium',
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const currentWorkspace = workspaces.find((w: Workspace) => w.id === activeWorkspaceId);

  return (
    <div className="flex h-full w-full bg-[var(--bg-surface)] text-[var(--text-primary)] select-none text-xs">
      {/* Sidebar navigation */}
      <div className="w-48 border-r border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] p-2 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="px-2 py-1.5 font-semibold text-[var(--text-secondary)] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            Dev Workspace
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'overview'
                ? 'bg-[var(--bg-active)] font-medium text-[var(--color-accent)]'
                : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Environment & Git
          </button>

          <button
            onClick={() => setActiveTab('profiles')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'profiles'
                ? 'bg-[var(--bg-active)] font-medium text-[var(--color-accent)]'
                : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            Launch Profiles
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'database'
                ? 'bg-[var(--bg-active)] font-medium text-[var(--color-accent)]'
                : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Database Settings
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'tasks'
                ? 'bg-[var(--bg-active)] font-medium text-[var(--color-accent)]'
                : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            Sprint Task List
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'logs'
                ? 'bg-[var(--bg-active)] font-medium text-[var(--color-accent)]'
                : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Application Logs
          </button>
        </div>

        {/* Quick Launchers */}
        <div className="border-t border-[var(--border-subtle)] pt-2 space-y-1">
          <button
            onClick={() => openApp('terminal')}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Open Terminal
            </span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </button>
          <button
            onClick={() => openApp('api-tester')}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
          >
            <span className="flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> REST Client
            </span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--color-accent)]" />
                Active Development Workspace
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Assigned to Workspace: <span className="font-semibold text-[var(--text-primary)]">{currentWorkspace?.name || 'General'}</span>
              </p>
            </div>

            {/* Environment Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[var(--border-subtle)] rounded-lg p-3 bg-[var(--bg-surface-elevated)] space-y-2">
                <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
                  <GitBranch className="w-4 h-4 text-emerald-500" />
                  Repository & Git Status
                </div>
                <div className="text-[11px] space-y-1 text-[var(--text-secondary)]">
                  <div>Current Branch: <span className="font-mono text-[var(--text-primary)]">main</span></div>
                  <div>Upstream: <span className="font-mono text-[var(--text-primary)]">origin/main</span></div>
                  <div>Working Tree: <span className="text-emerald-500 font-semibold">Clean (Verified)</span></div>
                  <div>Signed Commits Policy: <span className="text-[var(--text-primary)]">Configured</span></div>
                </div>
              </div>

              <div className="border border-[var(--border-subtle)] rounded-lg p-3 bg-[var(--bg-surface-elevated)] space-y-2">
                <div className="flex items-center gap-2 font-medium text-[var(--text-primary)]">
                  <Folder className="w-4 h-4 text-blue-500" />
                  Runtime Services & Endpoints
                </div>
                <div className="text-[11px] space-y-1 text-[var(--text-secondary)]">
                  <div>Vite UI Server: <span className="font-mono text-emerald-500">http://localhost:3000</span></div>
                  <div>REST API Server: <span className="font-mono text-emerald-500">http://localhost:5000/api/v1</span></div>
                  <div>Database Target: <span className="font-mono text-[var(--text-primary)]">MyOS (SQL Server)</span></div>
                  <div>Local Cache: <span className="text-emerald-500">Offline SQLite & LocalStorage</span></div>
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="border border-[var(--border-subtle)] rounded-lg p-3 bg-[var(--bg-surface-elevated)]">
              <h3 className="text-xs font-medium mb-2">Development Shortcuts</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openApp('file-explorer')}
                  className="px-3 py-1.5 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-hover)] flex items-center gap-1.5"
                >
                  <Folder className="w-3.5 h-3.5 text-amber-500" /> Open File Explorer
                </button>
                <button
                  onClick={() => openApp('terminal')}
                  className="px-3 py-1.5 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-hover)] flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" /> Open Terminal
                </button>
                <button
                  onClick={() => openApp('json-viewer')}
                  className="px-3 py-1.5 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-hover)] flex items-center gap-1.5"
                >
                  <Code className="w-3.5 h-3.5 text-purple-500" /> JSON Formatter
                </button>
                <button
                  onClick={() => openApp('api-tester')}
                  className="px-3 py-1.5 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-hover)] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-blue-500" /> API Tester
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Launch Profiles */}
        {activeTab === 'profiles' && (
          <div className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold">Workspace Launch Profiles</h2>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Launch synchronized suites of developer tools in 1-click.
              </p>
            </div>

            <div className="space-y-2">
              {appProfiles.map((prof) => (
                <div
                  key={prof.id}
                  className="border border-[var(--border-subtle)] rounded-lg p-3 bg-[var(--bg-surface-elevated)] flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium text-[var(--text-primary)]">{prof.name}</h3>
                    <p className="text-[11px] text-[var(--text-secondary)]">{prof.description}</p>
                    <div className="flex gap-1.5 mt-2">
                      {prof.apps.map((appId) => (
                        <span key={appId} className="px-2 py-0.5 rounded bg-[var(--bg-hover)] text-[10px] text-[var(--text-secondary)]">
                          {appId}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleLaunchProfile(prof)}
                    className="px-3 py-1.5 bg-[var(--color-accent)] hover:opacity-90 text-white rounded font-medium flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> Launch Profile
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Database Settings */}
        {activeTab === 'database' && (
          <div className="space-y-4 max-w-lg">
            <div>
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Database className="w-4 h-4 text-[var(--color-accent)]" />
                Microsoft SQL Server Configuration
              </h2>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Configure database target parameters for enterprise schema synchronization.
              </p>
            </div>

            <div className="space-y-3 border border-[var(--border-subtle)] rounded-lg p-3 bg-[var(--bg-surface-elevated)]">
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Server Host / Instance</label>
                <input
                  type="text"
                  value={dbHost}
                  onChange={(e) => setDbHost(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Database Name</label>
                <input
                  type="text"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] mb-1">Port</label>
                <input
                  type="text"
                  value={dbPort}
                  onChange={(e) => setDbPort(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] font-mono"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleTestDbConnection}
                  disabled={dbStatus === 'testing'}
                  className="px-3 py-1.5 bg-[var(--color-accent)] text-white rounded font-medium flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dbStatus === 'testing' ? 'animate-spin' : ''}`} />
                  Test Connection
                </button>
                {dbStatus === 'connected' && (
                  <span className="text-emerald-500 font-medium">Connection Verified</span>
                )}
                {dbStatus === 'error' && (
                  <span className="text-red-500 font-medium">Connection Failed</span>
                )}
              </div>

              {dbMessage && (
                <div className={`p-2 rounded text-[11px] ${dbStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                  {dbMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Sprint Task List</h2>
                <p className="text-[11px] text-[var(--text-secondary)]">Track development deliverables and quality gates.</p>
              </div>
              <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                {tasks.filter((t) => t.completed).length} / {tasks.length} Completed
              </span>
            </div>

            <form onSubmit={addTask} className="flex gap-2">
              <input
                type="text"
                placeholder="Add new engineering task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                className="flex-1 px-2.5 py-1.5 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[var(--color-accent)] text-white rounded font-medium flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </form>

            <div className="space-y-1.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 rounded border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-hover)]"
                >
                  <div
                    onClick={() => toggleTask(task.id)}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-[var(--text-secondary)] shrink-0" />
                    )}
                    <span className={`${task.completed ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                      {task.text}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                        task.priority === 'high'
                          ? 'bg-red-500/10 text-red-500'
                          : task.priority === 'medium'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-[var(--text-secondary)] hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Logs */}
        {activeTab === 'logs' && (
          <div className="space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold font-sans">Application Diagnostics Log</h2>
              <span className="text-[10px] text-[var(--text-secondary)]">Live Diagnostic Stream</span>
            </div>
            <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-desktop)] text-[var(--text-primary)] space-y-1 h-64 overflow-y-auto">
              <div className="text-emerald-400">[INFO] [ADW6] Workspace Environment Initialized successfully.</div>
              <div className="text-blue-400">[INFO] [HTTP] Vite development server listening on port 3000.</div>
              <div className="text-blue-400">[INFO] [HTTP] Backend REST API service listening on port 5000.</div>
              <div className="text-amber-400">[WARN] [SQL] Database MyOS migrations awaiting user execution authorization.</div>
              <div className="text-emerald-400">[INFO] [IPC] Typed IPC boundaries initialized with 12 allowlisted channels.</div>
              <div className="text-emerald-400">[INFO] [AUDIO] Procedural Web Audio API sound synthesizer ready.</div>
              <div className="text-slate-400">[DEBUG] [STATE] Desktop store hydrated from local persistence cache.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperWorkspaceApp;
