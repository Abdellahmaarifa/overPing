import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { MouseEvent, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

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
import { FindChanneMemebersDocument } from "gql";
import { ChatSearchInput } from "../ChatSearch/ChatSearch.style";
const ChatBanner = () => {
  const [isChannel, setIsChannel] = useState(false);
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

  const client = useApolloClient();
  const { user } = useUserContext();
  const { id } = useParams();
  const [role, setRole] = useState<"owner" | "admin" | "member">("member");
  const setUserRole = async () => {
    const res = await client.query({
      query: FindChanneMemebersDocument,
      variables: {
        userId: Number(user?.id),
        groupId: Number(id),
      },
    });
    const result = res.data.findChannelById;
    console.log("res mem : ", result);
    if (result.admins.find((e) => e.id == user?.id)) setRole("admin");
    if (result.owner_id == user?.id) setRole("owner");
  };
  useEffect(() => {
    if (location.pathname.includes("channel")) setIsChannel(true);
    setUserRole();
  }, []);
  console.log("my role is : ", role);
  const addAdmin = () => () => console.log("admin here hello!");
  const addMember = () => () => console.log("admin here hello!");

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
      <ChatBannerRight>
        {isChannel && (
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
        {isChannel && (
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
                  onClick={() => {
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
                <ExtraMenuLinkDanger>Delete Channel</ExtraMenuLinkDanger>
              )}
              <ExtraMenuLinkDanger>Leave Channel</ExtraMenuLinkDanger>
            </ExtraMenu>
          </ChatBannerIcon>
        )}
      </ChatBannerRight>
    </ChatBannerContainer>
  );
};

export default ChatBanner;
