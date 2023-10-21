import { ApolloProvider } from "@apollo/client";
import UserContextProvider from "context/user.context";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { client } from "./apolloConfig";
import GlobalStyles from "./styles/GlobalStyles";

import worker from "./mock/server";
const container = document.getElementById("root");
const root = createRoot(container!);
worker.start();
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <GlobalStyles />
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </React.StrictMode>
  </ApolloProvider>
);
