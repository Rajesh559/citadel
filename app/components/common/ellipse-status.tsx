import EllipseIcon from '@/app/components/common/ellipse-Icon';
import { mergeClasses } from '@/app/utils/class-names';

interface EllipseStatusProps {
  color:
    | 'status-primary-success'
    | 'border-status-warning-potential-risk'
    | 'status-primary-warning-severe'
    | 'status-primary-error';
  status: string;
  textClassName?: string;
  shape?: 'circle' | 'square';
}

const EllipseStatus: React.FC<EllipseStatusProps> = ({ color, status, textClassName, shape = 'circle' }) => {
  return (
    <div className="flex items-center gap-2">
      <EllipseIcon color={color} shape={shape} />
      <span className={mergeClasses(textClassName ?? '')}>{status}</span>
    </div>
  );
};

export default EllipseStatus;
