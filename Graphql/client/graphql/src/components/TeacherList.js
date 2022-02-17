import React from 'react';

import { useQuery } from "@apollo/client";
// import { graphql } from 'react-apollo';

import { getTeachersQuery } from '../queries/index';


const TeacherList = () => {
    const { loading, error, data } = useQuery(getTeachersQuery);

    if (!loading) {
        const teachersItems = data.teachers;
        return (
            <div>
                <h2>Teachers List</h2>
                <ul>
                    {teachersItems.map(item => (
                        <li>{item.id}  {item.name} {item.group}</li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <span>loading...</span>
        )
    }
    
};

export default TeacherList;
