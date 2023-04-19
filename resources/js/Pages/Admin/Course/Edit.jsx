import Authenticated from '@/Layouts/Authenticated';
import React, {useState} from 'react';

import EditForm from '@/Components/Admin/Course/EditForm';

import Users from '@/Components/Admin/Course/Users';
import Tabs from '@/Components/Tabs';
import Tab from '@/Components/Tab';

const Index = ({course, modules, users, auth, errors}) => {
    let [currentTab, setCurrentTab] = useState('user');

    let content = <Users course={course} users={users}/>;
    if (currentTab === 'modules') {
        content = <Modules course={course} modules={modules} />
    } else if(currentTab === 'users') {
        content = <Users course={course} users={users}/>
    }

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit - {course.title}</h2>}>

            <Tabs>
                <Tab isActive={currentTab === 'users'} onClick={() => setCurrentTab('users')}>Users</Tab>
            </Tabs>
            
            {content}

            
        </Authenticated>
    )
}

export default Index;