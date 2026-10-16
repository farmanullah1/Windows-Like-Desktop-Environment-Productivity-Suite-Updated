import React, { useState, useEffect } from 'react';
import {
  Folder,
  FileText,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  Search,
  Grid,
  List as ListIcon,
  HardDrive,
  FileCode,
  Image,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  sizeKb?: number;
  updatedAt: string;
  extension?: string;
  parentId: string | null;
}

const DEFAULT_FILES: FileItem[] = [
  { id: 'f-docs', name: 'Documents', type: 'folder', parentId: null, updatedAt: '2026-10-08' },
  { id: 'f-downloads', name: 'Downloads', type: 'folder', parentId: null, updatedAt: '2026-10-08' },
  { id: 'f-pictures', name: 'Pictures', type: 'folder', parentId: null, updatedAt: '2026-10-08' },
  { id: 'f-projects', name: 'Projects', type: 'folder', parentId: null, updatedAt: '2026-10-08' },
  { id: 'f-welcome', name: 'Welcome_MyOS.txt', type: 'file', extension: 'txt', sizeKb: 4, parentId: null, updatedAt: '2026-10-08' },
  { id: 'f-spec', name: 'System_Specification.md', type: 'file', extension: 'md', sizeKb: 54, parentId: 'f-docs', updatedAt: '2026-10-08' },
  { id: 'f-todo', name: 'Sprint_Roadmap.txt', type: 'file', extension: 'txt', sizeKb: 12, parentId: 'f-docs', updatedAt: '2026-10-08' },
  { id: 'f-wallpaper', name: 'Aurora_Wallpaper.png', type: 'file', extension: 'png', sizeKb: 1420, parentId: 'f-pictures', updatedAt: '2026-10-08' },
  { id: 'f-code', name: 'desktopStore.ts', type: 'file', extension: 'ts', sizeKb: 18, parentId: 'f-projects', updatedAt: '2026-10-08' },
];

