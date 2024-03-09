import TeamHittersLineupTable from './TeamHittersLineupTable';
import TeamPitchersLineupTable from './TeamPitchersLineupTable';

export const TeamLineupTable = ({
  statType,
  hittingLineup,
  setHittingLineup,
  availableHitters,
  setAvailableHitters,
  pitchingLineup,
  setPitchingLineup,
  availablePitchers,
  setAvailablePitchers,
}) => {
  return (
    <div className='flex flex-container flex-col justify-start items-stretch space-y-6'>
      <TeamHittersLineupTable
        lineup={hittingLineup}
        setLineup={setHittingLineup}
        availableHitters={availableHitters}
        setAvailableHitters={setAvailableHitters}
        statType={statType}
      />
      <TeamPitchersLineupTable
        lineup={pitchingLineup}
        setLineup={setPitchingLineup}
        availablePitchers={availablePitchers}
        setAvailablePitchers={setAvailablePitchers}
        statType={statType}
      />
    </div>
  );
};
