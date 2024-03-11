// src/store/selectedTeamSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const selectedTeamSlice = createSlice({
  name: 'selectedTeam',
  initialState: {
    team: null,
  },
  reducers: {
    setSelectedTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { setSelectedTeam } = selectedTeamSlice.actions;

export default selectedTeamSlice.reducer;
