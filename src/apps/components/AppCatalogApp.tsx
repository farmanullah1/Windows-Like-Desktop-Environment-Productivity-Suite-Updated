import React, { useState, useEffect } from 'react';
import {
  Search,
  Pin,
  ExternalLink,
  Shield,
  Box,
} from 'lucide-react';
import { getAllApps } from '../registry';
import { useDesktop } from '../../core/desktopStore';
import { AppIconBadge } from '../../design-system/AppIconBadge';

export const AppCatalogApp: React.FC<{ windowId: string }> = () => {
  const { openApp } = useDesktop();
  const allApps = getAllApps();
  const [pinnedAppIds, setPinnedAppIds] = useState<string[]>(() =>
    allApps.filter((a) => a.isPinned).map((a) => a.id)
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDbSynced, setIsDbSynced] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch('/api/v1/applications')
      .then((r) => r.json())
      .then((res) => {
        if (mounted && res.success) {
          setIsDbSynced(true);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const togglePinApp = (appId: string) => {
    setPinnedAppIds((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };
  const categories = ['All', 'Core', 'Productivity', 'Developer', 'System'];

  const filteredApps = allApps.filter((app) => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch =
      app.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-surface)] text-[var(--text-primary)] select-none text-xs">
      {/* Search and Category Filter Header */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-[var(--color-accent)]" />
            <h2 className="text-sm font-semibold">Application Catalog & Registry</h2>
          </div>
          <div className="flex items-center gap-2">
            {isDbSynced && (
              <span className="flex items-center gap-1 text-[10px] text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                MS SQL Server Registry
              </span>
            )}
            <span className="text-[11px] text-[var(--text-secondary)]">
              {allApps.length} Registered Applications
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search catalog apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-[var(--border-subtle)] rounded-md bg-[var(--bg-surface)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent)] text-xs"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[var(--color-accent)] text-white font-medium'
                    : 'bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Application Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredApps.map((app) => {
            const isPinned = pinnedAppIds?.includes(app.id) ?? app.isPinned;

            return (
              <div
                key={app.id}
                className="border border-[var(--border-subtle)] rounded-lg p-3 bg-[var(--bg-surface-elevated)] hover:border-[var(--color-accent)]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <AppIconBadge appId={app.id} size="sm" />
                      <div>
                        <h3 className="font-semibold text-xs text-[var(--text-primary)]">{app.displayName}</h3>
                        <span className="text-[10px] text-[var(--text-secondary)] font-mono">v{app.version} • {app.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => togglePinApp(app.id)}
                      className={`p-1 rounded hover:bg-[var(--bg-hover)] transition-colors ${
                        isPinned ? 'text-[var(--color-accent)]' : 'text-[var(--text-secondary)]'
                      }`}
                      title={isPinned ? 'Unpin from Taskbar' : 'Pin to Taskbar'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mb-3">
                    {app.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                    <Shield className="w-3 h-3" />
                    Sandboxed (Real)
                  </div>

                  <button
                    onClick={() => openApp(app.id)}
                    className="px-2.5 py-1 bg-[var(--color-accent)] hover:opacity-90 text-white rounded font-medium flex items-center gap-1 text-[11px]"
                  >
                    <ExternalLink className="w-3 h-3" /> Open
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredApps.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-[var(--text-secondary)]">
            <Box className="w-8 h-8 mb-2 opacity-40" />
            <p className="font-medium text-xs">No applications match your query.</p>
            <p className="text-[11px]">Try searching for another keyword or selecting All categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppCatalogApp;
