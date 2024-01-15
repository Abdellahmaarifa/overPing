import ChatIcon from "assets/common/chat.svg?react";
import DotsIcon from "assets/common/dots.svg?react";
import FriendsIcon from "assets/common/friends.svg?react";
import GamepadIcon from "assets/common/game-pad.svg?react";
import PendingIcon from "assets/common/pending.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";
import UserAddIcon from "assets/common/user-add.svg?react";
import Badge from "assets/profile/badge.png";
import Hexagon from "components/common/Hexagon/Hexagon";
import { useSettingsContext } from "context/settings.context";
import { useUserContext } from "context/user.context";
import { ProfileType } from "domain/model/Profile.type";
import { FriendshipStatusType } from "domain/model/helpers.type";
import {
  useSendFriendRequestMutation,
  useSendRequestToPlayMutation,
} from "gql/index";
import { Dispatch, SetStateAction } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  BannerBadge,
  BannerBadgeGrade,
  BannerBadgeImage,
  BannerConatiner,
  BannerMenuButton,
  BannerMenuConatiner,
  BannerMenuMask,
  ProfileConatiner,
  ProfileInfo,
  ProfileLevel,
  ProfileName,
} from "./ProfileBanner.style";
const ProfileBanner = ({
  showExtraMenu,
  setShowExtraMenu,
  isUserProfile,
  profile,
  friendsStatus,
  setFriendStatus,
  id,
}: {
  showExtraMenu: boolean;
  setShowExtraMenu: Dispatch<SetStateAction<boolean>>;
  isUserProfile: boolean;
  profile: ProfileType | null;
  friendsStatus: FriendshipStatusType | null;
  setFriendStatus: Dispatch<SetStateAction<FriendshipStatusType | null>>;
  id: Number;
}) => {
  const navigate = useNavigate();
  const [addFriend] = useSendFriendRequestMutation();
  const [sendGameInvitaion] = useSendRequestToPlayMutation();

  const {
    settingsModel: [settingModel, setSettingModel],
  } = useSettingsContext();
  const { user } = useUserContext();
  const sendRequest = async () => {
    await toast.promise(
      addFriend({
        variables: {
          receiverId: Number(id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log(data);
          setFriendStatus("REQUEST_SENT");
          return "your request is done successfuly";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };
  // console.log("stsus: ", friendsStatus);

  const sendGameInvitaionHandler = () => {
    const data = sendGameInvitaion({
      variables: {
        JoinMatchmakingInput: {
          recipientId: Number(profile?.id),
          matchType: "classic",
        },
      },
    });
    console.log(data);
  };
  return (
    <BannerConatiner
      style={{
        background: `linear-gradient(90deg, rgba(128, 12, 52, 0.7) 0%, rgb(16, 85, 138, .7) 100%), url(${profile?.cover}) center center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <BannerBadge>
        <BannerBadgeImage>
          <img src={Badge} />
        </BannerBadgeImage>
        <BannerBadgeGrade>#{profile?.rank}</BannerBadgeGrade>
      </BannerBadge>
      <BannerMenuConatiner>
        <BannerMenuMask id="mask"></BannerMenuMask>
        {isUserProfile ? (
          <>
            <BannerMenuButton>
              <ChatIcon onClick={() => navigate("/chat")} />
            </BannerMenuButton>
            <BannerMenuButton>
              <FriendsIcon onClick={() => navigate("/friends")} />
            </BannerMenuButton>
            <BannerMenuButton>
              <SettingsIcon onClick={() => setSettingModel(true)} />
            </BannerMenuButton>
          </>
        ) : (
          <>
            <BannerMenuButton>
              <GamepadIcon onClick={() => sendGameInvitaionHandler()} />
            </BannerMenuButton>
            <BannerMenuButton>
              <ChatIcon onClick={() => navigate(`/chat/dm/${profile?.id}`)} />
            </BannerMenuButton>
            <BannerMenuButton>
              {friendsStatus === "REQUEST_RECEIVED" ||
              friendsStatus === "REQUEST_SENT" ? (
                <PendingIcon />
              ) : friendsStatus === "NOT_FRIENDS" ? (
                <UserAddIcon onClick={() => sendRequest()} />
              ) : null}
            </BannerMenuButton>
            <BannerMenuButton>
              <DotsIcon onClick={() => setShowExtraMenu(!showExtraMenu)} />
            </BannerMenuButton>
          </>
        )}
      </BannerMenuConatiner>

      <ProfileConatiner>
        <Hexagon
          Image={profile?.avatar}
          outline={true}
          percentage={profile?.level!}
        />
        <ProfileInfo>
          <ProfileName>{profile?.nickname}</ProfileName>
          <ProfileLevel>Level : {profile?.level}</ProfileLevel>
        </ProfileInfo>
      </ProfileConatiner>
      <Toaster position="top-center" />
    </BannerConatiner>
  );
};

export default ProfileBanner;
