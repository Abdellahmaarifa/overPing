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
import { CHANNEL_CMD, socket } from "constant/constants";
import { useUserContext } from "context/user.context";

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

const ChatBody = () => {
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
    console.log("send!!!!!");
    socket.emit(
      CHANNEL_CMD.sendMessageInchannel,
      {
        userId: Number(user?.id),
        channelId: Number(id),
        text: msg,
      },
      () => {
        console.log("****************** get // ");
      }
    );
  };

  useEffect(() => {
    socket.on(CHANNEL_CMD.recMessageFromChannel, (data: MessageType) => {
      if (data.channelId == Number(id)) setMessages((old) => [data, ...old]);
      // addToMessages(data);
      //console.log("I get this ************ ", messages, num);
    });

    return () => {
      //socket.off(CHANNEL_CMD.getChannelMessages);
      socket.off(CHANNEL_CMD.recMessageFromChannel);
    };
  }, []);
  useEffect(() => {
    if (currentChannel) {
      const newMap = new Map<number, { name: string; image: string }>();
      [...currentChannel.admins, ...currentChannel.members].map((e) => {
        newMap.set(Number(e.id), {
          name: e.username,
          image: e.profileImgUrl,
        });
      });
      setMembersMap(newMap);
    }
  }, [currentChannel]);

  useEffect(() => {
    socket.emit(
      CHANNEL_CMD.getChannelMessages,
      {
        userId: Number(user?.id),
        channelId: Number(id),
        page: 1,
      },
      (data) => {
        console.log("This should return all msgs but, ", data);
        setMessages(data);
      }
    );
  }, []);

  console.log(">> ** current channel : ", currentChannel);

  return (
    <ChatBodyContainer
      onClick={() => {
        setShowChatMenu(false);
        setShowChatAbout(false);
        setShowFriends(false);
        setShowChannelMenu(false);
      }}
    >
      <ChatBanner />
      <ChatMessages>
        {messages.map((e: MessageType) => {
          //const a = membersMap!.get("0");
          //console.log("sender: ", membersMap, e.sender_id, a);
          // if (membersMap?.has("3")) console.log("there is@!");
          console.log("**** ----- --- -- - -- -", membersMap);

          return (
            <Message
              name={membersMap?.get(e.sender_id)?.name}
              image={membersMap?.get(e.sender_id)?.image}
              message={e.text}
              date={e.created_at}
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
          />
        </form>
      </SendMessageFeild>
    </ChatBodyContainer>
  );
};

export default ChatBody;
