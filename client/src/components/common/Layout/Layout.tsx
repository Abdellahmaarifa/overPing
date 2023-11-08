import LeftNavBar from "components/common/LeftNavBar/LeftNavBar";
import TopNavBar from "components/common/TopNavBar/TopNavBar";

import useLayoutContextProvider, {
  useLayoutContext,
} from "context/layout.context";
import { Outlet } from "react-router-dom";

import tw from "twin.macro";
import Setting from "../Settings/Settings";
const temp = tw.a``;

const LayoutOutlet = () => {
  const {
    userMenuState: [_openUserMenu, setOpenUserMenu],
    mobileMenuState: [_openMobileMenu, setOpenMobileMenu],
  } = useLayoutContext();
  return (
    <div
      tw="w-full p-[15px] pt-[75px] md:ml-[72px]"
      onClick={() => {
        setOpenUserMenu(false);
        setOpenMobileMenu(false);
      }}
    >
      {<Outlet />}
    </div>
  );
};

const Layout = () => {
  const LayoutContextProvider = useLayoutContextProvider();
  return (
    <div tw="w-full h-full min-h-screen flex justify-center items-start bg-[#0F1A24] overflow-hidden">
      <LayoutContextProvider>
        <TopNavBar />
        <LeftNavBar />
        <LayoutOutlet />
        <Setting />
      </LayoutContextProvider>
    </div>
  );
};

export default Layout;
