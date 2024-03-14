import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import SearchForm from '../global/SearchForm';
import { useEffect, useState } from 'react';
import { SearchPlayers } from '../global/SearchPlayers';
import HittersTable from '../global/players/HittersTable';

export const SimPlayers = ({ setHitterBoxScore, setPitcherBoxScore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hitter, setHitter] = useState(null);
  const [pitcher, setPitcher] = useState(null);
  const submitSim = async () => {
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

  console.log('in sim players component', hitter);
  return (
    <div className='flex flex-container flex-col space-x-2 justify-center items-center'>
      <PrimaryButtonWithIcon onClick={submitSim} disabled={isPlayBallButtonDisabled()}>
        <Baseball />
        <span className='ml-2'> Sim Players</span>
      </PrimaryButtonWithIcon>
      <div>
        {/* {playGameLoading && <div>Simulating Players...</div>}
        {playGameError && <div>Error Simulation: {playGameError.message}</div>} */}
      </div>
      <div>
        Find Hitters
        <SearchForm onSearch={setSearchTerm} />
        {searchTerm && searchTerm.length > 2 && <SearchPlayers searchTerm={searchTerm} onClick={setHitter} />}
        <HittersTable statType='default' playerId={hitter?.id} />
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
