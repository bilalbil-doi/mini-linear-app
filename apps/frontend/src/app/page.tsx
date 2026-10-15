'use client';

import { useState } from 'react';

type Task = {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Setup project repository', status: 'DONE' },
    { id: '2', title: 'Design Kanban board UI', status: 'IN_PROGRESS' },
    { id: '3', title: 'Add task management feature', status: 'TODO' },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'TODO',
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const moveTask = (id: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const columns: { id: 'TODO' | 'IN_PROGRESS' | 'DONE'; title: string; color: string }[] = [
    { id: 'TODO', title: 'To Do', color: 'border-amber-500/50 text-amber-400' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'border-blue-500/50 text-blue-400' },
    { id: 'DONE', title: 'Done', color: 'border-emerald-500/50 text-emerald-400' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Mini Linear</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your tasks effortlessly</p>
          </div>

          {/* Form Add Task */}
          <form onSubmit={addTask} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors w-64"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Add
            </button>
          </form>
        </header>

        {/* Board Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col min-h-[400px]"
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                  <h2 className={`font-semibold text-sm flex items-center gap-2 ${col.color}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {col.title}
                  </h2>
                  <span className="text-xs font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 p-4 rounded-lg shadow-sm transition-all space-y-3 group"
                    >
                      <p className="text-sm font-medium text-slate-200">{task.title}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/30">
                        {/* Status Select */}
                        <select
                          value={task.status}
                          onChange={(e) =>
                            moveTask(
                              task.id,
                              e.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE'
                            )
                          }
                          className="bg-slate-900 border border-slate-700 text-slate-400 text-xs rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="TODO">To Do</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="DONE">Done</option>
                        </select>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-xs text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <div className="h-24 flex items-center justify-center border border-dashed border-slate-800 rounded-lg text-slate-600 text-xs">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}