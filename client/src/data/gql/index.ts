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
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AuthCredentialsInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateProfileInput = {
  userId: Scalars['Float']['input'];
  username: Scalars['String']['input'];
};

export type GqlUserModel = {
  __typename?: 'GQLUserModel';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  fortyTwoId?: Maybe<Scalars['String']['output']>;
  googleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  twoStepVerificationEnabled: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type GqlUserProfileModel = {
  __typename?: 'GQLUserProfileModel';
  about: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  nickname: Scalars['String']['output'];
  rank: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  UpdateUserProfile: Scalars['Boolean']['output'];
  authenticate_2fa: GqlUserModel;
  createProfile: GqlUserProfileModel;
  enableTwoFactorAuth: Scalars['String']['output'];
  joinMatchmakingQueue?: Maybe<Scalars['Boolean']['output']>;
  logOut: Scalars['Boolean']['output'];
  placeBet?: Maybe<Scalars['Boolean']['output']>;
  refresh: Scalars['String']['output'];
  removeUser: Scalars['Boolean']['output'];
  removeUserProfile: Scalars['Boolean']['output'];
  resolveBet?: Maybe<Scalars['Boolean']['output']>;
  signIn: GqlUserModel;
  signUp: GqlUserModel;
  transferFunds?: Maybe<Scalars['Boolean']['output']>;
  verifyTwoFactorAuth: Scalars['Boolean']['output'];
};


export type MutationUpdateUserProfileArgs = {
  UpdateProfileInput: UpdateProfileInput;
  userId: Scalars['Float']['input'];
};


export type MutationAuthenticate_2faArgs = {
  code: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};


export type MutationCreateProfileArgs = {
  profileCredentials: CreateProfileInput;
};


export type MutationEnableTwoFactorAuthArgs = {
  id: Scalars['Float']['input'];
};


export type MutationJoinMatchmakingQueueArgs = {
  JoinMatchmakingInput: JoinMatchmakingInput;
};


export type MutationLogOutArgs = {
  id: Scalars['Float']['input'];
};


export type MutationPlaceBetArgs = {
  transferFundsInput: PlaceBetInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRemoveUserProfileArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationResolveBetArgs = {
  resolveBetInput: ResolveBetInput;
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


export type MutationVerifyTwoFactorAuthArgs = {
  code: Scalars['String']['input'];
  id: Scalars['Float']['input'];
};

export type PingPongPayload = {
  __typename?: 'PingPongPayload';
  matchKey: Scalars['String']['output'];
  user1Id: Scalars['Float']['output'];
  user2Id: Scalars['Float']['output'];
};

export type PlaceBetInput = {
  betAmount: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  findAllUsers: Array<GqlUserModel>;
  findProfileById?: Maybe<GqlUserProfileModel>;
  findProfileByUserId?: Maybe<GqlUserProfileModel>;
  findUserById: GqlUserModel;
  hello: Scalars['String']['output'];
  helloT: Scalars['String']['output'];
};


export type QueryFindProfileByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryFindProfileByUserIdArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryFindUserByIdArgs = {
  userId: Scalars['Float']['input'];
};

export type ResolveBetInput = {
  isWinner: Scalars['Boolean']['input'];
  userId: Scalars['Float']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  matchWaitingList: PingPongPayload;
};


export type SubscriptionMatchWaitingListArgs = {
  userId: Scalars['Float']['input'];
};

export type TransferFundsInput = {
  amount: Scalars['Float']['input'];
  recipientId: Scalars['Float']['input'];
  senderId: Scalars['Float']['input'];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
};

export type UserCreationInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', helloT: string };

export type LoginMutationVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'GQLUserModel', id: string, username: string } };

export type LogoutMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logOut: boolean };

export type RegisterMutationVariables = Exact<{
  profilePhoto: Scalars['Upload']['input'];
  userName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', signUp: { __typename?: 'GQLUserModel', username: string, id: string } };

export type UserQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type UserQuery = { __typename?: 'Query', findUserById: { __typename?: 'GQLUserModel', id: string, email: string, username: string } };


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
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
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
export const UserDocument = gql`
    query User($id: Float!) {
  findUserById(userId: $id) {
    id
    email
    username
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;