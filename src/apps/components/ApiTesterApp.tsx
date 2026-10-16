import React, { useState } from 'react';
import { Send, Clock, Copy, Check } from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export const ApiTesterApp: React.FC<{ windowId: string }> = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [body, setBody] = useState('{\n  "title": "New Task",\n  "completed": false\n}');
  const [activeTab, setActiveTab] = useState<'body' | 'headers'>('body');
  const [headersText, setHeadersText] = useState('Content-Type: application/json');

  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseTimeMs, setResponseTimeMs] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<string | null>(null);
  const [responseTab, setResponseTab] = useState<'body' | 'headers'>('body');
  const [isCopied, setIsCopied] = useState(false);

  const handleSend = async () => {
    soundEngine.play('click');
    setLoading(true);
    setResponseStatus(null);
    setResponseBody(null);

    const startTime = performance.now();

    try {
      const parsedHeaders: Record<string, string> = {};
      headersText.split('\n').forEach((line) => {
        const [k, v] = line.split(':');
        if (k && v) parsedHeaders[k.trim()] = v.trim();
      });

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== 'GET' && body.trim()) {
        options.body = body.trim();
      }

      const res = await fetch(url, options);
      const elapsed = Math.round(performance.now() - startTime);
      setResponseTimeMs(elapsed);
      setResponseStatus(res.status);

      const headerEntries: string[] = [];
      res.headers.forEach((v, k) => headerEntries.push(`${k}: ${v}`));
      setResponseHeaders(headerEntries.join('\n'));

      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setResponseBody(JSON.stringify(json, null, 2));
      } catch {
        setResponseBody(text);
      }
      soundEngine.play('success');
    } catch (err: unknown) {
      const elapsed = Math.round(performance.now() - startTime);
      setResponseTimeMs(elapsed);
      setResponseStatus(500);
      setResponseBody(`Network Error: ${err instanceof Error ? err.message : String(err)}`);
      soundEngine.play('error');
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (responseBody) {
      navigator.clipboard.writeText(responseBody);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* URL & Method Bar */}
      <div className="flex items-center gap-2 p-3 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)]">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as 'GET')}
          className="px-3 py-1.5 rounded-xl bg-[var(--surface-input)] border border-[var(--border-subtle)] font-bold text-xs text-[var(--accent-primary)] focus:outline-none"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/resource"
          className="flex-1 px-3 py-1.5 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-xl text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--border-focus)]"
        />

        <button
          onClick={handleSend}
          disabled={loading || !url.trim()}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] disabled:opacity-40 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{loading ? 'Sending...' : 'Send'}</span>
        </button>
      </div>

      {/* Request Options & Response Grid */}
      <div className="flex-1 grid grid-cols-2 divide-x divide-[var(--border-subtle)] overflow-hidden">
        {/* Left Column: Request Configuration */}
        <div className="flex flex-col h-full bg-[var(--surface-base)]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <button
              onClick={() => setActiveTab('body')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'body'
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--border-medium)]'
              }`}
            >
              Request Body (JSON)
            </button>
            <button
              onClick={() => setActiveTab('headers')}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'headers'
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--border-medium)]'
              }`}
            >
              Headers
            </button>
          </div>

          <div className="flex-1 p-3">
            {activeTab === 'body' ? (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="JSON Payload..."
                className="w-full h-full p-2 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-primary)] resize-none focus:outline-none"
              />
            ) : (
              <textarea
                value={headersText}
                onChange={(e) => setHeadersText(e.target.value)}
                placeholder="Header: Value"
                className="w-full h-full p-2 bg-[var(--surface-input)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-primary)] resize-none focus:outline-none"
              />
            )}
          </div>
        </div>

        {/* Right Column: Response Output */}
        <div className="flex flex-col h-full bg-[var(--surface-base)]">
          <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-subtle)] bg-[var(--surface-card)]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase text-[var(--text-muted)]">Response</span>
              {responseStatus !== null && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    responseStatus >= 200 && responseStatus < 300
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {responseStatus}
                </span>
              )}
              {responseTimeMs !== null && (
                <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {responseTimeMs} ms
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {responseHeaders && (
                <button
                  onClick={() => setResponseTab(responseTab === 'body' ? 'headers' : 'body')}
                  className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface-input)] text-[var(--text-secondary)] hover:text-white"
                >
                  {responseTab === 'body' ? 'View Headers' : 'View Body'}
                </button>
              )}
              {responseBody && (
                <button
                  onClick={copyResponse}
                  className="flex items-center gap-1 text-[11px] text-[var(--text-muted)] hover:text-white transition-colors"
                  title="Copy Response"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 p-3 overflow-auto">
            {responseBody ? (
              <pre className="font-mono text-xs text-[var(--text-primary)] leading-relaxed select-text">
                {responseTab === 'body' ? responseBody : responseHeaders}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-xs text-[var(--text-muted)] gap-1">
                <span>No response yet.</span>
                <span className="text-[10px]">Enter an endpoint URL and click "Send".</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
