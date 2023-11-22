import { faker } from "@faker-js/faker";
import {
  Friend,
  FriendImage,
  FriendInfo,
  FriendListContainer,
  FriendMenu,
  FriendName,
  FriendUserName,
  FriendListWrapper,
} from "./FriendList.style";
import { useEffect, useState } from "react";
import DotsIcon from "assets/common/dots.svg?react";
import Button from "components/common/Button/Button";
import { useNavigate } from "react-router-dom";
const FriendList = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setFriends(getFriends());
  }, []);

  return (
    <FriendListContainer>
      <FriendListWrapper>
        {friends.map((friend) => (
          <Friend>
            <FriendImage>
              <img src={friend.image} alt="" />
            </FriendImage>
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <FriendUserName>{friend.userName}</FriendUserName>
            </FriendInfo>
            <FriendMenu>
              <DotsIcon />
            </FriendMenu>
          </Friend>
        ))}
      </FriendListWrapper>
      <Button
        $text="See more"
        $transparent={true}
        onClick={() => navigate("/friends")}
      />
    </FriendListContainer>
  );
};

// fake some data
interface User {
  name: string;
  userName: string;
  image: string;
}
const createFriend = (): User => {
  return {
    name: faker.person.firstName(),
    userName: faker.person.middleName(),
    image: faker.image.avatar(),
  };
};

const getFriends = (): User[] =>
  faker.helpers.multiple(createFriend, { count: 19 });

export default FriendList;
