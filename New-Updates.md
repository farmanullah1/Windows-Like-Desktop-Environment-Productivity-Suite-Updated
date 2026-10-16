MASTER GOOGLE ANTIGRAVITY DEVELOPMENT PROMPT
Expansion Pack — Version 8.0
Advanced Features, Ecosystem & Platform Extensions
Status: Master Expansion Prompt (companion to v7.0 Core Specification)
Prerequisite: Version 7.0 Core Product fully or partially implemented
Target Platform: Windows 10/11 (x64 first, ARM64 evaluated)
Primary Architecture: Electron + React + TypeScript + Node.js + SQLite (local-first) + NestJS + MySQL 8.0+ (primary) / SQL Server (supported)
Development Environment: Google Antigravity
Execution Mode: BUILD-FIRST / USER-AUTHORIZED EXECUTION ONLY
Capability Honesty: Mandatory — every feature classified REAL / WINDOWS-INTEGRATED / APPLICATION-SIMULATED / INFORMATIONAL / FUTURE / UNSUPPORTED

0. ABSOLUTE DIRECTIVE
DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.
This document extends Version 7.0. It does not replace it. All security rules, decision authority, test execution gates, capability honesty requirements, Git discipline, and brain.md maintenance requirements from v7.0 remain in full force.

This document adds new subsystems and capabilities. Each must be:

Implemented as a coherent vertical slice.

Classified honestly (REAL / WINDOWS-INTEGRATED / APPLICATION-SIMULATED / INFORMATIONAL / FUTURE / UNSUPPORTED).

Documented in docs/CAPABILITY_MATRIX.md.

Recorded in brain.md.

Committed to Git as a meaningful unit.

Tested within the authorization gate.

Do not build shallow versions of every feature below. Choose a coherent subset, build it well, and stop.

Do not launch the application, install dependencies, execute migrations, elevate privileges, or modify Windows without explicit authorization.

1. PURPOSE OF THIS EXPANSION
Version 7.0 established the desktop environment, productivity suite, developer workspace, authentication, database, sync, motion, sound, widget, media, photo, wallpaper, icon, lock screen, and taskbar systems.

This expansion adds the next layer of value — the capabilities that transform a good desktop suite into a sticky, extensible, differentiated platform:

Local intelligence (AI, semantic search, knowledge graph)

Full productivity loop (tasks, calendar, focus)

Daily-use utilities (clipboard, snippets, capture, OCR, dictation)

Developer power tools (Git client, API client, DB client, SSH)

Security and trust (encrypted vault, 2FA, privacy controls)

Automation and extensibility (workflow engine, plugin SDK, public API)

Platform reach (mobile companion, web companion, CLI, browser extension)

Enterprise readiness (team workspaces, SSO, admin console, policy)

Each new subsystem must integrate with the existing design system, motion system, sound system, permission model, IPC contract, database, audit log, and notification system. No subsystem may invent its own parallel infrastructure.

2. GOVERNANCE — EXTENDED DECISION AUTHORITY
All rules from v7.0 §2 and §5 remain in effect. The following additions apply to the new subsystems.

2.1 New permission keys (must be added to the permission schema)
text
ai.inference.local.run           ai.inference.cloud.run
ai.embedding.generate            ai.model.download

clipboard.history.read           clipboard.history.write
clipboard.history.clear

snippet.expand.global            snippet.manage

vault.read                       vault.write
vault.unlock.biometric           vault.export

screen.capture                   screen.record
screen.region.select             screen.scroll.capture
audio.system.capture             audio.microphone.capture

git.repository.read              git.repository.write
git.remote.push                  git.history.rewrite

api.request.send                 api.collection.manage
api.environment.manage

database.external.connect        database.external.query
database.external.write

ssh.connect                      sftp.transfer
remote.desktop.launch

automation.flow.create           automation.flow.run
automation.flow.import           automation.flow.export
automation.script.execute        automation.http.request

plugin.sdk.publish               plugin.registry.read

calendar.local.read              calendar.local.write
calendar.remote.sync             calendar.provider.connect

task.local.read                  task.local.write
task.remote.sync

email.imap.connect               email.send
email.read                       email.modify

contacts.read                    contacts.write

bookmark.read                    bookmark.write

rss.subscribe                    rss.read

tts.speak                        stt.transcribe

ocr.image.read                   ocr.pdf.read

tts.voice.download               stt.model.download

public.api.enable                public.api.token.manage

companion.device.pair            companion.data.sync

enterprise.team.manage           enterprise.policy.enforce
enterprise.sso.configure         enterprise.audit.export
2.2 New capability classifications to document
Each new subsystem must declare, per component:

Component	Classification	Notes
Local AI inference	REAL (local)	Runs on-device via Ollama/llama.cpp
Cloud AI inference	REAL (remote)	Requires explicit consent + API key
Semantic search index	REAL	Local embedding index
Knowledge graph	REAL	Derived from user content
Clipboard history	WINDOWS-INTEGRATED (read)	Uses Windows clipboard APIs
Snippet expansion in other apps	WINDOWS-INTEGRATED (low-level hook)	Must be labeled; requires user opt-in
Screen capture	WINDOWS-INTEGRATED	Uses Windows.Graphics.Capture
System audio capture	WINDOWS-INTEGRATED	Requires loopback device
Microphone capture	WINDOWS-INTEGRATED	Requires user consent
OCR	REAL (local model)	Tesseract or PaddleOCR
Speech-to-text	REAL (local model)	Whisper via ONNX Runtime
Text-to-speech	REAL (local)	SAPI or Piper TTS
Git operations	WINDOWS-INTEGRATED	Uses git.exe via allowlisted subprocess
SSH/SFTP	REAL	Uses ssh2 library
RDP/VNC launch	WINDOWS-INTEGRATED (launch only)	Does not embed the session
Database clients	REAL	Direct protocol connection
Automation engine	REAL	Local execution only
Plugin SDK	REAL	Sandboxed execution
Public API	REAL	Localhost-only by default
Mobile companion sync	REAL	Requires user pairing
Web companion	REAL	Read-only by default
Enterprise SSO	REAL	Requires IdP configuration
2.3 Approval-required operations (extended)
In addition to v7.0 §2, the following require explicit user approval:

Downloading any AI model over 500 MB.

Enabling cloud AI inference for the first time.

Granting snippet expansion globally (low-level keyboard hook).

Enabling system audio capture.

Adding an SSH private key to the vault.

Connecting to any external database.

Publishing any automation flow to a shared registry.

Enabling the public local API.

Pairing any companion device.

Installing any third-party plugin from a remote source.

Exporting audit logs.

Enabling enterprise SSO.

Sending any email on the user's behalf.

3. ENGINEERING MEMORY — EXTENDED SECTIONS
brain.md must be extended with the following additional sections. Populate them as features are implemented. Never fabricate completion.

text
# AI Subsystem Status
# Semantic Search Status
# Knowledge Graph Status
# Task Manager Status
# Calendar Status
# Focus Mode Status
# Clipboard Manager Status
# Snippet System Status
# Screen Capture Status
# Recording Status
# OCR Status
# Speech-to-Text Status
# Text-to-Speech Status
# Git Client Status
# API Client Status
# Database Client Status
# SSH/SFTP Client Status
# Remote Desktop Launcher Status
# Encrypted Vault Status
# Automation Engine Status
# Plugin SDK Status
# Public API Status
# Mobile Companion Status
# Web Companion Status
# CLI Tool Status
# Browser Extension Status
# Enterprise Features Status
# Installed AI Models
# Model Storage Location
# Model Licenses
# Automation Flows Registered
# Plugins Installed
# Companion Devices Paired
# Public API Tokens Active
docs/ must be extended with:

text
docs/AI.md
docs/SEMANTIC_SEARCH.md
docs/KNOWLEDGE_GRAPH.md
docs/TASKS.md
docs/CALENDAR.md
docs/FOCUS_MODES.md
docs/CLIPBOARD.md
docs/SNIPPETS.md
docs/CAPTURE.md
docs/OCR.md
docs/SPEECH.md
docs/GIT_CLIENT.md
docs/API_CLIENT.md
docs/DATABASE_CLIENT.md
docs/SSH.md
docs/REMOTE_DESKTOP.md
docs/VAULT.md
docs/AUTOMATION.md
docs/PLUGIN_SDK.md
docs/PUBLIC_API.md
docs/COMPANIONS.md
docs/ENTERPRISE.md
4. PHASED ROADMAP — EXPANSION
Implement in the order below unless dependency analysis justifies a different sequence. Each phase must satisfy the Definition of Done before the next begins.

Phase E0 — Foundation Audit
Before adding any new subsystem:

Verify every v7.0 phase that is claimed IMPLEMENTED is genuinely implemented and tested.

Reclassify anything that is a stub or placeholder.

Update IMPLEMENTATION_STATUS.md with honest status.

Confirm no unresolved critical security or data-loss issue exists.

Confirm the design system, motion system, sound system, permission model, IPC contract, and database layer are stable enough to extend.

Exit criteria: Foundation is honest and stable. No new subsystem is built on an unverified base.

Phase E1 — Daily-Use Utilities (Highest Daily Value, Lowest Risk)
Build these first. They are small, high-impact, and validate the extension patterns.

Clipboard Manager (§6)

Snippet Expander (§7)

Screenshot & Annotation (§8)

Quick Utilities (§9)

Emoji & Symbol Picker (§9)

Exit criteria: Each utility works, is keyboard-accessible, respects permissions, is classified honestly, and has tests.

Phase E2 — Productivity Loop
Task Manager (§10)

Calendar (§11)

Focus Modes (§12)

Habit Tracker & Journal (§13)

Exit criteria: Tasks, calendar, focus, and habits integrate with notifications, widgets, workspaces, and the command palette.

Phase E3 — Local Intelligence
Semantic Search (§14)

Local AI Assistant (§15)

Knowledge Graph & Backlinks (§16)

AI Actions in Notes, Editor, and Command Palette (§15)

Exit criteria: Local AI runs without cloud dependency; cloud AI requires explicit consent; semantic search indexes only user-authorized locations.

Phase E4 — Capture & Media Utilities
Screen Recording (§17)

OCR (§18)

Speech-to-Text (§19)

Text-to-Speech (§19)

Voice Notes (§19)

Audio Recorder (§19)

Exit criteria: All capture paths require explicit permission; hardware access is auditable; recorded media is stored in application-owned storage by default.

Phase E5 — Developer Power Tools
Git Client (§20)

API Client (§21)

Database Client (§22)

SSH / SFTP Client (§23)

Remote Desktop Launcher (§24)

Docker / Container GUI (§24)

Exit criteria: No destructive Git operation without confirmation; credentials stored only in OS keychain or encrypted vault; external database connections audited.

Phase E6 — Security & Trust
Encrypted Vault (§25)

TOTP Authenticator (§25)

Password Generator & Analyzer (§25)

Privacy Dashboard (§25)

Exit criteria: Vault uses vetted cryptography (libsodium or SQLCipher); biometric unlock via Windows Hello where available; auto-lock enforced.

Phase E7 — Automation & Extensibility
Automation Engine (§26)

Plugin SDK (§27)

Plugin Registry (Local) (§27)

Public Local API (§28)

CLI Tool (§29)

Exit criteria: No automation flow executes without user-configured permission; plugins are sandboxed; public API is localhost-only by default and token-gated.

Phase E8 — Platform Reach
Mobile Companion (§30)

Web Companion (§30)

Browser Extension (§31)

Exit criteria: Companion sync is E2E encrypted; pairing requires explicit user action; web companion is read-only by default.

Phase E9 — Enterprise
Team Workspaces (§32)

Admin Console (§32)

SSO (SAML / OIDC) (§32)

Audit Export (§32)

Policy Enforcement (§32)

Exit criteria: Enterprise features are opt-in; policy enforcement is documented; audit export is permission-gated and redacted.

Phase E10 — Polish & Convergence
Unify motion across all new subsystems.

Unify sound across all new subsystems.

Unify permission UX across all new subsystems.

Unify empty/loading/error states.

Accessibility pass across every new app.

Performance pass — verify budgets.

Visual regression baseline update.

Documentation convergence.

Exit criteria: Every new subsystem feels like part of the same product.

5. CROSS-CUTTING REQUIREMENTS FOR ALL NEW SUBSYSTEMS
Every new subsystem must satisfy the following before being marked IMPLEMENTED.

5.1 Architecture
Lives in apps/desktop/renderer (UI) + packages/<domain> (logic) + optional native/windows (native).

Uses the existing IPC contract (§9.5 of v7.0).

Uses Zod (or equivalent) for runtime validation.

Uses the existing permission schema (§9.8 of v7.0).

Uses the existing error code catalog — new codes must be added to §9.3 of v7.0.

Uses the existing event system (§9.4 of v7.0) — new events must be registered.

Uses the existing audit log (§8.8 of v7.0).

5.2 UI / UX
Uses the design system tokens (§30 of v7.0).

Uses the centralized motion system (§28 of v7.0).

Uses the centralized sound system (§32 of v7.0).

Uses the squircle icon badge system (§36 of v7.0).

Registers as an application in the application registry (§9.6 of v7.0).

Registers commands in the command registry (§9.7 of v7.0).

Provides loading, empty, success, error, and permission-denied states.

Is fully keyboard-navigable.

Has an accessible name and role for every control.

Respects Reduced Motion.

Respects High Contrast.

Respects Performance Mode.

Respects Quiet Hours / Do Not Disturb.

5.3 Data
Persists via the existing repository layer.

Uses UTC timestamps.

Uses parameterized queries only.

Uses transactions for multi-step mutations.

Has migrations committed as files (not executed without approval).

Has a documented retention policy.

Has a documented export format.

Has a documented deletion path.

5.4 Security
Declares required permissions in its manifest.

Enforces permissions server-side (or main-process-side), not only in the UI.

Sanitizes all user input.

Validates all IPC payloads.

Never logs secrets.

Never transmits data externally without explicit consent.

Has a threat model entry in docs/RISK_REGISTER.md.

5.5 Testing
Unit tests for logic.

Contract tests for IPC and API.

Accessibility tests (axe + keyboard).

Failure-path tests (permission denied, network failure, malformed input).

Visual regression baseline (where UI is non-trivial).

5.6 Documentation
docs/<SUBSYSTEM>.md created.

docs/CAPABILITY_MATRIX.md updated.

brain.md updated.

IMPLEMENTATION_STATUS.md updated.

docs/CHANGELOG.md updated.

docs/DECISIONS.md updated if an architectural decision was made.

6. CLIPBOARD MANAGER
6.1 Purpose
Provide searchable, pinnable clipboard history with privacy exclusions and optional cross-device sync.

6.2 Capabilities
Capture text, images, files, and rich content (HTML, RTF).

Configurable history size (default: 200 items, max: 10,000).

Search across history.

Pin favorites.

Per-app exclusion list (default: password managers, banking apps).

Sensitive-content detection (heuristic: password fields, long random strings) → auto-exclude.

Clear-all with confirmation.

Export history as JSON (redacted option).

Optional E2E-encrypted sync across paired devices.

6.3 UX
Global shortcut: Ctrl + Shift + V (configurable).

Palette-style overlay: search, preview, paste on Enter, pin on Ctrl+P.

Preview shows type-appropriate rendering (text, image thumbnail, file icon).

Keyboard-first.

6.4 Security
Never capture content from windows marked as secure (Windows WDA_EXCLUDEFROMCAPTURE where available).

Never capture from apps on the exclusion list.

Never sync without explicit pairing + E2E encryption.

Clear history on lock-screen activation (configurable).

6.5 Classification
Clipboard read/write: WINDOWS-INTEGRATED.

History storage: REAL.

Sync: REAL (E2E encrypted).

6.6 Permissions
clipboard.history.read, clipboard.history.write, clipboard.history.clear.

7. SNIPPET EXPANDER
7.1 Purpose
Expand short trigger strings into longer text in any application.

7.2 Capabilities
Trigger → expansion mapping.

Categories, search, favorites.

Variables: {date}, {time}, {clipboard}, {cursor}, {input:prompt}.

Dynamic snippets (date arithmetic, UUID, random).

Import/export as JSON.

Sync across paired devices.

7.3 UX
Settings page for managing snippets.

Inline editor with variable insertion.

Test field to preview expansion.

Global enable/disable toggle.

7.4 Security
Global keyboard hook requires explicit opt-in with a clear explanation.

Never expand inside password fields (detected via accessibility APIs where available).

Never expand inside apps on the exclusion list.

Audit-log every expansion (without logging the content).

7.5 Classification
Global expansion: WINDOWS-INTEGRATED (requires low-level keyboard hook).

In-app expansion (own text fields): REAL.

7.6 Permissions
snippet.expand.global, snippet.manage.

7.7 Honesty
Clearly state that global expansion requires a system-level keyboard hook and may be flagged by security software. Provide a clear opt-out.

8. SCREENSHOT & ANNOTATION
8.1 Purpose
Capture, annotate, and share screenshots quickly.

8.2 Capabilities
Capture modes: full screen, active window, region, scrolling window.

Delay capture (0–30s).

Annotation: arrow, rectangle, ellipse, freehand, text, highlight, blur, pixelate, step numbers.

OCR the captured region (integrates §18).

Copy to clipboard, save to file, or open in editor.

Recent captures gallery.

Optional: upload to a user-configured destination (explicit consent).

8.3 UX
Global shortcut: Ctrl + Shift + S (configurable).

Region selector with magnifier and pixel-precise edges.

Annotation toolbar with keyboard shortcuts.

Post-capture action bar: Copy, Save, Edit, OCR, Share.

8.4 Security
Never capture content marked as protected by the OS.

Never upload without explicit user action.

Audit-log every capture.

8.5 Classification
Capture: WINDOWS-INTEGRATED (Windows.Graphics.Capture).

Annotation: REAL.

Upload: REAL (requires explicit consent per destination).

8.6 Permissions
screen.capture, screen.region.select, screen.scroll.capture.

9. QUICK UTILITIES & EMOJI PICKER
9.1 Quick Utilities
A single app hosting small, keyboard-first tools:

Color picker (eyedropper + palette + harmonies + export CSS/SCSS/JSON).

Hash generator (MD5, SHA-1, SHA-256, SHA-512, BLAKE3).

UUID generator (v1, v4, v7, ULID, NanoID).

Base64 / URL / HTML entity encoder-decoder.

JSON / YAML / XML / TOML formatter, validator, and converter.

Regex tester with explanation and common patterns.

Cron expression builder with next-run preview.

Unit converter (length, mass, volume, temperature, data, time, currency with offline rates).

Date/time calculator.

JWT decoder (client-side only, never transmits).

Diff viewer (text and image).

Text tools: case conversion, sort lines, dedupe, trim, count.

Every tool must work offline and must never transmit input.

9.2 Emoji & Symbol Picker
Global shortcut: Win + . (if not conflicting) or user-defined.

Search by name, keyword, or category.

Recently used.

Skin tone variants.

Copy on select.

Emoji, symbols, math, arrows, currency, box drawing.

9.3 Classification
All utilities: REAL (local).

Eyedropper: WINDOWS-INTEGRATED (screen pixel read).

9.4 Permissions
screen.capture (for eyedropper only).

10. TASK MANAGER
10.1 Purpose
Full task and project management integrated with notes, calendar, notifications, and focus modes.

10.2 Capabilities
Projects, sections, tasks, subtasks.

