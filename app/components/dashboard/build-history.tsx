'use client';

import { BarChart } from 'dms-common-ux/components/bar-chart';
import { Select } from 'dms-common-ux/components/select';
import { useEffect, useMemo, useState } from 'react';

interface BuildDetail {
  result: string;
  id: string;
  finishTime: string;
  startTime: string;
  buildTime: number;
  definition: {
    id: number;
    name: string;
  };
}

interface BuildPipeline {
  total_count_per_week: number;
  latest_build_time: number;
  details: BuildDetail[];
}

interface BuildHistory {
  develop?: { [key: string]: BuildPipeline };
  master?: { [key: string]: BuildPipeline };
}

const BuildHistory = ({ history }: { history: BuildHistory }) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  const options = useMemo(() => (history?.develop ? Object.keys(history.develop).sort() : []), [history]);
  const selectOptions = options.map(option => ({ id: option, label: option, value: option }));

  useEffect(() => {
    if (options.length) setSelectedOption(options[0]);
    else setSelectedOption(undefined);
  }, [options]);

  const selectMaxWidth =
    options.length > 0 ? { maxWidth: `${Math.max(...options.map(o => o.length), 0) * 8.2}px` } : { maxWidth: '128px' };

  return (
    <div className="flex w-full flex-col gap-2">
      {options.length > 0 ? (
        <div style={selectMaxWidth}>
          <Select
            options={selectOptions}
            value={selectedOption}
            onChange={val => setSelectedOption(val)}
            className="text-foreground-secondary !border-0 text-sm font-medium"
          />
        </div>
      ) : (
        <div className="h-5"></div>
      )}
      <div className="flex w-full flex-col gap-4">
        <Branch data={selectedOption ? history?.develop?.[selectedOption] : undefined} title="Develop branch" />
        <Branch data={selectedOption ? history?.master?.[selectedOption] : undefined} title="Master branch" />
      </div>
    </div>
  );
};

const Branch = ({ data, title }: { data?: BuildPipeline; title: string }) => {
  if (!data) {
    return (
      <div className="bg-background-stateless-uplifted text-foreground-secondary flex flex-col justify-between gap-4 rounded-lg py-2 pr-2 pl-6">
        <div className="text-foreground-primary text-base leading-normal font-medium">{title}</div>
        <div className="text-foreground-secondary flex min-h-8 w-full items-center justify-center p-3.5 text-center text-lg">
          No data available.
        </div>
      </div>
    );
  }

  const { total_count_per_week = 0, latest_build_time = 0, details: items } = data || {};

  const barsData = items
    .map(item => ({
      buildNumber: item.id,
      'Build Time': item.buildTime,
      color: item.result === 'succeeded' ? 'green' : 'red',
    }))
    .reverse();

  const bars = [{ value: 'Build Time' }] as const;

  return (
    <div className="bg-background-stateless-uplifted text-foreground-secondary grid grid-cols-10 gap-6 rounded-lg py-2 pr-2 pl-6">
      <div className="col-span-6 flex flex-col justify-between gap-2">
        <div className="text-foreground-primary text-base leading-normal font-medium">{title}</div>
        <BarChart
          height={64}
          xKey="buildNumber"
          bars={bars}
          data={barsData}
          showXValues={false}
          showYValues={false}
          showGrid={false}
          showBarLabel={false}
          showLegend={false}
          barRadius={{ top: 3, bottom: 0 }}
          barWidth={5}
        />
      </div>
      <div className="col-span-4 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="text-xs leading-none font-normal">Last build time</div>
          <div className="flex items-end justify-start gap-0.5">
            <div className="text-foreground-primary text-xl leading-none font-medium">{latest_build_time}</div>
            <div className="justify-end text-xs leading-none font-normal">mins</div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xs leading-none font-normal">Builds</div>
          <div className="flex items-center justify-start gap-0.5">
            <div className="text-foreground-primary text-xl leading-none font-medium">{total_count_per_week}</div>
            <div className="justify-end text-xs leading-none font-normal">/week</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildHistory;
