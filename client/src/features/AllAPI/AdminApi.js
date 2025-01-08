import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.REACT_APP_URL}/note`;
export const adminAPI = createApi({
    reducerPath: "AdminAPI",
    tagTypes: ["Admin"],
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
    endpoints: (builder) => ({
        getAllNotesByAdmin: builder.query({
            query: () => ({
                url: "/getAllNotesAdmin",
                method: "GET"
            }),
            providesTags: ['Admin']
        }),
        getSingleNoteByAdmin: builder.query({
            query: (noteId) => ({
                url: `/singleNoteAdmin/${noteId}`,
                method: "GET"
            })
        }),
        updateNoteByAdmin: builder.mutation({
            query: ({ noteId, formData }) => ({
                url: `/updateNotAdmin/${noteId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Admin']
        }),
        deleteNoteByAdmin: builder.mutation({
            query: (noteId) => ({
                url: `/deleteNotesAdmin/${noteId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Admin']
        })
    })
})

export const { useGetAllNotesByAdminQuery, useGetSingleNoteByAdminQuery, useUpdateNoteByAdminMutation, useDeleteNoteByAdminMutation } = adminAPI