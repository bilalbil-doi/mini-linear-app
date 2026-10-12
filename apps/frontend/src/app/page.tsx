import { KanbanColumn } from '@/components/KanbanColumn';

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/tasks');
  const tasks = await response.json();

  const columns = [
    { id: 'todo', title: 'To Do', tasks: tasks.filter(t => t.status === 'TODO') },
    { id: 'in-progress', title: 'In Progress', tasks: tasks.filter(t => t.status === 'IN_PROGRESS') },
    { id: 'done', title: 'Done', tasks: tasks.filter(t => t.status === 'DONE') }
  ];

  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-text mb-8">Kanban Board</h1>
      <div className="grid grid-cols-3 gap-4">
        {columns.map(column => (
          <KanbanColumn key={column.id} title={column.title} tasks={column.tasks} />
        ))}
      </div>
    </main>
  );
}
