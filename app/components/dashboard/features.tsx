import { DonutChart } from 'dms-common-ux/components/donut-chart';

interface FeaturesProps {
  features: {
    new_count: number;
    committed_count: number;
    in_progress_count: number;
    done_count: number;
  };
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  const { new_count, committed_count, in_progress_count, done_count } = features ?? {
    new_count: 0,
    committed_count: 0,
    in_progress_count: 0,
    done_count: 0,
  };
  return (
    <DonutChart
      data={[
        { value: new_count + committed_count, label: 'New', color: '#4a014a' },
        { value: in_progress_count, label: 'In progress', color: '#a13fa1' },
        { value: done_count, label: 'Done', color: '#e670e6' },
      ]}
      label="Features"
      legendPosition="right"
      legendVerticalAlign="middle"
      totalValue={new_count + committed_count + in_progress_count + done_count}
      width={268}
      height={132}
    />
  );
};

export default Features;
