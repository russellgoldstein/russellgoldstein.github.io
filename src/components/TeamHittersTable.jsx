import React, { useEffect } from 'react';
import './index.css';
import { useFindHittersByMLBTeamAndSeasonQuery } from '../services/myApi';
import Table from './Table';
import { getAdvancedHitterColumns, getDefaultHitterColumns } from '../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';
import UserPlus from './icons/UserPlus';
import { useDispatch, useSelector } from 'react-redux';
import { setTeamHitters } from '../store/teamSlice';
import { removePlayerFromAvailablePlayers, setAvailablePlayersForTeam } from '../store/availablePlayersSlice';

const defaultColumns = getDefaultHitterColumns();
const advancedColumns = getAdvancedHitterColumns();

export default function TeamHittersTable({ statType, teamType }) {
  const lineup = useSelector((state) => state.teams.teams[teamType].hitters);
  const selectedTeam = useSelector((state) => state.selectedTeam.team);
  const availablePlayers = useSelector((state) => state.availablePlayers);
  const dispatch = useDispatch();

  const addPlayerToLineup = (player) => {
    dispatch(setTeamHitters({ teamType, hitters: [...lineup, player] }));
    dispatch(
      removePlayerFromAvailablePlayers({
        year: 2023,
        teamAbbreviation: selectedTeam.id,
        playerId: player.id,
        playerType: 'hitters',
      })
    );
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Actions',
    cell: ({ row }) => <UserPlus disabled={lineup.length === 9} onClick={() => addPlayerToLineup(row.original)} />,
    sticky: 'right',
  });

  const {
    data: teams,
    error: teamsError,
    isLoading: teamsLoading,
  } = useFindHittersByMLBTeamAndSeasonQuery({
    AbbName: selectedTeam.id,
    aseason: 2023,
  });

  const dataTeams = availablePlayers?.[2023]?.[selectedTeam.id]?.hitters
    ? availablePlayers[2023][selectedTeam.id].hitters.map((team) => ({
        ...team.player,
        ...team,
      }))
    : [];
  useEffect(() => {
    if (teams) {
      dispatch(
        setAvailablePlayersForTeam({
          year: 2023,
          teamAbbreviation: selectedTeam.id,
          players: teams,
          playerType: 'hitters',
        })
      );
    }
  }, [teams, selectedTeam.id, dispatch]);

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;
  const columns = statType === 'default' ? defaultColumns : advancedColumns;

  return (
    <>
      <Table data={dataTeams} columns={[...columns, addPlayerButton]} />
    </>
  );
}
