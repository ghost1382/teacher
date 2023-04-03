import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

import ValidationErrors from '@/Components/ValidationErrors';
import Label from '@/Components/Label';
import Button from '@/Components/Button';

export default function AddUserToCourse({ course }) {
    const { data, setData, post, errors: formErrors } = useForm({
        class_id: ''
    });

    return (
        <form
        onSubmit={e => {
            e.preventDefault();
            post(route('admin.course.user.store', course))
                .catch((error) => {
                    if (error.response.status === 422) {
                        setFormErrors(error.response.data.errors);
                    }
                });
        }}
    >
        <ValidationErrors errors={formErrors} />
        <div className="flex items-end gap-4">
            <div>
                <Label value="Class" forInput="class_id" />
                <select id="class_id" name="class_id" value={data.class_id} onChange={e => setData('class_id', e.target.value)}>
                    <option value="">Select a class</option>
                    <option value="1">S1</option>
                    <option value="2">S2</option>
                    <option value="3">S3</option>
                    <option value="4">Master</option>
                    {/* Add more options as needed */}
                </select>
            </div>
            <Button color="red">Add</Button>

           
        </div>
    </form>
    
    )
}
