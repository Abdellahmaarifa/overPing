import ChatIcon from "assets/common/chat.svg?react";
import DotsIcon from "assets/common/dots.svg?react";
import FriendsIcon from "assets/common/friends.svg?react";
import GamepadIcon from "assets/common/game-pad.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";
import UserAddIcon from "assets/common/user-add.svg?react";
import PendingIcon from "assets/common/pending.svg?react";
import Badge from "assets/profile/badge.png";
import DemoCover from "assets/profile/cover.jpg";
import Onep from "assets/profile/onep.jpg";
import Hexagon from "components/common/Hexagon/Hexagon";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  BannerBadge,
  BannerBadgeGrade,
  BannerBadgeImage,
  BannerConatiner,
  BannerMenuButton,
  BannerMenuConatiner,
  BannerMenuMask,
  ExtraLink,
  ExtraMenu,
  ProfileConatiner,
  ProfileInfo,
  ProfileLevel,
  ProfileName,
} from "./ProfileBanner.style";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSettingsContext } from "context/settings.context";
import { useUserContext } from "context/user.context";
import { useAddFriendMutation, useFindProfileByUserIdQuery } from "gql/index";
import { ProfileType } from "domain/model/Profile.type";
import { FriendshipStatusType } from "domain/model/helpers.type";
import toast, { Toaster } from "react-hot-toast";
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
  const [addFriend] = useAddFriendMutation();
  const {
    settingsModel: [settingModel, setSettingModel],
  } = useSettingsContext();
  const { user } = useUserContext();
  const sendRequest = async () => {
    await toast.promise(
      addFriend({
        variables: {
          userId: Number(user?.id),
          friendId: Number(id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log(data);
          setFriendStatus("PENDING");
          return "your request is done successfuly";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };
  console.log("stsus: ", friendsStatus);
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
              <GamepadIcon
                onClick={() => navigate(`/game/type=friends?id=${profile?.id}`)}
              />
            </BannerMenuButton>
            <BannerMenuButton>
              <ChatIcon onClick={() => navigate(`/chat/dm/${profile?.id}`)} />
            </BannerMenuButton>
            <BannerMenuButton>
              {friendsStatus === "PENDING" ? (
                <PendingIcon />
              ) : friendsStatus === null ? (
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
