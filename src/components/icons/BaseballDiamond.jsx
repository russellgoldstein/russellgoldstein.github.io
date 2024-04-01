import React from 'react';

const BaseballDiamondSVG = ({
  pitcherName = 'Pitcher Name',
  hitterName = 'Hitter Name',
  runners = [null, null, null],
}) => {
  return (
    <svg width='250' height='220' viewBox='0 0 200 220' xmlns='http://www.w3.org/2000/svg'>
      <polygon points='100,30 190,120 100,210 10,120' fill='lightgreen' />
      <polygon points='100,30 190,120 100,210 10,120' fill='none' stroke='sandybrown' strokeWidth='2' />

      <rect x='95' y='205' width='10' height='10' fill='white' stroke='black' strokeWidth='1' />
      <rect x='180' y='115' width='10' height='10' fill='white' stroke='black' strokeWidth='1' />
      <rect x='95' y='25' width='10' height='10' fill='white' stroke='black' strokeWidth='1' />
      <rect x='10' y='115' width='10' height='10' fill='white' stroke='black' strokeWidth='1' />

      <circle cx='100' cy='120' r='5' fill='sandybrown' />

      <text x='100' y='110' textAnchor='middle' fill='black' fontSize='11' fontFamily='Arial'>
        {pitcherName}
      </text>
      <text x='100' y='195' textAnchor='middle' fill='black' fontSize='11' fontFamily='Arial'>
        {hitterName}
      </text>
      {runners[0] && (
        <text x='180' y='110' textAnchor='middle' fill='black' fontSize='11' fontFamily='Arial'>
          {runners[0]}
        </text>
      )}
      {runners[1] && (
        <text x='100' y='20' textAnchor='middle' fill='black' fontSize='11' fontFamily='Arial'>
          {runners[1]}
        </text>
      )}
      {runners[2] && (
        <text x='20' y='110' textAnchor='middle' fill='black' fontSize='11' fontFamily='Arial'>
          {runners[2]}
        </text>
      )}
    </svg>
  );
};

export default BaseballDiamondSVG;
