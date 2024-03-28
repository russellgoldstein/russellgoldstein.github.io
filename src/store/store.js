// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fgApi } from '../services/fgApi';
import { gameApi } from '../services/gameApi';
import teamsReducer from './teamSlice';
import availablePlayersReducer from './availablePlayersSlice';
import selectedTeamReducer from './selectedTeamSlice';
import { simApi } from '../services/simApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [fgApi.reducerPath]: fgApi.reducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [simApi.reducerPath]: simApi.reducer,
    teams: teamsReducer,
    availablePlayers: availablePlayersReducer,
    selectedTeam: selectedTeamReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fgApi.middleware).concat(gameApi.middleware).concat(simApi.middleware),
});

setupListeners(store.dispatch);
