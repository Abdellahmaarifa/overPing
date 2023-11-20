import ChannelModel from "components/chatPage/ChannelModel/ChannelModel";
import { ChatConatiner } from "./Chat.style";

import ChatRightSide from "components/chatPage/CharRightSide/ChatRightSide";
import ChatBody from "components/chatPage/ChatBody/ChatBody";
import ChatLeftSide from "components/chatPage/ChatLeftSide/ChatLeftSide";
import ChatSearch from "components/chatPage/ChatSearch/ChatSearch";
import useChatContextProvider, { useChatContext } from "context/chat.context";
import EditChannelModel from "components/chatPage/EditChannelModel /EditChannelModel";

const Chat = () => {
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
  } = useChatContext();
  return (
    <ChatConatiner>
      <ChatLeftSide />
      <ChatBody />
      <ChatRightSide />
      {showSearchModel && <ChatSearch />}
      {showChannelModel && <ChannelModel />}
      {true && <EditChannelModel />}
    </ChatConatiner>
  );
};

export default Chat;
