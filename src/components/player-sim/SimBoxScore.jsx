import BoxScoreTable from '../matchup/BoxScoreTable';
import '../index.css';

export const SimBoxScore = ({ hitterBoxScore, pitcherBoxScore }) => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='table-container w-full md:w-1/2'>
        <BoxScoreTable hitterBoxScore={hitterBoxScore} />
      </div>
      <div className='table-container w-full md:w-1/2'>
        <BoxScoreTable pitcherBoxScore={pitcherBoxScore} />
      </div>
    </div>
  );
};
