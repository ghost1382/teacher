import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Button from '@/Components/Button';

export default function CourseUserTable({ course, users }) {
  const { delete: destroy } = useForm({});

  return (
    <table className="table">
      <thead>
        <tr>
          <td>Class</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {(!users || !users.length) && (
          <tr>
            <td colSpan="2">No users yet.</td>
          </tr>
        )}
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.class}</td>
            <td>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  destroy(
                    route('admin.course.user.destroy', {
                      course,
                      user_id: user.id, // pass user_id instead of id
                    })
                  );
                }}
              >
                <Button>Remove</Button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
