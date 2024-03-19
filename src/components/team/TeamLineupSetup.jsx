import { useSelector } from 'react-redux';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import { TeamLineupTable } from './TeamLineupTable';
import TeamList from './TeamList';
import { useGetLineupQuery, usePostLineupMutation } from '../../services/gameApi';

export default function TeamLineupSetup({ gameCode }) {
  const lineup = useSelector((state) => state.teams.teams['away'].hitters);
  const { data: savedLineup, error: lineupError, isLoading: lineupIsLoading } = useGetLineupQuery(gameCode);
  const [postLineup, { error, isLoading }] = usePostLineupMutation();

  const submitLineup = async () => {
    const body = {
      teamType: 'away',
      lineup: lineup.map((hitter) => hitter.id),
    };
    await postLineup({ gameCode, body });
  };
  return (
    <>
      <PrimaryButtonWithIcon
        aria-controls='basic-modal'
        onClick={(e) => {
          submitLineup();
        }}
      >
        <Baseball />
        <span className='ml-2'>Submit Lineup</span>
      </PrimaryButtonWithIcon>
      <TeamLineupTable statType='default' teamType='away' />
      <TeamList teamType='away' />
    </>
  );
}
