import React, { useState, useRef, useEffect } from 'react';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import Button from './Button';

const EditCourseForm = ({ course, data, setData, handleSubmit, csrfToken, setFile }) => {
  const [title, setTitle] = useState(data.title ?? course.title);
  const fileRef = useRef(null);

  useEffect(() => {
    setData('title', title);
  }, [title]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div>
      <div className="mb-4">
        <Label forInput="title" value="Title" />
        <Input
          type="text"
          name="title"
          value={title}
          handleChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Label forInput="file" value="File" />
        <label className="file-input-label">
          <span className="file-input-text">{fileRef.current?.files?.[0]?.name || 'Choose file'}</span>
          <input
            className="file-input"
            type="file"
            name="file"
            ref={fileRef}
            onChange={handleFileChange}
          />
          
        </label>
      </div>
      <div className="flex justify-end">
        <Button className="mr-2" onClick={handleSubmit}>
          Update
        </Button>
        <a
  href={route('admin.course.index')}
  className="a inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 disabled:opacity-25 transition relative overflow-hidden"
>
  Cancel
  <span className="cancel-link-after"></span>
  <span className="cancel-link-before"></span>
</a>

      </div>
    </div>
  );
};

export default EditCourseForm;
