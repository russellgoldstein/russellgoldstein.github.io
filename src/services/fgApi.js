import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fgApi = createApi({
  reducerPath: 'fgApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('baseball-sim-jwt');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      const impostUserId = localStorage.getItem('impostUserId');
      if (impostUserId) {
        headers.set('x-user-id', impostUserId);
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
    getFangraphsHitterSeasonStats: builder.query({
      query: () => `fangraphs-hitter-season-stats`,
    }),
    // Adding a mutation to call a custom method
    findUniqueMLBTeams: builder.query({
      query: (body) => ({
        url: `fangraphs-hitter-season-stats/mlb-teams`,
        method: 'GET',
      }),
    }),
    findHittersByMLBTeamAndSeason: builder.query({
      query: (body) => ({
        url: `fangraphs-hitter-season-stats?AbbName=${body.AbbName}&aseason=${body.aseason}`,
        method: 'GET',
      }),
    }),
    findPitchersByMLBTeamAndSeason: builder.query({
      query: (body) => ({
        url: `fangraphs-pitcher-season-stats?AbbName=${body.AbbName}&aseason=${body.aseason}`,
        method: 'GET',
      }),
    }),
    findHittersById: builder.query({
      query: (body) => ({
        url: `hitter-stats/${body.playerId}?aseason=${body.aseason}`,
        method: 'GET',
      }),
    }),
    findPitchersById: builder.query({
      query: (body) => ({
        url: `pitcher-stats/${body.playerId}?aseason=${body.aseason}`,
        method: 'GET',
      }),
    }),
    getPlayers: builder.query({
      query: (body) => ({
        url: `players?firstName=${body.firstName}&lastName=${body.lastName}&type=${body.type}`,
        method: 'GET',
      }),
    }),
    playGame: builder.mutation({
      query: (body) => ({
        url: `play-game`,
        method: 'POST',
        body,
      }),
    }),
    simPlayers: builder.mutation({
      query: (body) => ({
        url: `sim-players`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

// Export hooks for your endpoints here
export const {
  useGetFangraphsHitterSeasonStatsQuery,
  useFindUniqueMLBTeamsQuery,
  useFindPitchersByMLBTeamAndSeasonQuery,
  usePlayGameMutation,
  useFindHittersByMLBTeamAndSeasonQuery,
  useGetPlayersQuery,
  useFindHittersByIdQuery,
  useFindPitchersByIdQuery,
  useSimPlayersMutation,
} = fgApi;
