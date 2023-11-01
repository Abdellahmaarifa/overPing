import TopNavBar from "components/common/TopNavBar/TopNavBar";
import LeftNavBar from "components/common/LeftNavBar/LeftNavBar";

import { Outlet } from "react-router-dom";
import tw from "twin.macro";
import { UserQuery, useUserQuery } from "../../../graphql";
import { useUserContext } from "context/user.context";
const Layout = () => {
  return (
    <div tw="w-full h-full min-h-screen flex justify-center items-start bg-[#0F1A24] overflow-hidden">
      <TopNavBar />
      <LeftNavBar />
      {<Outlet />}
    </div>
  );
};

export default Layout;
