import ChannelModel from "components/chatPage/ChannelModel/ChannelModel";
import { ChatConatiner } from "./Chat.style";
import ChatRightSide from "components/chatPage/CharRightSide/ChatRightSide";
import ChatBody from "components/chatPage/ChatBody/ChatBody";
import ChatLeftSide from "components/chatPage/ChatLeftSide/ChatLeftSide";
import ChatSearch from "components/chatPage/ChatSearch/ChatSearch";
import { useChatContext } from "context/chat.context";
import EditChannelModel from "components/chatPage/EditChannelModel /EditChannelModel";
import { useUserContext } from "context/user.context";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { ChatViewModel } from "./ChatViewModel";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import { CHANNEL_CMD, socket } from "constant/constants";

const Chat = ({ type }: { type: "none" | "dm" | "channel" }) => {
  // call of hooks
  const { id } = useParams();
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
  } = ChatCtx;

  useEffect(() => {
    // GET ALL THE CHANNELS AND THE DMS AT ONCE!
    // socket.on("connect******************************", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    socket.on("disconnect*********************", () => {
      console.log(socket.id); // undefined
    });
    socket.emit(
      "get_channel_messages",
      {
        userId: Number(user?.id),
        channelId: Number(id),
        page: 1,
      },
      (data) => {
        console.log("This ************* ", data);
      }
    );
    // return () => {
    //   socket.disconnect();
    // };
    viewModel.initChat();
  }, []);

  return (
    <ChatConatiner>
      <ChatLeftSide />
      <ChatBody />
      <ChatRightSide type={type} />
      {showSearchModel && <ChatSearch />}
      {showChannelModel && <ChannelModel />}
      {showEditChannelModel && <EditChannelModel />}
      <Toaster position="top-center" />
    </ChatConatiner>
  );
};

export default Chat;
