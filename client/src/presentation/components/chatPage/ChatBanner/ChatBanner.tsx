import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { MouseEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ChatMobIcon from "assets/common/chat-mob.svg?react";
import DotsIcon from "assets/common/dots.svg?react";
import FreindsIcon from "assets/common/friends-icon.svg?react";
import SideIcon from "assets/common/side-icon.svg?react";
import {
  ChatBannerContainer,
  ChatBannerIcon,
  ChatBannerLeft,
  ChatBannerRight,
  ExtraMenu,
  ExtraMenuLink,
  ExtraMenuLinkDanger,
} from "./ChatBanner.style";
import { useApolloClient } from "@apollo/client";
import { useUserContext } from "context/user.context";
import {
  AddAdminDocument,
  AddMemberDocument,
  FindChanneMemebersDocument,
  LeaveChannelDocument,
  useUnbanMemberMutation,
} from "gql/index";
import { ChatSearchInput } from "../ChatSearch/ChatSearch.style";
import toast, { Toaster } from "react-hot-toast";
import { set } from "mobx";
import Button from "components/common/Button/Button";
import tw from "twin.macro";
const ChatBanner = ({ type }: { type: string }) => {
  const { mobileMenuState } = useLayoutContext();
  const [mobileMenu, setMobileMenu] = mobileMenuState;
  const location = useLocation();
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
    showChannelMenu: [showChannelMenu, setShowChannelMenu],
  } = useChatContext();
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showFriends: [showFriends, setShowFriends],
    showSearchModel: [showSearchModel, setShowSearchModel],
    showEditChannelModel: [showEditChannelModel, setShowEditChannelModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
    includeChannelInSearch: [includeChannelInSearch, setIncludeChannelInSearch],
    userHandlerCallBack: [userHandlerCallBack, setUserHandlerCallBack],
    channelHandlerCallBack: [channelHandlerCallBack, setChannelHandlerCallBack],
  } = useChatContext();
  const [unbanUserMutation] = useUnbanMemberMutation();
  const client = useApolloClient();
  const { user } = useUserContext();
  const { id } = useParams();
  const [role, setRole] = useState<"owner" | "admin" | "member">("member");
  const [visibility, setVisibility] = useState<
    "public" | "private" | "protected"
  >("public");
  const {
    currentChannel: [currentChannel, setCurrentChannel],
  } = useChatContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      currentChannel &&
      currentChannel.admins &&
      currentChannel.admins.find((e) => e.id == user?.id)
    )
      setRole("admin");
    else if (currentChannel && currentChannel.owner_id == Number(user?.id))
      setRole("owner");
    else setRole("member");
    if (currentChannel?.visibility) setVisibility(currentChannel?.visibility);
    console.log("set ROLE", role);
  }, [currentChannel, id, location.pathname]);

  /*
  userId: Float!
channelId: Float!
password: String
muteTimeLimit: DateTime
targetId: Float!
  */
  const addAdmin = () => async (userId: string) => {
    // let password: string | null = null;
    // if (visibility === "protected") {
    //   password = prompt("please give me the passowrd");
    // }
    try {
      const data = await client.mutate({
        mutation: AddAdminDocument,
        variables: {
          data: {
            userId: Number(user?.id),
            targetId: Number(userId),
            channelId: Number(id),
          },
        },
      });
      const resault = data.data.addAdmin;
      if (!resault) throw { message: "can't add this user as an admin" };
      toast.success("admin added successfuly");
    } catch (err: any) {
      toast.error(err.message ? err.message : "something went wrong");
    }
    setShowSearchModel(false);
  };
  const unbanUser = async (userId: string) => {
    // try to unban the user:
    try {
      const res = await unbanUserMutation({
        variables: {
          data: {
            channelId: Number(id),
            userId: Number(user?.id),
            targetId: Number(userId),
          },
        },
      });
      addMember()(userId);
      toast.success("user is back to the channela gain!");
    } catch (err: any) {
      toast.error(err.message ? err.message : "something went wrong");
    }
  };
  const addMember = () => async (userId: string) => {
    try {
      const data = await client.mutate({
        mutation: AddMemberDocument,
        variables: {
          data: {
            userId: Number(user?.id),
            targetId: Number(userId),
            channelId: Number(id),
          },
        },
      });
      const resault = data.data.addMember;
      if (!resault) throw { message: "can't add this user as a member" };
      toast.success("member added successfuly");
    } catch (err: any) {
      console.log(err);
      if (err.message == "failed: You are BANNED!") {
        toast((t) => (
          <span tw="flex items-center justify-center">
            this user is banned, do u want to unban them?
            <Button
              $text="unban"
              onClick={() => {
                unbanUser(userId);
                toast.dismiss(t.id);
              }}
            />
          </span>
        ));
      } else toast.error(err.message ? err.message : "something went wrong");
    }
    setShowSearchModel(false);
  };

  const leaveChannel = async () => {
    try {
      const data = await client.mutate({
        mutation: LeaveChannelDocument,
        variables: {
          data: {
            userId: Number(user?.id),
            channelId: Number(id),
          },
        },
      });
      const resault = data.data.leaveChannel;
      if (!resault) throw { message: "You ment to stay forever!" };
      toast.success("See you again!");
      navigate("/chat");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message ? err.message : "something went wrong");
    }
  };

  const deleteChannel = async () => {
    let password: string | null = null;
    if (visibility === "protected") {
      password = prompt("please give me the passowrd");
    }
    try {
      const data = await client.mutate({
        mutation: LeaveChannelDocument,
        variables: {
          data: {
            userId: Number(user?.id),
            password,
            channelId: Number(id),
          },
        },
      });
      const resault = data.data.leaveChannel;
      if (!resault) throw { message: "This channel will stay forever LOL!" };
      toast.success("You are good at brokig things");
      navigate("/chat");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message ? err.message : "something went wrong");
    }
  };

  return (
    <ChatBannerContainer>
      <ChatBannerLeft>
        <ChatBannerIcon>
          <ChatMobIcon
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              setMobileMenu(false);
              setShowChatMenu(true);
              setShowChatAbout(false);
              setShowFriends(false);
            }}
          />
        </ChatBannerIcon>
      </ChatBannerLeft>
      {(type == "channel" || type == "dm") && (
        <ChatBannerRight>
          {currentChannel && (
            <ChatBannerIcon>
              <FreindsIcon
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  setShowFriends(true);
                  setMobileMenu(false);
                  setShowChatMenu(false);
                }}
              />
            </ChatBannerIcon>
          )}
          <ChatBannerIcon>
            <SideIcon
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setMobileMenu(false);
                setShowChatAbout(true);
                setShowChatMenu(false);
                setShowFriends(false);
              }}
            />
          </ChatBannerIcon>
          {currentChannel && (
            <ChatBannerIcon>
              <DotsIcon
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  setShowChannelMenu(!showChannelMenu);
                }}
              />
              <ExtraMenu
                style={{
                  display: showChannelMenu ? "flex" : "none",
                }}
              >
                {(role == "owner" || role == "admin") && (
                  <ExtraMenuLink
                    onClick={(e) => {
                      setIncludeChannelInSearch(false);
                      setShowSearchModel(true);
                      setUserHandlerCallBack(addAdmin);
                    }}
                  >
                    Add Admin
                  </ExtraMenuLink>
                )}
                <ExtraMenuLink
                  onClick={() => {
                    setShowSearchModel(true);
                    setIncludeChannelInSearch(false);

                    setUserHandlerCallBack(addMember);
                  }}
                >
                  Add Member
                </ExtraMenuLink>
                {(role == "owner" || role == "admin") && (
                  <ExtraMenuLink
                    onClick={() => {
                      setShowEditChannelModel(true);
                    }}
                  >
                    Edit Channel
                  </ExtraMenuLink>
                )}
                {role === "owner" && (
                  <ExtraMenuLinkDanger onClick={() => deleteChannel()}>
                    Delete Channel
                  </ExtraMenuLinkDanger>
                )}
                <ExtraMenuLinkDanger onClick={() => leaveChannel()}>
                  Leave Channel
                </ExtraMenuLinkDanger>
              </ExtraMenu>
            </ChatBannerIcon>
          )}
        </ChatBannerRight>
      )}
      <Toaster position="top-center" />
    </ChatBannerContainer>
  );
};

export default ChatBanner;
