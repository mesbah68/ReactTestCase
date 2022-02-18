
import { gql } from "@apollo/client";

const getLessonsQuery = gql`
{
    lessons{
        name
        id
        group
    }
}
`

const getTeachersQuery = gql`
{
    teachers{
        name
        id
    }
}
`

const addLessonsMutation = gql`
    mutation AddLesson($name: String!, $id: ID, $group: String!, $teacher: ID ) {
        addLesson(name: $name, id: $id, group: $group, teacher: $teacher) {
            name
        }
    }
`;

const addTeacherMutation = gql`
    mutation AddTeacher($name: String!, $id: ID, $age: String!, $lesson: String! ) {
        addTeacher(name: $name, id: $id, age: $age, lesson: $lesson) {
            name
        }
    }
`;

export { getLessonsQuery, getTeachersQuery, addLessonsMutation, addTeacherMutation };