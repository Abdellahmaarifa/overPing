import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import { Store } from "domain/DomainLayer";
import { User } from "types/User.type";
type Props = {
  children: React.ReactNode;
  store: Store;
};

export type Context = {
  signIn: (user: User) => void;
  signOut: () => void;
  restoreUser: (callback?: () => void) => void;
  user: User | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  restoreUser: () => {},
  user: null,
});

const UserContextProvider = ({ children, store }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = useCallback(() => {
    //store.setToken(null);
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const signIn = useCallback((user: User) => {
    //store.setToken(user.token);
    //setUser(user);
    // 
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const restoreUser = async (callback?: () => void) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null;
    // if (!user) return ;
    // we should sen a request to /refresh_token and then update the user with the new token.
    try {
      // console.log("the usrl of refersh: " ,import.meta.env.OVER_PING_REFRECH_TOKEN)
      const refresh_url : string = import.meta.env.OVER_PING_REFRECH_TOKEN ;
      console.log("user refresh ", refresh_url);
      //if (user) return;
      const data = await fetch(refresh_url, {
        
        credentials: "include",
        method: "GET",
      });
      const res = await data.json();
      console.log("the res: " , res);
      store.setToken(res?.accessToken);
      setUser(user);
      //if (res?.accessToken) setUser({ token: res?.accessToken, ...user });
      callback && callback();
    } catch (err) {
      console.log("the error of networking : ",err);
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

export type useUserContextType = () => Context;

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export default UserContextProvider;
