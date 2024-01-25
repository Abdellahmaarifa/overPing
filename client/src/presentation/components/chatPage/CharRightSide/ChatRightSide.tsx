import { da, faker } from "@faker-js/faker";
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
import { useAccountQuery, useSendRequestToPlayMutation } from 'gql/index';
import { useLocation, useParams } from "react-router-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { playWithUser } from "helpers/index";
import toast from "react-hot-toast";

const ChatRightSide = ({ type }: { type: "none" | "dm" | "channel" }) => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
    showFriends: [showFriends, setShowFriends],
    currentChannel: [currentChannel, setCurrentChannel],
    currentDm: [currentDm, setCurrentDm],
  } = useChatContext();
  const { id } = useParams();
  const location = useLocation();

  const [sendGameInvitaion] = useSendRequestToPlayMutation();
  useEffect(() => {}, [ currentDm , currentChannel, id, location.pathname]);

  const { data, loading, error } = useAccountQuery({
    variables: {
      userId: Number(currentDm?.user2.id)
    },
  });
  if(error)
  {
    console.log("error in get data using useAccountQuery", error);
    return (<p>error ...</p>);
  }
  if(loading)
  {
    return (<p>loading ...</p>);
  }
  if(data)
  {
    console.log( "data of chat right side ===>", data);
  }

  const sendGameInvitaionHandler = async () => {
    toast.promise(playWithUser(Number(id), sendGameInvitaion), {
      loading: "please wait ..",
      success: (data: string) => data,
      error: (err: string) => err,
    });
  };

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
                  background: `center/cover url(${data?.findProfileByUserId?.bgImageUrl})`,
                }}
              ></UserCover>
              <UserImage src={data?.findUserById.profileImgUrl} />
            </UserProfile>
          )}
          <UserInfoWrapper>
            <UserInformation>
              <UserInfoFeild>
                <UserInfoName>
                  {type == "channel" ? currentChannel?.name : data?.findProfileByUserId?.nickname}
                </UserInfoName>
                <UserInfoUserName>
                  {type == "channel" ? `@${currentChannel?.name}` : `@${data?.findUserById.username}`}
                </UserInfoUserName>
              </UserInfoFeild>
              <UserInfoFeild>
                <UserInfoAboutHeader>About</UserInfoAboutHeader>
                <UserInfoAbout>
                  {type == "channel"
                    ? currentChannel?.description
                    : data?.findProfileByUserId?.about}
                </UserInfoAbout>
              </UserInfoFeild>
              {type == "dm" && (
                <UserInfoStatusConatiner>
                  <UserInfoStatus>
                    <UserInfoStatusHeading>Games Won</UserInfoStatusHeading>
                    <UserInfoStatusRank>{data?.findProfileByUserId?.gameStatus.matchesWon}</UserInfoStatusRank>
                  </UserInfoStatus>
                  <UserInfoStatus>
                    <UserInfoStatusHeading>Games loss</UserInfoStatusHeading>
                    <UserInfoStatusRank>{data?.findProfileByUserId?.gameStatus.matchesLoss}</UserInfoStatusRank>
                  </UserInfoStatus>
                </UserInfoStatusConatiner>
              )}
            </UserInformation>
            {type == "dm" && <Button $text="Play now" $size="auto" onClick={() => sendGameInvitaionHandler()}/>}
          </UserInfoWrapper>
        </>
      )}
    </ChatRightSideContainer>
  );
};
export default ChatRightSide;
