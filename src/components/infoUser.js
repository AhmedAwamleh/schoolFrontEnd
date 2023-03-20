
import React from "react";
import cookies from 'react-cookies'
import { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

function UserInfo(props) {

  const [userr, setUsers] = useState([])

  const id = cookies.load("userID")
  const fetchData = async () => {
    console.log(id)
    await axios.get(`http://localhost:3001/users/${id}`).then(async (res) => {
      setUsers([res.data])
    });

  }

  useEffect(() => {
    fetchData()
  }, [])

  return (

    <div className="container">

      <h2>USER HOME</h2>

      {userr &&
        userr.map((info, idx) => (

          <div key={idx}>
            {console.log(info)}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{info.username}</td>
                  <td>{info.email}</td>
                </tr>
              </tbody>
            </table>

            {
              info &&
              info.courses.map((cors, idx) =>
                <div >

                  <div className="table-responsive">
                    <table className="table border">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Pass Mark</th>
                          <th>Student Mark</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{cors.subject}</td>
                          <td>{cors.passMark}</td>
                          <td>{cors.mark || "Empty"}</td>
                        </tr>
                      </tbody>
                    </table >
                  </div >
                </div>
              )
            }

          </div >
        ))
      }
    </div >
  )

}

export default UserInfo;



