import { useState } from 'react';
import { useGetGamesQuery, useStartGameMutation } from '../../services/gameApi';
import NewGame from './NewGame';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../global/Table';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';

export default function GameList() {
  const [newGame, setNewGame] = useState(null);
  const { data: games, error, isLoading } = useGetGamesQuery();
  const [startGame, { error: startGameError, isLoading: startGameLoading }] = useStartGameMutation();

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
    columnHelper.accessor(
      (row) => {
        if (row.gameStatus === 'Lineup Setup') {
          return (
            <>
              <PrimaryButtonWithIcon
                aria-controls='basic-modal'
                onClick={async (e) => {
                  await startGame({ gameCode: row.gameCode });
                }}
              >
                <Baseball />
                <span className='ml-2'>Start Game</span>
              </PrimaryButtonWithIcon>
            </>
          );
        }
        if (row.gameStatus === 'In Progress') {
          return <a href={`http://${window.location.host}/game?code=${row.gameCode}`}>Resume</a>;
        } else {
          return <a href={`http://${window.location.host}/game?code=${row.gameCode}`}>View</a>;
        }
      },
      { header: 'Actions', cell: (info) => info.renderValue() }
    ),
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (startGameLoading) return <div>Starting game...</div>;
  if (startGameError) return <div>Error: {startGameError.message}</div>;
  return games && games.length > 0 ? (
    <div>
      <NewGame setNewGame={setNewGame} />
      <Table columns={columns} data={games} />
    </div>
  ) : (
    <NewGame setNewGame={setNewGame} />
  );
}
