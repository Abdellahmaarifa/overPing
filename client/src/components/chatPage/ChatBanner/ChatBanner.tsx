import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { MouseEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  } = useChatContext();
  useEffect(() => {
    if (location.pathname.includes("channel")) setIsChannel(true);
  }, []);

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
              <ExtraMenuLink
                onClick={() => {
                  setShowSearchModel(true);
                }}
              >
                Add Admin
              </ExtraMenuLink>
              <ExtraMenuLink
                onClick={() => {
                  setShowSearchModel(true);
                }}
              >
                Add Member
              </ExtraMenuLink>
              <ExtraMenuLink
                onClick={() => {
                  setShowEditChannelModel(true);
                }}
              >
                Edit Channel
              </ExtraMenuLink>
              <ExtraMenuLinkDanger>Delete Channel</ExtraMenuLinkDanger>
              <ExtraMenuLinkDanger>Leave Channel</ExtraMenuLinkDanger>
            </ExtraMenu>
          </ChatBannerIcon>
        )}
      </ChatBannerRight>
    </ChatBannerContainer>
  );
};

export default ChatBanner;
