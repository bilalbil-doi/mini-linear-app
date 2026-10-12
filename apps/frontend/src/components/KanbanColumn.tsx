import { TaskCard } from './TaskCard';

export function KanbanColumn({ title, tasks }: { title: string; tasks: any[] }) {
  return (
    <div className="bg-surface rounded-lg p-4">
      <h2 className="text-lg font-semibold text-text mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
