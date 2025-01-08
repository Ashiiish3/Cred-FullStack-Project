import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { useGetSingleNoteQuery } from '../features/AllAPI/NoteApi'
import { useParams } from 'react-router-dom'
import NoteDetailSkeleton from '../SkeletonLoading/NoteDetailSkeleton'

export default function NoteDetails() {
  const { noteId } = useParams()
  const { data, isLoading } = useGetSingleNoteQuery(noteId)
  const getImage = (image) => {
    if (image.includes("http")) {
      return image
    } else {
      return `${process.env.REACT_APP_URL}/${image}`
    }
  }
  return isLoading ? <NoteDetailSkeleton /> : (
    <div className='noteDetails'>
      <Row className="mb-3">
        <Col xs={12} className="text-center">
          <Image
            src={getImage(data?.isNoteExist?.notesImage)}
            alt="Note Image"
            fluid
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5 className="text-center">{data?.isNoteExist?.title}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{data?.isNoteExist?.content}</p>
        </Col>
      </Row>
    </div>
  )
}