Labels, priorities, due dates, reminders, recurrence.

Kanban, list, calendar, timeline views.

Dependencies (blocks / blocked by).

Estimates and time tracking.

Attachments (links to notes, files, URLs).

Comments.

Import/export (Markdown, CSV, JSON, Todoist-compatible).

Search and filters (saved views).

Natural language parsing: "Submit report tomorrow 5pm !high #work".

10.3 Integration
Notifications for due and overdue tasks.

Calendar view shows tasks alongside events.

Focus Mode can filter to a project.

Widget: Today's Tasks.

Command palette: > task add ..., > task complete ....

Notes can embed task lists that sync bidirectionally.

10.4 Classification
REAL.

10.5 Permissions
task.local.read, task.local.write, task.remote.sync.

10.6 Data model
Extend the schema with:

text
Projects, Sections, Tasks, Subtasks, TaskLabels,
TaskAttachments, TaskComments, TaskRecurrence,
TaskDependencies, TimeEntries, SavedViews
All with foreign keys, indexes on (UserId, ProjectId), (UserId, DueAt), (UserId, Status), and soft deletion.

11. CALENDAR
11.1 Purpose
Unified local + remote calendar with agenda, notifications, and meeting join.

11.2 Capabilities
Local calendar.

CalDAV sync (opt-in).

Google Calendar sync (OAuth, opt-in).

Microsoft Outlook / Graph sync (OAuth, opt-in).

Day, week, month, agenda, year views.

Multiple calendars with colors.

Event creation with natural language.

Recurring events with exceptions.

Reminders and notifications.

Time zone handling.

Meeting link detection (Zoom, Teams, Meet, Webex).

Join meeting button in notifications.

Free/busy view.

Import/export iCalendar (.ics).

11.3 Integration
Widget: Agenda / Month.

Focus Mode can hide notifications during meetings.

Notification Center shows upcoming events.

Quick Settings shows next event.

Command palette: > calendar new ..., > calendar today.

11.4 Classification
Local calendar: REAL.

CalDAV sync: REAL.

Google/Microsoft sync: REAL (requires provider configuration).

Meeting join: WINDOWS-INTEGRATED (opens default browser).

11.5 Permissions
calendar.local.read, calendar.local.write, calendar.remote.sync, calendar.provider.connect.

11.6 Security
OAuth tokens in OS keychain only.

Never transmit calendar data to third parties other than the configured provider.

Audit-log provider connections and disconnections.

12. FOCUS MODES
12.1 Purpose
Context-aware modes that change notifications, sounds, wallpaper, workspace, and available apps.

12.2 Modes
Deep Work

Meeting

Evening

Weekend

Custom (user-defined)

12.3 Each mode controls
Do Not Disturb state.

Notification priority threshold.

Sound profile.

Wallpaper.

Accent color.

Active workspace.

Allowed apps (optional).

Auto-launched apps.

Pomodoro timer.

Website/app block list (informational — does not block at OS level unless implemented).

12.4 Triggers
Manual.

Schedule (time of day, day of week).

Calendar event.

Focus session start.

Manual + schedule combined.

12.5 Classification
Mode switching: REAL.

OS-level DND: WINDOWS-INTEGRATED if implemented via Windows Focus Assist APIs; otherwise APPLICATION-SIMULATED.

App blocking: APPLICATION-SIMULATED unless OS-level enforcement is implemented.

12.6 Honesty
Never claim to block apps at the OS level unless a real enforcement mechanism exists. Provide an in-app block that is clearly labeled as application-level.

13. HABIT TRACKER & JOURNAL
13.1 Purpose
Personal wellbeing and reflection tools.

13.2 Habit Tracker
Define habits with frequency (daily, weekly, custom).

Streaks, completion rate, calendar heatmap.

Reminders.

Notes per completion.

Export as CSV/JSON.

Widget: Today's Habits.

13.3 Journal
Daily entries with prompts.

Mood tracking (1–5 + tags).

Tags, search, calendar view.

Optional encryption per entry.

Export as Markdown.

Never transmits content externally.

13.4 Classification
REAL (local only).

14. SEMANTIC SEARCH
14.1 Purpose
Find content by meaning, not just keywords.

14.2 Capabilities
Local embedding model (e.g., all-MiniLM-L6-v2 via ONNX Runtime).

Index: notes, tasks, calendar events, files (authorized locations), emails (if configured), bookmarks, snippets.

Hybrid search: keyword + semantic.

Natural-language queries: "files about the Q3 budget I edited last week".

Scoped search: in:notes, in:files, from:calendar.

Incremental indexing with progress and cancellation.

Index stored in SQLite with vector extension (e.g., sqlite-vec) or a local vector store.

Re-index on demand.

Per-source opt-out.

14.3 Privacy
Never index without consent.

Never transmit embeddings externally unless the user explicitly enables cloud embeddings.

Provide "Exclude from semantic search" per note, folder, or app.

Provide "Clear index" with confirmation.

14.4 Classification
Local embedding: REAL (local).

Cloud embedding: REAL (remote, opt-in).

14.5 Permissions
ai.embedding.generate, ai.model.download, ai.inference.local.run.

15. LOCAL AI ASSISTANT
15.1 Purpose
Provide on-device AI assistance across the product.

15.2 Providers
Local: Ollama, llama.cpp (GGUF models).

Cloud (opt-in): OpenAI, Anthropic, Google, or user-configured endpoint.

15.3 Capabilities
Chat interface with conversation history.

RAG over user content (notes, files, tasks, calendar).

Inline actions:

Summarize note.

Rewrite selection.

Extract tasks from note.

Translate selection.

Explain code.

Generate title.

Continue writing.

Command palette: > ai summarize, > ai ask ....

Notes and Editor: right-click → AI actions.

Terminal: suggest a command from natural language (never auto-execute; user must confirm and edit).

15.4 Model management
Model library: browse, download, delete.

Show model size, license, and source before download.

Download requires explicit approval if > 500 MB.

Store models in application-owned storage.

Verify checksums.

15.5 Privacy
Local mode: no data leaves the device.

Cloud mode: explicit consent per provider; show what will be sent; provide a preview; allow redaction.

Never send secrets, vault contents, or files marked private.

Log every cloud request (without content) to the audit log.

15.6 Classification
Local inference: REAL (local).

Cloud inference: REAL (remote).

15.7 Permissions
ai.inference.local.run, ai.inference.cloud.run, ai.model.download.

15.8 Honesty
Never claim "AI-powered" without stating the model, provider, and whether inference is local or remote.

16. KNOWLEDGE GRAPH & BACKLINKS
16.1 Purpose
Turn notes into a connected knowledge base.

16.2 Capabilities
[[WikiLinks]] between notes.

Automatic backlink panel.

Unlinked mentions detection.

Graph view (force-directed, GPU-friendly, pauses when hidden).

Tag hierarchy and aliases.

Daily notes and templates.

Mermaid and LaTeX rendering.

Callouts (> [!note], > [!warning]).

Export to PDF, HTML, or static site.

16.3 Classification
REAL (local).

16.4 Performance
Graph view uses a worker thread.

Pauses animation when window is hidden.

Respects Reduced Motion (static layout).

Caps node count with a "show more" control.

17. SCREEN RECORDING
17.1 Purpose
Record screen, window, or region with optional audio.

17.2 Capabilities
Full screen, window, region.

Webcam overlay (picture-in-picture).

Microphone and system audio.

WebM, MP4 (where codec available), GIF.

Pause/resume.

Trim and export.

Recent recordings gallery.

Optional: convert to GIF, add captions (via STT).

17.3 Security
System audio capture requires explicit permission.

Microphone capture requires explicit permission.

Show a persistent recording indicator.

Never record without visible indication.

17.4 Classification
Screen recording: WINDOWS-INTEGRATED.

System audio: WINDOWS-INTEGRATED.

Microphone: WINDOWS-INTEGRATED.

Editing: REAL.

17.5 Permissions
screen.record, audio.system.capture, audio.microphone.capture.

18. OCR
18.1 Purpose
Extract text from images and PDFs.

18.2 Capabilities
OCR from screenshot, image file, PDF page, or clipboard image.

Languages: configurable (Tesseract traineddata or PaddleOCR models).

Copy extracted text, save as .txt, or open in editor.

Layout preservation option.

Batch processing with progress.

18.3 Classification
REAL (local model).

18.4 Permissions
ocr.image.read, ocr.pdf.read.

19. SPEECH, TTS, VOICE NOTES, AUDIO RECORDER
19.1 Speech-to-Text
Local: Whisper via ONNX Runtime or whisper.cpp.

Cloud (opt-in): provider-configured.

Dictation into any text field via global shortcut.

Transcription of audio files.

Timestamps and speaker diarization (where supported).

19.2 Text-to-Speech
Local: SAPI (Windows) or Piper TTS.

Cloud (opt-in).

Read selected text, note, or article.

Voice selection, speed, pitch.

Export to audio file.

19.3 Voice Notes
Quick capture via global shortcut.

Auto-transcribe (if STT enabled).

Save as note with audio attachment.

Waveform playback.

19.4 Audio Recorder
Microphone and system audio.

Waveform display.

Trim, fade, normalize.

Export WAV, MP3 (if codec), OGG, FLAC.

19.5 Classification
Local STT/TTS: REAL (local).

Cloud STT/TTS: REAL (remote, opt-in).

Audio capture: WINDOWS-INTEGRATED.

19.6 Permissions
stt.transcribe, tts.speak, audio.microphone.capture, audio.system.capture, stt.model.download, tts.voice.download.

20. GIT CLIENT
20.1 Purpose
Native Git UI for developers.

20.2 Capabilities
Repository list with recent, pinned, and grouped.

Status, staging, unstaging, discarding (with confirmation).

Commit with message templates and hooks awareness.

Branch: create, switch, merge, rebase (with conflict resolution UI), delete.

Remote: fetch, pull, push (never force without explicit confirmation).

Diff viewer: side-by-side and inline.

History view with graph.

Blame view.

Stash management.

Tag management.

Submodule view.

Git LFS status.

Worktree support.

20.3 Safety
Never force-push without a typed confirmation.

Never rewrite shared history without explicit warning.

Never discard uncommitted changes without confirmation.

Show exactly what will be lost before any destructive operation.

Log every destructive operation to the audit log.

20.4 Classification
WINDOWS-INTEGRATED (uses git.exe via allowlisted subprocess).

20.5 Permissions
git.repository.read, git.repository.write, git.remote.push, git.history.rewrite.

21. API CLIENT
21.1 Purpose
Test and manage HTTP, GraphQL, and WebSocket APIs.

21.2 Capabilities
Collections and folders.

Environments and variables (with secret variables stored in the vault).

Request builder: method, URL, headers, query, body (JSON, form, raw, binary).

Auth helpers: Basic, Bearer, API Key, OAuth 2.0, AWS Sig v4.

Response viewer: pretty, raw, preview, headers, cookies, timing.

GraphQL: schema introspection, query editor, variables.

WebSocket: connect, send, receive, message history.

Response history and diff.

Code generation: curl, fetch, axios, Python requests, Go, C#.

Import/export: OpenAPI, Postman Collection, HAR.

Mock server (local).

21.3 Security
Never send credentials to unconfigured hosts without confirmation.

Warn on HTTP (non-TLS) requests.

Store secrets in the vault, not in plain environment files.

Audit-log every outbound request (method + host, not body).

21.4 Classification
REAL.

21.5 Permissions
api.request.send, api.collection.manage, api.environment.manage.

22. DATABASE CLIENT
22.1 Purpose
Browse and query databases.

22.2 Capabilities
Supported: SQLite, MySQL, SQL Server, PostgreSQL.

Connection manager with stored credentials in the vault.

Schema browser: tables, views, columns, indexes, foreign keys.

Query editor with syntax highlighting, autocomplete, and history.

Results grid with sorting, filtering, export (CSV, JSON, SQL).

ER diagram generation.

Explain plan view.

Read-only mode by default.

Destructive statement confirmation (DROP, DELETE, TRUNCATE, ALTER).

Transaction control.

22.3 Security
Never auto-commit destructive statements.

Never store credentials in plain text.

Warn before connecting to production-like hosts.

Audit-log every connection and every destructive statement.

22.4 Classification
REAL.

22.5 Permissions
database.external.connect, database.external.query, database.external.write.

23. SSH / SFTP CLIENT
23.1 Purpose
Manage SSH connections and transfer files.

23.2 Capabilities
Connection manager with folders, tags, search.

Key management (generate, import, export — stored in vault).

Known hosts management.

Port forwarding (local, remote, dynamic).

Terminal sessions with tabs.

SFTP browser: upload, download, rename, delete, permissions.

Snippets for common commands.

Session recording (optional, opt-in).

23.3 Security
Never store private keys in plain text.

Verify host keys on first connect.

Warn on weak algorithms.

Audit-log every connection.

23.4 Classification
REAL.

23.5 Permissions
ssh.connect, sftp.transfer.

24. REMOTE DESKTOP & CONTAINER GUI
24.1 Remote Desktop Launcher
Profiles for RDP, VNC, Parsec, TeamViewer (launch only).

Credential storage in vault.

Launch external client or use built-in (if implemented).

Classification: WINDOWS-INTEGRATED (launch only) or REAL (if built-in).

24.2 Docker / Container GUI
List containers and images.

Start, stop, restart, remove (with confirmation).

Logs viewer.

Exec into container.

Compose file viewer.

Volume and network browser.

Classification: REAL (via Docker API).

24.3 Permissions
remote.desktop.launch.

25. ENCRYPTED VAULT, TOTP, PASSWORDS, PRIVACY DASHBOARD
25.1 Encrypted Vault
Stores: passwords, API keys, SSH keys, secure notes, files, TOTP secrets.

Encryption: libsodium sealed boxes or SQLCipher (AES-256).

Master password with Argon2id.

Auto-lock after configurable idle time.

Biometric unlock via Windows Hello where available.

Import from CSV, 1Password, Bitwarden, LastPass (with parsing warnings).

Export encrypted or plain (with confirmation).

Never sync without E2E encryption.

25.2 TOTP Authenticator
RFC 6238 TOTP.

QR import.

Manual secret entry.

Search, folders, favorites.

Copy code with auto-clear clipboard after N seconds.

25.3 Password Generator & Analyzer
Length, character classes, passphrase mode.

Strength meter.

Breach check (k-anonymity via HaveIBeenPwned API — opt-in, audit-logged).

Duplicate password detection across vault.

25.4 Privacy Dashboard
Shows: what data is stored locally, what is synced, what is sent to cloud providers, what is in the audit log.

One-click export of all user data.

One-click account deletion (with confirmation).

Telemetry status and opt-out.

Permission overview: which apps/plugins have which permissions.

25.5 Classification
Vault: REAL (local, encrypted).

Biometric unlock: WINDOWS-INTEGRATED (Windows Hello).

Breach check: REAL (remote, opt-in).

25.6 Permissions
vault.read, vault.write, vault.unlock.biometric, vault.export.

26. AUTOMATION ENGINE
26.1 Purpose
Local trigger → condition → action workflows.

26.2 Triggers
Time / schedule.

File change (watch a folder).

App launch / close.

Hotkey.

Clipboard change.

System event (lock, unlock, idle, resume).

Webhook (local HTTP endpoint).

Command palette invocation.

26.3 Actions
Launch app.

Open file / folder / URL.

Move, copy, rename, delete file (with confirmation).

Send notification.

Run allowlisted script (PowerShell, Bash, Python — each requires explicit permission).

HTTP request.

Run command palette command.

Send to companion device.

Create note / task.

Toggle focus mode.

Play sound.

26.4 Conditions
Time window.

Day of week.

App active.

File matches pattern.

Variable comparison.

User confirmation prompt.

26.5 UX
Visual flow editor (node graph).

Run history with success/failure.

Manual test run.

Enable/disable per flow.

Import/export as JSON.

Share to local registry.

26.6 Security
Script execution requires explicit permission and allowlist.

HTTP requests require explicit permission.

Never auto-run downloaded flows.

Audit-log every flow execution.

Rate-limit flows to prevent runaway loops.

26.7 Classification
REAL (local execution).

26.8 Permissions
automation.flow.create, automation.flow.run, automation.flow.import, automation.flow.export, automation.script.execute, automation.http.request.

27. PLUGIN SDK & REGISTRY
27.1 Plugin SDK
TypeScript types for the plugin API.

Scaffolding CLI.

Documentation with examples.

Capability-based permission model.

UI slots: sidebar panel, widget, command, settings page, status bar, context menu.

Sandboxed execution (Worker or separate process).

Versioned API.

27.2 Plugin Registry (Local)
Browse installed plugins.

View permissions, version, author, source.

Enable, disable, uninstall.

Update check (opt-in).

Remote registry (later — read-only browsing first).

27.3 Security
Plugins are untrusted by default.

Permission request UI before install.

High-risk permissions require explicit approval.

Plugin execution is logged.

Plugins cannot access filesystem, network, or native APIs without explicit permission.

Plugins cannot modify other plugins or core state.

27.4 Classification
REAL.

27.5 Permissions
plugin.install, plugin.execute, plugin.sdk.publish, plugin.registry.read.

28. PUBLIC LOCAL API
28.1 Purpose
Allow scripts and other apps to interact with the product.

28.2 Capabilities
HTTP API on localhost only (default).

Token-gated (bearer tokens generated in Settings).

Endpoints for: notes, tasks, calendar, clipboard, snippets, notifications.

WebSocket for events.

OpenAPI documentation.

Rate limiting.

Audit-log every request.

28.3 Security
Never bind to non-localhost without explicit approval.

Tokens are scoped (read-only, read-write, admin).

Tokens are revocable.

Tokens are stored hashed server-side.

28.4 Classification
REAL.

28.5 Permissions
public.api.enable, public.api.token.manage.

29. CLI TOOL
29.1 Purpose
Command-line access to the product.

29.2 Commands
text
myos note "Quick thought"
myos note list --tag work
myos task add "Submit report" --due tomorrow --priority high
myos task list --today
myos calendar today
myos search "query"
myos clipboard list
myos snippet add ;addr "123 Main St"
myos focus start deep-work
myos focus stop
29.3 Security
Uses the same auth as the app.

Never stores credentials in plain text.

Respects all permissions.

29.4 Classification
REAL.

30. MOBILE & WEB COMPANIONS
30.1 Mobile Companion
React Native or Flutter.

Sync: notes, tasks, calendar, clipboard (opt-in), files (opt-in).

"Send to desktop" and "Send to phone".

Notification mirroring (opt-in).

E2E encrypted sync.

Pairing via QR code.

30.2 Web Companion
Read-only by default.

Notes, tasks, calendar.

Share links for individual notes.

Auth via the same account system.

Optional: write access (opt-in).

30.3 Classification
REAL.

30.4 Permissions
companion.device.pair, companion.data.sync.

31. BROWSER EXTENSION
31.1 Purpose
Bridge the browser and the desktop app.

31.2 Capabilities
"Save to Notes" — save page, selection, or link.

"Send to Desktop" — open a link in the desktop app.

Password autofill via the vault (if built).

Clipboard sync (opt-in).

Bookmark sync (opt-in).

31.3 Security
Extension communicates only with the local app via native messaging.

Never transmits data to third parties.

Explicit permission prompts.

31.4 Classification
REAL.

