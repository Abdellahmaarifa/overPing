import { faker } from "@faker-js/faker";
import { useState } from "react";
import {
  MessageContainer,
  MessageImage,
  MessageInfo,
  MessageProfile,
  MessageSample,
  MessageSender,
  MessageSenderDate,
  MessageSenderName,
} from "./Message.style";
import SenderCard from "../SenderCard/SenderCard";
const Message = ({
  name,
  date,
  message,
  image,
}: {
  name: string;
  date: string;
  message: string;
  image: string;
}) => {
  const [IsShown, setIsShown] = useState<boolean>(false);

  return (
    <MessageContainer onMouseLeave={() => setIsShown(false)}>
      <MessageProfile src={image} onMouseEnter={() => setIsShown(true)} />
      <MessageInfo>
        <MessageSender>
          <MessageSenderName>{name}</MessageSenderName>
          <MessageSenderDate>{date}</MessageSenderDate>
          {IsShown && (
            <SenderCard
              user={{
                name: "maarifa",
                userName: "amaarifa",
                image: faker.image.urlLoremFlickr(),
                totalGames: 200,
                gamesWon: 150,
                gameLost: 100,
                isFriend: false,
              }}
            />
          )}
        </MessageSender>
        <MessageSample>
          <span>{message}</span>
        </MessageSample>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
