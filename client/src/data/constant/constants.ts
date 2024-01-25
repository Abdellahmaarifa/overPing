import { io } from "socket.io-client";

export const AUTH = {
  token: "access_token",
  user: "user",
};

export const SERVER_URL = import.meta.env.DEV
  ? import.meta.env.OVER_PING_SERVER_URL_DEV
  : import.meta.env.OVER_PING_SERVER_URL_PROD;

export const SERVER_END_POINT = `${SERVER_URL}/graphql`;
export const SERVER_REFRESH_END_POINT = `${SERVER_URL}/auth/refresh`;

export const CHANNEL_CMD = {
  namespace: "chat-channels",

  // THE LISTENERS IN THE BACK-END
  join_channel: "join_channel",
  sendMessageInchannel: "send_message_in_channel",
  getChannelMessages: "get_channel_messages",
  getChannelMembers: "get_channel_members",

  // THE EMITTERS IN THE BACK-END
  recMessageFromChannel: "rec_message_from_channel",
  recUpdatedChannelInfo: "rec_updated_channel_info",
  recUpdatedListOfMembers: "rec_updated_list_of_members",
  recUpdatedChannelsList: "rec_updated_channels_list",
};

export enum DIRECTMESSAGE {
  namespace = "chat-directMessages",

  // THE LISTENERS IN THE BACK-END
  sendMessageToUser = "send_message_to_user",
  getDMMessages = "get_directMessage_messages",

  // THE EMITTERS IN THE BACK-END
  recMessageFromUser = "rec_message_from_user",
  recUpdatedDMsList = "rec_updated_directMessages_list",
}

const URL_CHANNEL = `${import.meta.env.OVER_PING_SERVER_CHAT_DEV}/${
  CHANNEL_CMD.namespace
}`;

const URL_DM = `${import.meta.env.OVER_PING_SERVER_CHAT_DEV}/${
  DIRECTMESSAGE.namespace
}`;

export const socket = io(URL_CHANNEL, { withCredentials: true });
export const socket_dm = io(URL_DM, { withCredentials: true });

// export const socket = io(
//   `${import.meta.env.OVER_PING_SERVER_CHAT_DEV}/${CHANNEL_CMD.namespace}`
// );
