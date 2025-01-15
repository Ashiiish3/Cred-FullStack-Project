import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userLogIn, userLogOut } from '../AuthSlice';

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
                    dispatch(
                        userLogIn({
                            user: data.userData,
                            token: data.token,
                            isAuth: true
                        })
                    )
                } catch (error) {
                    console.error("Login error:", error);
                }
            }
        }),
        userSignOut: builder.mutation({
            query: () => ({
                url: '/signout',
                method: "GET"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    await queryFulfilled;
                    dispatch(userLogOut())

                } catch (error) {
                    console.error("Logout error:", error);
                }
            }
        })
    })
})

export const { useUserSignUpMutation, useUserSignInMutation, useUserSignOutMutation } = userAPI