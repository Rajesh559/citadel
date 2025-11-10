import Squad from '@/app/components/dashboard/squad';

interface SquadInsightsProps {
  teams: {
    name: 'bedrock' | 'rancher' | 'chamberlain' | 'foundation' | 'marshal' | 'guards' | 'defender' | 'sentinels';
    velocity_percent: number;
    tasks: {
      completed_count: number;
      completed_percent: number;
      remaining_count: number;
      total_count: number;
    };
    pbis: {
      completed_count: number;
      completed_percent: number;
      remaining_count: number;
      total_count: number;
    };
    bugs: {
      completed_count: number;
      completed_percent: number;
      remaining_count: number;
      total_count: number;
    };
  }[];
}

const SquadInsights: React.FC<SquadInsightsProps> = ({ teams }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {teams?.map(team => (
        <Squad
          key={team.name}
          title={team.name}
          velocity={team.velocity_percent}
          totalTasks={team.tasks.total_count}
          taskValue={team.tasks.completed_count}
          TotalPbis={team.pbis.total_count}
          pbiValue={team.pbis.completed_count}
          totalBugs={team.bugs.total_count}
          bugValue={team.bugs.completed_count}
        />
      ))}
    </div>
  );
};

export default SquadInsights;
