import React,{ useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useQuery, useMutation } from "@apollo/client";

import { addTeacherMutation, getTeachersQuery } from '../queries/index';

const AddTeacher = () => {
    const [teacher, setTeacher]  = useState({name: '', age: '', lesson:'' });
    const [addTeacher] = useMutation(addTeacherMutation);

    const handleSetTeacherName = (e) => {
        setTeacher({...teacher ,name: e.target.value});
    }

    const handleSetTeacherAge = (e) => {
        setTeacher({...teacher ,age: e.target.value});
    }

    const handleSetTeacherLesson = (e) => {
        setTeacher({...teacher ,lesson: e.target.value});
    }

    const handleAddTeacher = (e) => {
        e.preventDefault();
        addTeacher({ 
            variables: { 
                id: uuid(), 
                name: teacher.name, 
                age: teacher.age, 
                lesson: teacher.lesson 
            },
            refetchQueries: [{query: getTeachersQuery}] 
        });
        setTeacher({name: '', age: '', lesson: ''})
    }


    return (
        <div>
            <h2>Add Teacher</h2>
            <form onSubmit={handleAddTeacher}>
                <div>
                    <label>teacher name:</label>
                    <input type="text" name="name" value={teacher.name} onChange={handleSetTeacherName}/>
                </div>
                <div>
                    <label>age:</label>
                    <input type="text" name="group" value={teacher.age} onChange={handleSetTeacherAge} />
                </div>
                <div>
                    <label>lessons:</label>
                    <input type="text" name="group" value={teacher.lesson} onChange={handleSetTeacherLesson} />
                </div>
                <button>Insert</button>
            </form>
        </div>
    )
};

export default AddTeacher;
