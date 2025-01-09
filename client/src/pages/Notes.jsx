import React, { useEffect } from 'react'
import { useGetAllNoteQuery } from '../features/AllAPI/NoteApi'
import { useSelector } from 'react-redux'
import NoteCard from '../components/NoteCard';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { NotesSkeleton } from '../SkeletonLoading/NotesSkeleton'

export default function Notes() {
  const { user } = useSelector((data) => data.auth)
  const { isLoading, isSuccess, refetch, data } = useGetAllNoteQuery(user?._id);
  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess, refetch, isLoading, data])
  return (
    <div style={{ minHeight: "100vh" }} className='d-flex flex-column flex-md-row' >
      <div className='container notes-container'>
        {
          data?.allUserNotes.length > 0 ? data?.allUserNotes.map((note) => <NoteCard key={note._id} note={note} />) : isLoading ? [1, 2, 3, 4, 5].map((ele, i) => <NotesSkeleton key={i} />) : <Container className="py-5">
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