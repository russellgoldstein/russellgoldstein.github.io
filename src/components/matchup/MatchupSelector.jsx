import { useEffect, useState } from 'react';

import UnselectedTab from '../global/UnselectedTab';
import SelectedTab from '../global/SelectedTab';
import Tabs from '../global/Tabs';
import { SimMatchup } from './SimMatchup';
import { GameResults } from './GameResults';
import { TeamLineupTable } from '../team/TeamLineupTable';
import TeamList from '../team/TeamList';

export default function MatchupSelector() {
  const [homeBoxScore, setHomeBoxScore] = useState([]);
  const [awayBoxScore, setAwayBoxScore] = useState([]);
  const [homeLinescore, setHomeLinescore] = useState([]);
  const [awayLinescore, setAwayLinescore] = useState([]);
  const [playByPlay, setPlayByPlay] = useState([]);

  const [currentTab, setCurrentTab] = useState('away-team'); // Default to showing away team

  useEffect(() => {
    const handleHashChange = () => {
      // Check if the hash matches expected values, otherwise default to 'away-team'
      const hash = window.location.hash.replace('#', '');
      if (hash === 'away-team' || hash === 'home-team') {
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
      <SimMatchup
        setPlayByPlay={setPlayByPlay}
        setHomeLinescore={setHomeLinescore}
        setAwayBoxScore={setAwayBoxScore}
        setHomeBoxScore={setHomeBoxScore}
        setAwayLinescore={setAwayLinescore}
      />
      {playByPlay.length > 0 && (
        <GameResults
          homeBoxScore={homeBoxScore}
          awayBoxScore={awayBoxScore}
          homeLinescore={homeLinescore}
          awayLinescore={awayLinescore}
          playByPlay={playByPlay}
        />
      )}
      {playByPlay.length === 0 && (
        <>
          <div className='flex flex-col md:flex-row justify-between'>
            <TeamLineupTable statType='default' teamType='away' />
            <TeamLineupTable statType='default' teamType='home' />
          </div>
          <div className='flex flex-col md:flex-row'>
            <div className='flex-container w-full'>
              <h2 className='text-2xl font-semibold text-center mb-4'>Select Players</h2>
              <Tabs>
                {currentTab === 'home-team' && (
                  <>
                    <UnselectedTab label='Away Team' href='#away-team' />
                    <SelectedTab label='Home Team' href='#home-team' />{' '}
                  </>
                )}
                {currentTab === 'away-team' && (
                  <>
                    <SelectedTab label='Away Team' href='#away-team' />
                    <UnselectedTab label='Home Team' href='#home-team' />{' '}
                  </>
                )}
              </Tabs>
              {currentTab === 'away-team' && (
                <>
                  <TeamList teamType='away' />
                </>
              )}
              {currentTab === 'home-team' && (
                <>
                  <TeamList teamType='home' />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
