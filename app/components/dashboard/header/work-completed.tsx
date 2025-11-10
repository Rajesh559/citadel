import { mergeClasses } from '@/app/utils/class-names';
import { Progress } from 'dms-common-ux/components/progress';

interface WorkCompletedProps {
  className: string;
  completion_percent: number;
}

const WorkCompleted: React.FC<WorkCompletedProps> = ({ className, completion_percent }) => {
  const value = completion_percent ?? 0;
  const label = 'Work completed';

  const displayValue = Math.max(0, Math.min(value, 100));

  return (
    <div className={mergeClasses(className, 'flex-col gap-2 lg:flex')}>
      <div className="flex w-full max-w-full flex-col gap-1">
        <div className="flex justify-between truncate text-sm leading-4 break-words">
          <span className="truncate font-medium">{label}</span>
          <span className="truncate font-medium">{displayValue} %</span>
        </div>
        <Progress
          size="small"
          value={displayValue ?? 0}
          minValue={0}
          maxValue={100}
          indicatorColor="var(--color-status-primary-info)"
        />
      </div>
    </div>
  );
};

export default WorkCompleted;
