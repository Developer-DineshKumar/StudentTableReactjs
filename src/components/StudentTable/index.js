import React, { useState } from "react";
import './index.css'


function StudentTable() {
  const [students, setStudents] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const age = event.target.age.value;
    const grade = event.target.grade.value;
    if (name && age && grade) {
      const newStudent = { name, age, grade };
      setStudents([...students, newStudent]);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleCheckboxChange = (event, index) => {
    const isChecked = event.target.checked;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], isChecked };
    setStudents(updatedStudents);
    setDeleteCount(getSelectedCount(updatedStudents));
  };

  const handleDeleteSelected = () => {
    if (students.every((student) => !student.isChecked)) {
      alert("Please select at least one row to delete.");
      return;
    } else{
      const updatedStudents = students.filter((student) => !student.isChecked);
      setStudents(updatedStudents);
      setDeleteCount(getSelectedCount(updatedStudents));
    }
  };

  const handleDeleteAll = () => {
    setStudents([]);
    setDeleteCount(0);
  };

  const getSelectedCount = (students) => {
    return students.filter((student) => student.isChecked).length;
  };

  return (
    <div className="bg-container">
      <h2>Create Student Table</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br />
        <br />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" />
        <br />
        <br />
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" />
        <br />
        <input type="submit" value="Add Student" />
      </form>

      <h2 className="heading">Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={student.isChecked}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      <button onClick={handleDeleteSelected} className="btn">
        Delete Selected ({deleteCount})
      </button>
      <button onClick={handleDeleteAll} className="btn">Delete All</button>
    </div>
  );
}

export default StudentTable;
