import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Disc,
  Sparkles,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  genre: string;
  gradient: string;
  type: 'lofi' | 'ambient' | 'synthwave' | 'rain';
}

const PLAYLIST: Track[] = [
  {
    id: 'track-1',
    title: 'Midnight Lofi Bloom',
    artist: 'MyOS Chill Lab',
    duration: 180,
    genre: 'Lo-Fi Chill',
    gradient: 'from-purple-600 via-indigo-600 to-blue-700',
    type: 'lofi',
  },
  {
    id: 'track-2',
    title: 'Deep Focus Ether',
    artist: 'Subtle Waves',
    duration: 240,
    genre: 'Ambient Space',
    gradient: 'from-cyan-600 via-blue-700 to-indigo-900',
    type: 'ambient',
  },
  {
    id: 'track-3',
    title: 'Neon Cyber Pulse',
    artist: 'Retro Horizon',
    duration: 210,
    genre: 'Synthwave',
    gradient: 'from-pink-600 via-rose-600 to-amber-600',
    type: 'synthwave',
  },
  {
    id: 'track-4',
    title: 'Zen Rain & Whispers',
    artist: 'Atmospheric Noise',
    duration: 300,
    genre: 'White Noise',
    gradient: 'from-teal-600 via-emerald-700 to-slate-900',
    type: 'rain',
  },
];

