import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { User } from "types/User.type";
import { setToken } from "../state/token";

type Props = {
  children: React.ReactNode;
};

type Context = {
  signIn: (user: User) => void;
  signOut: () => void;
  restoreUser: (callbakc: () => void) => void;
  user: User | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  restoreUser: () => {},
  user: null,
});

const UserContextProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const signIn = useCallback((user: User) => {
    setToken(user.token);

    setUser(user);
  }, []);

  const restoreUser = async (callback: () => void) => {
    // we should sen a request to /refresh_token and then update the user with the new token.
    try {
      const data = await fetch("http://localhost:9000/refresh_token", {
        credentials: "include",
        method: "POST",
      });
      const res = await data.json();
      console.log("new token : ", res.accessToken);
      setToken(res?.accessToken);
      if (res?.accessToken) setUser({ token: res?.accessToken });
      callback();
    } catch (err) {
      console.log(err);
    }
  };

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      restoreUser,
      user,
    }),
    [signIn, signOut, restoreUser, user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export default UserContextProvider;
