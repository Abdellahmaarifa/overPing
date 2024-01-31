import { useApolloClient } from "@apollo/client";
import ChannelModel from "components/chatPage/ChannelModel/ChannelModel";
import ChatRightSide from "components/chatPage/CharRightSide/ChatRightSide";

import ChatLeftSide from "components/chatPage/ChatLeftSide/ChatLeftSide";
import ChatSearch from "components/chatPage/ChatSearch/ChatSearch";
import EditChannelModel from "components/chatPage/EditChannelModel /EditChannelModel";
import { CHANNEL_CMD, DIRECTMESSAGE, SERVER_CHAT} from "constant/constants";
import { useChatContext } from "context/chat.context";
import { useUserContext } from "context/user.context";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChatConatiner } from "./Chat.style";
import { ChatViewModel } from "./ChatViewModel";
import { ChannelSample } from "domain/model/chat.type";
import { io } from "socket.io-client";
import ChatBody from "components/chatPage/ChatBody/ChatBody";


class Socket_init {
  socket : any = null;
  socket_dm : any = null;

  init = () => {
    if (this.socket === null)
    {
      this.socket = io(URL_CHANNEL, { withCredentials: true });
    }
    if (this.socket_dm === null) {
      this.socket_dm = io(URL_DM, { withCredentials: true });
    }
    return {socket: this.socket, socket_dm: this.socket_dm}
  }
}

const SocketObj = new Socket_init();

const URL_CHANNEL = `${SERVER_CHAT}/${
  CHANNEL_CMD.namespace
}`;

const URL_DM = `${SERVER_CHAT}/${
  DIRECTMESSAGE.namespace
}`;


// const socket = io(URL_CHANNEL, { withCredentials: true });
// const socket_dm = io(URL_DM, { withCredentials: true });




const Chat = ({ type }: { type: "none" | "dm" | "channel" }) => {

  const {socket, socket_dm} = SocketObj.init();

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
    socket:socket,
  });

  // get context values
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
    showEditChannelModel: [showEditChannelModel, setShowEditChannelModel],
    channels: [channels, setChannels],
    currentChannel: [currentChannel, setCurrentChannel],
    currentDm: [currentDm, setCurrentDm],
    dms: [dms, setDms],
  } = ChatCtx;

  useEffect(() => {
    viewModel.initChat();

    socket.on(CHANNEL_CMD.error, (data) =>{
      console.log("88888888888888888888===>ERROR GET IT FROM CHANNEL SOCKET : " ,data);
    })

    socket.on(CHANNEL_CMD.recUpdatedChannelsList, (data) => {
      if (data) setChannels(data);
      //console.log("looks like the list is updated: ", data);
    });

    socket.on(CHANNEL_CMD.recUpdatedListOfMembers, (data) => {
      console.log("THIS IS THE NEW CHANNEL >> ", data);
      if (type == "channel" && data && data.channelId == Number(id)) {
        viewModel.fetchCurrentChannel();
        if (
          !data?.updatedList?.admins.find((e) => e.id == user?.id) &&
          !data?.updatedList?.members?.find((e) => e.id == user?.id) &&
          data?.updatedList?.owner.id != Number(user?.id)
        ) {
          console.log("THIS USER NOT HERE ANT MORE!!");
          navigate("/chat");
        }
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

    //////////////////////////////////////////////////////////////////////

    socket_dm.on(DIRECTMESSAGE.error, (data) =>{
      console.log("88888888888888888888===>ERROR GET IT FROM DIRECT MSG SOCKET : " ,data);
    })
    

    socket_dm.on(DIRECTMESSAGE.recUpdatedDMsList, (data) => {
      if (data) setDms(data);
      console.log("looks like the list is updated: ", data);
    });

    return () => {
      socket.off(CHANNEL_CMD.error);
      socket.off(CHANNEL_CMD.recUpdatedChannelsList);
      socket.off(CHANNEL_CMD.recUpdatedListOfMembers);
      socket.off(CHANNEL_CMD.recUpdatedChannelInfo);
      socket_dm.off(DIRECTMESSAGE.error);
      socket_dm.off(DIRECTMESSAGE.recUpdatedDMsList);
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
  console.log("the current direct: ", currentDm);
  console.log("the array channels: ", channels);
  console.log("the array dms: ", dms);

  return (
    <ChatConatiner>
      <ChatLeftSide />
      <ChatBody   socket={socket} socket_dm={socket_dm} type={type} />
      {((currentChannel && type == "channel") ||
        (currentDm && type == "dm")) && <ChatRightSide  type={type} />}
      {showSearchModel && <ChatSearch />}
      {showChannelModel && <ChannelModel />}
      {showEditChannelModel && <EditChannelModel />}
      <Toaster position="top-center" />
    </ChatConatiner>
  );
};

export default Chat;
