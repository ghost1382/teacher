import React, { useRef } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import EditCourseForm from '@/Components/EditCourseForm';

import ValidationErrors from '@/Components/ValidationErrors';

export default function EditForm({ course }) {
    const { data, setData, put, errors: formErrors } = useForm({
        title: course.title,
        file: null,
      });

  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.courses.update', course.id), {
      preserveScroll: true,
      onSuccess: () => {
        alert('Course updated successfully');
      },
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ValidationErrors errors={errors} />
      <EditCourseForm course={course} handleSubmit={handleSubmit} csrfToken={csrfToken} />
    </form>
  );
}
