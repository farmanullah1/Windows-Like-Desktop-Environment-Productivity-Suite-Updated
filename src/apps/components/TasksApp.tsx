import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  Kanban,
  List as ListIcon,
} from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';
import { useDesktop } from '../../core/desktopStore';

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done';
export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low';

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: string;
  dueDate: string;
  createdAt: string;
}

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 't-1',
    title: 'Deploy MS SQL Server MyOS Schema',
    description: 'Verify relational schema migration 002 for UserFiles and Applications.',
    status: 'done',
    priority: 'urgent',
    project: 'Database',
    dueDate: '2026-10-09',
    createdAt: '2026-10-08',
  },
  {
    id: 't-2',
    title: 'Implement Taskbar Window Hover Previews',
    description: 'Add interactive hover cards on running app icons with title and dimensions.',
    status: 'done',
    priority: 'high',
    project: 'UI/UX',
    dueDate: '2026-10-09',
    createdAt: '2026-10-08',
  },
  {
    id: 't-3',
    title: 'Integrate Expansion Pack v8.0 Productivity Suite',
    description: 'Build Tasks Kanban, Calendar, Focus Mode, and Encrypted Vault.',
    status: 'inprogress',
    priority: 'urgent',
    project: 'Core Platform',
    dueDate: '2026-10-10',
    createdAt: '2026-10-09',
  },
  {
    id: 't-4',
    title: 'Perform E2E Security & Accessibility Audit',
    description: 'Verify WCAG AA contrast, keyboard shortcuts, and zero secrets in source code.',
    status: 'todo',
    priority: 'medium',
    project: 'QA & Security',
    dueDate: '2026-10-12',
    createdAt: '2026-10-09',
  },
];

export const TasksApp: React.FC<{ windowId: string }> = () => {
  const { addNotification } = useDesktop();
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem('adw_tasks_data');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [selectedProject, setSelectedProject] = useState<string>('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('medium');
  const [newTaskProject, setNewTaskProject] = useState('Core Platform');

  useEffect(() => {
    try {
      localStorage.setItem('adw_tasks_data', JSON.stringify(tasks));
    } catch {
      // storage error
    }
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    soundEngine.play('success');

    const created: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      status: 'todo',
      priority: newTaskPriority,
      project: newTaskProject,
      dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks((prev) => [created, ...prev]);
    setNewTaskTitle('');
    addNotification('Task Created', `Added "${created.title}" to To-Do board.`, 'info', 'Tasks');
  };

  const handleStatusChange = (id: string, newStatus: TaskStatus) => {
    soundEngine.play('click');
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    soundEngine.play('click');
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const projects = ['All', ...Array.from(new Set(tasks.map((t) => t.project)))];

  const filteredTasks = tasks.filter(
    (t) => selectedProject === 'All' || t.project === selectedProject
  );

  const COLUMNS: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'todo', label: 'To Do', color: 'bg-[#2D333F]/40 text-[#8F96A3]' },
    { id: 'inprogress', label: 'In Progress', color: 'bg-[#E06C38]/15 text-[#E06C38]' },
    { id: 'review', label: 'In Review', color: 'bg-[#D9822B]/15 text-[#D9822B]' },
    { id: 'done', label: 'Completed', color: 'bg-[#2D9C5E]/15 text-[#2D9C5E]' },
  ];

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent':
        return <span className="px-1.5 py-0.5 rounded bg-[#E05252]/10 text-[#E05252] font-semibold text-[9px]">Urgent</span>;
      case 'high':
        return <span className="px-1.5 py-0.5 rounded bg-[#D9822B]/10 text-[#D9822B] font-semibold text-[9px]">High</span>;
      case 'medium':
        return <span className="px-1.5 py-0.5 rounded bg-[#E06C38]/10 text-[#E06C38] font-semibold text-[9px]">Medium</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded bg-[#2D333F] text-[#8F96A3] font-semibold text-[9px]">Low</span>;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none text-xs">
      {/* Top Header & Actions */}
      <div className="p-3 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[var(--accent-primary)]" />
            <h2 className="text-sm font-semibold">Tasks & Project Management</h2>
            <span className="text-[10px] text-[var(--text-muted)]">
              {tasks.filter((t) => t.status === 'done').length}/{tasks.length} Completed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[var(--surface-card)] rounded-lg p-0.5 border border-[var(--border-subtle)]">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'kanban' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-muted)]'
                }`}
                title="Kanban Board View"
              >
                <Kanban className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-[var(--accent-primary)] text-white' : 'text-[var(--text-muted)]'
                }`}
                title="List View"
              >
                <ListIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Task Input Form */}
        <form onSubmit={handleAddTask} className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <input
            type="text"
            placeholder="Add task title (e.g. 'Audit SQL Server indices')..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1 min-w-[180px] px-3 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none focus:border-[var(--accent-primary)]"
          />

          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
            className="px-2 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none cursor-pointer flex-shrink-0"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          <select
            value={newTaskProject}
            onChange={(e) => setNewTaskProject(e.target.value)}
            className="px-2 py-1.5 rounded-lg bg-[var(--surface-input)] border border-[var(--border-subtle)] text-xs focus:outline-none cursor-pointer flex-shrink-0"
          >
            <option value="Core Platform">Core Platform</option>
            <option value="Database">Database</option>
            <option value="UI/UX">UI/UX</option>
            <option value="QA & Security">QA & Security</option>
          </select>

          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent-primary)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors flex-shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        {/* Project Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          {projects.map((proj) => (
            <button
              key={proj}
              onClick={() => setSelectedProject(proj)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] transition-colors ${
                selectedProject === proj
                  ? 'bg-[var(--accent-primary)] text-white font-medium'
                  : 'bg-[var(--surface-card)] text-[var(--text-secondary)] hover:text-white'
              }`}
            >
              {proj}
            </button>
          ))}
        </div>
      </div>

      {/* Main Board / List Canvas */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-4">
        {viewMode === 'kanban' ? (
          /* Kanban Board */
          <div className="grid grid-cols-4 gap-3 min-w-[760px] h-full items-start">
            {COLUMNS.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.id);
              return (
                <div
                  key={col.id}
                  className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex flex-col max-h-full"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)]">
                    <span className="font-semibold text-xs flex items-center gap-1.5">
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] ${col.color}`}>
                        {colTasks.length}
                      </span>
                      <span>{col.label}</span>
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:border-[var(--border-medium)] transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-xs text-[var(--text-primary)] leading-snug">
                            {task.title}
                          </h4>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-[var(--text-muted)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                            title="Delete Task"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {task.description && (
                          <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)] text-[10px] text-[var(--text-muted)]">
                          <div className="flex items-center gap-1.5">
                            {getPriorityBadge(task.priority)}
                            <span className="font-mono text-[9px]">{task.project}</span>
                          </div>
                          <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                            className="bg-transparent text-[10px] text-[var(--accent-primary)] font-semibold cursor-pointer focus:outline-none"
                          >
                            <option value="todo">To Do</option>
                            <option value="inprogress">In Prog</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="space-y-2 max-w-3xl">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === 'done'}
                    onChange={(e) => handleStatusChange(task.id, e.target.checked ? 'done' : 'todo')}
                    className="w-4 h-4 accent-[var(--accent-primary)] cursor-pointer"
                  />
                  <div className="truncate">
                    <h4 className={`text-xs font-semibold ${task.status === 'done' ? 'line-through text-[var(--text-muted)]' : ''}`}>
                      {task.title}
                    </h4>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {task.project} • Due: {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {getPriorityBadge(task.priority)}
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 rounded text-[var(--text-muted)] hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
