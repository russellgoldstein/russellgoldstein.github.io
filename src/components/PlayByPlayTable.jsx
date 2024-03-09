import React from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import Table from './Table';

export const PlayByPlayTable = ({ plays }) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('inning', {
      header: () => 'Inning',
      cell: (info) => `${info.row.original.topOfInning ? 'Top' : 'Bottom'} of ${info.getValue()}`,
    }),
    columnHelper.accessor((row) => row.batter.name, {
      id: 'batter',
      header: () => 'Batter',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.pitcher.name, {
      id: 'pitcher',
      header: () => 'Pitcher',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('result.result', {
      header: () => 'Result',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('result.type', {
      header: () => 'Hit Type',
      cell: (info) => {
        if (info.getValue() === 'Strikeout' || info.getValue() === 'Walk') {
          return '';
        } else {
          return info.getValue();
        }
      },
    }),
    columnHelper.accessor('result.hitStrength', {
      header: () => 'Hit Strength',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => `Away: ${row.awayScore} - Home: ${row.homeScore}`, {
      id: 'score',
      header: () => 'Score',
      cell: (info) => info.getValue(),
    }),
  ];

  return <Table data={plays} columns={columns} />;
};

export default PlayByPlayTable;
