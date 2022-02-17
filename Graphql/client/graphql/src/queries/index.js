
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
export { getLessonsQuery };