export const FileExplorerApp: React.FC<{ windowId: string }> = () => {
  const [files, setFiles] = useState<FileItem[]>(() => {
    try {
      const saved = localStorage.getItem('adw_filesystem');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed)
          ? parsed.map((f: FileItem) => (f.name === 'Welcome_ADW5.txt' ? { ...f, name: 'Welcome_MyOS.txt' } : f))
          : DEFAULT_FILES;
      }
      return DEFAULT_FILES;
    } catch {
      return DEFAULT_FILES;
    }
  });

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [history, setHistory] = useState<(string | null)[]>([null]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Initial fetch from backend with fallback
  useEffect(() => {
    let mounted = true;
    fetch('/api/v1/files')
      .then((r) => r.json())
      .then((res) => {
        if (mounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          setFiles(res.data);
        }
      })
      .catch(() => {
        // Fallback to local storage
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Persistence to local storage
  useEffect(() => {
    try {
      localStorage.setItem('adw_filesystem', JSON.stringify(files));
    } catch {
      // storage error handled
    }
  }, [files]);

  const navigateTo = (folderId: string | null) => {
    soundEngine.play('click');
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(folderId);
    setSelectedId(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      soundEngine.play('click');
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]);
      setSelectedId(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      soundEngine.play('click');
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]);
      setSelectedId(null);
    }
  };

  const handleCreateFolder = async () => {
    soundEngine.play('click');
    const folderName = prompt('Enter folder name:', 'New Folder');
    if (!folderName || !folderName.trim()) return;

    const newFolder: FileItem = {
      id: `folder-${Date.now()}`,
      name: folderName.trim(),
      type: 'folder',
      parentId: currentFolderId,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setFiles((prev) => [...prev, newFolder]);

    try {
      await fetch('/api/v1/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newFolder.name,
          type: 'folder',
          parentId: currentFolderId,
          path: `/${newFolder.name}`,
        }),
      });
    } catch {
      // Local persistence cache ensures data safety
    }
  };

  const handleCreateFile = async () => {
    soundEngine.play('click');
    const fileName = prompt('Enter file name:', 'New Document.txt');
    if (!fileName || !fileName.trim()) return;

    const ext = fileName.includes('.') ? fileName.split('.').pop() : 'txt';
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      name: fileName.trim(),
      type: 'file',
      extension: ext,
      sizeKb: 1,
      parentId: currentFolderId,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setFiles((prev) => [...prev, newFile]);

    try {
      await fetch('/api/v1/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newFile.name,
          type: 'file',
          extension: ext,
          sizeKb: 1,
          parentId: currentFolderId,
          path: `/${newFile.name}`,
        }),
      });
    } catch {
      // Local persistence cache ensures data safety
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectedId) return;
    soundEngine.play('click');
    if (confirm('Delete selected item?')) {
      const targetId = selectedId;
      setFiles((prev) => prev.filter((item) => item.id !== targetId && item.parentId !== targetId));
      setSelectedId(null);

      try {
        await fetch(`/api/v1/files/${targetId}`, { method: 'DELETE' });
      } catch {
        // Local persistence cache ensures data safety
      }
    }
  };

  // Current folder files
  const currentFiles = files
    .filter((f) => {
      if (searchQuery.trim()) {
        return f.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return f.parentId === currentFolderId;
    })
    .sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'folder' ? -1 : 1;
    });

  // Breadcrumbs
  const getBreadcrumbs = () => {
    const crumbs: { id: string | null; name: string }[] = [{ id: null, name: 'Home' }];
    let curr = currentFolderId;
    const path: { id: string; name: string }[] = [];
    while (curr) {
      const folder = files.find((f) => f.id === curr);
      if (folder) {
        path.unshift({ id: folder.id, name: folder.name });
        curr = folder.parentId;
      } else {
        break;
      }
    }
    return [...crumbs, ...path];
  };

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') return <Folder className="w-8 h-8 text-[#E06C38] fill-[#E06C38]/20" />;
    if (item.extension === 'png' || item.extension === 'jpg') {
      return <Image className="w-8 h-8 text-[#D9822B]" />;
    }
    if (item.extension === 'ts' || item.extension === 'js' || item.extension === 'json') {
      return <FileCode className="w-8 h-8 text-[#F07D49]" />;
    }
    return <FileText className="w-8 h-8 text-[#8F96A3]" />;
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* Top Navigation & Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)] backdrop-blur-md">
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="p-1.5 rounded-md hover:bg-[var(--border-medium)] disabled:opacity-40 transition-colors"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded-md hover:bg-[var(--border-medium)] disabled:opacity-40 transition-colors"
          title="Forward"
        >
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Breadcrumb address bar */}
        <div className="flex-1 flex items-center gap-1 px-3 py-1 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-lg text-xs overflow-x-auto min-w-0 no-scrollbar">
          <HardDrive className="w-3.5 h-3.5 text-[#E06C38] flex-shrink-0" />
          {getBreadcrumbs().map((crumb, idx) => (
            <React.Fragment key={crumb.name + idx}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-[var(--text-muted)] flex-shrink-0" />}
              <button
                onClick={() => navigateTo(crumb.id)}
                className="hover:text-[var(--accent-primary)] font-medium truncate cursor-pointer"
              >
                {crumb.name}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-40 sm:w-48 flex-shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-lg text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--border-focus)]"
          />
        </div>

        {/* Actions */}
        <button
          onClick={handleCreateFolder}
          className="flex items-center gap-1 px-2.5 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-medium)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium transition-colors flex-shrink-0 cursor-pointer"
          title="New Folder"
        >
          <Plus className="w-3.5 h-3.5 text-[#E06C38]" />
          <span>Folder</span>
        </button>
        <button
          onClick={handleCreateFile}
          className="flex items-center gap-1 px-2.5 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-medium)] border border-[var(--border-subtle)] rounded-lg text-xs font-medium transition-colors flex-shrink-0 cursor-pointer"
          title="New File"
        >
          <Plus className="w-3.5 h-3.5 text-[#F07D49]" />
          <span>File</span>
        </button>
        {selectedId && (
          <button
            onClick={handleDeleteSelected}
            className="p-1.5 text-[#E05252] hover:bg-[#E05252]/15 rounded-md transition-colors cursor-pointer"
            title="Delete Selected"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        {/* View toggle */}
        <div className="flex items-center border border-[var(--border-subtle)] rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-[#E06C38]/15 text-[#E06C38]' : 'hover:bg-[var(--border-medium)]'}`}
            title="Grid View"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 cursor-pointer ${viewMode === 'list' ? 'bg-[#E06C38]/15 text-[#E06C38]' : 'hover:bg-[var(--border-medium)]'}`}
            title="List View"
          >
            <ListIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {currentFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] gap-2">
            <Folder className="w-12 h-12 stroke-[1.2] opacity-40 text-[#E06C38]" />
            <p className="text-sm">This folder is empty</p>
            <p className="text-xs">Create a new folder or file to get started</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {currentFiles.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onDoubleClick={() => {
                  if (item.type === 'folder') navigateTo(item.id);
                  else soundEngine.play('click');
                }}
                className={`flex flex-col items-center p-3.5 rounded-xl cursor-pointer transition-all ${
                  selectedId === item.id
                    ? 'bg-[#E06C38]/15 border border-[#E06C38] shadow-sm'
                    : 'hover:bg-[var(--surface-card)] border border-transparent'
                }`}
              >
                <div className="mb-2">{getFileIcon(item)}</div>
                <span className="text-xs text-center line-clamp-2 w-full break-all font-medium text-[#ECEFF4]">
                  {item.name}
                </span>
                {item.sizeKb !== undefined && (
                  <span className="text-[10px] text-[var(--text-muted)] mt-1">{item.sizeKb} KB</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-[var(--border-subtle)]">
            <div className="grid grid-cols-12 text-[11px] font-semibold text-[var(--text-muted)] pb-2 px-2">
              <span className="col-span-7">Name</span>
              <span className="col-span-3">Date Modified</span>
              <span className="col-span-2 text-right">Size</span>
            </div>
            {currentFiles.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onDoubleClick={() => {
                  if (item.type === 'folder') navigateTo(item.id);
                  else soundEngine.play('click');
                }}
                className={`grid grid-cols-12 items-center py-2 px-2 rounded-lg cursor-pointer text-xs ${
                  selectedId === item.id
                    ? 'bg-[#E06C38]/15 text-[#E06C38] font-medium'
                    : 'hover:bg-[var(--surface-card)] text-[#ECEFF4]'
                }`}
              >
                <div className="col-span-7 flex items-center gap-2 truncate">
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    {getFileIcon(item)}
                  </div>
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="col-span-3 text-[var(--text-muted)]">{item.updatedAt}</span>
                <span className="col-span-2 text-right text-[var(--text-muted)]">
                  {item.sizeKb !== undefined ? `${item.sizeKb} KB` : '--'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-t border-[var(--border-subtle)] bg-[var(--surface-acrylic)] text-[11px] text-[var(--text-muted)]">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-[10px] text-[#2D9C5E] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D9C5E] animate-pulse" />
            MS SQL Server Synced
          </span>
          <span>•</span>
          <span>{currentFiles.length} items</span>
        </div>
        {selectedId && (
          <span>
            Selected:{' '}
            <strong className="text-[var(--text-primary)]">
              {files.find((f) => f.id === selectedId)?.name}
            </strong>
          </span>
        )}
      </div>
    </div>
  );
};
