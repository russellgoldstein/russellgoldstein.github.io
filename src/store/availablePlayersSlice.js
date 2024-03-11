// src/store/availablePlayersSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const availablePlayersSlice = createSlice({
  name: 'availablePlayers',
  initialState: {},
  reducers: {
    setAvailablePlayersForTeam: (state, action) => {
      const { year, teamAbbreviation, players, playerType } = action.payload;
      if (!state[year]) {
        state[year] = {};
      }
      if (!state[year][teamAbbreviation]) {
        state[year][teamAbbreviation] = {};
      }
      if (!state[year][teamAbbreviation][playerType]) {
        state[year][teamAbbreviation][playerType] = [];
      }
      state[year][teamAbbreviation][playerType] = players;
    },
    addPlayerToAvailablePlayers: (state, action) => {
      const { year, teamAbbreviation, player, playerType } = action.payload;
      if (state[year] && state[year][teamAbbreviation] && state[year][teamAbbreviation][playerType]) {
        state[year][teamAbbreviation][playerType].push(player);
      }
    },
    removePlayerFromAvailablePlayers: (state, action) => {
      const { year, teamAbbreviation, playerId, playerType } = action.payload;
      if (state[year] && state[year][teamAbbreviation] && state[year][teamAbbreviation][playerType]) {
        state[year][teamAbbreviation][playerType] = state[year][teamAbbreviation][playerType].filter(
          (player) => player.id !== playerId
        );
      }
    },
  },
});

export const { setAvailablePlayersForTeam, addPlayerToAvailablePlayers, removePlayerFromAvailablePlayers } =
  availablePlayersSlice.actions;

export default availablePlayersSlice.reducer;
