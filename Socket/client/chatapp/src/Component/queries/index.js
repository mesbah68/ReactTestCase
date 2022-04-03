import { ApolloClient, createHttpLink, gql, InMemoryCache } from '@apollo/client';


const httpLink = createHttpLink({
    uri: 'http://localhost:4001/graphql',
});

  export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const getContactsQuery = gql`
  {
    contacts {
      id
      name
    }
  }
`;

export const getMessagesQuery = gql`
  {
    messages {
      id
      text
      to
    }
  }
`;

export const getChannelsQuery = gql`
  {
    channels {
      id
      name
    }
  }
`;

export const getMessagesMutation = gql`
  mutation AddMessage($text: String!, $id: ID, $to: String!) {
    addMessage(text: $text, id: $id, to: $to) {
      text
      id
      to
    }
  }
`;

export const deleteMessageMutation = gql`
  mutation DeleteMessage( $id: ID) {
    deleteMessage( id: $id ) {
      id
    }
  }
`;


