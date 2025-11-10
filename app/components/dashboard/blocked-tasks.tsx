interface BlockedTasksProps {
  blocked_count: number;
}

const BlockedTasks: React.FC<BlockedTasksProps> = ({ blocked_count = 0 }) => (
  <div className="flex h-32 w-full items-center justify-center">
    <div className="text-5xl font-bold">{blocked_count}</div>
  </div>
);

export default BlockedTasks;
