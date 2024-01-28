import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import SenderCard from "../SenderCard/SenderCard";
import {
  MessageContainer,
  MessageInfo,
  MessageProfile,
  MessageSample,
  MessageSender,
  MessageSenderDate,
  MessageSenderName,
} from "./Message.style";
import BannedDeafultImg from "assets/chat/default_banned.jpg";
import { AccountDocument, useAccountQuery } from "gql/index";
import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const Message = ({
  name,
  date,
  message,
  image,
  key,
  id,
}: {
  name: string;
  date: string;
  message: string;
  image: string;
  key: number;
  id: number;
}) => {
  //const [IsShown, setIsShown] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; image: string }>({
    name,
    image,
  });
  const navigate = useNavigate();
  const client = useApolloClient();
  useEffect(() => {
    if (id) {
      client
        .query({
          query: AccountDocument,
          variables: {
            userId: id,
          },
        })
        .then((data) => {
          setUser({
            name: data.data.findUserById.username,
            image: data.data.findUserById.profileImgUrl,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <MessageContainer
      // onMouseLeave={() => setIsShown(false)}
      style={
        !name && !image
          ? {
              opacity: "0.2",
            }
          : undefined
      }
    >
      <MessageProfile
        src={image || user.image || BannedDeafultImg}
        // onMouseEnter={() => setIsShown(true)}

        onClick={() => navigate(`/profile/${id}`)}
      />
      <MessageInfo>
        <MessageSender>
          <MessageSenderName>
            {name || user.name || "[left recently]"}
          </MessageSenderName>
          <MessageSenderDate>{date}</MessageSenderDate>
          {/* {IsShown && (
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
          )} */}
        </MessageSender>
        <MessageSample>
          <span>{message}</span>
        </MessageSample>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
