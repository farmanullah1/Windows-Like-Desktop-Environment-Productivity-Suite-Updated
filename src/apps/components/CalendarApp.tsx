import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  ExternalLink,
  Clock,
  Trash2,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  meetingUrl?: string;
  category: 'work' | 'meeting' | 'review' | 'personal';
}

const DEFAULT_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    title: 'Architecture Review & SQL Server Sign-off',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00 AM',
    endTime: '11:00 AM',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
    category: 'meeting',
  },
  {
    id: 'ev-2',
    title: 'Tailwind CSS v4 Performance Audit',
    date: new Date().toISOString().split('T')[0],
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    category: 'work',
  },
  {
    id: 'ev-3',
    title: 'Sprint Retrospective & Release Gate',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '04:00 PM',
    endTime: '05:00 PM',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join',
    category: 'review',
  },
];

export const CalendarApp: React.FC<{ windowId: string }> = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem('adw_calendar_events');
      return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
    } catch {
      return DEFAULT_EVENTS;
    }
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventMeetingUrl, setNewEventMeetingUrl] = useState('');
  const [newEventStart, setNewEventStart] = useState('09:00 AM');
  const [isAdding, setIsAdding] = useState(false);

  // Month navigation
  const prevMonth = () => {
    soundEngine.play('click');
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    soundEngine.play('click');
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    soundEngine.play('success');

    const created: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle.trim(),
      date: selectedDate,
      startTime: newEventStart,
      endTime: '10:00 AM',
      meetingUrl: newEventMeetingUrl.trim() || undefined,
      category: 'work',
    };

    setEvents((prev) => [...prev, created]);
    setNewEventTitle('');
    setNewEventMeetingUrl('');
    setIsAdding(false);
  };

  const handleDeleteEvent = (id: string) => {
    soundEngine.play('click');
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  const selectedDayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div className="flex h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {/* Calendar Grid Area */}
      <div className="flex-1 flex flex-col p-4 border-r border-[var(--border-subtle)] overflow-y-auto">
        {/* Month Header Navigation */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[var(--accent-primary)]" />
            <h2 className="text-sm font-bold">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundEngine.play('click');
                setCurrentDate(new Date());
                setSelectedDate(new Date().toISOString().split('T')[0]);
              }}
              className="px-2.5 py-1 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-card)] text-[11px]"
            >
              Today
            </button>
            <button
              onClick={prevMonth}
              className="p-1 rounded-lg hover:bg-[var(--surface-card)] text-[var(--text-secondary)]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 rounded-lg hover:bg-[var(--surface-card)] text-[var(--text-secondary)]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center font-semibold text-[10px] text-[var(--text-muted)] py-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Days Matrix */}
        <div className="grid grid-cols-7 gap-1 flex-1">
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`empty-${idx}`} className="p-1 min-h-16 opacity-20" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = dayStr === new Date().toISOString().split('T')[0];
            const isSelected = dayStr === selectedDate;
            const dayEvents = events.filter((e) => e.date === dayStr);

            return (
              <div
                key={dayStr}
                onClick={() => {
                  soundEngine.play('click');
                  setSelectedDate(dayStr);
                }}
                className={`p-1.5 min-h-16 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[var(--accent-primary)] bg-[var(--accent-subtle)] ring-1 ring-[var(--accent-primary)]'
                    : isToday
                    ? 'border-blue-500/40 bg-[var(--surface-card)]'
                    : 'border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-medium)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold ${isToday ? 'text-blue-400' : ''}`}>
                    {dayNum}
                  </span>
                  {dayEvents.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                  )}
                </div>

                <div className="space-y-0.5 overflow-hidden">
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div
                      key={ev.id}
                      className="px-1 py-0.5 rounded bg-[var(--surface-elevated)] text-[9px] truncate text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="text-[8px] text-[var(--text-muted)] font-mono">
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agenda & Event Detail Sidebar */}
      <div className="w-72 bg-[var(--surface-acrylic)] p-4 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] uppercase">Agenda for</span>
              <h3 className="font-bold text-xs">{selectedDate}</h3>
            </div>
            <button
              onClick={() => {
                soundEngine.play('click');
                setIsAdding(!isAdding);
              }}
              className="p-1 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] transition-colors"
              title="Add Event"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add Event Form */}
          {isAdding && (
            <form onSubmit={handleAddEvent} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2">
              <input
                type="text"
                placeholder="Event title..."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full px-2.5 py-1 rounded bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Start Time (e.g. 09:00 AM)..."
                value={newEventStart}
                onChange={(e) => setNewEventStart(e.target.value)}
                className="w-full px-2.5 py-1 rounded bg-[var(--surface-input)] border border-[var(--border-subtle)] text-[11px] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Meeting Link (optional)..."
                value={newEventMeetingUrl}
                onChange={(e) => setNewEventMeetingUrl(e.target.value)}
                className="w-full px-2.5 py-1 rounded bg-[var(--surface-input)] border border-[var(--border-subtle)] text-[11px] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-1 rounded bg-[var(--accent-primary)] text-white font-medium text-xs"
              >
                Save Event
              </button>
            </form>
          )}

          {/* Selected Date Events List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedDayEvents.length === 0 ? (
              <p className="text-center text-[var(--text-muted)] text-[11px] py-8">
                No events scheduled for this day.
              </p>
            ) : (
              selectedDayEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-xs leading-tight">{ev.title}</h4>
                    <button
                      onClick={() => handleDeleteEvent(ev.id)}
                      className="text-[var(--text-muted)] hover:text-red-400 p-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-mono">
                    <Clock className="w-3 h-3 text-[var(--accent-primary)]" />
                    <span>{ev.startTime} - {ev.endTime}</span>
                  </div>

                  {ev.meetingUrl && (
                    <a
                      href={ev.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-[11px] font-medium"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Meeting</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] text-[10px] text-[var(--text-muted)] flex items-center justify-between">
          <span>{events.length} Total Events</span>
          <span className="text-emerald-400">Offline Synced</span>
        </div>
      </div>
    </div>
  );
};
