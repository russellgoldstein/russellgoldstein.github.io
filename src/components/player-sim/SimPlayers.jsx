import React, { useState } from 'react';
import { useSimPlayersMutation } from '../../services/fgApi';
import SearchPlayers from '../global/SearchPlayers';
import HittersTable from '../global/players/HittersTable';
import PitchersTable from '../global/players/PitchersTable';
import Table from '../global/Table';
import { getSimPAColumns } from '../../utils/consts';
import { PrimaryButtonWithIcon } from '../global/PrimaryButtonWithIcon';
import { Baseball } from '../icons/Baseball';
import OutcomeSliders from './OutcomeSliders';

const hitterSimColumns = getSimPAColumns();
const initialOutcomePercents = {
  lineDrive: {
    soft: {
      out: 40,
      single: 50,
      double: 9,
      triple: 1,
    },
    medium: {
      out: 30,
      single: 40,
      double: 25,
      triple: 5,
    },
    hard: {
      out: 30,
      single: 30,
      double: 65,
      triple: 5,
    },
  },
  flyball: {
    soft: {
      out: 95,
      single: 2,
      double: 2,
      triple: 1,
    },
    medium: {
      out: 80,
      single: 10,
      double: 5,
      triple: 5,
    },
    hard: {
      out: 75,
      single: 15,
      double: 5,
      triple: 5,
    },
  },
  groundball: {
    soft: {
      out: 90,
      single: 9,
      double: 1,
      triple: 0,
    },
    medium: {
      out: 80,
      single: 18,
      double: 2,
      triple: 0,
    },
    hard: {
      out: 70,
      single: 25,
      double: 4,
      triple: 1,
    },
  },
};
export default function SimPlayers() {
  const [hitter, setHitter] = useState(null);
  const [pitcher, setPitcher] = useState(null);
  const [pa, setPa] = useState(650);
  const [iterations, setIterations] = useState(1000);
  const [hitterBoxScore, setHitterBoxScore] = useState([]);
  const [outcomePercents, setOutcomePercents] = useState(initialOutcomePercents);
  const [simPlayers, { isLoading: simPlayLoading, error: simPlayError }] = useSimPlayersMutation();

  const submitSim = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    await simPlayers({
      hitterId: hitter?.id,
      pitcherId: pitcher?.id,
      pa,
      iterations,
      outcomePercents,
    }).then((result) => {
      setHitterBoxScore([result.data.hitterBoxscore]);
    });
  };

  const isPlayBallButtonDisabled = () => !hitter && !pitcher;

  return (
    <form className='flex flex-col justify-between' onSubmit={submitSim}>
      <div className='flex flex-container flex-col'>
        <div className='flex flex-container justify-center'>
          <div>
            <PrimaryButtonWithIcon onClick={submitSim} disabled={isPlayBallButtonDisabled() || simPlayLoading}>
              <Baseball />
              <span className='ml-2'>{simPlayLoading ? 'Simulating...' : 'Sim Players'}</span>
            </PrimaryButtonWithIcon>
          </div>
        </div>
        <div className='flex flex-container flex-row items-center justify-center'>
          <div className='flex flex-col items-center justify-around'>
            <label htmlFor='pa'>Plate Appearances</label>
            <input id='pa' type='number' value={pa} onChange={(e) => setPa(Number(e.target.value))} />
          </div>
          <div className='flex flex-col items-center justify-around' style={{ marginLeft: '10px' }}>
            <label htmlFor='iterations'>Iterations:</label>
            <input
              id='iterations'
              type='number'
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
            />
          </div>
        </div>
        {hitterBoxScore.length > 0 && (
          <div className='flex flex-container flex-col items-center justify-center'>
            <div>
              <h3 className='text-lg font-bold'>Results</h3>
            </div>
            <div>
              <Table columns={hitterSimColumns} data={hitterBoxScore} />
            </div>
          </div>
        )}
        <div className='flex flex-container flex-row justify-around w-full'>
          <div>
            Find Hitter
            <SearchPlayers onClick={setHitter} />
            <HittersTable statType='default' playerId={hitter?.id} />
          </div>
          <div>
            Find Pitcher
            <SearchPlayers onClick={setPitcher} />
            <PitchersTable statType='default' playerId={pitcher?.id} />
          </div>
        </div>
        <div className='flex flex-container justify-center'>
          <OutcomeSliders outcomePercents={outcomePercents} setOutcomePercents={setOutcomePercents} />
        </div>
      </div>
    </form>
  );
}
