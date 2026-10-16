import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Pin,
  Search,
  FileText,
  Download,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

interface NoteItem {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  colorHex?: string;
  tags: string[];
  updatedAt: string;
}

const DEFAULT_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Architecture Overview',
    content: `# ADW-5 Desktop Architecture\n\nA production-grade desktop workspace combining Windows 11, macOS, and Ubuntu paradigms.\n\n- Windows 11: Taskbar, Start Menu, System Tray, Snap Layouts\n- macOS: Dock mode, subtle typography, smooth springs\n- Ubuntu: Virtual workspaces, universal command palette, terminal`,
    isPinned: true,
    colorHex: '#3b82f6',
    tags: ['Architecture', 'Engineering'],
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'note-2',
    title: 'Sprint Checklist',
    content: `## Priority Milestones\n\n1. [x] Phase 0 Discovery\n2. [x] Phase 1 Documentation\n3. [x] Phase 2 Design System & Sound Engine\n4. [x] Phase 3 Desktop Shell & Window Manager\n5. [ ] Connect SQL Server migrations`,
    isPinned: false,
    colorHex: '#10b981',
    tags: ['Tasks', 'Sprint'],
    updatedAt: new Date().toLocaleDateString(),
  },
];

export const NotesApp: React.FC<{ windowId: string }> = () => {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    try {
      const saved = localStorage.getItem('adw_notes');
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('adw_notes', JSON.stringify(notes));
    } catch {
      // storage handling
    }
  }, [notes]);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const handleCreateNote = () => {
    soundEngine.play('click');
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      content: '',
      isPinned: false,
      colorHex: '#3b82f6',
      tags: ['General'],
      updatedAt: new Date().toLocaleDateString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateActiveNote = (updates: Partial<NoteItem>) => {
    if (!activeNoteId) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId
          ? { ...n, ...updates, updatedAt: new Date().toLocaleDateString() }
          : n
      )
    );
  };

  const handleDeleteNote = (id: string) => {
    soundEngine.play('click');
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNoteId === id) {
      const remaining = notes.filter((n) => n.id !== id);
      setActiveNoteId(remaining[0]?.id || null);
    }
  };

  const handleExportNote = () => {
    if (!activeNote) return;
    soundEngine.play('click');
    const blob = new Blob([activeNote.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtered notes
  const filteredNotes = notes
    .filter((n) => {
      const matchesSearch =
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || n.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0));

  // Word & Char counts
  const wordCount = activeNote?.content.trim() ? activeNote.content.trim().split(/\s+/).length : 0;
  const charCount = activeNote?.content.length || 0;

  return (
    <div className="flex h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* Sidebar List */}
      <div className="w-64 border-r border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex flex-col">
        {/* Search & New Header */}
        <div className="p-3 border-b border-[var(--border-subtle)] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              All Notes ({notes.length})
            </h2>
            <button
              onClick={handleCreateNote}
              className="p-1 rounded-lg bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white transition-colors"
              title="New Note"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)]"
            />
          </div>
        </div>

        {/* Notes Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-subtle)]">
          {filteredNotes.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--text-muted)]">
              No notes found.
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => { setActiveNoteId(note.id); soundEngine.play('click'); }}
                className={`p-3 cursor-pointer transition-all ${
                  activeNoteId === note.id
                    ? 'bg-[var(--accent-subtle)] border-l-2 border-[var(--accent-primary)]'
                    : 'hover:bg-[var(--surface-card)]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs font-semibold truncate flex-1">
                    {note.title || 'Untitled Note'}
                  </h3>
                  {note.isPinned && <Pin className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                  {note.content || 'Empty note...'}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-2">
                  <span>{note.updatedAt}</span>
                  <div className="flex items-center gap-1">
                    {note.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(selectedTag === t ? null : t);
                        }}
                        className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                          selectedTag === t ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--surface-input)] hover:text-white'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Note Editor Area */}
      {activeNote ? (
        <div className="flex-1 flex flex-col bg-[var(--surface-base)]">
          {/* Note Toolbar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateActiveNote({ isPinned: !activeNote.isPinned })}
                className={`p-1.5 rounded-lg border transition-colors ${
                  activeNote.isPinned
                    ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
                    : 'border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-[var(--border-medium)]'
                }`}
                title="Pin Note"
              >
                <Pin className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleExportNote}
                className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:bg-[var(--border-medium)] transition-colors"
                title="Export Markdown"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
              <button
                onClick={() => handleDeleteNote(activeNote.id)}
                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors ml-2"
                title="Delete Note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title input */}
          <div className="px-6 pt-4 pb-2">
            <input
              type="text"
              value={activeNote.title}
              onChange={(e) => handleUpdateActiveNote({ title: e.target.value })}
              placeholder="Note Title..."
              className="w-full text-lg font-bold bg-transparent border-none text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            />
          </div>

          {/* Markdown Content textarea */}
          <div className="flex-1 px-6 pb-6">
            <textarea
              value={activeNote.content}
              onChange={(e) => handleUpdateActiveNote({ content: e.target.value })}
              placeholder="Start typing your note here (Markdown supported)..."
              className="w-full h-full bg-transparent border-none resize-none font-mono text-xs leading-relaxed text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] gap-2">
          <FileText className="w-12 h-12 opacity-30 stroke-[1.2]" />
          <p className="text-sm font-medium">No note selected</p>
          <button
            onClick={handleCreateNote}
            className="px-3 py-1.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-xs font-medium rounded-xl transition-colors"
          >
            Create New Note
          </button>
        </div>
      )}
    </div>
  );
};
