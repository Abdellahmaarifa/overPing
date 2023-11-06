import LeftNavBar from "components/common/LeftNavBar/LeftNavBar";
import TopNavBar from "components/common/TopNavBar/TopNavBar";

import useLayoutContextProvider, {
  useLayoutContext,
} from "context/layout.context";
import { Outlet } from "react-router-dom";

import tw from "twin.macro";
const temp = tw.a``;
const LayoutOutlet = () => {
  const {
    userMenuState: [_openUserMenu, setOpenUserMenu],
    mobileMenuState: [_openMobileMenu, setOpenMobileMenu],
  } = useLayoutContext();
  return (
    <div
      tw="w-full "
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
      </LayoutContextProvider>
    </div>
  );
};

export default Layout;
