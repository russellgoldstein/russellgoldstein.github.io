// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { fgApi } from '../services/fgApi';
import { gameApi } from '../services/gameApi';
import teamsReducer from './teamSlice';
import availablePlayersReducer from './availablePlayersSlice';
import selectedTeamReducer from './selectedTeamSlice';

// const rtkQueryErrorMiddleware = (store) => (next) => (action) => {
//   if (action.type.endsWith('/rejected') && action.payload?.status === 401) {
//     // Perform the redirection here
//     window.location.href = '/login';
//   }

//   return next(action);
// };

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [fgApi.reducerPath]: fgApi.reducer,
    [gameApi.reducerPath]: gameApi.reducer,
    teams: teamsReducer,
    availablePlayers: availablePlayersReducer,
    selectedTeam: selectedTeamReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fgApi.middleware).concat(gameApi.middleware),
});

setupListeners(store.dispatch);
