import { ChannelSample, ChannelType, DMType } from "domain/model/chat.type";
import { createContext, useContext, useState } from "react";

type UseStateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export type ChatCtxType = {
  showChatMenu: UseStateType<Boolean>;
  showChatAbout: UseStateType<Boolean>;
  showFriends: UseStateType<Boolean>;
  showSearchModel: UseStateType<Boolean>;
  showChannelModel: UseStateType<Boolean>;
  showChannelMenu: UseStateType<Boolean>;
  showEditChannelModel: UseStateType<Boolean>;
  includeChannelInSearch: UseStateType<Boolean>;
  userHandlerCallBack: UseStateType<(id: string) => void>;
  channelHandlerCallBack: UseStateType<(id: string) => void>;
  currentChannel: UseStateType<ChannelSample | null>;
  channels: UseStateType<ChannelType[] | []>;
  currentDm: UseStateType<DMType | null>;
  dms: UseStateType<DMType[] | []>;
};

export class ChatContextValue implements ChatCtxType {
  showChatMenu: UseStateType<Boolean>;
  showChatAbout: UseStateType<Boolean>;
  showFriends: UseStateType<Boolean>;
  showSearchModel: UseStateType<Boolean>;
  showChannelModel: UseStateType<Boolean>;
  showChannelMenu: UseStateType<Boolean>;
  showEditChannelModel: UseStateType<Boolean>;
  includeChannelInSearch: UseStateType<Boolean>;
  userHandlerCallBack: UseStateType<(id: string) => void>;
  channelHandlerCallBack: UseStateType<(id: string) => void>;
  currentChannel: UseStateType<ChannelSample | null>;
  channels: UseStateType<ChannelType[] | []>;
  currentDm: UseStateType<DMType | null>;
  dms: UseStateType<DMType[] | []>;
  constructor() {
    this.showChatMenu = useState<Boolean>(false);
    this.showChatAbout = useState<Boolean>(false);
    this.showFriends = useState<Boolean>(false);
    this.showSearchModel = useState<Boolean>(false);
    this.showChannelModel = useState<Boolean>(false);
    this.showChannelMenu = useState<Boolean>(false);
    this.showEditChannelModel = useState<Boolean>(false);
    this.includeChannelInSearch = useState<Boolean>(false);
    this.userHandlerCallBack = useState<(id: string) => void>(
      (id: string) => {}
    );
    this.channelHandlerCallBack = useState<(id: string) => void>(
      (id: string) => {}
    );
    this.currentChannel = useState<ChannelSample | null>(null);
    this.channels = useState<ChannelType[] | []>([]);
    this.currentDm = useState<DMType | null>(null);
    this.dms = useState<DMType[] | []>([]);
  }
}

const ChatContext = createContext<ChatCtxType>({
  showChatMenu: [false, () => {}],
  showChatAbout: [false, () => {}],
  showFriends: [false, () => {}],
  showSearchModel: [false, () => {}],
  showChannelModel: [false, () => {}],
  showChannelMenu: [false, () => {}],
  showEditChannelModel: [false, () => {}],
  includeChannelInSearch: [false, () => {}],
  userHandlerCallBack: [(id: string) => {}, () => () => {}],
  channelHandlerCallBack: [(id: string) => {}, () => () => {}],
  currentChannel: [null, () => {}],
  channels: [[], () => {}],
  currentDm: [null, () => {}],
  dms: [[], () => {}],
});

type Props = {
  children: React.ReactNode;
  value?: ChatCtxType;
};

const useChatContextProvider =
  () =>
  ({ children }: Props) => {
    return (
      <ChatContext.Provider value={new ChatContextValue()}>
        {children}
      </ChatContext.Provider>
    );
  };

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("chatContext was used outside of its provider.");
  }
  return context;
};

export default useChatContextProvider;
