export function TaskCard({ task }: { task: any }) {
  return (
    <div className="bg-surface-800 p-3 rounded-lg shadow-sm">
      <h3 className="text-text font-medium">{task.title}</h3>
      <div className="text-sm text-text/80 mt-1">
        <span>{task.priority}</span>
        {task.assignee && (
          <span className="ml-2">• {task.assignee.name}</span>
        )}
      </div>
    </div>
  );
}
