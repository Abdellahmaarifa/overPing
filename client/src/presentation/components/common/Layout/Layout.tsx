import LeftNavBar from "components/common/LeftNavBar/LeftNavBar";
import TopNavBar from "components/common/TopNavBar/TopNavBar";

import useLayoutContextProvider, {
  useLayoutContext,
} from "context/layout.context";
import { Outlet, useNavigate } from "react-router-dom";

import useChatContextProvider, { useChatContext } from "context/chat.context";
import useSettingsContextProvider from "context/settings.context";
import { useUserContext } from "context/user.context";
import {
  useAcceptMatchToPlayMutation,
  useMatchWaitingDircSubscription,
  useNotificationSubscription,
  AccountDocument,
} from "gql/index";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import tw from "twin.macro";
import Button from "../Button/Button";
import ConfirmModel from "../ConfirmModel/ConfirmModel";
import Settings from "../Settings/Settings";
import "./Layout.css";

import { useApolloClient } from "@apollo/client";
import { Notification } from "domain/model/notification";
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
    <div
      id="layout"
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
 
  //console.log("data in sub :", data, dataM);
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

      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
