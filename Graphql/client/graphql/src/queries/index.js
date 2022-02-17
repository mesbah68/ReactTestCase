
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

export { getLessonsQuery, getTeachersQuery };