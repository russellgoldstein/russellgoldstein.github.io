import { useEffect, useState } from 'react';
import Tabs from './Tabs';
import SelectedTab from './SelectedTab';
import UnselectedTab from './UnselectedTab';
import { Linescore } from './Linescore';
import { GameBoxScore } from './GameBoxScore';
import PlayByPlayTable from './PlayByPlayTable';

export const GameResults = ({ homeBoxScore, awayBoxScore, homeLinescore, awayLinescore, playByPlay }) => {
  const [currentTab, setCurrentTab] = useState('boxscore');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'boxscore' || hash === 'play-by-play') {
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

  return (
    <div>
      {homeBoxScore.hitters &&
        homeBoxScore.hitters.length > 0 &&
        awayBoxScore.pitchers &&
        awayBoxScore.pitchers.length > 0 && (
          <div className='flex flex-col md:flex-row'>
            <div className='table-container w-full'>
              <Tabs>
                {currentTab === 'boxscore' && (
                  <>
                    <SelectedTab label='Boxscore' href='#boxscore' />
                    <UnselectedTab label='Play by Play' href='#play-by-play' />{' '}
                  </>
                )}
                {currentTab === 'play-by-play' && (
                  <>
                    <UnselectedTab label='Boxscore' href='#boxscore' />
                    <SelectedTab label='Play by Play' href='#play-by-play' />{' '}
                  </>
                )}
              </Tabs>
              <>
                {currentTab === 'boxscore' && (
                  <>
                    <Linescore homeLinescore={homeLinescore} awayLinescore={awayLinescore} />
                    <GameBoxScore homeBoxScore={homeBoxScore} awayBoxScore={awayBoxScore} />
                  </>
                )}
                {currentTab === 'play-by-play' && <PlayByPlayTable plays={playByPlay} />}
              </>
            </div>
          </div>
        )}
    </div>
  );
};
