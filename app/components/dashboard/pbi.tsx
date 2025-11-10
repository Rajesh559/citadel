import { DonutChart } from 'dms-common-ux/components/donut-chart';

interface PBIProps {
  pbis: {
    new_count: number;
    committed_count: number;
    in_progress_count: number;
    done_count: number;
  };
}

const PBI: React.FC<PBIProps> = ({ pbis }) => {
  const { new_count, committed_count, in_progress_count, done_count } = pbis ?? {
    new_count: 0,
    committed_count: 0,
    in_progress_count: 0,
    done_count: 0,
  };
  return (
    <DonutChart
      data={[
        { value: new_count + committed_count, label: 'New', color: '#004480' },
        { value: in_progress_count, label: 'In progress', color: '#1b7ac2' },
        { value: done_count, label: 'Done', color: '#00acec' },
      ]}
      label="PBIs"
      legendPosition="right"
      legendVerticalAlign="middle"
      totalValue={new_count + committed_count + in_progress_count + done_count}
      width={268}
      height={132}
    />
  );
};

export default PBI;
