import EllipseStatus from '@/app/components/common/ellipse-status';

interface RemainingWorkProps {
  remaining_work: {
    features_percent: number;
    pbis_percent: number;
    remaining_days: number;
  };
}

const RemainingWork: React.FC<RemainingWorkProps> = ({ remaining_work }) => {
  const { features_percent, pbis_percent, remaining_days } = remaining_work ?? {};

  const getColor = (
    value: number,
  ): 'status-primary-success' | 'status-primary-warning-severe' | 'status-primary-error' => {
    if (value < 30) return 'status-primary-success';
    else if (value < 60) return 'status-primary-warning-severe';
    else return 'status-primary-error';
  };

  return (
    <div className="flex w-full flex-col items-end gap-12">
      <div className="outline-border-primary-default flex items-center gap-2 rounded-[68px] p-3 outline outline-offset-[-1px]">
        <div className="text-foreground-primary text-base font-medium">Remaining days</div>
        <div className="text-status-primary-info text-xl leading-normal font-bold">{remaining_days}</div>
      </div>
      <div className="flex w-full justify-around gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="text-base font-normal xl:font-medium">
            <EllipseStatus color={getColor(features_percent)} status="Features" />
          </div>
          <div className="text-3xl font-medium xl:text-4xl 2xl:text-5xl">{features_percent}%</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-base font-normal xl:font-medium">
            <EllipseStatus color={getColor(pbis_percent)} status="PBIs" />
          </div>
          <div className="text-3xl font-medium xl:text-4xl 2xl:text-5xl">{pbis_percent}%</div>
        </div>
      </div>
    </div>
  );
};

export default RemainingWork;
