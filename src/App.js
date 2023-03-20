import React from 'react';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import { useState, useEffect } from 'react';
import cookies from 'react-cookies'
import { When } from 'react-if';
import UserInfo from './components/infoUser';
import InfoAdmin from './components/infoAdmin';
import './components/style.css'
import { Container, Form, Button } from 'react-bootstrap';





function App() {

  const [loggedin, setLoggedin] = useState(false);
  const role = cookies.load("role")

  useEffect(() => {

    const token = cookies.load('token')
    if (token) {
      setLoggedin(true)
    }
  }, [])
  const logOut = () => {
    cookies.remove("token")
    cookies.remove("role")
    cookies.remove("userName")
    cookies.remove("userID")
    setLoggedin(false)
  }

  return (
    <div className="App">


      <When condition={!loggedin}>
        <SignUp />
        <SignIn setLoggedin={setLoggedin} />
      </When>
      <When condition={loggedin}>
        <When condition={role === "user"}>
          <UserInfo />
          <div className="d-flex justify-content-center">
            <button className=" btn-custom-color px-4 py-2 mx-2 my-2" onClick={logOut} >Log Out</button>
          </div>

        </When>

        <When condition={role === "admin"}>
          <InfoAdmin loggedin={loggedin} />
          <Button className=" btn-custom-color px-4 py-2 mx-2 my-2" onClick={logOut}>Log Out</Button>
        </When>


      </When>

    </div>
  );
}


export default App;
