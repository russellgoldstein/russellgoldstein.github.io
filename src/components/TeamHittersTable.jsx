import React, { useEffect } from 'react';
import './index.css';
import { useFindHittersByMLBTeamAndSeasonQuery } from '../services/myApi';
import Table from './Table';
import { getAdvancedHitterColumns, getDefaultHitterColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';
import UserPlus from './icons/UserPlus';

const defaultColumns = getDefaultHitterColumns();
const advancedColumns = getAdvancedHitterColumns();

export default function TeamHittersTable({ selectedTeam, statType, setLineup, availableHitters, setAvailableHitters }) {
  const addPlayerToLineup = (player) => {
    setLineup((currentLineup) => [...currentLineup, player]); // Use functional update
    setAvailableHitters((currentHitters) => currentHitters.filter((hitter) => hitter.id !== player.id));
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Actions',
    cell: ({ row }) => <UserPlus onClick={() => addPlayerToLineup(row.original)} />,
    sticky: 'right',
  });

  // const [findHittersByMLBTeamAndSeason, { data: teams, error: teamsError, isLoading: teamsLoading }] =
  //   useFindHittersByMLBTeamAndSeasonQuery();

  const {
    data: teams,
    error: teamsError,
    isLoading: teamsLoading,
  } = useFindHittersByMLBTeamAndSeasonQuery({
    AbbName: selectedTeam.id,
    aseason: 2023,
  });

  const dataTeams = availableHitters.map((team) => ({
    ...team.player,
    ...team,
  }));
  useEffect(() => {
    if (teams) {
      setAvailableHitters(teams);
    }
  }, [teams, setAvailableHitters]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  const columns = statType === 'default' ? defaultColumns : advancedColumns;

  return (
    <>
      <Table data={dataTeams} columns={[...columns, addPlayerButton]} />
    </>
  );
}
