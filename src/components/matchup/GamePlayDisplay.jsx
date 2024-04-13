import React, { useEffect, useState } from 'react';
import BaseballDiamondSVG from '../icons/BaseballDiamond';
import { formatPlayResultText } from '../../utils/Utils';

const GamePlayDisplay = ({ plateAppearance, runnersScored, updatedResult = false, playResult }) => {
  const pitcherName = `${plateAppearance.pitcher.first_name} ${plateAppearance.pitcher.last_name}`;
  const hitterName = `${plateAppearance.hitter.first_name} ${plateAppearance.hitter.last_name}`;
  const runners = [plateAppearance.runnerOn1st, plateAppearance.runnerOn2nd, plateAppearance.runnerOn3rd];

  // State to control the flash effect
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (updatedResult) {
      setFlash(true);
      const timer = setTimeout(() => {
        setFlash(false);
      }, 2000); // Flash for 1 second
      return () => clearTimeout(timer);
    }
  }, [updatedResult]);
  
  return (
    <div
      className={`grid grid-cols-[auto_1fr] gap-5 items-start border-2 border-gray-300 rounded-lg p-5 max-w-md mx-auto ${
        flash ? 'bg-yellow-100 animate-flash' : 'bg-gray-50'
      }`}
    >
      {/* Baseball Diamond SVG */}
      <BaseballDiamondSVG
        pitcherName={pitcherName}
        hitterName={hitterName}
        runners={
          runners?.length > 0 ? runners.map((runner) => runner && `${runner.first_name} ${runner.last_name}`) : []
        }
      />

      <div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Outs:</strong> {plateAppearance.outs}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Score:</strong> Away {plateAppearance.awayScore} - Home {plateAppearance.homeScore}
        </div>
      </div>

      <div>
        <strong>Pitcher</strong>
        {plateAppearance.pitcher && (
          <div>
            {plateAppearance.pitcher.first_name} {plateAppearance.pitcher.last_name}
          </div>
        )}
        <strong>Hitter</strong>
        {plateAppearance.hitter && (
          <div>
            {plateAppearance.hitter.first_name} {plateAppearance.hitter.last_name}
          </div>
        )}
      </div>

      {/* Right Column: Inning, Score, and Play Result */}
      <div>
        <strong>Result</strong>
        {playResult && <div>{formatPlayResultText({ playResult, hitter: plateAppearance.hitter })}</div>}
      </div>
    </div>
  );
};

export default GamePlayDisplay;
