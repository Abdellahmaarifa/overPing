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
import { CHANNEL_CMD, DIRECTMESSAGE, socket } from "constant/constants";
import { useUserContext } from "context/user.context";
import toast from "react-hot-toast";

// const ob = {
//   id: 12,
//   sender_id: 3,
//   text: "hfg",
//   updated: false,
//   created_at: "2024-01-21T03:56:49.959Z",
//   updated_at: "2024-01-21T03:56:49.959Z",
//   dmId: null,
//   channelId: 45,
// };

interface MessageType {
  id: number;
  sender_id: number;
  text: string;
  updated: boolean;
  created_at: string;
  updated_at: string;
  channelId: number;
}

const ChatBody = ({ type }: { type: string }) => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
  } = useChatContext();
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showFriends: [showFriends, setShowFriends],
    showChannelMenu: [showChannelMenu, setShowChannelMenu],
    currentChannel: [currentChannel, setCurrentChannel],
  } = useChatContext();
  const { user } = useUserContext();
  const { id } = useParams();
  const [msg, setMsg] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<MessageType[] | []>([]);
  const [membersMap, setMembersMap] = useState<Map<
    number,
    { name: string; image: string }
  > | null>(null);

  const sendMessage = () => {
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

  useEffect(() => {
    socket.on(CHANNEL_CMD.recMessageFromChannel, (data: MessageType) => {
      console.log("SENDING>>>>", data, messages);
      if (data && data.channelId == Number(id))
        setMessages((old) => {
          console.log("from useState: ", old);

          return [data, ...old];
        });
    });
    return () => {
      socket.off(CHANNEL_CMD.recMessageFromChannel);
    };
  }, [id, location.pathname]);
  useEffect(() => {
    if (currentChannel && type == "channel") {
      const newMap = new Map<number, { name: string; image: string }>();
      let newAdmin = currentChannel.admins ? [...currentChannel.admins] : [];
      let newMems = currentChannel.members ? [...currentChannel.members] : [];
      [...newAdmin, ...newMems].map((e) => {
        newMap.set(Number(e.id), {
          name: e.username,
          image: e.profileImgUrl,
        });
      });
      setMembersMap(newMap);
    }
  }, [currentChannel, location.pathname, id]);

  useEffect(() => {
    if (type == "channel") {
      socket.emit(
        CHANNEL_CMD.getChannelMessages,
        {
          userId: Number(user?.id),
          channelId: Number(id),
          page: 0,
        },
        (data) => {
          //console.log("YOU SENT: ", data);
          if (!data?.error) setMessages(data);
        }
      );
    } else if (type == "dm") {
    }
  }, [location.pathname, id]);

  return (
    <ChatBodyContainer
      onClick={() => {
        setShowChatMenu(false);
        setShowChatAbout(false);
        setShowFriends(false);
        setShowChannelMenu(false);
      }}
    >
      <ChatBanner type={type} />
      {(type == "channel" || type == "dm") && (
        <>
          {" "}
          <ChatMessages>
            {messages.length > 0 &&
              messages.map((e: MessageType) => {
                return (
                  <Message
                    name={membersMap?.get(e.sender_id)?.name!}
                    image={membersMap?.get(e.sender_id)?.image!}
                    message={e.text}
                    date={e.created_at}
                    key={e.id}
                    id={e.sender_id}
                  />
                );
              })}
          </ChatMessages>
          <SendMessageFeild>
            <form
              tw="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("send messgae!!");
                sendMessage();
              }}
            >
              <SendMessageInput
                placeholder="Message"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
            </form>
          </SendMessageFeild>{" "}
        </>
      )}
    </ChatBodyContainer>
  );
};

export default ChatBody;
