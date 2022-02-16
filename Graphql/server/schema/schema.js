const graphql = require("graphql");
const lod = require("lodash");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const lessons = [
    { id: '1', name: "GraphQl", group: "front", teacherId: "1" },
    { id: '2', name: "React", group: "front", teacherId: "3" },
    { id: '3', name: "Express", group: "back", teacherId: "2" },

]

const teachers = [
    { id: '1', name: "Mahsa Mesbah", age: 32},
    { id: '2', name: "Jafar Rezaei", age: 27},
    { id: '3', name: "Ali Alaei", age: 30},
]

const TeacherType = new GraphQLObjectType({
    name: 'teacher',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        lessons: {
            type: new GraphQLList(LessonType),
            resolve(parent,args) {
                return lod.filter(lessons,{teacherId: parent.id})
            }
        }
    })
})

const LessonType = new GraphQLObjectType({
    name: 'lesson',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        group: {type: GraphQLString},
        teacher: {
            type: TeacherType,
            resolve(parent,args){
                return lod.find(teachers, {id: parent.teacherId})
            }
        }
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
