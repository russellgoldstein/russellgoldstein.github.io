import React from 'react';
import '../index.css';
import Table from '../global/Table';
import { getAdvancedHitterColumns, getDefaultHitterColumns } from '../../utils/consts';
import { createColumnHelper } from '@tanstack/react-table';
import UserMinus from '../icons/UserMinus';
import ChevronUp from '../icons/ChevronUp';
import ChevronDown from '../icons/ChevronDown';
import { useDispatch, useSelector } from 'react-redux';
import { setTeamHitters } from '../../store/teamSlice';
import { addPlayerToAvailablePlayers } from '../../store/availablePlayersSlice';

const defaultColumns = getDefaultHitterColumns();
const advancedColumns = getAdvancedHitterColumns();

export default function TeamHittersLineupTable({ statType, teamType }) {
  const lineup = useSelector((state) => state.teams.teams[teamType].hitters);
  const selectedTeam = useSelector((state) => state.selectedTeam.team);

  const dispatch = useDispatch();

  const generateEmptySpots = () => {
    const emptySpots = [];
    for (let i = lineup.length; i < 9; i++) {
      emptySpots.push({ first_name: `-`, last_name: '', empty: true });
    }
    return emptySpots;
  };

  const removePlayerFromLineup = (player) => {
    dispatch(setTeamHitters({ teamType, hitters: lineup.filter((hitter) => hitter.id !== player.id) }));
    // TODO: this selectedTeam will need to be fixed when we add players from different MLB teams
    dispatch(
      addPlayerToAvailablePlayers({ year: 2023, teamAbbreviation: selectedTeam.id, player, playerType: 'hitters' })
    );
  };

  const movePlayerUp = (player) => {
    const index = lineup.findIndex((hitter) => hitter.id === player.id);
    if (index > 0) {
      const newLineup = [...lineup];
      const temp = newLineup[index];
      newLineup[index] = newLineup[index - 1];
      newLineup[index - 1] = temp;
      dispatch(setTeamHitters({ teamType, hitters: newLineup }));
    }
  };

  const movePlayerDown = (player) => {
    const index = lineup.findIndex((hitter) => hitter.id === player.id);
    if (index < lineup.length - 1) {
      const newLineup = [...lineup];
      const temp = newLineup[index];
      newLineup[index] = newLineup[index + 1];
      newLineup[index + 1] = temp;
      dispatch(setTeamHitters({ teamType: 'home', hitters: newLineup }));
    }
  };

  const completeLineup = [...lineup, ...generateEmptySpots()];

  const columnHelper = createColumnHelper();

  const removePlayerButton = columnHelper.accessor('actions', {
    header: 'Actions',
    cell: ({ row }) =>
      !row.original.empty && (
        <div className='flex space-x-2 justify-center items-center'>
          <ChevronUp onClick={() => movePlayerUp(row.original)} />
          <ChevronDown onClick={() => movePlayerDown(row.original)} />
          <UserMinus onClick={() => removePlayerFromLineup(row.original)} />
        </div>
      ),
    sticky: 'right',
  });
  const columns = statType === 'default' ? defaultColumns : advancedColumns;
  return <Table data={completeLineup} columns={[...columns, removePlayerButton]} />;
}
