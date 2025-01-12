import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLogIn } from '../AuthSlice';

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
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }){
                try {
                    const { data } = await queryFulfilled;
                    console.log(data)
                    console.log(data.token)
                    dispatch(
                        userLogIn({
                            user: data.userData,
                            isAuth: true
                        })
                    )
                } catch (error) {
                    console.error("Login error:", error);
                }
            }
        })
    })
})

export const { useUserSignUpMutation, useUserSignInMutation } = userAPI