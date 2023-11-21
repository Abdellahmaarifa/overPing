import { faker } from "@faker-js/faker";
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

const ChatLeftSide = () => {
  const {
    showChatMenu: [showChatMenu, setShowChatMenu],
    showSearchModel: [showSearchModel, setShowSearchModel],
    showChannelModel: [showChannelModel, setShowChannelModel],
  } = useChatContext();

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
          onClick={() => setShowSearchModel(true)}
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
          <ChannelConatiner>
            <ChannelIcon>
              <HashTagIcon />
            </ChannelIcon>
            <ChannelName>channel name</ChannelName>
          </ChannelConatiner>
          <ChannelConatiner>
            <ChannelIcon>
              <HashTagIcon />
            </ChannelIcon>
            <ChannelName>channel name</ChannelName>
          </ChannelConatiner>
        </MessagesContent>
      </MessagesBox>
      <MessagesBox>
        <MessagesHeaderContainer>
          <MessagesHeader>direct messages</MessagesHeader>
          <MessagesHeaderIcon
            onClick={() => {
              setShowSearchModel(true);
            }}
          >
            <PlusIcon />
          </MessagesHeaderIcon>
        </MessagesHeaderContainer>
        <MessagesContent>
          <DMContainer>
            <DMProfile src={faker.image.avatar()} />
            <DMNameContainer>
              <DMName>Salam</DMName>
              <DMUserName>@Salam</DMUserName>
            </DMNameContainer>
            <DMCloseIcon>
              <CloseIcon />
            </DMCloseIcon>
          </DMContainer>
        </MessagesContent>
      </MessagesBox>
    </ChatLeftSideContainer>
  );
};

export default ChatLeftSide;
