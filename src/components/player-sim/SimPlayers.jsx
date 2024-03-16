import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import { useEffect, useState } from 'react';
import { SearchPlayers } from '../global/SearchPlayers';
import HittersTable from '../global/players/HittersTable';
import PitchersTable from '../global/players/PitchersTable';
import { useSimPlayersMutation } from '../../services/fgApi';
import BoxScoreTable from '../matchup/BoxScoreTable';
import { getHitterSimColumns } from '../../utils/consts';
import Table from '../global/Table';

const hitterSimColumns = getHitterSimColumns();
export const SimPlayers = () => {
  const [hitter, setHitter] = useState(null);
  const [pitcher, setPitcher] = useState(null);
  const [hitterBoxScore, setHitterBoxScore] = useState([]);
  const [pitcherBoxScore, setPitcherBoxScore] = useState([]);
  const [simPlayers, { data: simPlay, error: simPlayError, isLoading: simPlayLoading }] = useSimPlayersMutation();

  const submitSim = async () => {
    const result = await simPlayers({
      hitterId: hitter?.id,
      pitcher: pitcher?.id,
      pa: 650,
    });
    console.log('result', result);
    setHitterBoxScore([result.data.hitterBoxscore]);
    // const result = await playGame({
    //   awayTeamHitters,
    //   awayTeamPitchers,
    //   homeTeamHitters,
    //   homeTeamPitchers,
    // });
    // const { homeHitters, homePitcher, awayHitters, awayPitcher } = result.data.boxscore;
    // const { home: homeLinescore, away: awayLinescore } = result.data.linescore;
    // const plays = result.data.playByPlay;
    // setPlayByPlay(plays);
    // setHomeLinescore(homeLinescore);
    // setAwayLinescore(awayLinescore);
    // const homeBoxScore = processDataForBoxscore(homeHitters, homePitcher, 'home');
    // const awayBoxScore = processDataForBoxscore(awayHitters, awayPitcher, 'away');
    // setHomeBoxScore(homeBoxScore);
    // setAwayBoxScore(awayBoxScore);
  };

  const isPlayBallButtonDisabled = () => {
    return !hitter && !pitcher;
  };

  console.log('in sim players component', hitterBoxScore);
  return (
    <div className='flex flex-container flex-col space-x-2 justify-center items-center'>
      <PrimaryButtonWithIcon onClick={submitSim} disabled={isPlayBallButtonDisabled()}>
        <Baseball />
        <span className='ml-2'> Sim Players</span>
      </PrimaryButtonWithIcon>
      <div>
        {/* {playGameLoading && <div>Simulating Players...</div>}
        {playGameError && <div>Error Simulation: {playGameError.message}</div>} */}
        {hitterBoxScore && hitterBoxScore.length > 0 && <Table columns={hitterSimColumns} data={hitterBoxScore} />}
      </div>
      <div>
        Find Hitter
        <SearchPlayers onClick={setHitter} />
        <HittersTable statType='default' playerId={hitter?.id} />
      </div>
      <div>
        Find Pitcher
        <SearchPlayers onClick={setPitcher} />
        <PitchersTable statType='default' playerId={pitcher?.id} />
      </div>
    </div>
  );
};
