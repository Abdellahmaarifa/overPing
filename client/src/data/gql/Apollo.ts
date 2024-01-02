import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { onError } from "@apollo/client/link/error";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const httpLink = createUploadLink({
  uri: import.meta.env.OVER_PING_GRAPHQL_API_URL,
  credentials: "include",
});

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
    .concat(httpLink);

export const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });
  return client;
};
