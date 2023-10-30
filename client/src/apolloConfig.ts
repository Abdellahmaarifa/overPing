import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useUserContext } from "context/user.context";
import { getToken } from "./state/token";
import createUploadLink from "../node_modules/apollo-upload-client/createUploadLink.mjs";

const httpLink = createUploadLink({
  uri: "http://localhost:9000/graphql",
  credentials: "include",
});
const link = createUploadLink();
const authLink = setContext((_, { headers }) => {
  // get token from userContext!
  const token = getToken();
  //console.log("from apollo :", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
