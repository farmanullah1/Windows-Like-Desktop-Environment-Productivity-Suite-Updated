import React, { useState, useRef, useEffect } from 'react';
import { useDesktop } from '../../core/desktopStore';
import { useTheme, ThemeType } from '../../design-system/ThemeProvider';
import { soundEngine } from '../../design-system/soundEngine';

interface CommandOutput {
  id: string;
  type: 'command' | 'output' | 'error' | 'info';
  text: string;
}

export const TerminalApp: React.FC<{ windowId: string }> = () => {
  const [shellTab, setShellTab] = useState<'pwsh' | 'bash' | 'cmd'>('pwsh');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const { windows, metrics, workspaces, activeWorkspaceId } = useDesktop();
  const { theme, setTheme } = useTheme();

  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      type: 'info',
      text: 'ADW-5 Terminal Center [Version 5.0.0.1]',
    },
    {
      id: 'init-2',
      type: 'info',
      text: 'Hybrid Windows 11 + macOS + Ubuntu Desktop Environment. Type "help" for available commands.',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputs]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      if (!cmd) return;

      soundEngine.play('click');
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);

      const promptLabel =
        shellTab === 'pwsh'
          ? 'PS C:\\ADW5\\Workspace>'
          : shellTab === 'bash'
          ? 'adw@desktop:~$ '
          : 'C:\\Users\\Desktop>';

      const newOutputs: CommandOutput[] = [
        ...outputs,
        { id: `cmd-${Date.now()}`, type: 'command', text: `${promptLabel} ${cmd}` },
      ];

      setInputVal('');
      executeCommand(cmd, newOutputs);
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInputVal('');
        } else {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        }
      }
    }
  };

  const executeCommand = async (cmd: string, baseOutputs: CommandOutput[]) => {
    const parts = cmd.split(' ');
    const primary = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let resultText = '';
    let resultType: CommandOutput['type'] = 'output';

    switch (primary) {
      case 'help':
        resultText = `Available Built-in Commands:
  help              Display this command list
  clear             Clear terminal screen
  sysinfo           Display system metrics and hardware stats
  ps                List running application windows
  workspaces        List virtual workspaces
  theme [name]      Switch theme (dark, light, midnight, graphite, aurora, ocean, ubuntu-dark, high-contrast)
  whoami            Print current session user
  date              Show current system timestamp
  pwd               Print working directory
  echo [text]       Print arguments to screen
  calc [math]       Calculate mathematical expression
  curl [url]        Fetch text content from a web URL`;
        break;

      case 'clear':
      case 'cls':
        setOutputs([]);
        return;

      case 'sysinfo':
        resultText = `OS: ADW-5 Windows Desktop Suite v5.0
CPU Utilization: ${metrics.cpuUsage}%
Memory: ${metrics.memoryUsedMb} MB / ${metrics.memoryTotalMb} MB
Battery: ${metrics.batteryLevel}% (${metrics.isCharging ? 'Charging' : 'Discharging'})
Network Status: ${metrics.isOnline ? 'Online (Connected)' : 'Offline'}
Active Workspace: ${workspaces.find((w) => w.id === activeWorkspaceId)?.name} (ID: ${activeWorkspaceId})
Running Processes: ${metrics.activeProcessesCount}`;
        break;

      case 'ps':
        if (windows.length === 0) {
          resultText = 'No open application windows.';
        } else {
          resultText = `PID\tAPP ID\tTITLE\t\t\tSTATUS\n` +
            windows
              .map((w, idx) => `${idx + 100}\t${w.appId}\t${w.title.slice(0, 16).padEnd(16)}\t${w.isMinimized ? 'Minimized' : 'Running'}`)
              .join('\n');
        }
        break;

      case 'workspaces':
        resultText = workspaces
          .map((w) => `${w.id === activeWorkspaceId ? '*' : ' '} [${w.id}] ${w.name}`)
          .join('\n');
        break;

      case 'whoami':
        resultText = 'desktop-user@adw5-workstation';
        break;

      case 'pwd':
        resultText = shellTab === 'bash' ? '/home/desktop/workspace' : 'C:\\ADW5\\Workspace';
        break;

      case 'date':
        resultText = new Date().toString();
        break;

      case 'echo':
        resultText = args || '';
        break;

      case 'theme':
        if (!args) {
          resultText = `Current theme: ${theme}. Options: dark, light, midnight, graphite, aurora, ocean, ubuntu-dark, high-contrast`;
        } else {
          const targetTheme = args.trim().toLowerCase() as ThemeType;
          setTheme(targetTheme);
          resultText = `Switched theme to "${targetTheme}".`;
        }
        break;

      case 'calc':
        try {
          // Safe arithmetic evaluator
          const sanitized = args.replace(/[^0-9+\-*/().]/g, '');
          // eslint-disable-next-line no-eval
          const val = Function(`'use strict'; return (${sanitized})`)();
          resultText = `= ${val}`;
        } catch {
          resultType = 'error';
          resultText = 'Error: Invalid mathematical expression.';
        }
        break;

      case 'curl':
        if (!args.trim()) {
          resultType = 'error';
          resultText = 'Usage: curl <url>';
        } else {
          try {
            const resp = await fetch(args.trim());
            const text = await resp.text();
            resultText = text.slice(0, 1000) + (text.length > 1000 ? '\n...[truncated]' : '');
          } catch (err: unknown) {
            resultType = 'error';
            resultText = `curl error: ${err instanceof Error ? err.message : String(err)}`;
          }
        }
        break;

      default:
        resultType = 'error';
        resultText = `'${primary}' is not recognized as an internal or external command. Type "help" for assistance.`;
    }

    setOutputs([
      ...baseOutputs,
      { id: `out-${Date.now()}`, type: resultType, text: resultText },
    ]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-col h-full bg-[#14171D] text-[#ECEFF4] font-mono text-xs select-text cursor-text"
    >
      {/* Shell tabs header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#2D333F] bg-[#1E222A] select-none">
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); setShellTab('pwsh'); }}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
              shellTab === 'pwsh' ? 'bg-[#E06C38]/20 text-[#E06C38] border border-[#E06C38]/50' : 'text-[#8F96A3] hover:text-[#ECEFF4]'
            }`}
          >
            PowerShell 7
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShellTab('bash'); }}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
              shellTab === 'bash' ? 'bg-[#D9822B]/20 text-[#D9822B] border border-[#D9822B]/50' : 'text-[#8F96A3] hover:text-[#ECEFF4]'
            }`}
          >
            Ubuntu Bash
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setShellTab('cmd'); }}
            className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
              shellTab === 'cmd' ? 'bg-[#2D333F] text-[#ECEFF4] border border-[#3D4554]' : 'text-[#8F96A3] hover:text-[#ECEFF4]'
            }`}
          >
            Command Prompt
          </button>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#8F96A3]">
          <span>UTF-8</span>
          <span>•</span>
          <span>Interactive</span>
        </div>
      </div>

      {/* Output Console */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {outputs.map((out) => (
          <div
            key={out.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              out.type === 'command'
                ? 'text-[#F07D49] font-semibold'
                : out.type === 'error'
                ? 'text-[#E05252]'
                : out.type === 'info'
                ? 'text-[#2D9C5E] font-medium'
                : 'text-[#ECEFF4]'
            }`}
          >
            {out.text}
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-2 text-[#E06C38] font-semibold">
          <span>
            {shellTab === 'pwsh'
              ? 'PS C:\\ADW5\\Workspace>'
              : shellTab === 'bash'
              ? 'adw@desktop:~$ '
              : 'C:\\Users\\Desktop>'}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent border-none text-[#ECEFF4] focus:outline-none caret-[#E06C38]"
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
