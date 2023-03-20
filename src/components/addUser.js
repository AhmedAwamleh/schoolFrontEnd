import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
function AddUser() {
  const [showModal, setShowModal] = useState(false);
  const [newUserData, setNewUserData] = useState({ username: '', email: '', password: '' });

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: newUserData.username,
      email: newUserData.email,
      password: newUserData.password,
      validate: true
    }

    await axios.post('http://localhost:3001/signup', data).then(res => {
      if (res.data) {
        alert("you can log in now")
      }
    }).catch(error => {
      if (error.response && error.response.status === 409) {
        alert('email already taken')
      } else {
        console.log(error);
      }
    });
    setShowModal(false);
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Add User</Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={newUserData.username} onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={newUserData.email} onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={newUserData.password} onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleNewUserSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser