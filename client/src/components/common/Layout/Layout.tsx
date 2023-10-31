import TopNavBar from "components/common/TopNavBar/TopNavBar";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";
const Layout = () => (
  <div tw="w-full h-full min-h-screen flex justify-center items-start bg-[#0F1A24] overflow-hidden">
    <TopNavBar />
    {<Outlet />}
  </div>
);

export default Layout;
