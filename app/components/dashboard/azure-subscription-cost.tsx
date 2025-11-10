interface CostDisplayProps {
  title: string;
  cost: number;
}

interface AzureSubscriptionCostProps {
  prod?: number;
  nonProd?: number;
}

const AzureSubscriptionCost: React.FC<AzureSubscriptionCostProps> = ({ prod = 0, nonProd = 0 }) => (
  <div className="flex w-full justify-between">
    <Cost title="Production" cost={prod} />
    <Cost title="Non Production" cost={nonProd} />
  </div>
);

const Cost: React.FC<CostDisplayProps> = ({ title, cost }) => (
  <div className="flex h-32 w-full flex-col items-center justify-center gap-2">
    <div className="text-foreground-primary justify-center text-sm leading-tight font-medium whitespace-nowrap">
      {title}
    </div>
    <div className="text-global-grey-90 text-center text-3xl leading-10 font-medium 2xl:text-2xl">${cost}</div>
    <div className="bg-data-viz-primary-selection-blue-secondary flex items-center justify-center gap-2.5 rounded-[100px] p-2">
      <div className="text-xs font-medium">Last 30 days</div>
    </div>
  </div>
);

export default AzureSubscriptionCost;
