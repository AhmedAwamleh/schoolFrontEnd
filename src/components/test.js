import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import cookies from 'react-cookies';
function ExampleModal(props) {
  const token = cookies.load("token");


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState();
  const [subject, setSubject] = useState();



  const handelUsersChange = (e) => {
    e.preventDefault()

  }


  const handleObjectSelect = (event) => {
    const selectedObject = event.target.value;
    const usersWithObject = props.user.filter((user) =>
      user.courses.some((course) => course.subject === selectedObject)
    );
    const usersWithoutObject = props.user.filter((user) =>
      !user.courses.some((course) => course.subject === selectedObject)
    );
    const userOptions = usersWithoutObject.map((user) => (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    ));
    // Set the options for the second select here
  }

  return (
    <div>


      <Button variant="primary" onClick={handleShow}>
        Open Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {props.user &&
              <div>
                <Form.Select aria-label="Default select example" onChange={handleObjectSelect}>
                  <option value="">set sub</option>
                  {/* {props.user &&
                    props.user.map((users) =>
                      users.courses.map((sub) => (
                        <React.Fragment key={sub.subject}>
                          <option value={sub.subject}>{sub.subject}</option>
                        </React.Fragment>
                      ))
                    )
                  } */}

                  <option value="">Select a subject</option>
                  <option value="Math">Math</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                </Form.Select>
              </div>
            }
          </div>
          <div>

            {props.user &&
              <div>
                <Form.Select aria-label="Default select example" onChange={handelUsersChange}>
                  <option value="">set user</option>
                  {
                    props.user.map((users) => {
                      return (
                        <>
                          <option value={users.username}>{users.username}</option>
                        </>
                      )
                    })

                  }
                </Form.Select>
              </div>
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default ExampleModal;