import { ApolloClient, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

export const client = new ApolloClient({
  uri: process.env.BACKEND_ENDPOINT || "http://localhost:1337/graphql",
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
