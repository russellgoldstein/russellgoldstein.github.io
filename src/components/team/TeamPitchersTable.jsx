import React, { useEffect } from 'react';
import '../index.css';
import { useFindPitchersByMLBTeamAndSeasonQuery } from '../../services/myApi';
import Table from '../global/Table';
import { getAdvancedPitcherColumns, getDefaultPitcherColumns } from '../../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';
import UserPlus from '../icons/UserPlus';
import { useDispatch, useSelector } from 'react-redux';
import { setTeamPitchers } from '../../store/teamSlice';
import { removePlayerFromAvailablePlayers, setAvailablePlayersForTeam } from '../../store/availablePlayersSlice';

const defaultColumns = getDefaultPitcherColumns();
const advancedColumns = getAdvancedPitcherColumns();

export default function TeamPitchersTable({ statType, teamType }) {
  const lineup = useSelector((state) => state.teams.teams[teamType].pitchers);
  const selectedTeam = useSelector((state) => state.selectedTeam.team);
  const availablePlayers = useSelector((state) => state.availablePlayers);
  const dispatch = useDispatch();

  const addPlayerToLineup = (player) => {
    dispatch(setTeamPitchers({ teamType, pitchers: [...lineup, player] }));
    dispatch(
      removePlayerFromAvailablePlayers({
        year: 2023,
        teamAbbreviation: selectedTeam.id,
        playerId: player.id,
        playerType: 'pitchers',
      })
    );
  };

  const columnHelper = createColumnHelper();

  const addPlayerButton = columnHelper.accessor('addPlayer', {
    header: 'Actions',
    cell: ({ row }) => <UserPlus disabled={lineup.length === 1} onClick={() => addPlayerToLineup(row.original)} />,
    sticky: 'right',
  });

  const {
    data: teams,
    error: teamsError,
    isLoading: teamsLoading,
  } = useFindPitchersByMLBTeamAndSeasonQuery({
    AbbName: selectedTeam.id,
    aseason: 2023,
  });

  const dataTeams = availablePlayers?.[2023]?.[selectedTeam.id]?.pitchers
    ? availablePlayers[2023][selectedTeam.id].pitchers.map((team) => ({
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
          playerType: 'pitchers',
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
