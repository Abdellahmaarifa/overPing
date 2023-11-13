import ChatMobIcon from "assets/common/chat-mob.svg?react";
import DotsIcon from "assets/common/dots.svg?react";
import FreindsIcon from "assets/common/friends-icon.svg?react";
import SideIcon from "assets/common/side-icon.svg?react";
import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { MouseEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Message from "../Message/Message";
import {
  ChatBanner,
  ChatBannerIcon,
  ChatBannerLeft,
  ChatBannerRight,
  ChatBodyContainer,
  ChatMessages,
  SendMessageFeild,
  SendMessageInput,
} from "./ChatBody.style";
const ChatBody = () => {
  const [isChannel, setIsChannel] = useState(false);

  const { mobileMenuState } = useLayoutContext();
  const [mobileMenu, setMobileMenu] = mobileMenuState;
  const location = useLocation();
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
  } = useChatContext();
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showFriends: [showFriends, setShowFriends],
  } = useChatContext();
  useEffect(() => {
    if (location.pathname.includes("channel")) setIsChannel(true);
  }, []);

  return (
    <ChatBodyContainer
      onClick={() => {
        setShowChatMenu(false);
        setShowChatAbout(false);
        setShowFriends(false);
      }}
    >
      <ChatBanner>
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
              <DotsIcon />
            </ChatBannerIcon>
          )}
        </ChatBannerRight>
      </ChatBanner>
      <ChatMessages>
        <Message />
      </ChatMessages>
      <SendMessageFeild>
        <SendMessageInput placeholder="Message" />
      </SendMessageFeild>
    </ChatBodyContainer>
  );
};

export default ChatBody;
