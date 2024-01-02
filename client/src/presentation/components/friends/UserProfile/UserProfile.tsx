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
  key,
}: {
  primaryAction?: any;
  secondaryAction?: any;
  name: string;
  image: string;
  key: number;
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
        {primaryAction.name && (
          <Button
            $text={primaryAction.name}
            $size="auto"
            $theme="blue"
            onClick={primaryAction.func}
          />
        )}
        {secondaryAction.name && (
          <Button
            $text={secondaryAction.name}
            $transparent={true}
            $border={true}
            $size="auto"
            onClick={secondaryAction.func}
          />
        )}
      </FriendAction>
    </FriendProfile>
  );
};

export default UserProfile;
