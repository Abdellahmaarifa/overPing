import ChannelModel from "components/chatPage/ChannelModel/ChannelModel";
import { ChatConatiner } from "./Chat.style";

import ChatRightSide from "components/chatPage/CharRightSide/ChatRightSide";
import ChatBody from "components/chatPage/ChatBody/ChatBody";
import ChatLeftSide from "components/chatPage/ChatLeftSide/ChatLeftSide";
import ChatSearch from "components/chatPage/ChatSearch/ChatSearch";
import useChatContextProvider, { useChatContext } from "context/chat.context";
import EditChannelModel from "components/chatPage/EditChannelModel /EditChannelModel";
import {
  DeleteDirectMessageDocument,
  GetUserChannelsDocument,
  GetUserDirectMessagesDocument,
  useCreateDirectMessageMutation,
} from "gql/index";
import { useUserContext } from "context/user.context";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { CreateChannelModel } from "components/chatPage/ChannelModel/ChannelModel.style";
import { CreateDirectMessageDocument } from "gql/index";
import { useNavigate, useParams } from "react-router-dom";
import { GetChannelVisibilityDocument } from "gql/index";
import { JoinChannelDocument } from "gql/index";
import { ChannelType, DMType } from "domain/model/chat.type";
import { useResetProjection } from "framer-motion";

const Chat = ({ type }: { type: "none" | "dm" | "channel" }) => {
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
    showEditChannelModel: [showEditChannelModel, setShowEditChannelModel],
  } = useChatContext();
  const [dm, setDm] = useState<DMType[] | []>([]);
  const [channels, setChannels] = useState<ChannelType[] | []>([]);
  const { id } = useParams();
  const [createDirectMessage] = useCreateDirectMessageMutation();

  const { user } = useUserContext();
  const client = useApolloClient();
  const navigate = useNavigate();
  // const createDm = async (id: string) => {
  //   try {
  //     const res = await createDirectMessage({
  //       variables: {
  //         userId: Number(user?.id),
  //         targetId: Number(id),
  //       },
  //     });
  //     console.log("created: ", res);
  //   } catch (err) {
  //     console.log("trying to create dm : ", err);
  //   }
  // };

  const initChat = async () => {
    try {
      let currentChannel;
      let currentDm;
      const userChannels = await client.query({
        query: GetUserChannelsDocument,
        variables: {
          userId: Number(user?.id),
        },
      });
      if (userChannels?.data?.getUserChannels) {
        currentChannel = userChannels.data.getUserChannels.find(
          (e) => e.id == id
        );
        setChannels(userChannels.data.getUserChannels);
      }
      const userDM = await client.query({
        query: GetUserDirectMessagesDocument,
        variables: {
          userId: Number(user?.id),
        },
      });

      if (userDM?.data?.getUserDirectMessages) {
        setDm(userDM.data.getUserDirectMessages);
      }
      currentDm = userDM.data.getUserDirectMessages.find(
        (e) => e.user2.id == id
      );
      console.log(
        "this is the data  commint after getting dm : ",
        userDM,
        currentDm
      );

      if (type == "dm") {
        if (currentDm) return;
        // check if the user exist and can connect to me
        client
          .mutate({
            mutation: CreateDirectMessageDocument,
            variables: {
              userId: Number(user?.id),
              targetId: Number(id),
            },
          })
          .then((data) => {
            console.log("dm created: ", data);
          })
          .catch((err) => {
            console.log("failed to craete dm : ", err);
            navigate("/error");
          });
      }

      if (type == "channel") {
        if (currentChannel) return;
        // amechnisme for getting password on the protected channels is needed!!

        const joinChannelRes = await client.mutate({
          mutation: JoinChannelDocument,
          variables: {
            data: {
              userId: Number(user?.id),
              channelId: Number(id),
            },
          },
        });
      }
    } catch (err) {
      console.log("**err: ", err);
    }
  };
  useEffect(() => {
    // GET ALL THE CHANNELS AND THE DMS AT ONCE!
    initChat();
  }, []);

  return (
    <ChatConatiner>
      <ChatLeftSide
        channels={channels}
        setChannels={setChannels}
        dm={dm}
        setDm={setDm}
      />
      <ChatBody />
      <ChatRightSide />
      {showSearchModel && <ChatSearch />}
      {showChannelModel && <ChannelModel />}
      {showEditChannelModel && <EditChannelModel />}
    </ChatConatiner>
  );
};

export default Chat;
