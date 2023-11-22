import { faker } from "@faker-js/faker";
import Button from "components/common/Button/Button";
import {
  ChatRightSideContainer,
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
} from "./ChatRightSide.style";
import { useChatContext } from "context/chat.context";
import { ChannelMember } from "../ChannelMembers/ChannelMembers.style";
import ChannelMembers from "../ChannelMembers/ChannelMembers";

const ChatRightSide = () => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
    showFriends: [showFriends, setShowFriends],
  } = useChatContext();
  return (
    <ChatRightSideContainer
      style={
        showChatAbout || showFriends
          ? {
              display: "flex",
            }
          : undefined
      }
    >
      {showFriends ? (
        <ChannelMembers />
      ) : (
        <>
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
        </>
      )}
    </ChatRightSideContainer>
  );
};
export default ChatRightSide;
