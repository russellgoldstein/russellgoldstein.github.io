import { useGetGameQuery } from '../../services/gameApi';

import TeamLineupSetup from '../team/TeamLineupSetup';
import Game from './Game';

export default function GameStatus() {
  // get the query param "code" from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading } = useGetGameQuery(gameCode);

  if (gameIsLoading) return <div>Loading...</div>;
  if (gameError) return <div>Error: {gameError.message}</div>;
  return game.gameStatus === 'Lineup Setup' ? <TeamLineupSetup gameCode={gameCode} /> : <Game />;
}
