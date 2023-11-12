import SearchIcon from "assets/common/search.svg?react";
import DownIcon from "assets/common/select-down.svg?react";
import Button from "components/common/Button/Button";
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
import { useEffect, useState } from "react";
import UserProfile from "components/friends/UserProfile/UserProfile";
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

  useEffect(() => {
    setFriends(getFriends());
  }, [filter]);

  console.log(seachValue);
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
            name={friend.name}
            image={friend.image}
          />
        ))}
      </FriendList>
    </FriendsConatiner>
  );
};

interface User {
  name: string;
  image: string;
}

const createRandomUser = (): User => {
  return {
    name: faker.person.firstName(),
    image: faker.image.urlPicsumPhotos(),
  };
};
const getFriends = (): User[] =>
  faker.helpers.multiple(createRandomUser, { count: 30 });
export default Friends;
