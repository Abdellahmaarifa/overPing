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
  GetFriendshipRequestsDocument,
  AcceptFriendshipDocument,
  RemoveFriendDocument,
  UnblockUserDocument,
  AddFriendDocument,
} from "gql/index";
import { Suspense, useEffect, useState } from "react";
import { useUserContext } from "context/user.context";
import { useApolloClient } from "@apollo/client";
import { sleep } from "helpers/index";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const FILTERS = {
  ONLINE: "online friends",
  REQUEST: "friens request",
  SUGGESTION: "Suggestion",
  BLOCKED: "Blocked friends",
};
const Friends = () => {
  const [seachValue, setSearchValue] = useState("");
  const [openFilterList, setOpenFilterList] = useState(false);
  const [filter, setFilter] = useState(FILTERS.ONLINE);
  const [friends, setFriends] = useState<User[]>([]);
  const client = useApolloClient();
  const { user } = useUserContext();
  const navigate = useNavigate();
  // const {data} = useGetBlockedUsersSuspenseQuery();

  const getQuery = () => {
    switch (filter) {
      case FILTERS.ONLINE:
        return GetBlockedUsersDocument;
      case FILTERS.REQUEST:
        return GetFriendshipRequestsDocument;
      case FILTERS.SUGGESTION:
        return GetBlockedUsersDocument;
      case FILTERS.BLOCKED:
        return GetBlockedUsersDocument;
      default:
        return GetBlockedUsersDocument;
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
        query: getQuery(),
        variables: {
          userId: Number(user?.id),
        },
        context: {
          fetchOptions: {
            signal: controller.signal,
          },
        },
      })
      .then((data) => {
        if (filter === FILTERS.REQUEST) {
          setFriends(data.data.getFriendshipRequests.friends);
        } else if (filter === FILTERS.BLOCKED)
          setFriends(data.data.getBlockedUsers.friends);
        else {
          setFriends([]);
        }
        console.log("hola: ", data);
      })
      .catch((err) => console.log(err));

    return () => controller.abort();
    //setFriends(getFriends());
  }, [filter]);

  // if (loading) return <h1>loading</h1>;
  const acceptFriendReq = (friend) => async () => {
    // logic here
    await toast.promise(
      client.mutate({
        mutation: AcceptFriendshipDocument,
        variables: {
          userId: Number(user?.id),
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
        mutation: RemoveFriendDocument,
        variables: {
          userId: Number(user?.id),
          friendId: Number(friend.id),
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
        mutation: AddFriendDocument,
        variables: {
          userId: Number(user?.id),
          friendId: Number(friend.id),
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
          userId: Number(user?.id),
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

  const getPrimaryAction = (friend: User) => {
    switch (filter) {
      case FILTERS.ONLINE:
        return {
          name: "Match",
          func: () => {
            navigate(`/game?type=friends?id=${friend.id}`);
          },
        };
      case FILTERS.REQUEST:
        return { name: "Accept Friend", func: acceptFriendReq(friend) };
      case FILTERS.SUGGESTION:
        return { name: "Add friend", func: sendFriendReq(friend) };
      case FILTERS.BLOCKED:
        return { name: "Unblock", func: unclockFriend(friend) };
      default:
        return {
          name: "Match",
          func: () => {
            navigate(`/game?type=friends?id=${friend.id}`);
          },
        };
    }
  };
  const getSecondaryAction = (friend) => {
    switch (filter) {
      case FILTERS.ONLINE:
        return {
          name: "Message",
          func: () => {
            navigate(`/chat/dm/${friend.id}`);
          },
        };
      case FILTERS.REQUEST:
        return { name: "Cancel", func: cancelFriendReq(friend) };
      case FILTERS.SUGGESTION:
        return {
          name: "Remove",
          func: () => {
            clearFriend(friend);
          },
        };
      case FILTERS.BLOCKED:
        return { name: "", func: () => {} };
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
                {FILTERS.ONLINE}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.REQUEST}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.SUGGESTION}
              </FilterListItem>
              <FilterListItem onClick={handleFilter}>
                {FILTERS.BLOCKED}
              </FilterListItem>
            </FilterList>
          )}
        </FriendsFilter>
      </FriendsFilterConatiner>
      <FriendList>
        {friendsData.map((friend, id) => (
          <UserProfile
            key={id}
            primaryAction={getPrimaryAction(friend)}
            secondaryAction={getSecondaryAction(friend)}
            name={friend.username}
            image={friend.profileImgUrl}
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
