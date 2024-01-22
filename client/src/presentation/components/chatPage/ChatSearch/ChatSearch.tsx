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
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { FindAllUsersDocument, SearchForChannelDocument } from "gql/index";
import { useDebounce } from "use-debounce";
import { useUserContext } from "context/user.context";

const ChatSearchResaultSample = ({
  type,
  name,
  image,
  username,
  onClick,
}: {
  type: "chat" | "channel";
  username?: string;
  image?: string;
  name: string;
  onClick: any;
}) => {
  return (
    <ChatSearchResault onClick={onClick}>
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

interface userType {
  profileImgUrl: string;
  username: string;
  id: number;
}

interface channelType {
  name: string;
  id: string;
}

const ChatSearch = () => {
  const {
    showSearchModel: [showSearchModel, setShowSearchModel],
    includeChannelInSearch: [includeChannelInSearch, setIncludeChannelInSearch],
    userHandlerCallBack: [userHandlerCallBack, setUserHandlerCallBack],
    channelHandlerCallBack: [channelHandlerCallBack, setChannelHandlerCallBack],
  } = useChatContext();

  const client = useApolloClient();
  const [usersRepo, setUsersRepo] = useState<userType[] | []>([]);
  const [users, setUsers] = useState<userType[] | []>([]);
  const [cahnnels, setChannes] = useState<channelType[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [value] = useDebounce(searchTerm, 1000);
  const { user } = useUserContext();
  useEffect(() => {
    if (includeChannelInSearch) {
      console.log("here i should get both users and channels");
    }
    client
      .query({
        query: FindAllUsersDocument,
      })
      .then((data) => {
        console.log("these all the users in db: ", data);
        if (data.data.findAllUsers) setUsersRepo(data.data.findAllUsers);
      })
      .then((err) => {
        console.log("err form user search,", err);
      });
  }, []);

  useEffect(() => {
    console.log("sreaching for .. ", value);
    const newUsersList = value
      ? usersRepo.filter((user) => user.username.includes(value))
      : [];
    setUsers(newUsersList);

    if (includeChannelInSearch && value) {
      client
        .mutate({
          mutation: SearchForChannelDocument,
          variables: {
            channelName: value,
            userId: Number(user?.id),
          },
        })
        .then((data) => {
          console.log("searching for channel with your request: ", data);
          if (data.data.searchForChannel) {
            setChannes(data.data.searchForChannel);
          }
        })
        .then((err) => {
          console.log(err);
        });
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
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
          <ChatSearchInput placeholder="search" onChange={handleInputChange} />
          <ChatSearchInputIcon>
            <SearchIcon />
          </ChatSearchInputIcon>
        </ChatSearchField>
        <ChatResaultContainer>
          {cahnnels.map((e: channelType) => {
            return (
              <ChatSearchResaultSample
                type="channel"
                name={e.name}
                onClick={() => channelHandlerCallBack(e.id)}
              />
            );
          })}
          {users.map((e: userType) => {
            return (
              <ChatSearchResaultSample
                type="chat"
                name={e.username}
                username={`@${e.username}`}
                image={e.profileImgUrl}
                onClick={() => userHandlerCallBack(e.id.toString())}
              />
            );
          })}
        </ChatResaultContainer>
      </ChatSearchModel>
    </ChatSearchContainer>
  );
};
export default ChatSearch;
