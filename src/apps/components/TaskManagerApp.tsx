import React, { useState } from 'react';
import {
  Cpu,
  HardDrive,
  XCircle,
} from 'lucide-react';
import { useDesktop } from '../../core/desktopStore';
import { soundEngine } from '../../design-system/soundEngine';

export const TaskManagerApp: React.FC<{ windowId: string }> = () => {
  const [activeTab, setActiveTab] = useState<'processes' | 'performance'>('processes');
  const { windows, closeWindow, metrics, addNotification } = useDesktop();
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);

  const handleEndTask = () => {
    if (!selectedProcessId) return;
    soundEngine.play('click');
    const targetWin = windows.find((w) => w.id === selectedProcessId);
    if (targetWin) {
      closeWindow(selectedProcessId);
      addNotification('Process Terminated', `Ended task "${targetWin.title}"`, 'info', 'Task Manager');
      setSelectedProcessId(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* Header Tabs & Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => { setActiveTab('processes'); soundEngine.play('click'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'processes'
                ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-card)]'
            }`}
          >
            Processes ({windows.length})
          </button>
          <button
            onClick={() => { setActiveTab('performance'); soundEngine.play('click'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'performance'
                ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-card)]'
            }`}
          >
            Performance
          </button>
        </div>

        {activeTab === 'processes' && selectedProcessId && (
          <button
            onClick={handleEndTask}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#E05252]/10 hover:bg-[#E05252]/20 text-[#E05252] border border-[#E05252]/30 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>End Task</span>
          </button>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'processes' ? (
          <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden bg-[var(--surface-card)]">
            <div className="grid grid-cols-12 text-[11px] font-semibold text-[var(--text-muted)] bg-[var(--surface-acrylic)] p-2.5 border-b border-[var(--border-subtle)]">
              <span className="col-span-6">Application Name</span>
              <span className="col-span-2 text-right">Status</span>
              <span className="col-span-2 text-right">CPU</span>
              <span className="col-span-2 text-right">Memory</span>
            </div>

            <div className="divide-y divide-[var(--border-subtle)]">
              {windows.length === 0 ? (
                <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                  No active application windows running.
                </div>
              ) : (
                windows.map((win, idx) => (
                  <div
                    key={win.id}
                    onClick={() => { setSelectedProcessId(win.id); soundEngine.play('click'); }}
                    className={`grid grid-cols-12 items-center p-2.5 text-xs cursor-pointer transition-colors ${
                      selectedProcessId === win.id
                        ? 'bg-[var(--accent-subtle)] text-[#E06C38] font-medium'
                        : 'hover:bg-[var(--surface-elevated)]'
                    }`}
                  >
                    <div className="col-span-6 flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-[#2D9C5E]" />
                      <span className="truncate">{win.title}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">({win.appId})</span>
                    </div>
                    <span className="col-span-2 text-right text-[11px] text-[var(--text-muted)]">
                      {win.isMinimized ? 'Suspended' : 'Running'}
                    </span>
                    <span className="col-span-2 text-right font-mono text-[11px]">
                      {(1.2 + (idx * 0.7)).toFixed(1)}%
                    </span>
                    <span className="col-span-2 text-right font-mono text-[11px]">
                      {(45 + (idx * 18))} MB
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {/* CPU Gauge */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold">Processor (CPU)</span>
                </div>
                <span className="font-mono text-cyan-400 font-bold">{metrics.cpuUsage}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[var(--surface-input)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, metrics.cpuUsage))}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                {metrics.hostInfo?.cpuCores ? `${metrics.hostInfo.cpuCores} Cores` : 'Multi-Core'} • {metrics.hostInfo?.cpuSpeedMhz ? `${metrics.hostInfo.cpuSpeedMhz} MHz` : '3.60 GHz'} • Host: {metrics.hostInfo?.hostname || 'Localhost'}
              </p>
            </div>

            {/* Memory Gauge */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold">System Memory (RAM)</span>
                </div>
                <span className="font-mono text-purple-400 font-bold">
                  {(metrics.memoryUsedMb / 1024).toFixed(1)} GB / {(metrics.memoryTotalMb / 1024).toFixed(0)} GB
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[var(--surface-input)] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.memoryUsedMb / (metrics.memoryTotalMb || 16384)) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">
                Available: {((metrics.memoryTotalMb - metrics.memoryUsedMb) / 1024).toFixed(1)} GB • In Use: {(metrics.memoryUsedMb / 1024).toFixed(1)} GB
              </p>
            </div>

            {/* System Diagnostic Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs">
                <span className="text-[var(--text-muted)]">Uptime</span>
                <p className="font-semibold text-sm font-mono mt-1">
                  {Math.floor(metrics.uptimeSeconds / 3600)}h {Math.floor((metrics.uptimeSeconds % 3600) / 60)}m {metrics.uptimeSeconds % 60}s
                </p>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] text-xs">
                <span className="text-[var(--text-muted)]">Power Source</span>
                <p className="font-semibold text-sm font-mono mt-1">
                  {metrics.hasBattery ? `${metrics.batteryLevel}% (${metrics.isCharging ? 'Plugged In' : 'On Battery'})` : 'Line-Powered (AC)'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Status Bar */}
      <div className="px-3 py-1.5 border-t border-[var(--border-subtle)] bg-[var(--surface-acrylic)] text-[11px] text-[var(--text-muted)] flex justify-between">
        <span>Active windows: {windows.length}</span>
        <span>CPU: {metrics.cpuUsage}%</span>
      </div>
    </div>
  );
};
