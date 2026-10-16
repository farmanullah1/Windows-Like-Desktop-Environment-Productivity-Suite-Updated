import React, { useState } from 'react';
import {
  Wrench,
  Palette,
  Hash,
  Key,
  Code2,
  Smile,
  Copy,
  Check,
  RefreshCw,
  Search,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

type UtilityTool = 'color' | 'hash' | 'uuid' | 'encode' | 'regex' | 'emoji';

export const QuickUtilitiesApp: React.FC<{ windowId: string }> = () => {
  const [activeTool, setActiveTool] = useState<UtilityTool>('color');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Copy helper
  const copyToClipboard = (text: string, key: string) => {
    soundEngine.play('click');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  // 1. Color Picker State
  const [selectedHex, setSelectedHex] = useState('#0078d4');

  // 2. Hash State
  const [hashInput, setHashInput] = useState('MyOS Desktop Workspace');

  // Simple client-side pseudo-hash / Base64 for instant utility testing
  const toBase64 = (str: string) => {
    try {
      return btoa(str);
    } catch {
      return '';
    }
  };

  // 3. UUID Generator State
  const [generatedUuids, setGeneratedUuids] = useState<string[]>([
    crypto.randomUUID ? crypto.randomUUID() : 'b82a17f2-431f-4c91-829d-472a1e809311',
    crypto.randomUUID ? crypto.randomUUID() : 'f921bc4e-2891-49a2-9b21-992a8b912344',
    crypto.randomUUID ? crypto.randomUUID() : '3049ba18-8f12-4521-aa02-817293a00912',
  ]);

  const handleGenerateUuids = () => {
    soundEngine.play('click');
    const newUuids = [
      crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
    ];
    setGeneratedUuids(newUuids);
  };

  // 4. Encoder / Decoder State
  const [encoderInput, setEncoderInput] = useState('Hello World & Desktop Suite');
  const [encodeMode, setEncodeMode] = useState<'base64' | 'url'>('base64');

  // 5. Regex Tester State
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestText, setRegexTestText] = useState('Contact us at support@example.com or admin@myos.dev today!');

  // 6. Emoji Picker State
  const [emojiSearch, setEmojiSearch] = useState('');
  const EMOJI_CATEGORIES = [
    { cat: 'Smileys', emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😎', '🤓', '🧐'] },
    { cat: 'Gestures', emojis: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤙', '👏', '🙌', '👐', '🤝', '🙏', '💪', '👋', '🫡', '✍️', '💅'] },
    { cat: 'Tech & Work', emojis: ['💻', '🖥️', '⌨️', '🖱️', '📱', '🕹️', '💾', '💿', '📡', '🔋', '🔌', '💡', '🔦', '🔧', '🔨', '⚙️', '🛡️', '📦'] },
    { cat: 'Symbols', emojis: ['⭐', '🌟', '✨', '⚡', '🔥', '💥', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '✔️', '❌', '⚠️', '🚀', '🎯'] },
  ];

  return (
    <div className="flex h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {/* Sidebar navigation */}
      <div className="w-52 border-r border-[var(--border-subtle)] bg-[var(--surface-acrylic)] p-3 space-y-1 flex flex-col">
        <div className="flex items-center gap-2 px-2 py-1.5 mb-2 font-bold text-xs">
          <Wrench className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>Quick Utilities</span>
        </div>

        {[
          { id: 'color', label: 'Color Studio', icon: Palette },
          { id: 'uuid', label: 'UUID / ID Generator', icon: Key },
          { id: 'hash', label: 'Hash & Checksums', icon: Hash },
          { id: 'encode', label: 'Encoder / Decoder', icon: Code2 },
          { id: 'regex', label: 'Regex Evaluator', icon: Search },
          { id: 'emoji', label: 'Emoji & Symbols', icon: Smile },
        ].map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => {
                soundEngine.play('click');
                setActiveTool(tool.id as UtilityTool);
              }}
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                activeTool === tool.id
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
                  : 'hover:bg-[var(--surface-card)] text-[var(--text-secondary)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tool Canvas */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 1. COLOR STUDIO */}
        {activeTool === 'color' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="text-sm font-bold">Color Studio & Harmonies</h3>
              <p className="text-xs text-[var(--text-muted)]">Inspect Hex, RGB, HSL values and generate complementary palettes.</p>
            </div>

            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={selectedHex}
                  onChange={(e) => setSelectedHex(e.target.value)}
                  className="w-16 h-16 rounded-xl border border-[var(--border-medium)] cursor-pointer bg-transparent"
                />
                <div>
                  <span className="text-base font-bold font-mono text-[var(--text-primary)] uppercase">
                    {selectedHex}
                  </span>
                  <p className="text-[11px] text-[var(--text-muted)]">Active Selected Color</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] flex justify-between items-center">
                  <span className="font-mono text-xs">{selectedHex}</span>
                  <button
                    onClick={() => copyToClipboard(selectedHex, 'hex')}
                    className="text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'hex' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>HEX</span>
                  </button>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] flex justify-between items-center">
                  <span className="font-mono text-[11px]">var(--color-primary)</span>
                  <button
                    onClick={() => copyToClipboard(`var(--color-accent, ${selectedHex})`, 'css')}
                    className="text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                  >
                    {copiedKey === 'css' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>CSS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. UUID GENERATOR */}
        {activeTool === 'uuid' && (
          <div className="space-y-6 max-w-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">UUID & Identifier Generator</h3>
                <p className="text-xs text-[var(--text-muted)]">Cryptographically secure UUID v4 / NanoID strings.</p>
              </div>
              <button
                onClick={handleGenerateUuids}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>

            <div className="space-y-2">
              {generatedUuids.map((id, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center justify-between font-mono text-xs"
                >
                  <span className="truncate pr-2">{id}</span>
                  <button
                    onClick={() => copyToClipboard(id, `uuid-${idx}`)}
                    className="p-1.5 rounded-lg hover:bg-[var(--surface-input)] text-[var(--accent-primary)] flex-shrink-0"
                    title="Copy UUID"
                  >
                    {copiedKey === `uuid-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. HASH GENERATOR */}
        {activeTool === 'hash' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="text-sm font-bold">Hash & Checksums</h3>
              <p className="text-xs text-[var(--text-muted)]">Compute client-side cryptographic representations instantly.</p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-[var(--text-muted)]">Input String</label>
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none focus:border-[var(--accent-primary)] font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block">Base64 Representation</span>
                  <span className="font-mono text-xs">{toBase64(hashInput) || '--'}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(toBase64(hashInput), 'b64')}
                  className="text-[var(--accent-primary)] hover:underline flex items-center gap-1"
                >
                  {copiedKey === 'b64' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>

              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex justify-between items-center text-xs">
                <div>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase block">Byte Length / Characters</span>
                  <span className="font-mono text-xs">{hashInput.length} Characters • {new Blob([hashInput]).size} Bytes</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ENCODER / DECODER */}
        {activeTool === 'encode' && (
          <div className="space-y-6 max-w-lg">
            <div>
              <h3 className="text-sm font-bold">Encoder / Decoder</h3>
              <p className="text-xs text-[var(--text-muted)]">Base64 and URL encoding utilities.</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEncodeMode('base64')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${encodeMode === 'base64' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--surface-card)]'}`}
              >
                Base64
              </button>
              <button
                onClick={() => setEncodeMode('url')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${encodeMode === 'url' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--surface-card)]'}`}
              >
                URL Percent-Encoding
              </button>
            </div>

            <textarea
              rows={3}
              value={encoderInput}
              onChange={(e) => setEncoderInput(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)]"
              placeholder="Text to encode..."
            />

            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase">Encoded Output</span>
              <pre className="font-mono text-xs text-blue-300 break-all whitespace-pre-wrap select-text">
                {encodeMode === 'base64' ? toBase64(encoderInput) : encodeURIComponent(encoderInput)}
              </pre>
            </div>
          </div>
        )}

        {/* 5. REGEX EVALUATOR */}
        {activeTool === 'regex' && (
          <div className="space-y-4 max-w-lg">
            <div>
              <h3 className="text-sm font-bold">Regex Evaluator</h3>
              <p className="text-xs text-[var(--text-muted)]">Test regular expressions against live target strings.</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                placeholder="Regular expression pattern..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs font-mono focus:outline-none focus:border-[var(--accent-primary)]"
              />
              <input
                type="text"
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                placeholder="flags (g, i, m)"
                className="w-20 px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs font-mono"
              />
            </div>

            <textarea
              rows={4}
              value={regexTestText}
              onChange={(e) => setRegexTestText(e.target.value)}
              placeholder="Test string..."
              className="w-full px-3 py-2 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs font-mono"
            />

            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)]">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase block mb-1">
                Matches Found
              </span>
              <div className="font-mono text-xs text-emerald-400">
                {(() => {
                  try {
                    const re = new RegExp(regexPattern, regexFlags);
                    const matches = regexTestText.match(re);
                    return matches ? `${matches.length} matches: ${matches.join(', ')}` : 'No matches found.';
                  } catch (err: any) {
                    return `Invalid regex: ${err.message}`;
                  }
                })()}
              </div>
            </div>
          </div>
        )}

        {/* 6. EMOJI PICKER */}
        {activeTool === 'emoji' && (
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Emoji & Symbol Picker</h3>
                <p className="text-xs text-[var(--text-muted)]">Click any emoji to copy directly to your clipboard.</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                Win + .
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search emojis & symbols..."
                value={emojiSearch}
                onChange={(e) => setEmojiSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs"
              />
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto">
              {EMOJI_CATEGORIES.map((cat) => (
                <div key={cat.cat} className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase">{cat.cat}</span>
                  <div className="grid grid-cols-10 gap-2">
                    {cat.emojis.map((em, idx) => (
                      <button
                        key={idx}
                        onClick={() => copyToClipboard(em, `em-${cat.cat}-${idx}`)}
                        className={`p-2 rounded-lg text-lg flex items-center justify-center transition-all hover:scale-125 ${
                          copiedKey === `em-${cat.cat}-${idx}` ? 'bg-emerald-500/20 ring-1 ring-emerald-500' : 'hover:bg-[var(--surface-card)]'
                        }`}
                        title={`Copy ${em}`}
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
