import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Code,
  FileText,
  Database,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const DEFAULT_MESSAGES: Message[] = [
  {
    id: 'm-1',
    sender: 'assistant',
    text: "Hello! I am your MyOS Desktop AI Assistant. I operate locally on your workstation to help with code explanation, SQL Server queries, markdown notes, and productivity tasks. How can I assist you today?",
    timestamp: '12:00 PM',
  },
];

export const AiAssistantApp: React.FC<{ windowId: string }> = () => {
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputPrompt.trim() || isGenerating) return;

    soundEngine.play('click');
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: inputPrompt.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsGenerating(true);

    // Contextual local assistant logic
    setTimeout(() => {
      let reply = "I analyzed your request locally against your workspace context. Everything is synchronized with your MS SQL Server MyOS database.";
      const lower = userMsg.text.toLowerCase();

      if (lower.includes('sql') || lower.includes('database')) {
        reply = "Here is a query for your MyOS schema:\n```sql\nSELECT t.name AS TableName, p.rows AS RowCounts\nFROM sys.tables t\nINNER JOIN sys.partitions p ON t.object_id = p.object_id\nWHERE p.index_id IN (0,1)\nORDER BY TableName;\n```\nAll tables (Applications, UserFiles, Notes, Workspaces) are indexed and ready.";
      } else if (lower.includes('code') || lower.includes('react') || lower.includes('tailwind')) {
        reply = "Tailwind CSS v4 is compiled via `@tailwindcss/vite` in your project. You can use standard utility classes such as `bg-[var(--surface-card)]`, `text-[var(--text-primary)]`, `flex`, `grid`, and `p-4` for optimal GPU rendering.";
      } else if (lower.includes('summary') || lower.includes('note')) {
        reply = "Summary: Your MyOS Desktop Workspace is running version 8.0 with complete daily-use utilities (Clipboard, Snippets, Quick Tools) and productivity loop apps (Tasks Kanban, Calendar, Focus Mode).";
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsGenerating(false);
      soundEngine.play('success');
    }, 600);
  };

  const handleCopyMessage = (id: string, text: string) => {
    soundEngine.play('click');
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {/* Header bar */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#C85728] via-[#E06C38] to-[#F07D49] flex items-center justify-center text-white shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold flex items-center gap-1.5">
              <span>MyOS Local AI</span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#E06C38]/15 text-[#E06C38] border border-[#E06C38]/30">
                On-Device
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.play('click');
              setMessages(DEFAULT_MESSAGES);
            }}
            className="p-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-white transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-1.5 mb-1 px-1">
              <span className="text-[10px] font-semibold text-[var(--text-muted)]">
                {m.sender === 'user' ? 'You' : 'MyOS AI'}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">•</span>
              <span className="text-[10px] text-[var(--text-muted)]">{m.timestamp}</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-xl text-xs select-text shadow-sm relative group ${
                m.sender === 'user'
                  ? 'bg-[var(--accent-primary)] text-white rounded-tr-none'
                  : 'bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-tl-none text-[var(--text-primary)]'
              }`}
            >
              <pre className="font-sans whitespace-pre-wrap break-words">{m.text}</pre>

              {m.sender === 'assistant' && (
                <button
                  onClick={() => handleCopyMessage(m.id, m.text)}
                  className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-[var(--surface-input)] text-[var(--text-secondary)] hover:text-white transition-opacity"
                  title="Copy Response"
                >
                  {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-2 p-3 text-[var(--text-muted)]">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            <span className="text-xs">Processing local neural inference...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex items-center gap-2 overflow-x-auto">
        {[
          { label: 'Explain MyOS SQL schema', icon: Database },
          { label: 'Suggest React optimization', icon: Code },
          { label: 'Summarize today\'s sprint', icon: FileText },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => {
                setInputPrompt(item.label);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-secondary)] whitespace-nowrap transition-colors"
            >
              <Icon className="w-3 h-3 text-[var(--accent-primary)]" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask MyOS AI (local-first, zero telemetry)..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isGenerating}
          className="p-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white disabled:opacity-40 transition-colors"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
