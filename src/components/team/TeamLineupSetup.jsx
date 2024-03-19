import { useSelector } from 'react-redux';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import { TeamLineupTable } from './TeamLineupTable';
import TeamList from './TeamList';
import { useGetLineupQuery, usePostLineupMutation } from '../../services/gameApi';
import { useEffect } from 'react';
import { setTeamHitters } from '../../store/teamSlice';

export default function TeamLineupSetup({ gameCode }) {
  const lineup = useSelector((state) => state.teams.teams['away'].hitters);
  const { data: savedLineup, error: lineupError, isLoading: lineupIsLoading } = useGetLineupQuery({ gameCode });
  console.log('savedLineup', savedLineup);
  const [postLineup, { error, isLoading }] = usePostLineupMutation();

  useEffect(() => {
    if (savedLineup) {
      console.log('savedLineup', savedLineup);
      setTeamHitters({ teamType: 'away', hitters: savedLineup });
    }
  }, [savedLineup]);

  const submitLineup = async () => {
    const body = {
      teamType: 'away',
      lineup: lineup.map((hitter) => hitter.player_id),
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
