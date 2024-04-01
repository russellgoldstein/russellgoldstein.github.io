import React from 'react';
import BaseballDiamondSVG from '../icons/BaseballDiamond';
import { formatPlayResultText } from '../../utils/Utils';

const GamePlayDisplay = ({ plateAppearance, runnersScored }) => {
  const pitcherName = `${plateAppearance.pitcher.first_name} ${plateAppearance.pitcher.last_name}`;
  const hitterName = `${plateAppearance.hitter.first_name} ${plateAppearance.hitter.last_name}`;
  const runners = [plateAppearance.runnerOn1st, plateAppearance.runnerOn2nd, plateAppearance.runnerOn3rd];
  const playResult = {
    paOutcome: plateAppearance.paOutcome,
    battedBallOutcome: plateAppearance.battedBallOutcome,
    hitQuality: plateAppearance.hitQuality,
    runnersScored: runnersScored,
  };
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '20px',
        alignItems: 'start',
        border: '2px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '500px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
      }}
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
