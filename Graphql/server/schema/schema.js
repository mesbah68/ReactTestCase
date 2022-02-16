const graphql = require("graphql");
const lod = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
} = graphql;

const lessons = [
    { id: '1', name: "GraphQl", group: "front"},
    { id: '2', name: "React", group: "front"},
    { id: '3', name: "Express", group: "back"},

]

const teachers = [
    { id: '1', name: "Mahsa Mesbah", age: 32},
    { id: '2', name: "Jafar Rezaei", age: 27},
    { id: '3', name: "Ali Alaei", age: 30},
]

const LessonType = new GraphQLObjectType({
    name: 'Lesson',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        group: {type: GraphQLString},
    })
})

const TeacherType = new GraphQLObjectType({
    name: 'Teacher',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
})

const RootQuery = new GraphQLObjectType ({
    name: 'RootQueryType',
    fields: {
        lesson: {
            type: LessonType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return lod.find(lessons, {id: args.id})
            }
        },
        teacher: {
            type: TeacherType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                return lod.find(teachers, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
