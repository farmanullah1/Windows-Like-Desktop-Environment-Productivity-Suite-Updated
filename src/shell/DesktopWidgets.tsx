import React, { useState, useEffect } from 'react';
import {
  CloudSun,
  Sun,
  CloudRain,
  Activity,
  Plus,
  Trash2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useDesktop } from '../core/desktopStore';
import { soundEngine } from '../design-system/soundEngine';

interface ForecastDay {
  day: string;
  icon: React.ComponentType<{ className?: string }>;
  temp: number;
}

const CITIES = [
  { name: 'San Francisco', temp: 68, condition: 'Partly Cloudy', humidity: 54, wind: 8 },
  { name: 'Tokyo', temp: 72, condition: 'Clear', humidity: 48, wind: 6 },
  { name: 'London', temp: 61, condition: 'Showers', humidity: 78, wind: 12 },
  { name: 'New York', temp: 65, condition: 'Sunny', humidity: 50, wind: 9 },
];

export const DesktopWidgets: React.FC = () => {
  const {
    metrics,
    widgetsVisible,
    stickyNotes,
    addStickyNote,
    updateStickyNote,
    deleteStickyNote,
  } = useDesktop();

  const [cityIndex, setCityIndex] = useState(0);
  const [isCelsius, setIsCelsius] = useState(false);
  const [time, setTime] = useState(new Date());
  const [cpuHistory, setCpuHistory] = useState<number[]>([12, 18, 15, 24, 20, 16, 28, 22, 19, 25]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setCpuHistory((prev) => {
        const nextVal = Math.min(95, Math.max(8, metrics.cpuUsage + Math.floor(Math.random() * 9 - 4)));
        return [...prev.slice(1), nextVal];
      });
    }, 2000);
    return () => clearInterval(timer);
  }, [metrics.cpuUsage]);

  if (!widgetsVisible) return null;

  const currentCity = CITIES[cityIndex];
  const displayTemp = isCelsius
    ? Math.round(((currentCity.temp - 32) * 5) / 9)
    : currentCity.temp;

  const forecast: ForecastDay[] = [
    { day: 'Wed', icon: CloudSun, temp: isCelsius ? 20 : 68 },
    { day: 'Thu', icon: Sun, temp: isCelsius ? 22 : 72 },
    { day: 'Fri', icon: CloudRain, temp: isCelsius ? 17 : 63 },
    { day: 'Sat', icon: Sun, temp: isCelsius ? 23 : 74 },
  ];

  const cycleCity = () => {
    soundEngine.play('click');
    setCityIndex((prev) => (prev + 1) % CITIES.length);
  };

  const STICKY_COLORS = {
    yellow: 'bg-[#1E222A]/95 border-[#E06C38]/40 text-[#ECEFF4] shadow-2xl',
    teal: 'bg-[#1E222A]/95 border-[#2D9C5E]/40 text-[#ECEFF4] shadow-2xl',
    coral: 'bg-[#1E222A]/95 border-[#E05252]/40 text-[#ECEFF4] shadow-2xl',
    violet: 'bg-[#1E222A]/95 border-[#D9822B]/40 text-[#ECEFF4] shadow-2xl',
    sky: 'bg-[#1E222A]/95 border-[#2D333F] text-[#ECEFF4] shadow-2xl',
  };

  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const dragStartRef = React.useRef<{ id: string; startX: number; startY: number; noteX: number; noteY: number } | null>(null);

  const handleNoteMouseDown = (e: React.MouseEvent, noteId: string, currentX: number, currentY: number, noteText: string, noteColor: any) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
    e.preventDefault();
    dragStartRef.current = {
      id: noteId,
      startX: e.clientX,
      startY: e.clientY,
      noteX: currentX,
      noteY: currentY,
    };
    setDraggingNoteId(noteId);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current) return;
      const dx = moveEvent.clientX - dragStartRef.current.startX;
      const dy = moveEvent.clientY - dragStartRef.current.startY;
      const newX = Math.max(16, Math.min(window.innerWidth - 260, dragStartRef.current.noteX + dx));
      const newY = Math.max(16, Math.min(window.innerHeight - 200, dragStartRef.current.noteY + dy));
      updateStickyNote(dragStartRef.current.id, noteText, noteColor, newX, newY);
    };

    const handleMouseUp = () => {
      dragStartRef.current = null;
      setDraggingNoteId(null);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-[var(--z-widgets)] overflow-hidden">
      {/* Sticky Notes Canvas Layer */}
      {stickyNotes.map((note) => {
        const colorClass = STICKY_COLORS[note.color] || STICKY_COLORS.yellow;
        const isDragging = draggingNoteId === note.id;
        return (
          <div
            key={note.id}
            style={{ left: `${note.x}px`, top: `${note.y}px` }}
            className={`absolute w-60 pointer-events-auto p-4 rounded-2xl border shadow-2xl backdrop-blur-xl transition-shadow flex flex-col gap-2.5 group ${
              isDragging ? 'shadow-[0_24px_50px_rgba(0,0,0,0.8)] ring-1 ring-[#E06C38]' : 'hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
            } ${colorClass}`}
          >
            <div
              onMouseDown={(e) => handleNoteMouseDown(e, note.id, note.x, note.y, note.text, note.color)}
              className="flex items-center justify-between pb-2 border-b border-[#2D333F] cursor-grab active:cursor-grabbing"
              title="Drag to reposition sticky note"
            >
              <div className="flex items-center gap-1.5">
                {(['yellow', 'teal', 'coral', 'violet'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => updateStickyNote(note.id, note.text, c)}
                    className={`w-3.5 h-3.5 rounded-full border border-black/30 cursor-pointer transition-transform hover:scale-125 ${
                      c === 'yellow'
                        ? 'bg-[#E06C38]'
                        : c === 'teal'
                        ? 'bg-[#2D9C5E]'
                        : c === 'coral'
                        ? 'bg-[#E05252]'
                        : 'bg-[#D9822B]'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => deleteStickyNote(note.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-[#8F96A3] hover:text-[#E05252] hover:bg-white/5 rounded transition-all cursor-pointer"
                title="Delete note"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              value={note.text}
              onChange={(e) => updateStickyNote(note.id, e.target.value)}
              className="w-full bg-transparent resize-none text-xs leading-relaxed focus:outline-none min-h-[90px] text-[#ECEFF4] placeholder-[#8F96A3]"
              placeholder="Write a sticky note..."
            />
          </div>
        );
      })}

      {/* Right-Hand Desktop Sidebar Widgets - gracefully hidden on narrow screens to prevent overlapping */}
      <div className="hidden md:flex absolute right-5 top-16 w-72 flex-col gap-4 pointer-events-auto select-none">
        {/* Weather Widget */}
        <div className="p-4 rounded-2xl bg-[#1E222A]/90 border border-[#2D333F] backdrop-blur-2xl shadow-xl text-[#ECEFF4] hover:border-[#E06C38]/60 transition-all flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <button
              onClick={cycleCity}
              className="flex items-center gap-1 text-xs font-semibold hover:text-[#E06C38] transition-colors group cursor-pointer"
            >
              <span>{currentCity.name}</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#8F96A3]" />
            </button>
            <button
              onClick={() => setIsCelsius(!isCelsius)}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14171D] border border-[#2D333F] hover:bg-[#E06C38] hover:text-white transition-colors cursor-pointer text-[#8F96A3]"
            >
              °{isCelsius ? 'C' : 'F'}
            </button>
          </div>

          <div className="flex items-center justify-between my-2">
            <div>
              <div className="text-3xl font-light tracking-tight font-sans text-[#ECEFF4]">
                {displayTemp}°
              </div>
              <div className="text-[11px] text-[#8F96A3] font-medium">
                {currentCity.condition}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#E06C38]/10 border border-[#E06C38]/25 flex items-center justify-center text-[#E06C38]">
              <CloudSun className="w-7 h-7" />
            </div>
          </div>

          {/* Forecast row */}
          <div className="grid grid-cols-4 gap-1 pt-2.5 border-t border-[#2D333F] text-center">
            {forecast.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[10px] text-[#8F96A3]">{f.day}</span>
                  <Icon className="w-4 h-4 my-1 text-[#E06C38]" />
                  <span className="text-[11px] font-semibold text-[#ECEFF4]">{f.temp}°</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live System Performance Telemetry Widget */}
        <div className="p-4 rounded-2xl bg-[#1E222A]/90 border border-[#2D333F] backdrop-blur-xl shadow-xl text-[#ECEFF4] hover:border-[#E06C38]/60 transition-all">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 text-[#E05252] animate-pulse" />
              <span>System Heartbeat</span>
            </div>
            <span className="text-[10px] font-mono text-[#2D9C5E] font-medium px-2 py-0.5 rounded-full bg-[#2D9C5E]/10 border border-[#2D9C5E]/20">Normal</span>
          </div>

          {/* SVG Sparkline Pulse */}
          <div className="h-10 w-full mb-3">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 35" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E06C38" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E06C38" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Fill */}
              <polygon
                points={`0,35 ${cpuHistory.map((v, i) => `${i * 11},${35 - (v / 100) * 30}`).join(' ')} 100,35`}
                fill="url(#cpuGrad)"
              />
              {/* Line */}
              <polyline
                points={cpuHistory.map((v, i) => `${i * 11},${35 - (v / 100) * 30}`).join(' ')}
                fill="none"
                stroke="#E06C38"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Gauges */}
          <div className="grid grid-cols-3 gap-2 text-center pt-2.5 border-t border-[#2D333F]">
            <div className="p-2 rounded-xl bg-[#14171D] border border-[#2D333F]">
              <div className="text-[10px] text-[#8F96A3]">CPU</div>
              <div className="text-xs font-bold text-[#E06C38] font-mono">{metrics.cpuUsage}%</div>
            </div>
            <div className="p-2 rounded-xl bg-[#14171D] border border-[#2D333F]">
              <div className="text-[10px] text-[#8F96A3]">RAM</div>
              <div className="text-xs font-bold text-[#F07D49] font-mono">
                {Math.round((metrics.memoryUsedMb / metrics.memoryTotalMb) * 100)}%
              </div>
            </div>
            <div className="p-2 rounded-xl bg-[#14171D] border border-[#2D333F]">
              <div className="text-[10px] text-[#8F96A3]">Disk</div>
              <div className="text-xs font-bold text-[#2D9C5E] font-mono">36%</div>
            </div>
          </div>
        </div>

        {/* Quick Clock & New Sticky Note Action */}
        <div className="p-3.5 rounded-2xl bg-[#1E222A]/90 border border-[#2D333F] backdrop-blur-xl shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#E06C38]" />
            <div>
              <div className="text-xs font-bold font-mono text-[#ECEFF4]">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-[10px] text-[#8F96A3]">
                {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              addStickyNote({
                text: 'New task or thought...',
                color: (['yellow', 'teal', 'coral', 'violet'][Math.floor(Math.random() * 4)] as any),
              })
            }
            className="px-2.5 py-1 rounded-lg bg-[var(--accent-primary)] hover:opacity-90 text-white font-medium text-[11px] flex items-center gap-1 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Note
          </button>
        </div>
      </div>
    </div>
  );
};
