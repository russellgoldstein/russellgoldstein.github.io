import { useState } from 'react';
import { useGetGamesQuery } from '../../services/gameApi';
import NewGame from './NewGame';

export default function GameList() {
  const [newGame, setNewGame] = useState(null);
  const games = useGetGamesQuery();

  return games && games.data.length > 0 ? (
    <div>
      <h1>Game List</h1>
      {games.data?.map((game) => (
        <div key={game.id}>{game.id}</div>
      ))}
    </div>
  ) : (
    <NewGame setNewGame={setNewGame} />
  );
}
