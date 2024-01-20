import { da, faker } from "@faker-js/faker";
import Button from "components/common/Button/Button";

import CloseIcon from "assets/common/close.svg?react";
import HashTagIcon from "assets/common/hashtag.svg?react";
import PlusIcon from "assets/common/plus.svg?react";
import SearchIcon from "assets/common/search.svg?react";
import {
  ChannelConatiner,
  ChannelIcon,
  ChannelName,
  ChatLeftSideContainer,
  DMCloseIcon,
  DMContainer,
  DMName,
  DMNameContainer,
  DMProfile,
  DMUserName,
  MessagesBox,
  MessagesContent,
  MessagesHeader,
  MessagesHeaderContainer,
  MessagesHeaderIcon,
  MessagesSearch,
} from "./ChatLeftSide.style";
import { useChatContext } from "context/chat.context";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useApolloClient } from "@apollo/client";
import {
  DeleteDirectMessageDocument,
  GetUserChannelsDocument,
  GetUserDirectMessagesDocument,
  useCreateDirectMessageMutation,
} from "gql/index";
import { useUserContext } from "context/user.context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ChannelType, DMType } from "domain/model/chat.type";
import tw from "twin.macro";
import toast from "react-hot-toast";
const ChatLeftSide = () => {
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
    includeChannelInSearch: [includeChannelInSearch, setIncludeChannelInSearch],
    userHandlerCallBack: [userHandlerCallBack, setUserHandlerCallBack],
    channelHandlerCallBack: [channelHandlerCallBack, setChannelHandlerCallBack],
    currentChannel: [currentChannel, setCurrentChannel],
    channels: [channels, setChannels],
    dms: [dms, setDms],
  } = useChatContext();

  const { user } = useUserContext();
  const client = useApolloClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteDm = async (id: number) => {
    try {
      // const data = await client.mutate({
      //   mutation: DeleteDirectMessageDocument,
      //   variables: {
      //     data: {
      //       userId: Number(user?.id),
      //       groupChatId: id,
      //       messageId: 1,
      //     },
      //   },
      // });
      // console.log("deleted!! ", data);
      const newDms = dms.filter((e) => Number(e.id) != id);
      console.log(newDms);
      setDms(newDms);
    } catch (err) {
      console.log("in dele dm: ", err);
    }
  };

  const searchUserAndChannelsHandler = () => {
    setIncludeChannelInSearch(true);
    setChannelHandlerCallBack(
      () => (id: string) => navigate(`/chat/channel/${id}`)
    );
    setUserHandlerCallBack(() => (id: string) => navigate(`/chat/dm/${id}`));
    setShowSearchModel(true);
  };

  const searchUserHandler = () => {
    setIncludeChannelInSearch(false);
    setUserHandlerCallBack(() => (id: string) => navigate(`/chat/dm/${id}`));
    setShowSearchModel(true);
  };

  return (
    <ChatLeftSideContainer
      style={
        showChatMenu
          ? {
              display: "flex",
            }
          : undefined
      }
    >
      <MessagesSearch>
        <Button
          $text="Search"
          $size="auto"
          $Icon={SearchIcon}
          onClick={() => searchUserAndChannelsHandler()}
        />
      </MessagesSearch>
      <MessagesBox>
        <MessagesHeaderContainer>
          <MessagesHeader>channels</MessagesHeader>
          <MessagesHeaderIcon
            onClick={() => {
              setShowChannelModel(true);
            }}
          >
            <PlusIcon />
          </MessagesHeaderIcon>
        </MessagesHeaderContainer>
        <MessagesContent>
          {channels.map((e: ChannelType) => {
            return (
              <ChannelConatiner
                active={currentChannel && currentChannel?.id == e.id}
                key={e.id}
                onClick={() => navigate(`/chat/channel/${e.id}`)}
              >
                <ChannelIcon>
                  <HashTagIcon />
                </ChannelIcon>
                <ChannelName>{e.name}</ChannelName>
              </ChannelConatiner>
            );
          })}
        </MessagesContent>
      </MessagesBox>
      <MessagesBox>
        <MessagesHeaderContainer>
          <MessagesHeader>direct messages</MessagesHeader>
          <MessagesHeaderIcon onClick={() => searchUserHandler()}>
            <PlusIcon />
          </MessagesHeaderIcon>
        </MessagesHeaderContainer>
        <MessagesContent>
          {dms.map((e: DMType) => {
            return (
              <DMContainer
                active={!currentChannel && e.user2.id == id}
                key={e.id}
                onClick={() => navigate(`/chat/dm/${e.user2.id}`)}
              >
                <DMProfile src={e.user2.profileImgUrl} />
                <DMNameContainer>
                  <DMName>{e.user2.username}</DMName>
                  <DMUserName>@{e.user2.username}</DMUserName>
                </DMNameContainer>
                <DMCloseIcon>
                  <CloseIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteDm(Number(e.id));
                    }}
                  />
                </DMCloseIcon>
              </DMContainer>
            );
          })}
        </MessagesContent>
      </MessagesBox>
    </ChatLeftSideContainer>
  );
};

export default ChatLeftSide;
