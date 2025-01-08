import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = `${process.env.REACT_APP_URL}/note`;
export const notesAPI = createApi({
    reducerPath: "notesAPI",
    tagTypes: ["Note"],
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl, credentials: "include" }),
    endpoints: (builder) => ({
        createNote: builder.mutation({
            query: (formData) => ({
                url: "/create",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['Notes'],
        }),
        deleteNote: builder.mutation({
            query: (noteId) => ({
                url: `/delete/${noteId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Notes']
        }),
        getAllNote: builder.query({
            query: (userId) => ({
                url: `/getAllNotes/${userId}`,
                method: "GET"
            }),
            providesTags: ['Notes'],
        }),
        getSingleNote: builder.query({
            query: (noteId) => ({
                url: `/getSingleNote/${noteId}`,
                method: "GET"
            })
        }),
        updateNote: builder.mutation({
            query: ({ noteId, formData }) => ({
                url: `/updateNotes/${noteId}`,
                method: "PATCH",
                body: formData
            }),
            invalidatesTags: ['Notes'],
        })
    })
})

export const { useCreateNoteMutation, useDeleteNoteMutation, useGetAllNoteQuery, useGetSingleNoteQuery, useUpdateNoteMutation } = notesAPI