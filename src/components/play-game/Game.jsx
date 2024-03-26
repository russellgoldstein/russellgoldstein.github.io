import { useState } from 'react';
import { useAdvanceGameMutation, useGetGameStateQuery } from '../../services/gameApi';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import GamePlayDisplay from '../matchup/GamePlayDisplay';
import { GameResults } from '../matchup/GameResults';

export default function Game() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading, refetch } = useGetGameStateQuery(gameCode);
  const [playResult, setPlayResult] = useState(null);

  const [advanceGame, { error, isLoading }] = useAdvanceGameMutation();

  if (gameIsLoading) return <div>Loading...</div>;
  if (gameError) return <div>Error: {gameError.message}</div>;
  const currentPitcherId = game.game.gameState.currentPitcherId;
  const currentBatterId = game.game.gameState.currentBatterId;
  const currentBatter =
    game.awayBoxScore.hitters.find((hitter) => hitter.player.id === currentBatterId) ??
    game.homeBoxScore.hitters.find((hitter) => hitter.player.id === currentBatterId);

  const currentPitcher =
    game.awayBoxScore.pitchers.find((pitcher) => pitcher.player.id === currentPitcherId) ??
    game.homeBoxScore.pitchers.find((pitcher) => pitcher.player.id === currentPitcherId);

  console.log(game.game);
  const awayLinescores = game.game.gameLineScores.filter((ls) => ls.topOfInning).sort((a, b) => a.inning - b.inning);
  const homeLinescores = game.game.gameLineScores.filter((ls) => !ls.topOfInning).sort((a, b) => a.inning - b.inning);
  return (
    <>
      <GamePlayDisplay
        pitcherName={`${currentPitcher.player.first_name} ${currentPitcher.player.last_name}`}
        batterName={`${currentBatter.player.first_name} ${currentBatter.player.last_name}`}
        runners={[game.game.gameState.runnerOn1st, game.game.gameState.runnerOn2nd, game.game.gameState.runnerOn3rd]}
        inning={game.game.gameState.inning}
        outs={game.game.gameState.outs}
        topOfInning={game.game.gameState.topOfInning}
        awayScore={game.game.gameState.awayScore}
        homeScore={game.game.gameState.homeScore}
        playResult={playResult}
      />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PrimaryButtonWithIcon
          aria-controls='basic-modal'
          onClick={async (e) => {
            const updatedPa = await advanceGame({
              gameCode,
            });
            setPlayResult({
              battedBallOutcome: updatedPa.data.battedBallOutcome,
              hitQuality: updatedPa.data.hitQuality,
              paOutcome: updatedPa.data.paOutcome,
            });
            await refetch();
          }}
        >
          <Baseball />
          <span className='ml-2'>Submit Plate Appearance</span>
        </PrimaryButtonWithIcon>
      </div>
      <GameResults
        homeBoxScore={game.homeBoxScore}
        awayBoxScore={game.awayBoxScore}
        homeLinescore={homeLinescores}
        awayLinescore={awayLinescores}
        playByPlay={game.game.plateAppearances}
      />
    </>
  );
}
