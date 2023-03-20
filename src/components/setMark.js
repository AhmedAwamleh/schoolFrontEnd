import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import cookies from 'react-cookies';

const StudentModal = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [mark, setMark] = useState('');

  console.log(students)
  const token = cookies.load("token");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.get('http://localhost:3001/users', config)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSelectStudent = (e) => {

    setSelectedStudent();
    setSelectedSubject();
    setMark();
    // setSelectedCourses(student.courses);
  };

  // console.log(selectedStudent, selectedSubject, mark)
  // const handleSelectSubject = (subject) => {
  //   setSelectedSubject(subject);
  // };

  const handleUpdateMark = () => {

    console.log(selectedStudent)
    axios.put(`http://localhost:3001/addmark/${selectedStudent}`, {
      courseId: selectedStudent,
      subject: selectedSubject,
      mark: mark

    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Add Mark</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Mark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Student</Form.Label>
              <select className="form-control" id="student-select" onChange={e => setSelectedStudent(e.target.value)}>
                <option value="">Select a student</option>
                {students &&
                  students.map((student) => {
                    return (
                      <option key={student.username} value={student.id}>
                        {student.username}
                      </option>
                    );
                  })
                }
              </select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control as="select" onChange={e => setSelectedSubject(e.target.value)}>
                <option>Select a subject</option>
                {selectedStudent && students.map(course => {
                  if (selectedStudent == course.id) {
                    return (
                      course.courses.map((sub) => (

                        <option key={sub.subject} value={sub.id}>
                          {sub.subject}
                        </option>
                      ))
                    )
                  }
                })}
              </Form.Control>
            </Form.Group>

            <Form.Label>Mark</Form.Label>
            <Form.Control type="number" value={mark} onChange={e => setMark(e.target.value)} />

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdateMark}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default StudentModal;
