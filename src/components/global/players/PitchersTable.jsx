import React from 'react';
import '../../index.css';
import Table from '../Table';
import { getAdvancedPitcherColumns, getDefaultPitcherColumns } from '../../../utils/consts';
import { useFindPitchersByIdQuery } from '../../../services/fgApi';

const defaultColumns = getDefaultPitcherColumns();
const advancedColumns = getAdvancedPitcherColumns();

export default function PitchersTable({ statType, playerId }) {
  const {
    data: pitchers,
    error: teamsError,
    isLoading: teamsLoading,
  } = useFindPitchersByIdQuery({
    aseason: 2023,
    playerId,
  });

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  const columns = statType === 'default' ? defaultColumns : advancedColumns;
  return (
    <>
      <Table data={pitchers} columns={[...columns]} />
    </>
  );
}
