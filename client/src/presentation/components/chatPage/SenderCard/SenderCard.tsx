import Button from "components/common/Button/Button";
import { useState } from "react";
import {
  MessageSenderCard,
  MessageSenderCardImage,
  MessageSenderCardImageContainer,
  MessageSenderCardImageText,
  MessageSenderCardInfo,
  MessageSenderCardInfoActionConatiner,
  MessageSenderCardInfoName,
  MessageSenderCardInfoNameConatiner,
  MessageSenderCardInfoState,
  MessageSenderCardInfoStateConatiner,
  MessageSenderCardInfoStateName,
  MessageSenderCardInfoStateNumber,
  MessageSenderCardInfoUserName,
  MessageSenderCardMask,
} from "./SenderCard.style";
import PlusIcon from "assets/common/plus.svg?react";

const SenderCard = ({
  user,
}: {
  user: {
    name: string;
    userName: string;
    image: string;
    totalGames: number;
    gamesWon: number;
    gameLost: number;
    isFriend: Boolean;
  };
}) => {
  const [IsShownCard, setIsShownCard] = useState<boolean>(false);
  return (
    <MessageSenderCard>
      <MessageSenderCardImageContainer
        onMouseEnter={() => setIsShownCard(true)}
        onMouseLeave={() => setIsShownCard(false)}
      >
        <MessageSenderCardImage src={user.image} />
        {IsShownCard && (
          <>
            <MessageSenderCardMask></MessageSenderCardMask>
            <MessageSenderCardImageText>
              view profile
            </MessageSenderCardImageText>
          </>
        )}
      </MessageSenderCardImageContainer>
      <MessageSenderCardInfo>
        <MessageSenderCardInfoNameConatiner>
          <MessageSenderCardInfoName>{user.name}</MessageSenderCardInfoName>
          <MessageSenderCardInfoUserName>
            {user.userName}
          </MessageSenderCardInfoUserName>
        </MessageSenderCardInfoNameConatiner>
        <MessageSenderCardInfoStateConatiner>
          <MessageSenderCardInfoState>
            <MessageSenderCardInfoStateName>
              Total Game
            </MessageSenderCardInfoStateName>
            <MessageSenderCardInfoStateNumber>
              {user.totalGames}
            </MessageSenderCardInfoStateNumber>
          </MessageSenderCardInfoState>
          <MessageSenderCardInfoState>
            <MessageSenderCardInfoStateName>
              Game Won
            </MessageSenderCardInfoStateName>
            <MessageSenderCardInfoStateNumber>
              {user.gamesWon}
            </MessageSenderCardInfoStateNumber>
          </MessageSenderCardInfoState>
          <MessageSenderCardInfoState>
            <MessageSenderCardInfoStateName>
              Game Lost
            </MessageSenderCardInfoStateName>
            <MessageSenderCardInfoStateNumber>
              {user.gameLost}
            </MessageSenderCardInfoStateNumber>
          </MessageSenderCardInfoState>
        </MessageSenderCardInfoStateConatiner>
        <MessageSenderCardInfoActionConatiner>
          <Button $text="play" $size="sm" />
          {user.isFriend ? (
            <Button $text="play" $size="sm" $theme="danger" $border={true} />
          ) : (
            <Button $transparent={true} $border={true} $Icon={PlusIcon} />
          )}
        </MessageSenderCardInfoActionConatiner>
      </MessageSenderCardInfo>
    </MessageSenderCard>
  );
};

export default SenderCard;
