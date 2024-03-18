import { useGetGameQuery } from '../../services/gameApi';
import MatchupSelector from '../matchup/MatchupSelector';

export default function Game() {
  // get the query param "code" from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading } = useGetGameQuery(gameCode);

  console.log('game', game);
  if (gameIsLoading) return <div>Loading...</div>;
  if (gameError) return <div>Error: {gameError.message}</div>;
  return game.gameStatus === 'Setup' ? (
    <MatchupSelector />
  ) : (
    <div>
      <h1>Game</h1>
    </div>
  );
}
