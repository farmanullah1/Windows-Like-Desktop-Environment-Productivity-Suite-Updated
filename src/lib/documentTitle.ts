/**
 * MyOS — Centralized Document Title Manager
 * Single source of truth for browser tab title.
 */
export function setDocumentTitle(view?: string): void {
  if (typeof document === 'undefined') return;
  document.title = view && view.trim().length > 0 ? `MyOS — ${view.trim()}` : 'MyOS';
}
