import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"
import { useDeleteNoteMutation } from '../features/AllAPI/NoteApi';

export default function NoteCard({ note }) {
  const getImage = (image) => {
    if (image.includes("http")) {
      return image
    } else {
      return `${process.env.REACT_APP_URL}/${image}`
    }
  }
  const [deleteNote, { data, isError, isLoading, error }] = useDeleteNoteMutation()
  const HandleDelete = async (noteId) => {
    const response = await deleteNote(noteId).unwrap()
    toast.success(response?.message || "Note has been Deleted successfully.");
  }
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  }, [isError, error, data, isLoading])
  return (
    <div>
      <div className="note-card">
        <div className="note-image">
          <img
            src={getImage(note?.notesImage)}
            alt="Note image"
          />
        </div>
        <div className="note-title">
          <h5>{note.title || 'Title'}</h5>
        </div>
        <div className="note-actions">
          <Button variant="transparent" size="lg">
            <Link to={`/UpdateNote/${note._id}`}>
              <MdModeEdit />
            </Link>
          </Button>
          <Button className="my-2">
            <Link to={`/noteDetails/${note._id}`} style={{ textDecoration: "none" }} className='text-white'>
              View More
            </Link>
          </Button>
          <Button variant="transparent" size="lg" onClick={() => HandleDelete(note._id)}>
            <MdDelete className="text-danger" />
          </Button>
        </div>
      </div>
    </div>
  )
}