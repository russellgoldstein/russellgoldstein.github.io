import {
  useGetGamesQuery,
  useStartGameMutation,
  usePatchGameMutation,
  useSimFullGameMutation,
  useRestartGameMutation,
} from '../../services/gameApi';
import NewGame from './NewGame';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../global/Table';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import { useGetCurrentUserQuery } from '../../services/simApi';
import Link from '../global/Link';

export default function GameList() {
  const { data: games, error, isLoading, refetch } = useGetGamesQuery();
  const { data: user, error: userError, isLoading: userIsLoading } = useGetCurrentUserQuery();
  const [startGame, { error: startGameError, isLoading: startGameLoading }] = useStartGameMutation();
  const [simFullGame, { error: simFullGameError, isLoading: simFullGameLoading }] = useSimFullGameMutation();
  const [restartGame, { error: restartGameError, isLoading: restartGameLoading }] = useRestartGameMutation();
  const [patchGame, { error: isErrorPatchGame, isLoading: isLoadingPatchGame }] = usePatchGameMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (startGameLoading) return <div>Starting game...</div>;
  if (startGameError) return <div>Error: {startGameError.message}</div>;
  if (isLoadingPatchGame) return <div>Claiming team...</div>;
  if (isErrorPatchGame) return <div>Error: {isErrorPatchGame.message}</div>;
  if (userIsLoading) return <div>Loading...</div>;
  const claimAwayTeam = async (gameCode) => {
    await patchGame({
      gameCode,
      body: {
        claimTeamType: 'away',
      },
    });
    refetch();
  };

  const claimHomeTeam = async (gameCode) => {
    await patchGame({
      gameCode,
      body: {
        claimTeamType: 'home',
      },
    });
    refetch();
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor(
      (row) => (
        <Link
          href={`http://${window.location.host}/game?code=${row.gameCode}`}
          disabled={!row.homeTeamId || !row.awayTeamId}
        >
          {row.title}
        </Link>
      ),
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
                disabled={!row.awayTeamReady || !row.homeTeamReady}
                aria-controls='basic-modal'
                onClick={async (e) => {
                  await startGame({ gameCode: row.gameCode });
                  refetch();
                }}
              >
                <Baseball />
                <span className='ml-2'>Start Game</span>
              </PrimaryButtonWithIcon>
              <PrimaryButtonWithIcon
                disabled={!row.awayTeamReady || !row.homeTeamReady}
                aria-controls='basic-modal'
                onClick={async (e) => {
                  await simFullGame({ gameCode: row.gameCode });
                  refetch();
                }}
              >
                <Baseball />
                <span className='ml-2'>Sim Full Game</span>
              </PrimaryButtonWithIcon>
            </>
          );
        }
        if (
          row.gameStatus === 'Setup Teams' &&
          user?.id !== row.awayTeam?.user.id &&
          user?.id !== row.homeTeam?.user.id
        ) {
          return (
            <>
              {!row.awayTeamId && (
                <>
                  <PrimaryButtonWithIcon
                    aria-controls='basic-modal'
                    onClick={(e) => {
                      claimAwayTeam(row.gameCode);
                    }}
                  >
                    <Baseball />
                    <span className='ml-2'>Claim Away Team</span>
                  </PrimaryButtonWithIcon>
                </>
              )}
              {!row.homeTeamId && (
                <>
                  <PrimaryButtonWithIcon
                    aria-controls='basic-modal'
                    onClick={(e) => {
                      claimHomeTeam(row.gameCode);
                    }}
                  >
                    <Baseball />
                    <span className='ml-2'>Claim Home Team</span>
                  </PrimaryButtonWithIcon>
                </>
              )}
            </>
          );
        }
        if (
          row.gameStatus === 'Setup Teams' &&
          (user?.id === row.awayTeam?.user.id || user?.id === row.homeTeam?.user.id)
        ) {
          return 'Waiting for other team to claim...';
        }
        if (row.gameStatus === 'In Progress') {
          return (
            <>
              <PrimaryButtonWithIcon
                aria-controls='basic-modal'
                onClick={(e) => {
                  restartGame({ gameCode: row.gameCode });
                  refetch();
                }}
              >
                <Baseball />
                <span className='ml-2'>Restart Game</span>
              </PrimaryButtonWithIcon>
            </>
          );
        }
      },
      { header: 'Actions', cell: (info) => info.renderValue() }
    ),
  ];

  return games && games.length > 0 ? (
    <div>
      <NewGame onNewGame={refetch} />
      <Table columns={columns} data={games} />
    </div>
  ) : (
    <NewGame onNewGame={refetch} />
  );
}
