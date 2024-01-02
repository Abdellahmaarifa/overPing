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
} from "gql/index";
import { Suspense, useEffect, useState } from "react";
import { useUserContext } from "context/user.context";
import { useApolloClient } from "@apollo/client";
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
  useEffect(() => {
    // get firnds based on the filter!

    client
      .query({
        query: getQuery(),
        variables: {
          userId: Number(user?.id),
        },
      })
      .then((data) => {
        if (filter === FILTERS.REQUEST)
          setFriends(data.data.getFriendshipRequests.friends);
        if (filter === FILTERS.BLOCKED)
          setFriends(data.data.getBlockedUsers.friends);
        console.log("hola: ", data);
      })
      .catch((err) => console.log(err));

    //setFriends(getFriends());
  }, [filter]);

  // if (loading) return <h1>loading</h1>;

  const handleFilter = (e: any) => {
    setFilter(e.target.innerHTML);
    setOpenFilterList(false);
  };
  const getPrimaryAction = () => {
    switch (filter) {
      case FILTERS.ONLINE:
        return "Match";
      case FILTERS.REQUEST:
        return "Accept Friend";
      case FILTERS.SUGGESTION:
        return "Add friend";
      case FILTERS.BLOCKED:
        return "Unblock";
      default:
        return "Match";
    }
  };
  const getSecondaryAction = () => {
    switch (filter) {
      case FILTERS.ONLINE:
        return "Message";
      case FILTERS.REQUEST:
        return "Cancel";
      case FILTERS.SUGGESTION:
        return "Remove";
      case FILTERS.BLOCKED:
        return "";
      default:
        return "Message";
    }
  };

  let friendsData = friends;
  if (seachValue) {
    friendsData = friends.filter((e) =>
      e.name.toLowerCase().includes(seachValue.toLowerCase())
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
        {friendsData.map((friend) => (
          <UserProfile
            primaryAction={getPrimaryAction()}
            secondaryAction={getSecondaryAction()}
            name={friend.username}
            image={friend.profileImgUrl}
          />
        ))}
      </FriendList>
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
