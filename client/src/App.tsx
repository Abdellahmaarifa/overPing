import LandingPage from "pages/LandingPage/LandingPage";
import React, { useState } from "react";
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

// THIS IS SIMPLE EXAMPLE OF PROTECTED ROUTE
const ProtectedRoutes = ({ logIn }: { logIn: Boolean }) => {
  return logIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: useLocation() }} replace />
  );
};

const App: React.FC = () => {
  // REALLY BAD EXAMPLE OF MIMCING AUTH, BUT IT WILL DO FOR NOW!
  const [logIn, setLogIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={logIn && <Layout />}>
            <Route path="/" element={logIn ? <Home /> : <LandingPage />} />
            <Route element={<ProtectedRoutes logIn={logIn} />}>
              <Route path="chat" element={<Chat />} />
            </Route>
            <Route
              path="login"
              element={<Login logIn={logIn} setLogIn={setLogIn} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
