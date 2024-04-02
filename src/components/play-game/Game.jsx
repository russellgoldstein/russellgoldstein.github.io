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

export default function Game() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading, refetch } = useGetGameStateQuery(gameCode);
  const [playResult, setPlayResult] = useState(null);
  const { data: user, error: userError, isLoading: userIsLoading } = useGetCurrentUserQuery();
  const [nextPlateAppearance, setNextPlateAppearance] = useState(null);
  const [currentPlateAppearance, setCurrentPlateAppearance] = useState(null);
  const [updatedResult, setUpdatedResult] = useState(false);

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
      setPlayResult({
        battedBallOutcome: initialPlateAppearance.battedBallOutcome,
        hitQuality: initialPlateAppearance.hitQuality,
        paOutcome: initialPlateAppearance.paOutcome,
      });
      setCurrentPlateAppearance(initialPlateAppearance);
    }
  }, [game, nextPlateAppearance]);

  const handleAdvanceGame = async () => {
    const { data } = await advanceGame({ gameCode });
    if (data) {
      const { plateAppearance, nextPlateAppearance } = data;
      setPlayResult({
        battedBallOutcome: plateAppearance.battedBallOutcome,
        hitQuality: plateAppearance.hitQuality,
        paOutcome: plateAppearance.paOutcome,
      });
      console.log({ nextPlateAppearance, plateAppearance });
      setCurrentPlateAppearance(plateAppearance);
      if (nextPlateAppearance) {
        console.log('Setting updated result');
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
      currentPlateAppearance?.hittingTeamReady &&
      !currentPlateAppearance?.pitchingTeamReady) ||
    (currentPlateAppearance?.pitchingTeam.userId === user.id &&
      currentPlateAppearance?.pitchingTeamReady &&
      !currentPlateAppearance?.hittingTeamReady);

  const displayedPlateAppearance =
    currentPlateAppearance && !nextPlateAppearance ? currentPlateAppearance : nextPlateAppearance;

  const plateAppearances = game.game.plateAppearances
    .filter(
      (pa) =>
        pa.inning === game.game.gameState.inning &&
        pa.topOfInning === game.game.gameState.topOfInning &&
        pa.id !== displayedPlateAppearance?.id
    )
    .sort((a, b) => b.id - a.id);
  console.log({ displayedPlateAppearance });
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
          {game.game.gameStatus !== 'Final' ? (
            !waitingForOtherTeam ? (
              <PrimaryButtonWithIcon aria-controls='basic-modal' onClick={handleAdvanceGame} disabled={isLoading}>
                <Baseball />
                <span className='ml-2'>Submit Plate Appearance</span>
              </PrimaryButtonWithIcon>
            ) : (
              <div>Waiting for other team</div>
            )
          ) : (
            'Game Over'
          )}
        </div>
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='flex-1 flex flex-col items-center sm:items-center'>
          <h1 className='text-2xl font-bold text-center'>
            {formatInningText(game.game.gameState.inning, game.game.gameState.topOfInning)}
          </h1>
          <PlayByPlayTable plays={plateAppearances} />
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
