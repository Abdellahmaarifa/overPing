import LeftNavBar from "components/common/LeftNavBar/LeftNavBar";
import TopNavBar from "components/common/TopNavBar/TopNavBar";

import useLayoutContextProvider, {
  useLayoutContext,
} from "context/layout.context";
import { Outlet } from "react-router-dom";

import useChatContextProvider from "context/chat.context";
import useSettingsContextProvider from "context/settings.context";
import tw from "twin.macro";
import Settings from "../Settings/Settings";
const temp = tw.a``;

const LayoutOutlet = () => {
  const {
    userMenuState: [_openUserMenu, setOpenUserMenu],
    mobileMenuState: [_openMobileMenu, setOpenMobileMenu],
  } = useLayoutContext();
  return (
    <div
      tw="w-full min-h-screen h-screen max-h-fit p-0 overflow-scroll pt-[65px] md:ml-[72px] flex justify-center "
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
  const SettingsContextProvider = useSettingsContextProvider();
  const ChatContextProvider = useChatContextProvider();
  return (
    <div tw="w-full h-full min-h-screen flex justify-center items-start bg-[#0F1A24] overflow-hidden">
      <LayoutContextProvider>
        <SettingsContextProvider>
          <ChatContextProvider>
            <TopNavBar />
            <LeftNavBar />
            <LayoutOutlet />
            <Settings />
          </ChatContextProvider>
        </SettingsContextProvider>
      </LayoutContextProvider>
    </div>
  );
};

export default Layout;
