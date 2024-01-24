import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import tw from "twin.macro";
import BellIcon from "assets/common/bell.svg?react";
import DownArrowIcon from "assets/common/downArrow.svg?react";
import EyeIcon from "assets/common/eye.svg?react";
import Logo from "assets/common/logo.svg?react";
import LogoutIcon from "assets/common/logout.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";
import {
  LogoContainer,
  MobileMenuIcon,
  MobileMenuIconElm,
  TopNavBarContainer,
  UserBox,
  UserBoxConatiner,
  UserBoxMenu,
  UserBoxMenuItem,
  UserBoxMenuItemText,
  UserBoxSeparator,
  UserImage,
  UserInfo,
  UserInfoIcon,
  UserInfoName,
  UserInfoNameConatiner,
  UserInfoStatus,
  UserInfoStatusConatiner,
  UserInfoStatusIcon,
} from "./TopNavBar.style";
import ViewModel from "./TopNavBarViewModel";
import { useLayoutContext } from "context/layout.context";
import { useSettingsContext } from "context/settings.context";
import { useChatContext } from "context/chat.context";
import Button from "../Button/Button";
import { Notification } from "domain/model/notification";
import { AccountDocument, useAcceptMatchToPlayMutation, useMatchWaitingDircSubscription, useNotificationSubscription } from "gql/index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const NavLink = tw.div`flex justify-center items-center h-[24px] md:w-[48px] md:h-[48px]`;

