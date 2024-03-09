import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

console.log(import.meta.env);

export const myApi = createApi({
  reducerPath: 'myApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/api',
    // prepareHeaders: (headers) => {
    //   const token = getJwtToken();
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   // This is where you could set headers common to all requests
    //   return headers;
    // },
    // Adding response handler
    // responseHandler: async (response) => {
    //   if (response.status === 401) {
    //     window.location.href = '/login';
    //   }
    //   return response;
    // },
  }),
  endpoints: (builder) => ({
    getFangraphsHitterSeasonStats: builder.query({
      query: () => `fangraphs-hitter-season-stats`,
    }),
    // Adding a mutation to call a custom method
    findUniqueMLBTeams: builder.query({
      query: (body) => ({
        url: `fangraphs-hitter-season-stats/mlb-teams`, // Adjust the URL to your specific service
        method: 'GET',
      }),
    }),
    findHittersByMLBTeamAndSeason: builder.query({
      query: (body) => ({
        url: `fangraphs-hitter-season-stats?AbbName=${body.AbbName}&aseason=${body.aseason}`, // Adjust the URL to your specific service
        method: 'GET',
      }),
    }),
    findPitchersByMLBTeamAndSeason: builder.query({
      query: (body) => ({
        url: `fangraphs-pitcher-season-stats?AbbName=${body.AbbName}&aseason=${body.aseason}`, // Adjust the URL to your specific service
        method: 'GET',
      }),
    }),
    playGame: builder.mutation({
      query: (body) => ({
        url: `play-game`, // Adjust the URL to your specific service
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
} = myApi;
