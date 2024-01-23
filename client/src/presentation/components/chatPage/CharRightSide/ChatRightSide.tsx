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
import { useEffect } from "react";

const ChatRightSide = ({ type }: { type: "none" | "dm" | "channel" }) => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
    showFriends: [showFriends, setShowFriends],
    currentChannel: [currentChannel, setCurrentChannel],
  } = useChatContext();
  useEffect(() => {
    console.log("----********--take data frm : ", currentChannel);
  }, [currentChannel]);
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
          {type == "dm" && (
            <UserProfile>
              <UserCover
                style={{
                  background: `center/cover url(${faker.image.urlLoremFlickr()})`,
                }}
              ></UserCover>
              <UserImage src={faker.image.avatar()} />
            </UserProfile>
          )}
          <UserInfoWrapper>
            <UserInformation>
              <UserInfoFeild>
                <UserInfoName>
                  {type == "channel" ? currentChannel?.name : "amaarifa"}
                </UserInfoName>
                <UserInfoUserName>
                  {type == "channel" ? `@${currentChannel?.name}` : "@amaarifa"}
                </UserInfoUserName>
              </UserInfoFeild>
              <UserInfoFeild>
                <UserInfoAboutHeader>About</UserInfoAboutHeader>
                <UserInfoAbout>
                  {type == "channel"
                    ? currentChannel?.description
                    : "q whole universe in tiny dot."}
                </UserInfoAbout>
              </UserInfoFeild>
              {type == "dm" && (
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
              )}
            </UserInformation>
            {type == "dm" && <Button $text="Play now" $size="auto" />}
          </UserInfoWrapper>
        </>
      )}
    </ChatRightSideContainer>
  );
};
export default ChatRightSide;
