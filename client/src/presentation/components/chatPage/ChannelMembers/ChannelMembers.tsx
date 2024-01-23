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
import { memo, useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useUserContext } from "context/user.context";
import { FindChanneMemebersDocument } from "gql/index";

interface MemberType {
  profileImgUrl: string;
  id: number;
  username: string;
}

const ChannelMembers = () => {
  const client = useApolloClient();
  const { id } = useParams();
  const { user } = useUserContext();
  const [members, setMembers] = useState<MemberType[] | []>([]);
  const [owner, setOwner] = useState<MemberType[] | []>([]);
  const [admins, setAdmins] = useState<MemberType[] | []>([]);
  const [membersRep, setMembersRep] = useState<MemberType[] | []>([]);
  const [ownerRep, setOwnerRep] = useState<MemberType[] | []>([]);
  const [adminsRep, setAdminsRep] = useState<MemberType[] | []>([]);
  const getMembers = async () => {
    const resChannel = await client.query({
      query: FindChanneMemebersDocument,
      variables: {
        userId: Number(user?.id),
        groupId: Number(id),
      },
    });
    console.log("thsi is res of mmebers: ", resChannel);
    const { owner_id, admins, members } = resChannel.data.findChannelById;
    setOwner([
      (admins as MemberType[]).find((e) => e.id === owner_id) as MemberType,
    ]);
    setAdmins((admins as MemberType[]).filter((e) => e.id !== owner_id));
    setMembers(members);
    setOwnerRep([
      (admins as MemberType[]).find((e) => e.id === owner_id) as MemberType,
    ]);
    setAdminsRep((admins as MemberType[]).filter((e) => e.id !== owner_id));
    setMembersRep(members);
  };
  useEffect(() => {
    getMembers();
  }, []);
  return (
    <ChannelMembersContainer>
      <ChannelMembersSearch>
        <ChannelMembersSearchInput
          maxLength={35}
          placeholder="@ UserName"
          onChange={(event) => {
            setOwner(
              ownerRep.filter((e) => e.username.includes(event?.target.value))
            );
            setAdmins(
              adminsRep.filter((e) => e.username.includes(event?.target.value))
            );

            setMembers(
              membersRep.filter((e) => e.username.includes(event?.target.value))
            );
          }}
        />
        <ChannelMembersSearchIcon>
          <SearchIcon />
        </ChannelMembersSearchIcon>
      </ChannelMembersSearch>
      <ChannelMembersBody>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Owner</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            {owner.map((e) => {
              return (
                <ChannelMember>
                  <ChannelMemberPhoto src={e?.profileImgUrl} />
                  <ChannelMemberName>{e.username}</ChannelMemberName>
                </ChannelMember>
              );
            })}
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Admin</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            {admins.map((e: MemberType) => {
              return (
                <ChannelMember key={e.id}>
                  <ChannelMemberPhoto src={e.profileImgUrl} />
                  <ChannelMemberName>{e.username}</ChannelMemberName>
                </ChannelMember>
              );
            })}
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Members</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            {members.map((e: MemberType) => {
              return (
                <ChannelMember key={e.id}>
                  <ChannelMemberPhoto src={e.profileImgUrl} />
                  <ChannelMemberName>{e.username}</ChannelMemberName>
                </ChannelMember>
              );
            })}
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
      </ChannelMembersBody>
    </ChannelMembersContainer>
  );
};

export default ChannelMembers;
