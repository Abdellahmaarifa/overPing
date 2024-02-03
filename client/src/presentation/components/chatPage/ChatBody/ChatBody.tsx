import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Message from "../Message/Message";
import {
  ChatBodyContainer,
  ChatMessages,
  SendMessageFeild,
  SendMessageInput,
} from "./ChatBody.style";
import ChatBanner from "../ChatBanner/ChatBanner";
import tw from "twin.macro";
import { CHANNEL_CMD, DIRECTMESSAGE, SERVER_CHAT } from "constant/constants";
import { useUserContext } from "context/user.context";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { io } from "socket.io-client";
import { ChannelSampleMember } from "domain/model/chat.type";
import IMG from "assets/common/profile.png";
interface MessageType {
  id: number;
  sender_id: number;
  text: string;
  updated: boolean;
  created_at: string;
  updated_at: string;
  channelId: number;
}

interface MessageDMType {
  id: number;
  sender_id: number;
  text: string;
  updated: boolean;
  created_at: string;
  updated_at: string;
}

const ChatBody = ({
  type,
  socket,
  socket_dm,
}: {
  type: string;
  socket: any;
  socket_dm: any;
}) => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
  } = useChatContext();
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showFriends: [showFriends, setShowFriends],
    showChannelMenu: [showChannelMenu, setShowChannelMenu],
    currentChannel: [currentChannel, setCurrentChannel],
    currentDm: [currentDm, setCurrentDm],
  } = useChatContext();
  const { user } = useUserContext();
  const { id } = useParams();
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const [messagesDM, setMessagesDM] = useState<MessageDMType[] | []>([]);
  const [membersMap, setMembersMap] = useState<Map<
    number,
    { name: string; image: string }
  > | null>(null);

  const sendMessage = () => {
    if (msg == "") return;
    socket.emit(
      CHANNEL_CMD.sendMessageInchannel,
      {
        userId: Number(user?.id),
        channelId: Number(id),
        text: msg,
      },
      (data) => {
        if (data.error.message) {
          const time = new Date(data.error.message.split(" ").at(-1));
          const now = new Date();
          if (time) {
            const newDate = new Date(time.getTime() - now.getTime());
            toast.error(
              `try again after:  ${newDate
                .getMinutes()
                .toString()
                .padStart(2, "0")}:${newDate.getSeconds()}`
            );
          }
        }
      }
    );
    setMsg("");
  };

  const sendMessage_dm = () => {
    if (msg == "") return;
    socket_dm.emit(
      DIRECTMESSAGE.sendMessageToUser,
      {
        userId: Number(user?.id),
        recipientId: Number(id),
        groupChatId: Number(currentDm?.id),
        text: msg,
      },
      (data) => {
        if (data.error.message) {
          toast.error("error in send messsage IN DM", data.error.message);
        }
      }
    );
    setMsg("");
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (type == "channel") {
      socket.on(CHANNEL_CMD.error, (data) => {
        console.log(
          "88888888888888888888===>ERROR GET IT FROM CHANNEL SOCKET : ",
          data
        );
      });

      socket.on(CHANNEL_CMD.recMessageFromChannel, (data: MessageType) => {
        console.log("THIS IS FROM BACKEND!!! ", data);
        if (data && data.channelId == Number(id))
          setMessages((old) => [data, ...old]);
      });
    } else if (type == "dm") {
      socket_dm.on(DIRECTMESSAGE.error, (data) => {
        console.log(
          "88888888888888888888===>ERROR GET IT FROM DIRECT MSG SOCKET : ",
          data
        );
      });

      socket_dm.on(DIRECTMESSAGE.recMessageFromUser, (data: MessageDMType) => {
        console.log("THIS IS FROM BACKEND!!! ", data);
        if (
          data &&
          (data.sender_id == Number(id) || data.sender_id == Number(user?.id))
        ) {
          setMessagesDM((old) => [data, ...old]);
        }
      });
    }
    return () => {
      if (type == "channel") {
        socket.off(CHANNEL_CMD.error);
        socket.off(CHANNEL_CMD.recMessageFromChannel);
      }
      if (type == "dm") {
        socket_dm.off(DIRECTMESSAGE.error);
        socket_dm.off(DIRECTMESSAGE.recMessageFromUser);
      }
    };
  }, [id, location.pathname]);

  ////////////////////////////////////////////////////////

  // useEffect(() => {
  //   if (currentChannel && type == "channel") {
  //     const newMap = new Map<number, { name: string; image: string }>();
  //     let newAdmin = currentChannel.admins ? [...currentChannel.admins] : [];
  //     let newMems = currentChannel.members ? [...currentChannel.members] : [];
  //     [...newAdmin, ...newMems].map((e) => {
  //       newMap.set(Number(e.id), {
  //         name: e.username,
  //         image: e.profileImgUrl,
  //       });
  //     });
  //     setMembersMap(newMap);
  //   }
  // }, [currentChannel, location.pathname, id]);

  ////////////////////////////////////////////////////////

  useEffect(() => {
    if (currentChannel && type == "channel") {
      socket.emit(
        CHANNEL_CMD.getChannelMessages,
        {
          userId: Number(user?.id),
          channelId: Number(id),
          page: 0,
        },
        (data) => {
          console.log("YOU MSGSSS: ", data);
          if (!data?.error) setMessages(data);
        }
      );
    }
    if (currentDm && type == "dm") {
      console.log("++++++++++++++ data", currentDm);
      socket_dm.emit(
        DIRECTMESSAGE.getDMMessages,
        {
          userId: Number(user?.id),
          groupChatId: Number(currentDm?.id),
          page: 0,
        },
        (data, error) => {
          console.log("YOU SENT data: ", data);
          console.log("YOU SENT ERROR: ", error);
          if (!data?.error) setMessagesDM(data.messages);
        }
      );
    }
  }, [location.pathname, id, currentChannel, currentDm]);

  console.log("#######################DMS ", messagesDM);
  return (
    <ChatBodyContainer
      onClick={() => {
        setShowChatMenu(false);
        setShowChatAbout(false);
        setShowFriends(false);
        setShowChannelMenu(false);
      }}
    >
      {<ChatBanner type={type} />}
      {type == "channel" && currentChannel && (
        <>
          <ChatMessages>
            {messages.length > 0 &&
              messages.map((e: MessageType, index: number) => {
                console.log("///////////===========>>the key ", index);

                let newAdmin = currentChannel.admins
                  ? [...currentChannel.admins]
                  : [];
                let newMems = currentChannel.members
                  ? [...currentChannel.members]
                  : [];
                let us: ChannelSampleMember | undefined = [
                  ...newAdmin,
                  ...newMems,
                ].find((m) => Number(m.id) == e.sender_id);

                console.log(
                  "list of memebers: ",
                  [...newAdmin, ...newMems],
                  us
                );
                return (
                  <Message
                    name={us ? us?.username! : "user"}
                    image={us ? us?.profileImgUrl! : IMG}
                    message={e.text}
                    date={format(e.created_at, "dd/MM/yyyy HH:mm")}
                    id={e.sender_id}
                  />
                );
              })}
          </ChatMessages>
        </>
      )}
      {type == "dm" && currentDm && (
        <>
          <ChatMessages>
            {messagesDM.length > 0 &&
              messagesDM.map((e: MessageDMType, index: number) => {
                let u = currentDm?.user2;
                // if (e.sender_id == Number(currentDm?.user1.id))
                //   u = currentDm?.user1;
                if (e.sender_id != Number(id)) u = currentDm?.user1;
                if (!u) return "";
                return (
                  <Message
                    name={String(u?.username)}
                    image={String(u?.profileImgUrl)}
                    message={e.text}
                    date={format(e.created_at, "dd/MM/yyyy HH:mm")}
                    id={Number(u?.id)}
                  />
                );
              })}
          </ChatMessages>
        </>
      )}
      {type != "none" && (currentChannel || currentDm) && (
        <SendMessageFeild>
          <form
            tw="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("send message !!!");
              type == "dm" ? sendMessage_dm() : sendMessage();
            }}
          >
            <SendMessageInput
              tw="w-full"
              placeholder="Message"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              maxLength={100}
            />
          </form>
        </SendMessageFeild>
      )}
    </ChatBodyContainer>
  );
};

export default ChatBody;
