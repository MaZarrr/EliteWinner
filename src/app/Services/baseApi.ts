'use client'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:2023', credentials: 'include' }),
    endpoints: (builder) => ({
    login: builder.query<any, unknown>({
        query: () => {
            return {
                url: '/login',
                method: 'GET',
            }
        }
      }),
      getGroups: builder.query<any, unknown>({
        query: () => {
            return {
                url: '/getGroups',
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
      // получаем всех пользователей по установленным настройкам
      getUsersCondition: builder.query<any, unknown>({
        query: (options) => {
            return {
                url: '/getUsersCondition',
                method: 'POST',
                body: JSON.stringify(options),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
      getUserAccount: builder.query<any, unknown>({
        query: (options) => {
            return {
                url: '/getUserAccount',
                method: 'POST',
                body: JSON.stringify(options),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
      getMe: builder.query<any, unknown>({
        query: (options) => {
            return {
                url: '/me',
                method: 'POST',
                body: JSON.stringify(options),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
      getContests: builder.query<any, unknown>({
        query: (options) => {
            return {
                url: '/getContests',
                method: 'POST',
                body: JSON.stringify(options),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
      addContest: builder.mutation<any, unknown>({
        query: (options) => {
            return {
                url: '/addContest',
                method: 'POST',
                body: JSON.stringify(options),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
      startAuction: builder.mutation<any, unknown>({
        query: (options) => {
            return {
                url: 'http://127.0.0.1:8080/auction',
                method: 'POST',
                body: JSON.stringify(options),
                headers: {
                    'Content-Type': 'application/json'
                  }
            }
        }
      }),
    })
});

export const { 
    useLoginQuery, 
    useLazyLoginQuery, 
    useLazyGetGroupsQuery, 
    useGetGroupsQuery,
    useLazyGetUsersConditionQuery,
    useLazyGetUserAccountQuery,
    useLazyGetMeQuery,
    useAddContestMutation,
    useGetContestsQuery,
    useGetMeQuery,
    useStartAuctionMutation,
} = api