import arrow from '@/app/assets/arrow.svg';
import EllipseStatus from '@/app/components/common/ellipse-status';
import { mergeClasses } from '@/app/utils/class-names';
import { getIndicatorColor } from '@/app/utils/colors';
import { Icon } from 'dms-common-ux/components/icon';
import { Progress } from 'dms-common-ux/components/progress';
import Image from 'next/image';

interface SquadProps {
  title: 'bedrock' | 'rancher' | 'chamberlain' | 'foundation' | 'marshal' | 'guards' | 'defender' | 'sentinels';
  velocity: number;
  totalTasks: number;
  taskValue: number;
  TotalPbis: number;
  pbiValue: number;
  totalBugs: number;
  bugValue: number;
}

const Squad: React.FC<SquadProps> = ({
  title,
  velocity,
  totalTasks = 0,
  taskValue = 0,
  TotalPbis = 0,
  pbiValue = 0,
  totalBugs = 0,
  bugValue = 0,
}) => {
  const getColor = () => {
    if (velocity < 30) return 'status-primary-error';
    else if (velocity < 60) return 'status-primary-warning-severe';
    else return 'status-primary-success';
  };

  return (
    <div className="bg-background-stateless-uplifted inline-flex flex-col items-center justify-center gap-2 rounded-md p-4 lg:px-4 lg:py-3">
      <div className="flex w-full gap-2">
        <div className="mr-auto text-base font-bold uppercase">{title}</div>
        <div className="bg-foreground-white rounded-xl px-2 py-0.5 whitespace-nowrap">
          <EllipseStatus
            color={getColor()}
            textClassName={mergeClasses(`font-medium text-${getColor()}`)}
            status={`Velocity ${velocity}%`}
          />
          <span className="text-uiblue-background-primary-default text-sm font-medium"></span>
        </div>
        <Icon name="abb/information-circle-2" size="medium" className="hover:cursor-pointer" />
      </div>
      <div className="flex w-full flex-col gap-1">
        <div className="border-background-primary-disabled flex flex-col gap-1 rounded border-1 px-2 py-1">
          <div className="flex w-full max-w-full flex-col">
            <div className="mb-0.5 flex justify-between truncate text-base leading-4 break-words sm:leading-4 md:leading-5">
              <span className="truncate font-medium">PBIs</span>
              <span className="truncate">
                <span className="font-medium">{pbiValue}</span>
                <span className="px-1">of</span>
                <span className="font-medium">{TotalPbis}</span>
                <span className="pl-1">completed</span>
              </span>
            </div>
            <Progress
              minValue={0}
              size="small"
              value={pbiValue ?? 0}
              maxValue={TotalPbis}
              indicatorColor={getIndicatorColor(pbiValue)}
            />
          </div>
          <div className="flex gap-3">
            <Image src={arrow} alt="Arrow" />
            <div className="flex w-full max-w-full flex-col">
              <div className="mb-0.5 flex justify-between truncate text-base leading-4 break-words sm:leading-4 md:leading-5">
                <span className="truncate font-medium">Tasks</span>
                <span className="truncate">
                  <span className="font-medium">{taskValue}</span>
                  <span className="px-1">of</span>
                  <span className="font-medium">{totalTasks}</span>
                  <span className="pl-1">completed</span>
                </span>
              </div>
              <Progress
                minValue={0}
                size="small"
                value={taskValue ?? 0}
                maxValue={totalTasks}
                indicatorColor={getIndicatorColor(taskValue)}
              />
            </div>
          </div>
        </div>
        <div className="border-background-primary-disabled flex w-full flex-col rounded border-1 px-2 py-[3px]">
          <div className="mb-0.5 flex justify-between truncate text-base leading-4 break-words sm:leading-4 md:leading-5">
            <span className="truncate font-medium">Bugs</span>
            <span className="truncate">
              <span className="font-medium">{bugValue}</span>
              <span className="px-1">of</span>
              <span className="font-medium">{totalBugs}</span>
              <span className="pl-1">completed</span>
            </span>
          </div>
          <Progress
            minValue={0}
            size="small"
            value={bugValue ?? 0}
            maxValue={totalBugs}
            indicatorColor={getIndicatorColor(bugValue)}
          />
        </div>
      </div>
    </div>
  );
};

export default Squad;
