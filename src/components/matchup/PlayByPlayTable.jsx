import GamePlayDisplay from './GamePlayDisplay';

export const PlayByPlayTable = ({ plays }) => {
  return plays.length > 0 ? (
    plays.map((play, index) => (
      <GamePlayDisplay
        pitcherName={`${play.gameState.pitcher.first_name} (${play.gameState.pitcher.last_name})`}
        batterName={`${play.gameState.hitter.first_name} (${play.gameState.hitter.last_name})`}
        runners={[play.gameState.runnerOn1st, play.gameState.runnerOn2nd, play.gameState.runnerOn3rd]}
        inning={play.gameState.inning}
        outs={play.gameState.outs}
        topOfInning={play.gameState.topOfInning}
        awayScore={play.gameState.awayScore}
        homeScore={play.gameState.homeScore}
        playResult={play.playResult}
      />
    ))
  ) : (
    <div>No plays yet</div>
  );
};

export default PlayByPlayTable;
