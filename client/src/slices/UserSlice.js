import { apiSlice } from "./ApiSlice"

const USERS_URL = "/api"

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signin`,
        method: "POST",
        body: data,

      })

    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),

    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,

      })

    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = UserApiSlice
