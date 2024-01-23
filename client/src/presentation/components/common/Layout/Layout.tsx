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
  FindProfileByUserIdDocument,
  useAcceptMatchToPlayMutation,
  useFindProfileByUserIdQuery,
  useMatchWaitingListSubscription,
  useMatchWaitingDircSubscription,
  useNotificationSubscription,
  UserDocument,
  AccountDocument,
} from "gql/index";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import tw from "twin.macro";
import Button from "../Button/Button";
import ConfirmModel from "../ConfirmModel/ConfirmModel";
import Settings from "../Settings/Settings";
import './Layout.css'

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
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const client = useApolloClient();
  const { data, loading, error } = useNotificationSubscription({
    variables: { userId: Number(user?.id) },
  });
  const { data: dataM } = useMatchWaitingDircSubscription({
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
   // console.log("I got new Data and i should notify the user!!");
    if (data) {
      toast(
        (t) => (
          <NotificationComponent
            acceptHandler={acceptHandler(data, t)}
            cancelHandler={() => toast.dismiss(t.id)}
          />
        ),
        {
          duration: 3000,
          style: {
            width: "850px",
          },
        }
      );

      client
        .query({
          query: AccountDocument,
          variables: {
            userId: Number(data.notification.playerId),
          },
        })
        .then((res) => {
          console.log("**for user id :", data.notification.playerId, res.data);
          const newNotifications = [...notifications];
          const newNoti: Notification = {
            name: res.data.findUserById.username,
            userId: data.notification.playerId,
            image: res.data.findUserById.profileImgUrl,
            matchType: data.notification.matchType,
          };
          newNotifications.push(newNoti);
          if (
            notifications.find(
              (e) => e.userId === data.notification.playerId
            ) === undefined
          )
            setNotifications(newNotifications);
        })
        .catch((error) => {
          console.log({ error });
        });

      //navigate("/game");
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataM ) {
      //console.log("this i sit: ", dataM)
      navigate(
        `/game?type="friend"&user1=${dataM.matchWaitingDirc.user1?.id}&user2=${dataM.matchWaitingDirc.user2?.id}&game-type="classic"&key=${dataM.matchWaitingDirc.matchKey}`
      );
    }
  }, [dataM]);

  //console.log("data in sub :", data, dataM);
  return (
    <div tw="w-full h-full min-h-screen flex justify-center items-start bg-[#0F1A24] overflow-hidden">
      <LayoutContextProvider>
        <SettingsContextProvider>
          <ChatContextProvider>
            <TopNavBar data={notifications} />
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
