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
const Message = () => {
  const [IsShown, setIsShown] = useState<boolean>(false);

  return (
    <MessageContainer onMouseLeave={() => setIsShown(false)}>
      <MessageProfile
        src={faker.image.avatar()}
        onMouseEnter={() => setIsShown(true)}
      />
      <MessageInfo>
        <MessageSender>
          <MessageSenderName>salma</MessageSenderName>
          <MessageSenderDate>Today at 10:22 PM</MessageSenderDate>
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
          <span>hello world!</span>
        </MessageSample>
        <MessageSample>
          <span>I hope you are doing okay!</span>
        </MessageSample>
        <MessageSample>
          <span>see u again.</span>
        </MessageSample>
        <MessageSample>
          <MessageImage
            src={faker.image.urlLoremFlickr({ category: "nature" })}
          />
        </MessageSample>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
