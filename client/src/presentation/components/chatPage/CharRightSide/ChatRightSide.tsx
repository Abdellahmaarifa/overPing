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
import { useEffect, useState } from "react";
import {
  AccountDocument,
  AccountQuery,
  useAccountQuery,
  useSendRequestToPlayMutation,
} from "gql/index";
import { useLocation, useParams } from "react-router-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { GetUserProfile, playWithUser } from "helpers/index";
import toast from "react-hot-toast";
import { useApolloClient } from "@apollo/client";
import { ProfileType } from "domain/model/Profile.type";

const ChatRightSide = ({ type }: { type: "none" | "dm" | "channel" }) => {
  const {
    showChatAbout: [showChatAbout, setShowChatAbout],
    showFriends: [showFriends, setShowFriends],
    currentChannel: [currentChannel, setCurrentChannel],
    currentDm: [currentDm, setCurrentDm],
  } = useChatContext();
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendGameInvitaion] = useSendRequestToPlayMutation();
  const client = useApolloClient();
  useEffect(() => {
    if (type === "dm") {
      console.log("GET THE ACCOUNT OF ID : ", Number(id));
      client
        .query({
          query: AccountDocument,
          variables: {
            userId: Number(id),
          },
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          // console.warn("FROM DM", data);
          if (data.data) {
            setData(GetUserProfile(data.data));
            setLoading(false);
          }
        })
        .catch((err) => {
          setData(null);
          setLoading(false);
          toast.error(err.message ? err.message : "something went wrong");
        });
    }
  }, [currentChannel, id, location.pathname]);

  if (loading && type == "dm") {
    return <p>loading ...</p>;
  }

  const sendGameInvitaionHandler = async () => {
    toast.promise(playWithUser(Number(id), sendGameInvitaion), {
      loading: "please wait ..",
      success: (data: string) => data,
      error: (err: string) => err,
    });
  };

  console.log(
    "-------------------------------------- in right side data :",
    data
  );

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
          {type == "dm" && data && (
            <UserProfile>
              <UserCover
                style={{
                  background: `center/cover url(${data?.cover})`,
                }}
              ></UserCover>
              <UserImage src={data?.avatar} />
            </UserProfile>
          )}
          <UserInfoWrapper>
            {(currentChannel || (type == "dm" && data)) && (
              <UserInformation>
                <UserInfoFeild>
                  <UserInfoName>
                    {type == "channel" ? currentChannel?.name : data?.nickname}
                  </UserInfoName>
                  <UserInfoUserName>
                    {type == "channel"
                      ? `@${currentChannel?.name}`
                      : `@${data?.nickname}`}
                  </UserInfoUserName>
                </UserInfoFeild>
                <UserInfoFeild>
                  <UserInfoAboutHeader>About</UserInfoAboutHeader>
                  <UserInfoAbout>
                    {type == "channel"
                      ? currentChannel?.description
                      : data?.about}
                  </UserInfoAbout>
                </UserInfoFeild>
                {type == "dm" && data && (
                  <UserInfoStatusConatiner>
                    <UserInfoStatus>
                      <UserInfoStatusHeading>Games Won</UserInfoStatusHeading>
                      <UserInfoStatusRank>
                        {data?.status.matchesWon}
                      </UserInfoStatusRank>
                    </UserInfoStatus>
                    <UserInfoStatus>
                      <UserInfoStatusHeading>Games loss</UserInfoStatusHeading>
                      <UserInfoStatusRank>
                        {data?.status.matchesLoss}
                      </UserInfoStatusRank>
                    </UserInfoStatus>
                  </UserInfoStatusConatiner>
                )}
              </UserInformation>
            )}
            {type == "dm" && data && (
              <Button
                $text="Play now"
                $size="auto"
                onClick={() => sendGameInvitaionHandler()}
              />
            )}
          </UserInfoWrapper>
        </>
      )}
    </ChatRightSideContainer>
  );
};
export default ChatRightSide;
