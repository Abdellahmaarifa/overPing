import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div>
    <h1>Layout of all pages</h1>
    {<Outlet />}
  </div>
);

export default Layout;
