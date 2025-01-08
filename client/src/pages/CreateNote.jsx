import React, { useEffect, useState } from 'react'
import { Container, Form, Button, Image } from "react-bootstrap";
import { useCreateNoteMutation } from '../features/AllAPI/NoteApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateNote() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [createNote, { isError, isSuccess, data, error }] = useCreateNoteMutation()
  const navigate = useNavigate();

  const HandleImage = (e, setState) => {
    const file = e.target.files[0]
    setImage(file)
    const reader = new FileReader()
    reader.onload = () => {
      setState(reader.result)
    }
    reader.readAsDataURL(file)
  }
  const HandleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('notesImage', image);
    await createNote(formData).unwrap()
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Note has been created successfully.");
      navigate('/notes')
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  }, [isSuccess, isError, error, data])

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Form className="p-4 border rounded bg-light shadow" onSubmit={HandleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
          <h5 className="text-center mb-4">Make New Note</h5>
          <Form.Group className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content:</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              type="text"
              placeholder="Enter content"
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => HandleImage(e, setPreviewImage)}
            />
          </Form.Group>
          {previewImage && (
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Image Preview</Form.Label>
              <div className="d-flex justify-content-center align-items-center bg-light p-3 border rounded">
                <Image
                  src={previewImage}
                  alt="Preview"
                  rounded
                  className="img-fluid"
                  style={{ maxWidth: '50%', height: 'auto' }}
                />
              </div>
            </Form.Group>
          )}
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  )
}