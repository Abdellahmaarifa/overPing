import { ApolloProvider } from "@apollo/client";
import LoginContextProvider from "context/login.context";
import UserContextProvider from "context/user.context";
import { SkeletonTheme } from "react-loading-skeleton";
import GlobalStyles from "./styles/GlobalStyles";
import Router from "./routes/Router";
import { observer } from "mobx-react-lite";
import { Store } from "domain/DomainLayer";

const App = observer(({ store }: { store: Store }) => {
  return (
    <ApolloProvider client={store.client}>
      <GlobalStyles />
      <UserContextProvider store={store}>
        <LoginContextProvider>
          <SkeletonTheme baseColor="#3a3a3a1f" highlightColor="#0f1a24a2">
            <Router />
          </SkeletonTheme>
        </LoginContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  );
});

export default App;
