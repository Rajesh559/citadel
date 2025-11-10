import EllipseStatus from '@/app/components/common/ellipse-status';
import { RadialChart } from 'dms-common-ux/components/radial-chart';

interface BugsWithRespectToSeverityProps {
  bugs: {
    customer_bugs: {
      severity_count: {
        low: number;
        medium: number;
        high: number;
        critical: number;
      };
    };
    internal_bugs: {
      severity_count: {
        low: number;
        medium: number;
        high: number;
        critical: number;
      };
    };
  };
}

const BugsWithRespectToSeverity: React.FC<BugsWithRespectToSeverityProps> = ({ bugs }) => {
  const defaultSeverity = { low: 0, medium: 0, high: 0, critical: 0 };

  const customer_bugs = bugs?.customer_bugs ?? { severity_count: defaultSeverity };
  customer_bugs.severity_count = customer_bugs.severity_count ?? defaultSeverity;

  const internal_bugs = bugs?.internal_bugs ?? { severity_count: defaultSeverity };
  internal_bugs.severity_count = internal_bugs.severity_count ?? defaultSeverity;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <RadialChart
          data={[
            {
              label: 'Low',
              color: 'var(--color-status-primary-success)',
              value: customer_bugs.severity_count.low || 0,
            },
            {
              label: 'Medium',
              color: 'var(--color-border-status-warning-potential-risk)',
              value: customer_bugs.severity_count.medium || 0,
            },
            {
              label: 'High',
              color: 'var(--color-status-primary-warning-severe)',
              value: customer_bugs.severity_count.high || 0,
            },
            {
              label: 'Critical',
              color: 'var(--color-status-primary-error)',
              value: customer_bugs.severity_count.critical || 0,
            },
          ]}
          label="Customer Bugs"
          showLegend={false}
          width={130}
          height={105}
        />
        <RadialChart
          data={[
            {
              label: 'Low',
              color: 'var(--color-status-primary-success)',
              value: internal_bugs.severity_count.low || 0,
            },
            {
              label: 'Medium',
              color: 'var(--color-border-status-warning-potential-risk)',
              value: internal_bugs.severity_count.medium || 0,
            },
            {
              label: 'High',
              color: 'var(--color-status-primary-warning-severe)',
              value: internal_bugs.severity_count.high || 0,
            },
            {
              label: 'Critical',
              color: 'var(--color-status-primary-error)',
              value: internal_bugs.severity_count.critical || 0,
            },
          ]}
          label="Internal Bugs"
          showLegend={false}
          width={130}
          height={105}
        />
      </div>
      {(customer_bugs.severity_count.low ||
        customer_bugs.severity_count.medium ||
        customer_bugs.severity_count.high ||
        customer_bugs.severity_count.critical ||
        internal_bugs.severity_count.low ||
        internal_bugs.severity_count.medium ||
        internal_bugs.severity_count.high ||
        internal_bugs.severity_count.critical) > 0 && (
        <div className="flex w-full flex-wrap justify-center gap-1.5">
          <EllipseStatus color="status-primary-success" status="Low" shape="square" />
          <EllipseStatus color="border-status-warning-potential-risk" status="Medium" shape="square" />
          <EllipseStatus color="status-primary-warning-severe" status="High" shape="square" />
          <EllipseStatus color="status-primary-error" status="Critical" shape="square" />
        </div>
      )}
    </div>
  );
};

export default BugsWithRespectToSeverity;
