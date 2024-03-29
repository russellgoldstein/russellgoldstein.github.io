import { useSelector } from 'react-redux';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import { usePlayGameMutation } from '../../services/fgApi';

export const SimMatchup = ({ setPlayByPlay, setHomeLinescore, setAwayBoxScore, setHomeBoxScore, setAwayLinescore }) => {
  const awayTeamHitters = useSelector((state) => state.teams.teams.away.hitters);
  const awayTeamPitchers = useSelector((state) => state.teams.teams.away.pitchers);
  const homeTeamHitters = useSelector((state) => state.teams.teams.home.hitters);
  const homeTeamPitchers = useSelector((state) => state.teams.teams.home.pitchers);
  const [playGame, { error: playGameError, isLoading: playGameLoading }] = usePlayGameMutation();

  const submitMatchup = async () => {
    const result = await playGame({
      awayTeamHitters,
      awayTeamPitchers,
      homeTeamHitters,
      homeTeamPitchers,
    });
    const { homeHitters, homePitcher, awayHitters, awayPitcher } = result.data.boxscore;
    const { home: homeLinescore, away: awayLinescore } = result.data.linescore;
    const plays = result.data.playByPlay;
    setPlayByPlay(plays);
    setHomeLinescore(homeLinescore);
    setAwayLinescore(awayLinescore);
    const homeBoxScore = processDataForBoxscore(homeHitters, homePitcher, 'home');
    const awayBoxScore = processDataForBoxscore(awayHitters, awayPitcher, 'away');
    setHomeBoxScore(homeBoxScore);
    setAwayBoxScore(awayBoxScore);
  };

  const isPlayBallButtonDisabled = () => {
    return (
      awayTeamHitters.length < 9 ||
      awayTeamPitchers.length < 1 ||
      homeTeamHitters.length < 9 ||
      homeTeamPitchers.length < 1
    );
  };

  return (
    <div className='flex flex-container flex-col space-x-2 justify-center items-center'>
      <PrimaryButtonWithIcon onClick={submitMatchup} disabled={isPlayBallButtonDisabled()}>
        <Baseball />
        <span className='ml-2'> Play Ball!</span>
      </PrimaryButtonWithIcon>
      <div>
        {playGameLoading && <div>Simulating Game...</div>}
        {playGameError && <div>Error Simulation: {playGameError.message}</div>}
      </div>
    </div>
  );
};

const processDataForBoxscore = (hitterData, pitcherData, team) => {
  // Process hitters from both teams
  const hitters = hitterData.map((hitter) => ({
    ...hitter,
    team: team,
    name: hitter.player.name,
    PA: hitter.plateAppearances,
    R: hitter.runs,
    H: hitter.hits,
    '1B': hitter.singles,
    '2B': hitter.doubles,
    '3B': hitter.triples,
    HR: hitter.homeruns,
    RBI: hitter.rbi,
    BB: hitter.walks,
    SO: hitter.strikeouts,
  }));

  // Process pitchers
  const pitcher = {
    name: pitcherData.player.name,
    team: team,
    IP: pitcherData.outs / 3, // Assuming plate appearances can be directly converted to innings pitched, adjust based on actual logic
    H: pitcherData.hits,
    R: pitcherData.runs,
    ER: pitcherData.runs, // Assuming runs are equivalent to earned runs, adjust if necessary
    BB: pitcherData.walks,
    SO: pitcherData.strikeouts,
  };

  return {
    hitters,
    pitchers: [pitcher],
  };
};
