import Button from "components/common/Button/Button";
import {
  FriendAction,
  FriendImage,
  FriendImageConatiner,
  FriendName,
  FriendProfile,
} from "./UserProfile.style";

const UserProfile = ({
  primaryAction,
  secondaryAction,
  name,
  image,
}: {
  primaryAction?: string;
  secondaryAction?: string;
  name: string;
  image: string;
}) => {
  return (
    <FriendProfile>
      <FriendImageConatiner>
        <FriendImage
          style={{
            background: `url(${image}) center/cover`,
          }}
        />
        <FriendName>{name}</FriendName>
      </FriendImageConatiner>
      <FriendAction>
        {primaryAction && (
          <Button $text={primaryAction} $size="auto" $theme="blue" />
        )}
        {secondaryAction && (
          <Button
            $text={secondaryAction}
            $transparent={true}
            $border={true}
            $size="auto"
          />
        )}
      </FriendAction>
    </FriendProfile>
  );
};

export default UserProfile;
