import { CircularProgressbar } from "react-circular-progressbar";
import tw from "twin.macro";
import ProfileShape from "assets/common/profile-shape.svg?react";
import DemoCover from "assets/profile/cover.jpg";
import Onep from "assets/profile/onep.jpg";
import Badge from "assets/profile/badge.png";
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
import ChatIcon from "assets/common/chat.svg?react";
import FriendsIcon from "assets/common/friends.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";
import Hexagon from "components/common/Hexagon/Hexagon";

const ProfileBanner = () => {
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
        <BannerMenuButton>
          <ChatIcon />
        </BannerMenuButton>
        <BannerMenuButton>
          <FriendsIcon />
        </BannerMenuButton>
        <BannerMenuButton>
          <SettingsIcon />
        </BannerMenuButton>
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
