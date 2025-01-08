import { createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie';

const initialState = {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    token: Cookies.get('AccessToken') || null,
    isAuth: JSON.parse(localStorage.getItem("userData")) ? true : false
}

export const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        userLogIn: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = action.payload.isAuth
            localStorage.setItem("userData", JSON.stringify(action.payload.user))
            Cookies.set("AccessToken", action.payload.token);
        },
        userLogOut: (state) => {
            state.user = null
            state.token = null
            state.isAuth = null
        }
    }
})

export const { userLogIn, userLogOut } = authSlice.actions
export default authSlice.reducer