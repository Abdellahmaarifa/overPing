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
  useMatchWaitingListSubscription,
  useNotificationSubscription,
} from "gql/index";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import tw from "twin.macro";
import Button from "../Button/Button";
import ConfirmModel from "../ConfirmModel/ConfirmModel";
import Settings from "../Settings/Settings";

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

const NotificationComponent = ({ acceptHandler, cancelHandler }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <h2>some one want to play with you!</h2>
      <Button $text="accept" onClick={() => acceptHandler()} />
      <Button $text="cancel" onClick={() => cancelHandler()} />
    </div>
  );
};

const Layout = () => {
  const LayoutContextProvider = useLayoutContextProvider();
  const SettingsContextProvider = useSettingsContextProvider();
  const ChatContextProvider = useChatContextProvider();
  const { user, profile, updateUser } = useUserContext();
  const navigate = useNavigate();
  const { data, loading, error } = useNotificationSubscription({
    variables: { userId: Number(user?.id) },
  });
  const { data: dataM } = useMatchWaitingListSubscription({
    variables: { userId: Number(user?.id) },
  });
  const [acceptMatchRequest] = useAcceptMatchToPlayMutation();

  const acceptHandler = (data, t) => async () => {
    console.log("going to accept invitaion!");
    const res = await acceptMatchRequest({
      variables: {
        AcceptRequestInput: {
          matchType: "classic",
          senderId: Number(data.notification.playerId),
        },
      },
    });
    console.log("after accepting the notification:", res);
    if (res.data?.acceptMatchToPlay) {
      // accept the invitation
      console.log("this is what in the notification ");
      //navigate(`/game?id=${data.notification.playerId}`);
      toast.dismiss(t.id);
    }
  };

  useEffect(() => {
    console.log("I got new Data and i should notify the user!!");
    if (data) {
      toast(
        (t) => (
          <NotificationComponent
            acceptHandler={acceptHandler(data, t)}
            cancelHandler={() => toast.dismiss(t.id)}
          />
        ),
        {
          duration: Infinity,
          style: {
            width: "850px",
          },
        }
      );
      //navigate("/game");
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataM) {
      navigate(
        `/game?user1=${dataM.matchWaitingList.user1?.id}&user2=${dataM.matchWaitingList.user2?.id}&type="classic"`
      );
    }
  }, [dataM]);

  console.log("data in sub :", data, dataM);
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
