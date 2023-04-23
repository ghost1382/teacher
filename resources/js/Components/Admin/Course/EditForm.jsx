import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';
import Label from '@/Components/Label';
const EditForm = ({ course }) => {
  const { data, setData, post, errors } = useForm({
    _method: 'put',
    title: course.title,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData(name, name === 'file' ? files[0] : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/admin/courses/${course.id}`, {
      onSuccess: () => {
        alert('Course updated successfully');
      },
      onError: () => {
        console.log(errors);
      },
    });
  };

  return (
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <Label htmlFor="title">Title</Label>
    <input 
      type="text" 
      name="title" 
      id="title" 
      value={data.title} 
      onChange={handleChange} 
      className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none text-gray-700 py-2 px-3 block w-96 transition duration-500 ease-in-out"
    />

    {errors.title && (
      <div className="text-red-500 text-sm mt-1">{errors.title}</div>
    )}
  </div>
  
  <div>
    <label htmlFor="file" className="file-input-label">
      <span className="file-input-text">{data.file ? data.file.name : 'Choose File'}</span>
      <input className="file-input" type="file" name="file" id="file" onChange={handleChange} />
    </label>
    
    {errors.file && (
      <div className="text-red-500 text-sm mt-1">{errors.file}</div>
    )}
  </div>
  
  <Button type="submit" className="mt-4">Save</Button>
</form>

 
  
    );
  };

export default EditForm;
