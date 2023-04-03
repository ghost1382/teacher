import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

import Button from '@/Components/Button';

export default function({course, users}) {
    const { delete: destroy } = useForm({});

    return (
        <div className="overflow-auto">
            <table className="table w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {!users || !users.length ? (
                        <tr>
                            <td className="px-6 py-4 text-sm whitespace-no-wrap" colSpan="2">No users yet.</td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr key={user.id} className="bg-white">
                                <td className="px-6 py-4 text-sm">{user.email}</td>
                                <td className="px-6 py-4 text-sm">
                                    <form onSubmit={e => {
                                        e.preventDefault();
                                        destroy(route('admin.course.user.destroy', {
                                            course,
                                            user
                                        }));
                                    }}>
                                        <Button color="red">Remove</Button>

                                    </form>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
