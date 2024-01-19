import Layout from "components/common/Layout/Layout";
import { ROUTE_ENDPOINTS } from "constant/RouteConstants";
import { useUserContext } from "context/user.context";
import Chat from "pages/Chat/Chat";
import Error from "pages/Error/Error";
import Friends from "pages/Friends/Friends";
import Home from "pages/Home/Home";
import LandingPage from "pages/LandingPage/LandingPage";
import LeaderBoard from "pages/LeaderBoard/LeaderBord";
import Login from "pages/Login/Login";
import Profile from "pages/Profile/Profile";
import Tournament from "pages/Tournament/Tournament";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//game
import Game from "pages/Game/Game";
import { playerOne, playerTwo } from "pages/Game/Game";
//end

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { restoreUser, user } = useUserContext();
  useEffect(() => {
    if (!user && isLoading) {
      restoreUser(() => setIsLoading(false));
    }
  }, []);

  function PublicRoute(path: string, element: React.ReactNode) {
    return (
      <Route
        path={path}
        element={user ? <Navigate to={ROUTE_ENDPOINTS.HOME} /> : element}
      />
    );
  }

  function AuthRoute(path: string, element: React.ReactNode) {
    return (
      <Route
        path={path}
        element={user ? element : <Navigate to={ROUTE_ENDPOINTS.LOGIN} />}
      />
    );
  }

  if (isLoading) return <div tw="w-screen h-screen bg-[#0F1A24]"></div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={user && <Layout />}>
          {user && <Route path={ROUTE_ENDPOINTS.HOME} element={<Home />} />}
          {AuthRoute(ROUTE_ENDPOINTS.CHAT, <Chat type="none" />)}
          {AuthRoute(ROUTE_ENDPOINTS.CHAT_DM, <Chat type="dm" />)}
          {AuthRoute(ROUTE_ENDPOINTS.CHAT_CHANNEL, <Chat type="channel" />)}
          {AuthRoute(ROUTE_ENDPOINTS.FRIENDS, <Friends />)}
          {AuthRoute(ROUTE_ENDPOINTS.LEADER_BOARD, <LeaderBoard />)}
          {AuthRoute(ROUTE_ENDPOINTS.TOURNAMENT, <Tournament />)}
          {AuthRoute(ROUTE_ENDPOINTS.PROFILE, <Profile />)}
          {AuthRoute(
            ROUTE_ENDPOINTS.GAME,
            <Game playerOne={playerOne} playerTwo={playerTwo} />
          )}
        </Route>
        {PublicRoute(ROUTE_ENDPOINTS.LOGIN, <Login />)}
        <Route path={ROUTE_ENDPOINTS.HOME} element={<LandingPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
