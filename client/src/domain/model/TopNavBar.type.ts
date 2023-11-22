import { Context } from "context/user.context";
import { UserQueryHookResult } from "gql/index";
export interface TopNavBarModelType {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface TopNavBarViewModelType {
  userQuery: UserQueryHookResult;
  userContext: Context;
}
