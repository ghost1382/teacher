import Authenticated from '@/Layouts/Authenticated';
import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import ValidationErrors from '@/Components/ValidationErrors';
import EditCourseForm from '@/Components/EditCourseForm';
import Tabs from '@/Components/Tabs';
import Tab from '@/Components/Tab';
import Modules from '@/Components/Admin/Course/Modules';
import Users from '@/Components/Admin/Course/Users';

const Edit = ({ auth, course, modules, users, errors }) => {
  const { data, setData, put, errors: formErrors } = useForm({
    title: course.title,
  });
  const editorRef = useRef(null);
  const [file, setFile] = useState(null);
  const [currentTab, setCurrentTab] = useState('content');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    if (file) {
      formData.append('file', file);
    }

    put(route('admin.course.update', course), formData, {
      onSuccess: () => {
        alert('Course updated successfully');
      },
      onError: (error) => {
        console.error(error.response.data.errors);
      },
    });
  };

  let content = <EditCourseForm course={course} data={data} setData={setData} editorRef={editorRef} setFile={setFile} />;
  if (currentTab === 'modules') {
    content = <Modules course={course} modules={modules} />;
  } else if (currentTab === 'users') {
    content = <Users course={course} users={users} />;
  }

  return (
    <Authenticated
      auth={auth}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Course</h2>}
      errors={errors}
    >
      <Tabs>
        <Tab isActive={currentTab === 'content'} onClick={() => setCurrentTab('content')}>Content</Tab>
        <Tab isActive={currentTab === 'modules'} onClick={() => setCurrentTab('modules')}>Modules</Tab>
        <Tab isActive={currentTab === 'users'} onClick={() => setCurrentTab('users')}>Users</Tab>
      </Tabs>
      <form onSubmit={handleSubmit}>
        <ValidationErrors errors={formErrors} />
        {content}
      </form>
    </Authenticated>
  );
};

export default Edit;
