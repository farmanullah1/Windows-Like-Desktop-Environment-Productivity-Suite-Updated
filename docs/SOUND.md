# Sound System & UI Audio Engine Specification

## 1. Design Philosophy
Sound in this desktop suite serves as a subtle, tactile reinforcement of actions, never as an acoustic annoyance:
- **Calm & Normalized**: Sounds are tuned to soft, rounded acoustic tones (sine and soft triangle synthesis, gentle low-pass filtering).
- **Zero Proprietary Assets**: All audio cues are procedurally synthesized using the browser **Web Audio API** or original non-infringing waveforms.
- **Visual Redundancy**: Every single sound cue is paired with a corresponding visual feedback indicator (animation, badge, or notification) so the desktop is 100% usable in complete silence.
- **Categorized Volume Controls**: Independent volume sliders for UI feedback, system notifications, workspace switching, and error alerts.

---

## 2. Web Audio API Synthetic Sound Engine

To ensure zero dependencies on external audio files and zero latency, the audio engine utilizes procedural Web Audio oscillators:

```typescript
export type SoundEffectType =
  | 'click'
  | 'window_open'
  | 'window_close'
  | 'window_minimize'
  | 'window_maximize'
  | 'window_snap'
  | 'workspace_switch'
  | 'notification'
  | 'success'
  | 'warning'
  | 'error'
  | 'terminal_bell';

export interface SoundConfig {
  masterVolume: number; // 0.0 - 1.0
  uiVolume: number;
  notificationVolume: number;
  isMuted: boolean;
}
```

### Acoustic Tone Matrix
- **`click`**: Dual-frequency short click (800Hz -> 400Hz, 30ms, exponential decay).
- **`window_open`**: Ascending soft chime (440Hz -> 660Hz -> 880Hz, 120ms with gentle low-pass filter).
- **`window_close`**: Descending soft release (660Hz -> 330Hz, 100ms).
- **`window_snap`**: Firm resonant click (520Hz, 40ms, slight square harmonic).
- **`workspace_switch`**: Soft acoustic whoosh (150Hz sine sweep with slight pink noise, 180ms).
- **`notification`**: Pleasant two-note interval (587Hz [D5] -> 880Hz [A5], 180ms).
- **`error`**: Low gentle caution blip (220Hz dual oscillator, 140ms), non-jarring.

---

## 3. Audio Controls & Accessibility
- **Mute Toggle**: One-click quick toggle in Taskbar System Tray and Quick Settings.
- **Volume Settings**: Integrated into Settings -> Sound with live sound previews.
- **Accessibility Mode**: Supports audio ducking and ensures alerts are never sound-exclusive.
