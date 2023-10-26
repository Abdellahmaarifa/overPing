import LandingPage from "pages/LandingPage/LandingPage";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Layout from "components/common/Layout/Layout";
import Chat from "pages/Chat/Chat";
import Error from "pages/Error/Error";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import { useUserContext } from "context/user.context";
import { User } from "types/User.type";

import LoginContextProvider from "context/login.context";
// THIS IS SIMPLE EXAMPLE OF PROTECTED ROUTE
const ProtectedRoutes = ({ user }: { user: User | null }) => {
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: useLocation() }} replace />
  );
};

const App: React.FC = () => {
  // REALLY BAD EXAMPLE OF MIMCING AUTH, BUT IT WILL DO FOR NOW!
  const [loading, setLoading] = useState(true);
  const { restoreUser, user } = useUserContext();
  console.log("render app...");
  useEffect(() => {
    if (!user) restoreUser();
    setLoading(false);
    console.log("this should call one");
    if (user) setLoading(false);
  }, []);
  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={user && <Layout />}>
            <Route path="/" element={user ? <Home /> : <LandingPage />} />
            <Route element={<ProtectedRoutes user={user} />}>
              <Route path="chat" element={<Chat />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