export const MediaPlayerApp: React.FC<{ windowId: string }> = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [visualizerMode, setVisualizerMode] = useState<'bars' | 'wave' | 'circle'>('bars');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const synthIntervalRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Initialize Web Audio Engine
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      const gain = ctx.createGain();
      gain.gain.value = isMuted ? 0 : volume;

      gain.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      gainNodeRef.current = gain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play procedural harmonic tones matching track vibe
  const playSynthesizerNote = (freq: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioCtxRef.current || !gainNodeRef.current || !isPlaying) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const noteGain = audioCtxRef.current.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

      noteGain.gain.setValueAtTime(0.01, audioCtxRef.current.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.15, audioCtxRef.current.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);

      osc.connect(noteGain);
      noteGain.connect(gainNodeRef.current);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {
      // ignore
    }
  };

  // Generative music loop based on active track
  useEffect(() => {
    if (isPlaying) {
      initAudio();
      const scaleLofi = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C Major Pentatonic
      const scaleSynth = [130.81, 146.83, 164.81, 196.0, 220.0, 261.63]; // Retro Bass
      const scaleAmbient = [174.61, 220.0, 261.63, 329.63, 392.0]; // F Major 7

      synthIntervalRef.current = setInterval(() => {
        if (!isPlaying) return;
        if (currentTrack.type === 'lofi') {
          const note = scaleLofi[Math.floor(Math.random() * scaleLofi.length)];
          playSynthesizerNote(note, 1.2, 'triangle');
        } else if (currentTrack.type === 'synthwave') {
          const note = scaleSynth[Math.floor(Math.random() * scaleSynth.length)];
          playSynthesizerNote(note, 0.4, 'sawtooth');
          if (Math.random() > 0.5) {
            setTimeout(() => playSynthesizerNote(note * 1.5, 0.3, 'square'), 200);
          }
        } else if (currentTrack.type === 'ambient') {
          const note = scaleAmbient[Math.floor(Math.random() * scaleAmbient.length)];
          playSynthesizerNote(note, 2.5, 'sine');
        } else {
          // Zen rain / soothing waves
          playSynthesizerNote(180 + Math.random() * 80, 0.8, 'triangle');
        }
      }, currentTrack.type === 'synthwave' ? 400 : 900);
    } else {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    }

    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, [isPlaying, currentTrackIndex]);

  // Volume updates
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  // Playback progress ticker
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentTrack.duration) {
            // Next track
            setCurrentTrackIndex((idx) => (idx + 1) % PLAYLIST.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack.duration]);

  // Canvas visualizer render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const renderVisualizer = () => {
      animationFrameRef.current = requestAnimationFrame(renderVisualizer);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      let bufferLength = 64;
      let dataArray = new Uint8Array(bufferLength);

      if (analyserRef.current && isPlaying) {
        analyserRef.current.getByteFrequencyData(dataArray);
      } else {
        // Idle ambient ripples
        for (let i = 0; i < bufferLength; i++) {
          dataArray[i] = Math.max(4, Math.sin(Date.now() / 400 + i * 0.2) * 18 + 18);
        }
      }

      if (visualizerMode === 'bars') {
        const barWidth = (width / bufferLength) * 1.8;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * height * 0.85;

          const grad = ctx.createLinearGradient(0, height, 0, 0);
          grad.addColorStop(0, '#3b82f6');
          grad.addColorStop(0.5, '#8b5cf6');
          grad.addColorStop(1, '#ec4899');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, height - barHeight, barWidth - 2, barHeight, [3, 3, 0, 0]);
          ctx.fill();

          x += barWidth;
        }
      } else if (visualizerMode === 'wave') {
        ctx.beginPath();
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        const sliceWidth = width / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * height) / 2;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.stroke();
      } else {
        // Circular Spectrum
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) * 0.45;

        for (let i = 0; i < bufferLength; i++) {
          const rad = (Math.PI * 2 * i) / bufferLength;
          const barLen = (dataArray[i] / 255) * 35;
          const x1 = centerX + Math.cos(rad) * radius;
          const y1 = centerY + Math.sin(rad) * radius;
          const x2 = centerX + Math.cos(rad) * (radius + barLen);
          const y2 = centerY + Math.sin(rad) * (radius + barLen);

          ctx.beginPath();
          ctx.strokeStyle = `hsl(${(i * 360) / bufferLength}, 80%, 60%)`;
          ctx.lineWidth = 2;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    };

    renderVisualizer();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, visualizerMode]);

  const togglePlay = () => {
    soundEngine.play('click');
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    soundEngine.play('click');
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setProgress(0);
  };

  const handlePrev = () => {
    soundEngine.play('click');
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--bg-surface)] text-[var(--text-primary)] select-none text-xs">
      {/* Top Header / Track Showcase */}
      <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentTrack.gradient} flex items-center justify-center text-white shadow-lg ${
              isPlaying ? 'animate-pulse' : ''
            }`}
          >
            <Disc className={`w-7 h-7 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-accent)] font-semibold">
              {currentTrack.genre}
            </span>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">{currentTrack.title}</h2>
            <p className="text-[11px] text-[var(--text-secondary)]">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Visualizer Mode Selector */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-hover)]">
          {(['bars', 'wave', 'circle'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setVisualizerMode(mode)}
              className={`px-2 py-1 rounded text-[10px] capitalize transition-colors ${
                visualizerMode === mode
                  ? 'bg-[var(--color-accent)] text-white font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Center Interactive Spectrum Canvas */}
      <div className="relative flex-1 bg-black/30 flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} width={500} height={140} className="w-full h-full max-h-48" />

        {/* Real generative badge */}
        <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
          <Sparkles className="w-3 h-3" />
          <span>Web Audio Procedural Synth</span>
        </div>
      </div>

      {/* Progress Scrubber */}
      <div className="px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)]">
        <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-secondary)] mb-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={currentTrack.duration}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-1 bg-[var(--bg-hover)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
        />
      </div>

      {/* Playback Controls Bar */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-elevated)] flex items-center justify-between">
        {/* Shuffle / Repeat */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Core Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)] transition-colors"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center hover:opacity-90 shadow-md transition-all scale-100 active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-primary)] transition-colors"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume Slider */}
        <div className="flex items-center gap-2 w-32">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)]"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-full h-1 bg-[var(--bg-hover)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="p-3 border-t border-[var(--border-subtle)] max-h-36 overflow-y-auto space-y-1">
        {PLAYLIST.map((track, index) => (
          <div
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index);
              setProgress(0);
              setIsPlaying(true);
            }}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
              index === currentTrackIndex
                ? 'bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/30 text-[var(--color-accent)]'
                : 'hover:bg-[var(--bg-hover)] text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${track.gradient} flex items-center justify-center text-white text-[10px]`}>
                {index + 1}
              </div>
              <div>
                <span className="font-semibold text-xs">{track.title}</span>
                <span className="text-[10px] text-[var(--text-secondary)] ml-2">{track.artist}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[var(--text-secondary)]">
              {formatTime(track.duration)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaPlayerApp;