32. ENTERPRISE FEATURES
32.1 Team Workspaces
Shared notes, tasks, files.

Roles: Owner, Admin, Member, Guest.

Activity feed.

Comments and mentions.

32.2 Admin Console
User management (invite, deactivate, delete).

Role assignment.

Policy configuration.

Usage analytics (aggregate, privacy-respecting).

Audit log viewer and export.

32.3 SSO (SAML / OIDC)
Configure IdP.

Enforce SSO for the organization.

Just-in-time provisioning (optional).

SCIM support (later).

32.4 Audit Export
Export audit logs as CSV or JSON.

Filter by user, action, date range.

Redact sensitive fields.

32.5 Policy Enforcement
Password policy.

MFA required.

Allowed plugins.

Allowed AI providers.

Data residency rules.

Retention rules.

32.6 Classification
REAL.

32.7 Permissions
enterprise.team.manage, enterprise.policy.enforce, enterprise.sso.configure, enterprise.audit.export.

33. CROSS-CUTTING UX IMPROVEMENTS
These apply to the existing product and to all new subsystems.

33.1 Search → Spotlight
Fuzzy matching.

Scoped search (in:, from:, tag:).

Natural language.

Preview pane.

Quick actions (Enter, Ctrl+Enter, Tab).

Search everything: apps, files, notes, tasks, calendar, emails, settings, commands, help, web (optional).

33.2 Command Palette → Extensible
Plugin-registered commands.

Parameterized commands.

Recent and pinned commands.

Aliases.

Command chaining.

33.3 Window Manager → Tiling & Layouts
Layout presets.

Layout recall.

Auto-tiling mode.

Window rules.

33.4 Workspaces → Contexts
Workspace templates.

Workspace snapshots.

Workspace sharing.

33.5 Notifications → Actionable
Inline actions.

Grouping.

History with search.

DND schedules.

33.6 Settings → Searchable & Deep-Linkable
Search across settings.

