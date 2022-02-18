import React,{ useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery, useMutation } from "@apollo/client";
// import { graphql } from 'react-apollo';

import { getTeachersQuery, addLessonsMutation, getLessonsQuery } from '../queries/index';

const AddLesson = () => {
    const [lesson, setLesson]  = useState({name: '', group: '', teacher:'' });
    const { loading, error, data } = useQuery(getTeachersQuery);
    const [addLesson] = useMutation(addLessonsMutation);

    const handleSetLessonName = (e) => {
        setLesson({...lesson ,name: e.target.value});
    }

    const handleSetLessonGroup = (e) => {
        setLesson({...lesson ,group: e.target.value});
    }

    const handleSetLessonTeacher = (e) => {
        setLesson({...lesson ,teacher: e.target.value});
    }

    const handleAddLesson = (e) => {
        e.preventDefault();
        addLesson({ 
            variables: { 
                id: uuid(), 
                name: lesson.name, group: lesson.group, 
                teacher: lesson.teacher 
            },
            refetchQueries: [{query: getLessonsQuery}] 
        });
        setLesson({name: '', group: '', teacher: ''})
    }


    return (
        <div>
            <h2>Add Lesson</h2>
            <form onSubmit={handleAddLesson}>
                <div>
                    <label>Lesson name:</label>
                    <input type="text" name="name" value={lesson.name} onChange={handleSetLessonName}/>
                </div>
                <div>
                    <label>group:</label>
                    <input type="text" name="group" value={lesson.group} onChange={handleSetLessonGroup} />
                </div>
                <div>
                    <label>teacher:</label>
                    <select name="teacherId" onChange={handleSetLessonTeacher} >
                        {data?.teachers.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <button>Insert</button>
            </form>
        </div>
    )
};

export default AddLesson;
