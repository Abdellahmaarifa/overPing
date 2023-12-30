import LeftNavBar from "components/common/LeftNavBar/LeftNavBar";
import TopNavBar from "components/common/TopNavBar/TopNavBar";

import useLayoutContextProvider, {
  useLayoutContext,
} from "context/layout.context";
import { Outlet } from "react-router-dom";

import useChatContextProvider, { useChatContext } from "context/chat.context";
import useSettingsContextProvider from "context/settings.context";
import tw from "twin.macro";
import Settings from "../Settings/Settings";
import ConfirmModel from "../ConfirmModel/ConfirmModel";
import './layout.css' //added by tariq elbouhali
const temp = tw.a``;

const LayoutOutlet = () => {
  const {
    userMenuState: [_openUserMenu, setOpenUserMenu],
    mobileMenuState: [_openMobileMenu, setOpenMobileMenu],
  } = useLayoutContext();
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
    showChannelMenu: [showChannelMenu, setShowChannelMenu],
  } = useChatContext();
  return (
    <div id='layout'
      tw="w-full min-h-screen h-screen max-h-fit p-0 overflow-scroll pt-[65px] md:ml-[72px] flex justify-center "
      onClick={() => {
        setOpenUserMenu(false);
        setOpenMobileMenu(false);
        setShowChannelMenu(false);
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
            {false && (
              <ConfirmModel
                header="are you sure?"
                rejectText="No"
                resolveText="yes"
                confirm={true}
              />
            )}
          </ChatContextProvider>
        </SettingsContextProvider>
      </LayoutContextProvider>
    </div>
  );
};

export default Layout;
