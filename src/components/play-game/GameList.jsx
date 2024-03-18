import { useState } from 'react';
import { useGetGamesQuery } from '../../services/gameApi';
import NewGame from './NewGame';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../global/Table';

export default function GameList() {
  const [newGame, setNewGame] = useState(null);
  const { data: games, error, isLoading } = useGetGamesQuery();

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor(
      (row) => <a href={`http://${window.location.host}/game?code=${row.gameCode}`}>{row.title}</a>,
      {
        header: 'Title',
        cell: (info) => info.renderValue(),
      }
    ),
    columnHelper.accessor('gameState.inning', { header: 'Inning' }),
    columnHelper.accessor('gameState.awayScore', { header: 'Away' }),
    columnHelper.accessor('gameState.homeScore', { header: 'Home' }),
    columnHelper.accessor('gameStatus', { header: 'Status' }),
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return games && games.length > 0 ? (
    <div>
      <Table columns={columns} data={games} />
    </div>
  ) : (
    <NewGame setNewGame={setNewGame} />
  );
}
