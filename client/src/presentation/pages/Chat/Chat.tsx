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
import { useNavigate, useParams } from "react-router-dom";
import { ChatConatiner } from "./Chat.style";
import { ChatViewModel } from "./ChatViewModel";
import { ChannelSample } from "domain/model/chat.type";

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
    channels: [channels, setChannels],
    currentChannel: [currentChannel, setCurrentChannel],
  } = ChatCtx;

  useEffect(() => {
    // GET ALL THE CHANNELS AND THE DMS AT ONCE!
    // socket.on("connect******************************", () => {
    //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    // });

    // socket.on("disconnect*********************", () => {
    //   console.log(socket.id); // undefined
    // });
    // socket.emit(
    //   "get_channel_messages",
    //   {
    //     userId: Number(user?.id),
    //     channelId: Number(id),
    //     page: 1,
    //   },
    //   (data) => {
    //     console.log("This ************* ", data);
    //   }
    // );
    // return () => {
    //   socket.disconnect();
    // };
    viewModel.initChat();
    socket.on(CHANNEL_CMD.recUpdatedChannelsList, (data) => {
      console.error("NEw LIST IS COMMING>>>>>>>>>>>>>>>>>>>");
      if (data) setChannels(data);
      //console.log("looks like the list is updated: ", data);
    });

    /*
    
    Looks like a new member is here: 
Object { channelId: 6, updatedList: {…} }
Chat.tsx:71:14

    */
    socket.on(CHANNEL_CMD.recUpdatedListOfMembers, (data) => {
      if (type == "channel" && data && data.channelId == Number(id)) {
        // const newChannel = { ...currentChannel };
        // newChannel.admins = data.updatedList.admins;
        // newChannel.members = data.updatedList.members;
        // newChannel.owner_id = data.updatedList.owner[0].id;
        // setCurrentChannel(newChannel);
        viewModel.fetchCurrentChannel();
        console.log("********* Looks like a new member is here:", data);
      }
    });

    socket.on(CHANNEL_CMD.recUpdatedChannelInfo, (data) => {
      if (
        type == "channel" &&
        data &&
        data.channelId == Number(id) &&
        currentChannel
      ) {
        // const newChannel: ChannelSample = { ...currentChannel };
        // newChannel.name = data.updatedInfo.name;
        // newChannel.description = data.updatedInfo.description;
        // newChannel.visibility = data.updatedInfo.visibility;
        // setCurrentChannel(newChannel);
        // update the name in channel list also:
        viewModel.fetchCurrentChannel();
        console.log("looks like the data is changed body", data.updatedInfo);
      }
      console.log("This is new info", data, currentChannel);
      // update the name in the channel list:
      // const newChannels = channels.map((e) => {
      //   if (e.id == data.channelId) {
      //     e.name = data.updatedInfo.name;
      //   }
      //   return e;
      // });
      // setChannels(newChannels);
    });

    return () => {
      socket.off(CHANNEL_CMD.recMessageFromChannel);
      socket.off(CHANNEL_CMD.recUpdatedChannelsList);
    };
  }, []);

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
