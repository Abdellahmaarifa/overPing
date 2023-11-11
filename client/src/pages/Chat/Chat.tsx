import CloseIcon from "assets/common/close.svg?react";
import HashTagIcon from "assets/common/hashtag.svg?react";
import PlusIcon from "assets/common/plus.svg?react";
import SearchIcon from "assets/common/search.svg?react";
import Button from "components/common/Button/Button";
import { useState } from "react";
import {
  ChannelConatiner,
  ChannelIcon,
  ChannelName,
  ChatBanner,
  ChatBody,
  ChatConatiner,
  ChatLeftSide,
  ChatMessages,
  ChatRightSide,
  DMCloseIcon,
  DMContainer,
  DMName,
  DMNameContainer,
  DMProfile,
  DMUserName,
  Message,
  MessageContainer,
  MessageImage,
  MessageInfo,
  MessageProfile,
  MessageSender,
  MessageSenderCard,
  MessageSenderCardImage,
  MessageSenderCardImageContainer,
  MessageSenderCardImageText,
  MessageSenderCardInfo,
  MessageSenderCardInfoActionConatiner,
  MessageSenderCardInfoName,
  MessageSenderCardInfoNameConatiner,
  MessageSenderCardInfoState,
  MessageSenderCardInfoStateConatiner,
  MessageSenderCardInfoStateName,
  MessageSenderCardInfoStateNumber,
  MessageSenderCardInfoUserName,
  MessageSenderCardMask,
  MessageSenderDate,
  MessageSenderName,
  MessagesBox,
  MessagesContent,
  MessagesHeader,
  MessagesHeaderContainer,
  MessagesHeaderIcon,
  MessagesSearch,
  SendMessageFeild,
  SendMessageInput,
  UserCover,
  UserImage,
  UserInfoAbout,
  UserInfoAboutHeader,
  UserInfoFeild,
  UserInfoName,
  UserInfoStatus,
  UserInfoStatusConatiner,
  UserInfoStatusHeading,
  UserInfoStatusRank,
  UserInfoUserName,
  UserInfoWrapper,
  UserInformation,
  UserProfile,
} from "./Chat.style";

import { faker, tr } from "@faker-js/faker";

