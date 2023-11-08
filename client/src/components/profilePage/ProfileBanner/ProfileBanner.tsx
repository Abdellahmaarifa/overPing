import ChatIcon from "assets/common/chat.svg?react";
import DotsIcon from "assets/common/dots.svg?react";
import FriendsIcon from "assets/common/friends.svg?react";
import GamepadIcon from "assets/common/game-pad.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";
import UserAddIcon from "assets/common/user-add.svg?react";
import Badge from "assets/profile/badge.png";
import DemoCover from "assets/profile/cover.jpg";
import Onep from "assets/profile/onep.jpg";
import Hexagon from "components/common/Hexagon/Hexagon";
import { useState } from "react";
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

const ProfileBanner = () => {
  const [userProfile, setUserProfile] = useState(true);
  return (
    <BannerConatiner
      style={{
        background: `linear-gradient(90deg, rgba(128, 12, 52, 0.7) 0%, rgb(16, 85, 138, .7) 100%), url(${DemoCover}) center center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <BannerBadge>
        <BannerBadgeImage>
          <img src={Badge} />
        </BannerBadgeImage>
        <BannerBadgeGrade>#234</BannerBadgeGrade>
      </BannerBadge>
      <BannerMenuConatiner>
        <BannerMenuMask id="mask"></BannerMenuMask>
        {userProfile ? (
          <>
            <BannerMenuButton>
              <ChatIcon />
            </BannerMenuButton>
            <BannerMenuButton>
              <FriendsIcon />
            </BannerMenuButton>
            <BannerMenuButton>
              <SettingsIcon />
            </BannerMenuButton>
          </>
        ) : (
          <>
            <BannerMenuButton>
              <GamepadIcon />
            </BannerMenuButton>
            <BannerMenuButton>
              <ChatIcon />
            </BannerMenuButton>
            <BannerMenuButton>
              <UserAddIcon />
            </BannerMenuButton>
            <BannerMenuButton>
              <DotsIcon />
              <ExtraMenu>
                <ExtraLink>Block friend</ExtraLink>
                <ExtraLink>remove friend</ExtraLink>
              </ExtraMenu>
            </BannerMenuButton>
          </>
        )}
      </BannerMenuConatiner>

      <ProfileConatiner>
        <Hexagon Image={Onep} outline={true} />
        <ProfileInfo>
          <ProfileName>abdellah</ProfileName>
          <ProfileLevel>Level : 5</ProfileLevel>
        </ProfileInfo>
      </ProfileConatiner>
    </BannerConatiner>
  );
};

export default ProfileBanner;
