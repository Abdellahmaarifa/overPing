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
import {
  FindChanneMemebersDocument,
  useBanMemberMutation,
  useKickMemberMutation,
  useMuteMemberMutation,
  useUnmuteMemberMutation,
} from "gql/index";
import tw from "twin.macro";
import MuteIcon from "assets/chat/mute.svg?react";
import KickIcon from "assets/chat/kick.svg?react";
import BanIcon from "assets/chat/ban.svg?react";
import UnmuteIcon from "assets/chat/unmute.svg?react";
import toast from "react-hot-toast";
import { useChatContext } from "context/chat.context";
import { ChannelSampleMember } from "domain/model/chat.type";
interface MemberType {
  profileImgUrl: string;
  id: number;
  username: string;
}

const ActioneMemeber = ({ e }: { e: any }) => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [KickUserMutation] = useKickMemberMutation();
  const [muteMemberMutation] = useMuteMemberMutation();
  const [banMemberMutation] = useBanMemberMutation();
  const [unmuteUserMutation] = useUnmuteMemberMutation();
  const kickUser = async (targetId, name) => {
    try {
      console.log("kicking this user");
      const res = await KickUserMutation({
        variables: {
          data: {
            channelId: Number(id),
            userId: Number(user?.id),
            targetId: Number(targetId),
          },
        },
      });
      if (res) toast.success(`${name} is out now!`);
      console.log("done! muted: ", res);
    } catch (err: any) {
      console.log("error!");
      toast.error(err.message ? err.message : "something went wrong!");
    }
  };

  const muteUser = async (targetId, name) => {
    try {
      console.log("muting this user");
      const res = await muteMemberMutation({
        variables: {
          data: {
            channelId: Number(id),
            muteTimeLimit: 1,
            userId: Number(user?.id),
            targetId: Number(targetId),
          },
        },
      });
      if (res) toast.success(`${name} is muted now!`);
      console.log("done! muted: ", res);
    } catch (err: any) {
      console.log("error!");
      toast.error(err.message ? err.message : "something went wrong!");
    }
  };

  const unmuteUser = async (targetId, name) => {
    try {
      console.log("muting this user");
      const res = await unmuteUserMutation({
        variables: {
          data: {
            channelId: Number(id),
            muteTimeLimit: 10,
            userId: Number(user?.id),
            targetId: Number(targetId),
          },
        },
      });
      if (res) toast.success(`${name} is muted now!`);
      console.log("done! muted: ", res);
    } catch (err: any) {
      console.log("error!");
      toast.error(err.message ? err.message : "something went wrong!");
    }
  };

  const banUser = async (targetId, name) => {
    try {
      console.log("baning this user");
      const res = await banMemberMutation({
        variables: {
          data: {
            channelId: Number(id),
            userId: Number(user?.id),
            targetId: Number(targetId),
          },
        },
      });
      if (res) toast.success(`${name} is banned now!`);
      console.log("done! muted: ", res);
    } catch (err: any) {
      console.log("error!");
      toast.error(err.message ? err.message : "something went wrong!");
    }
  };
  return (
    <div tw="absolute top-[10px] right-0 flex justify-center items-center gap-[5px]">
      <div tw="w-[20px] h-[20px] ">
        {e.muteStatus ? (
          <UnmuteIcon
            tw="w-full h-full fill-[#B4B5CF]"
            onClick={(_event) => unmuteUser(e.id, e.username)}
          />
        ) : (
          <MuteIcon
            tw="w-full h-full fill-[#B4B5CF]"
            onClick={(_event) => muteUser(e.id, e.username)}
          />
        )}
      </div>
      <div tw="w-[20px] h-[20px] ">
        <KickIcon
          tw="w-full h-full fill-[#B4B5CF]"
          onClick={(_event) => kickUser(e.id, e.username)}
        />
      </div>
      <div tw="w-[20px] h-[20px] ">
        <BanIcon
          tw="w-full h-full fill-[#B4B5CF]"
          onClick={(_event) => banUser(e.id, e.username)}
        />
      </div>
    </div>
  );
};
const ChannelMembers = () => {
  const client = useApolloClient();
  const [members, setMembers] = useState<ChannelSampleMember[] | []>([]);
  const [owner, setOwner] = useState<ChannelSampleMember[] | []>([]);
  const [admins, setAdmins] = useState<ChannelSampleMember[] | []>([]);

  const { id } = useParams();
  const { user } = useUserContext();
  const {
    currentChannel: [currentChannel, setCurrentChannel],
  } = useChatContext();
  const [role, setRole] = useState<"owner" | "admin" | "member">("member");
  const getMembers = async () => {
    if (currentChannel) {
      setOwner([
        currentChannel.admins.find(
          (e) => Number(e.id) == currentChannel.owner_id
        ),
      ] as ChannelSampleMember[]);
      setAdmins(
        (currentChannel.admins as ChannelSampleMember[]).filter(
          (e) => Number(e.id) !== currentChannel.owner_id
        )
      );
      setMembers(currentChannel.members);
      if (currentChannel.owner_id === Number(user?.id)) setRole("owner");
      else {
        if (currentChannel.admins.find((e) => e.id == user?.id)) {
          setRole("admin");
        }
      }
    }
  };
  useEffect(() => {
    getMembers();
  }, [currentChannel]);

  /*
"data": {
    "channelId": null,
    "muteTimeLimit": null,
    "password": null,
    "userId": null,
    "targetId": null
  },

*/
  console.log("my role is : ", role, currentChannel);
  return (
    <ChannelMembersContainer>
      <ChannelMembersSearch>
        <ChannelMembersSearchInput
          maxLength={35}
          placeholder="@ UserName"
          onChange={(event) => {
            if (currentChannel) {
              setOwner(
                currentChannel.admins
                  .filter((e) => Number(e.id) == currentChannel.owner_id)
                  .filter((e) => e.username.includes(event?.target.value))
              );
              setAdmins(
                currentChannel.admins
                  .filter((e) => Number(e.id) != currentChannel.owner_id)
                  .filter((e) => e.username.includes(event?.target.value))
              );

              setMembers(
                currentChannel.members.filter((e) =>
                  e.username.includes(event?.target.value)
                )
              );
            }
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
            {currentChannel
              ? owner.map((e) => {
                  return (
                    <ChannelMember>
                      <ChannelMemberPhoto src={e?.profileImgUrl} />
                      <ChannelMemberName>{e.username}</ChannelMemberName>
                    </ChannelMember>
                  );
                })
              : []}
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Admin</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            {currentChannel
              ? admins.map((e: any) => {
                  return (
                    <ChannelMember key={e.id}>
                      <ChannelMemberPhoto src={e.profileImgUrl} />
                      <ChannelMemberName>{e.username}</ChannelMemberName>

                      {(role === "admin" || role === "owner") &&
                        e.id != user?.id && <ActioneMemeber e={e} />}
                    </ChannelMember>
                  );
                })
              : []}
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
        <ChannelMembersGroup>
          <ChannelMembersGroupHeader>Members</ChannelMembersGroupHeader>
          <ChannelMembersGroupBody>
            {currentChannel
              ? members.map((e: ChannelSampleMember) => {
                  return (
                    <ChannelMember key={e.id}>
                      <ChannelMemberPhoto
                        src={e.profileImgUrl}
                        muted={e.muteStatus}
                      />
                      <ChannelMemberName muted={e.muteStatus}>
                        {e.username}
                      </ChannelMemberName>

                      {(role === "admin" || role === "owner") &&
                        e.id != user?.id && <ActioneMemeber e={e} />}
                    </ChannelMember>
                  );
                })
              : []}
          </ChannelMembersGroupBody>
        </ChannelMembersGroup>
      </ChannelMembersBody>
    </ChannelMembersContainer>
  );
};

export default ChannelMembers;
