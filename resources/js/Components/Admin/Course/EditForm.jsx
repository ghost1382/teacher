import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import axios from 'axios';
export default function EditForm({ course }) {
  const { data, setData, put, errors } = useForm({
    title: course.title,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('file', data.file);

    axios
      .put(`/admin/courses/${course.id}`, formData)
      .then((response) => {
        console.log(response.data);
        alert('Course updated successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
   <div/>
  );
}
