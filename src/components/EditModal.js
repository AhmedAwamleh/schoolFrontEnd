import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import cookies from 'react-cookies'
import Alert from 'react-bootstrap/Alert';
function ModalEdit(props) {
  const id = props.user.id

  const newValidate = props.user.validate.toString();
  const [formControlName, setFormControlName] = useState("");
  const [formControlEmail, setFormControlEmail] = useState("");
  const [formCheckValue, setFormCheckValue] = useState(false);
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState(false);
  const [result, setResult] = useState();
  const [error, setError] = useState(null);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const handleUpdateUser = () => {
  //   axios
  //     .put(`https://example.com/api/users/${user.id}`, {
  //       username,
  //       email,
  //       isActive,
  //     })
  //     .then((response) => {
  //       console.log(response.data); // handle success response
  //     })
  //     .catch((error) => {
  //       console.error(error); // handle error response
  //     });
  // };



  const token = cookies.load("token")





  useEffect(() => {

    if (showData) {
      props.fetchData(token)
    }
  }, [showData]);

  const handleSubmit = () => {

    axios.put(`http://localhost:3001/users/${id}`, {
      username: formControlName,
      email: formControlEmail,
      active: formCheckValue,
    })
      .then((response) => {
        setShowData(true);
        console.log(response);
      })
      .catch((error) => {
        setError(error.response.data.message);
        // if (error == "Internal Server Erro")
        //   alert(`this email already taken`)
      });
  };





  return (
    <div>


      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          user name
          <Form.Control type="text"
            placeholder="Enter value"
            value={formControlName} onChange={(e) => setFormControlName(e.target.value)} />
        </Modal.Body>

        <Modal.Body>
          email
          <Form.Control
            type="email"
            value={formControlEmail} onChange={(e) => setFormControlEmail(e.target.value)} />
        </Modal.Body>

        <Modal.Body>active State<Form.Control type="text" /></Modal.Body>
        <Form.Check
          type="checkbox"
          label="Check me"
          checked={formCheckValue}
          onChange={(e) => setFormCheckValue(e.target.checked)}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
        {error &&

          <Alert> {error} </Alert>
        }
      </Modal>

    </div>
  );
}

export default ModalEdit