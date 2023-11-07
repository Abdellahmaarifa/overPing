import {
  ApolloProvider,
  getApolloContext,
  ApolloContextValue,
} from "@apollo/client";
import LoginContextProvider from "context/login.context";
import UserContextProvider from "context/user.context";
import React, { useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { client } from "./apolloConfig";
import GlobalStyles from "./styles/GlobalStyles";
const container = document.getElementById("root");
const root = createRoot(container!);
import { SkeletonTheme } from "react-loading-skeleton";
root.render(
  <ApolloProvider client={client}>
    {/* THIS WILL RERENDER THE COMPONENTS ONE MORE TIMES! */}
    <GlobalStyles />
    <UserContextProvider>
      <LoginContextProvider>
        <SkeletonTheme baseColor="#3a3a3a1f" highlightColor="#0f1a24a2">
          <App />
        </SkeletonTheme>
      </LoginContextProvider>
    </UserContextProvider>
  </ApolloProvider>
);
