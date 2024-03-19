import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('baseball-sim-jwt');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      // This is where you could set headers common to all requests
      return headers;
    },
    responseHandler: async (response) => {
      if (response.status === 401) {
        window.location.href = '/login';
      }
      return response.json();
    },
  }),
  endpoints: (builder) => ({
    createGame: builder.mutation({
      query: (body) => ({
        url: `games`,
        method: 'POST',
        body,
      }),
    }),
    getGames: builder.query({
      query: () => 'games',
    }),
    getGame: builder.query({
      query: (gameCode) => `games/${gameCode}`,
    }),
    patchGame: builder.mutation({
      query: ({ gameCode, body }) => ({
        url: `games/${gameCode}`,
        method: 'PATCH',
        body,
      }),
    }),
    postLineup: builder.mutation({
      query: ({ gameCode, body }) => ({
        url: `games/${gameCode}/lineups`,
        method: 'POST',
        body,
      }),
    }),
    getLineup: builder.query({
      query: ({ gameCode }) => `games/${gameCode}/lineups`,
    }),
  }),
});

// Export hooks for your endpoints here
export const {
  useCreateGameMutation,
  useGetGamesQuery,
  useGetGameQuery,
  usePatchGameMutation,
  usePostLineupMutation,
  useGetLineupQuery,
} = gameApi;
