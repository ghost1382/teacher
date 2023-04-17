import React from 'react';
import Layout from '@/Layouts/Layout';
import ModuleList from '@/Components/Front/Module/ModuleList';
import { Link } from '@inertiajs/inertia-react';

export default function ({ course, modules }) {
  const fileUrl = 'http://127.0.0.1:8000/storage/' + course.file_path;
  console.log(fileUrl);
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-8">
        <p className="mb-4 text-gray-500"><Link href={route('my-courses')} className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">My Courses</Link> {'>'} <span className="font-medium text-gray-900">{course.title}</span></p>

        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <div className="prose mb-8" dangerouslySetInnerHTML={{ __html: course.content }}></div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Modules</h2>
          <ModuleList modules={modules} course={course} />
        </div>

        {fileUrl && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Download File</h2>
            <a href={fileUrl} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
    fill="currentColor"
  />
  <path
    d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
    fill="currentColor"
  />
</svg>
              Download
            </a>
          </div>
        )}
      </div>
    </Layout>
  )
}
