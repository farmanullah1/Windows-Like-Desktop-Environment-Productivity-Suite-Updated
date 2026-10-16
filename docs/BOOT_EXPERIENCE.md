# Boot Experience Specification & Architecture

**Product:** Windows-Like Desktop Environment & Productivity Suite  
**Subsystem:** Cinematic Startup Sequence & Cold-Boot Detection  
**Version:** 1.0  
**Classification:** `APPLICATION-SIMULATED` (Boot Sequence) / `REAL` (Milestones & Cold-Boot Signal)

---

## 1. Overview & Vision

The Antigravity Boot Experience provides an intentional, fast, and accessible startup sequence that welcomes users to the desktop environment. It serves as the application's digital handshake, communicating system readiness with zero fake delays and complete architectural honesty.

In strict adherence to the **Cold Start Only Directive (§2)**, the boot animation runs strictly once per genuine application launch (`npm run dev`, process execution, container startup) and **never replays** on renderer refresh (<kbd>F5</kbd>, <kbd>Ctrl+R</kbd>), HMR reload, React re-render, or in-app navigation.

---

## 2. Boot State Machine

The boot sequence progresses deterministically through five discrete stages:

```
┌────────────┐     ┌────────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│ STAGE_VOID │ ──> │ STAGE_LOGO │ ──> │ STAGE_LOADER│ ──> │STAGE_HANDOFF │ ──> │ LOGIN_ENTRY │
└────────────┘     └────────────┘     └─────────────┘     └──────────────┘     └─────────────┘
   (0 - 300ms)       (300 - 900ms)      (900 - 2400ms)      (2400 - 2800ms)     (Interactive)
```

| Stage | Duration | Visual Elements | Audio Cue | Reduced Motion Variant |
| :--- | :--- | :--- | :--- | :--- |
| **`STAGE_VOID`** | 300 ms | Deep void background (`#07090e`), subtle center pulse dot | Silent | Immediate transition to Logo |
| **`STAGE_LOGO`** | 600 ms | Vector SVG Antigravity identity, ambient cyan/violet radial glow, wordmark reveal | Harmonic Boot Chime (C4–G4–C5) | Static SVG logo with instant opacity |
| **`STAGE_LOADER`** | 1500 ms | 5 honest initialization milestones, micro-sparkline progress dot, `aria-live` announcement | Silent | Static accent dot, normal milestone text updates |
| **`STAGE_HANDOFF`** | 400 ms | Dissolve out of logo and loader, smooth scale-in of Login acrylic card | Silent | Instant fade (150 ms) without translate or scale |
| **`LOGIN_ENTRY`** | Interactive | Centered acrylic panel with autofocus, corner "Create account" entry | Welcome Chime on Auth | Standard focus outline |

---

## 3. Cold-Boot Signal Mechanism (§2.4)

To prevent the boot sequence from ever replaying on renderer refresh, the architecture employs a single-use process-local signal pattern:

1. **Process-Local Memory Flag**: The Node.js Express server (`server/index.js`) maintains an in-memory `bootState` initialized upon process startup:
   ```javascript
   const bootState = {
     isFirstRendererLoad: true,
     launchId: 'launch_' + Date.now(),
     processStartedAt: new Date().toISOString()
   };
   ```
2. **Single-Use Consumption Endpoint**: When the React renderer mounts, `useColdBoot.ts` queries:
   ```http
   GET /api/v1/boot/consume-cold-signal
   ```
   - On the **first call**: The server responds with `{ isColdBoot: true, launchId: ... }` and atomically flips `isFirstRendererLoad` to `false`.
   - On **all subsequent calls** (triggered by <kbd>F5</kbd>, <kbd>Ctrl+R</kbd>, or new tabs): The server returns `{ isColdBoot: false, launchId: ... }`.
3. **Storage Independence**: Never uses `localStorage` or `sessionStorage` for gating, ensuring that browser state does not outlive or misrepresent the server process lifetime.
4. **HMR Protection**: Client module-level variables (`_clientBootConsumed`) guard against React 18 StrictMode double-mounting in development.

---

## 4. Honest Initialization Milestones (§6)

The loader does not display arbitrary or faked percentage bars. Instead, it advances sequentially through genuine system startup milestones:

1. `milestone_security`: Initializing security vault & cryptography
2. `milestone_design`: Loading design tokens & mica surface shaders
3. `milestone_db`: Connecting to relational database (`MyOS`)
4. `milestone_apps`: Registering 24 workspace applications
5. `milestone_ready`: System ready

Screen readers receive real-time updates via `aria-live="polite"` and `role="status"`.

---

## 5. Sound Synthesis & Design (§13)

- **Engine:** Procedural Web Audio API synthesizer (`src/design-system/soundEngine.ts`).
- **Zero External Assets:** 100% synthesized in code without copyrighted OS sounds or binary `.wav`/`.mp3` dependencies.
- **Boot Chime:** C4 (261.63 Hz) fundamental with G4 (392.00 Hz) fifth and C5 (523.25 Hz) octave overtone, gentle low-pass filter (1400 Hz), and exponential envelope decay (600 ms).
- **Welcome Chime:** Uplifting E-major triad (E4 329.63 Hz, G#4 415.30 Hz, B4 493.88 Hz, E5 659.25 Hz) cascading over 400 ms upon successful user authentication.
- **Accessibility & Mute:** Respects system audio toggle (`isAudioMuted`) and `ENABLE_WEB_AUDIO_SOUNDS`. Every sound is paired with an unambiguous visual state change.

---

## 6. Accessibility & Motion Budgets (§12, §14)

- **Reduced Motion:** Fully integrated via `@media (prefers-reduced-motion: reduce)`. Animations bypass translate/scale transforms and collapse duration to < 200 ms.
- **High Contrast:** Semantic borders (`var(--border-subtle)` / high contrast tokens) ensure elements remain crisp against background acrylic scrims.
- **Performance Budget:**
  - Time to first pixel (VOID): < 100 ms
  - Time to logo visible: < 300 ms
  - Total cold boot to interactive: < 2.8 s
  - Renderer refresh to interactive: < 150 ms (instant login/desktop restore)
  - Frame rate target: 60 FPS (zero layout-triggering transforms; GPU compositor-driven `transform` and `opacity` only).
