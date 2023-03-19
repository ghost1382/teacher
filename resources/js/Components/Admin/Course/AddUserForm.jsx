import React, { useState, useEffect } from "react";
import Select from "@/Components/Select";
import axios from "axios";
import Button from '@/Components/Button';

const AddUserForm = ({ courseId }) => {
  const [classId, setClassId] = useState("");
  const [users, setUsers] = useState([]);

  const handleClassIdChange = (e) => {
    setClassId(e.target.value);
  };

  const handleSubmitAddUser = (e) => {
    e.preventDefault();

    const selectedClass = `s${classId}`;
    const url = `http://127.0.0.1:8000/api/courses/${courseId}`;

    axios
      .get(url)
      .then((response) => {
        const course = response.data;

        // Find the class with the selected ID in the course
        const selectedCourseClass = course.classes.find(
          (courseClass) => courseClass.id === selectedClass
        );

        if (selectedCourseClass) {
          axios
            .post(`${url}/addUser`, {
              class_id: selectedClass,
            })
            .then((response) => {
              setUsers([...users, response.data]);
              setClassId("");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log(`Class ${selectedClass} not found in course`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const url = `/api/courses/${courseId}/users`;
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId]);

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmitAddUser}>
        <div>
          <label htmlFor="class_id">Class:</label>
          <Select
            name="class_id"
            id="class_id"
            value={classId}
            onChange={handleClassIdChange}
            options={[
              { value: "s1", label: "s1" },
              { value: "s2", label: "s2" },
              { value: "s3", label: "s3" },
              { value: "master", label: "Master" },
            ]}
          />
        </div>
        <Button type="submit">Add User</Button>
      </form>
    </div>
  );
};

export default AddUserForm;
