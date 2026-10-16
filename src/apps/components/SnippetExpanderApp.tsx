import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  Trash2,
  Copy,
  Check,
  Play,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export interface Snippet {
  id: string;
  trigger: string;
  label: string;
  body: string;
  category: string;
}

const DEFAULT_SNIPPETS: Snippet[] = [
  {
    id: 'snip-1',
    trigger: ';date',
    label: 'Current ISO Date',
    body: '{date}',
    category: 'General',
  },
  {
    id: 'snip-2',
    trigger: ';time',
    label: 'Current Timestamp',
    body: '{time}',
    category: 'General',
  },
  {
    id: 'snip-3',
    trigger: ';uuid',
    label: 'Generate UUID v4',
    body: '{uuid}',
    category: 'Developer',
  },
  {
    id: 'snip-4',
    trigger: ';sig',
    label: 'Email Signature',
    body: 'Best regards,\nEngineering Team\nMyOS Desktop',
    category: 'Email',
  },
  {
    id: 'snip-5',
    trigger: ';shrug',
    label: 'Shrug Emoticon',
    body: '¯\\_(ツ)_/¯',
    category: 'Text',
  },
  {
    id: 'snip-6',
    trigger: ';lorem',
    label: 'Lorem Ipsum Paragraph',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Developer',
  },
];

