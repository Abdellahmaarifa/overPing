import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  NormalizedCacheObject,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { SERVER_END_POINT } from "constant/constants";
import { createClient } from "graphql-ws";

// Log any GraphQL errors or network error that occurred
const errorLink = onError((err) => {
  //console.log("catch err in apollo: ", err);
  // const { graphQLErrors, networkError } = err;
  // if (graphQLErrors)
  //   graphQLErrors.forEach(({ message, locations, path }) =>
  //     console.log(
  //       `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
  //     )
  //   );
  // if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const httpLink = createUploadLink({
  uri: SERVER_END_POINT,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://10.14.55.249:5500/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const authLink = (token: string | null) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        "Content-Type": "application/json",
        "x-apollo-operation-name": "something",
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  })
    .concat(errorLink)
    .concat(splitLink);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};
export const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });
  return client;
};
