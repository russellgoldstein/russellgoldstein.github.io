import React from 'react';
import Table from './Table';
import { getBoxScoreHitterColumns, getBoxScorePitcherColumns } from '../utils/consts';

const hitterBoxScoreColumns = getBoxScoreHitterColumns();
const pitcherBoxScoreColumns = getBoxScorePitcherColumns();
export default function BoxScoreTable({ hitterBoxScore, pitcherBoxScore }) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='table-container w-full'>
        <Table columns={hitterBoxScoreColumns} data={hitterBoxScore} />
      </div>
      <div className='table-container w-full'>
        <Table columns={pitcherBoxScoreColumns} data={pitcherBoxScore} />
      </div>
    </div>
  );
}
