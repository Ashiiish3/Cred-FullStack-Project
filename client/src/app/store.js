import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/AuthSlice";
import { userAPI } from "../features/AllAPI/UserApi";
import { notesAPI } from "../features/AllAPI/NoteApi";
import { adminAPI } from "../features/AllAPI/AdminApi";

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [notesAPI.reducerPath]: notesAPI.reducer,
        [adminAPI.reducerPath]: adminAPI.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware, notesAPI.middleware, adminAPI.middleware)
})