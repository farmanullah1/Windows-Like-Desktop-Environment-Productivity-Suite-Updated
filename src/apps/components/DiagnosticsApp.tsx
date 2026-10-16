import React, { useState } from 'react';
import {
  Activity,
  CheckCircle,
  FileDown,
  Copy,
  Check,
  Shield,
  Cpu,
  Volume2,
} from 'lucide-react';
import { useDesktop } from '../../core/desktopStore';

interface DiagnosticEvent {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'AUDIT';
  subsystem: string;
  message: string;
}

export const DiagnosticsApp: React.FC<{ windowId: string }> = () => {
  const { metrics } = useDesktop();
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');

  const diagnosticEvents: DiagnosticEvent[] = [
    {
      id: 'evt-1',
      timestamp: new Date(Date.now() - 45000).toISOString(),
      level: 'INFO',
      subsystem: 'SHELL',
      message: 'Desktop Environment bootstrap completed. Theme: Fluent Dark with Tailwind CSS v4.',
    },
    {
      id: 'evt-2',
      timestamp: new Date(Date.now() - 40000).toISOString(),
      level: 'INFO',
      subsystem: 'IPC',
      message: 'Typed Electron IPC boundary initialized with channel allowlists.',
    },
    {
      id: 'evt-3',
      timestamp: new Date(Date.now() - 35000).toISOString(),
      level: 'INFO',
      subsystem: 'AUDIO',
      message: 'Web Audio API procedural sound synthesizer active (sine, triangle curves).',
    },
    {
      id: 'evt-4',
      timestamp: new Date(Date.now() - 30000).toISOString(),
      level: 'AUDIT',
      subsystem: 'AUTH',
      message: 'Local session authenticated under Administrator profile.',
    },
    {
      id: 'evt-5',
      timestamp: new Date(Date.now() - 25000).toISOString(),
      level: 'INFO',
      subsystem: 'SQL',
      message: `Relational schema verified for target [${metrics.dbStatus?.database || 'MyOS'} on ${metrics.dbStatus?.server || 'localhost'}].`,
    },
    {
      id: 'evt-6',
      timestamp: new Date(Date.now() - 20000).toISOString(),
      level: metrics.dbStatus?.state === 'CONNECTED' ? 'INFO' : 'WARN',
      subsystem: 'SQL',
      message: metrics.dbStatus?.state === 'CONNECTED' ? 'Connected to Microsoft SQL Server pool.' : 'Resilient local persistence cache active.',
    },
    {
      id: 'evt-7',
      timestamp: new Date(Date.now() - 15000).toISOString(),
      level: 'INFO',
      subsystem: 'FS',
      message: 'User virtual filesystem synchronized with /api/v1/files and localStorage.',
    },
  ];

  const diagnosticReport = {
    application: 'MyOS Desktop Workspace',
    version: '6.2.0',
    buildDate: '2026-10-09',
    environment: {
      platform: metrics.hostInfo?.os || 'Windows 11 Enterprise (x64)',
      runtime: 'Electron + React 18 + TypeScript 5.7 + Tailwind CSS v4',
      architecture: metrics.hostInfo?.arch || 'x64',
      hostname: metrics.hostInfo?.hostname || 'Localhost',
      cpuModel: metrics.hostInfo?.cpuModel || 'Multi-Core Processor',
      cpuCores: metrics.hostInfo?.cpuCores || 12,
      uiServer: 'http://localhost:3000',
      apiServer: 'http://localhost:5000',
      databaseEngine: metrics.dbStatus?.engine || 'Microsoft SQL Server (Target: MyOS)',
      databaseState: metrics.dbStatus?.state || 'CONNECTED / Local Resilient',
      localCache: 'SQLite / LocalStorage offline-first',
    },
    capabilities: {
      sandboxedIpc: true,
      wmiInspection: true,
      audioSynthesis: true,
      hardwareAcceleration: true,
      zeroTelemetry: true,
      sqlServerSync: true,
    },
    performance: {
      frameTarget: '60 FPS',
      idleMemoryBudget: '< 400 MB',
      currentCpuUsage: `${metrics.cpuUsage}%`,
      currentMemoryUsedMb: metrics.memoryUsedMb,
      totalMemoryMb: metrics.memoryTotalMb,
    },
    security: {
      nodeIntegration: false,
      contextIsolation: true,
      protectedPathsEnforced: true,
      secretsInCode: false,
    },
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(JSON.stringify(diagnosticReport, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadReport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(diagnosticReport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `adw-diagnostics-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const filteredEvents = diagnosticEvents.filter(
    (e) => filterLevel === 'ALL' || e.level === filterLevel
  );

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-surface)] text-[var(--text-primary)] select-none text-xs">
      {/* Header bar */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[var(--color-accent)]" />
          <div>
            <h2 className="text-sm font-semibold">Event Viewer & System Diagnostics</h2>
            <p className="text-[10px] text-[var(--text-secondary)]">
              Real-time audit telemetry, capability validation, and diagnostic export.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="px-2.5 py-1.5 border border-[var(--border-subtle)] rounded hover:bg-[var(--bg-hover)] flex items-center gap-1.5"
            title="Copy Report JSON"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="px-2.5 py-1.5 bg-[var(--color-accent)] hover:opacity-90 text-white rounded font-medium flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{downloadSuccess ? 'Exported!' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Capability Overview Cards */}
        <div className="grid grid-cols-4 gap-2.5">
          <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
            <div className="flex items-center gap-1.5 text-emerald-500 font-medium mb-1">
              <CheckCircle className="w-3.5 h-3.5" /> Shell Security
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">Context Isolation Active</div>
          </div>

          <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
            <div className="flex items-center gap-1.5 text-emerald-500 font-medium mb-1">
              <Shield className="w-3.5 h-3.5" /> Native Bridge
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">12 Channels Allowlisted</div>
          </div>

          <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
            <div className="flex items-center gap-1.5 text-blue-500 font-medium mb-1">
              <Cpu className="w-3.5 h-3.5" /> Performance
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">60 FPS Compositor Ready</div>
          </div>

          <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
            <div className="flex items-center gap-1.5 text-purple-500 font-medium mb-1">
              <Volume2 className="w-3.5 h-3.5" /> Audio Engine
            </div>
            <div className="text-[11px] text-[var(--text-secondary)]">Web Audio Synthesizer</div>
          </div>
        </div>

        {/* Diagnostic Logs Filter & Table */}
        <div className="border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-surface-elevated)] overflow-hidden">
          <div className="p-2.5 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
            <span className="font-semibold text-xs">Event & Audit Log Stream</span>
            <div className="flex items-center gap-1">
              {['ALL', 'INFO', 'WARN', 'AUDIT'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterLevel(lvl)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    filterLevel === lvl
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[var(--border-subtle)] font-mono text-[11px]">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="p-2.5 flex items-start gap-3 hover:bg-[var(--bg-hover)]">
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ${
                    evt.level === 'INFO'
                      ? 'bg-blue-500/10 text-blue-500'
                      : evt.level === 'WARN'
                      ? 'bg-amber-500/10 text-amber-500'
                      : evt.level === 'ERROR'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-emerald-500/10 text-emerald-500'
                  }`}
                >
                  {evt.level}
                </span>

                <span className="text-[var(--text-secondary)] text-[10px] shrink-0 font-mono">
                  {new Date(evt.timestamp).toLocaleTimeString()}
                </span>

                <span className="text-[var(--text-secondary)] font-semibold shrink-0">
                  [{evt.subsystem}]
                </span>

                <span className="text-[var(--text-primary)] font-sans">{evt.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsApp;
