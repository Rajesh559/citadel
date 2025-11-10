import { DonutChart } from 'dms-common-ux/components/donut-chart';

interface BugsWithRespectToSeverityProps {
  bugs: {
    customer_bugs: {
      bugs_count: { new_count: number; committed_count: number; in_progress_count: number; done_count: number };
    };
    internal_bugs: {
      bugs_count: { new_count: number; committed_count: number; in_progress_count: number; done_count: number };
    };
  };
}

const Bugs: React.FC<BugsWithRespectToSeverityProps> = ({ bugs }) => {
  const customer_bugs_count = bugs?.customer_bugs?.bugs_count ?? {
    new_count: 0,
    committed_count: 0,
    in_progress_count: 0,
    done_count: 0,
  };
  const internal_bugs_count = bugs?.internal_bugs?.bugs_count ?? {
    new_count: 0,
    committed_count: 0,
    in_progress_count: 0,
    done_count: 0,
  };

  return (
    <DonutChart
      data={[
        {
          value:
            customer_bugs_count.new_count +
            customer_bugs_count.committed_count +
            customer_bugs_count.new_count +
            customer_bugs_count.committed_count,
          label: 'New',
          color: '#751a08',
        },
        {
          value: customer_bugs_count.in_progress_count + internal_bugs_count.in_progress_count,
          label: 'In progress',
          color: '#d93616',
        },
        {
          value: customer_bugs_count.done_count + internal_bugs_count.done_count,
          label: 'Done',
          color: '#f57c64',
        },
      ]}
      label="Bugs"
      legendPosition="right"
      legendVerticalAlign="middle"
      totalValue={
        customer_bugs_count.new_count +
        customer_bugs_count.committed_count +
        internal_bugs_count.new_count +
        internal_bugs_count.committed_count +
        customer_bugs_count.in_progress_count +
        internal_bugs_count.in_progress_count +
        customer_bugs_count.done_count +
        internal_bugs_count.done_count
      }
      width={268}
      height={132}
    />
  );
};

export default Bugs;
