import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteNoteByAdminMutation } from '../features/AllAPI/AdminApi'
import { toast } from 'react-toastify'

export default function NoteCard({ note }) {
    const getImage = (image) => {
        if (image.includes("http")) {
            return image
        } else {
            return `${process.env.REACT_APP_URL}/${image}`
        }
    }
    const [deleteNoteByAdmin, { data, isError, isSuccess, isLoading, error }] = useDeleteNoteByAdminMutation()
    const HandleDelete = async (noteId) => {
        const deleteData = await deleteNoteByAdmin(noteId).unwrap()
        toast.success(deleteData?.message || "Note has been Deleted.")
    }
    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || "Something went wrong")
        }
    }, [isSuccess, isError, error, data, isLoading])
    return (
        <div>
            <div className="note-admin-card">
                <div className="note-admin-image">
                    <img
                        src={getImage(note.notesImage)}
                        alt="Note image"
                    />
                </div>
                <div className='note-admin-body'>
                    <div className="note-admin-title">
                        <h6>{note.title || 'Title'}</h6>
                    </div>
                    <div className='note-admin-content'>
                        <p>{note.content || "Content"}</p>
                    </div>
                    <div className="note-admin-actions">
                        <button className='btn btn-primary'>
                            <Link to={`/updateNotebyAdmin/${note._id}`} style={{ textDecoration: "none", color: "white" }} >
                                Edit
                            </Link>
                        </button>
                        <button className='btn btn-danger' onClick={() => HandleDelete(note._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}