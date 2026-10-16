import React, { useState, useRef } from 'react';
import {
  Save,
  Search,
  Copy,
  Check,
  Plus,
  X,
  FileCode,
  WrapText,
} from 'lucide-react';

interface EditorTab {
  id: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
}

export const TextEditorApp: React.FC<{ windowId: string }> = () => {
  const [tabs, setTabs] = useState<EditorTab[]>([
    {
      id: 'tab-1',
      name: 'main.ts',
      content: `// MyOS Desktop Workspace v6.0\nimport { createDesktopStore } from './core/desktopStore';\n\nexport function bootstrap() {\n  console.log("Desktop environment initialized.");\n}\n`,
      language: 'typescript',
      isDirty: false,
    },
    {
      id: 'tab-2',
      name: 'notes.txt',
      content: `Production Engineering Objectives:\n1. Maintain zero fake APIs or placeholder buttons.\n2. Ensure all 23 architecture documents stay synchronized.\n3. Validate every change with TypeScript and automated unit tests.\n`,
      language: 'plaintext',
      isDirty: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');
  const [isWrap, setIsWrap] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const handleContentChange = (newContent: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === activeTabId ? { ...tab, content: newContent, isDirty: true } : tab
      )
    );
  };

  const handleSave = () => {
    setTabs(
      tabs.map((tab) => (tab.id === activeTabId ? { ...tab, isDirty: false } : tab))
    );
    setSaveStatus('Saved');
    setTimeout(() => setSaveStatus(null), 1500);
  };

  const handleNewTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: EditorTab = {
      id: newId,
      name: `untitled-${tabs.length + 1}.txt`,
      content: '',
      language: 'plaintext',
      isDirty: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const remaining = tabs.filter((t) => t.id !== tabId);
    setTabs(remaining);
    if (activeTabId === tabId) {
      setActiveTabId(remaining[0].id);
    }
  };

  const handleCopy = () => {
    if (activeTab) {
      navigator.clipboard.writeText(activeTab.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const lineCount = activeTab ? activeTab.content.split('\n').length : 1;
  const charCount = activeTab ? activeTab.content.length : 0;
  const wordCount = activeTab ? activeTab.content.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-surface)] text-[var(--text-primary)] select-none text-xs">
      {/* Top Menu / Tab Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] px-2">
        {/* Tab List */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded cursor-pointer transition-colors ${
                tab.id === activeTabId
                  ? 'bg-[var(--bg-surface)] text-[var(--color-accent)] font-medium border border-[var(--border-subtle)]'
                  : 'hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
              {tab.isDirty && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
              {tabs.length > 1 && (
                <button
                  onClick={(e) => handleCloseTab(tab.id, e)}
                  className="hover:text-red-500 rounded p-0.5 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}

          <button
            onClick={handleNewTab}
            className="p-1 hover:bg-[var(--bg-hover)] rounded text-[var(--text-secondary)]"
            title="New File"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 py-1">
          <button
            onClick={handleSave}
            className="px-2 py-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] flex items-center gap-1"
            title="Save (Ctrl+S)"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveStatus || 'Save'}</span>
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-1 rounded hover:bg-[var(--bg-hover)] ${showSearch ? 'text-[var(--color-accent)]' : 'text-[var(--text-secondary)]'}`}
            title="Find"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsWrap(!isWrap)}
            className={`p-1 rounded hover:bg-[var(--bg-hover)] ${isWrap ? 'text-[var(--color-accent)]' : 'text-[var(--text-secondary)]'}`}
            title="Toggle Word Wrap"
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
            title="Copy All"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Find/Replace Strip */}
      {showSearch && (
        <div className="flex items-center gap-2 p-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
          <Search className="w-3.5 h-3.5 text-[var(--text-secondary)] ml-1" />
          <input
            type="text"
            placeholder="Find in document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-0.5 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] text-xs flex-1 max-w-xs"
          />
          {searchQuery && (
            <span className="text-[10px] text-[var(--text-secondary)]">
              Matches: {activeTab.content.split(searchQuery).length - 1}
            </span>
          )}
          <button
            onClick={() => setShowSearch(false)}
            className="p-1 hover:bg-[var(--bg-hover)] rounded text-[var(--text-secondary)] ml-auto"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Editor Body with Line Numbers */}
      <div className="flex-1 flex overflow-hidden font-mono text-xs">
        {/* Line Numbers */}
        <div className="w-12 py-2 pr-2 select-none text-right text-[var(--text-secondary)] border-r border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] opacity-60 overflow-hidden">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-5 h-5 text-[11px]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={activeTab?.content || ''}
          onChange={(e) => handleContentChange(e.target.value)}
          spellCheck={false}
          className={`flex-1 p-2 bg-transparent text-[var(--text-primary)] focus:outline-none resize-none leading-5 font-mono text-xs ${
            isWrap ? 'whitespace-pre-wrap' : 'whitespace-pre overflow-x-auto'
          }`}
        />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] text-[10px] text-[var(--text-secondary)]">
        <div className="flex items-center gap-3">
          <span>Lines: {lineCount}</span>
          <span>Words: {wordCount}</span>
          <span>Characters: {charCount}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>Encoding: UTF-8</span>
          <span>Format: LF</span>
          <span className="capitalize">{activeTab?.language || 'Plain Text'}</span>
        </div>
      </div>
    </div>
  );
};

export default TextEditorApp;
