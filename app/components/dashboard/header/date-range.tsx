import { mergeClasses } from '@/app/utils/class-names';
import moment from 'moment';

interface DateRangeProps {
  className: string;
  end_date: string;
  release_version: string;
  start_date: string;
}

const DateRange: React.FC<DateRangeProps> = ({ className, end_date, release_version, start_date }) => {
  return (
    <div className={mergeClasses('items-center lg:flex lg:gap-6', className)}>
      <div className="bg-uiblue-background-primary-default px-[5px] py-0.5">
        <div className="text-foreground-white text-base font-bold">{release_version}</div>
      </div>
      <div className="flex flex-col gap-[3px]">
        <div className="text-background-stateless-contrast text-xs font-normal">Start Date</div>
        <time className="text-sm font-medium">{moment(start_date).format('MMM - DD - YYYY')}</time>
      </div>
      <div className="flex flex-col gap-[3px]">
        <div className="text-background-stateless-contrast text-xs font-normal">End Date</div>
        <time className="text-sm font-medium">{moment(end_date).format('MMM - DD - YYYY')}</time>
      </div>
    </div>
  );
};

export default DateRange;
