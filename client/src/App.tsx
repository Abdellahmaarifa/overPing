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
import tw from "twin.macro";
// THIS IS SIMPLE EXAMPLE OF PROTECTED ROUTE
const ProtectedRoutes = ({ user }: { user: User | null }) => {
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: useLocation() }} replace />
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { restoreUser, user } = useUserContext();
  useEffect(() => {
    if (!user && isLoading) {
      restoreUser(() => setIsLoading(false));
    }
  }, []);
  return isLoading ? (
    <div tw="w-screen h-screen bg-[#0F1A24]"></div>
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
