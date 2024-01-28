import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Store } from "domain/DomainLayer";
import { ProfileType } from "domain/model/Profile.type";
import { User } from "domain/model/User.type";
import { GetUserProfile } from "helpers/index";
import { SERVER_END_POINT, SERVER_REFRESH_END_POINT } from "constant/constants";
import { GET_USER_QUERY, PROFILE_QUERY } from "gql/constantsQueries";

type Props = {
  children: React.ReactNode;
  store: Store;
};

export type Context = {
  signIn: (user: User) => void;
  signOut: () => void;
  restoreUser: (callback?: () => void) => void;
  user: User | null;
  updateUser: (user: User) => void;
  profile: ProfileType | null;
  updateProfile: (profile: ProfileType) => void;
  store: Store | null;
};

const UserContext = createContext<Context>({
  signIn: () => {},
  signOut: () => {},
  restoreUser: () => {},
  user: null,
  updateUser: (user: User) => {},
  profile: null,
  updateProfile: (profile: ProfileType) => {},
  store: null,
});

const UserContextProvider = ({ children, store }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const signOut = useCallback(() => {
    //store.setToken(null);
    setUser(null);
    //localStorage.removeItem("user");
  }, []);

  const signIn = useCallback((user: User) => {
    //store.setToken(user.token);
    //setUser(user);
    //
    //localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const restoreUser = async (callback?: () => void) => {
    // const user = localStorage.getItem("user")
    //   ? JSON.parse(localStorage.getItem("user")!)
    //   : null;
    // if (!user) return ;
    // we should sen a request to /refresh_token and then update the user with the new token.
    try {
      // console.log("the usrl of refersh: " ,import.meta.env.OVER_PING_REFRECH_TOKEN)
      // console.log("user refresh ", SERVER_REFRESH_END_POINT);
      //if (user) return;
      console.log(SERVER_REFRESH_END_POINT);
      const data = await fetch(SERVER_REFRESH_END_POINT, {
        credentials: "include",
        method: "GET",
      });
      console.log("DATA FROM SERVER: ", data);
      const res = await data?.json();
      // console.log("the res: ", res);
      store.setToken(res?.Access_token);
      if (res?.Access_token) {
        // update the status of the user every 2 seconds
        window.dispatchEvent(new Event("alive"));
      }
      // get the user :

      const userData = await fetch(SERVER_END_POINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apollo-operation-name": "something",
          // Add any other headers if needed
        },
        body: JSON.stringify({ query: GET_USER_QUERY }),
        credentials: "include",
      });
      const userRes = await userData.json();

      //console.log("from user context: ", userRes?.data?.getUser);
      setUser(userRes?.data?.getUser);

      // set the profile
      if (!profile && userRes?.data?.getUser?.id) {
        console.log("SERVER: ", SERVER_END_POINT);
        const profileData = await fetch(SERVER_END_POINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-apollo-operation-name": "something",
            // Add any other headers if needed
          },
          body: JSON.stringify({
            query: PROFILE_QUERY,
            variables: {
              userId: Number(userRes?.data?.getUser.id),
            },
          }),
          credentials: "include",
        });
        console.log("RES SERVER: ", SERVER_END_POINT);
        const profileRes = await profileData.json();
        // console.log(
        //   "resualt of the query: ",
        //   profileRes.data,
        //   GetUserProfile(profileRes.data)
        // );
        setProfile(GetUserProfile(profileRes.data));
        //console.log("profile after done: ", profile);
      }
      //setUser(user);
      //if (res?.accessToken) setUser({ token: res?.accessToken, ...user });
      callback && callback();
    } catch (err) {
      console.log("the error of networking : ", err);
      callback && callback();
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  const updateProfile = (profile: ProfileType) => {
    setProfile(profile);
  };
  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      restoreUser,
      user,
      updateUser,
      profile,
      updateProfile,
      store,
    }),
    [
      signIn,
      signOut,
      restoreUser,
      user,
      updateUser,
      profile,
      updateProfile,
      store,
    ]
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
