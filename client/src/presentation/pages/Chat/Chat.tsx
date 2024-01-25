import { useApolloClient } from "@apollo/client";
import ChannelModel from "components/chatPage/ChannelModel/ChannelModel";
import ChatRightSide from "components/chatPage/CharRightSide/ChatRightSide";
import ChatBody from "components/chatPage/ChatBody/ChatBody";
import ChatLeftSide from "components/chatPage/ChatLeftSide/ChatLeftSide";
import ChatSearch from "components/chatPage/ChatSearch/ChatSearch";
import EditChannelModel from "components/chatPage/EditChannelModel /EditChannelModel";
import { CHANNEL_CMD, socket } from "constant/constants";
import { useChatContext } from "context/chat.context";
import { useUserContext } from "context/user.context";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChatConatiner } from "./Chat.style";
import { ChatViewModel } from "./ChatViewModel";
import { ChannelSample } from "domain/model/chat.type";

const Chat = ({ type }: { type: "none" | "dm" | "channel" }) => {
  // call of hooks
  const { id } = useParams();
  const location = useLocation();
  const { user } = useUserContext();
  const client = useApolloClient();
  const navigate = useNavigate();
  const ChatCtx = useChatContext();
  // init view model
  const viewModel = new ChatViewModel({
    client,
    data: { id, user, type },
    hooks: { navigate },
    state: {},
    context: ChatCtx,
  });

  // get context values
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
    showEditChannelModel: [showEditChannelModel, setShowEditChannelModel],
    channels: [channels, setChannels],
    currentChannel: [currentChannel, setCurrentChannel],
  } = ChatCtx;

  useEffect(() => {
    viewModel.initChat();
    socket.on(CHANNEL_CMD.recUpdatedChannelsList, (data) => {
      if (data) setChannels(data);
      //console.log("looks like the list is updated: ", data);
    });

    socket.on(CHANNEL_CMD.recUpdatedListOfMembers, (data) => {
      if (type == "channel" && data && data.channelId == Number(id)) {
        viewModel.fetchCurrentChannel();
      }
    });

    socket.on(CHANNEL_CMD.recUpdatedChannelInfo, (data) => {
      if (
        type == "channel" &&
        data &&
        data.channelId == Number(id) &&
        currentChannel
      ) {
        viewModel.fetchCurrentChannel();
      }
    });

    return () => {
      socket.off(CHANNEL_CMD.recMessageFromChannel);
      socket.off(CHANNEL_CMD.recUpdatedChannelsList);
    };
  }, [id, location.pathname]);

  useEffect(() => {
    // update the name of channel in the right list
    if (channels && currentChannel) {
      let isNameChanged = false;
      const newChannels = channels.map((e) => {
        if (e.id == currentChannel?.id) {
          if (e.name != currentChannel.name) {
            isNameChanged = true;
            e.name = currentChannel?.name;
          }
        }
        return e;
      });
      if (isNameChanged) setChannels(newChannels);
    }
  }, [currentChannel]);

  console.log("the current channel: ", currentChannel);
  return (
    <ChatConatiner>
      <ChatLeftSide />
      <ChatBody type={type} />
      {(type == "channel" || type == "dm") && <ChatRightSide type={type} />}
      {showSearchModel && <ChatSearch />}
      {showChannelModel && <ChannelModel />}
      {showEditChannelModel && <EditChannelModel />}
      <Toaster position="top-center" />
    </ChatConatiner>
  );
};

export default Chat;
