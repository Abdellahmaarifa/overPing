import Button from "components/common/Button/Button";

import {
  SuggestionBox,
  UserAvatar,
  UserCard,
  UserDetails,
  UserHandle,
  UserName,
  SuggestionTitle,
  UserCardInfo,
  SuggestionConatiner,
} from "./Suffestion.style";
const Suggestions = () => {
  return (
    <SuggestionBox>
      <SuggestionTitle>Suggestions to play with</SuggestionTitle>
      <SuggestionConatiner>
        <UserCard>
          <UserCardInfo>
            <UserAvatar />
            <UserDetails>
              <UserName>Salma</UserName>
              <UserHandle>@SalmaUser</UserHandle>
            </UserDetails>
          </UserCardInfo>
          <Button $size="sm" $text="Invite" />
        </UserCard>
        <UserCard>
          <UserCardInfo>
            <UserAvatar />
            <UserDetails>
              <UserName>Salma</UserName>
              <UserHandle>@SalmaUser</UserHandle>
            </UserDetails>
          </UserCardInfo>
          <Button $size="sm" $text="Invite" />
        </UserCard>
      </SuggestionConatiner>
    </SuggestionBox>
  );
};

export default Suggestions;
