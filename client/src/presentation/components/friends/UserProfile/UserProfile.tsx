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
  onClick,
}: {
  primaryAction?: any;
  secondaryAction?: any;
  name: string;
  image: string;
  key: number;
  onClick: any;
}) => {
  return (
    <FriendProfile>
      <FriendImageConatiner>
        <FriendImage
          onClick={onClick}
          style={{
            background: `url(${image}) center/cover`,
            cursor: "pointer",
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
