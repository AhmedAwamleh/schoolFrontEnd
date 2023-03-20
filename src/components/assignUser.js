import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookies from 'react-cookies';

const subjectCourseIdMap = {
  Math: 1,
  Science: 2,
  History: 3,
  English: 4
};

function AssignSubjectButton(props) {
  const [subject, setSubject] = useState('');
  const [student, setStudent] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalShown, setModalShown] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);





  const token = cookies.load("token");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    axios.get('http://localhost:3001/users', config)
      .then(response => {
        setUsers(response.data);


        const filteredUsers = response.data.filter(user => {
          const courseExists = user.courses.some(course => course.subject === subject);
          return !subject || !courseExists;
        });
        setFilteredUsers(filteredUsers);
      })
      .catch(error => {
        console.log(error);
      });
  }, [subject]);


  const handleSubjectChange = (event) => {
    const selectedSubject = event.target.value;
    setSubject(selectedSubject);
    setSubjectId(subjectCourseIdMap[selectedSubject]);

    if (users) {
      const filteredUsers = users.filter(user => {
        const courseExists = user.courses.some(course => course.subject === selectedSubject);
        return !selectedSubject || !courseExists;
      });
      setFilteredUsers(filteredUsers);
    }
    setStudent('');

    if (selectedSubject !== '') {
      axios.get(`http://localhost:3001/getUsersBySubject?subject=${selectedSubject}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          console.log(response)
          setUsers(response.data);
          setFilteredUsers(response.data.filter(user => !user.courses.some(course => course.subject === selectedSubject)));
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const handleStudentChange = (event) => {
    setStudent(event.target.value);
  }

  const handleAssign = () => {
    console.log('Assigning course...');
    const courseId = subjectCourseIdMap[subject];
    const user = users.find(u => u.username === student);
    console.log(user)
    if (user && !user.courses.find(c => c.subject === subject)) {
      user.courses.push({ subject: subject });
      const id = user.id
      console.log(id)
      axios.post(`http://localhost:3001/assign/${id}`, {
        userId: user.id,
        courseId: courseId,
        subject: subject
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(function (response) {
          console.log(response);

          setAssignedUsers([...assignedUsers, { userId: user.id, subject: subject }]);

          setFilteredUsers(prevFilteredUsers => prevFilteredUsers.filter(u => u.id !== user.id));


          axios.get('http://localhost:3001/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
              console.log(response);
              setUsers(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setModalShown(false);
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setModalShown(true)}>Assign Subject</button>
      <div className={`modal fade ${modalShown ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalShown ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="assignModalLabel">Assign Subject to Student</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setModalShown(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">

                  <label htmlFor="subject-select">Select Subject</label>
                  <select className="form-control" id="subject-select" value={subject} onChange={handleSubjectChange}>
                    <option value="">Select a subject</option>
                    <option value="Math">Math</option>
                    <option value="Science">Science</option>
                    <option value="English">English</option>
                    <option value="History">History</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="student-select">Select Student</label>
                  <select className="form-control" id="student-select" value={student} onChange={handleStudentChange} disabled={!subject}>
                    <option value="">Select a user</option>
                    {filteredUsers.map(user => (

                      <option key={user.username} value={user.username}>{user.username}</option>
                    ))}
                  </select>



                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalShown(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAssign}>Assign</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignSubjectButton;