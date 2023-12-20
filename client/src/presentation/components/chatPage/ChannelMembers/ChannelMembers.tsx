import { faker } from "@faker-js/faker";
import {
  ChannelMember,
  ChannelMemberName,
  ChannelMemberPhoto,
  ChannelMembersBody,
  ChannelMembersContainer,
  ChannelMembersGroup,
  ChannelMembersGroupBody,
  ChannelMembersGroupHeader,
  ChannelMembersSearch,
  ChannelMembersSearchIcon,
  ChannelMembersSearchInput,
} from "./ChannelMembers.style";
import SearchIcon from "assets/common/search.svg?react";

const ChannelMembers = () => {
  return (
    <ChannelMembersContainer>
      <ChannelMembersSearch>
        <ChannelMembersSearchInput maxLength={35} placeholder="@ UserName" />
        <ChannelMembersSearchIcon>
          <SearchIcon />
        </ChannelMembersSearchIcon>
      </ChannelMembersSearch>
      <ChannelMembersBody>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Owner</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            <ChannelMember>
              <ChannelMemberPhoto src={faker.image.avatar()} />
              <ChannelMemberName>Salma</ChannelMemberName>
            </ChannelMember>
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Admin</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            <ChannelMember>
              <ChannelMemberPhoto src={faker.image.avatar()} />
              <ChannelMemberName>Salma</ChannelMemberName>
            </ChannelMember>
            <ChannelMember>
              <ChannelMemberPhoto src={faker.image.avatar()} />
              <ChannelMemberName>Salma</ChannelMemberName>
            </ChannelMember>
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Members</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            <ChannelMember>
              <ChannelMemberPhoto src={faker.image.avatar()} />
              <ChannelMemberName>Salma</ChannelMemberName>
            </ChannelMember>
            <ChannelMember>
              <ChannelMemberPhoto src={faker.image.avatar()} />
              <ChannelMemberName>Salma</ChannelMemberName>
            </ChannelMember>
            <ChannelMember>
              <ChannelMemberPhoto src={faker.image.avatar()} />
              <ChannelMemberName>Salma</ChannelMemberName>
            </ChannelMember>
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
      </ChannelMembersBody>
    </ChannelMembersContainer>
  );
};

export default ChannelMembers;
