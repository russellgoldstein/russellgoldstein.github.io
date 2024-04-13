import { useEffect, useState } from 'react';
import { useAdvanceGameMutation, useGetGameStateQuery } from '../../services/gameApi';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import GamePlayDisplay from '../matchup/GamePlayDisplay';
import { useGetCurrentUserQuery } from '../../services/simApi';
import { Linescore } from '../matchup/Linescore';
import { GameBoxScoreTabs } from '../matchup/GameBoxScoreTabs';
import PlayByPlayTable from '../matchup/PlayByPlayTable';
import { formatInningText } from '../../utils/Utils';
import GameStatusAction from './GameStatusAction';

export default function Game() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading, refetch } = useGetGameStateQuery(gameCode);
  const [playResult, setPlayResult] = useState(null);
  const { data: user, error: userError, isLoading: userIsLoading } = useGetCurrentUserQuery();
  const [nextPlateAppearance, setNextPlateAppearance] = useState(null);
  const [currentPlateAppearance, setCurrentPlateAppearance] = useState(null);
  const [updatedResult, setUpdatedResult] = useState(false);
  const [hiddenPlateAppearance, setHiddenPlateAppearance] = useState(null);

  const [advanceGame, { error, isLoading }] = useAdvanceGameMutation();

  useEffect(() => {
    // Setting up an interval to refetch the game state every 10 seconds
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    // Clearing the interval when the component unmounts
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (game && !nextPlateAppearance) {
      const initialPlateAppearance = game.game.plateAppearances.find(
        (pa) => pa.id === game.game.gameState.currentPlateAppearanceId
      );
      
      if(initialPlateAppearance && currentPlateAppearance && initialPlateAppearance.id !== currentPlateAppearance.id){
        const hiddenPlateAppearance = game.game.plateAppearances.find(
          (pa) => pa.id === currentPlateAppearance.id
        );
        setHiddenPlateAppearance(hiddenPlateAppearance);
      }else{
        setPlayResult({
          battedBallOutcome: initialPlateAppearance.battedBallOutcome,
          hitQuality: initialPlateAppearance.hitQuality,
          paOutcome: initialPlateAppearance.paOutcome,
        });
        setCurrentPlateAppearance(initialPlateAppearance);
      }
      
    }
  }, [game, nextPlateAppearance]);

  const revealPlateAppearance = () => {
    setCurrentPlateAppearance(hiddenPlateAppearance);
    setHiddenPlateAppearance(null);
    setPlayResult({
      battedBallOutcome: hiddenPlateAppearance.battedBallOutcome,
      hitQuality: hiddenPlateAppearance.hitQuality,
      paOutcome: hiddenPlateAppearance.paOutcome,
    })
    setUpdatedResult(true);

    
    setTimeout(() => {
      // Reset updatedResult back to false after the flash duration
      const nextPlateAppearance = game.game.plateAppearances.find(
        (pa) => pa.id === game.game.gameState.currentPlateAppearanceId
      );
      setUpdatedResult(false);

      // Now update the currentPlateAppearance and nextPlateAppearance
      // This delay ensures the user sees the flash before any new data changes

      setNextPlateAppearance(nextPlateAppearance);
      refetch();
      setPlayResult(null);
    }, 3000);
  }

  const handleAdvanceGame = async () => {
    const { data } = await advanceGame({ gameCode });
    if (data) {
      const { plateAppearance, nextPlateAppearance } = data;
      setPlayResult({
        battedBallOutcome: plateAppearance.battedBallOutcome,
        hitQuality: plateAppearance.hitQuality,
        paOutcome: plateAppearance.paOutcome,
      });
      
      setCurrentPlateAppearance(plateAppearance);
      if (nextPlateAppearance) {
        setUpdatedResult(true);
      }
      setTimeout(() => {
        // Reset updatedResult back to false after the flash duration
        setUpdatedResult(false);

        // Now update the currentPlateAppearance and nextPlateAppearance
        // This delay ensures the user sees the flash before any new data changes

        setNextPlateAppearance(nextPlateAppearance);
        refetch();
        setPlayResult(null);
      }, 3000);
    }
  };

  if (gameIsLoading) return <div>Loading...</div>;
  if (gameError) return <div>Error: {gameError.message}</div>;

  const awayLinescores = game.game.gameLineScores.filter((ls) => ls.topOfInning).sort((a, b) => a.inning - b.inning);
  const homeLinescores = game.game.gameLineScores.filter((ls) => !ls.topOfInning).sort((a, b) => a.inning - b.inning);

  const waitingForOtherTeam =
    (currentPlateAppearance?.hittingTeam.userId === user.id &&
      currentPlateAppearance?.hittingTeamReadyAt &&
      !currentPlateAppearance?.pitchingTeamReadyAt) ||
    (currentPlateAppearance?.pitchingTeam.userId === user.id &&
      currentPlateAppearance?.pitchingTeamReadyAt &&
      !currentPlateAppearance?.hittingTeamReadyAt);

  const displayedPlateAppearance =
    currentPlateAppearance && !nextPlateAppearance ? currentPlateAppearance : nextPlateAppearance;

  const plateAppearancesMap = game.game.plateAppearances
    .filter(pa => pa.id !== displayedPlateAppearance?.id && pa.id !== hiddenPlateAppearance?.id)
    .sort((a, b) => {
      if (a.inning !== b.inning) {
        return a.inning - b.inning; // Sort by inning descending
      }
      if (a.topOfInning !== b.topOfInning) {
        return b.topOfInning ? 1 : -1; // Sort by bottom of inning first, then top of inning
      }
      return b.id - a.id; // Sort by pa.id descending
    })
    .reduce((map, pa) => {
      const key = `${pa.topOfInning ? 'Top' : 'Bottom'} ${pa.inning}`;
      if (!map[key]) {
        map[key] = [];
      }
      map[key].push(pa);
      return map;
    }, {});
  
  return (
    <div className='flex flex-col space-y-4'>
      <Linescore homeLinescore={homeLinescores} awayLinescore={awayLinescores} />

      <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='flex-1'>
          {displayedPlateAppearance && (
            <GamePlayDisplay
              plateAppearance={displayedPlateAppearance}
              updatedResult={updatedResult}
              playResult={playResult}
            />
          )}
        </div>
        <div>
        <GameStatusAction gameStatus={game.game.gameStatus} waitingForOtherTeam={waitingForOtherTeam} hiddenPlateAppearance={hiddenPlateAppearance} handleAdvanceGame={handleAdvanceGame} isLoading={isLoading} revealPlateAppearance={revealPlateAppearance} />
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='flex-1 flex flex-col items-center sm:items-center'>
          <div className='w-full overflow-auto max-h-[550px]'>
            {' '}
            {/* Adjust the max-h-[size] as needed */}
            {plateAppearancesMap &&
              Object.keys(plateAppearancesMap)
                .reverse()
                .map((key) => (
                  <div key={key} className='space-y-4'>
                    <h1 className='text-2xl font-bold text-center'>{key}</h1>
                    <PlayByPlayTable plays={plateAppearancesMap[key]} />
                  </div>
                ))}
          </div>
        </div>
        <div className='flex-1'>
          <GameBoxScoreTabs
            homeBoxScore={game.homeBoxScore}
            awayBoxScore={game.awayBoxScore}
            showTabs={game.game.gameState.topOfInning}
            currentHitter={currentPlateAppearance?.hitter}
          />
        </div>
      </div>
    </div>
  );
}
