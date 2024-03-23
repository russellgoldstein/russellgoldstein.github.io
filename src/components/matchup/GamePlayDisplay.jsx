import React from 'react';
import BaseballDiamondSVG from '../icons/BaseballDiamond';

const GamePlayDisplay = ({
  pitcherName,
  batterName,
  runners,
  inning,
  outs,
  topOfInning,
  awayScore,
  homeScore,
  playResult,
}) => {
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
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Baseball Diamond SVG */}
      <BaseballDiamondSVG
        pitcherName={pitcherName}
        batterName={batterName}
        runners={runners?.length > 0 ? runners.map((runner) => (runner !== null ? runner.name : '')) : []}
      />

      {/* Right Column: Inning, Score, and Play Result */}
      <div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Inning:</strong> {topOfInning ? 'Top' : 'Bottom'} {inning}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Outs:</strong> {outs}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <strong>Score:</strong> Away {awayScore} - Home {homeScore}
        </div>
        {playResult && (
          <>
            <div style={{ marginBottom: '10px' }}>
              <strong>Result:</strong> {playResult.result.result}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Hit Type:</strong> {playResult.result.type}
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Hit Strength:</strong> {playResult.result.hitStrength}
            </div>
            {playResult.runnersScored?.length > 0 && (
              <div>
                <strong>Runners Scored:</strong>{' '}
                {playResult.runnersScored.map((runner) => runner.name).join(', ') || ''}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GamePlayDisplay;
