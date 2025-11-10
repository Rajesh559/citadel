import { Icon } from 'dms-common-ux/components/icon';
import { Tooltip } from 'dms-common-ux/components/tooltip';

interface TotalResourcesProps {
  resources: {
    available_count: number;
    unavailable_members: string[];
    unavailable_count: number;
  };
}

const TotalResources: React.FC<TotalResourcesProps> = ({ resources }) => {
  const { available_count, unavailable_count, unavailable_members } = resources ?? {
    available_count: 0,
    unavailable_count: 0,
    unavailable_members: [],
  };
  return (
    <div className="flex h-32 w-full items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="text-status-primary-success text-5xl font-medium">{available_count}</div>
        <div className="bg-status-discreet-success flex items-center justify-center gap-2.5 rounded-[75px] p-2">
          <div className="text-xs font-medium">Available</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-status-primary-warning-severe text-5xl font-medium">{unavailable_count}</div>
        <div className="bg-status-discreet-warning-severe flex items-center justify-center gap-2.5 rounded-[100px] p-2">
          {unavailable_members.length > 0 ? (
            <Tooltip
              position="right"
              content={
                <ol className="flex flex-col gap-2 py-1">
                  {unavailable_members.map((member, index) => (
                    <li key={member}>{`${index + 1}. ${member}`}</li>
                  ))}
                </ol>
              }
            >
              <div className="flex flex-row items-center gap-1 text-xs font-medium">
                <div>Unavailable</div>
                <Icon name="abb/information-circle-2" size="0.75rem" />
              </div>
            </Tooltip>
          ) : (
            <div className="flex flex-row items-center gap-1 text-xs font-medium">
              <div>Unavailable</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalResources;
