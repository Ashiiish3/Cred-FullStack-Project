import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = `${process.env.REACT_APP_URL}/user`;
export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
    endpoints: (builder) => ({
        userSignUp: builder.mutation({
            query: (newPost) => ({
                url: '/signup',
                method: "POST",
                body: newPost
            })
        }),
        userSignIn: builder.mutation({
            query: (newPost) => ({
                url: "/signin",
                method: "POST",
                body: newPost
            })
        })
    })
})

export const { useUserSignUpMutation, useUserSignInMutation } = userAPI