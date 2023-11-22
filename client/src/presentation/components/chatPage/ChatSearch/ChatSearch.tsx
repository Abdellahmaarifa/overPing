import { faker } from "@faker-js/faker";
import CloseIcon from "assets/common/close-icon.svg?react";
import HashTagIcon from "assets/common/hashtag.svg?react";
import SearchIcon from "assets/common/search.svg?react";
import { useChatContext } from "context/chat.context";
import {
  ChatResaultContainer,
  ChatSearchContainer,
  ChatSearchField,
  ChatSearchIcon,
  ChatSearchInput,
  ChatSearchInputIcon,
  ChatSearchModel,
  ChatSearchNameConatiner,
  ChatSearchResault,
  ChatSearchResaultCloseIcon,
  ChatSearchResaultIcon,
  ChatSearchResaultImage,
  ChatSearchResaultName,
} from "./ChatSearch.style";
import { MouseEvent } from "react";

const ChatSearchResaultSample = ({
  type,
  name,
  image,
  username,
}: {
  type: "chat" | "channel";
  username?: string;
  image?: string;
  name: string;
}) => {
  return (
    <ChatSearchResault>
      {type === "chat" ? (
        <ChatSearchResaultImage src={image} />
      ) : (
        <ChatSearchResaultIcon>
          <HashTagIcon />
        </ChatSearchResaultIcon>
      )}
      {username ? (
        <ChatSearchNameConatiner>
          <ChatSearchResaultName>{name}</ChatSearchResaultName>
          <span>{username}</span>
        </ChatSearchNameConatiner>
      ) : (
        <ChatSearchResaultName>{name}</ChatSearchResaultName>
      )}
      <ChatSearchResaultCloseIcon>
        <CloseIcon />
      </ChatSearchResaultCloseIcon>
    </ChatSearchResault>
  );
};
const ChatSearch = () => {
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
  } = useChatContext();
  return (
    <ChatSearchContainer
      onClick={() => {
        console.log("lol");
        setShowSearchModel(false);
      }}
    >
      <ChatSearchModel onClick={(e: MouseEvent) => e.stopPropagation()}>
        <ChatSearchIcon>
          <CloseIcon onClick={() => setShowSearchModel(false)} />
        </ChatSearchIcon>
        <ChatSearchField>
          <ChatSearchInput placeholder="search" />
          <ChatSearchInputIcon>
            <SearchIcon />
          </ChatSearchInputIcon>
        </ChatSearchField>
        <ChatResaultContainer>
          <ChatSearchResaultSample type="channel" name="pong" />
          <ChatSearchResaultSample
            type="chat"
            name="salma"
            username="@salam"
            image={faker.image.avatar()}
          />
        </ChatResaultContainer>
      </ChatSearchModel>
    </ChatSearchContainer>
  );
};
export default ChatSearch;
