import { useGetGameQuery, usePatchGameMutation } from '../../services/gameApi';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import TeamLineupSetup from '../team/TeamLineupSetup';

export default function Game() {
  // get the query param "code" from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const gameCode = urlParams.get('code');
  const { data: game, error: gameError, isLoading: gameIsLoading } = useGetGameQuery(gameCode);
  const [patchGame, { error, isLoading }] = usePatchGameMutation();

  const claimAwayTeam = async () => {
    console.log('claim away team');
    await patchGame({
      gameCode,
      body: {
        claimTeamType: 'away',
      },
    });
  };

  const claimHomeTeam = () => {
    console.log('claim home team');
    patchGame({
      gameCode,
      body: {
        claimTeamType: 'home',
      },
    });
  };

  if (gameIsLoading) return <div>Loading...</div>;
  if (gameError) return <div>Error: {gameError.message}</div>;
  if (game.gameStatus === 'Setup Teams') {
    return (
      <>
        <h1>Claim Teams</h1>
        {!game.awayTeamId && (
          <>
            <PrimaryButtonWithIcon
              aria-controls='basic-modal'
              onClick={(e) => {
                claimAwayTeam();
              }}
            >
              <Baseball />
              <span className='ml-2'>Claim Away Team</span>
            </PrimaryButtonWithIcon>
          </>
        )}
        {!game.homeTeamId && (
          <>
            <PrimaryButtonWithIcon
              aria-controls='basic-modal'
              onClick={(e) => {
                claimHomeTeam();
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
  return game.gameStatus === 'Lineup Setup' ? (
    <TeamLineupSetup gameCode={gameCode} />
  ) : (
    <div>
      <h1>Game</h1>
    </div>
  );
}
