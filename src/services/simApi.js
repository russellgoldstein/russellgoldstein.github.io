import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const simApi = createApi({
  reducerPath: 'simApi',
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
    getCurrentUser: builder.query({
      query: () => 'current-user',
    }),
  }),
});

// Export hooks for your endpoints here
export const { useGetCurrentUserQuery } = simApi;
