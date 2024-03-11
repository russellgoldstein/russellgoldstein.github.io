// src/store/teamsSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    teams: {
      home: {
        hitters: [],
        pitchers: [],
      },
      away: {
        hitters: [],
        pitchers: [],
      },
    },
  },
  reducers: {
    setTeamHitters: (state, action) => {
      const { teamType, hitters } = action.payload;
      state.teams[teamType].hitters = hitters;
    },
    setTeamPitchers: (state, action) => {
      const { teamType, pitchers } = action.payload;
      state.teams[teamType].pitchers = pitchers;
    },
    // Additional actions as needed
  },
});

export const { setTeamHitters, setTeamPitchers } = teamsSlice.actions;

export default teamsSlice.reducer;
