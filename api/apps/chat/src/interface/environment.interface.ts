
// DEFAULT DESCRIPTION FOR A CHANNEL
export const DESCRIPTION = "Our community is built on the fundamental principle of shared learning. As you explore the world of web and mobile development, we want to provide you with a platform to discover new things, learn new tricks, and unlock your full potential.";


// CHANNEL SOCKETS ENVIRONMENT
export enum CHANNEL {
  namespace = 'chat-channels',

  // THE LISTENERS IN THE BACK-END
  join_channel = 'join_channel',
  sendMessageInchannel = 'send_message_in_channel',
  getChannelMessages = 'get_channel_messages',
  getChannelMembers = 'get_channel_members',

  // THE EMITTERS IN THE BACK-END
  recMessageFromChannel = 'rec_message_from_channel',
  recUpdatedChannelInfo = 'rec_updated_channel_info',
  recUpdatedListOfMembers = 'rec_updated_list_of_members',
  recUpdatedChannelsList = 'rec_updated_channels_list',
  recPullUpChannel = 'rec_pull_up_channel',
}

// DIRECT MESSAGE SOCKETS ENVIRONMENT
export enum DIRECTMESSAGE {
  namespace = 'chat-directMessages',

  // THE LISTENERS IN THE BACK-END
  sendMessageToUser = 'send_message_to_user',
  getDMMessages = 'get_directMessage_messages',

  // THE EMITTERS IN THE BACK-END
  recMessageFromUser = 'rec_message_from_user',
  recUpdatedDMsList = 'rec_updated_directMessages_list',
}


//-- THE EXPECTED LISTENERS IN THE FRONT-END --\\ 
//
//----------- CHANNELS SOCKETS ----------//
//
// - "recMessageFromChannel"
// - "recUpdatedChannelInfo"
// - "recUpdatedListOfMembers"
// - "recUpdatedChannelsList"
//
//
//------- DIRECT MESSAGES SOCKETS -------//
//
// - "recMessageFromUser"
// - "recUpdatedDMsList"