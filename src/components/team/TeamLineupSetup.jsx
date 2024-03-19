import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import { TeamLineupTable } from './TeamLineupTable';
import TeamList from './TeamList';
import { useGetLineupQuery, usePostLineupMutation } from '../../services/gameApi';
import { useEffect } from 'react';
import { setTeamHitters, setTeamPitchers } from '../../store/teamSlice';

export default function TeamLineupSetup({ gameCode }) {
  const hittingLineup = useSelector((state) => state.teams.teams['away'].hitters);
  const pitchingLineup = useSelector((state) => state.teams.teams['away'].pitchers);
  const { data: savedLineup, error: lineupError, isLoading: lineupIsLoading } = useGetLineupQuery({ gameCode });
  const dispatch = useDispatch();
  const [postLineup, { error, isLoading }] = usePostLineupMutation();

  useEffect(() => {
    if (savedLineup) {
      dispatch(setTeamHitters({ teamType: 'away', hitters: savedLineup.hitters }));
      dispatch(setTeamPitchers({ teamType: 'away', pitchers: savedLineup.pitchers }));
    }
  }, [savedLineup, dispatch]);

  const submitLineup = async () => {
    const body = {
      teamType: 'away',
      lineup: {
        hitters: hittingLineup.map((hitter) => hitter.player_id),
        pitchers: pitchingLineup.map((pitcher) => pitcher.player_id),
      },
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