const NotificationSimple = ({
  image,
  name,
  id,
}: {
  id: number;
  image: string;
  name: string;
}) => {
  const [acceptMatchRequest] = useAcceptMatchToPlayMutation();

  const acceptHandler = async () => {
    const res = await acceptMatchRequest({
      variables: {
        AcceptRequestInput: {
          matchType: "classic",
          senderId: Number(id),
        },
      },
    });
  };

  return (
    <div tw="p-[10px] flex justify-center items-start  bg-[#152A3D] rounded-[5px] w-full h-fit flex-col">
      <div tw="flex items-start justify-center gap-[10px]">
        <div
          tw="h-[40px] w-[40px]  rounded-[2px]"
          style={{
            background: `center/cover url(${image})`,
          }}
        ></div>
        <h1>{name} Invites you to a game</h1>
      </div>
      <div tw="flex justify-end items-center  w-full gap-[10px]">
        <Button $text="accept" onClick={() => acceptHandler()} />
        <Button $text="cancel" />
      </div>
    </div>
  );
};
const NotificationList = ({
  active,
  data,
}: {
  active: boolean;
  data: Notification[];
}) => {
  console.log("from notification ", data);

  return (
    <div
      tw="w-[310px]  flex-col gap-[10px] p-[10px] h-[600px] overflow-scroll  bg-[rgb(195 196 217 / 0.9)] top-[80px] right-[15px] absolute rounded-[5px]"
      style={{ display: active ? "flex" : "none" }}
    >
      {data.map((e) => {
        return (
          <NotificationSimple image={e.image} name={e.name} id={e.userId} />
        );
      })}
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

const TopNavBar = () => {
  const { userMenuState, mobileMenuState } = useLayoutContext();
  const [openMobileMenu, setOpenMobileMenu] = mobileMenuState;
  const [openSettings, setOpenSettings] = userMenuState;
  const [_cookie, setCookie, removeCookie] = useCookies();
  const viewModel = new ViewModel();
  const [showNotification, setShowNotification] = useState(false);
  //const { data, loading, error } = viewModel.userQuery;
  //console.log("this data: ",data?.findUserById);
  //const user = data?.findUserById;
  //console.log("user: ", user);
  const {
    settingsModel: [_settingsModel, setSettingsModel],
  } = useSettingsContext();
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showChatAbout: [showChatAbout, setShowChatAbout],
    showFriends: [showFriends, setShowFriends],
    showChannelMenu: [showChannelMenu, setShowChannelMenu],
  } = useChatContext();
  const { user, profile, updateUser } = viewModel.userContext;
  //console.log("this is the profiel from top menu: ", profile);

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
    if (dataM) {
      console.log("this i sit: ", dataM);
      navigate(
        `/game?type="friend"&user1=${dataM.matchWaitingDirc.user1?.id}&user2=${dataM.matchWaitingDirc.user2?.id}&game-type="classic"&key=${dataM.matchWaitingDirc.matchKey}`
      );
    }
  }, [dataM]);


  //if (error) console.log(error);
  return (
    <TopNavBarContainer
      onClick={() => {
        setOpenSettings(false);
        setShowChatMenu(false);
        setShowChatAbout(false);
        setShowFriends(false);
        setShowChannelMenu(false);
      }}
    >
      {/* Logo */}
      <LogoContainer>
        <Logo />
      </LogoContainer>
      {/* USER STATUS CONATINER*/}
      <UserBoxConatiner>
        <NavLink style={{ position: "relative" }}>
          <BellIcon
            onClick={() => setShowNotification(!showNotification)}
            tw="cursor-pointer"
          />

          {notifications.length != 0 && (
            <div tw="w-[15px] h-[15px] bg-red-500 absolute  top-[8px] left-[8px] rounded-[10px] flex justify-center items-center">
              <span tw="font-inter font-bold text-[10px]">{notifications.length}</span>
            </div>
          )}
        </NavLink>
        {/* MOBILE MENU  */}
        <MobileMenuIcon
          onClick={() => {
            setOpenMobileMenu(!openMobileMenu);
          }}
        >
          <MobileMenuIconElm $elm="1" open={openMobileMenu} />
          <MobileMenuIconElm $elm="2" open={openMobileMenu} />
          <MobileMenuIconElm $elm="3" open={openMobileMenu} />
          <MobileMenuIconElm $elm="4" open={openMobileMenu} />
        </MobileMenuIcon>
        <UserBoxSeparator></UserBoxSeparator>
        {/* USER STATUS BOX */}
        <UserBox
          onClick={(e) => {
            setOpenSettings(!openSettings);
            e.stopPropagation();
            console.log(e);
          }}
        >
          <UserImage
            style={{
              background: `url(${profile?.avatar}) center center no-repeat`,
              backgroundSize: "cover",
            }}
          >
            {/*<img src={profile?.avatar} alt="" tw="w-full h-full" />*/}
          </UserImage>
          <UserInfo>
            <UserInfoNameConatiner>
              <UserInfoName>{profile?.nickname?.slice(0, 10)}</UserInfoName>
              <UserInfoIcon>
                <DownArrowIcon />
              </UserInfoIcon>
            </UserInfoNameConatiner>
            <UserInfoStatusConatiner>
              {
                <>
                  <UserInfoStatusIcon></UserInfoStatusIcon>
                  <UserInfoStatus>Online</UserInfoStatus>
                </>
              }
            </UserInfoStatusConatiner>
          </UserInfo>
          {/* USER STATUS MENU */}
          <UserBoxMenu
            style={openSettings ? { display: "flex" } : { display: "none" }}
          >
            <UserBoxMenuItem onClick={viewModel.showProfile}>
              <UserBoxMenuItemText>View My Profile</UserBoxMenuItemText>
              <EyeIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem
              onClick={() => {
                setSettingsModel(true);
              }}
            >
              <UserBoxMenuItemText>Settings</UserBoxMenuItemText>
              <SettingsIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem onClick={viewModel.logout}>
              <UserBoxMenuItemText style={{ color: "#8E3928" }}>
                Logout
              </UserBoxMenuItemText>
              <LogoutIcon style={{ fill: "#8E3928" }} />
            </UserBoxMenuItem>
          </UserBoxMenu>
        </UserBox>
      </UserBoxConatiner>
      <NotificationList active={showNotification} data={notifications} />
    </TopNavBarContainer>
  );
};
export default TopNavBar;
