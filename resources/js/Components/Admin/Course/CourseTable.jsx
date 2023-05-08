import Button from '@/Components/Button';
import { Link, useForm } from '@inertiajs/inertia-react';
import React from 'react';
import dayjs from 'dayjs';

const CourseTable = ({courses}) => {
    const {delete: destroy} = useForm({});

    const handleDelete = (e, course) => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete ${course.title}?`)) {
            destroy(route('admin.course.destroy', course));
        }
    };

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {!courses.length && <tr><td colSpan="3" className="px-6 py-4">No courses. <Link href={route('admin.course.create')} className="text-blue-600 hover:text-blue-800">Create a course</Link></td></tr>}

                {courses.map(course => (
                    <tr key={course.id} className="bg-white">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dayjs(course.created_at).format('DD/MM/YYYY')}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex flex-wrap gap-4 items-center">
                                <Link href={route('course.show', course)} className="text-blue-600 hover:text-blue-800">View</Link>
                                <Link href={route('admin.course.edit', course)} className="text-blue-600 hover:text-blue-800">
                                  Add
                                </Link>
                                <form onSubmit={(e) => handleDelete(e, course)}>
                                    <Button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">Delete</Button>
                                </form>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default CourseTable;
