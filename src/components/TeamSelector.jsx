import React from 'react';
import { useFindUniqueMLBTeamsQuery } from '../services/myApi';
import Dropdown from './Dropdown';

export default function TeamSelector({ selected, setSelected }) {
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
          setSelected={setSelected}
        />
      )}
      {!teamsLoading && teams?.length === 0 && <div>No teams found</div>}
    </div>
  );
}
