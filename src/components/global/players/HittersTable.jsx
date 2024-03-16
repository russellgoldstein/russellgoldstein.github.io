import React from 'react';
import '../../index.css';
import Table from '../Table';
import { getAdvancedHitterColumns, getDefaultHitterColumns } from '../../../utils/consts';
import { useFindHittersByIdQuery } from '../../../services/fgApi';

const defaultColumns = getDefaultHitterColumns();
const advancedColumns = getAdvancedHitterColumns();

export default function HittersTable({ statType, playerId }) {
  const {
    data: hitters,
    error: teamsError,
    isLoading: teamsLoading,
  } = useFindHittersByIdQuery({
    aseason: 2023,
    playerId,
  });

  console.log(hitters);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  const columns = statType === 'default' ? defaultColumns : advancedColumns;

  return (
    <>
      <Table data={hitters} columns={[...columns]} />
    </>
  );
}
