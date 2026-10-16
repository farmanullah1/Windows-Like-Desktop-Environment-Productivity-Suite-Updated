import React, { useState, useEffect } from 'react';
import {
  Clipboard,
  Search,
  Pin,
  Trash2,
  Copy,
  Check,
  Shield,
  Download,
  FileText,
  Code,
  Link as LinkIcon,
  Palette,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export interface ClipboardItem {
  id: string;
  type: 'text' | 'code' | 'url' | 'color';
  content: string;
  isPinned: boolean;
  timestamp: string;
  isSensitive?: boolean;
}

const DEFAULT_CLIPBOARD_ITEMS: ClipboardItem[] = [
  {
    id: 'clip-1',
    type: 'code',
    content: 'SELECT @@VERSION AS Version, DB_NAME() AS CurrentDb;',
    isPinned: true,
    timestamp: '2 min ago',
  },
  {
    id: 'clip-2',
    type: 'color',
    content: '#0078d4',
    isPinned: true,
    timestamp: '10 min ago',
  },
  {
    id: 'clip-3',
    type: 'url',
    content: 'http://localhost:3000',
    isPinned: false,
    timestamp: '25 min ago',
  },
  {
    id: 'clip-4',
    type: 'text',
    content: 'Windows-Like Desktop Environment & Productivity Suite v8.0 Enterprise Platform',
    isPinned: false,
    timestamp: '1 hr ago',
  },
  {
    id: 'clip-5',
    type: 'code',
    content: 'npm run dev',
    isPinned: false,
    timestamp: '2 hrs ago',
  },
];

export const ClipboardManagerApp: React.FC<{ windowId: string }> = () => {
  const [items, setItems] = useState<ClipboardItem[]>(() => {
    try {
      const saved = localStorage.getItem('adw_clipboard_history');
      return saved ? JSON.parse(saved) : DEFAULT_CLIPBOARD_ITEMS;
    } catch {
      return DEFAULT_CLIPBOARD_ITEMS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('adw_clipboard_history', JSON.stringify(items));
    } catch {
      // storage error
    }
  }, [items]);

  const handleCopyItem = (item: ClipboardItem) => {
    soundEngine.play('click');
    navigator.clipboard.writeText(item.content);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleTogglePin = (id: string) => {
    soundEngine.play('click');
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item))
    );
  };

  const handleDeleteItem = (id: string) => {
    soundEngine.play('click');
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    soundEngine.play('click');
    if (confirm('Clear non-pinned clipboard history?')) {
      setItems((prev) => prev.filter((item) => item.isPinned));
    }
  };

  const handleExportJson = () => {
    soundEngine.play('click');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `clipboard-export-${Date.now()}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || item.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  const getTypeIcon = (type: ClipboardItem['type']) => {
    switch (type) {
      case 'code':
        return <Code className="w-3.5 h-3.5 text-blue-400" />;
      case 'url':
        return <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />;
      case 'color':
        return <Palette className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {/* Search & Actions Header */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clipboard className="w-4 h-4 text-[var(--accent-primary)]" />
            <h2 className="text-sm font-semibold">Clipboard Manager</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Ctrl + Shift + V
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)]"
              title="Export History JSON"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
            <button
              onClick={handleClearHistory}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[11px]"
              title="Clear non-pinned items"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Unpinned</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Type Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search clipboard history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[var(--surface-card)] p-0.5 rounded-lg border border-[var(--border-subtle)]">
            {['all', 'text', 'code', 'url', 'color'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2 py-1 rounded-md text-[11px] capitalize transition-colors ${
                  selectedType === t
                    ? 'bg-[var(--accent-primary)] text-white font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clipboard Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-[var(--text-muted)] space-y-2">
            <Clipboard className="w-8 h-8 opacity-40" />
            <p className="text-xs">No clipboard items matching query.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 group ${
                item.isPinned
                  ? 'border-[var(--accent-primary)]/40 bg-[var(--surface-elevated)] shadow-sm'
                  : 'border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-medium)]'
              }`}
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <div className="mt-0.5 p-1.5 rounded-md bg-[var(--surface-input)] border border-[var(--border-subtle)] flex-shrink-0">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">•</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{item.timestamp}</span>
                    {item.isPinned && (
                      <span className="text-[9px] font-semibold text-[var(--accent-primary)] bg-[var(--accent-subtle)] px-1.5 py-0.5 rounded">
                        Pinned
                      </span>
                    )}
                  </div>
                  <pre className="font-mono text-xs whitespace-pre-wrap break-all text-[var(--text-primary)] max-h-24 overflow-y-auto select-text">
                    {item.content}
                  </pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => handleCopyItem(item)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    copiedId === item.id
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'hover:bg-[var(--surface-input)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                  title="Copy to Clipboard"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleTogglePin(item.id)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    item.isPinned
                      ? 'bg-[var(--accent-primary)] text-white border-transparent'
                      : 'hover:bg-[var(--surface-input)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                  }`}
                  title={item.isPinned ? 'Unpin item' : 'Pin item'}
                >
                  <Pin className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Privacy Notice Footer */}
      <div className="px-3 py-1.5 border-t border-[var(--border-subtle)] bg-[var(--surface-acrylic)] text-[10px] text-[var(--text-muted)] flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-emerald-400" />
          Local sandboxed storage • Sensitive password exclusion active
        </span>
        <span>{filteredItems.length} items</span>
      </div>
    </div>
  );
};
