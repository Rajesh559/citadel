import { getIndicatorColor } from '@/app/utils/colors';
import { DonutChart } from 'dms-common-ux/components/donut-chart';
import { Progress } from 'dms-common-ux/components/progress';

interface TestCases {
  total_count: number;
  automated_count: number;
  remaining_count: number;
  completion_percent: number;
}

interface TestAutomationProps {
  test_cases: {
    current_version: TestCases;
    total_test_cases: TestCases;
  };
}

const TestAutomation: React.FC<TestAutomationProps> = ({ test_cases }) => {
  const { current_version, total_test_cases } = test_cases ?? {};
  const {
    automated_count: current_automated_count,
    completion_percent: current_completion_percent,
    remaining_count: current_remaining_count,
    total_count: current_total_count,
  } = current_version ?? { automated_count: 0, completion_percent: 0, remaining_count: 0, total_count: 0 };

  const {
    automated_count: total_automated_count,
    completion_percent: total_completion_percent,
    remaining_count: total_remaining_count,
    total_count: total_total_count,
  } = total_test_cases ?? { automated_count: 0, completion_percent: 0, remaining_count: 0, total_count: 0 };

  return (
    <section className="grid w-full gap-4 lg:grid-cols-1 xl:grid-cols-2">
      <div className="border-border-primary-default relative border-b pb-4 xl:col-span-1 xl:border-r xl:border-b-0 xl:pb-0">
        <p className="font-semibold">Total Test cases</p>
        <DonutChart
          data={[
            { value: total_automated_count, label: 'Automated cases', color: '#51a34b' },
            { value: total_remaining_count, label: 'Remaining cases', color: '#d98f45' },
          ]}
          height={104}
          label="Total"
          legendGap={1}
          legendPosition="right"
          totalValue={total_total_count}
          width={280}
        />
        {!!(total_automated_count || total_remaining_count || total_total_count) && (
          <div className="absolute top-20 left-36 w-52 pt-3 md:w-56">
            <div className="flex w-full max-w-full flex-col">
              <div className="flex justify-between truncate text-sm leading-6 break-words">
                <span className="truncate">Percentage of completion</span>
                <span className="truncate">{total_completion_percent ?? 0}%</span>
              </div>
              <Progress
                size="small"
                value={total_completion_percent ?? 0}
                minValue={0}
                maxValue={100}
                indicatorColor={getIndicatorColor(total_completion_percent ?? 0)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="relative xl:col-span-1">
        <p className="font-semibold">Current version test cases</p>
        <DonutChart
          data={[
            { value: current_automated_count, label: 'Automated cases', color: '#51a34b' },
            { value: current_remaining_count, label: 'Remaining cases', color: '#d98f45' },
          ]}
          height={104}
          label="Total"
          legendGap={1}
          legendPosition="right"
          totalValue={current_total_count}
          width={280}
        />
        {!!(current_automated_count || current_remaining_count || current_total_count) && (
          <div className="absolute top-20 left-36 w-52 pt-3 md:w-56">
            <div className="flex w-full max-w-full flex-col">
              <div className="flex justify-between truncate text-sm leading-6 break-words">
                <span className="truncate">Percentage of completion</span>
                <span className="truncate">{current_completion_percent ?? 0}%</span>
              </div>
              <Progress
                size="small"
                value={current_completion_percent ?? 0}
                minValue={0}
                maxValue={100}
                indicatorColor={getIndicatorColor(current_completion_percent ?? 0)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestAutomation;
