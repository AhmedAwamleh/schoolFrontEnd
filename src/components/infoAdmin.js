import React from "react";
import cookies from 'react-cookies'
import { useState, useEffect } from "react";
import axios from "axios";
import 'reactjs-popup/dist/index.css';
import { Table, Button } from "react-bootstrap";
import ModalEdit from "./EditModal";
import AddUser from "./addUser";
import CreateSubjectModal from "./addSubject";
import AssignSubjectButton from "./assignUser";
import StudentModal from "./setMark";
import Navbar from 'react-bootstrap/Navbar';


function InfoAdmin(props) {

  const [result, setResult] = useState();
  const [showResult, setshowResult] = useState(false);
  const [data, setData] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);

  const token = cookies.load("token")

  const fetchData = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    try {
      const response = await axios.get('http://localhost:3001/users/', config);
      const userInfo = response.data;
      setResult(userInfo);
      setshowResult(true)
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {

    fetchData(token)
    setDeleteUser(false)
  }, [showResult]);

  useEffect(() => {

    fetchData(token)

  }, [deleteUser]);


  const handleDelete = (id) => {

    // const answer = confirm("do you want delete this user")

    // if (answer == "true") {

    axios.delete(`http://localhost:3001/users/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then(response => {
      // handle success
      setData(data.filter(item => item.id !== id));
      setDeleteUser(true)
    })
      .catch(error => {
        // handle error
        console.log(error);
      });
    // };
  }

  return (
    <div>

      <Navbar bg="light" variant="light">
        <StudentModal user={result} />
        <AddUser />
        <CreateSubjectModal />
        <AssignSubjectButton user={result} />
      </Navbar>


      <Table striped bordered hover>

        <thead>
          <tr>

            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showResult &&
            result.map((user, idx) => (
              <tr key={idx}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Button className=" btn-custom-color px-4 py-2 mx-2 my-2" variant="primary" onClick={() => handleDelete(user.id)}>Delete</Button>

                  <ModalEdit user={user} fetchData={fetchData} />

                </td>
              </tr>
            ))}
        </tbody>
      </Table>


    </div>

  )

}

export default InfoAdmin;