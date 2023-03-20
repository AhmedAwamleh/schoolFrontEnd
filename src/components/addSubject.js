import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const subjectCourseIdMap = {
  Math: 1,
  Science: 2,
  History: 3,
  English: 4
};

const CreateSubjectModal = (props) => {
  const [show, setShow] = useState(false);
  const [subject, setSubject] = useState('');
  const [minimumMark, setMinimumMark] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const courseId = subjectCourseIdMap[subject]
    console.log("helooo" + courseId)
    const data = {
      subject,
      passMark: minimumMark,
      courseId,
    };
    // if (subjectCourseIdMap[subject]) {
    //   data.courseId = subjectCourseIdMap[subject];
    //   console.log(data.courseId)
    // }
    try {
      const response = await axios.post('http://localhost:3001/coursesWithoutUser', data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create New Subject
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option value="">Select a subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="English">English</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="minimumMark">
              <Form.Label>Minimum Mark</Form.Label>
              <Form.Control type="text" placeholder="Enter minimum mark" value={minimumMark} onChange={(event) => setMinimumMark(event.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!subject || !minimumMark}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateSubjectModal;