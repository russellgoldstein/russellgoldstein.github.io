import BoxScoreTable from './BoxScoreTable';

export const GameBoxScore = ({ homeBoxScore, awayBoxScore }) => {
  const { hitters: homeHitterBoxScore, pitchers: homePitcherBoxScore } = homeBoxScore;
  const { hitters: awayHitterBoxScore, pitchers: awayPitcherBoxScore } = awayBoxScore;
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='table-container w-full md:w-1/2'>
        {awayHitterBoxScore.length > 0 && awayPitcherBoxScore.length > 0 && (
          <BoxScoreTable hitterBoxScore={awayHitterBoxScore} pitcherBoxScore={awayPitcherBoxScore} />
        )}
      </div>
      <div className='table-container w-full md:w-1/2'>
        {homeHitterBoxScore.length > 0 && homePitcherBoxScore.length > 0 && (
          <BoxScoreTable hitterBoxScore={homeHitterBoxScore} pitcherBoxScore={homePitcherBoxScore} />
        )}
      </div>
    </div>
  );
};
