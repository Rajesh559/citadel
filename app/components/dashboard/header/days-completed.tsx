import { mergeClasses } from '@/app/utils/class-names';
import { Progress } from 'dms-common-ux/components/progress';

interface DaysCompletedProps {
  className: string;
  total_days: number;
  completed_days: number;
}

const DaysCompleted: React.FC<DaysCompletedProps> = ({ className, total_days = 0, completed_days = 0 }) => (
  <div className={mergeClasses(className, 'flex-col gap-2 lg:flex')}>
    <div className="flex w-full max-w-full flex-col gap-1">
      <div className="flex justify-between truncate text-sm leading-4 break-words">
        <span className="truncate font-medium">Days completed</span>
        <span className="truncate font-medium">
          {completed_days}/{total_days}
        </span>
      </div>
      <Progress
        size="small"
        value={completed_days}
        minValue={0}
        maxValue={total_days}
        indicatorColor="var(--color-status-primary-info)"
      />
    </div>
  </div>
);

export default DaysCompleted;
