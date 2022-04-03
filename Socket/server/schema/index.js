import graphql from "graphql";

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const contacts = [];
const channels = [];
export let messages = [];

const ContactType = new GraphQLObjectType({
    name: 'contact',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    }),
});

const MessagesType = new GraphQLObjectType({
    name: 'messages',
    fields: () => ({
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        to: { type: GraphQLString },
    }),
});

const ChannelType = new GraphQLObjectType({
    name: 'Channel',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    }),
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addMessage: {
            type: MessagesType,
            args: {
                text: {type: new GraphQLNonNull(GraphQLString)},
                to: {type: new GraphQLNonNull(GraphQLString)},
                id: {type: GraphQLID},
            },
            resolve(parent,args){
                let message = {
                    text: args.text,
                    id: args.id,
                    to: args.to,
                };
                messages.push(message);
                return messages;
            }
        },
        deleteMessage: {
            type: MessagesType,
            args: {
                id: {type: GraphQLID},
            },
            resolve(parent,args){
                return messages.filter((item) => item?.id !== args.id);
            }
        },
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        contact: {
            type: ContactType,
            resolve() {
                return contacts;
            },
        },
        messages: {
            type: new GraphQLList(MessagesType),
            resolve() {
                return messages;
            },
        },
        channel: {
            type: ChannelType,
            resolve() {
                return channels;
            },
        },
    },
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
