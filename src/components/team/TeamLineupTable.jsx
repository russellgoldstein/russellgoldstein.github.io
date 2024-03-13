import TeamHittersLineupTable from './TeamHittersLineupTable';
import TeamPitchersLineupTable from './TeamPitchersLineupTable';

export const TeamLineupTable = ({ statType, teamType }) => {
  return (
    <div className='flex flex-container flex-col justify-start items-stretch space-y-6'>
      <h2 className='text-2xl font-semibold text-center mb-4'>Lineup</h2>
      <TeamHittersLineupTable teamType={teamType} statType={statType} />
      <TeamPitchersLineupTable teamType={teamType} statType={statType} />
    </div>
  );
};