export const SnippetExpanderApp: React.FC<{ windowId: string }> = () => {
  const [snippets, setSnippets] = useState<Snippet[]>(() => {
    try {
      const saved = localStorage.getItem('adw_snippets');
      return saved ? JSON.parse(saved) : DEFAULT_SNIPPETS;
    } catch {
      return DEFAULT_SNIPPETS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(snippets[0]?.id || '');
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // New Snippet Modal/Fields
  const [newTrigger, setNewTrigger] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('adw_snippets', JSON.stringify(snippets));
    } catch {
      // storage error
    }
  }, [snippets]);

  // Expansion Resolver
  const resolveVariables = (text: string): string => {
    const d = new Date();
    return text
      .replace(/{date}/g, d.toISOString().split('T')[0])
      .replace(/{time}/g, d.toLocaleTimeString())
      .replace(/{uuid}/g, crypto.randomUUID ? crypto.randomUUID() : 'b82a-431f-829d')
      .replace(/{clipboard}/g, 'Active Clipboard Content');
  };

  const handleTestExpand = () => {
    soundEngine.play('click');
    let output = testInput;
    snippets.forEach((snip) => {
      if (output.includes(snip.trigger)) {
        output = output.replaceAll(snip.trigger, resolveVariables(snip.body));
      }
    });
    setTestOutput(output);
  };

  const handleCreateSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrigger.trim() || !newBody.trim()) return;
    soundEngine.play('success');

    const created: Snippet = {
      id: `snip-${Date.now()}`,
      trigger: newTrigger.startsWith(';') ? newTrigger.trim() : `;${newTrigger.trim()}`,
      label: newLabel.trim() || newTrigger.trim(),
      body: newBody,
      category: newCategory,
    };

    setSnippets((prev) => [...prev, created]);
    setSelectedSnippetId(created.id);
    setNewTrigger('');
    setNewLabel('');
    setNewBody('');
    setIsCreating(false);
  };

  const handleDeleteSnippet = (id: string) => {
    soundEngine.play('click');
    setSnippets((prev) => prev.filter((s) => s.id !== id));
    if (selectedSnippetId === id) {
      setSelectedSnippetId(snippets[0]?.id || '');
    }
  };

  const selectedSnippet = snippets.find((s) => s.id === selectedSnippetId);

  const filteredSnippets = snippets.filter(
    (s) =>
      s.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {/* Left Sidebar: Snippet List */}
      <div className="w-64 border-r border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex flex-col">
        {/* Search & Add Header */}
        <div className="p-3 border-b border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-xs">
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Snippet Expander</span>
            </div>
            <button
              onClick={() => {
                soundEngine.play('click');
                setIsCreating(!isCreating);
              }}
              className="p-1 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-colors"
              title="Add Snippet"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-3 h-3 absolute left-2 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search triggers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2 py-1 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
            />
          </div>
        </div>

        {/* Snippets List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredSnippets.map((snip) => (
            <div
              key={snip.id}
              onClick={() => {
                soundEngine.play('click');
                setSelectedSnippetId(snip.id);
                setIsCreating(false);
              }}
              className={`p-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                selectedSnippetId === snip.id && !isCreating
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-medium border border-[var(--accent-primary)]/30'
                  : 'hover:bg-[var(--surface-card)] text-[var(--text-secondary)]'
              }`}
            >
              <div className="truncate">
                <span className="font-mono font-bold text-xs">{snip.trigger}</span>
                <p className="text-[10px] text-[var(--text-muted)] truncate">{snip.label}</p>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-input)] text-[var(--text-muted)]">
                {snip.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-6">
        {isCreating ? (
          /* Create New Snippet Form */
          <form onSubmit={handleCreateSnippet} className="space-y-4 max-w-xl">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Plus className="w-4 h-4 text-[var(--accent-primary)]" />
              <span>Create New Text Snippet</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[var(--text-muted)] block mb-1">Trigger (Prefix with ;)</label>
                <input
                  type="text"
                  placeholder=";mytag"
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] font-mono text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                  required
                />
              </div>
              <div>
                <label className="text-[11px] text-[var(--text-muted)] block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                >
                  <option value="General">General</option>
                  <option value="Developer">Developer</option>
                  <option value="Email">Email</option>
                  <option value="Text">Text</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[var(--text-muted)] block mb-1">Friendly Label</label>
              <input
                type="text"
                placeholder="My Custom Snippet"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none focus:border-[var(--accent-primary)]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-[var(--text-muted)]">Expansion Body</label>
                <span className="text-[10px] text-[var(--accent-primary)] font-mono">
                  Supported: {'{date}'}, {'{time}'}, {'{uuid}'}
                </span>
              </div>
              <textarea
                rows={5}
                placeholder="Content to expand into..."
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] font-mono text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-semibold transition-colors"
              >
                Save Snippet
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : selectedSnippet ? (
          /* Selected Snippet Details */
          <div className="space-y-6 max-w-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold font-mono text-[var(--accent-primary)]">
                    {selectedSnippet.trigger}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--surface-input)] font-mono text-[var(--text-muted)]">
                    {selectedSnippet.category}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{selectedSnippet.label}</p>
              </div>
              <button
                onClick={() => handleDeleteSnippet(selectedSnippet.id)}
                className="p-2 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400 transition-colors"
                title="Delete Snippet"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Template Body Card */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Template Body
              </span>
              <pre className="font-mono text-xs p-3 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] whitespace-pre-wrap break-all select-text">
                {selectedSnippet.body}
              </pre>
            </div>

            {/* Resolved Preview Card */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Live Resolved Output
                </span>
                <button
                  onClick={() => {
                    soundEngine.play('click');
                    navigator.clipboard.writeText(resolveVariables(selectedSnippet.body));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  className="flex items-center gap-1 text-[11px] text-[var(--accent-primary)] hover:underline"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy Output'}</span>
                </button>
              </div>
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 font-mono text-xs text-emerald-300 whitespace-pre-wrap select-text">
                {resolveVariables(selectedSnippet.body)}
              </div>
            </div>

            {/* Live Interactive Sandbox Tester */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold text-xs">Expansion Test Sandbox</span>
                </div>
                <button
                  onClick={handleTestExpand}
                  className="px-2.5 py-1 rounded-lg bg-[var(--accent-primary)] text-white text-[11px] font-medium"
                >
                  Expand Triggers
                </button>
              </div>

              <input
                type="text"
                placeholder={`Type text containing triggers (e.g. "Hello ${selectedSnippet.trigger}!")`}
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
              />

              {testOutput && (
                <div className="p-2.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] font-mono text-xs text-blue-300">
                  {testOutput}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
