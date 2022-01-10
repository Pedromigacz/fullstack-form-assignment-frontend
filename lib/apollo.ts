import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const client = new ApolloClient({
  uri:
    process.env.NEXT_BACKEND_ENDPOINT ||
    "https://fullstack-form-assignment.herokuapp.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          links: relayStylePagination(),
        },
      },
    },
  }),
});
