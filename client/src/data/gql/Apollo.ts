import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "../../../node_modules/apollo-upload-client/createUploadLink.mjs";

export const httpLink = createUploadLink({
  uri: import.meta.env.OVER_PING_GRAPHQL_API_URL,
  credentials: "include",
});

export const authLink = (token: string | null) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }).concat(httpLink);

export const initApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
  });
  return client;
};
