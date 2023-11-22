import { faker } from "@faker-js/faker";
import Button from "components/common/Button/Button";
import { useEffect, useState } from "react";
import {
  SuggestionBox,
  SuggestionConatiner,
  SuggestionTitle,
  UserAvatar,
  UserCard,
  UserCardInfo,
  UserDetails,
  UserHandle,
  UserName,
} from "./Suffestion.style";
const Suggestions = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(getSuggestUsers());
  }, []);
  return (
    <SuggestionBox>
      <SuggestionTitle>Suggestions to play with</SuggestionTitle>
      <SuggestionConatiner>
        {users.map((user) => (
          <UserCard>
            <UserCardInfo>
              <UserAvatar src={user.avatar} />
              <UserDetails>
                <UserName>{user.userName}</UserName>
                <UserHandle>@{user.userName}</UserHandle>
              </UserDetails>
            </UserCardInfo>
            <Button $size="sm" $text="Invite" />
          </UserCard>
        ))}
      </SuggestionConatiner>
    </SuggestionBox>
  );
};

interface User {
  userName: string;
  avatar: string;
}
const createRandomUsers = (): User => {
  return {
    userName: faker.person.firstName(),
    avatar: faker.image.avatar(),
  };
};

const getSuggestUsers = () =>
  faker.helpers.multiple(createRandomUsers, { count: 3 });
export default Suggestions;
