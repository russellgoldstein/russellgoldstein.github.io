import { useGetGameStateQuery } from '../../services/gameApi';
import { GameResults } from '../matchup/GameResults';

export default function Game() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading } = useGetGameStateQuery(gameCode);

  if (gameIsLoading) return <div>Loading...</div>;
  if (gameError) return <div>Error: {gameError.message}</div>;

  return (
    <GameResults
      homeBoxScore={game.homeBoxScore}
      awayBoxScore={game.awayBoxScore}
      homeLinescore={[]}
      awayLinescore={[]}
      playByPlay={[]}
    />
  );
}
