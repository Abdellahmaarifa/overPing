import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type AcceptRequestInput = {
  matchType: Scalars['String']['input'];
  senderId: Scalars['Float']['input'];
};

export type ActionToMemberInput = {
  channelId: Scalars['Float']['input'];
  muteTimeLimit?: InputMaybe<Scalars['Float']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  targetId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type AuthCredentialsInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CancelRequestInput = {
  matchType: Scalars['String']['input'];
  senderId: Scalars['Float']['input'];
};

export type CreateChannelInput = {
  channelName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Float']['input'];
  visibility?: Scalars['String']['input'];
};

export type CreateProfileInput = {
  userId: Scalars['Float']['input'];
  username: Scalars['String']['input'];
};

export type DeleteChannelInput = {
  channelId: Scalars['Float']['input'];
  password: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type DeleteMessageInput = {
  channelId: Scalars['Float']['input'];
  messageId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type DeletionInput = {
  groupChatId: Scalars['Float']['input'];
  messageId?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['Float']['input'];
};

export type GqlAchievement = {
  __typename?: 'GQLAchievement';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageURL: Scalars['String']['output'];
  requirement: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type GqlAdminsModel = {
  __typename?: 'GQLAdminsModel';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  lastSeen?: Maybe<Scalars['String']['output']>;
  muteStatus?: Maybe<Scalars['Boolean']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  profileImgUrl?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type GqlChannelModel = {
  __typename?: 'GQLChannelModel';
  admins?: Maybe<Array<GqlAdminsModel>>;
  created_at?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  latestMessage_at?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<GqlMembersModel>>;
  messages?: Maybe<Array<GqlMessageModel>>;
  name: Scalars['String']['output'];
  owner_id: Scalars['Float']['output'];
  updated_at?: Maybe<Scalars['String']['output']>;
  visibility: Scalars['String']['output'];
};

export type GqlChannelSearchModel = {
  __typename?: 'GQLChannelSearchModel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  visibility: Scalars['String']['output'];
};

export type GqlDirectMessageModel = {
  __typename?: 'GQLDirectMessageModel';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  latestMessage_at?: Maybe<Scalars['String']['output']>;
  messages?: Maybe<Array<GqlMessageModel>>;
  user1: GqlUser;
  user2: GqlUser;
};

export type GqlFriendshipStatusModel = {
  __typename?: 'GQLFriendshipStatusModel';
  status: Scalars['String']['output'];
};

export type GqlGameStatusModel = {
  __typename?: 'GQLGameStatusModel';
  best_win_streak: Scalars['Float']['output'];
  matchesLoss: Scalars['Float']['output'];
  matchesWon: Scalars['Float']['output'];
  totalMatches: Scalars['Float']['output'];
  win_streak: Scalars['Float']['output'];
};

export type GqliUserModel = {
  __typename?: 'GQLIUserModel';
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  profileImgUrl: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GqlMembersModel = {
  __typename?: 'GQLMembersModel';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  lastSeen?: Maybe<Scalars['String']['output']>;
  muteStatus?: Maybe<Scalars['Boolean']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  profileImgUrl?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type GqlMessageModel = {
  __typename?: 'GQLMessageModel';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sender_id: Scalars['Float']['output'];
  text?: Maybe<Scalars['String']['output']>;
  updated: Scalars['Boolean']['output'];
  updated_at: Scalars['String']['output'];
};

export type GqlUser = {
  __typename?: 'GQLUser';
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastSeen?: Maybe<Scalars['String']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  profileImgUrl: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type GqlUserModel = {
  __typename?: 'GQLUserModel';
  email: Scalars['String']['output'];
  fortyTwoId?: Maybe<Scalars['String']['output']>;
  googleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  profileImgUrl: Scalars['String']['output'];
  showUpdateWin?: Maybe<Scalars['Boolean']['output']>;
  twoStepVerificationEnabled: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type GqlUserProfileModel = {
  __typename?: 'GQLUserProfileModel';
  about: Scalars['String']['output'];
  bgImageUrl: Scalars['String']['output'];
  gameStatus: GqlGameStatusModel;
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  rank: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  user_id: Scalars['Float']['output'];
  wallet: GqlWalletModel;
  xp: Scalars['Float']['output'];
};

export type GqlWalletModel = {
  __typename?: 'GQLWalletModel';
  balance: Scalars['Float']['output'];
  betAmount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  user_id: Scalars['Float']['output'];
};

export type JoinMatchmakingInput = {
  matchType: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type MemberInput = {
  channelId: Scalars['Float']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  UpdateUserProfile: Scalars['Boolean']['output'];
  acceptFriendRequest: Scalars['Boolean']['output'];
  acceptMatchToPlay?: Maybe<Scalars['Boolean']['output']>;
  addAdmin: Scalars['Boolean']['output'];
  addMember: Scalars['Boolean']['output'];
  authenticate_2fa: GqlUserModel;
  banMember: Scalars['Boolean']['output'];
  blockUser: Scalars['Boolean']['output'];
  cancelFriendRequest: Scalars['Boolean']['output'];
  cancelRequestToPlay?: Maybe<Scalars['Boolean']['output']>;
  createChannel: GqlChannelModel;
  createDirectMessage: GqlDirectMessageModel;
  createProfile: GqlUserProfileModel;
  deleteAccount: Scalars['Boolean']['output'];
  deleteChannel: Scalars['Boolean']['output'];
  deleteDirectMessage: Scalars['Boolean']['output'];
  deleteMessageInChannel: Scalars['Boolean']['output'];
  deleteMessageInDM: Scalars['Boolean']['output'];
  disableTwoFactor: Scalars['Boolean']['output'];
  enableTwoFactorAuth: Scalars['String']['output'];
  joinChannel: GqlChannelModel;
  joinMatchmakingQueue?: Maybe<Scalars['Boolean']['output']>;
  kickMember: Scalars['Boolean']['output'];
  leaveChannel: Scalars['Boolean']['output'];
  logOut: Scalars['Boolean']['output'];
  muteMember: Scalars['Boolean']['output'];
  placeBet?: Maybe<Scalars['Boolean']['output']>;
  refresh: Scalars['String']['output'];
  removeAdmin: Scalars['Boolean']['output'];
  removeUserProfile: Scalars['Boolean']['output'];
  resolveBet?: Maybe<Scalars['Boolean']['output']>;
  sendFriendRequest: Scalars['Boolean']['output'];
  sendRequestToPlay?: Maybe<Scalars['Boolean']['output']>;
  signIn: GqlUserModel;
  signUp: GqlUserModel;
  transferFunds?: Maybe<Scalars['Boolean']['output']>;
  unbanMember: Scalars['Boolean']['output'];
  unblockUser: Scalars['Boolean']['output'];
  unfriendUser: Scalars['Boolean']['output'];
  unmuteMember: Scalars['Boolean']['output'];
  updateChannel: GqlChannelModel;
  updateMessageInChannel: GqlMessageModel;
  updateMessageInDM: GqlMessageModel;
  updateProfileBgImg: Scalars['String']['output'];
  updateUser: Scalars['Boolean']['output'];
  updateUserAvatarImg: Scalars['String']['output'];
  updateUserStatus: Scalars['Boolean']['output'];
  verifyTwoFactorAuth: Scalars['Boolean']['output'];
};


export type MutationUpdateUserProfileArgs = {
  UpdateProfileInput: UpdateProfileInput;
  userId: Scalars['Float']['input'];
};


export type MutationAcceptFriendRequestArgs = {
  friendId: Scalars['Float']['input'];
};


export type MutationAcceptMatchToPlayArgs = {
  AcceptRequestInput: AcceptRequestInput;
};


export type MutationAddAdminArgs = {
  data: ActionToMemberInput;
};


export type MutationAddMemberArgs = {
  data: ActionToMemberInput;
};


export type MutationAuthenticate_2faArgs = {
  code: Scalars['String']['input'];
};


export type MutationBanMemberArgs = {
  data: ActionToMemberInput;
};


export type MutationBlockUserArgs = {
  blockedUserId: Scalars['Float']['input'];
};


export type MutationCancelFriendRequestArgs = {
  requester: Scalars['Float']['input'];
};


export type MutationCancelRequestToPlayArgs = {
  CancelRequestInput: CancelRequestInput;
};


export type MutationCreateChannelArgs = {
  data: CreateChannelInput;
};


export type MutationCreateDirectMessageArgs = {
  targetID: Scalars['Float']['input'];
  userID: Scalars['Float']['input'];
};


export type MutationCreateProfileArgs = {
  profileCredentials: CreateProfileInput;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Float']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteChannelArgs = {
  data: DeleteChannelInput;
};


export type MutationDeleteDirectMessageArgs = {
  data: DeletionInput;
};


export type MutationDeleteMessageInChannelArgs = {
  data: DeleteMessageInput;
};


export type MutationDeleteMessageInDmArgs = {
  data: DeletionInput;
};


export type MutationEnableTwoFactorAuthArgs = {
  id: Scalars['Float']['input'];
};


export type MutationJoinChannelArgs = {
  data: MemberInput;
};


export type MutationJoinMatchmakingQueueArgs = {
  JoinMatchmakingInput: JoinMatchmakingInput;
};


export type MutationKickMemberArgs = {
  data: ActionToMemberInput;
};


export type MutationLeaveChannelArgs = {
  data: MemberInput;
};


export type MutationLogOutArgs = {
  id: Scalars['Float']['input'];
};


export type MutationMuteMemberArgs = {
  data: ActionToMemberInput;
};


export type MutationPlaceBetArgs = {
  transferFundsInput: PlaceBetInput;
};


export type MutationRemoveAdminArgs = {
  data: ActionToMemberInput;
};


export type MutationRemoveUserProfileArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationResolveBetArgs = {
  resolveBetInput: ResolveBetInput;
};


export type MutationSendFriendRequestArgs = {
  receiverId: Scalars['Float']['input'];
};


export type MutationSendRequestToPlayArgs = {
  JoinMatchmakingInput: RequestToPlayInput;
};


export type MutationSignInArgs = {
  authCredentials: AuthCredentialsInput;
};


export type MutationSignUpArgs = {
  profileImage?: InputMaybe<Scalars['Upload']['input']>;
  userCreationInput: UserCreationInput;
};


export type MutationTransferFundsArgs = {
  transferFundsInput: TransferFundsInput;
};


export type MutationUnbanMemberArgs = {
  data: ActionToMemberInput;
};


export type MutationUnblockUserArgs = {
  unblockedUserId: Scalars['Float']['input'];
};


export type MutationUnfriendUserArgs = {
  friendId: Scalars['Float']['input'];
};


export type MutationUnmuteMemberArgs = {
  data: ActionToMemberInput;
};


export type MutationUpdateChannelArgs = {
  data: UpdateChannelInput;
};


export type MutationUpdateMessageInChannelArgs = {
  data: UpdateMessageInput;
};


export type MutationUpdateMessageInDmArgs = {
  data: UpdateInput;
};


export type MutationUpdateProfileBgImgArgs = {
  image: Scalars['Upload']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  userUpdateInput: UpdateUserInput;
};


export type MutationUpdateUserAvatarImgArgs = {
  image: Scalars['Upload']['input'];
  userId: Scalars['Float']['input'];
};


export type MutationUpdateUserStatusArgs = {
  currentTime: Scalars['String']['input'];
};


export type MutationVerifyTwoFactorAuthArgs = {
  code: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};

export type PlaceBetInput = {
  betAmount: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type Player = {
  __typename?: 'Player';
  bet?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  matchType?: Maybe<Scalars['String']['output']>;
};

export type PlayersMatching = {
  __typename?: 'PlayersMatching';
  matchKey: Scalars['String']['output'];
  user1?: Maybe<Player>;
  user2?: Maybe<Player>;
};

export type Query = {
  __typename?: 'Query';
  findAllUsers: Array<GqliUserModel>;
  findChannelById?: Maybe<GqlChannelModel>;
  findDirectMessageById?: Maybe<GqlDirectMessageModel>;
  findPagesOfUsers: Array<GqliUserModel>;
  findProfileByUserId?: Maybe<GqlUserProfileModel>;
  findUserById: GqliUserModel;
  getAllAchievements?: Maybe<Array<GqlAchievement>>;
  getBlockedUsers: Array<GqliUserModel>;
  getFriendsRequests: Array<GqliUserModel>;
  getFriendshipStatus: GqlFriendshipStatusModel;
  getOnlineFriends: Array<GqliUserModel>;
  getOnlineUsers: Array<GqliUserModel>;
  getSuggestedFriends: Array<GqliUserModel>;
  getUser: GqlUserModel;
  getUserAchievements?: Maybe<Array<GqlAchievement>>;
  getUserChannels?: Maybe<Array<GqlChannelModel>>;
  getUserDirectMessages?: Maybe<Array<GqlDirectMessageModel>>;
  getUserFriends: Array<GqliUserModel>;
  hello: Scalars['String']['output'];
  helloT: Scalars['String']['output'];
  searchForChannel?: Maybe<Array<GqlChannelSearchModel>>;
  searchUser: Array<GqliUserModel>;
};


export type QueryFindChannelByIdArgs = {
  groupId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type QueryFindDirectMessageByIdArgs = {
  groupId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};


export type QueryFindPagesOfUsersArgs = {
  pageNumber: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
};


export type QueryFindProfileByUserIdArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryFindUserByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetFriendshipStatusArgs = {
  friendId: Scalars['Float']['input'];
};


export type QueryGetOnlineFriendsArgs = {
  limit: Scalars['Float']['input'];
  pageNumber: Scalars['Float']['input'];
};


export type QueryGetOnlineUsersArgs = {
  limit: Scalars['Float']['input'];
  pageNumber: Scalars['Float']['input'];
};


export type QueryGetSuggestedFriendsArgs = {
  limit: Scalars['Float']['input'];
};


export type QueryGetUserAchievementsArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryGetUserChannelsArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetUserDirectMessagesArgs = {
  id: Scalars['Float']['input'];
};


export type QuerySearchForChannelArgs = {
  channelName: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};


export type QuerySearchUserArgs = {
  limit: Scalars['Float']['input'];
  pageNumber: Scalars['Float']['input'];
  username: Scalars['String']['input'];
};

export type RequestToPlayInput = {
  matchType: Scalars['String']['input'];
  recipientId: Scalars['Float']['input'];
};

export type ResolveBetInput = {
  isWinner: Scalars['Boolean']['input'];
  userId: Scalars['Float']['input'];
};

export type RespondToPlay = {
  __typename?: 'RespondToPlay';
  matchType: Scalars['String']['output'];
  playerId: Scalars['Float']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  matchWaitingDirc: PlayersMatching;
  matchWaitingList: PlayersMatching;
  notification: RespondToPlay;
};


export type SubscriptionMatchWaitingDircArgs = {
  userId: Scalars['Float']['input'];
};


export type SubscriptionMatchWaitingListArgs = {
  userId: Scalars['Float']['input'];
};


export type SubscriptionNotificationArgs = {
  userId: Scalars['Float']['input'];
};

export type TransferFundsInput = {
  amount: Scalars['Float']['input'];
  recipientId: Scalars['Float']['input'];
  senderId: Scalars['Float']['input'];
};

export type UpdateChannelInput = {
  channelId: Scalars['Float']['input'];
  channelName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  oldPassword?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Float']['input'];
  visibility: Scalars['String']['input'];
};

export type UpdateInput = {
  groupChatId: Scalars['Float']['input'];
  messageId: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type UpdateMessageInput = {
  channelId: Scalars['Float']['input'];
  messageId: Scalars['Float']['input'];
  text: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  bgImageUrl?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  showUpdateWin: Scalars['Boolean']['input'];
};

export type UserCreationInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetUserAchievementsQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserAchievementsQuery = { __typename?: 'Query', getUserAchievements?: Array<{ __typename?: 'GQLAchievement', title: string, requirement: string, description: string, imageURL: string }> | null };

export type GetAllAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAchievementsQuery = { __typename?: 'Query', getAllAchievements?: Array<{ __typename?: 'GQLAchievement', title: string, requirement: string, description: string, imageURL: string }> | null };

export type GetUserChannelsQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserChannelsQuery = { __typename?: 'Query', getUserChannels?: Array<{ __typename?: 'GQLChannelModel', id: string, name: string, visibility: string }> | null };

export type GetUserDirectMessagesQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetUserDirectMessagesQuery = { __typename?: 'Query', getUserDirectMessages?: Array<{ __typename?: 'GQLDirectMessageModel', id: string, user2: { __typename?: 'GQLUser', username: string, profileImgUrl: string, id: string }, user1: { __typename?: 'GQLUser', id: string, username: string, profileImgUrl: string } }> | null };

export type CreateChannelMutationVariables = Exact<{
  data: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'GQLChannelModel', id: string, name: string, visibility: string } };

export type SearchForChannelQueryVariables = Exact<{
  channelName: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
}>;


export type SearchForChannelQuery = { __typename?: 'Query', searchForChannel?: Array<{ __typename?: 'GQLChannelSearchModel', id: string, name: string, visibility: string }> | null };

export type CreateDirectMessageMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  targetId: Scalars['Float']['input'];
}>;


export type CreateDirectMessageMutation = { __typename?: 'Mutation', createDirectMessage: { __typename?: 'GQLDirectMessageModel', id: string, user1: { __typename?: 'GQLUser', id: string, username: string, profileImgUrl: string }, user2: { __typename?: 'GQLUser', id: string, username: string, profileImgUrl: string } } };

export type GetChannelVisibilityQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
  groupId: Scalars['Float']['input'];
}>;


export type GetChannelVisibilityQuery = { __typename?: 'Query', findChannelById?: { __typename?: 'GQLChannelModel', name: string, id: string, visibility: string } | null };

export type JoinChannelMutationVariables = Exact<{
  data: MemberInput;
}>;


export type JoinChannelMutation = { __typename?: 'Mutation', joinChannel: { __typename?: 'GQLChannelModel', id: string } };

export type DeleteDirectMessageMutationVariables = Exact<{
  data: DeletionInput;
}>;


export type DeleteDirectMessageMutation = { __typename?: 'Mutation', deleteDirectMessage: boolean };

export type FindChanneMemebersQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
  groupId: Scalars['Float']['input'];
}>;


export type FindChanneMemebersQuery = { __typename?: 'Query', findChannelById?: { __typename?: 'GQLChannelModel', id: string, owner_id: number, visibility: string, members?: Array<{ __typename?: 'GQLMembersModel', id: number, username?: string | null, profileImgUrl?: string | null, muteStatus?: boolean | null }> | null, admins?: Array<{ __typename?: 'GQLAdminsModel', id: number, username?: string | null, profileImgUrl?: string | null, muteStatus?: boolean | null }> | null } | null };

export type AddAdminMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type AddAdminMutation = { __typename?: 'Mutation', addAdmin: boolean };

export type AddMemberMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: boolean };

export type DeleteChannelMutationVariables = Exact<{
  data: DeleteChannelInput;
}>;


export type DeleteChannelMutation = { __typename?: 'Mutation', deleteChannel: boolean };

export type LeaveChannelMutationVariables = Exact<{
  data: MemberInput;
}>;


export type LeaveChannelMutation = { __typename?: 'Mutation', leaveChannel: boolean };

export type UpdateChannelMutationVariables = Exact<{
  data: UpdateChannelInput;
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel: { __typename?: 'GQLChannelModel', id: string, name: string, owner_id: number, description?: string | null, visibility: string, admins?: Array<{ __typename?: 'GQLAdminsModel', id: number, username?: string | null, email?: string | null, profileImgUrl?: string | null }> | null, members?: Array<{ __typename?: 'GQLMembersModel', id: number, username?: string | null, profileImgUrl?: string | null }> | null } };

export type FindChannelByIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
  groupId: Scalars['Float']['input'];
}>;


export type FindChannelByIdQuery = { __typename?: 'Query', findChannelById?: { __typename?: 'GQLChannelModel', id: string, owner_id: number, name: string, description?: string | null, visibility: string, admins?: Array<{ __typename?: 'GQLAdminsModel', id: number, username?: string | null, email?: string | null, profileImgUrl?: string | null }> | null, members?: Array<{ __typename?: 'GQLMembersModel', id: number, username?: string | null, email?: string | null, profileImgUrl?: string | null }> | null } | null };

export type MuteMemberMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type MuteMemberMutation = { __typename?: 'Mutation', muteMember: boolean };

export type UnmuteMemberMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type UnmuteMemberMutation = { __typename?: 'Mutation', unmuteMember: boolean };

export type KickMemberMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type KickMemberMutation = { __typename?: 'Mutation', kickMember: boolean };

export type BanMemberMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type BanMemberMutation = { __typename?: 'Mutation', banMember: boolean };

export type UnbanMemberMutationVariables = Exact<{
  data: ActionToMemberInput;
}>;


export type UnbanMemberMutation = { __typename?: 'Mutation', unbanMember: boolean };

export type GetBlockedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlockedUsersQuery = { __typename?: 'Query', getBlockedUsers: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type GetUserFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFriendsQuery = { __typename?: 'Query', getUserFriends: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type GetFriendsRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendsRequestsQuery = { __typename?: 'Query', getFriendsRequests: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type GetSuggestedFriendsQueryVariables = Exact<{
  limit: Scalars['Float']['input'];
}>;


export type GetSuggestedFriendsQuery = { __typename?: 'Query', getSuggestedFriends: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type GetFriendshipStatusQueryVariables = Exact<{
  friendId: Scalars['Float']['input'];
}>;


export type GetFriendshipStatusQuery = { __typename?: 'Query', getFriendshipStatus: { __typename?: 'GQLFriendshipStatusModel', status: string } };

export type FindPagesOfUsersQueryVariables = Exact<{
  pageNumber: Scalars['Float']['input'];
  pageSize: Scalars['Float']['input'];
}>;


export type FindPagesOfUsersQuery = { __typename?: 'Query', findPagesOfUsers: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type FindAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllUsersQuery = { __typename?: 'Query', findAllUsers: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type GetOnlineUsersQueryVariables = Exact<{
  pageNumber: Scalars['Float']['input'];
  limit: Scalars['Float']['input'];
}>;


export type GetOnlineUsersQuery = { __typename?: 'Query', getOnlineUsers: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type GetOnlineFriendsQueryVariables = Exact<{
  pageNumber: Scalars['Float']['input'];
  limit: Scalars['Float']['input'];
}>;


export type GetOnlineFriendsQuery = { __typename?: 'Query', getOnlineFriends: Array<{ __typename?: 'GQLIUserModel', id: number, username: string, profileImgUrl: string }> };

export type SendFriendRequestMutationVariables = Exact<{
  receiverId: Scalars['Float']['input'];
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: boolean };

export type AcceptFriendRequestMutationVariables = Exact<{
  friendId: Scalars['Float']['input'];
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: boolean };

export type BlockUserMutationVariables = Exact<{
  blockedUserId: Scalars['Float']['input'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: boolean };

export type UnblockUserMutationVariables = Exact<{
  unblockedUserId: Scalars['Float']['input'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type UnfriendUserMutationVariables = Exact<{
  friendId: Scalars['Float']['input'];
}>;


export type UnfriendUserMutation = { __typename?: 'Mutation', unfriendUser: boolean };

export type CancelFriendRequestMutationVariables = Exact<{
  requester: Scalars['Float']['input'];
}>;


export type CancelFriendRequestMutation = { __typename?: 'Mutation', cancelFriendRequest: boolean };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', helloT: string };

export type JoinMatchGameMutationVariables = Exact<{
  transferFundsInput: PlaceBetInput;
  JoinMatchmakingInput: JoinMatchmakingInput;
}>;


export type JoinMatchGameMutation = { __typename?: 'Mutation', placeBet?: boolean | null, joinMatchmakingQueue?: boolean | null };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'GQLUserModel', id: string, username: string } };

export type LogoutMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logOut: boolean };

export type MatchWaitingListSubscriptionVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type MatchWaitingListSubscription = { __typename?: 'Subscription', matchWaitingList: { __typename?: 'PlayersMatching', matchKey: string, user1?: { __typename?: 'Player', id?: string | null, bet?: number | null, matchType?: string | null } | null, user2?: { __typename?: 'Player', id?: string | null, bet?: number | null, matchType?: string | null } | null } };

export type MatchWaitingDircSubscriptionVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type MatchWaitingDircSubscription = { __typename?: 'Subscription', matchWaitingDirc: { __typename?: 'PlayersMatching', matchKey: string, user1?: { __typename?: 'Player', id?: string | null, bet?: number | null, matchType?: string | null } | null, user2?: { __typename?: 'Player', id?: string | null, bet?: number | null, matchType?: string | null } | null } };

export type NotificationSubscriptionVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type NotificationSubscription = { __typename?: 'Subscription', notification: { __typename?: 'RespondToPlay', playerId: number, matchType: string } };

export type SendRequestToPlayMutationVariables = Exact<{
  JoinMatchmakingInput: RequestToPlayInput;
}>;


export type SendRequestToPlayMutation = { __typename?: 'Mutation', sendRequestToPlay?: boolean | null };

export type AcceptMatchToPlayMutationVariables = Exact<{
  AcceptRequestInput: AcceptRequestInput;
}>;


export type AcceptMatchToPlayMutation = { __typename?: 'Mutation', acceptMatchToPlay?: boolean | null };

export type FindProfileByUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type FindProfileByUserIdQuery = { __typename?: 'Query', findProfileByUserId?: { __typename?: 'GQLUserProfileModel', id: string, user_id: number, nickname: string, title: string, xp: number, rank: number, about: string, bgImageUrl: string, wallet: { __typename?: 'GQLWalletModel', id: string, balance: number, user_id: number, betAmount: number }, gameStatus: { __typename?: 'GQLGameStatusModel', matchesLoss: number, matchesWon: number, totalMatches: number, win_streak: number, best_win_streak: number } } | null };

export type RegisterMutationVariables = Exact<{
  profilePhoto: Scalars['Upload']['input'];
  userName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', signUp: { __typename?: 'GQLUserModel', username: string, id: string } };

export type EnableTwoFactorAuthMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type EnableTwoFactorAuthMutation = { __typename?: 'Mutation', enableTwoFactorAuth: string };

export type VerifyTwoFactorAuthMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  code: Scalars['String']['input'];
}>;


export type VerifyTwoFactorAuthMutation = { __typename?: 'Mutation', verifyTwoFactorAuth: boolean };

export type Authenticate_2faMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Authenticate_2faMutation = { __typename?: 'Mutation', authenticate_2fa: { __typename?: 'GQLUserModel', id: string, email: string, username: string, twoStepVerificationEnabled: boolean } };

export type DisableTwoFactorMutationVariables = Exact<{ [key: string]: never; }>;


export type DisableTwoFactorMutation = { __typename?: 'Mutation', disableTwoFactor: boolean };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GQLUserModel', id: string, username: string, email: string, profileImgUrl: string, googleId?: string | null, fortyTwoId?: string | null, twoStepVerificationEnabled: boolean, showUpdateWin?: boolean | null } };

export type DeleteAccountMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  password: Scalars['String']['input'];
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: boolean };

export type AccountQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type AccountQuery = { __typename?: 'Query', findUserById: { __typename?: 'GQLIUserModel', id: number, email: string, username: string, profileImgUrl: string }, findProfileByUserId?: { __typename?: 'GQLUserProfileModel', id: string, nickname: string, title: string, xp: number, rank: number, about: string, bgImageUrl: string, wallet: { __typename?: 'GQLWalletModel', id: string, balance: number, betAmount: number }, gameStatus: { __typename?: 'GQLGameStatusModel', matchesLoss: number, matchesWon: number, totalMatches: number, win_streak: number, best_win_streak: number } } | null };

export type UpdateUserProfileMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  UpdateProfileInput: UpdateProfileInput;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', UpdateUserProfile: boolean };

export type UpdateUserAvatarImgMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  AvatarImage: Scalars['Upload']['input'];
}>;


export type UpdateUserAvatarImgMutation = { __typename?: 'Mutation', updateUserAvatarImg: string };

export type UpdateProfileBgImgMutationVariables = Exact<{
  userId: Scalars['Float']['input'];
  BgImage: Scalars['Upload']['input'];
}>;


export type UpdateProfileBgImgMutation = { __typename?: 'Mutation', updateProfileBgImg: string };

export type UpdateUserMutationVariables = Exact<{
  userUpdateInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };

export type UpdateUserStatusMutationVariables = Exact<{
  currentTime: Scalars['String']['input'];
}>;


export type UpdateUserStatusMutation = { __typename?: 'Mutation', updateUserStatus: boolean };


export const GetUserAchievementsDocument = gql`
    query getUserAchievements($userId: Float!) {
  getUserAchievements(userId: $userId) {
    title
    requirement
    description
    imageURL
  }
}
    `;

/**
 * __useGetUserAchievementsQuery__
 *
 * To run a query within a React component, call `useGetUserAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAchievementsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserAchievementsQuery(baseOptions: Apollo.QueryHookOptions<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>(GetUserAchievementsDocument, options);
      }
export function useGetUserAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>(GetUserAchievementsDocument, options);
        }
export function useGetUserAchievementsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>(GetUserAchievementsDocument, options);
        }
export type GetUserAchievementsQueryHookResult = ReturnType<typeof useGetUserAchievementsQuery>;
export type GetUserAchievementsLazyQueryHookResult = ReturnType<typeof useGetUserAchievementsLazyQuery>;
export type GetUserAchievementsSuspenseQueryHookResult = ReturnType<typeof useGetUserAchievementsSuspenseQuery>;
export type GetUserAchievementsQueryResult = Apollo.QueryResult<GetUserAchievementsQuery, GetUserAchievementsQueryVariables>;
export const GetAllAchievementsDocument = gql`
    query getAllAchievements {
  getAllAchievements {
    title
    requirement
    description
    imageURL
  }
}
    `;

/**
 * __useGetAllAchievementsQuery__
 *
 * To run a query within a React component, call `useGetAllAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAchievementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAchievementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>(GetAllAchievementsDocument, options);
      }
export function useGetAllAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>(GetAllAchievementsDocument, options);
        }
export function useGetAllAchievementsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>(GetAllAchievementsDocument, options);
        }
export type GetAllAchievementsQueryHookResult = ReturnType<typeof useGetAllAchievementsQuery>;
export type GetAllAchievementsLazyQueryHookResult = ReturnType<typeof useGetAllAchievementsLazyQuery>;
export type GetAllAchievementsSuspenseQueryHookResult = ReturnType<typeof useGetAllAchievementsSuspenseQuery>;
export type GetAllAchievementsQueryResult = Apollo.QueryResult<GetAllAchievementsQuery, GetAllAchievementsQueryVariables>;
export const GetUserChannelsDocument = gql`
    query GetUserChannels($userId: Float!) {
  getUserChannels(id: $userId) {
    id
    name
    visibility
  }
}
    `;

/**
 * __useGetUserChannelsQuery__
 *
 * To run a query within a React component, call `useGetUserChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserChannelsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserChannelsQuery(baseOptions: Apollo.QueryHookOptions<GetUserChannelsQuery, GetUserChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserChannelsQuery, GetUserChannelsQueryVariables>(GetUserChannelsDocument, options);
      }
export function useGetUserChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserChannelsQuery, GetUserChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserChannelsQuery, GetUserChannelsQueryVariables>(GetUserChannelsDocument, options);
        }
export function useGetUserChannelsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserChannelsQuery, GetUserChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserChannelsQuery, GetUserChannelsQueryVariables>(GetUserChannelsDocument, options);
        }
export type GetUserChannelsQueryHookResult = ReturnType<typeof useGetUserChannelsQuery>;
export type GetUserChannelsLazyQueryHookResult = ReturnType<typeof useGetUserChannelsLazyQuery>;
export type GetUserChannelsSuspenseQueryHookResult = ReturnType<typeof useGetUserChannelsSuspenseQuery>;
export type GetUserChannelsQueryResult = Apollo.QueryResult<GetUserChannelsQuery, GetUserChannelsQueryVariables>;
export const GetUserDirectMessagesDocument = gql`
    query GetUserDirectMessages($userId: Float!) {
  getUserDirectMessages(id: $userId) {
    id
    user2 {
      username
      profileImgUrl
      id
    }
    user1 {
      id
      username
      profileImgUrl
    }
  }
}
    `;

/**
 * __useGetUserDirectMessagesQuery__
 *
 * To run a query within a React component, call `useGetUserDirectMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDirectMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDirectMessagesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserDirectMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>(GetUserDirectMessagesDocument, options);
      }
export function useGetUserDirectMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>(GetUserDirectMessagesDocument, options);
        }
export function useGetUserDirectMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>(GetUserDirectMessagesDocument, options);
        }
export type GetUserDirectMessagesQueryHookResult = ReturnType<typeof useGetUserDirectMessagesQuery>;
export type GetUserDirectMessagesLazyQueryHookResult = ReturnType<typeof useGetUserDirectMessagesLazyQuery>;
export type GetUserDirectMessagesSuspenseQueryHookResult = ReturnType<typeof useGetUserDirectMessagesSuspenseQuery>;
export type GetUserDirectMessagesQueryResult = Apollo.QueryResult<GetUserDirectMessagesQuery, GetUserDirectMessagesQueryVariables>;
export const CreateChannelDocument = gql`
    mutation CreateChannel($data: CreateChannelInput!) {
  createChannel(data: $data) {
    id
    name
    visibility
  }
}
    `;
export type CreateChannelMutationFn = Apollo.MutationFunction<CreateChannelMutation, CreateChannelMutationVariables>;

/**
 * __useCreateChannelMutation__
 *
 * To run a mutation, you first call `useCreateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChannelMutation, { data, loading, error }] = useCreateChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateChannelMutation, CreateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChannelMutation, CreateChannelMutationVariables>(CreateChannelDocument, options);
      }
export type CreateChannelMutationHookResult = ReturnType<typeof useCreateChannelMutation>;
export type CreateChannelMutationResult = Apollo.MutationResult<CreateChannelMutation>;
export type CreateChannelMutationOptions = Apollo.BaseMutationOptions<CreateChannelMutation, CreateChannelMutationVariables>;
export const SearchForChannelDocument = gql`
    query SearchForChannel($channelName: String!, $userId: Float!) {
  searchForChannel(channelName: $channelName, userId: $userId) {
    id
    name
    visibility
  }
}
    `;

/**
 * __useSearchForChannelQuery__
 *
 * To run a query within a React component, call `useSearchForChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForChannelQuery({
 *   variables: {
 *      channelName: // value for 'channelName'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSearchForChannelQuery(baseOptions: Apollo.QueryHookOptions<SearchForChannelQuery, SearchForChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchForChannelQuery, SearchForChannelQueryVariables>(SearchForChannelDocument, options);
      }
export function useSearchForChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchForChannelQuery, SearchForChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchForChannelQuery, SearchForChannelQueryVariables>(SearchForChannelDocument, options);
        }
export function useSearchForChannelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchForChannelQuery, SearchForChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchForChannelQuery, SearchForChannelQueryVariables>(SearchForChannelDocument, options);
        }
export type SearchForChannelQueryHookResult = ReturnType<typeof useSearchForChannelQuery>;
export type SearchForChannelLazyQueryHookResult = ReturnType<typeof useSearchForChannelLazyQuery>;
export type SearchForChannelSuspenseQueryHookResult = ReturnType<typeof useSearchForChannelSuspenseQuery>;
export type SearchForChannelQueryResult = Apollo.QueryResult<SearchForChannelQuery, SearchForChannelQueryVariables>;
export const CreateDirectMessageDocument = gql`
    mutation CreateDirectMessage($userId: Float!, $targetId: Float!) {
  createDirectMessage(userID: $userId, targetID: $targetId) {
    id
    user1 {
      id
      username
      profileImgUrl
    }
    user2 {
      id
      username
      profileImgUrl
    }
  }
}
    `;
export type CreateDirectMessageMutationFn = Apollo.MutationFunction<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;

/**
 * __useCreateDirectMessageMutation__
 *
 * To run a mutation, you first call `useCreateDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDirectMessageMutation, { data, loading, error }] = useCreateDirectMessageMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useCreateDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>(CreateDirectMessageDocument, options);
      }
export type CreateDirectMessageMutationHookResult = ReturnType<typeof useCreateDirectMessageMutation>;
export type CreateDirectMessageMutationResult = Apollo.MutationResult<CreateDirectMessageMutation>;
export type CreateDirectMessageMutationOptions = Apollo.BaseMutationOptions<CreateDirectMessageMutation, CreateDirectMessageMutationVariables>;
export const GetChannelVisibilityDocument = gql`
    query getChannelVisibility($userId: Float!, $groupId: Float!) {
  findChannelById(userId: $userId, groupId: $groupId) {
    name
    id
    visibility
  }
}
    `;

/**
 * __useGetChannelVisibilityQuery__
 *
 * To run a query within a React component, call `useGetChannelVisibilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelVisibilityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelVisibilityQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetChannelVisibilityQuery(baseOptions: Apollo.QueryHookOptions<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>(GetChannelVisibilityDocument, options);
      }
export function useGetChannelVisibilityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>(GetChannelVisibilityDocument, options);
        }
export function useGetChannelVisibilitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>(GetChannelVisibilityDocument, options);
        }
export type GetChannelVisibilityQueryHookResult = ReturnType<typeof useGetChannelVisibilityQuery>;
export type GetChannelVisibilityLazyQueryHookResult = ReturnType<typeof useGetChannelVisibilityLazyQuery>;
export type GetChannelVisibilitySuspenseQueryHookResult = ReturnType<typeof useGetChannelVisibilitySuspenseQuery>;
export type GetChannelVisibilityQueryResult = Apollo.QueryResult<GetChannelVisibilityQuery, GetChannelVisibilityQueryVariables>;
export const JoinChannelDocument = gql`
    mutation JoinChannel($data: MemberInput!) {
  joinChannel(data: $data) {
    id
  }
}
    `;
export type JoinChannelMutationFn = Apollo.MutationFunction<JoinChannelMutation, JoinChannelMutationVariables>;

/**
 * __useJoinChannelMutation__
 *
 * To run a mutation, you first call `useJoinChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinChannelMutation, { data, loading, error }] = useJoinChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useJoinChannelMutation(baseOptions?: Apollo.MutationHookOptions<JoinChannelMutation, JoinChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinChannelMutation, JoinChannelMutationVariables>(JoinChannelDocument, options);
      }
export type JoinChannelMutationHookResult = ReturnType<typeof useJoinChannelMutation>;
export type JoinChannelMutationResult = Apollo.MutationResult<JoinChannelMutation>;
export type JoinChannelMutationOptions = Apollo.BaseMutationOptions<JoinChannelMutation, JoinChannelMutationVariables>;
export const DeleteDirectMessageDocument = gql`
    mutation DeleteDirectMessage($data: DeletionInput!) {
  deleteDirectMessage(data: $data)
}
    `;
export type DeleteDirectMessageMutationFn = Apollo.MutationFunction<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>;

/**
 * __useDeleteDirectMessageMutation__
 *
 * To run a mutation, you first call `useDeleteDirectMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDirectMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDirectMessageMutation, { data, loading, error }] = useDeleteDirectMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteDirectMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>(DeleteDirectMessageDocument, options);
      }
export type DeleteDirectMessageMutationHookResult = ReturnType<typeof useDeleteDirectMessageMutation>;
export type DeleteDirectMessageMutationResult = Apollo.MutationResult<DeleteDirectMessageMutation>;
export type DeleteDirectMessageMutationOptions = Apollo.BaseMutationOptions<DeleteDirectMessageMutation, DeleteDirectMessageMutationVariables>;
export const FindChanneMemebersDocument = gql`
    query FindChanneMemebers($userId: Float!, $groupId: Float!) {
  findChannelById(userId: $userId, groupId: $groupId) {
    id
    owner_id
    members {
      id
      username
      profileImgUrl
      muteStatus
    }
    admins {
      id
      username
      profileImgUrl
      muteStatus
    }
    visibility
  }
}
    `;

/**
 * __useFindChanneMemebersQuery__
 *
 * To run a query within a React component, call `useFindChanneMemebersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChanneMemebersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChanneMemebersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useFindChanneMemebersQuery(baseOptions: Apollo.QueryHookOptions<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>(FindChanneMemebersDocument, options);
      }
export function useFindChanneMemebersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>(FindChanneMemebersDocument, options);
        }
export function useFindChanneMemebersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>(FindChanneMemebersDocument, options);
        }
export type FindChanneMemebersQueryHookResult = ReturnType<typeof useFindChanneMemebersQuery>;
export type FindChanneMemebersLazyQueryHookResult = ReturnType<typeof useFindChanneMemebersLazyQuery>;
export type FindChanneMemebersSuspenseQueryHookResult = ReturnType<typeof useFindChanneMemebersSuspenseQuery>;
export type FindChanneMemebersQueryResult = Apollo.QueryResult<FindChanneMemebersQuery, FindChanneMemebersQueryVariables>;
export const AddAdminDocument = gql`
    mutation AddAdmin($data: ActionToMemberInput!) {
  addAdmin(data: $data)
}
    `;
export type AddAdminMutationFn = Apollo.MutationFunction<AddAdminMutation, AddAdminMutationVariables>;

/**
 * __useAddAdminMutation__
 *
 * To run a mutation, you first call `useAddAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdminMutation, { data, loading, error }] = useAddAdminMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddAdminMutation(baseOptions?: Apollo.MutationHookOptions<AddAdminMutation, AddAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAdminMutation, AddAdminMutationVariables>(AddAdminDocument, options);
      }
export type AddAdminMutationHookResult = ReturnType<typeof useAddAdminMutation>;
export type AddAdminMutationResult = Apollo.MutationResult<AddAdminMutation>;
export type AddAdminMutationOptions = Apollo.BaseMutationOptions<AddAdminMutation, AddAdminMutationVariables>;
export const AddMemberDocument = gql`
    mutation AddMember($data: ActionToMemberInput!) {
  addMember(data: $data)
}
    `;
export type AddMemberMutationFn = Apollo.MutationFunction<AddMemberMutation, AddMemberMutationVariables>;

/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, options);
      }
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<AddMemberMutation, AddMemberMutationVariables>;
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($data: DeleteChannelInput!) {
  deleteChannel(data: $data)
}
    `;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const LeaveChannelDocument = gql`
    mutation LeaveChannel($data: MemberInput!) {
  leaveChannel(data: $data)
}
    `;
export type LeaveChannelMutationFn = Apollo.MutationFunction<LeaveChannelMutation, LeaveChannelMutationVariables>;

/**
 * __useLeaveChannelMutation__
 *
 * To run a mutation, you first call `useLeaveChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveChannelMutation, { data, loading, error }] = useLeaveChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLeaveChannelMutation(baseOptions?: Apollo.MutationHookOptions<LeaveChannelMutation, LeaveChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveChannelMutation, LeaveChannelMutationVariables>(LeaveChannelDocument, options);
      }
export type LeaveChannelMutationHookResult = ReturnType<typeof useLeaveChannelMutation>;
export type LeaveChannelMutationResult = Apollo.MutationResult<LeaveChannelMutation>;
export type LeaveChannelMutationOptions = Apollo.BaseMutationOptions<LeaveChannelMutation, LeaveChannelMutationVariables>;
export const UpdateChannelDocument = gql`
    mutation UpdateChannel($data: UpdateChannelInput!) {
  updateChannel(data: $data) {
    id
    name
    owner_id
    description
    visibility
    admins {
      id
      username
      email
      profileImgUrl
    }
    members {
      id
      username
      profileImgUrl
    }
  }
}
    `;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const FindChannelByIdDocument = gql`
    query FindChannelById($userId: Float!, $groupId: Float!) {
  findChannelById(userId: $userId, groupId: $groupId) {
    id
    owner_id
    name
    description
    visibility
    admins {
      id
      username
      email
      profileImgUrl
    }
    members {
      id
      username
      email
      profileImgUrl
    }
  }
}
    `;

/**
 * __useFindChannelByIdQuery__
 *
 * To run a query within a React component, call `useFindChannelByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindChannelByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindChannelByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useFindChannelByIdQuery(baseOptions: Apollo.QueryHookOptions<FindChannelByIdQuery, FindChannelByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindChannelByIdQuery, FindChannelByIdQueryVariables>(FindChannelByIdDocument, options);
      }
export function useFindChannelByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindChannelByIdQuery, FindChannelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindChannelByIdQuery, FindChannelByIdQueryVariables>(FindChannelByIdDocument, options);
        }
export function useFindChannelByIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindChannelByIdQuery, FindChannelByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindChannelByIdQuery, FindChannelByIdQueryVariables>(FindChannelByIdDocument, options);
        }
export type FindChannelByIdQueryHookResult = ReturnType<typeof useFindChannelByIdQuery>;
export type FindChannelByIdLazyQueryHookResult = ReturnType<typeof useFindChannelByIdLazyQuery>;
export type FindChannelByIdSuspenseQueryHookResult = ReturnType<typeof useFindChannelByIdSuspenseQuery>;
export type FindChannelByIdQueryResult = Apollo.QueryResult<FindChannelByIdQuery, FindChannelByIdQueryVariables>;
export const MuteMemberDocument = gql`
    mutation muteMember($data: ActionToMemberInput!) {
  muteMember(data: $data)
}
    `;
export type MuteMemberMutationFn = Apollo.MutationFunction<MuteMemberMutation, MuteMemberMutationVariables>;

/**
 * __useMuteMemberMutation__
 *
 * To run a mutation, you first call `useMuteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMuteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [muteMemberMutation, { data, loading, error }] = useMuteMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMuteMemberMutation(baseOptions?: Apollo.MutationHookOptions<MuteMemberMutation, MuteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MuteMemberMutation, MuteMemberMutationVariables>(MuteMemberDocument, options);
      }
export type MuteMemberMutationHookResult = ReturnType<typeof useMuteMemberMutation>;
export type MuteMemberMutationResult = Apollo.MutationResult<MuteMemberMutation>;
export type MuteMemberMutationOptions = Apollo.BaseMutationOptions<MuteMemberMutation, MuteMemberMutationVariables>;
export const UnmuteMemberDocument = gql`
    mutation UnmuteMember($data: ActionToMemberInput!) {
  unmuteMember(data: $data)
}
    `;
export type UnmuteMemberMutationFn = Apollo.MutationFunction<UnmuteMemberMutation, UnmuteMemberMutationVariables>;

/**
 * __useUnmuteMemberMutation__
 *
 * To run a mutation, you first call `useUnmuteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnmuteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unmuteMemberMutation, { data, loading, error }] = useUnmuteMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUnmuteMemberMutation(baseOptions?: Apollo.MutationHookOptions<UnmuteMemberMutation, UnmuteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnmuteMemberMutation, UnmuteMemberMutationVariables>(UnmuteMemberDocument, options);
      }
export type UnmuteMemberMutationHookResult = ReturnType<typeof useUnmuteMemberMutation>;
export type UnmuteMemberMutationResult = Apollo.MutationResult<UnmuteMemberMutation>;
export type UnmuteMemberMutationOptions = Apollo.BaseMutationOptions<UnmuteMemberMutation, UnmuteMemberMutationVariables>;
export const KickMemberDocument = gql`
    mutation KickMember($data: ActionToMemberInput!) {
  kickMember(data: $data)
}
    `;
export type KickMemberMutationFn = Apollo.MutationFunction<KickMemberMutation, KickMemberMutationVariables>;

/**
 * __useKickMemberMutation__
 *
 * To run a mutation, you first call `useKickMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickMemberMutation, { data, loading, error }] = useKickMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useKickMemberMutation(baseOptions?: Apollo.MutationHookOptions<KickMemberMutation, KickMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickMemberMutation, KickMemberMutationVariables>(KickMemberDocument, options);
      }
export type KickMemberMutationHookResult = ReturnType<typeof useKickMemberMutation>;
export type KickMemberMutationResult = Apollo.MutationResult<KickMemberMutation>;
export type KickMemberMutationOptions = Apollo.BaseMutationOptions<KickMemberMutation, KickMemberMutationVariables>;
export const BanMemberDocument = gql`
    mutation BanMember($data: ActionToMemberInput!) {
  banMember(data: $data)
}
    `;
export type BanMemberMutationFn = Apollo.MutationFunction<BanMemberMutation, BanMemberMutationVariables>;

/**
 * __useBanMemberMutation__
 *
 * To run a mutation, you first call `useBanMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banMemberMutation, { data, loading, error }] = useBanMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useBanMemberMutation(baseOptions?: Apollo.MutationHookOptions<BanMemberMutation, BanMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanMemberMutation, BanMemberMutationVariables>(BanMemberDocument, options);
      }
export type BanMemberMutationHookResult = ReturnType<typeof useBanMemberMutation>;
export type BanMemberMutationResult = Apollo.MutationResult<BanMemberMutation>;
export type BanMemberMutationOptions = Apollo.BaseMutationOptions<BanMemberMutation, BanMemberMutationVariables>;
export const UnbanMemberDocument = gql`
    mutation UnbanMember($data: ActionToMemberInput!) {
  unbanMember(data: $data)
}
    `;
export type UnbanMemberMutationFn = Apollo.MutationFunction<UnbanMemberMutation, UnbanMemberMutationVariables>;

/**
 * __useUnbanMemberMutation__
 *
 * To run a mutation, you first call `useUnbanMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbanMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbanMemberMutation, { data, loading, error }] = useUnbanMemberMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUnbanMemberMutation(baseOptions?: Apollo.MutationHookOptions<UnbanMemberMutation, UnbanMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnbanMemberMutation, UnbanMemberMutationVariables>(UnbanMemberDocument, options);
      }
export type UnbanMemberMutationHookResult = ReturnType<typeof useUnbanMemberMutation>;
export type UnbanMemberMutationResult = Apollo.MutationResult<UnbanMemberMutation>;
export type UnbanMemberMutationOptions = Apollo.BaseMutationOptions<UnbanMemberMutation, UnbanMemberMutationVariables>;
export const GetBlockedUsersDocument = gql`
    query getBlockedUsers {
  getBlockedUsers {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useGetBlockedUsersQuery__
 *
 * To run a query within a React component, call `useGetBlockedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlockedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlockedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBlockedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>(GetBlockedUsersDocument, options);
      }
export function useGetBlockedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>(GetBlockedUsersDocument, options);
        }
export function useGetBlockedUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>(GetBlockedUsersDocument, options);
        }
export type GetBlockedUsersQueryHookResult = ReturnType<typeof useGetBlockedUsersQuery>;
export type GetBlockedUsersLazyQueryHookResult = ReturnType<typeof useGetBlockedUsersLazyQuery>;
export type GetBlockedUsersSuspenseQueryHookResult = ReturnType<typeof useGetBlockedUsersSuspenseQuery>;
export type GetBlockedUsersQueryResult = Apollo.QueryResult<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>;
export const GetUserFriendsDocument = gql`
    query getUserFriends {
  getUserFriends {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useGetUserFriendsQuery__
 *
 * To run a query within a React component, call `useGetUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
      }
export function useGetUserFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
        }
export function useGetUserFriendsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserFriendsQuery, GetUserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserFriendsQuery, GetUserFriendsQueryVariables>(GetUserFriendsDocument, options);
        }
export type GetUserFriendsQueryHookResult = ReturnType<typeof useGetUserFriendsQuery>;
export type GetUserFriendsLazyQueryHookResult = ReturnType<typeof useGetUserFriendsLazyQuery>;
export type GetUserFriendsSuspenseQueryHookResult = ReturnType<typeof useGetUserFriendsSuspenseQuery>;
export type GetUserFriendsQueryResult = Apollo.QueryResult<GetUserFriendsQuery, GetUserFriendsQueryVariables>;
export const GetFriendsRequestsDocument = gql`
    query getFriendsRequests {
  getFriendsRequests {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useGetFriendsRequestsQuery__
 *
 * To run a query within a React component, call `useGetFriendsRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendsRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>(GetFriendsRequestsDocument, options);
      }
export function useGetFriendsRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>(GetFriendsRequestsDocument, options);
        }
export function useGetFriendsRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>(GetFriendsRequestsDocument, options);
        }
export type GetFriendsRequestsQueryHookResult = ReturnType<typeof useGetFriendsRequestsQuery>;
export type GetFriendsRequestsLazyQueryHookResult = ReturnType<typeof useGetFriendsRequestsLazyQuery>;
export type GetFriendsRequestsSuspenseQueryHookResult = ReturnType<typeof useGetFriendsRequestsSuspenseQuery>;
export type GetFriendsRequestsQueryResult = Apollo.QueryResult<GetFriendsRequestsQuery, GetFriendsRequestsQueryVariables>;
export const GetSuggestedFriendsDocument = gql`
    query getSuggestedFriends($limit: Float!) {
  getSuggestedFriends(limit: $limit) {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useGetSuggestedFriendsQuery__
 *
 * To run a query within a React component, call `useGetSuggestedFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedFriendsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetSuggestedFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>(GetSuggestedFriendsDocument, options);
      }
export function useGetSuggestedFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>(GetSuggestedFriendsDocument, options);
        }
export function useGetSuggestedFriendsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>(GetSuggestedFriendsDocument, options);
        }
export type GetSuggestedFriendsQueryHookResult = ReturnType<typeof useGetSuggestedFriendsQuery>;
export type GetSuggestedFriendsLazyQueryHookResult = ReturnType<typeof useGetSuggestedFriendsLazyQuery>;
export type GetSuggestedFriendsSuspenseQueryHookResult = ReturnType<typeof useGetSuggestedFriendsSuspenseQuery>;
export type GetSuggestedFriendsQueryResult = Apollo.QueryResult<GetSuggestedFriendsQuery, GetSuggestedFriendsQueryVariables>;
export const GetFriendshipStatusDocument = gql`
    query getFriendshipStatus($friendId: Float!) {
  getFriendshipStatus(friendId: $friendId) {
    status
  }
}
    `;

/**
 * __useGetFriendshipStatusQuery__
 *
 * To run a query within a React component, call `useGetFriendshipStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendshipStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendshipStatusQuery({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useGetFriendshipStatusQuery(baseOptions: Apollo.QueryHookOptions<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>(GetFriendshipStatusDocument, options);
      }
export function useGetFriendshipStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>(GetFriendshipStatusDocument, options);
        }
export function useGetFriendshipStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>(GetFriendshipStatusDocument, options);
        }
export type GetFriendshipStatusQueryHookResult = ReturnType<typeof useGetFriendshipStatusQuery>;
export type GetFriendshipStatusLazyQueryHookResult = ReturnType<typeof useGetFriendshipStatusLazyQuery>;
export type GetFriendshipStatusSuspenseQueryHookResult = ReturnType<typeof useGetFriendshipStatusSuspenseQuery>;
export type GetFriendshipStatusQueryResult = Apollo.QueryResult<GetFriendshipStatusQuery, GetFriendshipStatusQueryVariables>;
export const FindPagesOfUsersDocument = gql`
    query findPagesOfUsers($pageNumber: Float!, $pageSize: Float!) {
  findPagesOfUsers(pageNumber: $pageNumber, pageSize: $pageSize) {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useFindPagesOfUsersQuery__
 *
 * To run a query within a React component, call `useFindPagesOfUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPagesOfUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPagesOfUsersQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useFindPagesOfUsersQuery(baseOptions: Apollo.QueryHookOptions<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>(FindPagesOfUsersDocument, options);
      }
export function useFindPagesOfUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>(FindPagesOfUsersDocument, options);
        }
export function useFindPagesOfUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>(FindPagesOfUsersDocument, options);
        }
export type FindPagesOfUsersQueryHookResult = ReturnType<typeof useFindPagesOfUsersQuery>;
export type FindPagesOfUsersLazyQueryHookResult = ReturnType<typeof useFindPagesOfUsersLazyQuery>;
export type FindPagesOfUsersSuspenseQueryHookResult = ReturnType<typeof useFindPagesOfUsersSuspenseQuery>;
export type FindPagesOfUsersQueryResult = Apollo.QueryResult<FindPagesOfUsersQuery, FindPagesOfUsersQueryVariables>;
export const FindAllUsersDocument = gql`
    query findAllUsers {
  findAllUsers {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useFindAllUsersQuery__
 *
 * To run a query within a React component, call `useFindAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
      }
export function useFindAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
        }
export function useFindAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
        }
export type FindAllUsersQueryHookResult = ReturnType<typeof useFindAllUsersQuery>;
export type FindAllUsersLazyQueryHookResult = ReturnType<typeof useFindAllUsersLazyQuery>;
export type FindAllUsersSuspenseQueryHookResult = ReturnType<typeof useFindAllUsersSuspenseQuery>;
export type FindAllUsersQueryResult = Apollo.QueryResult<FindAllUsersQuery, FindAllUsersQueryVariables>;
export const GetOnlineUsersDocument = gql`
    query getOnlineUsers($pageNumber: Float!, $limit: Float!) {
  getOnlineUsers(pageNumber: $pageNumber, limit: $limit) {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useGetOnlineUsersQuery__
 *
 * To run a query within a React component, call `useGetOnlineUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnlineUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnlineUsersQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetOnlineUsersQuery(baseOptions: Apollo.QueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
      }
export function useGetOnlineUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
        }
export function useGetOnlineUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
        }
export type GetOnlineUsersQueryHookResult = ReturnType<typeof useGetOnlineUsersQuery>;
export type GetOnlineUsersLazyQueryHookResult = ReturnType<typeof useGetOnlineUsersLazyQuery>;
export type GetOnlineUsersSuspenseQueryHookResult = ReturnType<typeof useGetOnlineUsersSuspenseQuery>;
export type GetOnlineUsersQueryResult = Apollo.QueryResult<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>;
export const GetOnlineFriendsDocument = gql`
    query getOnlineFriends($pageNumber: Float!, $limit: Float!) {
  getOnlineFriends(pageNumber: $pageNumber, limit: $limit) {
    id
    username
    profileImgUrl
  }
}
    `;

/**
 * __useGetOnlineFriendsQuery__
 *
 * To run a query within a React component, call `useGetOnlineFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnlineFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnlineFriendsQuery({
 *   variables: {
 *      pageNumber: // value for 'pageNumber'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetOnlineFriendsQuery(baseOptions: Apollo.QueryHookOptions<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>(GetOnlineFriendsDocument, options);
      }
export function useGetOnlineFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>(GetOnlineFriendsDocument, options);
        }
export function useGetOnlineFriendsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>(GetOnlineFriendsDocument, options);
        }
export type GetOnlineFriendsQueryHookResult = ReturnType<typeof useGetOnlineFriendsQuery>;
export type GetOnlineFriendsLazyQueryHookResult = ReturnType<typeof useGetOnlineFriendsLazyQuery>;
export type GetOnlineFriendsSuspenseQueryHookResult = ReturnType<typeof useGetOnlineFriendsSuspenseQuery>;
export type GetOnlineFriendsQueryResult = Apollo.QueryResult<GetOnlineFriendsQuery, GetOnlineFriendsQueryVariables>;
export const SendFriendRequestDocument = gql`
    mutation sendFriendRequest($receiverId: Float!) {
  sendFriendRequest(receiverId: $receiverId)
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      receiverId: // value for 'receiverId'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const AcceptFriendRequestDocument = gql`
    mutation acceptFriendRequest($friendId: Float!) {
  acceptFriendRequest(friendId: $friendId)
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const BlockUserDocument = gql`
    mutation blockUser($blockedUserId: Float!) {
  blockUser(blockedUserId: $blockedUserId)
}
    `;
export type BlockUserMutationFn = Apollo.MutationFunction<BlockUserMutation, BlockUserMutationVariables>;

/**
 * __useBlockUserMutation__
 *
 * To run a mutation, you first call `useBlockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockUserMutation, { data, loading, error }] = useBlockUserMutation({
 *   variables: {
 *      blockedUserId: // value for 'blockedUserId'
 *   },
 * });
 */
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const UnblockUserDocument = gql`
    mutation unblockUser($unblockedUserId: Float!) {
  unblockUser(unblockedUserId: $unblockedUserId)
}
    `;
export type UnblockUserMutationFn = Apollo.MutationFunction<UnblockUserMutation, UnblockUserMutationVariables>;

/**
 * __useUnblockUserMutation__
 *
 * To run a mutation, you first call `useUnblockUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockUserMutation, { data, loading, error }] = useUnblockUserMutation({
 *   variables: {
 *      unblockedUserId: // value for 'unblockedUserId'
 *   },
 * });
 */
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const UnfriendUserDocument = gql`
    mutation unfriendUser($friendId: Float!) {
  unfriendUser(friendId: $friendId)
}
    `;
export type UnfriendUserMutationFn = Apollo.MutationFunction<UnfriendUserMutation, UnfriendUserMutationVariables>;

/**
 * __useUnfriendUserMutation__
 *
 * To run a mutation, you first call `useUnfriendUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfriendUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfriendUserMutation, { data, loading, error }] = useUnfriendUserMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useUnfriendUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfriendUserMutation, UnfriendUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfriendUserMutation, UnfriendUserMutationVariables>(UnfriendUserDocument, options);
      }
export type UnfriendUserMutationHookResult = ReturnType<typeof useUnfriendUserMutation>;
export type UnfriendUserMutationResult = Apollo.MutationResult<UnfriendUserMutation>;
export type UnfriendUserMutationOptions = Apollo.BaseMutationOptions<UnfriendUserMutation, UnfriendUserMutationVariables>;
export const CancelFriendRequestDocument = gql`
    mutation cancelFriendRequest($requester: Float!) {
  cancelFriendRequest(requester: $requester)
}
    `;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;

/**
 * __useCancelFriendRequestMutation__
 *
 * To run a mutation, you first call `useCancelFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFriendRequestMutation, { data, loading, error }] = useCancelFriendRequestMutation({
 *   variables: {
 *      requester: // value for 'requester'
 *   },
 * });
 */
export function useCancelFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>(CancelFriendRequestDocument, options);
      }
export type CancelFriendRequestMutationHookResult = ReturnType<typeof useCancelFriendRequestMutation>;
export type CancelFriendRequestMutationResult = Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const HelloDocument = gql`
    query hello {
  helloT
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export function useHelloSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloSuspenseQueryHookResult = ReturnType<typeof useHelloSuspenseQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const JoinMatchGameDocument = gql`
    mutation joinMatchGame($transferFundsInput: PlaceBetInput!, $JoinMatchmakingInput: JoinMatchmakingInput!) {
  placeBet(transferFundsInput: $transferFundsInput)
  joinMatchmakingQueue(JoinMatchmakingInput: $JoinMatchmakingInput)
  placeBet(transferFundsInput: $transferFundsInput)
  joinMatchmakingQueue(JoinMatchmakingInput: $JoinMatchmakingInput)
}
    `;
export type JoinMatchGameMutationFn = Apollo.MutationFunction<JoinMatchGameMutation, JoinMatchGameMutationVariables>;

/**
 * __useJoinMatchGameMutation__
 *
 * To run a mutation, you first call `useJoinMatchGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMatchGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMatchGameMutation, { data, loading, error }] = useJoinMatchGameMutation({
 *   variables: {
 *      transferFundsInput: // value for 'transferFundsInput'
 *      JoinMatchmakingInput: // value for 'JoinMatchmakingInput'
 *   },
 * });
 */
export function useJoinMatchGameMutation(baseOptions?: Apollo.MutationHookOptions<JoinMatchGameMutation, JoinMatchGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinMatchGameMutation, JoinMatchGameMutationVariables>(JoinMatchGameDocument, options);
      }
export type JoinMatchGameMutationHookResult = ReturnType<typeof useJoinMatchGameMutation>;
export type JoinMatchGameMutationResult = Apollo.MutationResult<JoinMatchGameMutation>;
export type JoinMatchGameMutationOptions = Apollo.BaseMutationOptions<JoinMatchGameMutation, JoinMatchGameMutationVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  signIn(authCredentials: {username: $email, password: $password}) {
    id
    username
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($id: Float!) {
  logOut(id: $id)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MatchWaitingListDocument = gql`
    subscription MatchWaitingList($userId: Float!) {
  matchWaitingList(userId: $userId) {
    matchKey
    user1 {
      id
      bet
      matchType
    }
    user2 {
      id
      bet
      matchType
    }
  }
}
    `;

/**
 * __useMatchWaitingListSubscription__
 *
 * To run a query within a React component, call `useMatchWaitingListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMatchWaitingListSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchWaitingListSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMatchWaitingListSubscription(baseOptions: Apollo.SubscriptionHookOptions<MatchWaitingListSubscription, MatchWaitingListSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MatchWaitingListSubscription, MatchWaitingListSubscriptionVariables>(MatchWaitingListDocument, options);
      }
export type MatchWaitingListSubscriptionHookResult = ReturnType<typeof useMatchWaitingListSubscription>;
export type MatchWaitingListSubscriptionResult = Apollo.SubscriptionResult<MatchWaitingListSubscription>;
export const MatchWaitingDircDocument = gql`
    subscription matchWaitingDirc($userId: Float!) {
  matchWaitingDirc(userId: $userId) {
    matchKey
    user1 {
      id
      bet
      matchType
    }
    user2 {
      id
      bet
      matchType
    }
  }
}
    `;

/**
 * __useMatchWaitingDircSubscription__
 *
 * To run a query within a React component, call `useMatchWaitingDircSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMatchWaitingDircSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMatchWaitingDircSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useMatchWaitingDircSubscription(baseOptions: Apollo.SubscriptionHookOptions<MatchWaitingDircSubscription, MatchWaitingDircSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MatchWaitingDircSubscription, MatchWaitingDircSubscriptionVariables>(MatchWaitingDircDocument, options);
      }
export type MatchWaitingDircSubscriptionHookResult = ReturnType<typeof useMatchWaitingDircSubscription>;
export type MatchWaitingDircSubscriptionResult = Apollo.SubscriptionResult<MatchWaitingDircSubscription>;
export const NotificationDocument = gql`
    subscription notification($userId: Float!) {
  notification(userId: $userId) {
    playerId
    matchType
  }
}
    `;

/**
 * __useNotificationSubscription__
 *
 * To run a query within a React component, call `useNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationSubscription, NotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationSubscription, NotificationSubscriptionVariables>(NotificationDocument, options);
      }
export type NotificationSubscriptionHookResult = ReturnType<typeof useNotificationSubscription>;
export type NotificationSubscriptionResult = Apollo.SubscriptionResult<NotificationSubscription>;
export const SendRequestToPlayDocument = gql`
    mutation sendRequestToPlay($JoinMatchmakingInput: RequestToPlayInput!) {
  sendRequestToPlay(JoinMatchmakingInput: $JoinMatchmakingInput)
}
    `;
export type SendRequestToPlayMutationFn = Apollo.MutationFunction<SendRequestToPlayMutation, SendRequestToPlayMutationVariables>;

/**
 * __useSendRequestToPlayMutation__
 *
 * To run a mutation, you first call `useSendRequestToPlayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendRequestToPlayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendRequestToPlayMutation, { data, loading, error }] = useSendRequestToPlayMutation({
 *   variables: {
 *      JoinMatchmakingInput: // value for 'JoinMatchmakingInput'
 *   },
 * });
 */
export function useSendRequestToPlayMutation(baseOptions?: Apollo.MutationHookOptions<SendRequestToPlayMutation, SendRequestToPlayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendRequestToPlayMutation, SendRequestToPlayMutationVariables>(SendRequestToPlayDocument, options);
      }
export type SendRequestToPlayMutationHookResult = ReturnType<typeof useSendRequestToPlayMutation>;
export type SendRequestToPlayMutationResult = Apollo.MutationResult<SendRequestToPlayMutation>;
export type SendRequestToPlayMutationOptions = Apollo.BaseMutationOptions<SendRequestToPlayMutation, SendRequestToPlayMutationVariables>;
export const AcceptMatchToPlayDocument = gql`
    mutation acceptMatchToPlay($AcceptRequestInput: AcceptRequestInput!) {
  acceptMatchToPlay(AcceptRequestInput: $AcceptRequestInput)
}
    `;
export type AcceptMatchToPlayMutationFn = Apollo.MutationFunction<AcceptMatchToPlayMutation, AcceptMatchToPlayMutationVariables>;

/**
 * __useAcceptMatchToPlayMutation__
 *
 * To run a mutation, you first call `useAcceptMatchToPlayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptMatchToPlayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptMatchToPlayMutation, { data, loading, error }] = useAcceptMatchToPlayMutation({
 *   variables: {
 *      AcceptRequestInput: // value for 'AcceptRequestInput'
 *   },
 * });
 */
export function useAcceptMatchToPlayMutation(baseOptions?: Apollo.MutationHookOptions<AcceptMatchToPlayMutation, AcceptMatchToPlayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptMatchToPlayMutation, AcceptMatchToPlayMutationVariables>(AcceptMatchToPlayDocument, options);
      }
export type AcceptMatchToPlayMutationHookResult = ReturnType<typeof useAcceptMatchToPlayMutation>;
export type AcceptMatchToPlayMutationResult = Apollo.MutationResult<AcceptMatchToPlayMutation>;
export type AcceptMatchToPlayMutationOptions = Apollo.BaseMutationOptions<AcceptMatchToPlayMutation, AcceptMatchToPlayMutationVariables>;
export const FindProfileByUserIdDocument = gql`
    query findProfileByUserId($userId: Float!) {
  findProfileByUserId(userId: $userId) {
    id
    user_id
    nickname
    title
    xp
    rank
    about
    bgImageUrl
    wallet {
      id
      balance
      user_id
      betAmount
    }
    gameStatus {
      matchesLoss
      matchesWon
      totalMatches
      win_streak
      best_win_streak
    }
  }
}
    `;

/**
 * __useFindProfileByUserIdQuery__
 *
 * To run a query within a React component, call `useFindProfileByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProfileByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProfileByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindProfileByUserIdQuery(baseOptions: Apollo.QueryHookOptions<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>(FindProfileByUserIdDocument, options);
      }
export function useFindProfileByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>(FindProfileByUserIdDocument, options);
        }
export function useFindProfileByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>(FindProfileByUserIdDocument, options);
        }
export type FindProfileByUserIdQueryHookResult = ReturnType<typeof useFindProfileByUserIdQuery>;
export type FindProfileByUserIdLazyQueryHookResult = ReturnType<typeof useFindProfileByUserIdLazyQuery>;
export type FindProfileByUserIdSuspenseQueryHookResult = ReturnType<typeof useFindProfileByUserIdSuspenseQuery>;
export type FindProfileByUserIdQueryResult = Apollo.QueryResult<FindProfileByUserIdQuery, FindProfileByUserIdQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($profilePhoto: Upload!, $userName: String!, $password: String!, $email: String!) {
  signUp(
    userCreationInput: {username: $userName, email: $email, password: $password}
    profileImage: $profilePhoto
  ) {
    username
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      profilePhoto: // value for 'profilePhoto'
 *      userName: // value for 'userName'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const EnableTwoFactorAuthDocument = gql`
    mutation enableTwoFactorAuth($id: Float!) {
  enableTwoFactorAuth(id: $id)
}
    `;
export type EnableTwoFactorAuthMutationFn = Apollo.MutationFunction<EnableTwoFactorAuthMutation, EnableTwoFactorAuthMutationVariables>;

/**
 * __useEnableTwoFactorAuthMutation__
 *
 * To run a mutation, you first call `useEnableTwoFactorAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableTwoFactorAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableTwoFactorAuthMutation, { data, loading, error }] = useEnableTwoFactorAuthMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEnableTwoFactorAuthMutation(baseOptions?: Apollo.MutationHookOptions<EnableTwoFactorAuthMutation, EnableTwoFactorAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableTwoFactorAuthMutation, EnableTwoFactorAuthMutationVariables>(EnableTwoFactorAuthDocument, options);
      }
export type EnableTwoFactorAuthMutationHookResult = ReturnType<typeof useEnableTwoFactorAuthMutation>;
export type EnableTwoFactorAuthMutationResult = Apollo.MutationResult<EnableTwoFactorAuthMutation>;
export type EnableTwoFactorAuthMutationOptions = Apollo.BaseMutationOptions<EnableTwoFactorAuthMutation, EnableTwoFactorAuthMutationVariables>;
export const VerifyTwoFactorAuthDocument = gql`
    mutation verifyTwoFactorAuth($id: Float!, $code: String!) {
  verifyTwoFactorAuth(id: $id, code: $code)
}
    `;
export type VerifyTwoFactorAuthMutationFn = Apollo.MutationFunction<VerifyTwoFactorAuthMutation, VerifyTwoFactorAuthMutationVariables>;

/**
 * __useVerifyTwoFactorAuthMutation__
 *
 * To run a mutation, you first call `useVerifyTwoFactorAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTwoFactorAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTwoFactorAuthMutation, { data, loading, error }] = useVerifyTwoFactorAuthMutation({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyTwoFactorAuthMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTwoFactorAuthMutation, VerifyTwoFactorAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTwoFactorAuthMutation, VerifyTwoFactorAuthMutationVariables>(VerifyTwoFactorAuthDocument, options);
      }
export type VerifyTwoFactorAuthMutationHookResult = ReturnType<typeof useVerifyTwoFactorAuthMutation>;
export type VerifyTwoFactorAuthMutationResult = Apollo.MutationResult<VerifyTwoFactorAuthMutation>;
export type VerifyTwoFactorAuthMutationOptions = Apollo.BaseMutationOptions<VerifyTwoFactorAuthMutation, VerifyTwoFactorAuthMutationVariables>;
export const Authenticate_2faDocument = gql`
    mutation authenticate_2fa($code: String!) {
  authenticate_2fa(code: $code) {
    id
    email
    username
    twoStepVerificationEnabled
  }
}
    `;
export type Authenticate_2faMutationFn = Apollo.MutationFunction<Authenticate_2faMutation, Authenticate_2faMutationVariables>;

/**
 * __useAuthenticate_2faMutation__
 *
 * To run a mutation, you first call `useAuthenticate_2faMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticate_2faMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticate_2faMutation, { data, loading, error }] = useAuthenticate_2faMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useAuthenticate_2faMutation(baseOptions?: Apollo.MutationHookOptions<Authenticate_2faMutation, Authenticate_2faMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Authenticate_2faMutation, Authenticate_2faMutationVariables>(Authenticate_2faDocument, options);
      }
export type Authenticate_2faMutationHookResult = ReturnType<typeof useAuthenticate_2faMutation>;
export type Authenticate_2faMutationResult = Apollo.MutationResult<Authenticate_2faMutation>;
export type Authenticate_2faMutationOptions = Apollo.BaseMutationOptions<Authenticate_2faMutation, Authenticate_2faMutationVariables>;
export const DisableTwoFactorDocument = gql`
    mutation disableTwoFactor {
  disableTwoFactor
}
    `;
export type DisableTwoFactorMutationFn = Apollo.MutationFunction<DisableTwoFactorMutation, DisableTwoFactorMutationVariables>;

/**
 * __useDisableTwoFactorMutation__
 *
 * To run a mutation, you first call `useDisableTwoFactorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisableTwoFactorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disableTwoFactorMutation, { data, loading, error }] = useDisableTwoFactorMutation({
 *   variables: {
 *   },
 * });
 */
export function useDisableTwoFactorMutation(baseOptions?: Apollo.MutationHookOptions<DisableTwoFactorMutation, DisableTwoFactorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DisableTwoFactorMutation, DisableTwoFactorMutationVariables>(DisableTwoFactorDocument, options);
      }
export type DisableTwoFactorMutationHookResult = ReturnType<typeof useDisableTwoFactorMutation>;
export type DisableTwoFactorMutationResult = Apollo.MutationResult<DisableTwoFactorMutation>;
export type DisableTwoFactorMutationOptions = Apollo.BaseMutationOptions<DisableTwoFactorMutation, DisableTwoFactorMutationVariables>;
export const GetUserDocument = gql`
    query GetUser {
  getUser {
    id
    username
    email
    profileImgUrl
    googleId
    fortyTwoId
    twoStepVerificationEnabled
    showUpdateWin
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const DeleteAccountDocument = gql`
    mutation deleteAccount($id: Float!, $password: String!) {
  deleteAccount(id: $id, password: $password)
}
    `;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const AccountDocument = gql`
    query Account($userId: Float!) {
  findUserById(id: $userId) {
    id
    email
    username
    profileImgUrl
  }
  findProfileByUserId(userId: $userId) {
    id
    nickname
    title
    xp
    rank
    about
    bgImageUrl
    wallet {
      id
      balance
      betAmount
    }
    gameStatus {
      matchesLoss
      matchesWon
      totalMatches
      win_streak
      best_win_streak
    }
  }
}
    `;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAccountQuery(baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export function useAccountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountSuspenseQueryHookResult = ReturnType<typeof useAccountSuspenseQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($userId: Float!, $UpdateProfileInput: UpdateProfileInput!) {
  UpdateUserProfile(userId: $userId, UpdateProfileInput: $UpdateProfileInput)
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      UpdateProfileInput: // value for 'UpdateProfileInput'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UpdateUserAvatarImgDocument = gql`
    mutation updateUserAvatarImg($userId: Float!, $AvatarImage: Upload!) {
  updateUserAvatarImg(userId: $userId, image: $AvatarImage)
}
    `;
export type UpdateUserAvatarImgMutationFn = Apollo.MutationFunction<UpdateUserAvatarImgMutation, UpdateUserAvatarImgMutationVariables>;

/**
 * __useUpdateUserAvatarImgMutation__
 *
 * To run a mutation, you first call `useUpdateUserAvatarImgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAvatarImgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAvatarImgMutation, { data, loading, error }] = useUpdateUserAvatarImgMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      AvatarImage: // value for 'AvatarImage'
 *   },
 * });
 */
export function useUpdateUserAvatarImgMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAvatarImgMutation, UpdateUserAvatarImgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAvatarImgMutation, UpdateUserAvatarImgMutationVariables>(UpdateUserAvatarImgDocument, options);
      }
export type UpdateUserAvatarImgMutationHookResult = ReturnType<typeof useUpdateUserAvatarImgMutation>;
export type UpdateUserAvatarImgMutationResult = Apollo.MutationResult<UpdateUserAvatarImgMutation>;
export type UpdateUserAvatarImgMutationOptions = Apollo.BaseMutationOptions<UpdateUserAvatarImgMutation, UpdateUserAvatarImgMutationVariables>;
export const UpdateProfileBgImgDocument = gql`
    mutation updateProfileBgImg($userId: Float!, $BgImage: Upload!) {
  updateProfileBgImg(userId: $userId, image: $BgImage)
}
    `;
export type UpdateProfileBgImgMutationFn = Apollo.MutationFunction<UpdateProfileBgImgMutation, UpdateProfileBgImgMutationVariables>;

/**
 * __useUpdateProfileBgImgMutation__
 *
 * To run a mutation, you first call `useUpdateProfileBgImgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileBgImgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileBgImgMutation, { data, loading, error }] = useUpdateProfileBgImgMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      BgImage: // value for 'BgImage'
 *   },
 * });
 */
export function useUpdateProfileBgImgMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileBgImgMutation, UpdateProfileBgImgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileBgImgMutation, UpdateProfileBgImgMutationVariables>(UpdateProfileBgImgDocument, options);
      }
export type UpdateProfileBgImgMutationHookResult = ReturnType<typeof useUpdateProfileBgImgMutation>;
export type UpdateProfileBgImgMutationResult = Apollo.MutationResult<UpdateProfileBgImgMutation>;
export type UpdateProfileBgImgMutationOptions = Apollo.BaseMutationOptions<UpdateProfileBgImgMutation, UpdateProfileBgImgMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($userUpdateInput: UpdateUserInput!) {
  updateUser(userUpdateInput: $userUpdateInput)
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userUpdateInput: // value for 'userUpdateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserStatusDocument = gql`
    mutation updateUserStatus($currentTime: String!) {
  updateUserStatus(currentTime: $currentTime)
}
    `;
export type UpdateUserStatusMutationFn = Apollo.MutationFunction<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>;

/**
 * __useUpdateUserStatusMutation__
 *
 * To run a mutation, you first call `useUpdateUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserStatusMutation, { data, loading, error }] = useUpdateUserStatusMutation({
 *   variables: {
 *      currentTime: // value for 'currentTime'
 *   },
 * });
 */
export function useUpdateUserStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>(UpdateUserStatusDocument, options);
      }
export type UpdateUserStatusMutationHookResult = ReturnType<typeof useUpdateUserStatusMutation>;
export type UpdateUserStatusMutationResult = Apollo.MutationResult<UpdateUserStatusMutation>;
export type UpdateUserStatusMutationOptions = Apollo.BaseMutationOptions<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>;