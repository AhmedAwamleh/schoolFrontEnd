import React from "react";
import axios from "axios";
import base64 from "base-64";
import cookies from 'react-cookies'
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';

function SignIn(props) {

  const [error, setError] = useState('');

  const handelSignIn = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
      validate: true
    }
    const encoded = base64.encode(`${data.email}:${data.password}`);
    await axios.post('http://localhost:3001/signIn', {}, {
      headers: {
        Authorization: `Basic ${encoded}`
      }
    }).then(res => {
      cookies.remove("token")
      cookies.remove("userID")
      cookies.remove("userName")
      cookies.remove("validate")
      cookies.remove("role")
      cookies.save('token', res.data.token);
      cookies.save('userID', res.data.id);
      cookies.save('userName', res.data.username);
      cookies.save('validate', res.data.validate);
      cookies.save('role', res.data.role);
      // cookies.save('capabilities', JSON.parse(res.data.capabilities));
      const isValid = res.data.validate

      if (isValid === true) {
        props.setLoggedin(true)

      } else {
        alert("This account is inactive please wait for the administrator to active your acount")
      }

    })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          alert('Email or password not correct')
        } else {
          console.log(error);
        }
      });
  }

  return (
    <div>
      <Container >
        <h2>Login Form</h2>
        <Form onSubmit={handelSignIn}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"

              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <button className=" btn-custom-color px-4 py-2 mx-2 my-2" type=" submit" >Login</button>
        </Form>
      </Container>
      {
        error &&

        <Alert> {error} </Alert>
      }
    </div >
  )
}


export default SignIn