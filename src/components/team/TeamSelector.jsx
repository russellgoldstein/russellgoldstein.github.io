import React from 'react';
import { useFindUniqueMLBTeamsQuery } from '../../services/myApi';
import Dropdown from '../global/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTeam } from '../../store/selectedTeamSlice';

export default function TeamSelector() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.selectedTeam.team);
  const { data: teams, error: teamsError, isLoading: teamsLoading } = useFindUniqueMLBTeamsQuery();

  if (teamsLoading || !teams) return <div>Loading...</div>;
  if (teamsError) return <div>Error: {teamsError.message}</div>;

  const updatedTeams = teams
    .filter((t) => t.AbbName !== '- - -')
    .map((team) => ({ id: team.AbbName, label: team.AbbName }));
  return (
    <div>
      <h1>Team Selector</h1>
      {updatedTeams?.length > 0 && (
        <Dropdown
          options={[{ id: '---', label: '---' }, ...updatedTeams] || []}
          selected={selected}
          setSelected={(team) => dispatch(setSelectedTeam(team))}
        />
      )}
      {!teamsLoading && teams?.length === 0 && <div>No teams found</div>}
    </div>
  );
}
