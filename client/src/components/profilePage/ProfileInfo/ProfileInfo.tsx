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

const a = tw.div``;
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
          {STATUS.map((status) => (
            <ProfileBadge>
              <ProfileBadgeIcon>
                <ChatICon fill="red" />
              </ProfileBadgeIcon>
              <ProfileBadgeInfo>
                <ProfileBadgeRank>10</ProfileBadgeRank>
                <ProfileBadgeName>{status}</ProfileBadgeName>
              </ProfileBadgeInfo>
            </ProfileBadge>
          ))}
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
