import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Message from "../Message/Message";
import {
  ChatBodyContainer,
  ChatMessages,
  SendMessageFeild,
  SendMessageInput,
} from "./ChatBody.style";
import ChatBanner from "../ChatBanner/ChatBanner";
const ChatBody = () => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
  } = useChatContext();
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showFriends: [showFriends, setShowFriends],
  } = useChatContext();

  return (
    <ChatBodyContainer
      onClick={() => {
        setShowChatMenu(false);
        setShowChatAbout(false);
        setShowFriends(false);
      }}
    >
      <ChatBanner />
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
