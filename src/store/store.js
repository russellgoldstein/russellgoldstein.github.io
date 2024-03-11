// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { myApi } from '../services/myApi'; // You will create this file in the next step
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
    [myApi.reducerPath]: myApi.reducer,
    teams: teamsReducer,
    availablePlayers: availablePlayersReducer,
    selectedTeam: selectedTeamReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myApi.middleware),
});

setupListeners(store.dispatch);