Deep links (settings://appearance/theme).

Export/import as JSON.

Per-setting reset.

33.7 Themes → Dynamic
Time-of-day theme shift.

Wallpaper-derived accent.

Seasonal theme packs.

Theme editor.

33.8 Motion → Signature Moments
Window open: scale + blur + fade.

Workspace switch: 3D card flip or parallax.

App launch: icon expands into window (FLIP).

Snap: magnetic pulse.

Notification: slide + fade + accent glow.

Lock/unlock: blur-in + scale.

First-run: choreographed onboarding.

33.9 Sound → Adaptive
Sound themes.

Contextual sounds.

Spatial audio.

Adaptive volume.

Visual equivalents always.

33.10 Plugins → Real Ecosystem
Plugin SDK.

Local registry.

Sandbox.

UI slots.

Marketplace (later).

33.11 Sync → Selective & Conflict-Free
Per-item sync toggle.

CRDT-based sync for notes/tasks.

E2E encryption.

Per-item sync status.

Time-travel history.

33.12 Performance → Adaptive
Auto performance mode.

Frame budget monitor.

Memory pressure handling.

Lazy everything.

34. EXTENDED DATABASE SCHEMA
New tables required (MySQL 8.0+ dialect; SQL Server equivalents documented separately). All tables use CHAR(36) UUIDs, UTC DATETIME(3) timestamps, foreign keys, and appropriate indexes.

text
-- Clipboard
ClipboardItems, ClipboardFavorites, ClipboardExclusions

-- Snippets
Snippets, SnippetCategories, SnippetUsage

-- Capture
Captures, CaptureAnnotations, Recordings

-- OCR
OcrJobs, OcrResults

-- Speech
Transcriptions, TtsVoices, TtsHistory

-- Tasks
Projects, Sections, Tasks, Subtasks, TaskLabels,
TaskAttachments, TaskComments, TaskRecurrence,
TaskDependencies, TimeEntries, SavedViews

-- Calendar
Calendars, CalendarEvents, CalendarReminders,
CalendarProviders, CalendarShares

-- Focus
FocusModes, FocusSessions, FocusSchedules

-- Habits & Journal
Habits, HabitCompletions, JournalEntries, MoodTags

-- AI
AiModels, AiConversations, AiMessages, AiEmbeddings,
AiPrompts, AiActions

-- Knowledge Graph
NoteLinks, NoteBacklinks, NoteTags, NoteAliases

-- Git
GitRepositories, GitCredentials (encrypted refs)

-- API Client
ApiCollections, ApiRequests, ApiEnvironments,
ApiEnvironmentVariables, ApiHistory

-- Database Client
DbConnections, DbQueryHistory, DbSavedQueries

-- SSH
SshConnections, SshKeys (encrypted refs), SshKnownHosts

-- Vault
VaultItems, VaultFolders, VaultTags, VaultAudit

-- TOTP
TotpSecrets (encrypted refs)

-- Automation
AutomationFlows, AutomationRuns, AutomationTriggers,
AutomationActions, AutomationVariables

-- Plugins
Plugins, PluginPermissions, PluginVersions,
PluginSettings, PluginUiSlots

-- Public API
ApiTokens, ApiTokenScopes, ApiRequestLog

-- Companions
CompanionDevices, CompanionSyncQueue, CompanionPairingCodes

-- Enterprise
Organizations, Teams, TeamMembers, TeamRoles,
OrgPolicies, SsoConfigurations, AuditExports
Every table must be created via a versioned migration file. No migration is executed without authorization.

35. DEFINITION OF DONE — EXTENDED
A new subsystem is complete only when all of the following are true:

Implementation meets documented acceptance criteria.

UI matches the design system.

Loading, empty, success, error, and permission-denied states exist.

Keyboard navigation works.

Accessibility reviewed (axe + manual).

Permissions enforced in main process / server, not just UI.

Tests written (unit + contract + accessibility + failure paths).

Permitted tests run; unauthorized tests not run.

Error handling and recovery considered.

Documentation updated (docs/<SUBSYSTEM>.md).

docs/CAPABILITY_MATRIX.md updated.

brain.md updated.

IMPLEMENTATION_STATUS.md updated.

docs/CHANGELOG.md updated.

Git diff reviewed.

No secrets committed.

Meaningful Git commit created.

Known limitations disclosed.

Capability classification honest.

Threat model entry added to docs/RISK_REGISTER.md.

36. GIT COMMIT EXAMPLES FOR EXPANSION PHASES
text
feat(clipboard): implement clipboard history with exclusions
feat(snippets): add trigger-based text expansion
feat(capture): implement screenshot with annotation
feat(utils): add quick utilities app
feat(emoji): add global emoji picker
feat(tasks): implement task and project manager
feat(calendar): implement local calendar
feat(calendar): add CalDAV sync
feat(focus): implement focus modes
feat(habits): add habit tracker and journal
feat(ai): add local model management
feat(ai): implement semantic search index
feat(ai): add inline AI actions to notes
feat(knowledge): add backlinks and graph view
feat(recording): implement screen recording
feat(ocr): add local OCR
feat(speech): add local speech-to-text
feat(speech): add local text-to-speech
feat(git): implement Git client with safety confirmations
feat(api): implement API client with collections and environments
feat(dbclient): implement database client with read-only default
feat(ssh): implement SSH and SFTP client
feat(vault): implement encrypted vault with Argon2id
feat(vault): add Windows Hello biometric unlock
feat(totp): implement TOTP authenticator
feat(automation): implement flow engine
feat(plugins): implement plugin SDK and local registry
feat(api): implement public local API
feat(cli): implement CLI tool
feat(companion): implement mobile pairing
feat(web): implement read-only web companion
feat(extension): implement browser extension
feat(enterprise): implement team workspaces
feat(enterprise): implement SSO
docs(brain): update engineering memory for AI subsystem
test(ai): cover semantic search boundaries
fix(vault): prevent biometric unlock after timeout
security(snippet): require explicit opt-in for global expansion
37. FINAL OPERATING INSTRUCTIONS FOR THE EXPANSION
Before starting any expansion phase:

Re-read v7.0 in full.

Re-read this expansion in full.

Inspect the current repository state.

Inspect Git status; preserve uncommitted work.

Verify Phase E0 (Foundation Audit) is complete and honest.

Update brain.md with the current baseline.

Update IMPLEMENTATION_STATUS.md.

Select the next phase from §4.

Build one vertical slice at a time.

Stop before any operation requiring approval.

During the expansion:

Reuse the existing design system, motion system, sound system, permission model, IPC contract, database layer, audit log, and notification system.

Never invent parallel infrastructure.

Never claim a feature is REAL if it is SIMULATED.

Never claim a feature is WINDOWS-INTEGRATED if it is only INFORMATIONAL.

Never download, install, or execute anything without authorization.

Never transmit user data externally without explicit consent.

Never log secrets.

Never bypass permission checks.

Update documentation, brain.md, and IMPLEMENTATION_STATUS.md after every meaningful unit.

Commit every meaningful unit to Git.

Record the commit in brain.md.

When blocked:

State the exact blocker.

Record what has been completed.

Identify what requires approval or unavailable tooling.

Continue with independent, safe work where possible.

At the end of an authorized expansion session, provide:

text
Implementation Summary
Completed Features
Partially Completed Features
Unsupported Features
Known Limitations
Security Review
Accessibility Review
Performance Review
Test Results (written vs actually run)
Files Created or Changed
Git Commits Created
Documentation Updated
Database Status
Windows Integration Status
AI Subsystem Status
Vault Status
Automation Status
Plugin Status
Companion Status
Enterprise Status
Current brain.md Status
Remaining Work
Required User Approvals
Recommended Next Task
Execution Status
Mandatory honesty block:

text
APPLICATION EXECUTED:            NO
DEV SERVER STARTED:              NO
DEPENDENCIES INSTALLED:          NO
DATABASE MIGRATIONS EXECUTED:    NO
DATABASE SERVER INSTALLED:       NO
AI MODEL DOWNLOADED:             NO
WINDOWS MODIFICATIONS PERFORMED: NO
ELEVATION REQUESTED:             NO
PRODUCTION DEPLOYMENT PERFORMED: NO
If any operation was explicitly authorized and performed, report it accurately. Never claim otherwise.

38. FINAL MANDATORY DIRECTIVE
ANTIGRAVITY: EXTEND THE PRODUCT WITHOUT BREAKING IT. DO NOT MAKE MISTAKES.

The expansion adds intelligence, productivity depth, daily-use utilities, developer power tools, security, automation, extensibility, and platform reach. Each addition must feel like it was always part of the product.

Do not build shallow versions of everything. Build coherent, complete, tested, honest subsystems. Prefer depth over breadth.

Do not claim simulated functionality is native. Do not invent functionality. Do not bypass permissions. Do not expose secrets. Do not transmit user data externally without consent. Do not install, download, or execute anything without authorization.

Use brain.md for engineering memory. Use the Decision Authority Matrix for safe decisions. Use the Assumptions Register to keep assumptions visible. Use the capability model to maintain technical honesty. Use Git after every meaningful implementation unit.

Begin with Phase E0 — Foundation Audit. Do not launch the application. Do not start a development server. Do not install dependencies. Do not execute migrations. Do not download AI models. Do not modify Windows.

Proceed with safe, documented, reversible repository work.

APPENDIX A — WHAT THIS EXPANSION ADDS
Daily-use utilities — clipboard manager, snippet expander, screenshot & annotation, quick utilities, emoji picker.

Productivity loop — task manager, calendar, focus modes, habit tracker, journal.

Local intelligence — semantic search, local AI assistant, knowledge graph, inline AI actions.

Capture & media — screen recording, OCR, speech-to-text, text-to-speech, voice notes, audio recorder.

Developer power tools — Git client, API client, database client, SSH/SFTP, remote desktop launcher, Docker GUI.

Security & trust — encrypted vault, TOTP authenticator, password generator, privacy dashboard.

Automation & extensibility — automation engine, plugin SDK, local plugin registry, public local API, CLI tool.

Platform reach — mobile companion, web companion, browser extension.

Enterprise — team workspaces, admin console, SSO, audit export, policy enforcement.

Cross-cutting UX upgrades — Spotlight search, extensible command palette, tiling layouts, workspace templates, actionable notifications, searchable settings, dynamic themes, signature motion, adaptive sound, real plugin ecosystem, selective CRDT sync, adaptive performance.

Extended permission schema — 60+ new permission keys.

Extended database schema — 40+ new tables.

Extended capability classifications — every new subsystem classified honestly.

Extended engineering memory — new brain.md sections, new docs, new risk register entries.

Extended Definition of Done — 20 criteria per subsystem.

Extended Git commit conventions — new commit message examples.

Extended honesty block — AI model download, vault, automation, plugin, companion, and enterprise status added.



MASTER GOOGLE ANTIGRAVITY DEVELOPMENT PROMPT
Boot & Login Experience — Version 1.0
Cinematic Startup Sequence with Integrated Authentication
Status: Subsystem Specification (companion to v7.0 Core and v8.0 Expansion)
Scope: Application cold-start experience — boot animation, login screen, account creation entry
Target Platform: Windows 10/11 (x64 first, ARM64 evaluated)
Development Environment: Google Antigravity
Execution Mode: BUILD-FIRST / USER-AUTHORIZED EXECUTION ONLY
Capability Honesty: Mandatory — every element classified REAL / WINDOWS-INTEGRATED / APPLICATION-SIMULATED / INFORMATIONAL / FUTURE / UNSUPPORTED

0. ABSOLUTE DIRECTIVE
DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.
This document specifies the first impression of the entire product. It is the moment that decides whether the user trusts the application. It must be polished, cinematic, fast, accessible, and — above all — honest.

The boot animation and login screen are APPLICATION-SIMULATED experiences. They do not boot Windows. They do not replace Windows Hello. They do not lock the operating system. Every claim in the UI must be truthful.

The single most important behavioral rule of this subsystem:

The full boot animation must run ONLY on a genuine application cold start (npm run dev, npm start, packaged launch, or explicit restart). It must NEVER replay on renderer refresh, hot-module reload, React re-render, navigation, or route change.

If Antigravity cannot guarantee this, the subsystem is not complete.

1. PURPOSE & SCOPE
1.1 Purpose
Provide a premium, cinematic launch experience that:

Introduces the product identity with an original animated boot sequence.

Transitions seamlessly into an integrated login screen.

Offers account creation as a clearly accessible secondary action in a corner.

Feels fast, smooth, and intentional.

Respects accessibility, performance, and user preferences.

Never replays on refresh — only on genuine app launch.

1.2 Scope
In scope:

Boot splash animation.

Loading/progress indication.

Transition into login screen.

Login form (email + password, MFA challenge, biometric if available).

"Create account" entry point in a corner.

"Continue without account" (local profile mode) where supported.

Transition from login into the desktop shell.

Reduced-motion and performance-mode variants.

Sound design for boot and login.

Accessibility for the entire sequence.

Cold-start detection mechanism.

Out of scope:

The signup form itself (specified in v7.0 §15.2 — this document only defines the entry point and transition into it).

The desktop shell (specified in v7.0 §18).

The lock screen (specified in v7.0 §37 — this is a separate, later experience).

Windows-level boot, login, or Hello integration (WINDOWS-INTEGRATED features, if implemented, must be labeled honestly).

2. CRITICAL RULE — COLD START ONLY
2.1 The rule
The full boot animation sequence must execute exactly once per application process launch and never again until the process is fully terminated and restarted.

2.2 What counts as a cold start (animation plays)
Event	Animation plays?
npm run dev first launch	✅ YES
npm start (production build)	✅ YES
Packaged .exe launch	✅ YES
User selects "Restart application" from the menu	✅ YES
Explicit app.relaunch() after update	✅ YES
Second instance opened while first is running	❌ NO (focus existing window)
OS resumes from sleep	❌ NO
App window restored from minimized	❌ NO
2.3 What does NOT count as a cold start (animation must NOT play)
Event	Animation plays?
Renderer refresh (Ctrl+R, F5)	❌ NO
Vite / webpack HMR reload	❌ NO
React StrictMode double-mount in dev	❌ NO
Route change / navigation	❌ NO
Component re-render	❌ NO
Window resize	❌ NO
Workspace switch	❌ NO
Theme change	❌ NO
Logout → return to login	⚠️ Login shows, but boot animation does NOT replay
Session expiration → login	⚠️ Login shows, but boot animation does NOT replay
User manually locks the app	⚠️ Lock screen shows, not boot
2.4 How to guarantee this — the mechanism
The boot animation must be gated by a main-process-owned, in-memory, per-process-launch flag that is never persisted and never derivable from renderer state.

2.4.1 Main process
typescript
// apps/desktop/electron/bootState.ts

/**
 * Boot state is process-local. It is created fresh every time the
 * Electron main process starts and is destroyed when the process exits.
 * It is NEVER written to disk, NEVER stored in SQLite, NEVER persisted
 * to sessionStorage or localStorage.
 */
interface BootState {
  /** True until the first renderer has consumed the cold-boot signal. */
  isFirstRendererLoad: boolean;
  /** Monotonic process start timestamp (not persisted). */
  processStartedAt: number;
  /** Unique ID for this process launch. */
  launchId: string;
}

const bootState: BootState = {
  isFirstRendererLoad: true,
  processStartedAt: Date.now(),
  launchId: crypto.randomUUID(),
};

/**
 * Called exactly once per renderer, and only for the first renderer
 * attached to this main process. Subsequent calls (from reloads,
 * new windows, HMR) return false.
 */
export function consumeColdBootSignal(): {
  isColdBoot: boolean;
  launchId: string;
} {
  const isColdBoot = bootState.isFirstRendererLoad;
  if (isColdBoot) {
    bootState.isFirstRendererLoad = false;
  }
  return { isColdBoot, launchId: bootState.launchId };
}
2.4.2 IPC channel
Register a single, read-and-consume IPC channel:

text
boot:consume-cold-signal  →  { isColdBoot: boolean; launchId: string }
This channel is:

Read-only from the renderer's perspective.

Consumable exactly once per process (idempotent after first call).

Validated with Zod.

Available only during the boot window (before the desktop shell mounts).

2.4.3 Preload
typescript
// apps/desktop/preload/boot.ts
contextBridge.exposeInMainWorld('boot', {
  consumeColdSignal: (): Promise<{ isColdBoot: boolean; launchId: string }> =>
    ipcRenderer.invoke('boot:consume-cold-signal'),
});
2.4.4 Renderer
typescript
// apps/desktop/renderer/boot/useColdBoot.ts
export function useColdBoot() {
  const [state, setState] = useState<
    'checking' | 'cold' | 'warm'
  >('checking');

  useEffect(() => {
    let cancelled = false;
    window.boot.consumeColdSignal().then(({ isColdBoot }) => {
      if (cancelled) return;
      setState(isColdBoot ? 'cold' : 'warm');
    });
    return () => { cancelled = true; };
  }, []); // <- empty deps, runs once per renderer mount

  return state;
}
2.4.5 Rule for HMR safety
During development, Vite/webpack HMR may remount React trees. The useEffect with empty deps may run again. The IPC channel is consumable-once, so the second call returns isColdBoot: false. This is the guarantee.

Do not use sessionStorage, localStorage, cookies, or any renderer-persisted state to gate the boot animation. Those survive refreshes and would break the rule in the other direction (they would suppress the animation on a genuine cold start if the renderer is reused).

2.4.6 Second-instance handling
Use app.requestSingleInstanceLock(). If a second instance is launched while the first is running:

Do not start a new process.

Focus the existing window.

Do not replay the boot animation.

2.4.7 Relaunch handling
If the app relaunches itself (e.g., after an update), call app.relaunch() and app.exit(). The new process will have a fresh bootState, so the animation will play. This is correct — a relaunch is a genuine cold start.

2.5 Acceptance criteria for §2
Launching the app via npm run dev shows the full boot animation exactly once.

Pressing Ctrl+R in the renderer does not replay the boot animation.

Editing a React file and triggering HMR does not replay the boot animation.

Navigating between routes does not replay the boot animation.

Logging out returns to the login screen (not the boot animation).

Restarting the app via the app menu replays the boot animation.

Opening a second instance focuses the first window and does not replay the animation.

The mechanism works identically in dev and packaged builds.

No boot state is ever written to disk, SQLite, sessionStorage, or localStorage.

3. BOOT SEQUENCE — STAGE BY STAGE
The boot sequence is a deterministic state machine. Every stage has an explicit duration, a minimum and maximum time, an exit condition, and a reduced-motion variant.

3.1 State machine
text
IDLE
  → CONSUME_COLD_SIGNAL
      → (cold)   COLD_BOOT
      → (warm)   WARM_BOOT
      → (error)  BOOT_ERROR

COLD_BOOT
  → STAGE_VOID          (black screen, 80–120 ms)
  → STAGE_LOGO          (logo reveal, 500–900 ms)
  → STAGE_LOADER        (progress indication, 600–2000 ms)
  → STAGE_HANDOFF       (fade out, 300–500 ms)
  → LOGIN_ENTRY

WARM_BOOT
  → LOGIN_ENTRY         (no animation; instant)

LOGIN_ENTRY
  → LOGIN_READY         (login panel interactive)
  → (submit)            AUTHENTICATING
  → (success)           DESKTOP_HANDOFF
  → (failure)           LOGIN_ERROR
  → (create account)    SIGNUP_ENTRY
  → (local profile)     LOCAL_PROFILE_ENTRY

AUTHENTICATING
  → (mfa required)      MFA_CHALLENGE
  → (success)           DESKTOP_HANDOFF
  → (failure)           LOGIN_ERROR

MFA_CHALLENGE
  → (success)           DESKTOP_HANDOFF
  → (failure)           MFA_ERROR
  → (cancel)            LOGIN_READY

SIGNUP_ENTRY
  → (back)              LOGIN_READY
  → (success)           DESKTOP_HANDOFF

LOCAL_PROFILE_ENTRY
  → (success)           DESKTOP_HANDOFF

DESKTOP_HANDOFF
  → DESKTOP

BOOT_ERROR
  → (retry)             COLD_BOOT
  → (safe mode)         DESKTOP_SAFE
3.2 Stage durations
Stage	Min	Target	Max	Reduced Motion
STAGE_VOID	60 ms	100 ms	150 ms	40 ms (instant black)
STAGE_LOGO	400 ms	700 ms	1200 ms	200 ms (fade only, no scale)
STAGE_LOADER	400 ms	1200 ms	2500 ms	300 ms (no spinner; static dot)
STAGE_HANDOFF	200 ms	350 ms	500 ms	150 ms (fade only)
LOGIN_ENTRY (panel reveal)	200 ms	350 ms	600 ms	150 ms (fade only)
DESKTOP_HANDOFF	250 ms	400 ms	700 ms	200 ms (fade only)
Rule: The total cold-boot sequence (VOID → LOGO → LOADER → HANDOFF) must not exceed 3 seconds on reference hardware, and must not be shorter than 1.2 seconds even if all async work completes instantly (to avoid a jarring flash).

Rule: The boot sequence must wait for both:

The minimum display duration, and

The application's readiness signal (preload, main-process services, session restoration).

Whichever finishes last determines the exit from STAGE_LOADER.

4. STAGE_VOID — The Black Screen
4.1 Purpose
A brief, intentional pause before the logo. It signals "something is starting" and prevents a flash of unstyled content.

4.2 Behavior
Pure black (#000000) in dark theme.

Pure near-black (#0d1015) in light theme (never a jarring white flash).

No text, no logo, no spinner.

Optional: a single 1-pixel accent-colored dot in the dead center, at 20% opacity, fading in over the stage duration. This is the seed of the logo reveal.

4.3 Accessibility
prefers-reduced-motion: reduce to 40 ms or skip entirely.

Never show a flashing element.

Never show high-contrast content that would shock.

4.4 Performance
No animations that require JS.

Rendered as part of the initial HTML/CSS so it appears before React hydrates.

5. STAGE_LOGO — The Identity Reveal
5.1 Purpose
Introduce the product identity with a memorable, original animation. This is the "moment" of the boot.

5.2 Design requirements
The logo must be original — no Microsoft, Apple, Ubuntu, or third-party OS branding.

The logo must be vector (SVG) for crisp rendering at any DPI.

The logo must work as a monochrome glyph in High Contrast mode.

The logo must have an accessible name announced to screen readers.

5.3 Animation composition
The logo reveal is a layered sequence. Each layer is independent and can be tuned.

Layer	Element	Animation	Duration	Delay
L1	Accent dot	Scale 0.5 → 1.0, opacity 0 → 1	300 ms	0 ms
L2	Logo glyph	Opacity 0 → 1, scale 0.92 → 1.0	500 ms	100 ms
L3	Logo glow	Radial gradient opacity 0 → 0.35	600 ms	200 ms
L4	Subtle ring	Scale 0.6 → 1.1, opacity 0.4 → 0	800 ms	250 ms
L5	Wordmark	Opacity 0 → 1, translateY 6px → 0	400 ms	500 ms
L6	Tagline (optional)	Opacity 0 → 0.6	400 ms	700 ms
Easing: cubic-bezier(0.2, 0, 0, 1) (decelerate) for most layers. L4 ring uses cubic-bezier(0.05, 0.7, 0.1, 1).

Total: ~900 ms.

5.4 Reduced-motion variant
L1: instant

L2: fade only (no scale)

L3: instant

L4: skipped

L5: fade only (no translate)

L6: instant

Total: ~300 ms

5.5 Performance-mode variant
L4 ring: skipped

L3 glow: reduced opacity

Total: ~600 ms

5.6 Sound
A single, subtle "boot chime" plays at the start of STAGE_LOGO.

Original or properly licensed audio only.

Volume respects the user's system volume and app sound settings.

Never plays if sound is muted, if ENABLE_WEB_AUDIO_SOUNDS=false, or if the user disabled boot sounds.

Duration: 400–800 ms.

Frequency: gentle, low-to-mid range, no sharp transients.

Visual equivalent: the logo reveal itself. Sound is never the sole indicator.

5.7 Accessibility
Screen reader announcement: "Starting [Product Name]."

Logo has role="img" and aria-label="[Product Name] logo".

No rapid flashing (well below 3 Hz).

High Contrast mode: logo renders as a solid monochrome glyph with a visible border.

6. STAGE_LOADER — Progress Indication
6.1 Purpose
Communicate that the application is initializing and provide honest progress feedback.

6.2 Honest progress rule
Never show a fake progress bar.

If real progress can be measured (e.g., number of services initialized, number of migrations checked), show it. If it cannot, show an indeterminate indicator — never a bar that pretends to move.

6.3 Initialization tasks (real)
The loader reflects actual, measurable initialization:

Task	Weight	Can fail?
Preload bridge ready	5%	No
Main process services ready	15%	Yes
Local database open + migrate check	20%	Yes
Session restoration	15%	Yes
Capability detection	10%	No
Application registry load	10%	Yes
Theme + settings load	10%	No
Sync queue hydration	10%	Yes
Font + asset preload	5%	No
Total: 100%.

6.4 Visual design
The loader uses one of the following, chosen by the design system:

Option A — Orbiting dot (default):

A small accent-colored dot orbits a circle of radius R.

The orbit trail fades behind the dot.

R = 24 px at 100% DPI, scaled by devicePixelRatio.

Orbit duration: 1400 ms per revolution.

GPU-composited (transform: rotate() on a container, not per-frame JS).

Option B — Breathing pulse:

A soft accent-colored circle pulses at 40% → 60% opacity.

Period: 1800 ms.

Used when a spinner would feel too busy.

Option C — Segmented ring:

A ring of N segments (N = 8), each fading in sequence.

Segment duration: 160 ms.

Loop duration: 1280 ms.

Rule: Only one loader style is active at a time. It is selected by the design system, not per-render.

6.5 Progress text
Below the loader, an optional line of text:

text
Initializing…
Loading your workspace…
Restoring session…
Almost ready…
Rules:

Text must be truthful. "Restoring session" only appears while session restoration is actually running.

Text must not cycle faster than 800 ms per message.

Text must be localized via the i18n system.

Text must be announced to screen readers via aria-live="polite".

6.6 Failure handling
If a task fails:

The loader stops.

A clear, honest error message appears (see §12).

The user is offered: Retry, Continue in safe mode (where safe), View details, Quit.

6.7 Reduced-motion variant
Loader becomes a static accent dot.

Progress text updates normally.

Total loader duration still respects the minimum.

6.8 Performance
Loader uses transform and opacity only.

No layout-triggering animations.

No continuous canvas rendering.

Loader is paused if the window is hidden (though during boot the window is visible).

7. STAGE_HANDOFF — Transition to Login
7.1 Purpose
Smoothly dissolve the boot sequence into the login screen.

7.2 Animation
Element	Animation	Duration	Easing
Logo	Opacity 1 → 0, scale 1.0 → 1.04	350 ms	cubic-bezier(0.3, 0, 0.8, 0.15)
Loader	Opacity 1 → 0	250 ms	same
Background	Cross-fade from boot gradient to login wallpaper	400 ms	cubic-bezier(0.2, 0, 0, 1)
Login panel	Opacity 0 → 1, translateY 12px → 0, scale 0.98 → 1.0	350 ms	cubic-bezier(0.2, 0, 0, 1)
Total: ~750 ms, overlapping.

7.3 Reduced-motion variant
Logo and loader fade out in 150 ms.

Login panel fades in over 200 ms. No translate, no scale.

8. LOGIN SCREEN
8.1 Purpose
Provide a secure, elegant, keyboard-first login experience with a clearly accessible account-creation entry point.

8.2 Layout
text
┌──────────────────────────────────────────────────────────────┐
│                                                  [Create     │
│                                                   account] → │
│                                                              │
│                                                              │
│                    ┌────────────────────┐                    │
│                    │                    │                    │
│                    │   [Avatar / Logo]  │                    │
│                    │                    │                    │
│                    │   Welcome back     │                    │
│                    │                    │                    │
│                    │   [Email field]    │                    │
│                    │   [Password field] │                    │
│                    │   [☐ Remember me]  │                    │
│                    │                    │                    │
│                    │   [   Sign in   ]  │                    │
│                    │                    │                    │
│                    │   Forgot password? │                    │
│                    │                    │                    │
│                    │   ─── or ───       │                    │
│                    │                    │                    │
│                    │   [Continue local] │                    │
│                    │                    │                    │
│                    └────────────────────┘                    │
│                                                              │
│                                                              │
│  [version]                              [privacy] [terms]   │
└──────────────────────────────────────────────────────────────┘
8.3 Background
Uses the active wallpaper, blurred and darkened (acrylic-style).

If no wallpaper is set, uses a subtle animated gradient (paused in Performance Mode).

If Reduced Motion is enabled, uses a static gradient.

The background must never reduce text contrast. A scrim is always applied.

8.4 Login panel
Centered card with acrylic surface.

Max width: 400 px.

Padding: 32 px.

Corner radius: --radius-large (16 px).

Shadow: layered elevation token.

Border: 1 px subtle border + 1 px inner highlight.

The panel is the focus target on entry.

8.5 Fields
Email field:

type="email", autocomplete="username".

aria-label or associated <label>.

Validated on blur and on submit.

Error text appears below, associated via aria-describedby.

No layout shift when errors appear (reserve space).

Password field:

type="password", autocomplete="current-password".

Show/hide toggle (icon button, aria-pressed).

Caps Lock indicator (detected via KeyboardEvent.getModifierState('CapsLock')).

Validated on submit only.

Remember me:

Checkbox, autocomplete not applicable.

Tooltip explains what is remembered and where.

Default: unchecked (privacy-first).

Submit button:

Primary action.

Disabled while pending.

Shows a subtle inline spinner during authentication.

Full keyboard activation (Enter submits).

Forgot password link:

Opens the forgot-password flow.

Never reveals whether an email exists.

Divider + local profile:

"or" divider.

"Continue with local profile" button — only shown if local profile mode is enabled.

Clearly labeled as local-only: "Your data stays on this device."

8.6 Create account entry — the corner link
This is the critical detail the user requested.

Placement: Top-right corner of the screen.

Design:

Text: "Create account" or "New here? Create account".

Style: subtle link, accent color on hover.

Icon: a small + or user-plus glyph.

Always visible, always keyboard-focusable.

Minimum touch target: 44×44 px (visual size may be smaller, but the hit area must be ≥ 44 px).

aria-label="Create a new account".

Behavior:

Clicking or activating opens the signup flow.

Does not reload the app.

Does not replay the boot animation.

Transitions into the signup screen with the same motion language as the login panel.

Responsive behavior:

On narrow windows (< 600 px), the link remains in the top-right but may shrink to an icon + tooltip.

Never moves to a location that would be clipped or hidden.

Accessibility:

Fully keyboard reachable.

Focus ring always visible.

Screen reader announces: "Create a new account, link" or "Create a new account, button".

Honesty:

If signup is disabled (e.g., offline, or local-only build), the link must be hidden or disabled with a clear explanation — never a dead link.

8.7 Secondary entries
Depending on configuration, additional entries may appear below the login form:

"Continue with local profile" (if enabled).

"Sign in with Windows Hello" (if WINDOWS-INTEGRATED biometric is implemented — labeled honestly).

"Sign in with SSO" (if enterprise SSO is configured).

"Recover account" (link to recovery flow).

Rule: Never show a sign-in option that does not work. If a provider is unavailable, hide it or disable it with an explanation.

8.8 Footer
App version (from package.json or build metadata).

Privacy policy link.

Terms of service link.

Optional: "Check for updates" link.

All footer text must meet contrast requirements (≥ 4.5:1 for normal text).

8.9 Motion
Element	Animation	Duration	Delay
Panel	Opacity 0 → 1, translateY 12px → 0	350 ms	0 ms
Avatar/Logo	Opacity 0 → 1, scale 0.9 → 1.0	400 ms	100 ms
Welcome text	Opacity 0 → 1	300 ms	180 ms
Fields	Opacity 0 → 1, translateY 6px → 0	250 ms each	240/300 ms
Submit button	Opacity 0 → 1, scale 0.96 → 1.0	250 ms	380 ms
Footer	Opacity 0 → 1	300 ms	450 ms
Corner "Create account"	Opacity 0 → 1, translateX 6px → 0	300 ms	200 ms
Reduced-motion variant: all fades only, no translate or scale, total ~200 ms.

9. ACCOUNT CREATION ENTRY FLOW
9.1 Transition from login to signup
When the user activates "Create account":

The login panel animates out: opacity 1 → 0, translateY 0 → -8px, 250 ms.

The signup panel animates in: opacity 0 → 1, translateY 12px → 0, 350 ms.

The corner link updates to "Back to sign in".

Focus moves to the first field of the signup form.

A screen reader announcement: "Create a new account. Form."

The boot animation is not replayed.

9.2 Signup form
The signup form itself is specified in v7.0 §15.2. This document only defines:

The transition into it.

The transition back to login.

The corner link behavior.

9.3 Returning to login
From signup, a "Back to sign in" link returns to login with the reverse animation.

10. DESKTOP HANDOFF — Transition into the App
10.1 Purpose
After successful authentication (or local profile entry), transition smoothly into the desktop shell.

10.2 Animation
Element	Animation	Duration	Easing
Login panel	Opacity 1 → 0, scale 1.0 → 0.98	250 ms	cubic-bezier(0.3, 0, 0.8, 0.15)
Background	Blur 20px → 0px, brightness 0.7 → 1.0	400 ms	cubic-bezier(0.2, 0, 0, 1)
Desktop shell	Opacity 0 → 1, scale 1.02 → 1.0	400 ms	cubic-bezier(0.2, 0, 0, 1)
Taskbar/Dock	translateY 20px → 0	350 ms	delay 150 ms
Desktop icons	Staggered fade-in	40 ms each	delay 200 ms
Widgets (if visible)	Fade-in	300 ms	delay 300 ms
Total: ~700 ms.

10.3 Reduced-motion variant
All fades, no transforms.

Total ~400 ms.

10.4 Sound
A subtle "welcome" chime plays at the start of the handoff.

Respects all sound settings.

Visual equivalent: the desktop shell itself.

10.5 Accessibility
Screen reader announcement: "Signed in. Desktop ready."

Focus moves to the desktop shell's default focus target (taskbar or first window, per the shell spec).

Focus is never trapped on the login screen after handoff.

11. ERROR HANDLING
11.1 Boot errors
If a boot initialization task fails:

The loader stops.

An error card replaces the loader.

The card contains:

What happened: a plain-language description.

Why it happened: when known.

What the user can do: Retry, Safe mode, View details, Quit.

Technical details: expandable, non-sensitive.

The error card is keyboard-navigable.

The error is logged to the diagnostic log (never containing secrets).

11.2 Login errors
Error	UI message	Action
Invalid credentials	"The email or password is incorrect."	Stay on login
Email not verified	"Please verify your email. Resend verification?"	Show resend link
MFA required	(Transition to MFA challenge)	Show MFA field
MFA invalid	"The code is incorrect or expired."	Stay on MFA
Account locked	"Too many attempts. Try again in N minutes."	Show countdown
Rate limited	"Too many attempts. Please wait."	Disable submit
Network error	"Cannot reach the server. Check your connection."	Retry, Offline mode
Server error	"Something went wrong on our side. Try again."	Retry
Token reuse detected	"Your session was ended for security. Please sign in again."	Return to login
Rule: Never reveal whether an email exists (no user enumeration).

Rule: Never show a raw stack trace.

Rule: Every error must be actionable.

11.3 Safe mode
If the app fails to boot twice in a row, offer Safe Mode:

Disables plugins, automation, widgets, and heavy subsystems.

Loads the desktop shell with minimal services.

Shows a banner: "Safe mode — some features are disabled."

Provides a "Restart normally" action.

Safe mode is APPLICATION-SIMULATED — it is an in-app mode, not a Windows mode. Label it honestly.

12. REDUCED MOTION, PERFORMANCE MODE, AND ACCESSIBILITY
12.1 Reduced Motion
When prefers-reduced-motion: reduce is detected, or the user enables "Reduced Motion" in Settings:

All transforms are removed or minimized.

All animations are shortened.

The boot sequence still runs, but with fades only.

The loader becomes static.

The desktop handoff is a simple cross-fade.

12.2 Performance Mode
When Performance Mode is enabled:

The loader uses a simpler style (no orbiting dot).

Background blur is reduced.

Particle/gradient effects are disabled.

Sound is still available but at a reduced default volume.

The boot sequence total time is unchanged (perceived performance must not suffer).

12.3 High Contrast
The logo renders as a solid monochrome glyph.

The loader uses a high-contrast stroke.

The login panel uses a solid background, not acrylic.

Focus rings are always visible.

No color-only status communication.

12.4 Screen readers
All stages announce their state via aria-live="polite" (or assertive for errors).

The logo has an accessible name.

The loader has an accessible name and value.

The login form uses semantic HTML (<form>, <label>, <input>, <button>).

Errors are associated with their fields.

Focus order is logical.

Focus is visible at all times.

12.5 Keyboard
The entire sequence is keyboard-navigable.

Enter submits the login form.

Escape clears non-destructive state (e.g., closes the error card).

Tab cycles through focusable elements in logical order.

The "Create account" corner link is reachable via Tab from the top of the page.

No keyboard trap.

12.6 Internationalization
All user-facing strings use translation keys.

The sequence supports RTL layouts.

The corner link position mirrors correctly in RTL.

Fonts are selected via the font fallback system.

Date, time, and number formatting is locale-aware.

13. SOUND DESIGN
13.1 Sounds in this subsystem
Event	Sound	Duration	Category
Boot start	Boot chime	600 ms	SYSTEM
Login success	Welcome chime	400 ms	SUCCESS
Login failure	Soft error tone	300 ms	ERROR
Account creation start	Subtle transition	200 ms	UI
Desktop handoff	Welcome chime	400 ms	SYSTEM
13.2 Rules
All sounds are original or properly licensed.

No copyrighted OS sounds.

Volume respects user settings and system mute.

Every sound has a visual equivalent.

Sound is never the sole indicator of status.

If ENABLE_WEB_AUDIO_SOUNDS=false, no sounds play.

If the user disabled boot sounds, none play.

Sounds are rate-limited (no overlapping chaos).

14. PERFORMANCE BUDGETS
Metric	Target
Time to first pixel (VOID)	< 100 ms
Time to logo visible	< 300 ms
Time to loader visible	< 700 ms
Total cold-boot to login ready	< 3 s on reference hardware
Warm-boot to login ready	< 500 ms
Frame rate during boot animation	60 FPS target, never below 45 FPS
Memory during boot	< 200 MB peak
CPU during boot	< 15% average
Rule: The boot sequence must never block the main thread. All animations are CSS/compositor-driven. No synchronous work in animation frames.

Rule: The boot sequence must not delay the app's actual readiness. If the app is ready before the minimum display time, wait. If the app is slow, show honest progress.

15. CAPABILITY CLASSIFICATION
Element	Classification	Notes
Boot animation	APPLICATION-SIMULATED	Does not boot Windows
Logo reveal	APPLICATION-SIMULATED	Original asset
Loader	REAL	Reflects real initialization
Login form	REAL	Uses the auth system
Create account link	REAL	Opens the signup flow
Local profile mode	REAL	Local-only
Windows Hello sign-in	WINDOWS-INTEGRATED (if implemented)	Labeled honestly
SSO sign-in	REAL (requires IdP)	Labeled honestly
Safe mode	APPLICATION-SIMULATED	In-app mode
Boot sound	REAL (local audio)	Original or licensed
Rule: Never claim the boot animation boots Windows. Never claim the login screen is the Windows login screen. Never claim safe mode is Windows Safe Mode.

16. FILES TO CREATE
text
apps/desktop/
├── electron/
│   ├── bootState.ts                 # process-local boot flag
│   ├── ipc/
│   │   └── boot.ts                  # boot:consume-cold-signal handler
│   └── window/
│       └── createMainWindow.ts      # window creation with boot gating
├── preload/
│   └── boot.ts                      # contextBridge for boot API
└── renderer/
    ├── boot/
    │   ├── BootSequence.tsx         # top-level state machine
    │   ├── useColdBoot.ts           # cold-boot detection hook
    │   ├── stages/
    │   │   ├── StageVoid.tsx
    │   │   ├── StageLogo.tsx
    │   │   ├── StageLoader.tsx
    │   │   └── StageHandoff.tsx
    │   └── BootError.tsx
    ├── auth/
    │   ├── LoginScreen.tsx
    │   ├── CreateAccountLink.tsx    # corner entry
    │   ├── MfaChallenge.tsx
    │   └── LoginError.tsx
    └── desktop/
        └── DesktopHandoff.tsx       # transition into shell

packages/
├── contracts/
│   └── boot/
│       └── boot.contract.ts         # Zod schemas for boot IPC
└── ui/
    └── boot/
        ├── BootLogo.tsx             # original SVG logo
        ├── BootLoader.tsx           # loader variants
        └── BootSound.ts             # sound trigger

assets/
├── branding/
│   ├── logo.svg
│   ├── logo-mono.svg                # high contrast
│   └── wordmark.svg
└── sounds/
    ├── boot-chime.ogg
    ├── welcome-chime.ogg
    └── error-tone.ogg

docs/
├── BOOT_EXPERIENCE.md
├── LOGIN_UX.md
└── SOUND_DESIGN.md (extend)

brain.md (extend)
17. IMPLEMENTATION PHASES
Phase B0 — Boot state mechanism
Implement bootState.ts in the main process.

Implement the boot:consume-cold-signal IPC channel with Zod validation.

Implement the preload bridge.

Implement useColdBoot.ts in the renderer.

Write unit tests proving:

First call returns isColdBoot: true.

Second call returns isColdBoot: false.

Reloading the renderer does not replay the boot.

Write an integration test (within authorization) proving HMR does not replay.

Exit criteria: Cold-boot detection is provably correct.

Phase B1 — Boot sequence UI
Implement STAGE_VOID.

Implement STAGE_LOGO with the original SVG logo.

Implement STAGE_LOADER with honest progress.

Implement STAGE_HANDOFF.

Wire to the real initialization tasks.

Implement reduced-motion and performance variants.

Implement the boot sound.

Exit criteria: The boot animation runs once per cold start, respects preferences, and never replays on refresh.

Phase B2 — Login screen
Implement the login panel with all fields.

Implement the corner "Create account" link.

Implement error states.

Implement the transition to signup.

Implement the transition to MFA.

Implement the transition to desktop handoff.

Implement local profile entry (if enabled).

Implement Windows Hello entry (if implemented; labeled honestly).

Exit criteria: Login works, is keyboard-accessible, is screen-reader-friendly, and the corner link is always reachable.

Phase B3 — Polish
Motion refinement across all stages.

Sound refinement.

Accessibility pass (axe + manual + keyboard + screen reader).

Performance pass (measure and record).

Visual regression baseline.

High Contrast pass.

RTL pass.

Localization pass (en-US, ur-PK).

Exit criteria: The sequence feels premium, is accessible, and meets budgets.

Phase B4 — Error & recovery
Implement boot error handling.

Implement safe mode.

Implement retry logic.

Implement the diagnostic log for boot failures.

Implement the "restart application" action.

Exit criteria: Failures are honest, recoverable, and never leave the user stuck.

18. DEFINITION OF DONE
This subsystem is complete only when:

The boot animation plays exactly once per cold start.

The boot animation never plays on renderer refresh.

The boot animation never plays on HMR reload.

The boot animation never plays on route change.

Logout returns to the login screen, not the boot animation.

The login screen is fully keyboard-navigable.

The "Create account" corner link is always visible and reachable.

The "Create account" link never reloads the app.

All animations respect Reduced Motion.

All animations respect Performance Mode.

High Contrast mode renders correctly.

Screen readers announce each stage.

Sounds are original or properly licensed.

Sounds respect mute and settings.

Errors are honest and actionable.

No fake progress bars.

No claim that the boot animation boots Windows.

No claim that the login screen is the Windows login.

No secrets in logs.

Total cold-boot time ≤ 3 s on reference hardware.

Tests written and (where authorized) run.

Documentation updated (docs/BOOT_EXPERIENCE.md, docs/LOGIN_UX.md).

brain.md updated.

IMPLEMENTATION_STATUS.md updated.

docs/CHANGELOG.md updated.

Git diff reviewed.

No secrets committed.

Meaningful Git commit created.

19. GIT COMMIT EXAMPLES
text
feat(boot): add process-local cold-boot signal
feat(boot): implement boot sequence state machine
feat(boot): add original animated logo reveal
feat(boot): implement honest initialization loader
feat(boot): add reduced-motion and performance variants
feat(auth): implement login screen
feat(auth): add corner create-account entry
feat(auth): implement MFA challenge transition
feat(auth): implement desktop handoff animation
feat(sound): add boot and welcome chimes
test(boot): verify cold-boot signal is consumable once
test(boot): verify refresh does not replay animation
test(auth): cover login error states
docs(boot): document boot experience
docs(auth): document login UX
fix(boot): prevent animation replay on HMR
20. FINAL OPERATING INSTRUCTIONS
Before starting:

Re-read v7.0 §15 (Authentication) and §28 (Motion).

Re-read this document in full.

Inspect the existing renderer entry point and router.

Inspect how the renderer is currently mounted.

Inspect the main process window creation.

Confirm no existing boot/loading screen conflicts.

Create docs/BOOT_EXPERIENCE.md as a stub.

Update brain.md with a "Boot Experience" section marked IN_PROGRESS.

Begin with Phase B0.

During implementation:

Never use sessionStorage, localStorage, cookies, or any renderer-persisted state to gate the boot animation.

Never persist the cold-boot flag to disk.

Never replay the boot animation on refresh, HMR, or navigation.

Never show a fake progress bar.

Never claim the boot animation boots Windows.

Never claim the login screen is the Windows login.

Never block the main thread with animations.

Never autoplay loud audio.

Always provide a visual equivalent for every sound.

Always respect Reduced Motion.

Always respect High Contrast.

Always keep the "Create account" link reachable.

Always update documentation and brain.md.

Always commit meaningful units to Git.

When blocked:

State the exact blocker.

Record what has been completed.

Identify what requires approval.

Continue with independent safe work where possible.

At the end of an authorized session, provide the standard expansion report plus:

text
Boot Experience Status
Cold-Boot Detection Verified:     YES / NO
Refresh Replay Verified Absent:   YES / NO
HMR Replay Verified Absent:       YES / NO
Login Screen Status
Create Account Entry Status
Motion Compliance:                YES / NO
Accessibility Compliance:         YES / NO
Performance Budget Met:           YES / NO
Mandatory honesty block:

text
APPLICATION EXECUTED:            NO
DEV SERVER STARTED:              NO
DEPENDENCIES INSTALLED:          NO
DATABASE MIGRATIONS EXECUTED:    NO
WINDOWS MODIFICATIONS PERFORMED: NO
ELEVATION REQUESTED:             NO
PRODUCTION DEPLOYMENT PERFORMED: NO
If any operation was explicitly authorized and performed, report it accurately.

21. FINAL MANDATORY DIRECTIVE
ANTIGRAVITY: BUILD A CINEMATIC, HONEST, ACCESSIBLE LAUNCH EXPERIENCE. DO NOT MAKE MISTAKES.

The boot animation is the product's handshake with the user. It must feel premium, fast, and intentional. It must run once per cold start and never again until the process restarts.

The login screen must be elegant, keyboard-first, screen-reader-friendly, and must always offer a clearly reachable "Create account" entry in the corner.

Every animation must respect Reduced Motion. Every sound must have a visual equivalent. Every claim must be truthful. Every failure must be recoverable.

Use brain.md for engineering memory. Use the Decision Authority Matrix for safe decisions. Use the capability model to maintain honesty. Use Git after every meaningful implementation unit.

Begin with Phase B0 — Boot state mechanism. Do not launch the application. Do not start a development server. Do not install dependencies. Do not execute migrations. Do not modify Windows.

Proceed with safe, documented, reversible repository work.

DO NOT MAKE MISTAKES, ANTIGRAVITY.

























MASTER GOOGLE ANTIGRAVITY DEVELOPMENT PROMPT
One-Click Bootstrap, Setup & Launch — Version 1.0
"MyOS" Automated Install → Run → Browser Launch
Status: Subsystem Specification (companion to v7.0 Core, v8.0 Expansion, Boot Experience v1.0)
Product Name: MyOS
Scope: Automated environment verification, dependency installation, environment setup, application launch, and browser auto-open in a single command
Target Platform: Windows 10/11 (primary), macOS, Linux (secondary)
Development Environment: Google Antigravity
Execution Mode: USER-INITIATED — the scripts in this document ARE the authorization to install and run, but they must be transparent about what they do before doing it
Capability Honesty: Mandatory — the script must state exactly what it will install and run

0. ABSOLUTE DIRECTIVE
DO NOT MAKE ANY MISTAKES, ANTIGRAVITY.
This document defines a one-click bootstrap experience for the MyOS desktop/web application.

The goal: a developer (or end user) clones the repository, runs one command, and gets:

Environment verification (Node.js, npm, git).

Dependency installation.

Environment file setup (.env from .env.example if missing).

Database readiness check (SQLite auto-creates; MySQL/SQL Server only if configured).

Dev server started.

Health check passed.

Browser tab opened automatically to the running app.

Clear, honest output at every step.

The application is branded MyOS with an original logo, favicon, and browser tab title.

Critical rules:

The script must tell the user what it is about to do before doing it.

The script must never install global system packages silently.

The script must never modify Windows registry, services, firewall, or system settings.

The script must never require administrator/elevation unless absolutely necessary — and if it does, it must say so and stop.

The script must never delete user files.

The script must never install database servers. It only detects and connects.

The script must never run migrations against a real database without confirmation.

The script must never claim success until the server actually responds.

This is a developer-friendly bootstrap, not a silent system mutator.

1. PRODUCT IDENTITY — "MyOS"
1.1 Required branding
Element	Value
Product name	MyOS
Browser tab title	MyOS (or MyOS — <current view>)
Favicon	/assets/branding/favicon.ico + .svg + apple-touch-icon.png
Boot logo	/assets/branding/logo.svg
Boot wordmark	/assets/branding/wordmark.svg
Splash color	Accent from theme tokens
Meta description	"MyOS — a hybrid desktop environment, productivity suite, and developer workspace."
document.title on boot	MyOS
document.title after login	MyOS
document.title per app	MyOS — Notes, MyOS — Files, etc.
applicationName in package.json	MyOS
Electron productName	MyOS
Electron appId	com.myos.desktop
1.2 Favicon set (must ship)
text
assets/branding/
├── favicon.ico            (16, 32, 48 multi-res)
├── favicon-16.png
├── favicon-32.png
├── favicon-48.png
├── favicon-192.png
├── favicon-512.png
├── apple-touch-icon.png   (180×180)
├── mask-icon.svg          (monochrome)
├── logo.svg               (full color)
├── logo-mono.svg          (high contrast)
├── wordmark.svg
└── splash.svg
All must be original artwork. No Microsoft, Apple, Ubuntu, or third-party OS assets.

1.3 HTML head (renderer)
html
<!-- apps/desktop/renderer/index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#4267d5" />
    <meta name="description" content="MyOS — a hybrid desktop environment, productivity suite, and developer workspace." />

    <title>MyOS</title>

    <link rel="icon" href="/assets/branding/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/assets/branding/logo.svg" />
    <link rel="apple-touch-icon" href="/assets/branding/apple-touch-icon.png" />
    <link rel="mask-icon" href="/assets/branding/mask-icon.svg" color="#4267d5" />

    <meta property="og:title" content="MyOS" />
    <meta property="og:description" content="A hybrid desktop environment, productivity suite, and developer workspace." />
    <meta property="og:image" content="/assets/branding/favicon-512.png" />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
2. THE ONE COMMAND
The user runs one of the following, depending on platform:

Platform	Command
Windows (double-click)	setup-and-run.bat
Windows (terminal)	npm run setup or .\setup-and-run.ps1
macOS / Linux	./setup-and-run.sh or npm run setup
Any platform (Node)	node scripts/setup-and-run.mjs
All of these ultimately invoke the same cross-platform Node.js bootstrap: scripts/setup-and-run.mjs.

The batch/PowerShell/shell wrappers exist only to provide a friendly double-click experience and to bootstrap Node if it is missing.

3. THE BOOTSTRAP SCRIPT — scripts/setup-and-run.mjs
This is the source of truth. It must be:

Cross-platform (Windows, macOS, Linux).

Written in plain Node.js (no dependencies — runs before npm install).

Idempotent (safe to run repeatedly).

Transparent (prints every action before performing it).

Reversible (does not modify the system; only the repo and node_modules).

Fail-fast (clear error + exit code on failure).

Never elevating.

3.1 Responsibilities
Step	Action	Fails how
1	Detect platform + shell	Fatal
2	Verify Node.js ≥ 20	Fatal with install instructions
3	Verify npm ≥ 10	Fatal with install instructions
4	Verify git (optional, warn only)	Warning
5	Verify package.json exists	Fatal
6	Print banner "MyOS — Setup & Run"	—
7	Detect if node_modules exists and is stale	—
8	Run npm install (or npm ci if lockfile + CI)	Fatal on non-zero
9	Copy .env.example → .env if missing	Warning on failure
10	Print configured database engine (detect only)	—
11	Detect free port (default 5173, fallback 5174+)	Fatal if none
12	Start dev server as child process	Fatal on immediate exit
13	Poll health check URL until 200 OK (timeout 60s)	Fatal on timeout
14	Open browser to the URL	Warning on failure
15	Stream server output to console	—
16	Handle Ctrl+C → graceful shutdown	—
3.2 The full script
javascript
#!/usr/bin/env node
/**
 * MyOS — One-Click Setup & Run
 *
 * This script:
 *   1. Verifies Node.js and npm are installed and recent enough.
 *   2. Installs project dependencies (npm install).
 *   3. Creates .env from .env.example if missing.
 *   4. Starts the MyOS dev server.
 *   5. Waits for the server to be ready.
 *   6. Opens the app in your default browser.
 *
 * It does NOT:
 *   - Modify Windows registry, services, firewall, or system settings.
 *   - Install system packages.
 *   - Require administrator privileges.
 *   - Delete user files.
 *   - Connect to any database without your configuration.
 *
 * Safe to run repeatedly. Press Ctrl+C to stop.
 */

import { spawn, spawnSync } from 'node:child_process';
import { existsSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { platform, release } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// ─────────────────────────────────────────────────────────────────────────────
// Paths & constants
// ─────────────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const PKG_PATH = join(ROOT, 'package.json');
const ENV_PATH = join(ROOT, '.env');
const ENV_EXAMPLE_PATH = join(ROOT, '.env.example');
const NODE_MODULES = join(ROOT, 'node_modules');

const DEFAULT_PORT = 5173;
const PORT_SCAN_RANGE = 20;
const HEALTH_PATH = '/';
const HEALTH_TIMEOUT_MS = 60_000;
const HEALTH_POLL_MS = 500;

const MIN_NODE_MAJOR = 20;
const MIN_NPM_MAJOR = 10;

// ─────────────────────────────────────────────────────────────────────────────
// Pretty output (no external deps)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const supportsColor =
  process.stdout.isTTY && process.env.NO_COLOR !== '1' && process.env.TERM !== 'dumb';

const color = (c, s) => (supportsColor ? `${C[c]}${s}${C.reset}` : s);
const bold = (s) => color('bold', s);
const dim = (s) => color('dim', s);

const log = {
  info: (m) => console.log(`${color('cyan', 'ℹ')}  ${m}`),
  ok: (m) => console.log(`${color('green', '✔')}  ${m}`),
  warn: (m) => console.log(`${color('yellow', '⚠')}  ${m}`),
  err: (m) => console.error(`${color('red', '✖')}  ${m}`),
  step: (n, m) => console.log(`\n${color('magenta', `[${n}]`)} ${bold(m)}`),
  raw: (m) => console.log(m),
};

function banner() {
  const art = `
  ███╗   ███╗██╗   ██╗ ██████╗ ███████╗
  ████╗ ████║╚██╗ ██╔╝██╔═══██╗██╔════╝
  ██╔████╔██║ ╚████╔╝ ██║   ██║███████╗
  ██║╚██╔╝██║  ╚██╔╝  ██║   ██║╚════██║
  ██║ ╚═╝ ██║   ██║   ╚██████╔╝███████║
  ╚═╝     ╚═╝   ╚═╝    ╚═════╝ ╚══════╝
  `;
  console.log(color('cyan', art));
  console.log(`  ${bold('MyOS')} ${dim('— Setup & Run')}`);
  console.log(`  ${dim('A hybrid desktop environment, productivity suite, and developer workspace.')}\n`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 1 — Environment checks
// ─────────────────────────────────────────────────────────────────────────────

function fail(msg, hint) {
  log.err(msg);
  if (hint) log.raw(`\n${dim('Hint:')} ${hint}\n`);
  process.exit(1);
}

function getCmdVersion(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: false });
  if (r.error || r.status !== 0) return null;
  return (r.stdout || '').trim();
}

function verifyNode() {
  log.step(1, 'Checking environment');

  const nodeVersion = process.versions.node;
  const major = Number(nodeVersion.split('.')[0]);

  if (major < MIN_NODE_MAJOR) {
    fail(
      `Node.js ${MIN_NODE_MAJOR}+ is required. Found v${nodeVersion}.`,
      'Install the latest LTS from https://nodejs.org/ and re-run.'
    );
  }
  log.ok(`Node.js v${nodeVersion}`);

  const npmVersion = getCmdVersion('npm', ['--version']);
  if (!npmVersion) {
    fail(
      'npm was not found on your PATH.',
      'npm ships with Node.js. Reinstall Node from https://nodejs.org/ and ensure "Add to PATH" is enabled.'
    );
  }
  const npmMajor = Number(npmVersion.split('.')[0]);
  if (npmMajor < MIN_NPM_MAJOR) {
    fail(
      `npm ${MIN_NPM_MAJOR}+ is required. Found v${npmVersion}.`,
      'Run: npm install -g npm@latest'
    );
  }
  log.ok(`npm v${npmVersion}`);

  const gitVersion = getCmdVersion('git', ['--version']);
  if (gitVersion) {
    log.ok(gitVersion);
  } else {
    log.warn('git was not found on your PATH. Some developer features will be unavailable.');
  }

  log.info(`Platform: ${platform()} ${release()}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2 — Verify project
// ─────────────────────────────────────────────────────────────────────────────

function verifyProject() {
  log.step(2, 'Verifying project');

  if (!existsSync(PKG_PATH)) {
    fail(
      `package.json not found at ${PKG_PATH}.`,
      'Run this script from the MyOS project root, or ensure the repository is complete.'
    );
  }

  const pkg = JSON.parse(readFileSync(PKG_PATH, 'utf8'));
  log.ok(`Project: ${pkg.name || 'MyOS'} v${pkg.version || '0.0.0'}`);

  const runner = existsSync(join(ROOT, 'package-lock.json')) ? 'npm ci' : 'npm install';
  log.info(`Will run: ${bold(runner)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 3 — Install dependencies
// ─────────────────────────────────────────────────────────────────────────────

async function installDependencies() {
  log.step(3, 'Installing dependencies');
  log.info('This may take a few minutes on first run.');

  const useCi = existsSync(join(ROOT, 'package-lock.json')) && process.env.CI === 'true';
  const args = useCi ? ['ci', '--no-audit', '--no-fund'] : ['install', '--no-audit', '--no-fund'];

  const code = await runForeground('npm', args, { cwd: ROOT });
  if (code !== 0) {
    fail(
      'Dependency installation failed.',
      'Check the output above. Common causes: no internet, proxy required, or a registry issue.'
    );
  }
  log.ok('Dependencies installed.');
}

function runForeground(cmd, args, opts = {}) {
  return new Promise((resolvePromise) => {
    const isWin = platform() === 'win32';
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: isWin, // npm is a .cmd on Windows
      ...opts,
    });
    child.on('close', (code) => resolvePromise(code ?? 1));
    child.on('error', () => resolvePromise(1));
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 4 — Environment file
// ─────────────────────────────────────────────────────────────────────────────

function ensureEnvFile() {
  log.step(4, 'Preparing environment file');

  if (existsSync(ENV_PATH)) {
    log.ok('.env already exists. Leaving it untouched.');
    return;
  }
  if (!existsSync(ENV_EXAMPLE_PATH)) {
    log.warn('.env.example not found. Skipping .env creation.');
    return;
  }
  try {
    copyFileSync(ENV_EXAMPLE_PATH, ENV_PATH);
    log.ok('Created .env from .env.example');
    log.info(dim('Edit .env to configure database and auth before production use.'));
  } catch (e) {
    log.warn(`Could not create .env: ${e.message}`);
  }

  // Detect configured DB engine (informational only — never connects)
  try {
    const env = readFileSync(ENV_PATH, 'utf8');
    const engine = /^DB_ENGINE\s*=\s*(\S+)/m.exec(env)?.[1];
    if (engine) log.info(`Configured database engine: ${bold(engine)}`);
  } catch {
    /* ignore */
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 5 — Find a free port
// ─────────────────────────────────────────────────────────────────────────────

function isPortFree(port) {
  return new Promise((resolvePromise) => {
    const server = createServer();
    server.once('error', () => resolvePromise(false));
    server.once('listening', () => server.close(() => resolvePromise(true)));
    server.listen(port, '127.0.0.1');
  });
}

async function findFreePort(start) {
  for (let p = start; p < start + PORT_SCAN_RANGE; p++) {
    // eslint-disable-next-line no-await-in-loop
    if (await isPortFree(p)) return p;
  }
  fail(
    `No free port found in range ${start}-${start + PORT_SCAN_RANGE - 1}.`,
    'Close other applications using these ports, or set PORT in .env.'
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 6 — Start dev server
// ─────────────────────────────────────────────────────────────────────────────

function startDevServer(port) {
  log.step(5, 'Starting MyOS dev server');

  const isWin = platform() === 'win32';
  const env = {
    ...process.env,
    PORT: String(port),
    BROWSER: 'none', // we open the browser ourselves after health check
  };

  const child = spawn('npm', ['run', 'dev:web'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: isWin,
    env,
  });

  child.stdout.on('data', (d) => process.stdout.write(dim(d.toString())));
  child.stderr.on('data', (d) => process.stderr.write(dim(d.toString())));

  child.on('exit', (code, signal) => {
    if (signal === 'SIGINT' || signal === 'SIGTERM') return;
    if (code !== 0) {
      log.err(`Dev server exited unexpectedly with code ${code}.`);
      process.exit(code ?? 1);
    }
  });

  return child;
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 7 — Wait for health
// ─────────────────────────────────────────────────────────────────────────────

async function waitForHealth(url, timeoutMs) {
  log.step(6, 'Waiting for MyOS to be ready');
  log.info(`Polling ${url}`);

  const start = Date.now();
  let lastErr = null;

  while (Date.now() - start < timeoutMs) {
    try {
      const controller = new AbortController();
      const t = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(t);
      if (res.ok || res.status === 304) {
        log.ok(`Ready after ${((Date.now() - start) / 1000).toFixed(1)}s`);
        return true;
      }
      lastErr = `HTTP ${res.status}`;
    } catch (e) {
      lastErr = e.message;
    }
    // eslint-disable-next-line no-await-in-loop
    await sleep(HEALTH_POLL_MS);
  }

  log.err(`Server did not become ready within ${timeoutMs / 1000}s. Last error: ${lastErr}`);
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 8 — Open browser
// ─────────────────────────────────────────────────────────────────────────────

function openBrowser(url) {
  log.step(7, 'Opening MyOS in your browser');
  const p = platform();
  let cmd;
  let args;

  if (p === 'win32') {
    cmd = 'cmd';
    args = ['/c', 'start', '""', url];
  } else if (p === 'darwin') {
    cmd = 'open';
    args = [url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }

  const r = spawnSync(cmd, args, { stdio: 'ignore', shell: false });
  if (r.error || r.status !== 0) {
    log.warn('Could not open the browser automatically.');
    log.raw(`\n  ${bold('Open this URL manually:')} ${color('cyan', url)}\n`);
    return;
  }
  log.ok(`Opened ${url}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Graceful shutdown
// ─────────────────────────────────────────────────────────────────────────────

function attachShutdown(child) {
  const stop = (signal) => {
    console.log(`\n${color('yellow', '⏹')}  Stopping MyOS (${signal})...`);
    try {
      child.kill('SIGINT');
    } catch {
      /* ignore */
    }
    setTimeout(() => process.exit(0), 300);
  };
  process.on('SIGINT', () => stop('SIGINT'));
  process.on('SIGTERM', () => stop('SIGTERM'));
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.clear?.();
  banner();

  verifyNode();
  verifyProject();
  await installDependencies();
  ensureEnvFile();

  const port = await findFreePort(Number(process.env.PORT) || DEFAULT_PORT);
  const url = `http://localhost:${port}${HEALTH_PATH}`;

  const server = startDevServer(port);
  attachShutdown(server);

  const ok = await waitForHealth(url, HEALTH_TIMEOUT_MS);
  if (!ok) {
    log.err('MyOS failed to start. Scroll up for the server log.');
    try { server.kill('SIGINT'); } catch { /* ignore */ }
    process.exit(1);
  }

  openBrowser(url);

  console.log(`\n${color('green', '🚀')}  ${bold('MyOS is running.')}`);
  console.log(`   ${dim('URL:')}    ${color('cyan', url)}`);
  console.log(`   ${dim('Stop:')}   Ctrl+C\n`);
}

main().catch((e) => {
  log.err(`Unexpected error: ${e?.message ?? e}`);
  process.exit(1);
});
4. PLATFORM WRAPPERS
4.1 Windows — setup-and-run.bat (double-click friendly)
bat
@echo off
setlocal

REM ── MyOS — One-Click Setup & Run ─────────────────────────────────────────
REM  This script verifies Node.js, installs dependencies, starts the dev
REM  server, and opens MyOS in your default browser.
REM
REM  It does NOT modify Windows settings, registry, services, or firewall.
REM  It does NOT require administrator privileges.
REM ─────────────────────────────────────────────────────────────────────────

title MyOS — Setup & Run
cd /d "%~dp0"

echo.
echo   MyOS — Setup ^& Run
echo   ------------------
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   [X] Node.js was not found on your PATH.
  echo.
  echo   Please install Node.js 20 LTS or newer from:
  echo       https://nodejs.org/
  echo.
  echo   During installation, keep "Add to PATH" enabled.
  echo.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo   [X] npm was not found on your PATH.
  echo       npm ships with Node.js. Please reinstall Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo   [OK] Node.js and npm detected.
echo.

node "scripts\setup-and-run.mjs"

if errorlevel 1 (
  echo.
  echo   MyOS exited with an error. See the output above.
  pause
  exit /b 1
)

endlocal
4.2 PowerShell — setup-and-run.ps1
powershell
# ── MyOS — One-Click Setup & Run ─────────────────────────────────────────
# Verifies Node.js, installs dependencies, starts the dev server, opens the browser.
# Does NOT modify Windows settings, registry, services, or firewall.
# Does NOT require administrator privileges.

$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

Write-Host ""
Write-Host "  MyOS — Setup & Run" -ForegroundColor Cyan
Write-Host "  ------------------" -ForegroundColor DarkGray
Write-Host ""

function Fail($msg, $hint) {
  Write-Host "  [X] $msg" -ForegroundColor Red
  if ($hint) { Write-Host "      $hint" -ForegroundColor DarkGray }
  Write-Host ""
  Read-Host "Press Enter to exit"
  exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Fail "Node.js was not found on your PATH." "Install Node.js 20 LTS from https://nodejs.org/"
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  Fail "npm was not found on your PATH." "npm ships with Node.js. Reinstall Node.js from https://nodejs.org/"
}

$nodeVersion = (node --version)
Write-Host "  [OK] Node.js $nodeVersion" -ForegroundColor Green

node "scripts\setup-and-run.mjs"
exit $LASTEXITCODE
4.3 macOS / Linux — setup-and-run.sh
bash
#!/usr/bin/env bash
# ── MyOS — One-Click Setup & Run ─────────────────────────────────────────
# Verifies Node.js, installs dependencies, starts the dev server, opens the browser.
# Does NOT modify system settings. Does NOT require sudo.

set -euo pipefail

cd "$(dirname "$0")"

echo
echo "  MyOS — Setup & Run"
echo "  ------------------"
echo

if ! command -v node >/dev/null 2>&1; then
  echo "  [X] Node.js was not found on your PATH." >&2
  echo "      Install Node.js 20 LTS from https://nodejs.org/" >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "  [X] npm was not found on your PATH." >&2
  echo "      npm ships with Node.js. Reinstall Node.js from https://nodejs.org/" >&2
  exit 1
fi

echo "  [OK] Node.js $(node --version)"

exec node "scripts/setup-and-run.mjs"
Make it executable:

bash
chmod +x setup-and-run.sh
5. package.json SCRIPTS
Add these to the root package.json:

json
{
  "name": "myos",
  "productName": "MyOS",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  },
  "scripts": {
    "setup": "node scripts/setup-and-run.mjs",
    "setup:ci": "npm ci && node scripts/setup-and-run.mjs",
    "dev": "npm run dev:web",
    "dev:web": "vite --host 127.0.0.1",
    "dev:desktop": "electron .",
    "build": "vite build",
    "build:desktop": "npm run build && electron-builder",
    "preview": "vite preview --host 127.0.0.1",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "start": "npm run dev:web"
  }
}
Rule: dev:web must bind to 127.0.0.1 (not 0.0.0.0) unless the user explicitly opts into LAN access. This is a security default.

6. VITE CONFIGURATION — Browser Tab Title & Logo
typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'apps/desktop/renderer'),
  publicDir: resolve(__dirname, 'assets'),
  server: {
    host: '127.0.0.1',
    port: Number(process.env.PORT) || 5173,
    strictPort: false, // allow fallback ports
    open: false,       // we open the browser ourselves after health check
  },
  build: {
    outDir: resolve(__dirname, 'dist/renderer'),
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    __APP_NAME__: JSON.stringify('MyOS'),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '0.1.0'),
  },
});
7. STARTUP LOGIC — What the User Sees
When the user double-clicks setup-and-run.bat (or runs npm run setup), the console shows:

text
  ███╗   ███╗██╗   ██╗ ██████╗ ███████╗
  ████╗ ████║╚██╗ ██╔╝██╔═══██╗██╔════╝
  ██╔████╔██║ ╚████╔╝ ██║   ██║███████╗
  ██║╚██╔╝██║  ╚██╔╝  ██║   ██║╚════██║
  ██║ ╚═╝ ██║   ██║   ╚██████╔╝███████║
  ╚═╝     ╚═╝   ╚═╝    ╚═════╝ ╚══════╝

  MyOS — Setup & Run
  A hybrid desktop environment, productivity suite, and developer workspace.

[1] Checking environment
✔  Node.js v20.11.1
✔  npm v10.5.0
✔  git version 2.44.0
ℹ  Platform: win32 10.0.22631

[2] Verifying project
✔  Project: myos v0.1.0
ℹ  Will run: npm install

[3] Installing dependencies
ℹ  This may take a few minutes on first run.
... (npm output streamed) ...
✔  Dependencies installed.

[4] Preparing environment file
✔  Created .env from .env.example
ℹ  Configured database engine: sqlite

[5] Starting MyOS dev server
... (vite output streamed) ...

[6] Waiting for MyOS to be ready
ℹ  Polling http://localhost:5173/
✔  Ready after 2.3s

[7] Opening MyOS in your browser
✔  Opened http://localhost:5173/

🚀  MyOS is running.
   URL:    http://localhost:5173/
   Stop:   Ctrl+C
Then the browser opens to http://localhost:5173/, where the MyOS boot animation plays once (per the Boot Experience spec), followed by the login screen with the Create account link in the top-right corner.

8. BROWSER TAB IDENTITY
When the browser opens, the tab must show:

Element	Value
Tab title	MyOS
Favicon	MyOS logo (from /assets/branding/favicon.ico)
Theme color	Accent from theme tokens (#4267d5 default)
Loading title	MyOS — Starting… (only during boot)
After login	MyOS
Per-app	MyOS — Notes, MyOS — Files, etc.
The document.title must be set from a single source of truth:

typescript
// apps/desktop/renderer/src/lib/documentTitle.ts
export function setDocumentTitle(view?: string) {
  document.title = view ? `MyOS — ${view}` : 'MyOS';
}
Called on route change and on app focus change. Never set the title directly in components.

9. ERROR HANDLING IN THE SCRIPT
The script must handle these failure modes gracefully:

Failure	Behavior
Node.js not installed	Clear message + link to nodejs.org + non-zero exit
Node.js too old	Clear message with required version + exit
npm not installed	Clear message + exit
package.json missing	Clear message + exit
npm install fails	Stream output, then clear error + hint + exit
.env.example missing	Warning only; continue
Port range exhausted	Clear error + hint + exit
Dev server exits immediately	Clear error + exit
Health check times out	Clear error + server log reference + exit
Browser open fails	Print URL for manual open; do not fail
User presses Ctrl+C	Graceful shutdown; no orphan processes
Rule: Every failure must tell the user what happened, why, and what to do next.

10. SAFETY & TRANSPARENCY
10.1 What the script does
Reads files in the repo.

Runs npm install (installs into node_modules/, a repo-local folder).

Creates .env from .env.example if missing.

Starts a local dev server on 127.0.0.1.

Opens a browser tab.

10.2 What the script does NOT do
Does not modify Windows registry, services, firewall, or system settings.

Does not install system packages.

Does not require administrator privileges.

Does not delete user files.

Does not connect to any database without user configuration.

Does not run migrations.

Does not transmit data externally.

Does not install global npm packages.

10.3 Transparency requirements
The script prints its banner and each step before performing it.

The script prints the exact command it will run (npm install, npm run dev:web).

The script prints the URL it will open.

The script prints how to stop (Ctrl+C).

10.4 Idempotency
Running the script again:

Reuses node_modules if present (npm handles this).

Does not overwrite an existing .env.

Finds a free port (may pick a different one if 5173 is busy).

Starts a fresh dev server.

10.5 Reversibility
To undo everything the script did:

Delete node_modules/ (dependencies).

Delete .env (environment file).

Delete dist/ (build output).

Nothing else was modified.

11. FILES TO CREATE
text
MyOS/
├── setup-and-run.bat                # Windows double-click wrapper
├── setup-and-run.ps1                # Windows PowerShell wrapper
├── setup-and-run.sh                 # macOS/Linux wrapper (chmod +x)
├── scripts/
│   └── setup-and-run.mjs            # cross-platform Node.js bootstrap
├── assets/
│   └── branding/
│       ├── favicon.ico
│       ├── favicon-16.png
│       ├── favicon-32.png
│       ├── favicon-48.png
│       ├── favicon-192.png
│       ├── favicon-512.png
│       ├── apple-touch-icon.png
│       ├── mask-icon.svg
│       ├── logo.svg
│       ├── logo-mono.svg
│       ├── wordmark.svg
│       └── splash.svg
├── apps/desktop/renderer/
│   ├── index.html                   # title + favicon links
│   └── src/lib/documentTitle.ts     # single source of title
├── vite.config.ts                   # host 127.0.0.1, open: false
├── package.json                     # name: myos, productName: MyOS, engines
└── docs/
    ├── SETUP.md                     # user-facing setup doc
    └── BOOTSTRAP.md                 # what the script does and does not do
12. IMPLEMENTATION PHASES
Phase S0 — Branding assets
Create the MyOS logo (SVG + PNG set).

Create the favicon set.

Create the wordmark.

Place in assets/branding/.

Wire into index.html.

Exit criteria: The browser tab shows the MyOS logo and title.

Phase S1 — Bootstrap script
Implement scripts/setup-and-run.mjs.

Implement all seven steps.

Implement error handling.

Implement graceful shutdown.

Exit criteria: Running node scripts/setup-and-run.mjs installs, starts, health-checks, and opens the browser.

Phase S2 — Platform wrappers
Implement setup-and-run.bat.

Implement setup-and-run.ps1.

Implement setup-and-run.sh + chmod +x.

Add npm run setup to package.json.

Exit criteria: Double-clicking on Windows works; ./setup-and-run.sh works on macOS/Linux.

Phase S3 — Documentation
Write docs/SETUP.md (user-facing).

Write docs/BOOTSTRAP.md (what the script does/does not do).

Update README.md with the one-command quick start.

Exit criteria: A new user can clone, run one command, and see MyOS in their browser.

Phase S4 — Verification
Test on a clean machine (no node_modules).

Test with node_modules already present.

Test with .env missing.

Test with .env present.

Test with port 5173 busy.

Test with no internet (should fail clearly).

Test Ctrl+C (should shut down cleanly).

Test on Windows, macOS, Linux.

Exit criteria: All scenarios behave as specified.

13. DEFINITION OF DONE
npm run setup works on Windows, macOS, and Linux.

setup-and-run.bat works on Windows by double-click.

setup-and-run.sh works on macOS/Linux after chmod +x.

The script verifies Node.js ≥ 20 and npm ≥ 10.

The script installs dependencies.

The script creates .env only if missing.

The script finds a free port.

The script starts the dev server.

The script waits for a real health check before opening the browser.

The script opens the browser to the correct URL.

The script handles Ctrl+C gracefully.

The script never elevates.

The script never modifies Windows settings.

The script never installs system packages.

The script never deletes user files.

The script prints what it is about to do before doing it.

The browser tab shows MyOS as the title.

The browser tab shows the MyOS logo as the favicon.

The app's boot animation plays once (per the Boot Experience spec).

The login screen shows with the "Create account" link in the corner.

Documentation updated (docs/SETUP.md, docs/BOOTSTRAP.md, README.md).

brain.md updated with a "Bootstrap" section.

IMPLEMENTATION_STATUS.md updated.

docs/CHANGELOG.md updated.

Git diff reviewed.

No secrets committed.

Meaningful Git commit created.

14. GIT COMMIT EXAMPLES
text
feat(branding): add MyOS logo, favicon, and wordmark
feat(setup): add cross-platform bootstrap script
feat(setup): add Windows batch and PowerShell wrappers
feat(setup): add macOS/Linux shell wrapper
feat(setup): add health check before browser launch
feat(setup): add graceful shutdown on Ctrl+C
feat(browser): set document title and favicon to MyOS
docs(setup): document one-command quick start
docs(bootstrap): document what the script does and does not do
test(setup): verify idempotency and error handling
fix(setup): prevent port collision on repeated runs
15. FINAL OPERATING INSTRUCTIONS
Before starting:

Re-read v7.0 (Core), v8.0 (Expansion), and Boot Experience v1.0.

Inspect the existing package.json, vite.config.ts, and index.html.

Inspect the existing renderer entry point.

Confirm the product name in package.json is MyOS.

Confirm the branding assets exist or create them.

Create docs/SETUP.md and docs/BOOTSTRAP.md as stubs.

Update brain.md with a "Bootstrap" section marked IN_PROGRESS.

Begin with Phase S0.

During implementation:

Never use sudo or require elevation.

Never modify Windows registry, services, firewall, or system settings.

Never install global npm packages.

Never install system packages.

Never delete user files.

Never connect to a database without user configuration.

Never run migrations.

Always print what the script is about to do before doing it.

Always print the exact command being run.

Always handle Ctrl+C gracefully.

Always respect PORT from .env.

Always prefer 127.0.0.1 over 0.0.0.0 for the dev server.

Always use open: false in Vite and open the browser yourself after health check.

Always set the browser tab title and favicon to MyOS.

Always update documentation and brain.md.

Always commit meaningful units to Git.

When blocked:

State the exact blocker.

Record what has been completed.

Identify what requires approval.

Continue with independent safe work where possible.

At the end of an authorized session, provide:

text
Bootstrap Script Status
Windows Batch Wrapper:           YES / NO
Windows PowerShell Wrapper:      YES / NO
macOS/Linux Shell Wrapper:       YES / NO
Cross-Platform Node Script:      YES / NO
Health Check Implemented:        YES / NO
Browser Auto-Open Implemented:   YES / NO
Graceful Shutdown Implemented:   YES / NO
Branding Assets Present:         YES / NO
Browser Tab Title = MyOS:        YES / NO
Favicon = MyOS Logo:             YES / NO
Documentation Updated:           YES / NO
brain.md Updated:                YES / NO
Mandatory honesty block:

text
APPLICATION EXECUTED BY ANTIGRAVITY:  NO
DEV SERVER STARTED BY ANTIGRAVITY:    NO
DEPENDENCIES INSTALLED BY ANTIGRAVITY: NO
MIGRATIONS EXECUTED:                  NO
WINDOWS MODIFICATIONS PERFORMED:      NO
ELEVATION REQUESTED:                  NO
PRODUCTION DEPLOYMENT PERFORMED:      NO
The scripts in this document are for the user to run, not for Antigravity to run. Antigravity writes the scripts; the user executes them.

16. FINAL MANDATORY DIRECTIVE
ANTIGRAVITY: BUILD A ONE-CLICK MYOS LAUNCH EXPERIENCE. DO NOT MAKE MISTAKES.

The user must be able to:

Clone the repository.

Run one command (or double-click one file).

See MyOS boot in a browser tab with the correct logo and title.

Land on the login screen with a Create account link in the corner.

The script must be transparent, idempotent, cross-platform, non-elevating, and honest about every action it takes.

The product name is MyOS. The logo is MyOS. The browser tab title is MyOS. Everywhere.

Use brain.md for engineering memory. Use Git after every meaningful implementation unit. Do not launch the application, install dependencies, or modify the system during development — write the scripts, document them, and let the user run them.

DO NOT MAKE MISTAKES, ANTIGRAVITY.


# MyOS — Premium Startup Experience, Animated Login System & One-Command Launcher

## Google Antigravity Master Implementation Prompt

**Project Name:** MyOS
**Project Type:** Windows-inspired, browser-based desktop operating system experience
**Primary Objective:** Build a visually impressive, highly animated, polished MyOS startup experience with a custom logo, boot animation, login screen, account creation flow, and automated development launcher.

---

# 1. Your Role

Act as a senior full-stack engineer, desktop-interface designer, motion-design specialist, security engineer, accessibility specialist, and QA architect.

Build a complete, working, maintainable implementation of MyOS rather than a static mockup or demonstration prototype.

The result must feel like a premium desktop operating environment inspired by the startup experience of modern operating systems. It should have its own visual identity, design language, animations, branding, and interactions.

The application must be visually sophisticated without looking cluttered, excessively artificial, or like a generic AI-generated dashboard.

Prioritize:

* Exceptional visual design.
* Smooth, intentional animations.
* A convincing operating-system startup experience.
* Reliable login and account creation interfaces.
* Correct startup-versus-refresh behavior.
* Secure authentication architecture.
* Simple application startup through a single command.
* Maintainable code and reliable error handling.
* Responsive layouts and accessibility.
* Transparent installation and execution behavior.

## Critical execution restriction

You are authorized to inspect the project, design the solution, create and edit source files, write configuration files, implement the application, and create the launcher script.

**Do not execute or launch the completed application until I explicitly authorize you to do so.**

Until I give that authorization, do not:

* Run the application or its development server.
* Execute `npm run`, `npm install`, `npm ci`, or other dependency-installation commands.
* Open the application in a browser.
* Run database migrations or modify databases.
* Download dependencies or execute remote installation scripts.
* Modify Windows settings, registry entries, services, firewall rules, or system configuration.
* Perform destructive cleanup or overwrite existing user work.
* Automatically elevate privileges.

You may create the launcher script that will perform the required installation and startup steps when I choose to run it myself.

If the project is incomplete or a required decision is unclear, inspect the available files, make conservative implementation decisions, document assumptions, and continue with the safest reasonable approach.

---

# 2. Product Vision

MyOS must feel like a personal operating system that is coming to life.

When the user launches MyOS through the intended `npm run` startup command, the experience should follow this sequence:

1. The launcher checks whether the required runtime and dependencies are available.
2. Missing project dependencies are installed using the project's approved package manager.
3. The development server starts.
4. The launcher opens a new browser tab pointing to the local MyOS application.
5. MyOS displays a premium, Windows-inspired startup animation.
6. The startup animation transitions smoothly into the login screen.
7. The user can sign in or choose **Create Account** from the corner of the login interface.
8. Successful authentication transitions into the MyOS desktop or the project's designated authenticated landing screen.

A normal browser refresh must not replay the operating-system startup animation. The user should return directly to the appropriate login, session-restoration, or authenticated application state.

The browser must not be repeatedly opened every time the application reloads or its development server performs a hot update.

---

# 3. MyOS Branding and Identity

Create an original visual identity for MyOS.

## 3.1 Name and logo

The official product name is:

**MyOS**

Design a distinctive logo that remains recognizable at different sizes.

The logo should work in:

* The startup screen.
* The login screen.
* The account creation screen.
* The browser favicon.
* The application loading states.
* The desktop shell and Start menu, where applicable.
* The launcher documentation.
* Small navigation and branding elements.

Create the logo as a genuine project asset, preferably a clean SVG with a transparent background.

The design may use an abstract window, a geometric four-part symbol, a connected constellation, or another original mark suggesting a personal digital environment.

Do not copy the exact Windows logo, Windows startup artwork, or proprietary branding.

## 3.2 Brand personality

MyOS should feel:

* Premium.
* Modern.
* Personal.
* Technically sophisticated.
* Calm and confident.
* Colorful without being chaotic.
* Animated without feeling slow.
* Familiar to Windows users without being a Windows clone.

Use consistent typography, spacing, iconography, shadows, borders, and motion.

The logo and wordmark must remain legible over both light and dark backgrounds.

---

# 4. Complete Startup Experience

## 4.1 Startup sequence

Implement a deliberate, multi-stage startup sequence.

### Stage A — Initial frame

As soon as the MyOS application is opened in a fresh application-launch session, render a deliberate initial state rather than an unstyled page.

Show a dark, cinematic background with subtle ambient lighting and the MyOS logo positioned near the center.

Avoid flashes of white, layout shifts, unstyled content, or abrupt transitions.

### Stage B — Logo reveal

Animate the logo into view using a carefully composed combination of:

* Smooth opacity transitions.
* Scale and perspective effects.
* Soft light sweeps.
* Subtle glow.
* Layered movement.
* Gentle background gradients.
* Carefully timed wordmark appearance.

The animation should feel deliberate and polished, not like an exaggerated gaming intro.

The MyOS wordmark should appear with the logo.

### Stage C — Operating-system boot animation

Create an original Windows-inspired startup animation.

Potential visual elements include:

* A dark blue, midnight, or deep-space background.
* A softly illuminated central logo.
* Slowly shifting ambient light.
* A subtle rotating or orbiting visual element.
* A smooth progress indicator or animated loading ring.
* Minimal startup status text.
* Small background particles or geometric details, used sparingly.
* A transition from the boot screen toward the authentication environment.

Use a cohesive motion sequence instead of animating every element independently.

The animation must have a clear beginning, progression, and ending.

Avoid a fake progress bar that appears broken or remains stuck. If progress is decorative rather than tied to real initialization, communicate that appropriately and complete the sequence within a bounded duration.

Do not simulate security checks, disk operations, system scans, or other real operating-system activities that the browser application does not perform.

### Stage D — Transition into authentication

When startup completes, transition into the login screen.

Use a smooth crossfade or carefully composed combination of opacity, scale, and background movement.

Avoid a sudden replacement of the entire screen.

The login interface should feel like the next stage of the same experience, not an unrelated webpage.

### Suggested timing

Use the following as initial design targets rather than rigid delays:

* Initial logo reveal: approximately 0.5–1.2 seconds.
* Main startup sequence: approximately 1.5–3 seconds.
* Transition to login: approximately 0.4–0.8 seconds.

Keep the total startup experience approximately 2.5–5 seconds under normal conditions.

The application must not delay authentication unnecessarily just to make the animation longer.

Use actual readiness checks where needed, but impose a sensible upper bound on decorative animation.

---

# 5. Critical Requirement: Startup Animation Must Not Replay on Refresh

This is one of the most important requirements in the entire project.

The startup animation must play when a new MyOS application-launch session begins through the intended `npm run` workflow. It must not replay whenever the user refreshes the browser.

Do not solve this with a simple component-local boolean. Component state resets on a page reload.

Do not use `sessionStorage` alone as the only startup detector. A tab-specific storage flag can produce confusing behavior with duplicate tabs, development reloads, or newly opened tabs.

## 5.1 Implement an explicit launch-session mechanism

Create a reliable startup-session architecture.

The recommended approach is:

1. The development launcher starts a new MyOS application session and generates a unique, non-secret launch-session identifier.
2. The development server makes that identifier available to the frontend through a controlled development-only mechanism, or a local startup endpoint.
3. The frontend reads the launch-session identifier when the application initializes.
4. The application records that the startup animation has been completed for that launch session.
5. A browser refresh retains the same launch-session identity.
6. During refresh, the frontend recognizes that the animation has already completed and immediately displays the correct application state.
7. Starting MyOS again through the launcher creates a new launch session, allowing the animation to play again.

The session identifier is not an authentication token and must never grant access to a user account.

Do not expose credentials, signing secrets, private environment variables, or database connection strings through this mechanism.

Do not introduce an unnecessarily complex backend solely to implement this behavior.

If a launch-session endpoint is used, it should be read-only, local-only, appropriately protected, and available only in the intended development configuration.

## 5.2 Alternative implementation

If a separate launch-session mechanism is impractical for the existing architecture, use an explicit session-state design that provides the same observable behavior.

Document the chosen design and explain how it distinguishes a new application launch from a browser refresh.

The following must be true:

| Scenario                                                    | Expected behavior                                    |
| ----------------------------------------------------------- | ---------------------------------------------------- |
| First launch using the MyOS launcher                        | Play startup animation                               |
| Refresh after startup completes                             | Skip startup animation                               |
| React component rerenders                                   | Do not replay animation                              |
| Development hot-module replacement                          | Do not replay animation                              |
| Navigation between login and account creation               | Do not replay animation                              |
| Successful login                                            | Transition to the authenticated experience           |
| Logout                                                      | Return to login without replaying the boot animation |
| New independent launch session                              | Play startup animation                               |
| Duplicate tab using the same launch session                 | Do not replay startup unnecessarily                  |
| Browser opened directly without a launch-session identifier | Show a sensible, documented fallback                 |
| Startup fails before completion                             | Display an appropriate recoverable error state       |

Ensure that authentication state and startup-animation state are separate concerns.

A completed startup animation does not imply that a user is authenticated.

---

# 6. Premium Animated Login Screen

After startup, show the MyOS login screen.

This must be a real, usable interface, not just a visual illustration.

## 6.1 Overall composition

Create a full-viewport authentication experience.

Use a carefully balanced composition with:

* The MyOS logo and wordmark.
* A welcoming heading.
* A concise supporting sentence.
* Email or username input.
* Password input.
* A primary **Sign In** button.
* A visible **Create Account** option in a corner of the screen.
* Optional password-recovery functionality.
* An optional account avatar or user illustration.
* Subtle ambient animation in the background.
* Clear loading, validation, error, and success states.

The layout should remain balanced on small screens, laptop screens, large monitors, and high-DPI displays.

Do not sacrifice readability to decorative elements.

## 6.2 Login screen placement

Place the MyOS logo and wordmark near the upper-left or upper-center area of the login composition, depending on the final layout.

Position the login panel as the primary focus.

The **Create Account** option must be easy to discover without competing with the main sign-in action.

For example, it can appear in the upper-right corner as a compact text link or understated outlined button:

**New to MyOS? Create Account**

The option must remain visible and usable at different viewport widths.

On mobile layouts, move it into an appropriate position rather than allowing it to overlap the login panel.

## 6.3 Visual treatment

Use a sophisticated visual treatment combining:

* Layered gradients.
* Glass-like surfaces where appropriate.
* Soft shadows.
* Thin, subtle borders.
* Controlled background blur.
* Gentle ambient lighting.
* Well-spaced typography.
* A strong primary action.
* Clear focus and error states.

Do not put every element inside a glass card.

Use visual hierarchy to make the authentication form easy to understand.

The login panel should look premium in both dark and light themes if theme switching is supported.

## 6.4 Login interactions

Implement:

* Email or username entry, according to the authentication design.
* Password entry.
* Password visibility toggle.
* Keyboard navigation.
* Enter-to-submit.
* Appropriate required-field validation.
* Clear invalid-input feedback.
* Loading state during submission.
* Duplicate-submission prevention.
* Useful server-error messages.
* A successful-authentication transition.
* A recoverable error state when the backend is unavailable.

Never display a fake successful login merely because the user entered any text.

Do not hardcode a username or password as a production authentication mechanism.

---

# 7. Create Account Screen

The Create Account option must be a fully implemented part of the authentication experience.

Clicking **Create Account** should transition to the registration screen without replaying the startup animation.

## 7.1 Registration interface

Include the fields appropriate for the application's account model, such as:

* Full name.
* Email address.
* Username, if required.
* Password.
* Confirm password.

Use clear labels, useful placeholder text, and visible validation messages.

Include:

* A primary **Create Account** button.
* A **Back to Sign In** link.
* Password visibility controls.
* Password-strength guidance where appropriate.
* Duplicate-email or duplicate-username feedback.
* A registration loading state.
* A registration success state.
* A recoverable failure state.

Avoid collecting unnecessary personal information.

## 7.2 Registration animation

Animate the login and registration interfaces consistently.

Possible transitions include:

* A horizontal panel transition.
* A controlled crossfade.
* A slight change in panel position.
* A smooth heading transition.
* Staggered entry for form fields.

Choose one coherent transition style.

Do not stack multiple dramatic animations for a single navigation event.

Respect reduced-motion settings.

## 7.3 Authentication correctness

Use the application's real authentication architecture if it already exists.

If authentication has not been implemented, build it using the existing project architecture and a secure backend design.

Passwords must never be stored in plaintext.

Use an established password-hashing algorithm, server-side validation, appropriate session or token handling, and secure database queries.

Do not store raw passwords, password hashes, authentication secrets, or sensitive session credentials in browser local storage.

If a backend or database is unavailable, do not present the authentication system as production-ready. Clearly document what has been implemented and what remains necessary.

---

# 8. Advanced Animation and Motion Design

MyOS should be heavily animated in the sense of being rich, polished, and responsive—not in the sense of making every object move continuously.

Use a centralized animation system so the startup, login, registration, and later desktop experiences share a consistent visual language.

## 8.1 Background animations

Implement a carefully selected combination of:

* Slowly moving gradient fields.
* Soft aurora-like lighting.
* Subtle parallax.
* Gentle floating geometric shapes.
* Sparse, low-contrast particles.
* Ambient edge lighting.
* A restrained light sweep behind the logo.

These effects should create depth without distracting users from the login form.

Avoid large numbers of particles, constant rapid movement, or expensive blur effects across the entire screen.

## 8.2 Logo animations

Create reusable logo animation variants:

* Startup reveal.
* Gentle idle glow.
* Hover response.
* Login-screen entrance.
* Registration-screen transition.
* Compact desktop logo transition.

The idle animation must be subtle and optional.

Avoid infinite spinning, aggressive pulsing, or excessive brightness changes.

## 8.3 Interactive motion

Provide polished feedback for:

* Buttons.
* Text fields.
* Focus states.
* Password visibility.
* Navigation links.
* Form validation.
* Notifications.
* Modal dialogs.
* Dropdown menus.
* Theme controls, if present.

Examples include a slight button lift on hover, a subtle press response, a smooth focus ring, and a short validation transition.

Every interaction must remain responsive. Animations must never delay the user's ability to click, type, submit, or navigate.

## 8.4 Motion profiles

Implement a centralized motion preference with these profiles:

* **Off:** Disable nonessential motion.
* **Reduced:** Follow the operating system's reduced-motion preference and minimize additional effects.
* **Balanced:** The default, offering polished animations without excessive movement.
* **Expressive:** Allow richer background and transition effects on capable devices.

Do not automatically force the Expressive profile simply because the user requested a heavily animated design.

Allow the user to reduce motion.

Persist user-selected preferences only where appropriate.

## 8.5 Technical animation standards

Prefer performant CSS transforms and opacity transitions for simple motion.

Use a maintained animation library only if it meaningfully improves the implementation and is compatible with the project's architecture.

Avoid unnecessary dependencies.

Requirements:

* No flashing or strobing effects.
* No forced long delays before controls become usable.
* No repeated animations caused by React rerenders.
* No layout shifts during transitions.
* No excessive animation of expensive properties.
* No unbounded timers or unmanaged event listeners.
* Pause or reduce nonessential animation when the page is hidden.
* Provide fallbacks for devices with limited processing power.
* Avoid animation-related console errors.
* Preserve usability when animations are disabled.

Aim for smooth motion around 60 FPS on typical modern hardware, while prioritizing responsiveness and accessibility when that target cannot be maintained.

---

# 9. Color, Lighting, and Visual Customization

Give MyOS a distinctive, attractive color system.

Use design tokens instead of hardcoding colors throughout individual components.

Suggested visual direction:

* Midnight navy and electric blue for the startup.
* Cyan and violet for subtle ambient lighting.
* Soft white and cool gray for typography.
* Carefully selected accent colors for interactive elements.
* Dark, translucent surfaces where they improve depth.
* Optional light-theme equivalents.

Use gradients strategically.

Do not use every color simultaneously.

Maintain clear contrast between the background, login panel, input fields, text, icons, and primary actions.

Where customization is supported, allow the user to choose an accent color without compromising text contrast.

The logo, loading indicators, focus rings, buttons, and active states should use consistent semantic color tokens.

---

# 10. Browser and Application Startup Architecture

The app must be easy to start on a Windows development machine.

Create a reliable launcher that prepares the project, starts the development server, and opens MyOS in a new browser tab.

The launcher should be designed for the existing repository rather than assuming a particular directory structure.

Inspect the current project before choosing or changing scripts.

## 10.1 Preferred developer experience

The intended workflow should be as close as practical to:

1. The user invokes the designated launcher command.
2. The launcher checks prerequisites.
3. The launcher installs missing dependencies when necessary.
4. The launcher starts the development server.
5. The launcher waits for the server to become responsive.
6. The launcher opens one new browser tab.
7. MyOS plays the startup animation.
8. The login screen appears.
9. The application remains available until the user stops the development server.

The exact commands and implementation must match the project's actual package scripts.

## 10.2 Package scripts

Create or update `package.json` scripts as appropriate.

The project must provide a clear `npm run` entry point, preferably:

* `npm run start:myos` — starts the MyOS development workflow, including the required preparation and browser-opening behavior.
* `npm run dev` — starts the development server without necessarily opening another browser tab on every invocation, unless this behavior is explicitly documented.

You may choose a different name if the existing project already has an established convention.

Avoid creating confusing duplicate scripts.

Document the exact command the user should execute.

## 10.3 Dependency installation

The launcher must install the required project dependencies before starting the app when the project has not yet been prepared.

Use the existing lockfile and package manager when possible.

For an npm project:

* If `package-lock.json` exists and is compatible, prefer `npm ci` for a clean, reproducible dependency installation.
* If the project has no lockfile, use the appropriate installation workflow and document the result.
* If dependencies are already installed and valid, avoid unnecessary reinstallations.
* Detect installation failures and stop safely.
* Do not start the app if required dependencies failed to install.
* Never install unrelated global packages without explicit authorization.
* Never run arbitrary remote scripts or use unverified installation shortcuts.
* Do not delete the lockfile or rewrite dependency versions merely to resolve an unrelated issue.

Do not blindly delete `node_modules` as a repair strategy.

If Node.js or npm is missing, explain the prerequisite and stop safely rather than silently changing the system.

## 10.4 New browser tab

The launcher must open MyOS in a new browser tab once the server is ready.

It must not open multiple tabs because of repeated readiness checks, server logs, or development hot reloads.

Requirements:

* Determine the actual local development URL from the server configuration.
* Wait for a successful readiness response rather than using an arbitrary fixed sleep.
* Use a bounded startup timeout.
* Open the URL only after the server is ready.
* Prevent duplicate browser-opening actions for the same launcher invocation.
* Report the URL if automatic browser opening fails.
* Do not require the user to manually copy a URL during normal startup.
* Do not open a browser for every source-code change.
* Do not use an external service to open the local app.
* Do not silently switch to an unrelated browser or remote URL.

On Windows, use an appropriate platform-supported browser-opening mechanism. Avoid shell injection and unsafe command construction.

If the repository is configured to use a Vite development server, configure its browser-opening behavior so that the launcher and Vite do not both open tabs.

## 10.5 Port handling

Use the existing development-server port if possible.

If the desired port is already occupied:

* Detect the conflict.
* Follow the project's existing port policy.
* Either choose an available port if supported or stop with a clear message.
* Use the actual URL reported by the server.
* Do not terminate unrelated processes to free a port.
* Do not silently change firewall rules or network settings.

---

# 11. Launcher Implementation

Create a maintainable launcher appropriate for the existing environment.

Prefer a cross-platform Node.js launcher when the project is already Node-based. A Windows `.cmd` wrapper may be included for convenience.

Potential files include:

* `scripts/start-myos.mjs`
* `scripts/ensure-dependencies.mjs`
* `start-myos.cmd`
* `package.json` scripts
* `README.md` startup instructions

These are suggested names, not a requirement to create redundant files.

## 11.1 Launcher responsibilities

The launcher must:

1. Locate the project root reliably.
2. Verify that the required project files exist.
3. Check that Node.js and npm are available.
4. Select the correct package manager based on the repository.
5. Check whether dependencies are installed.
6. Install missing dependencies using the approved lockfile-based workflow.
7. Stop if installation fails.
8. Start the development server using the correct project script.
9. Capture useful startup errors.
10. Wait for the server's actual readiness.
11. Open exactly one new browser tab.
12. Keep the server process alive.
13. Handle Ctrl+C and normal shutdown correctly.
14. Avoid leaving orphaned child processes.
15. Display a concise, useful status message.

Use safe process-spawning APIs with argument arrays and `shell: false` wherever applicable.

Do not build commands from untrusted input.

Do not hide failures by ignoring exit codes.

Do not suppress useful error output.

## 11.2 Idempotence

Repeated launcher use must not corrupt the project.

The launcher should not:

* Duplicate scripts on every run.
* Reinstall everything unnecessarily.
* Create multiple background servers unintentionally.
* Open multiple tabs from a single invocation.
* Change unrelated configuration.
* Delete project data.
* Modify Windows startup behavior.
* Install a permanent service.
* Add an unrequested scheduled task.

The launcher must be an ordinary development tool, not an always-running background utility.

## 11.3 Development versus production

The automatic dependency installation and browser-opening workflow is primarily for development.

Do not make the production application depend on running npm in the user's browser.

Do not expose development-only startup endpoints in production builds.

Document how the production build would be generated separately, but do not deploy it or run a production server without authorization.

---

# 12. Frontend Architecture and State Management

Use the existing framework and architecture whenever practical.

If the repository already uses React, retain React unless a compelling technical reason requires a change.

Keep the implementation organized into reusable components, such as:

* `MyOSLogo`
* `StartupScreen`
* `StartupAnimation`
* `StartupSessionProvider`
* `LoginScreen`
* `LoginForm`
* `CreateAccountScreen`
* `RegistrationForm`
* `AuthLayout`
* `AnimatedBackground`
* `MotionProvider`
* `LoadingIndicator`
* `ErrorMessage`
* `Notification`
* `PasswordInput`

Use names that fit the repository's existing conventions.

Avoid creating components for every trivial element.

Separate:

* Startup-session state.
* Authentication state.
* Form state.
* Motion preferences.
* Theme preferences.
* Server readiness and launcher state.

Use a clear state machine for the main experience, with states such as:

`initializing → starting → authentication → registration → authenticated`

The actual state model may be refined to represent failures, session restoration, and navigation accurately.

Do not make authentication depend on the startup animation's completion flag.

Prevent stale asynchronous requests from updating components after they are unmounted.

Ensure that browser refresh and development hot-module replacement preserve the intended experience.

---

# 13. Accessibility and Responsive Design

The application must remain usable by people who do not want extensive animations.

Requirements:

* Semantic HTML.
* Proper form labels.
* Keyboard accessibility.
* Visible focus indicators.
* Sufficient contrast.
* Screen-reader-friendly error messages.
* Logical tab order.
* Appropriate accessible names for buttons and icons.
* Reduced-motion support.
* Responsive layout.
* Touch-friendly controls.
* No essential information conveyed by color alone.
* No forced focus traps outside appropriate dialogs.
* No inaccessible hover-only actions.

If a screen reader is active or reduced motion is requested, do not make the user wait through decorative effects to access authentication.

Do not hide the login form behind an unnecessarily long animation.

The application must work at narrow widths, including approximately 320 CSS pixels, without horizontal scrolling.

---

# 14. Security and Privacy

The development launcher and application must follow safe defaults.

* Bind the development server to localhost unless network access is explicitly requested.
* Do not expose the development server to the local network by default.
* Do not disable browser security protections.
* Do not store passwords in plaintext.
* Do not hardcode production credentials.
* Do not commit `.env` files or secrets.
* Keep sensitive environment variables on the server.
* Validate authentication input on the server.
* Use parameterized database queries if a database is involved.
* Apply suitable protections to authentication endpoints.
* Avoid logging passwords, authentication tokens, and sensitive user data.
* Do not introduce analytics, tracking, or external network dependencies without justification.
* Do not claim that frontend-only authentication is secure production authentication.
* Do not make startup-session identifiers function as authentication credentials.

If the application already includes a backend and database, integrate with them rather than creating a competing authentication system.

If a backend is required but not yet configured, implement the agreed architecture and document any configuration needed without running migrations or altering existing data.

---

# 15. Error Handling and Recovery

Every important stage must have a clear failure state.

Examples:

### Dependency installation failure

Display the relevant error and explain that the server was not started.

### Server startup failure

Report the useful error and do not open a browser tab that cannot load MyOS.

### Server readiness timeout

Stop waiting after a bounded period and show the expected URL and troubleshooting information.

### Browser-opening failure

Keep the server available when safe, display the local URL, and explain how to open it manually.

### Missing launch-session information

Use the documented fallback behavior without exposing secrets or repeatedly restarting the application.

### Authentication failure

Display a useful message without exposing internal server errors or sensitive implementation details.

### Network or backend failure

Provide a clear retry action when appropriate.

### Animation failure

Fall back to a usable, nonanimated login screen. Authentication must not become inaccessible because a visual effect failed.

---

# 16. Testing and Verification Plan

Create a practical test plan and add automated tests where they fit the existing project.

**Do not execute these tests until I authorize project execution.**

## Startup behavior

* A new launch session displays the startup animation.
* The animation transitions to login.
* Refresh after startup does not replay the animation.
* React rerenders do not replay the animation.
* Hot-module replacement does not replay the animation.
* Navigation between login and registration does not replay startup.
* A new launcher-created session can play startup again.
* A missing startup-session identifier triggers the documented fallback.
* A startup error does not permanently block login.

## Login and registration

* Login form fields work.
* Password visibility toggle works.
* Invalid inputs display useful errors.
* Login requests show a loading state.
* Duplicate submissions are prevented.
* Create Account navigation works.
* Registration validation works.
* Back to Sign In works.
* Authentication failures are recoverable.
* Successful authentication opens the correct authenticated destination.

## Launcher behavior

* Dependencies are installed when needed.
* Existing dependencies are not unnecessarily reinstalled.
* Installation failure prevents server startup.
* The server starts using the intended package script.
* The launcher waits for readiness.
* Exactly one new tab is opened per launcher invocation.
* Hot reload does not trigger another browser-opening action.
* Port conflicts are handled safely.
* Ctrl+C shuts down the launcher-managed server appropriately.
* Missing prerequisites produce clear instructions.
* The launcher does not modify unrelated system configuration.

## Visual and performance behavior

* Startup looks polished at different viewport sizes.
* Login and registration transitions are smooth.
* Reduced-motion settings work.
* Focus states are visible.
* Background effects do not obstruct text.
* No avoidable layout shifts occur.
* There are no known animation-related memory leaks.
* The interface remains usable on lower-powered devices.

If browser automation is available, prepare tests for these behaviors. Do not install a new browser automation framework without authorization.

---

# 17. Required Project Deliverables

Create or update the necessary project files.

At minimum, deliver:

1. A custom MyOS logo and favicon.
2. The startup animation.
3. The startup-session detection and persistence mechanism.
4. The login screen.
5. The Create Account screen.
6. Consistent animation and design tokens.
7. Authentication integration or a clearly documented authentication implementation.
8. The one-command development launcher.
9. The relevant npm scripts.
10. Dependency and package-manager handling.
11. Error handling for installation, startup, and authentication.
12. Automated test files where appropriate.
13. Updated README documentation.
14. A clear startup and troubleshooting guide.
15. A summary of implementation decisions and any remaining limitations.

Use the existing repository's conventions and avoid creating duplicate implementations.

Do not replace an existing authentication backend, database schema, or application architecture without first understanding it.

---

# 18. Implementation Workflow for Google Antigravity

Follow this sequence.

## Phase 1 — Inspect

Inspect the existing project structure, package files, scripts, framework, authentication implementation, environment configuration, and relevant documentation.

Identify the current development-server command and port policy.

Do not run the project or install dependencies.

## Phase 2 — Plan

Document:

* The startup-session architecture.
* The authentication flow.
* The component architecture.
* The animation system.
* The launcher lifecycle.
* The dependency installation strategy.
* The browser-opening strategy.
* The security and privacy boundaries.
* The test plan.

Identify existing files that must be preserved.

## Phase 3 — Implement

Create the logo, design tokens, startup sequence, login interface, registration interface, state management, and launcher.

Integrate with the existing backend when available.

Implement the refresh-safe startup behavior before polishing decorative animation.

## Phase 4 — Review

Review the source statically for:

* Incorrect npm scripts.
* Missing dependencies.
* Unsafe process spawning.
* Duplicate browser-opening behavior.
* Startup animation replay bugs.
* Authentication-state bugs.
* Unhandled errors.
* Accessibility problems.
* Performance issues.
* Accidental system modifications.
* Secrets accidentally included in frontend code.

Perform static analysis and source inspection only when possible without executing project code.

Do not claim that runtime tests have passed when they have not been run.

## Phase 5 — Document and hand over

Update the README with the exact command that the user should run.

Explain what the launcher will do when the user runs it, including dependency installation, development-server startup, and browser-tab opening.

List any required prerequisites and configuration.

Identify what has been implemented, what has been reviewed statically, and what still requires runtime verification.

Stop and wait for explicit authorization before launching or executing the application.

---

# 19. Final Acceptance Criteria

The implementation is ready for review when all of the following are satisfied:

* [ ] The product is named **MyOS**.
* [ ] The product has a custom logo and favicon.
* [ ] The initial experience contains a polished, Windows-inspired startup animation.
* [ ] The startup animation transitions smoothly to login.
* [ ] The startup animation runs once per intended launcher-created session.
* [ ] Browser refresh does not replay the startup animation.
* [ ] Component rerenders and hot reload do not replay the startup animation.
* [ ] The login screen has a clearly visible Create Account option in a corner.
* [ ] The registration screen is implemented and navigable.
* [ ] Authentication behavior is genuine or its incomplete backend requirements are clearly documented.
* [ ] The interface has rich but purposeful animations.
* [ ] The color palette and branding are cohesive.
* [ ] Reduced-motion and accessibility requirements are respected.
* [ ] The launcher checks prerequisites and handles dependencies safely.
* [ ] The launcher starts the correct development-server command.
* [ ] The launcher waits for server readiness.
* [ ] The launcher opens one new browser tab.
* [ ] Refreshing or hot-reloading does not open additional tabs.
* [ ] Installation and startup errors are handled clearly.
* [ ] The launcher does not modify unrelated Windows settings.
* [ ] Documentation contains the exact user-facing startup command.
* [ ] No unapproved application execution, dependency installation, migration, or system modification has occurred.

---

# 20. Required Final Report

When implementation is complete, provide a concise but detailed report containing:

1. **Project status:** What was created or updated.
2. **Visual design:** How the MyOS logo, startup animation, login, registration, colors, and motion were implemented.
3. **Startup-session behavior:** How the application distinguishes a fresh launcher-created session from a browser refresh.
4. **Launcher details:** The exact files and command involved in dependency preparation, server startup, readiness checks, and browser opening.
5. **Authentication status:** Whether authentication is fully integrated, partially implemented, or awaiting configuration.
6. **Testing status:** Which checks were completed statically and which still require authorized runtime testing.
7. **Known limitations:** Any missing configuration, prerequisites, or outstanding issues.
8. **Execution boundary:** Explicitly confirm whether the app was launched, dependencies installed, a browser opened, database migrations run, or Windows settings modified.

Do not claim that anything was executed, installed, or tested unless it actually was.

## Final instruction

Build MyOS as a polished, original, premium operating-system-inspired web experience with a memorable startup animation, a beautiful login screen, a working Create Account flow, and a reliable one-command launcher.

The most important technical distinction is this:

**A new launcher-created session should show the startup animation. A normal browser refresh should not.**

The most important operational distinction is this:

**Create the application and launcher now, but do not execute them until I explicitly authorize you to do so.**