const SenderCard = ({
  user,
}: {
  user: {
    name: string;
    userName: string;
    image: string;
    totalGames: number;
    gamesWon: number;
    gameLost: number;
    isFriend: Boolean;
  };
}) => {
  const [IsShownCard, setIsShownCard] = useState<boolean>(false);
  return (
    <MessageSenderCard>
      <MessageSenderCardImageContainer
        onMouseEnter={() => setIsShownCard(true)}
        onMouseLeave={() => setIsShownCard(false)}
      >
        <MessageSenderCardImage src={user.image} />
        {IsShownCard && (
          <>
            <MessageSenderCardMask></MessageSenderCardMask>
            <MessageSenderCardImageText>
              view profile
            </MessageSenderCardImageText>
          </>
        )}
      </MessageSenderCardImageContainer>
      <MessageSenderCardInfo>
        <MessageSenderCardInfoNameConatiner>
          <MessageSenderCardInfoName>{user.name}</MessageSenderCardInfoName>
          <MessageSenderCardInfoUserName>
            {user.userName}
          </MessageSenderCardInfoUserName>
        </MessageSenderCardInfoNameConatiner>
        <MessageSenderCardInfoStateConatiner>
          <MessageSenderCardInfoState>
            <MessageSenderCardInfoStateName>
              Total Game
            </MessageSenderCardInfoStateName>
            <MessageSenderCardInfoStateNumber>
              {user.totalGames}
            </MessageSenderCardInfoStateNumber>
          </MessageSenderCardInfoState>
          <MessageSenderCardInfoState>
            <MessageSenderCardInfoStateName>
              Game Won
            </MessageSenderCardInfoStateName>
            <MessageSenderCardInfoStateNumber>
              {user.gamesWon}
            </MessageSenderCardInfoStateNumber>
          </MessageSenderCardInfoState>
          <MessageSenderCardInfoState>
            <MessageSenderCardInfoStateName>
              Game Lost
            </MessageSenderCardInfoStateName>
            <MessageSenderCardInfoStateNumber>
              {user.gameLost}
            </MessageSenderCardInfoStateNumber>
          </MessageSenderCardInfoState>
        </MessageSenderCardInfoStateConatiner>
        <MessageSenderCardInfoActionConatiner>
          <Button $text="play" $size="sm" />
          {user.isFriend ? (
            <Button $text="play" $size="sm" $theme="danger" $border={true} />
          ) : (
            <Button $transparent={true} $border={true} $Icon={PlusIcon} />
          )}
        </MessageSenderCardInfoActionConatiner>
      </MessageSenderCardInfo>
    </MessageSenderCard>
  );
};
const MessageSimple = () => {
  const [IsShown, setIsShown] = useState<boolean>(true);

  return (
    <MessageContainer onMouseLeave={() => setIsShown(false)}>
      <MessageProfile
        src={faker.image.avatar()}
        onMouseEnter={() => setIsShown(true)}
      />
      <MessageInfo>
        <MessageSender>
          <MessageSenderName>salma</MessageSenderName>
          <MessageSenderDate>Today at 10:22 PM</MessageSenderDate>
          {IsShown && (
            <SenderCard
              user={{
                name: "maarifa",
                userName: "amaarifa",
                image: faker.image.urlLoremFlickr(),
                totalGames: 200,
                gamesWon: 150,
                gameLost: 100,
                isFriend: false,
              }}
            />
          )}
        </MessageSender>
        <Message>
          <span>hello world!</span>
        </Message>
        <Message>
          <span>I hope you are doing okay!</span>
        </Message>
        <Message>
          <span>see u again.</span>
        </Message>
        <Message>
          <MessageImage
            src={faker.image.urlLoremFlickr({ category: "nature" })}
          />
        </Message>
      </MessageInfo>
    </MessageContainer>
  );
};
const Chat = () => {
  return (
    <ChatConatiner>
      <ChatLeftSide>
        <MessagesSearch>
          <Button $text="Search" $size="auto" $Icon={SearchIcon} />
        </MessagesSearch>
        <MessagesBox>
          <MessagesHeaderContainer>
            <MessagesHeader>channels</MessagesHeader>
            <MessagesHeaderIcon>
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
            <MessagesHeaderIcon>
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
      </ChatLeftSide>

      <ChatBody>
        <ChatBanner></ChatBanner>

        <ChatMessages>
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
          <MessageSimple />
        </ChatMessages>
        <SendMessageFeild>
          <SendMessageInput placeholder="Message" />
        </SendMessageFeild>
      </ChatBody>

      <ChatRightSide>
        <UserProfile>
          <UserCover
            style={{
              background: `center/cover url(${faker.image.urlLoremFlickr()})`,
            }}
          ></UserCover>
          <UserImage src={faker.image.avatar()} />
        </UserProfile>
        <UserInfoWrapper>
          <UserInformation>
            <UserInfoFeild>
              <UserInfoName>amaarifa</UserInfoName>
              <UserInfoUserName>@amaarifa</UserInfoUserName>
            </UserInfoFeild>
            <UserInfoFeild>
              <UserInfoAboutHeader>About Me</UserInfoAboutHeader>
              <UserInfoAbout>q whole universe in tiny dot.</UserInfoAbout>
            </UserInfoFeild>
            <UserInfoStatusConatiner>
              <UserInfoStatus>
                <UserInfoStatusHeading>Games Won</UserInfoStatusHeading>
                <UserInfoStatusRank>78</UserInfoStatusRank>
              </UserInfoStatus>
              <UserInfoStatus>
                <UserInfoStatusHeading>Games Won</UserInfoStatusHeading>
                <UserInfoStatusRank>78</UserInfoStatusRank>
              </UserInfoStatus>
            </UserInfoStatusConatiner>
          </UserInformation>
          <Button $text="Play now" $size="auto" />
        </UserInfoWrapper>
      </ChatRightSide>
    </ChatConatiner>
  );
};

export default Chat;
