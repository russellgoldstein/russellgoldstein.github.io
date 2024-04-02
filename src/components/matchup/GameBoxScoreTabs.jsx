import BoxScoreTable from './BoxScoreTable';
import '../index.css';
import { useEffect, useState } from 'react';
import Tabs from '../global/Tabs';
import SelectedTab from '../global/SelectedTab';
import UnselectedTab from '../global/UnselectedTab';

export const GameBoxScoreTabs = ({ homeBoxScore, awayBoxScore, showTab = 'away' }) => {
  const [currentTab, setCurrentTab] = useState(showTab);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'away' || hash === 'home') {
        setCurrentTab(hash);
      }
    };

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange, false);

    // Call the handler in case the hash is already set on component mount
    handleHashChange();

    // Cleanup listener on component unmount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { hitters: homeHitterBoxScore, pitchers: homePitcherBoxScore } = homeBoxScore;
  const { hitters: awayHitterBoxScore, pitchers: awayPitcherBoxScore } = awayBoxScore;
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='table-container w-full'>
        <Tabs>
          {currentTab === 'away' && (
            <>
              <SelectedTab label='Away' href='#away' />
              <UnselectedTab label='Home' href='#home' />{' '}
            </>
          )}
          {currentTab === 'home' && (
            <>
              <UnselectedTab label='Away' href='#away' />
              <SelectedTab label='Home' href='#home' />{' '}
            </>
          )}
        </Tabs>
        <>
          {currentTab === 'away' && awayHitterBoxScore.length > 0 && awayPitcherBoxScore.length > 0 && (
            <BoxScoreTable hitterBoxScore={awayHitterBoxScore} pitcherBoxScore={awayPitcherBoxScore} />
          )}
          {currentTab === 'home' && homeHitterBoxScore.length > 0 && homePitcherBoxScore.length > 0 && (
            <BoxScoreTable hitterBoxScore={homeHitterBoxScore} pitcherBoxScore={homePitcherBoxScore} />
          )}
        </>
      </div>
    </div>
  );
};
