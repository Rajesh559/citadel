import { mergeClasses } from '@/app/utils/class-names';
import moment from 'moment';

interface LastUpdatedProps {
  timestamp: string;
  className: string;
}

const LastUpdated: React.FC<LastUpdatedProps> = ({ className, timestamp }) => (
  <div className={mergeClasses(className, 'gap-[3px] md:flex-col')}>
    <div className="text-background-stateless-contrast text-xs font-normal">Last updated:</div>
    <time className="text-sm font-medium">{moment(timestamp).format('DD-MM-YYYY; HH:mm')}</time>
  </div>
);

export default LastUpdated;
