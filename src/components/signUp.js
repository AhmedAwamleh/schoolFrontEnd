import React from "react";
import axios from "axios";
import { Container, Form, Button } from 'react-bootstrap';
import { useState } from "react";
import { useForm } from 'react-hook-form';

function SignUp() {



  const handelSignUp = async (e) => {

    e.preventDefault();
    const data = {
      username: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      validate: false

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
  }

  return (
    <div>

      <div >
        <h2>Registration Form</h2>
        <Form.Group onSubmit={handelSignUp}>
          <form controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              minLength="8"
            />
          </form>
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

          <Button type="submit" className=" btn-custom-color px-4 py-2 mx-2 my-2">Register</Button>
        </Form.Group>
      </div>

    </div>

  )
  //   <div>
  //   <label htmlFor="password">Password:</label>
  //   <input
  //     type="password"
  //     id="password"
  //     name="password"
  //     value={password}
  //     onChange={handleInputChange}
  //     required
  //   />
  //   {!isStrongPassword(password) && (
  //     <p>Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.</p>
  //   )}
  // </div>
}

export default SignUp