import { SimBoxScore } from './SimBoxScore';

export const SimResults = ({ hitterBoxscore, pitcherBoxscore }) => {
  return (
    <div>
      {(hitterBoxscore || pitcherBoxscore) && (
        <div className='flex flex-col md:flex-row'>
          <div className='table-container w-full'>
            <SimBoxScore hitterBoxScore={hitterBoxscore} pitcherBoxScore={pitcherBoxscore} />
          </div>
        </div>
      )}
    </div>
  );
};
