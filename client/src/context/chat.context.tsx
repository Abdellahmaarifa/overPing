import { createContext, useContext, useState } from "react";

type UseStateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type ChatCtxType = {
  showChatMenu: UseStateType<Boolean>;
  showChatAbout: UseStateType<Boolean>;
  showFriends: UseStateType<Boolean>;
  showSearchModel: UseStateType<Boolean>;
  showChannelModel: UseStateType<Boolean>;
  showChannelMenu: UseStateType<Boolean>;
};

export class ChatContextValue implements ChatCtxType {
  showChatMenu: UseStateType<Boolean>;
  showChatAbout: UseStateType<Boolean>;
  showFriends: UseStateType<Boolean>;
  showSearchModel: UseStateType<Boolean>;
  showChannelModel: UseStateType<Boolean>;
  showChannelMenu: UseStateType<Boolean>;
  constructor() {
    this.showChatMenu = useState<Boolean>(false);
    this.showChatAbout = useState<Boolean>(false);
    this.showFriends = useState<Boolean>(false);
    this.showSearchModel = useState<Boolean>(false);
    this.showChannelModel = useState<Boolean>(false);
    this.showChannelMenu = useState<Boolean>(false);
  }
}

const ChatContext = createContext<ChatCtxType>({
  showChatMenu: [false, () => {}],
  showChatAbout: [false, () => {}],
  showFriends: [false, () => {}],
  showSearchModel: [false, () => {}],
  showChannelModel: [false, () => {}],
  showChannelMenu: [false, () => {}],
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
