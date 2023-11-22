import { faker } from "@faker-js/faker";
import ChatICon from "assets/common/chat.svg?react";
import {
  BioHeader,
  ProfileBadge,
  ProfileBadgeIcon,
  ProfileBadgeInfo,
  ProfileBadgeName,
  ProfileBadgeRank,
  ProfileBio,
  ProfileBioConatiner,
  ProfileInfoBody,
  ProfileInfoConatiner,
  ProfileInfoTab,
  ProfileInfoTabHeader,
  ProfileInfoTabHeading,
  ProfileStatus,
} from "./ProfileInfo.style";
import tw from "twin.macro";
import Achievement from "../Achievement/Achievement";
import ProfileMatchResault from "../ProfileMatchResault/ProfileMatchResault";
import WinIcon from "assets/profile/win-icon.svg?react";
import BestIcon from "assets/profile/best-icon.svg?react";
import GameIcon from "assets/profile/game-icon.svg?react";
import TournamentPlayedIcon from "assets/profile/tournament-played-icon.svg?react";
import TournamentWonIcon from "assets/profile/tournament-won-icon.svg?react";
import React from "react";

const a = tw.div``;

const Badge = ({
  status,
  children,
  rank,
}: {
  status: string;
  rank: number;
  children: JSX.Element;
}) => {
  return (
    <ProfileBadge>
      <ProfileBadgeIcon>{children}</ProfileBadgeIcon>
      <ProfileBadgeInfo>
        <ProfileBadgeRank>10</ProfileBadgeRank>
        <ProfileBadgeName>{status}</ProfileBadgeName>
      </ProfileBadgeInfo>
    </ProfileBadge>
  );
};
const STATUS = [
  "Game Won",
  "Best win streak",
  "Game Played",
  "xp",
  "tournament palyed",
  "tournament won",
];
const ProfileBioInfo = () => {
  return (
    <ProfileInfoConatiner>
      <ProfileInfoTab>
        <ProfileInfoTabHeader
          style={{
            background: "#4C4C57",
          }}
        >
          <ProfileInfoTabHeading
            style={{
              color: "#B4B5CF",
            }}
          >
            Status
          </ProfileInfoTabHeading>
        </ProfileInfoTabHeader>
        <ProfileInfoTabHeader>
          <ProfileInfoTabHeading>About</ProfileInfoTabHeading>
        </ProfileInfoTabHeader>
      </ProfileInfoTab>
      <ProfileInfoBody>
        <ProfileStatus>
          <Badge rank={10} status="Game Won">
            <WinIcon />
          </Badge>
          <Badge rank={10} status="Best Win Streak">
            <BestIcon />
          </Badge>
          <Badge rank={10} status="Game Played">
            <GameIcon />
          </Badge>
          <Badge rank={10} status="xp">
            <WinIcon />
          </Badge>
          <Badge rank={10} status="Tournament played">
            <TournamentPlayedIcon />
          </Badge>
          <Badge rank={10} status="Tournament Won">
            <TournamentWonIcon />
          </Badge>
        </ProfileStatus>
        <ProfileBioConatiner>
          <BioHeader>About</BioHeader>
          <ProfileBio>
            {faker.lorem.paragraph().slice(0, 130).toString()}
          </ProfileBio>
        </ProfileBioConatiner>
        <Achievement />
        <ProfileMatchResault />
      </ProfileInfoBody>
    </ProfileInfoConatiner>
  );
};

export default ProfileBioInfo;
