import { ApolloClient } from "@apollo/client";
import { NavigateFunction } from "react-router-dom";
import { ChatCtxType } from "context/chat.context";
import { User } from "domain/model/User.type";
import { GetUserChannelsDocument } from "gql/index";
import { GetUserDirectMessagesDocument } from "gql/index";
import { CreateDirectMessageDocument } from "gql/index";
import { FindChannelByIdDocument } from "gql/index";
import { JoinChannelDocument } from "gql/index";
import toast from "react-hot-toast";
import { tabId } from "pages/Game/components/App";
interface HooksType {
  navigate: NavigateFunction;
}
interface ChatViewData {
  id?: string;
  user: User | null;
  type: "none" | "dm" | "channel";
}

export class ChatViewModel {
  private state: any;
  private client: ApolloClient<object>;
  private hooks: HooksType;
  private data: ChatViewData;
  private context: ChatCtxType;

  constructor(params: {
    client: ApolloClient<object>;
    hooks: HooksType;
    data: ChatViewData;
    state: any;
    context: ChatCtxType;
  }) {
    this.data = params.data;
    this.state = params.state;
    this.hooks = params.hooks;
    this.client = params.client;
    this.context = params.context;
  }

  fetchUserChannels = async () => {
    // get the use channels
    const {
      channels: [_channels, setChannels],
    } = this.context;
    try {
      const userChannels = await this.client.query({
        query: GetUserChannelsDocument,
        variables: {
          userId: Number(this.data.user?.id),
        },
        fetchPolicy: "no-cache",
      });
      const channels = userChannels?.data?.getUserChannels;
      if (channels) setChannels(channels);
      return channels;
    } catch (err) {
      toast.error("can't fetch user channels");
      this.hooks.navigate("/chat");
      console.log("error i fetch channels: ", err);
    }
  };

  fetchUserDms = async () => {
    const {
      dms: [_dms, setDms],
    } = this.context;
    try {
      const userDM = await this.client.query({
        query: GetUserDirectMessagesDocument,
        variables: {
          userId: Number(this.data.user?.id),
        },
        fetchPolicy: "no-cache",
      });
      const dms = userDM?.data?.getUserDirectMessages;
      if (dms) setDms(dms);
      return dms;
    } catch (err) {
      toast.error("can't fetch user DMs");
      this.hooks.navigate("/chat");
      console.log("err in fetch user dms ", err);
    }
  };

  fetchCurrentChannel = async () => {
    const {
      currentChannel: [_currentChannel, setCurrentChannel],
    } = this.context;
    try {
      const res = await this.client.query({
        query: FindChannelByIdDocument,
        variables: {
          userId: Number(this.data.user?.id),
          groupId: Number(this.data.id),
        },
        fetchPolicy: "no-cache",
      });
      const channel = res?.data?.findChannelById;
      if (channel) {
        setCurrentChannel(channel);
      }
      return channel;
    } catch (err) {
      toast.error("can't get the current channel");
      this.hooks.navigate("/chat");
      console.log("error in getting the current channel", err);
    }
  };

  createNewDm = async () => {
    try {
      const newDm = await this.client.mutate({
        mutation: CreateDirectMessageDocument,
        variables: {
          userId: Number(this.data.user?.id),
          targetId: Number(this.data.id),
        },
        fetchPolicy: "no-cache",
      });
      console.log("new dm created: ", newDm);
      const username = newDm?.data.createDirectMessage.user2.username;
      toast.success(`Say Hi to ${username}`), { icon: "👏" };
      return newDm;
    } catch (err) {
      toast.error("can't create new DM");
      console.log("err i creating new dm:", err);
      this.hooks.navigate("/chat");
    }
  };

  joinToChannel = async (isProtected: boolean) => {
    const {
      currentChannel: [currentChannel, setCurrentChannel],
    } = this.context;
    let password: string | null = null;
    if (isProtected) {
      password = prompt("give me the password in order to join!");
    }
    try {
      const joinChannelRes = await this.client.mutate({
        mutation: JoinChannelDocument,
        variables: {
          data: {
            userId: Number(this.data.user?.id),
            channelId: Number(this.data.id),
            password: password,
          },
        },
      });
      console.log(joinChannelRes);
      return joinChannelRes;
    } catch (err: any) {
      if (err?.message != "You are already a Member") {
        toast.error(err?.message ? err.message : "can't join to channel");
        this.hooks.navigate("/chat");
      }
      console.log("Error from: joinchannel ", err);
    }
  };

  initChat = async () => {
    const { id, type } = this.data;
    const {
      currentChannel: [currentChannel, setCurrentChannel],
      channels: [_channels, setChannels],
      dms: [_dms, setDms],
    } = this.context;
    const channels = await this.fetchUserChannels();
    console.log("****** channels: ", channels);
    const dms = await this.fetchUserDms();
    if (type == "dm") {
      if (dms.find((e) => e.user2.id == id)) return;
      const dm = await this.createNewDm();
      console.log("we just create new dm : ", dm);
      // update dms
    }
    if (type == "channel") {
      // get the data about the current channel
      if (currentChannel?.id == id) return;
      const channel = await this.fetchCurrentChannel();
      if (channels.find((e) => e.id == channel.id)) return;
      console.log("channels ************* ", channels);
      const newChannel = await this.joinToChannel(
        channel?.visibility == "protected"
      );
      console.log("joining to a new channel : ", newChannel);
    }
  };

  getChannels = () => {
    return this.context.channels[0];
  };
  getDms = () => {
    return this.context.dms[0];
  };
}
