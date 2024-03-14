import { useGetPlayersQuery } from '../../services/fgApi';

export function SearchPlayers({ searchTerm, onClick }) {
  const {
    data: players,
    error: playersError,
    isLoading: playersLoading,
  } = useGetPlayersQuery({ firstName: searchTerm, lastName: searchTerm, type: 'hitter' });
  return (
    <div>
      {playersLoading && <div>Searching for players...</div>}
      {playersError && <div>Error: {playersError.message}</div>}
      {players && (
        <div>
          <ul>
            {players.map((player) => (
              <li key={player.id} onClick={() => onClick(player)}>
                {player.first_name} {player.last_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
