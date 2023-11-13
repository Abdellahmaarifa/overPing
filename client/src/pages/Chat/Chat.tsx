import { ChatConatiner } from "./Chat.style";

import ChatRightSide from "components/chatPage/CharRightSide/ChatRightSide";
import ChatBody from "components/chatPage/ChatBody/ChatBody";
import ChatLeftSide from "components/chatPage/ChatLeftSide/ChatLeftSide";
import ChatSearch from "components/chatPage/ChatSearch/ChatSearch";
import useChatContextProvider, { useChatContext } from "context/chat.context";

const Chat = () => {
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
  } = useChatContext();
  return (
    <ChatConatiner>
      <ChatLeftSide />
      <ChatBody />
      <ChatRightSide />
      {showSearchModel && <ChatSearch />}
    </ChatConatiner>
  );
};

export default Chat;
