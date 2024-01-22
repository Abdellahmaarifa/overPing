import SearchIcon from "assets/common/search.svg?react";
import DownIcon from "assets/common/select-down.svg?react";
import {
  FilterList,
  FilterListItem,
  FriendList,
  FriendSearch,
  FriendSearchIcon,
  FriendsConatiner,
  FriendsFilter,
  FriendsFilterConatiner,
  FriendsFilterHeader,
  FriendsSearchConatiner,
} from "./Friends.style";
import { faker } from "@faker-js/faker";
import UserProfile from "components/friends/UserProfile/UserProfile";
import {
  useGetBlockedUsersQuery,
  GetBlockedUsersDocument,
  useGetBlockedUsersSuspenseQuery,
  UnblockUserDocument,
  GetFriendsRequestsDocument,
  UnfriendUserDocument,
  SendFriendRequestDocument,
  AcceptFriendRequestDocument,
  FindAllUsersDocument,
  GetOnlineFriendsDocument,
  CancelFriendRequestDocument,
  GetSuggestedFriendsDocument,
  useSendRequestToPlayMutation,
} from "gql/index";
import { Suspense, useEffect, useState } from "react";
import { useUserContext } from "context/user.context";
import { useApolloClient } from "@apollo/client";
import { playWithUser, sleep } from "helpers/index";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { query } from "express";
const FILTERS = {
  ALL: { name: "All users", query: "all" },
  ONLINE: { name: "online friends", query: "online" },
  REQUEST: { name: "friens request", query: "requests" },
  SUGGESTION: { name: "Suggestion", query: "suggestion" },
  BLOCKED: { name: "Blocked friends", query: "blocked" },
};
const Friends = () => {
  const [seachValue, setSearchValue] = useState("");
  const [openFilterList, setOpenFilterList] = useState(false);
  const [filter, setFilter] = useState(FILTERS.ALL.name);
  const [friends, setFriends] = useState<User[]>([]);
  const client = useApolloClient();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // const {data} = useGetBlockedUsersSuspenseQuery();

  const getQuery = () => {
    switch (filter) {
      case FILTERS.ONLINE.name:
        return {
          query: GetOnlineFriendsDocument,
          variables: {
            pageNumber: 1,
            limit: 40,
          },
        };
      case FILTERS.REQUEST.name:
        return { query: GetFriendsRequestsDocument };
      case FILTERS.SUGGESTION.name:
        return {
          query: GetSuggestedFriendsDocument,
          variables: {
            pageNumber: 1,
            limit: 40,
          },
        };
      case FILTERS.BLOCKED.name:
        return { query: GetBlockedUsersDocument };
      case FILTERS.ALL.name:
        return { query: FindAllUsersDocument };
      default:
        return { query: FindAllUsersDocument };
    }
  };

  const clearFriend = (friend: User) => {
    const newFriendList = friends.filter((el) => el.id != friend.id);
    setFriends(newFriendList);
  };

  useEffect(() => {
    // get firnds based on the filter!
    const controller = new AbortController();
    client
      .query({
        ...getQuery(),
        context: {
          fetchOptions: {
            signal: controller.signal,
          },
        },
      })
      .then((data) => {
        if (filter === FILTERS.REQUEST.name) {
          setFriends(data.data.getFriendsRequests);
        } else if (filter === FILTERS.BLOCKED.name)
          setFriends(data.data.getBlockedUsers);
        else if (filter === FILTERS.SUGGESTION.name)
          setFriends(data.data.getSuggestedFriends);
        else if (filter === FILTERS.ONLINE.name) {
          setFriends(data.data.getOnlineFriends);
        } else if (filter === FILTERS.ALL.name) {
          setFriends(data.data.findAllUsers);
        } else {
          setFriends([]);
        }
        console.log("hola >> : ", data);
      })
      .catch((err) => console.log(err));

    return () => controller.abort();
    //setFriends(getFriends());
  }, [filter]);

  useEffect(() => {
    const urlQuery = searchParams.get("filter");
    if (urlQuery == FILTERS.BLOCKED.query) setFilter(FILTERS.BLOCKED.name);
    else if (urlQuery == FILTERS.SUGGESTION.query)
      setFilter(FILTERS.SUGGESTION.name);
    else if (urlQuery == FILTERS.ONLINE.query) setFilter(FILTERS.ONLINE.name);
    else if (urlQuery == FILTERS.REQUEST.query) setFilter(FILTERS.REQUEST.name);
  }, []);
  // if (loading) return <h1>loading</h1>;
  const acceptFriendReq = (friend) => async () => {
    // logic here
    await toast.promise(
      client.mutate({
        mutation: AcceptFriendRequestDocument,
        variables: {
          friendId: Number(friend.id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log("well done!", data);
          // delete the user from the current list
          clearFriend(friend);
          return "Friend request accepted";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };

  const cancelFriendReq = (friend) => async () => {
    await toast.promise(
      client.mutate({
        mutation: CancelFriendRequestDocument,
        variables: {
          requester: Number(friend.id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log("well done!", data);
          // delete the user from the current list
          clearFriend(friend);
          return "Friend request canceled";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };

  const sendFriendReq = (friend) => async () => {
    await toast.promise(
      client.mutate({
        mutation: SendFriendRequestDocument,
        variables: {
          receiverId: Number(friend.id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log("well done!", data);
          // delete the user from the current list
          clearFriend(friend);
          return "Friend request sent";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };

  const handleFilter = (e: any) => {
    setFilter(e.target.innerHTML);
    setOpenFilterList(false);
  };

  const unclockFriend = (friend: User) => async () => {
    await toast.promise(
      client.mutate({
        mutation: UnblockUserDocument,
        variables: {
          unblockedUserId: Number(friend.id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          clearFriend(friend);
          console.log("well done!", data);
          return "user unblocked successfully";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };

  const unfriendUser = (friend: User) => async () => {
    await toast.promise(
      client.mutate({
        mutation: UnfriendUserDocument,
        variables: {
          friendId: Number(friend.id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          clearFriend(friend);
          console.log("well done!", data);
          return "user unblocked successfully";
        },
        error: (err) => {
          console.log(err);
          return "something went wrong.";
        },
      }
    );
  };
  const [sendGameInvitaion] = useSendRequestToPlayMutation();

  const sendGameInvitaionHandler = async (id) => {
    toast.promise(playWithUser(Number(id), sendGameInvitaion), {
      loading: "please wait ..",
      success: (data: string) => data,
      error: (err: string) => err,
    });
  };
  const getPrimaryAction = (friend: User) => {
    switch (filter) {
      case FILTERS.ONLINE.name:
        return {
          name: "Match",
          func: () => sendGameInvitaionHandler(friend.id),
        };
      case FILTERS.REQUEST.name:
        return { name: "Accept Friend", func: acceptFriendReq(friend) };
      case FILTERS.SUGGESTION.name:
        return { name: "Add friend", func: sendFriendReq(friend) };
      case FILTERS.BLOCKED.name:
        return { name: "Unblock", func: unclockFriend(friend) };
      case FILTERS.ALL.name:
        return {
          name: "View Profile",
          func: () => {
            navigate(`/profile/${friend.id}`);
          },
        };
      default:
        return {
          name: "Match",
          func: () => sendGameInvitaionHandler(friend.id),
        };
    }
  };
  const getSecondaryAction = (friend) => {
    switch (filter) {
      case FILTERS.ONLINE.name:
        return {
          name: "Message",
          func: () => {
            navigate(`/chat/dm/${friend.id}`);
          },
        };
      case FILTERS.REQUEST.name:
        return { name: "Cancel", func: cancelFriendReq(friend) };
      case FILTERS.SUGGESTION.name:
        return {
          name: "Remove",
          func: () => clearFriend(friend),
        };
      case FILTERS.BLOCKED.name:
        return { name: "", func: () => {} };
      case FILTERS.ALL.name:
        return {
          name: "Message",
          func: () => {
            navigate(`/chat/dm/${friend.id}`);
          },
        };
      default:
        return {
          name: "Message",
          func: () => {
            navigate(`/chat/dm/${friend.id}`);
          },
        };
    }
  };

  let friendsData = friends;
  if (seachValue) {
    friendsData = friends.filter((e) =>
      e.username.toLowerCase().includes(seachValue.toLowerCase())
    );
  }
  return (
    <FriendsConatiner onClick={() => setOpenFilterList(false)}>
      <FriendsFilterConatiner>
        <FriendsSearchConatiner>
          <FriendSearch
            placeholder="Search"
            maxLength={30}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FriendSearchIcon>
            <SearchIcon />
          </FriendSearchIcon>
        </FriendsSearchConatiner>
        <FriendsFilter
          onClick={(e) => {
            setOpenFilterList(!openFilterList);
            e.stopPropagation();
          }}
        >
          <FriendsFilterHeader>{filter}</FriendsFilterHeader>
          <DownIcon />
          {openFilterList && (
            <FilterList>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.ALL.name}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.ONLINE.name}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.REQUEST.name}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.SUGGESTION.name}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.BLOCKED.name}
              </FilterListItem>
            </FilterList>
          )}
        </FriendsFilter>
      </FriendsFilterConatiner>
      <FriendList>
        {friendsData.map((friend, id) => (
          <UserProfile
            onClick={() => navigate(`/profile/${friend.id}`)}
            key={id}
            primaryAction={getPrimaryAction(friend)}
            secondaryAction={getSecondaryAction(friend)}
            name={friend.username}
            image={encodeURI(friend.profileImgUrl)}
          />
        ))}
      </FriendList>
      <Toaster position="top-center" />
    </FriendsConatiner>
  );
};

interface User {
  id: string;
  username: string;
  profileImgUrl: string;
}

const createRandomUser = (): User => {
  return {
    id: faker.string.uuid(),
    username: faker.person.firstName(),
    profileImgUrl: faker.image.urlPicsumPhotos(),
  };
};
const getFriends = (): User[] =>
  faker.helpers.multiple(createRandomUser, { count: 30 });
export default Friends;
