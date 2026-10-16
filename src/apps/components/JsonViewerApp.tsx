import React, { useState } from 'react';
import { AlertCircle, Copy, Check, Minimize2, Maximize2 } from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

const SAMPLE_JSON = `{
  "platform": "ADW-5 Desktop Workspace",
  "version": "5.0.0",
  "spec": {
    "hybridRatio": {
      "windows": 0.4,
      "macos": 0.3,
      "ubuntu": 0.3
    },
    "features": [
      "Taskbar / Dock Hybrid",
      "Virtual Desktop Workspaces",
      "Web Audio Synthesis Sound Engine",
      "Controlled Native System Bridge"
    ],
    "isActive": true,
    "securityTier": "Production Strict"
  }
}`;

export const JsonViewerApp: React.FC<{ windowId: string }> = () => {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleBeautify = () => {
    soundEngine.play('click');
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj, null, 2));
      setErrorMsg(null);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  const handleMinify = () => {
    soundEngine.play('click');
    try {
      const obj = JSON.parse(jsonText);
      setJsonText(JSON.stringify(obj));
      setErrorMsg(null);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : String(err));
    }
  };

  const handleCopy = () => {
    soundEngine.play('click');
    navigator.clipboard.writeText(jsonText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2.5 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)]">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBeautify}
            className="flex items-center gap-1 px-3 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-medium)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Format / Beautify</span>
          </button>
          <button
            onClick={handleMinify}
            className="flex items-center gap-1 px-3 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-medium)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Minify</span>
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-medium)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium transition-colors text-[var(--text-secondary)] hover:text-white"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{isCopied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-mono">{errorMsg}</span>
        </div>
      )}

      {/* Editor area */}
      <div className="flex-1 p-3">
        <textarea
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
            try {
              JSON.parse(e.target.value);
              setErrorMsg(null);
            } catch (err: unknown) {
              setErrorMsg(err instanceof Error ? err.message : String(err));
            }
          }}
          className="w-full h-full p-3 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-primary)] resize-none focus:outline-none focus:border-[var(--border-focus)] select-text"
          placeholder="Paste or type JSON here..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};
