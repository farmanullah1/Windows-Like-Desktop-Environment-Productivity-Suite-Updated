/**
 * ==============================================================================
 * Web Audio API UI Sound Engine
 * Procedural synthesis of responsive, normalized, calm desktop acoustic cues
 * ==============================================================================
 */

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
  | 'error'
  | 'boot_chime'
  | 'welcome_chime';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private uiGain: GainNode | null = null;
  private notificationGain: GainNode | null = null;
  
  private isMuted: boolean = false;
  private masterVolume: number = 0.5;
  private uiVolume: number = 0.6;
  private notificationVolume: number = 0.7;

  constructor() {
    // Lazily initialize upon first user gesture
  }

  private initContext(): boolean {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return false;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.uiGain = this.ctx.createGain();
      this.notificationGain = this.ctx.createGain();

      this.updateVolumes();

      this.uiGain.connect(this.masterGain);
      this.notificationGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return true;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    this.updateVolumes();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMasterVolume(vol: number): void {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    this.updateVolumes();
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public setUIVolume(vol: number): void {
    this.uiVolume = Math.max(0, Math.min(1, vol));
    this.updateVolumes();
  }

  public setNotificationVolume(vol: number): void {
    this.notificationVolume = Math.max(0, Math.min(1, vol));
    this.updateVolumes();
  }

  private updateVolumes(): void {
    if (!this.masterGain || !this.uiGain || !this.notificationGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    const effectiveMaster = this.isMuted ? 0 : this.masterVolume;
    this.masterGain.gain.setValueAtTime(effectiveMaster, now);
    this.uiGain.gain.setValueAtTime(this.uiVolume, now);
    this.notificationGain.gain.setValueAtTime(this.notificationVolume, now);
  }

  public play(type: SoundEffectType): void {
    if (this.isMuted) return;
    if (!this.initContext() || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      switch (type) {
        case 'click':
          this.playClick(now);
          break;
        case 'window_open':
          this.playWindowOpen(now);
          break;
        case 'window_close':
          this.playWindowClose(now);
          break;
        case 'window_minimize':
          this.playWindowMinimize(now);
          break;
        case 'window_maximize':
          this.playWindowMaximize(now);
          break;
        case 'window_snap':
          this.playWindowSnap(now);
          break;
        case 'workspace_switch':
          this.playWorkspaceSwitch(now);
          break;
        case 'notification':
          this.playNotification(now);
          break;
        case 'success':
          this.playSuccess(now);
          break;
        case 'error':
          this.playError(now);
          break;
        case 'boot_chime':
          this.playBootChime(now);
          break;
        case 'welcome_chime':
          this.playWelcomeChime(now);
          break;
      }
    } catch {
      // Audio playback fails silently without interrupting UI logic
    }
  }

  private playClick(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.03);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  private playWindowOpen(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  private playWindowClose(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.09);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  private playWindowMinimize(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  private playWindowMaximize(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.14);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  private playWindowSnap(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.setValueAtTime(680, now + 0.02);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  private playWorkspaceSwitch(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.16);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  private playNotification(now: number): void {
    if (!this.ctx || !this.notificationGain) return;
    // Pleasant two-interval chime: D5 (587Hz) then A5 (880Hz)
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(587.33, now);
    osc2.frequency.setValueAtTime(880.00, now + 0.07);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.setValueAtTime(0.22, now + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.notificationGain);

    osc1.start(now);
    osc1.stop(now + 0.08);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.3);
  }

  private playSuccess(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(554.37, now + 0.05);
    osc.frequency.setValueAtTime(659.25, now + 0.10);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  private playError(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.setValueAtTime(220, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.uiGain);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  private playBootChime(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    // Harmonic progression: C4 (261.63Hz) -> G4 (392Hz) -> C5 (523.25Hz) with warm resonance
    const freqs = [261.63, 392.00, 523.25];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.001, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.14, now + idx * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.55);

      osc.connect(gain);
      gain.connect(this.uiGain!);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.6);
    });
  }

  private playWelcomeChime(now: number): void {
    if (!this.ctx || !this.uiGain) return;
    // Uplifting E major triad chime: E5 (659.25Hz), G#5 (830.6Hz), B5 (987.77Hz)
    const freqs = [659.25, 830.61, 987.77];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.uiGain!);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.42);
    });
  }
}

export const soundEngine = new SoundEngine();
