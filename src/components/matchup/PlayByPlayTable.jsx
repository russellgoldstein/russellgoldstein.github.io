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

      const playResult = {
        battedBallOutcome: play.battedBallOutcome,
        hitQuality: play.hitQuality,
        paOutcome: play.paOutcome,
      };
      return <GamePlayDisplay plateAppearance={play} runnersScored={runnersScored} playResult={playResult} />;
    })
  ) : (
    <div>No plays yet</div>
  );
};

export default PlayByPlayTable;
