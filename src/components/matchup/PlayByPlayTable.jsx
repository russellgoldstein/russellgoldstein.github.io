import GamePlayDisplay from './GamePlayDisplay';

export const PlayByPlayTable = ({ plays }) => {
  return plays.length > 0 ? (
    plays.map((play, index) => (
      <GamePlayDisplay
        pitcherName={play.gameState.pitcher.name}
        batterName={play.gameState.batter.name}
        runners={play.gameState.baseRunners}
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
