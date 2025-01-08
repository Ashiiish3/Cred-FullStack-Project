import React, { useEffect } from 'react'
import { useGetAllNotesByAdminQuery } from '../features/AllAPI/AdminApi'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import NoteCard from '../adminPage/NoteCard'
import AdminNotesSkeleton from '../SkeletonLoading/AdminNotesSkeleton'

export function AllNotesGet() {
  const { data, isLoading, isSuccess, refetch } = useGetAllNotesByAdminQuery()
  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess, refetch, isLoading])
  const groupedNotes = data?.AllNotes.reduce((acc, note) => {
    if (!acc[note.name]) {
      acc[note.name] = [];
    }
    acc[note.name].push(note);
    return acc;
  }, {});

  return (
    <div style={{ minHeight: "100vh" }} className='d-flex flex-column flex-md-row'>
      <div className='notes-admin-container'>
        {
          data?.AllNotes.length > 0 ? Object.entries(groupedNotes).map(([name, notes]) => (
            <div key={name} className="mb-4">
              <h6 className="mb-2">User Name: {name}</h6>
              {notes.map((note, i) => (
                <NoteCard key={i} note={note} />
              ))}
            </div>
          )) : isLoading ? [1, 2, 3, 4, 5, 7, 6, 8, 9, 10].map((ele, i) => <AdminNotesSkeleton key={i} />) : <Container className="py-5">
            <Row className="justify-content-center">
              <Col md={8} className="text-center">
                <Alert variant="warning" className="p-4 shadow-sm">
                  <h1 className="display-6 text-warning">No Notes Available</h1>
                  <p className="text-muted mt-3">
                    It seems like there are no notes to display at the moment. Please add some notes to view them here.
                  </p>
                </Alert>
              </Col>
            </Row>
          </Container>
        }
      </div>
    </div>
  )
}