import GamePlayDisplay from './GamePlayDisplay';

export const PlayByPlayTable = ({ plays }) => {
  return plays.length > 0 ? (
    plays.map((play, index) => {
      const runnersScored = [];
      if (play.runnerOn1stScored) {
        runnersScored.push(play.runnerOn1st);
      }
      if (play.runnerOn2ndScored) {
        runnersScored.push(play.runnerOn2nd);
      }
      if (play.runnerOn3rdScored) {
        runnersScored.push(play.runnerOn3rd);
      }

      if (play.hitterScored) {
        runnersScored.push(play.hitter);
      }
      console.log({ runnersScored });
      return (
        <GamePlayDisplay
          pitcherName={`${play.pitcher.first_name} (${play.pitcher.last_name})`}
          batterName={`${play.hitter.first_name} (${play.hitter.last_name})`}
          runners={[play.runnerOn1st, play.runnerOn2nd, play.runnerOn3rd]}
          inning={play.inning}
          outs={play.outs}
          topOfInning={play.topOfInning}
          awayScore={play.awayScore}
          homeScore={play.homeScore}
          playResult={{
            paOutcome: play.paOutcome,
            battedBallOutcome: play.battedBallOutcome,
            hitQuality: play.hitQuality,
            runnersScored,
          }}
        />
      );
    })
  ) : (
    <div>No plays yet</div>
  );
};

export default PlayByPlayTable;
