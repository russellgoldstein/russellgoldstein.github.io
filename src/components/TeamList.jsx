import React, { useEffect, useState } from 'react';
import TeamSelector from './TeamSelector';

import TeamHittersTable from './TeamHittersTable';
import TeamPitchersTable from './TeamPitchersTable';
import { ToggleSwitch } from '../pages/component/ToggleSwitch';
import Tabs from './Tabs';
import UnselectedTab from './UnselectedTab';
import SelectedTab from './SelectedTab';
import { useSelector } from 'react-redux';

export default function TeamList({ teamType }) {
  const [statType, setStatType] = useState('default');
  const [currentTab, setCurrentTab] = useState('hitters');
  const selectedTeam = useSelector((state) => state.selectedTeam.team);

  useEffect(() => {
    const handleHashChange = () => {
      // Check if the hash matches expected values, otherwise default to 'pitchers'
      const hash = window.location.hash.replace('#', '');
      if (hash === 'hitters' || hash === 'pitchers') {
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
    <>
      <div className='flex flex-container flex-row space-x-2 justify-between items-center'>
        <TeamSelector />
        <ToggleSwitch
          isOn={statType === 'advanced'}
          handleToggle={() => setStatType(statType === 'default' ? 'advanced' : 'default')}
          leftText='Default'
          rightText='Advanced'
        />
      </div>
      {selectedTeam && (
        <>
          <Tabs>
            {currentTab === 'hitters' && (
              <>
                <SelectedTab label='Hitters' href='#hitters' />
                <UnselectedTab label='Pitchers' href='#pitchers' />
              </>
            )}
            {currentTab === 'pitchers' && (
              <>
                <UnselectedTab label='Hitters' href='#hitters' />
                <SelectedTab label='Pitchers' href='#pitchers' />
              </>
            )}
          </Tabs>
          {currentTab === 'hitters' && (
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='table-container w-full md:full'>
                <TeamHittersTable teamType={teamType} statType={statType} />
              </div>
            </div>
          )}
          {currentTab === 'pitchers' && (
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='table-container w-full md:full'>
                <TeamPitchersTable teamType={teamType} statType={statType} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
