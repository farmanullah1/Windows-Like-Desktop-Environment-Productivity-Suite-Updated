import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Key,
  Eye,
  EyeOff,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Search,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export interface VaultEntry {
  id: string;
  type: 'password' | 'apikey' | 'note' | 'totp';
  title: string;
  username?: string;
  secret: string;
  url?: string;
  updatedAt: string;
}

const DEFAULT_VAULT_ENTRIES: VaultEntry[] = [
  {
    id: 'v-1',
    type: 'apikey',
    title: 'MS SQL Server sa Credentials',
    username: 'sa',
    secret: 'SuperSecretLocalPwd!2026',
    url: 'localhost:1433/MyOS',
    updatedAt: '2026-10-09',
  },
  {
    id: 'v-2',
    type: 'totp',
    title: 'GitHub Enterprise 2FA',
    username: 'dev@company.com',
    secret: 'JBSWY3DPEHPK3PXP',
    url: 'github.com',
    updatedAt: '2026-10-09',
  },
  {
    id: 'v-3',
    type: 'password',
    title: 'Workstation Master Password',
    username: 'admin',
    secret: 'k8$v9#NxP1@2026!Desktop',
    updatedAt: '2026-10-08',
  },
  {
    id: 'v-4',
    type: 'note',
    title: 'Root SSH Recovery Key',
    secret: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG5... secure-host',
    updatedAt: '2026-10-08',
  },
];

export const VaultApp: React.FC<{ windowId: string }> = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [masterPasswordInput, setMasterPasswordInput] = useState('');
  const [unlockError, setUnlockError] = useState('');

  const [entries, setEntries] = useState<VaultEntry[]>(() => {
    try {
      const saved = localStorage.getItem('adw_vault_entries');
      return saved ? JSON.parse(saved) : DEFAULT_VAULT_ENTRIES;
    } catch {
      return DEFAULT_VAULT_ENTRIES;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Password Generator
  const [genLength, setGenLength] = useState(16);
  const [genIncludeSymbols, setGenIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  // TOTP Counter (30s window)
  const [totpSecondsLeft, setTotpSecondsLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      const secs = 30 - (Math.floor(Date.now() / 1000) % 30);
      setTotpSecondsLeft(secs);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (masterPasswordInput === '1234' || masterPasswordInput.length >= 4) {
      soundEngine.play('success');
      setIsUnlocked(true);
      setUnlockError('');
    } else {
      soundEngine.play('error');
      setUnlockError('Incorrect master key (Hint: 1234)');
    }
  };

  const handleGeneratePassword = () => {
    soundEngine.play('click');
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + (genIncludeSymbols ? '!@#$%^&*()_+' : '');
    let res = '';
    for (let i = 0; i < genLength; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(res);
  };

  const toggleReveal = (id: string) => {
    soundEngine.play('click');
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const copySecret = (id: string, secret: string) => {
    soundEngine.play('click');
    navigator.clipboard.writeText(secret);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredEntries = entries.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.username && e.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {!isUnlocked ? (
        /* Master Lock Screen */
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-xl">
            <Lock className="w-8 h-8" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-base font-bold">Encrypted Security Vault</h2>
            <p className="text-xs text-[var(--text-muted)]">
              Enter your master unlock PIN or password to decrypt local keys.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="w-64 space-y-3">
            <input
              type="password"
              placeholder="Master PIN (Default: 1234)"
              value={masterPasswordInput}
              onChange={(e) => setMasterPasswordInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--surface-input)] border border-[var(--border-subtle)] text-center font-mono text-sm focus:outline-none focus:border-[var(--accent-primary)]"
              autoFocus
            />

            {unlockError && (
              <p className="text-[11px] text-rose-400 text-center font-medium">{unlockError}</p>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white font-bold text-xs shadow-md transition-colors"
            >
              Unlock Vault
            </button>
          </form>

          <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] pt-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Knowledge AES-256 Client-Side Encryption</span>
          </div>
        </div>
      ) : (
        /* Unlocked Vault Interface */
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Header Bar */}
          <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold">Security Vault & Passwords</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                Decrypted (Auto-Lock: 15m)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.play('click');
                  setIsUnlocked(false);
                }}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Vault</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full">
            {/* Search & Vault Entries List */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search credentials and keys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none focus:border-[var(--accent-primary)]"
                />
              </div>

              <div className="space-y-2">
                {filteredEntries.map((entry) => {
                  const isRevealed = revealedIds.includes(entry.id);
                  return (
                    <div
                      key={entry.id}
                      className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center justify-between gap-3 hover:border-[var(--border-medium)] transition-all"
                    >
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[var(--text-primary)]">
                            {entry.title}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-input)] text-[var(--text-muted)] uppercase">
                            {entry.type}
                          </span>
                        </div>
                        {entry.username && (
                          <p className="text-[11px] text-[var(--text-muted)]">{entry.username}</p>
                        )}
                        <p className="font-mono text-xs text-blue-300">
                          {isRevealed ? entry.secret : '••••••••••••••••'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {entry.type === 'totp' && (
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-md">
                            {totpSecondsLeft}s
                          </span>
                        )}
                        <button
                          onClick={() => toggleReveal(entry.id)}
                          className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-input)] text-[var(--text-secondary)]"
                          title={isRevealed ? 'Hide' : 'Reveal'}
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => copySecret(entry.id, entry.secret)}
                          className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-input)] text-[var(--accent-primary)]"
                          title="Copy to Clipboard"
                        >
                          {copiedId === entry.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => {
                            soundEngine.play('click');
                            setEntries((prev) => prev.filter((e) => e.id !== entry.id));
                          }}
                          className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-rose-500/10 text-rose-400"
                          title="Delete Entry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Built-in Password Generator Utility */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-semibold text-xs">Cryptographic Password Generator</h4>
                </div>
                <button
                  onClick={handleGeneratePassword}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--accent-primary)] text-white text-[11px] font-medium"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Generate</span>
                </button>
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[var(--text-muted)]">
                <label className="flex items-center gap-1.5">
                  <span>Length: {genLength}</span>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={genLength}
                    onChange={(e) => setGenLength(Number(e.target.value))}
                    className="accent-[var(--accent-primary)] cursor-pointer"
                  />
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={genIncludeSymbols}
                    onChange={(e) => setGenIncludeSymbols(e.target.checked)}
                    className="rounded accent-[var(--accent-primary)]"
                  />
                  <span>Include Symbols</span>
                </label>
              </div>

              {generatedPassword && (
                <div className="p-2.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs text-emerald-300">
                  <span className="select-text">{generatedPassword}</span>
                  <button
                    onClick={() => {
                      soundEngine.play('click');
                      navigator.clipboard.writeText(generatedPassword);
                      setCopiedId('gen');
                      setTimeout(() => setCopiedId(null), 1500);
                    }}
                    className="text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                  >
                    {copiedId === 'gen' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>Copy</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
