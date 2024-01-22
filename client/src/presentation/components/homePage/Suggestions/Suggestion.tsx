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
import {
  GetSuggestedFriendsDocument,
  useSendRequestToPlayMutation,
} from "gql/index";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { playWithUser } from "helpers/index";
const Suggestions = () => {
  const [users, setUsers] = useState<User[]>([]);
  const client = useApolloClient();
  const navigate = useNavigate();
  const [sendGameInvitaion] = useSendRequestToPlayMutation();

  useEffect(() => {
    //setUsers(getSuggestUsers());
    client
      .query({
        query: GetSuggestedFriendsDocument,
        variables: { limit: 3 },
      })
      .then((data) => {
        setUsers(data.data.getSuggestedFriends);
      })
      .catch((err) => {
        console.log("Error! from suggested friends! ", err);
      });
  }, [users]);

  const sendGameInvite = async (user: User) => {
    toast.promise(playWithUser(Number(user?.id), sendGameInvitaion), {
      loading: "please wait ..",
      success: (data: string) => data,
      error: (err: string) => err,
    });
  };

  return (
    <SuggestionBox
      style={
        users.length == 0
          ? {
              display: "none",
            }
          : undefined
      }
    >
      <SuggestionTitle>Suggestions to play with</SuggestionTitle>
      <SuggestionConatiner>
        {users.map((user, id) => (
          <UserCard key={id}>
            <UserCardInfo>
              <UserAvatar
                src={user.profileImgUrl}
                onClick={() => navigate(`/profile/${user.id}`)}
              />
              <UserDetails>
                <UserName>{user.username}</UserName>
                <UserHandle>@{user.username}</UserHandle>
              </UserDetails>
            </UserCardInfo>
            <Button
              $size="sm"
              $text="Invite"
              onClick={() => sendGameInvite(user)}
            />
          </UserCard>
        ))}
      </SuggestionConatiner>
      <Toaster position="top-center" />
    </SuggestionBox>
  );
};

interface User {
  id: number;
  username: string;
  profileImgUrl: string;
  email?: string;
}

const createRandomUsers = (): User => {
  return {
    id: 1,
    username: faker.person.firstName(),
    profileImgUrl: faker.image.avatar(),
  };
};

const getSuggestUsers = () =>
  faker.helpers.multiple(createRandomUsers, { count: 3 });
export default Suggestions;
