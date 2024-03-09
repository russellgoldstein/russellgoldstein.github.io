import { createColumnHelper } from '@tanstack/react-table';

export const getBoxScoreHitterColumns = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('player.name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('atBats', {
      header: 'AB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('runs', {
      header: 'R',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('hits', {
      header: 'H',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('singles', {
      header: '1B',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('doubles', {
      header: '2B',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('triples', {
      header: '3B',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('homeruns', {
      header: 'HR',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('rbi', {
      header: 'RBI',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('walks', {
      header: 'BB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('strikeouts', {
      header: 'SO',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
  ];
  return columns;
};

export const getBoxScorePitcherColumns = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor('wins', {
    //   header: 'W',
    //   cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('losses', {
    //   header: 'L',
    //   cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('era', {
    //   header: 'ERA',
    //   cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('games', {
    //   header: 'G',
    //   cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('gamesStarted', {
    //   header: 'GS',
    //   cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('saves', {
    //   header: 'SV',
    //   cell: (info) => info.renderValue(),
    // }),
    columnHelper.accessor('IP', {
      header: 'IP',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('H', {
      header: 'H',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('R', {
      header: 'R',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    // columnHelper.accessor('earnedRuns', {
    //   header: 'ER',
    //   cell: (info) => info.renderValue(),
    // }),
    // columnHelper.accessor('HR', {
    //   header: 'HR',
    //   cell: (info) => info.renderValue(),
    // }),
    columnHelper.accessor('BB', {
      header: 'BB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('SO', {
      header: 'SO',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
  ];

  return columns;
};

export const getDefaultHitterColumns = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: 'name', // It's important to provide an id for custom accessors
      header: () => 'Name',
      cell: (info) => <span>{info.getValue()}</span>,
      sticky: 'left', // Apply sticky if needed
    }),
    columnHelper.accessor('G', {
      header: 'G',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('AB', {
      header: 'AB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('R', {
      header: 'R',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('H', {
      header: 'H',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('HR', {
      header: 'HR',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('RBI', {
      header: 'RBI',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('SB', {
      header: 'SB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('CS', {
      header: 'CS',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('BB', {
      header: 'BB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('SO', {
      header: 'K',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('AVG', {
      header: 'AVG',
      cell: (info) => info.renderValue()?.toFixed(3).replace(/^0+/, ''),
      align: 'right',
    }),
    columnHelper.accessor('OBP', {
      header: 'OBP',
      cell: (info) => info.renderValue()?.toFixed(3).replace(/^0+/, ''),
      align: 'right',
    }),
    columnHelper.accessor('SLG', {
      header: 'SLG',
      cell: (info) => info.renderValue()?.toFixed(3).replace(/^0+/, ''),
      align: 'right',
    }),
    columnHelper.accessor('OPS', {
      header: 'OPS',
      cell: (info) => info.renderValue()?.toFixed(3).replace(/^0+/, ''),
      align: 'right',
    }),
  ];
  return columns;
};

export const getAdvancedHitterColumns = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: 'name', // It's important to provide an id for custom accessors
      header: () => 'Name',
      cell: (info) => <span>{info.getValue()}</span>,
      sticky: 'left', // Apply sticky if needed
    }),
    columnHelper.accessor('BB_PERCENT', {
      header: 'BB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('K_PERCENT', {
      header: 'K%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('LD_PERCENT', {
      header: 'LD%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('GB_PERCENT', {
      header: 'GB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('FB_PERCENT', {
      header: 'FB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('HR_FB', {
      header: 'HR/FB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('Soft_PERCENT', {
      header: 'Soft%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('Med_PERCENT', {
      header: 'Med%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('Hard_PERCENT', {
      header: 'Hard%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
  ];
  return columns;
};

export const getDefaultPitcherColumns = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: 'name', // It's important to provide an id for custom accessors
      header: () => 'Name',
      cell: (info) => <span>{info.getValue()}</span>,
      sticky: 'left', // Apply sticky if needed
    }),
    columnHelper.accessor('W', {
      header: 'W',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('L', {
      header: 'L',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('ERA', {
      header: 'ERA',
      cell: (info) => info.renderValue()?.toFixed(2),
      align: 'right',
    }),
    columnHelper.accessor('G', {
      header: 'G',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('GS', {
      header: 'GS',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('SV', {
      header: 'SV',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('IP', {
      header: 'IP',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('H', {
      header: 'H',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('R', {
      header: 'R',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('ER', {
      header: 'ER',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('HR', {
      header: 'HR',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('BB', {
      header: 'BB',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
    columnHelper.accessor('SO', {
      header: 'K',
      cell: (info) => info.renderValue(),
      align: 'right',
    }),
  ];

  return columns;
};

export const getAdvancedPitcherColumns = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
      id: 'name', // It's important to provide an id for custom accessors
      header: () => 'Name',
      cell: (info) => <span>{info.getValue()}</span>,
      sticky: 'left', // Apply sticky if needed
    }),
    columnHelper.accessor('bb_percent', {
      header: 'BB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('k_percent', {
      header: 'K%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('LD_PERCENT', {
      header: 'LD%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('GB_PERCENT', {
      header: 'GB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('FB_PERCENT', {
      header: 'FB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('HR_FB', {
      header: 'HR/FB%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('Soft_PERCENT', {
      header: 'Soft%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('Med_PERCENT', {
      header: 'Med%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
    columnHelper.accessor('Hard_PERCENT', {
      header: 'Hard%',
      cell: (info) => (info.renderValue() * 100).toFixed(1),
      align: 'right',
    }),
  ];

  return columns;
};
